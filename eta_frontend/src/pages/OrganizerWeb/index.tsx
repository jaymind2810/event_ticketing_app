
import React, { useEffect, useState } from "react";
import axios from "axios";
import { createEventOrganizerRequest, organizerEventsListRequest, updateEventOrganizerRequest } from "../../services/organizerRequests";
import { useDispatch, useSelector } from "react-redux";
import { loaderActionEnd, loaderActionStart } from "../../store/loader/actions-creations";
import { getUserAllData } from "../../services/authRequests";
import { setCurrentUser } from "../../store/user/action-Creation";
import { State } from "../../store";
import { useNavigate } from "react-router-dom";
import EventFormModal from "./EventFormModel";
import { useWebSocket } from "../../webSocket";

interface TicketType {
    type: string;
    price: number;
    total: number;
    sold: number;
}

interface Event {
    id: number;
    title: string;
    description: string;
    location: string;
    event_date: string;
    status: string;
    created_at: string;
    updated_at: string;
    organizer: number;
}


const OrganizerDashboard = () => {
    const user = useSelector((state: State) => state.user);

    const dispatch = useDispatch()
    const navigate = useNavigate()

    // const bookingMessages = useWebSocket("/bookings/");
    // const bookingMessages = useWebSocket("ws://localhost:8000/bookings/");
    // new WebSocket(`ws://localhost:8000/ws/bookings/`);
    // const eventMessages = useWebSocket("/ws/events/");


    const [events, setEvents] = useState<Event[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingEvent, setEditingEvent] = useState<Event | null>(null);

    console.log(user, "----User========")


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
        const ws = new WebSocket("ws://127.0.0.1:8000/ws/bookings/");

        ws.onopen = () => console.log("Connected to bookings WebSocket ✅");
        ws.onmessage = (e) => {
            const data = JSON.parse(e.data);
            console.log("Booking update:", data);
            // You can update state here e.g. setBookings((prev) => [...prev, data])
        };
        ws.onclose = () => console.log("Disconnected ❌");

        return () => ws.close();
        }, []);

    // useEffect(() => {
    //     if (bookingMessages.length > 0) {
    //     const latest = bookingMessages[bookingMessages.length - 1];
    //     console.log("Booking Update:", latest);
    //     // Optionally refresh events list
    //             }
    // }, [bookingMessages]);

    useEffect(() => {
        const userId: any = localStorage.getItem("userId");
        if (userId) {
            const data = {
                user_id: userId
            }
            organizerEventsListRequest(data).then((res: any) => {
                if (res.data) {
                    setEvents(res.data)
                }
            })
        }
    }, []);


    const handleCreate = (data: any) => {
        const payload = {
            ...data,
            organizer: user?.id, // pass the logged-in user’s id
        };
        createEventOrganizerRequest(payload).then((res: any) => {
            if (res.data) {
                setEvents((prevEvents) => [...prevEvents, res.data]);
                setIsModalOpen(false);
            }
        });
    };

    const handleUpdate = (data: any) => {
        if (!editingEvent) return;
        updateEventOrganizerRequest(editingEvent.id, data).then((res: any) => {
            if (res.data) {
                setEvents((prevEvents) =>
                    prevEvents.map((ev) =>
                        ev.id === editingEvent.id ? res.data : ev
                    )
                );
                setIsModalOpen(false);
                setEditingEvent(null);
            }
        });
    };

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                    🎟️ Organizer Dashboard
                </h1>
                <button
                    onClick={() => {
                        setIsModalOpen(true);
                    }}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
                >
                    ➕ Create Event
                </button>
            </div>

            {/* Event Grid */}
            {events.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-xl shadow-md">
                    <p className="text-gray-500 text-lg">No events found.</p>
                    <p className="text-gray-400">Start by creating your first event!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {events.map((event) => (
                        <div
                            key={event.id}
                            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-transform transform hover:-translate-y-1 p-6 flex flex-col"
                        >
                            {/* Title */}
                            <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
                                {event.title}
                            </h2>

                            {/* Description */}
                            <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>

                            {/* Meta Info */}
                            <div className="text-sm text-gray-500 space-y-2 mb-4">
                                <p>
                                    📍{" "}
                                    <span className="font-medium text-gray-700">{event.location}</span>
                                </p>
                                <p>
                                    📅{" "}
                                    {new Date(event.event_date).toLocaleString(undefined, {
                                        dateStyle: "medium",
                                        timeStyle: "short",
                                    })}
                                </p>
                                <span
                                    className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${event.status === "PUBLISHED"
                                            ? "bg-green-100 text-green-700"
                                            : event.status === "CANCELLED"
                                                ? "bg-red-100 text-red-700"
                                                : "bg-yellow-100 text-yellow-700"
                                        }`}
                                >
                                    {event.status}
                                </span>
                            </div>

                            {/* Actions */}
                            <div className="mt-auto flex justify-between gap-3">
                                <button
                                    onClick={() => navigate(`/organizer/events/${event.id}`)}
                                    className="flex-1 bg-green-500 text-white px-3 py-2 rounded-lg hover:bg-green-600 transition"
                                >
                                    View
                                </button>
                                <button
                                    onClick={() => {
                                        setEditingEvent(event);
                                        setIsModalOpen(true);
                                    }}
                                    className="flex-1 bg-yellow-500 text-white px-3 py-2 rounded-lg hover:bg-yellow-600 transition"
                                >
                                    Edit
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal */}
            {isModalOpen && (
                <EventFormModal
                    isOpen={isModalOpen}
                    onClose={() => {
                        setIsModalOpen(false);
                        setEditingEvent(null);
                    }}
                    onSubmit={editingEvent ? handleUpdate : handleCreate}
                    initialData={editingEvent || undefined}
                />
            )}
        </div>

    );
}

export default OrganizerDashboard

