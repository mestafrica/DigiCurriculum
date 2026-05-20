// dashboard/src/components/Teacher/TeacherDashboardPages/Calendar.jsx
import React, { useEffect, useState } from "react";

const mockEvents = [
  {
    id: "E-101",
    title: "Grade 4 - Fractions Lesson",
    date: "2025-11-03",
    time: "09:00",
    venue: "Room 12",
  },
  {
    id: "E-102",
    title: "Grade 6 - Photosynthesis Practical",
    date: "2025-11-04",
    time: "11:00",
    venue: "Lab A",
  },
  {
    id: "E-103",
    title: "Staff Meeting",
    date: "2025-11-05",
    time: "14:00",
    venue: "Conference Room",
  },
];

const formatDate = (d) => new Date(d).toLocaleDateString();

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => {
      setEvents(mockEvents);
      setLoading(false);
    }, 450);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold">Calendar</h2>
          <p className="text-sm text-muted-foreground">
            Upcoming classes and events.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            className="px-4 py-2 bg-primary text-white rounded-md"
            onClick={() => alert("Create event placeholder")}
          >
            New Event
          </button>
        </div>
      </div>

      {loading ? (
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded mb-4" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="h-36 bg-gray-200 rounded" />
            <div className="h-36 bg-gray-200 rounded" />
            <div className="h-36 bg-gray-200 rounded" />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {events.map((ev) => (
            <div
              key={ev.id}
              className="bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{ev.title}</h3>
                  <div className="text-sm text-muted-foreground mt-1">
                    {formatDate(ev.date)} • {ev.time}
                  </div>
                </div>
                <div className="text-sm text-zinc-500">{ev.venue}</div>
              </div>

              <div className="mt-4 flex justify-between items-center">
                <div className="text-xs text-muted-foreground">ID: {ev.id}</div>
                <div className="flex gap-2">
                  <button
                    className="px-3 py-1 border rounded text-sm"
                    onClick={() => alert(`Edit ${ev.title}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-3 py-1 bg-red-50 text-red-600 border rounded text-sm"
                    onClick={() => alert(`Remove ${ev.title}`)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}

          {events.length === 0 && (
            <div className="text-center py-12 col-span-3 text-muted-foreground">
              No scheduled events.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Calendar;
