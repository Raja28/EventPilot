

import { useEffect, useState } from "react";
import { useFetch } from "../hooks/fetchEvents";
import { useDispatch, useSelector } from "react-redux";
import { registerInEvent } from "../store/userSlice";
import toast from "react-hot-toast";

export default function Home() {
    const { events, loading, error, fetchEvents } = useFetch();
    const [expandedDescriptions, setExpandedDescriptions] = useState({});
    const { user, status, eventsJoined } = useSelector((state) => state.user);
    const [registeredEventId, setRegisteredEventId] = useState();
    const dispatch = useDispatch();

    useEffect(() => {
        fetchEvents();
    }, []);

    useEffect(() => {
        if (registeredEventId) {
            handleJoinEvent(registeredEventId)
        }
    }, [registeredEventId])

    const toggleDescription = (eventId) => {
        setExpandedDescriptions(prev => ({
            ...prev,
            [eventId]: !prev[eventId],
        }));
    };

    const truncateText = (text, wordLimit = 50) => {
        const words = text.split(" ");
        if (words.length <= wordLimit) return { text, truncated: false };
        return {
            text: words.slice(0, wordLimit).join(" ") + "...",
            truncated: true
        };
    };

    async function handleJoinEvent(eventId) {
        try {
            const response = await dispatch(registerInEvent(eventId)).unwrap()
            if (response?._id) {
                setRegisteredEventId(null)
                toast.success("Registration successful")
            }
        } catch (error) {
            console.log(error);
            toast.error(error)
        }
    }

    return (
        <div className="w-11/12 mx-auto min-h-screen bg-gray-100 p-6">
            <h1 className="text-2xl font-bold mb-4">Upcoming Events</h1>

            {/* Loading State */}
            {loading && (
                <div className="text-blue-500 text-lg my-10 text-center">Loading events...</div>
            )}

            {/* Error State */}
            {error && (
                <div className="text-red-500 text-lg text-center my-10">
                    <p>Error: {error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mt-5"
                    >
                        Refresh

                    </button>
                </div>
            )}

            {/* No Events Case */}
            {!loading && !error && events.length === 0 && (
                <div className="text-gray-600 text-lg text-center my-10">No events found.</div>
            )}

            {/* Events Grid */}
            {!loading && !error && events.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {events.map(event => {
                        const { text, truncated } = truncateText(event.description || "");
                        const isExpanded = expandedDescriptions[event._id];

                        return (
                            <div
                                key={event._id}
                                className="bg-white rounded-lg shadow-md p-6 border border-gray-200"
                            >
                                <h2 className="text-xl font-semibold mb-2">{event.title || "Untitled Event"}</h2>
                                <p className="text-gray-600 text-sm mb-1">
                                    📅 {event.date ? new Date(event.date).toLocaleDateString(undefined, {
                                        weekday: "long",
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric"
                                    }) : "Date not specified"}
                                </p>

                                <p className="text-gray-700 mb-2">
                                    {isExpanded || !truncated ? event.description : text}
                                    {truncated && (
                                        <button
                                            onClick={() => toggleDescription(event._id)}
                                            className="text-blue-500 ml-2 text-sm"
                                        >
                                            {isExpanded ? "Show Less" : "Read More"}
                                        </button>
                                    )}
                                </p>

                                <p className="text-gray-500 text-sm">📍 {event.location || "Location TBD"}</p>

                                <div className="text-sm text-gray-400 mt-2">
                                    Created by: {event.creator?.name || "Unknown"}
                                </div>

                                {/* Register Button */}
                                <button
                                    className={`mt-4 inline-block text-white px-4 py-2 rounded transition ${eventsJoined?.find(data => data._id === event._id) ? "bg-green-500 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-700 cursor-pointer"} `}
                                    onClick={() => setRegisteredEventId(event._id)}
                                    disabled={status === "loading"}
                                >
                                    { eventsJoined?.find(data => data._id === event._id) ? "Registered" : (status === "loading" && registeredEventId === event._id) ? "Registering..." : "Register"}
                                </button>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
