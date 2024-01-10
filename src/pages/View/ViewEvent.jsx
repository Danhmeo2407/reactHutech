import "./vieweEvent.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

const ViewEvent = () => {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const eventId = queryParams.get("id");

  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEventData = async () => {
      if (eventId) {
        const eventDoc = await getDoc(doc(db, "events", eventId));
        setEventData({ id: eventDoc.id, ...eventDoc.data() });
        setLoading(false);
      }
    };

    fetchEventData();
  }, [eventId]);

  const formatTimestamp = (timestamp) => {
    const dateObject = timestamp.toDate();
    const formattedDate = dateObject.toLocaleDateString();
    return formattedDate;
  };

  console.log(eventData);
  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <div className="top">
              <div className="left">
                <div className="item">
                  <img
                    src={
                      eventData.poster ||
                      "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
                    }
                    alt=""
                    className="event-itemImg"
                  />
                </div>{" "}
              </div>{" "}
            </div>{" "}
            <div className="bottom">
              <div className="details">
                <h1 className="event-itemTitle"> {eventData.name} </h1>{" "}
                <div className="detailItem">
                  <span className="itemKey"> Description: </span>{" "}
                  <span className="itemValue"> {eventData.description} </span>{" "}
                </div>{" "}
                <div className="detailItem">
                  <span className="itemKey"> BeginTime: </span>{" "}
                  <span className="itemValue">
                    {" "}
                    {formatTimestamp(eventData.beginTime)}{" "}
                  </span>{" "}
                </div>{" "}
                <div className="detailItem">
                  <span className="itemKey"> Faculty: </span>{" "}
                  <span className="itemValue"> {eventData.faculty} </span>{" "}
                </div>{" "}
                <div className="detailItem">
                  <span className="itemKey"> Quantity: </span>{" "}
                  <span className="itemValue"> {eventData.quantity} </span>{" "}
                </div>{" "}
                <div className="detailItem">
                  <span className="itemKey"> Location: </span>{" "}
                  <span className="itemValue"> {eventData.location} </span>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
          </>
        )}
      </div>
    </div>
  );
};

export default ViewEvent;
