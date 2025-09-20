import { useEffect, useState } from "react";
import axios from "axios";
import { myBookingListRequest } from "../../../services/usersRequests";

interface BookingItem {
  id: number;
  ticket_type: { name: string; price: number };
  quantity: number;
}

interface Booking {
  id: number;
  event: { title: string; event_date: string; location: string };
  status: string;
  total_amount: number;
  items: BookingItem[];
}

export default function MyBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {      
        myBookingListRequest().then((res: any) => {
            if (res.data) {
                setBookings(res.data)
            }
        })
    }, []);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">📝 My Bookings</h1>

      {bookings.length === 0 ? (
        <p className="text-gray-500">You have no bookings yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-white rounded-2xl shadow-md p-6 flex flex-col"
            >
              <h2 className="text-xl font-bold mb-2">{booking.event.title}</h2>
              <p className="text-gray-500 text-sm mb-2">
                📅 {new Date(booking.event.event_date).toLocaleString()}
              </p>
              <p className="text-gray-500 text-sm mb-4">📍 {booking.event.location}</p>

              <div className="mb-4">
                {booking.items.map((item) => (
                  <div key={item.id} className="flex justify-between mb-1">
                    <span>{item.ticket_type.name}</span>
                    <span>
                      {item.quantity} x ${item.ticket_type.price}
                    </span>
                  </div>
                ))}
              </div>

              <p className="font-semibold mb-2">Total: ${booking.total_amount}</p>

              <span
                className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                  booking.status === "CONFIRMED"
                    ? "bg-green-100 text-green-700"
                    : booking.status === "CANCELLED"
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {booking.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
