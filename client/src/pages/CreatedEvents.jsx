
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserJoinedEvents } from "../store/userSlice";
import { useNavigate } from "react-router-dom";

export function CreatedEvents() {
  const { status, error, eventsCreated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUserJoinedEvents());
  }, [dispatch]);

  return (
    <div className="w-11/12 mx-auto min-h-screen bg-gray-100 p-6">

      <button
        onClick={() => navigate(-1)}
        className="mb-4 bg-gray-300 hover:bg-gray-400 text-black font-semibold py-2 px-4 rounded"
      >
        ← Back
      </button>

      <h1 className="text-2xl font-bold mb-4 text-center">My Created Events</h1>

      {/* Loading State */}
      {status === "loading" && (
        <div className="text-blue-500 text-lg text-center my-10">Loading your events...</div>
      )}

      {/* Error State */}
      {status === "error" && (
        <div className="text-red-500 text-lg text-center my-10">
          Something went wrong: {error || "Unable to fetch events."}
        </div>
      )}

      {/* No Events Joined */}
      {status === "success" && eventsCreated?.length === 0 && (
        <div className="text-gray-600 text-lg text-center my-10">
          You haven't created for any events yet.
        </div>
      )}

      {/* Events Grid */}
      {status === "success" && eventsCreated?.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {eventsCreated?.map((event) => (
            <div
              key={event._id}
              className="bg-white rounded-lg shadow-md p-6 border border-gray-200"
            >
              <h2 className="text-xl font-semibold mb-2">
                {event.title || "Untitled Event"}
              </h2>
              <p className="text-gray-600 text-sm mb-1">
                📅{" "}
                {event.date
                  ? new Date(event.date).toLocaleDateString(undefined, {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                  : "Date not specified"}
              </p>
              <p className="text-gray-700 mb-2">
                {event.description?.split(" ").slice(0, 50).join(" ")}
                {event.description?.split(" ").length > 50 && "..."}
              </p>
              <p className="text-gray-500 text-sm">
                📍 {event.location || "Location TBD"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

