import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { getEventDataRequest } from "../../services/authRequests";
import { loaderActionEnd, loaderActionStart } from "../../store/loader/actions-creations";
import { useDispatch } from "react-redux";

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

export default function EventDetails() {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<Event | null>(null);

   const dispatch = useDispatch()
    const navigate = useNavigate()

  useEffect(() => {
    const fetchEventData = async () => {
        if (id) {
            try {
                dispatch(loaderActionStart())
                const res = await getEventDataRequest({ event_id: id });
                if (res.status === 200) {
                    setEvent(res.data)
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

    fetchEventData();

  }, [id]);

  if (!event) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8 mt-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">{event.title}</h1>
      <p className="text-gray-600 mb-4">{event.description}</p>

      <div className="space-y-2 text-gray-700">
        <p>
          📍 <span className="font-medium">{event.location}</span>
        </p>
        <p>
          📅{" "}
          {new Date(event.event_date).toLocaleString(undefined, {
            dateStyle: "full",
            timeStyle: "short",
          })}
        </p>
        <p className="uppercase text-sm font-bold text-blue-600">
          {event.status}
        </p>
      </div>
    </div>
  );
}
