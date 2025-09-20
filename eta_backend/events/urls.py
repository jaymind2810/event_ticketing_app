from django.urls import path
from .views import (
    BookingDetailAPIView, BookingListCreateAPIView, EventListCreateView, EventDetailView, MyBookingsAPIView, OrganizerEventDetailAPIView, OrganizerEventsView, TicketTypeDetailView
)

urlpatterns = [
    path('events', EventListCreateView.as_view(), name='event-list-create'),
    path('events/<int:pk>/', EventDetailView.as_view(), name='event-detail'),
    
    # ========== Organizers API ==============
    path('organizer/events', OrganizerEventsView.as_view(), name='organizer-events-list'),
    path("organizer/events/<int:event_id>/", OrganizerEventDetailAPIView.as_view(), name="organizer-event-detail"),
    
    path('events/<int:event_id>/book/', TicketTypeDetailView.as_view(), name='ticket-booking'),
    
    
    # ========== Users API ==============
    path("bookings", BookingListCreateAPIView.as_view(), name="booking-list-create"),
    path("bookings/<int:pk>/", BookingDetailAPIView.as_view(), name="booking-detail"),    
    path("my-bookings", MyBookingsAPIView.as_view(), name="my-bookings"),
    
]