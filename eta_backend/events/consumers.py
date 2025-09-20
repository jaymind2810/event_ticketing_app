from channels.generic.websocket import AsyncWebsocketConsumer
import json

class EventConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.channel_layer.group_add("event_updates", self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard("event_updates", self.channel_name)

    async def event_update(self, event):
        await self.send(text_data=json.dumps(event["data"]))


class BookingConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.channel_layer.group_add("organizer_dashboard", self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard("organizer_dashboard", self.channel_name)

    async def booking_update(self, event):
        await self.send(text_data=json.dumps(event["data"]))
