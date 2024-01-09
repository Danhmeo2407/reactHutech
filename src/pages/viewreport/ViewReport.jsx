import "./viewreport.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

const ViewReport = () => {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const newId = queryParams.get("id");

  const [newData, setNewData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEventData = async () => {
      if (newId) {
        const eventDoc = await getDoc(doc(db, "news", newId));
        setNewData({ id: eventDoc.id, ...eventDoc.data() });
        setLoading(false);
      }
    };

    fetchEventData();
  }, [newId]);

  const formatTimestamp = (timestamp) => {
    const dateObject = timestamp.toDate(); // Convert timestamp to Date object
    const formattedDate = dateObject.toLocaleDateString(); // Format Date object as string
    return formattedDate;
  };

  console.log(setNewData);
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
                      newData.image ||
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
                <h1 className="event-itemTitle"> {newData.title} </h1>{" "}
                <div className="detailItem">
                  <span className="itemKey"> Description: </span>{" "}
                  <span className="itemValue"> {newData.description} </span>{" "}
                </div>{" "}
                <div className="detailItem">
                  <span className="itemKey"> BeginTime: </span>{" "}
                  <span className="itemValue">
                    {" "}
                    {formatTimestamp(newData.time)}{" "}
                  </span>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
          </>
        )}
      </div>
    </div>
  );
};

export default ViewReport;
