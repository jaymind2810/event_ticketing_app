# from django.urls import path
# from . import consumers

# websocket_urlpatterns = [
#     path("ws/events/", consumers.EventConsumer.as_asgi()),
#     path("ws/bookings/", consumers.BookingConsumer.as_asgi()),
# ]


from django.urls import re_path
from . import consumers

websocket_urlpatterns = [
    re_path(r'ws/bookings/$', consumers.BookingConsumer.as_asgi()),
    re_path(r'ws/events/$', consumers.EventConsumer.as_asgi()),
]