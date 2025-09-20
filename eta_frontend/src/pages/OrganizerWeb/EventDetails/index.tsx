import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { getOrganizerEventsDetailsRequest } from "../../../services/organizerRequests";


export default function OrganizerEventDetail() {
    const { id } = useParams();
    const [event, setEvent] = useState<any>(null);

    console.log(id, "--------eventId------------")

    useEffect(() => {

        id && getOrganizerEventsDetailsRequest(Number(id)).then((res: any) => {
            if (res.data) {
                setEvent(res.data);
            }
        });
    }, [id]);

    if (!event) return <p>Loading...</p>;

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            {/* Event Header */}
            <div className="bg-white shadow-lg rounded-2xl p-6 mb-8">
                <h1 className="text-4xl font-bold text-gray-800 mb-2">{event.title}</h1>
                <p className="text-gray-600 mb-1">{event.description}</p>
                <div className="flex flex-wrap text-gray-500 text-sm mt-2 space-x-4">
                    <span>📍 {event.location}</span>
                    <span>📅 {new Date(event.event_date).toLocaleString()}</span>
                    <span className={`uppercase font-semibold px-2 py-1 rounded-full
        ${event.status === "PUBLISHED" ? "bg-green-100 text-green-700" :
                            event.status === "DRAFT" ? "bg-yellow-100 text-yellow-700" :
                                "bg-red-100 text-red-700"}`}>
                        {event.status}
                    </span>
                </div>
            </div>

            {/* Ticket Sales */}
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">🎫 Ticket Sales</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {event.ticket_types.map((ticket: any) => (
                    <div
                        key={ticket.id}
                        className="p-5 bg-white rounded-2xl shadow hover:shadow-xl transition duration-300"
                    >
                        <div className="flex justify-between items-center mb-2">
                            <p className="text-lg font-semibold text-gray-800">{ticket.name}</p>
                            <span className="text-sm font-medium text-gray-500">Price: ${ticket.price}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm text-gray-600 mt-2">
                            <span>Sold: <span className="font-medium">{ticket.sold_quantity}</span></span>
                            <span>Available: <span className="font-medium">{ticket.available_quantity}</span></span>
                        </div>
                        <div className="h-2 w-full bg-gray-200 rounded-full mt-3">
                            <div
                                className="h-2 bg-blue-500 rounded-full"
                                style={{ width: `${(ticket.sold_quantity / ticket.total_quantity) * 100}%` }}
                            ></div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Attendees */}
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">👥 Attendees</h2>
            <div className="space-y-4">
                {event.bookings.map((booking: any) => (
                    <div
                        key={booking.id}
                        className="p-5 bg-white rounded-2xl shadow hover:shadow-lg transition duration-300"
                    >
                        <div className="flex justify-between items-center mb-2">
                            <p className="font-semibold text-gray-800">
                                {booking.user.first_name} {booking.user.last_name} ({booking.user.email})
                            </p>
                            <span className={`text-xs font-semibold px-2 py-1 rounded-full
            ${booking.status === "CONFIRMED" ? "bg-green-100 text-green-700" :
                                    booking.status === "PENDING" ? "bg-yellow-100 text-yellow-700" :
                                        "bg-red-100 text-red-700"}`}>
                                {booking.status}
                            </span>
                        </div>
                        <p className="text-gray-600 mb-2">Total Paid: ${booking.total_amount}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {booking.items.map((item: any) => (
                                <div
                                    key={item.id}
                                    className="flex justify-between p-2 bg-gray-50 rounded-lg text-sm text-gray-700"
                                >
                                    <span>{item.quantity} x {item.ticket_type}</span>
                                    <span>${item.unit_price}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>

    );
}
