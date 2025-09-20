import { useState } from "react";
import axios from "axios";
import { bookingTicketRequest } from "../../../services/usersRequests";
import { useDispatch } from "react-redux";
import { errorToast, successToast } from "../../../store/toast/actions-creation";

interface TicketType {
  id: number;
  name: string;
  price: number;
  available_quantity: number;
}

interface BookingModalProps {
  eventId: number;
  ticketTypes: TicketType[];
  onClose: () => void;
}

export default function BookingModal({ eventId, ticketTypes, onClose }: BookingModalProps) {

    const dispatch = useDispatch()
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});

  const handleQuantityChange = (ticketId: number, value: number) => {
    setQuantities((prev) => ({ ...prev, [ticketId]: value }));
  };

  const handleBooking = async () => {
    try {
      const items = Object.entries(quantities)
        .filter(([_, qty]) => qty > 0)
        .map(([ticket_type, quantity]) => ({
          ticket_type,
          quantity,
        }));

    const data = {
        event: eventId,
        items,
      }

    bookingTicketRequest(data).then((res: any) => {
        console.log(res.data, "------In Booking======")
        if (res.data) {
            // setEvents(res.data)
            onClose()
            dispatch(
                successToast({
                    toast: true,
                    message: "Ticket Booked SuccessFully.",
                })
            );
        }
    })
    } catch (err) {
      console.error(err);
      dispatch(
                errorToast({
                    toast: true,
                    message: `${err}`,
                })
            );
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4">🎟️ Book Tickets</h2>
        <div className="space-y-4">
          {ticketTypes.map((ticket) => (
            <div key={ticket.id} className="flex justify-between items-center">
              <div>
                <p className="font-semibold">{ticket.name}</p>
                <p className="text-gray-500">
                  ₹{ticket.price} | {ticket.available_quantity} left
                </p>
              </div>
              <input
                type="number"
                min={0}
                max={ticket.available_quantity}
                className="border rounded-md p-2 w-20"
                value={quantities[ticket.id] || ""}
                onChange={(e) => handleQuantityChange(ticket.id, parseInt(e.target.value) || 0)}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded-lg">
            Cancel
          </button>
          <button
            onClick={handleBooking}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
}
