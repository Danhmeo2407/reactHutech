/* eslint-disable react-hooks/exhaustive-deps */
import "./registeredEvents.scss";
import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "../../firebase";

const RegisteredEvents = ({ userId }) => {
  const [registeredEvents, setRegisteredEvents] = useState([]);

  const fetchRegisteredEvents = async () => {
    try {
      const q = query(
        collection(db, "registeredEvent"),
        where("userId", "==", userId)
      );

      const querySnapshot = await getDocs(q);

      const events = [];
      for (const docRef of querySnapshot.docs) {
        const eventData = docRef.data();

        const eventDoc = await getDoc(doc(db, "events", eventData.eventId));
        const eventDetails = { id: eventDoc.id, ...eventDoc.data() };

        events.push({ ...eventData, eventDetails });
      }

      setRegisteredEvents(events);
    } catch (error) {
      console.error("Error fetching registered events:", error);
    }
  };

  useEffect(() => {
    fetchRegisteredEvents();
  }, [userId]);

  return (
    <div>
      <h2>Registered Events:</h2>
      {registeredEvents.length === 0 ? (
        <p>No events registered.</p>
      ) : (
        <ul className="registered-events-list">
          {registeredEvents.map((event) => (
            <li key={event.id} className="registered-event-item">
              <span className="event-name">Event Name: </span>{" "}
              <span className="event-details">{event.eventDetails.name}</span>,{" "}
              <span className="status-id">Status ID: </span>{" "}
              <span className="event-status">{event.status}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RegisteredEvents;
