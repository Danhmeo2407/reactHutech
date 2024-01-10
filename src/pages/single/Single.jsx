import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import RegisteredEvents from "../register/RegisteredEvents";

const Single = () => {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const userId = queryParams.get("id");

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (userId) {
        const userDoc = await getDoc(doc(db, "users", userId));
        setUserData({ id: userDoc.id, ...userDoc.data() });
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  console.log(userData);
  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />{" "}
        {loading ? (
          <p> Loading... </p>
        ) : (
          <>
            <div className="top">
              <div className="left">
                <div className="item">
                  <img
                    src={
                      userData.image ||
                      "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
                    }
                    alt=""
                    className="sing-itemImg"
                  />
                  <div className="details">
                    <h1 className="itemTitle"> {userData.displayName} </h1>{" "}
                    <div className="detailItem">
                      <span className="itemKey"> ID Student: </span>{" "}
                      <span className="itemValue"> {userData.studentId} </span>{" "}
                    </div>{" "}
                    <div className="detailItem">
                      <span className="itemKey"> Class: </span>{" "}
                      <span className="itemValue"> {userData.class} </span>{" "}
                    </div>{" "}
                    <div className="detailItem">
                      <span className="itemKey"> Faculty: </span>{" "}
                      <span className="itemValue"> {userData.faculty} </span>{" "}
                    </div>{" "}
                    <div className="detailItem">
                      <span className="itemKey"> Email: </span>{" "}
                      <span className="itemValue"> {userData.email} </span>{" "}
                    </div>{" "}
                    <div className="detailItem">
                      <span className="itemKey"> Phone: </span>{" "}
                      <span className="itemValue"> {userData.phone} </span>{" "}
                    </div>{" "}
                  </div>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
            <div className="bottom">
              {" "}
              <RegisteredEvents userId={userId} />{" "}
            </div>{" "}
          </>
        )}{" "}
      </div>{" "}
    </div>
  );
};

export default Single;
