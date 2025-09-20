import os
from channels.routing import ProtocolTypeRouter, URLRouter
# from channels.auth import AuthMiddlewareStack
from django.core.asgi import get_asgi_application
import events.routing

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "eta_backend.settings")

application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": (
        URLRouter(events.routing.websocket_urlpatterns)
    ),
})


# import os
# import django
# from channels.routing import get_default_application

# from django.core.asgi import get_asgi_application
# from channels.routing import ProtocolTypeRouter, URLRouter
# from .routing import websocket_urlpatterns  # import your app's routing

# os.environ.setdefault("DJANGO_SETTINGS_MODULE", "issue_tracker_backend.settings")
# django.setup()

# application = ProtocolTypeRouter({
#     "http": get_asgi_application(),
#     "websocket": URLRouter(
#         websocket_urlpatterns
#     ),
# })
