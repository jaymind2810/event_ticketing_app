from django.db import transaction
from rest_framework import serializers
from .models import Event, TicketType, Booking, BookingItem
from users.models import User


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = "__all__"

        
class TicketTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = TicketType
        fields = ["id", "name", "price", "total_quantity", "available_quantity"]


class EventSerializer(serializers.ModelSerializer):
    ticket_types = TicketTypeSerializer(many=True, required=False)

    class Meta:
        model = Event
        fields = [
            "id", "title", "description", "location", "event_date", "status",
            "created_at", "updated_at", "ticket_types"
        ]
        read_only_fields = ["id", "created_at", "updated_at"]

    def create(self, validated_data):
        ticket_types_data = validated_data.pop("ticket_types", [])
        event = Event.objects.create(**validated_data)
        for ticket in ticket_types_data:
            TicketType.objects.create(event=event, **ticket)
        return event

    def update(self, instance, validated_data):
        ticket_types_data = validated_data.pop("ticket_types", [])
        instance = super().update(instance, validated_data)

        instance.ticket_types.all().delete()
        for ticket in ticket_types_data:
            TicketType.objects.create(event=instance, **ticket)

        return instance



class BookingItemSerializer(serializers.ModelSerializer):
    ticket_type = serializers.PrimaryKeyRelatedField(queryset=TicketType.objects.all())

    class Meta:
        model = BookingItem
        fields = ["ticket_type", "quantity"]
        


class BookingSerializer(serializers.ModelSerializer):
    items = BookingItemSerializer(many=True)

    class Meta:
        model = Booking
        fields = ["id", "event", "status", "total_amount", "items"]
        read_only_fields = ["status", "total_amount"]

    def create(self, validated_data):
        items_data = validated_data.pop("items")
        user = self.context["request"].user

        booking = Booking.objects.create(user=user, **validated_data)

        for item_data in items_data:
            ticket_type = item_data["ticket_type"]
            quantity = item_data["quantity"]

            # Atomic save
            BookingItem.objects.create(
                booking=booking,
                ticket_type=ticket_type,
                quantity=quantity,
                unit_price=ticket_type.price
            )
            
        booking.status = Booking.Status.CONFIRMED 
        booking.save()
        
        return booking
    

# ================ My Booking Data ===============================
class MyBookingTicketTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = TicketType
        fields = ["id", "name", "price"]


class MyBookingBookingItemSerializer(serializers.ModelSerializer):
    ticket_type = MyBookingTicketTypeSerializer(read_only=True)

    class Meta:
        model = BookingItem
        fields = ["id", "ticket_type", "quantity", "unit_price"]
        
        
class MyBookingEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ["id", "title", "description", "location", "event_date"]
    
    
class MyBookingSerializer(serializers.ModelSerializer):
    event = MyBookingEventSerializer(read_only=True)
    items = MyBookingBookingItemSerializer(many=True, read_only=True)

    class Meta:
        model = Booking
        fields = ["id", "event", "status", "total_amount", "items", "created_at"]
    
    
# ==================== Organizers Event Details =============== 
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "email", "first_name", "last_name"]

class BookingItemDetailSerializer(serializers.ModelSerializer):
    ticket_type = serializers.StringRelatedField()

    class Meta:
        model = BookingItem
        fields = ["id", "ticket_type", "quantity", "unit_price"]

class BookingDetailSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    items = BookingItemDetailSerializer(many=True, read_only=True)

    class Meta:
        model = Booking
        fields = ["id", "user", "status", "total_amount", "items", "created_at"]


class TicketSalesSerializer(serializers.ModelSerializer):
    sold_quantity = serializers.SerializerMethodField()
    
    class Meta:
        model = TicketType
        fields = ["id", "name", "price", "total_quantity", "available_quantity", "sold_quantity"]

    def get_sold_quantity(self, obj):
        sold = obj.total_quantity - obj.available_quantity
        return sold

class EventDetailSerializer(serializers.ModelSerializer):
    ticket_types = TicketSalesSerializer(many=True, read_only=True)
    bookings = BookingDetailSerializer(many=True, read_only=True)

    class Meta:
        model = Event
        fields = ["id", "title", "description", "location", "event_date", "status", "ticket_types", "bookings"]
