import React, { useEffect, useState } from "react"
import BookingModal from "./BookingModel"
import { loaderActionEnd, loaderActionStart } from "../../store/loader/actions-creations";
import { getUserAllData } from "../../services/authRequests";
import { setCurrentUser } from "../../store/user/action-Creation";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../store";
import { useNavigate } from "react-router-dom";
import { eventsListRequest } from "../../services/usersRequests";


interface TicketType {
  id: number;
  name: string;
  price: number;
  available_quantity: number;
}

interface EventType {
    id: number;
    title: string;
    description: string;
    location: string;
    event_date: string;
    status: string;
    created_at: string;
    updated_at: string;
    organizer: number;
    ticket_types: TicketType[]

}

const HomePage = () => {
    const user = useSelector((state: State) => state.user);

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [events, setEvents] = useState<EventType[]>([]);
    const [selectedEvent, setSelectedEvent] = useState<EventType | null>();
    const [openBookingModal, setOpenBookingModal] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            const userId: any = localStorage.getItem("userId");
            if (userId) {
                try {
                    dispatch(loaderActionStart())
                    const res = await getUserAllData({ user_id: userId });
                    if (res.data.status === 200) {
                        res.data.data['isLoggedIn'] = true;
                        dispatch(setCurrentUser(res.data.data))
                    } else {
                        console.error(`Unexpected response status: ${res.data.status}`);
                    }
                } catch (error) {
                    console.error("An error occurred while fetching user data:", error);
                } finally {
                    dispatch(loaderActionEnd())
                }
            }
        };

        fetchUserData();
    }, [user?.isLoggedIn]);

    useEffect(() => {
            
        eventsListRequest().then((res: any) => {
            if (res.data) {
                setEvents(res.data)
            }
        })
        
    }, []);
    


    // const handleBooking = (eventId: number, ticketId: number, quantity: number) => {
    //     const payload = {
    //         event: eventId,
    //         items: [{ ticket_type: ticketId, quantity }],
    //     };

    //     axios.post("/api/bookings/", payload, {
    //         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    //     }).then((res) => {
    //         alert("Booking successful!");
    //         setIsBookingOpen(false);
    //     }).catch((err) => {
    //         console.error(err);
    //         alert("Booking failed.");
    //     });
    // };


    return (
        <>
            <div className="p-8 bg-gray-50 min-h-screen">
                <h1 className="text-3xl font-bold mb-8">🎉 Upcoming Events</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {events && events.map((event: EventType) => (
                    <div key={event.id} className="p-4 bg-white rounded-xl shadow-md">
                        <h2 className="text-xl font-bold py-4 px-2">{event.title}</h2>
                        <p className="text-sm text-gray-500 p-1">{event.description}</p>
                        <p className="text-sm text-gray-500 p-1">📍 {event.location}</p>
                        <p className="text-sm text-gray-500 p-1">
                        📅 {new Date(event.event_date).toLocaleDateString()}
                        </p>
                        {event?.status === "PUBLISHED" ? (
                            <>
                            <button
                                onClick={() => setSelectedEvent(event)}
                                className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg"
                            >
                                Book Tickets
                            </button>
                            </>
                        ) : (
                            <div className="mt-4 text-red-500 text-md px-4 py-2"> Booking Not Available</div>
                        )}
                        
                    </div>
                    ))}
                </div>

                {selectedEvent && (
                    <BookingModal
                        eventId={selectedEvent.id}
                        ticketTypes={selectedEvent.ticket_types}
                        onClose={() => setSelectedEvent(null)}
                    />
                    )}
            </div>

        </>
    )
}

export default HomePage