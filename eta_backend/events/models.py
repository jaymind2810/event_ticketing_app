from django.db import models, transaction
from django.conf import settings
from django.utils import timezone


class Event(models.Model):
    class Status(models.TextChoices):
        DRAFT = "DRAFT", "Draft"
        PUBLISHED = "PUBLISHED", "Published"
        CANCELLED = "CANCELLED", "Cancelled"

    organizer = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="organized_events"
    )
    title = models.CharField(max_length=200)
    description = models.TextField()
    location = models.CharField(max_length=200)
    event_date = models.DateTimeField(default=timezone.now)
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.DRAFT)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.title} ({self.status})"
    
    
class TicketType(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name="ticket_types")
    name = models.CharField(max_length=100)  # Early Bird, Regular, VIP, etc.
    price = models.DecimalField(max_digits=10, decimal_places=2)
    total_quantity = models.PositiveIntegerField()
    available_quantity = models.PositiveIntegerField()


    def __str__(self):
        return f"{self.name} - {self.event.title}"
        
    def book_tickets(self, quantity):
        if self.available_quantity < quantity:
            raise ValueError("Not enough tickets available")
        self.available_quantity -= quantity
        self.save()



class Booking(models.Model):
    class Status(models.TextChoices):
        PENDING = "PENDING", "Pending"
        CONFIRMED = "CONFIRMED", "Confirmed"
        CANCELLED = "CANCELLED", "Cancelled"

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="bookings")
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name="bookings")
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.PENDING)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Booking {self.id} - {self.user.email} - {self.event.title}"


class BookingItem(models.Model):
    booking = models.ForeignKey(Booking, on_delete=models.CASCADE, related_name="items")
    ticket_type = models.ForeignKey(TicketType, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    unit_price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.quantity} x {self.ticket_type.name} for Booking {self.booking.id}"

    @transaction.atomic
    def save(self, *args, **kwargs):
        if not self.pk:  # only on first creation
            self.ticket_type.book_tickets(self.quantity)
            self.unit_price = self.ticket_type.price
            self.booking.total_amount += self.unit_price * self.quantity
            self.booking.save()
        super().save(*args, **kwargs)
