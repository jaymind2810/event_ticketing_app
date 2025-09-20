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


    return (
        <>
            <div className="p-8 bg-gray-50 min-h-screen">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                    <h1 className="text-3xl font-bold mb-4 md:mb-0">🎉 Upcoming Events</h1>

                    {/* User info + My Bookings Button */}
                    <div className="flex items-center space-x-4">
                        <span className="text-lg font-medium text-gray-700">
                            👤 {user?.email || "Guest"}
                        </span>
                        <button
                            onClick={() => navigate("/user/bookings")} // or your router function
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow"
                        >
                            My Bookings
                        </button>
                    </div>
                </div>

                {/* Event Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {events && events.map((event: EventType) => {
                        // ✅ Check if every ticket type is sold out
                        const isSoldOut =
                            event.ticket_types.length > 0 &&
                            event.ticket_types.every((ticket) => ticket.available_quantity <= 0);

                        return (
                            <div key={event.id} className="p-4 bg-white rounded-xl shadow-md">
                                <h2 className="text-xl font-bold py-4 px-2">{event.title}</h2>
                                <p className="text-sm text-gray-500 p-1">{event.description}</p>
                                <p className="text-sm text-gray-500 p-1">📍 {event.location}</p>
                                <p className="text-sm text-gray-500 p-1">
                                    📅 {new Date(event.event_date).toLocaleDateString()}
                                </p>

                                {event.status === "PUBLISHED" ? (
                                    isSoldOut ? (
                                        <div className="mt-4 text-orange-600 font-semibold px-4 py-2">
                                            🚫 Booking Full
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => setSelectedEvent(event)}
                                            className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                                        >
                                            Book Tickets
                                        </button>
                                    )
                                ) : (
                                    <div className="mt-4 text-red-500 text-md px-4 py-2">
                                        Booking Not Available
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Booking Modal */}
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