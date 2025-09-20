from django.urls import path
from .views import (
    BookingDetailAPIView, BookingListCreateAPIView, EventListCreateView, EventDetailView, MyBookingsAPIView, OrganizerEventDetailAPIView, OrganizerEventsView
)

urlpatterns = [
    path('events', EventListCreateView.as_view(), name='event-list-create'),
    path('events/<int:pk>/', EventDetailView.as_view(), name='event-detail'),
    
    # ========== Organizers API ==============
    path('organizer/events', OrganizerEventsView.as_view(), name='organizer-events-list'),
    path("organizer/events/<int:event_id>/", OrganizerEventDetailAPIView.as_view(), name="organizer-event-detail"),
    
    
    # ========== Users API ==============
    path("bookings", BookingListCreateAPIView.as_view(), name="booking-list-create"),
    path("bookings/<int:pk>/", BookingDetailAPIView.as_view(), name="booking-detail"),    
    path("my-bookings", MyBookingsAPIView.as_view(), name="my-bookings"),
    
]