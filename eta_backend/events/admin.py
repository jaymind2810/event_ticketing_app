from django.contrib import admin
from .models import Booking, BookingItem, Event, TicketType

class TicketTypeInline(admin.TabularInline):
    model = TicketType
    extra = 1 
    fields = ("name", "price", "total_quantity", "available_quantity")



class EventAdmin(admin.ModelAdmin):
    model = Event
    list_display = (
        "title",
        "organizer",
        "location",
        "status",
        "event_date",
        "created_at",
    )
    list_filter = ("status", "location")
    search_fields = ("title", "description", "location", "organizer__email")

    readonly_fields = ("created_at", "updated_at")
    inlines = [TicketTypeInline]
    

class TicketTypeAdmin(admin.ModelAdmin):
    model = TicketType
    list_display = ("name", "event", "price", "total_quantity", "available_quantity")
    list_filter = ("event",)
    search_fields = ("name", "event__title")
    ordering = ("event", "name")
    
    
class BookingItemInline(admin.TabularInline):
    model = BookingItem
    extra = 0
    fields = ("ticket_type", "quantity", "unit_price")
    readonly_fields = ("unit_price",)  # price is auto-set from TicketType


class BookingAdmin(admin.ModelAdmin):
    model = Booking
    list_display = ("id", "user", "event", "status", "total_amount", "created_at")
    list_filter = ("status", "created_at", "event")
    search_fields = ("user__email", "event__title")
    ordering = ("-created_at",)
    inlines = [BookingItemInline]  # show booking items directly under booking


class BookingItemAdmin(admin.ModelAdmin):
    model = BookingItem
    list_display = ("booking", "ticket_type", "quantity", "unit_price")
    list_filter = ("ticket_type",)
    search_fields = ("booking__user__email", "ticket_type__name", "booking__event__title")


admin.site.register(Event, EventAdmin)    
admin.site.register(TicketType, TicketTypeAdmin)
admin.site.register(Booking, BookingAdmin)
admin.site.register(BookingItem, BookingItemAdmin)