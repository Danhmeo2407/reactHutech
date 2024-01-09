import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

const UpdateReport = ({ inputs, title }) => {
  const { reportId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [per] = useState(null);

  useEffect(() => {
    const fetchReportData = async () => {
      try {
        const eventDoc = await getDoc(doc(db, "reports", reportId));
        setData({ ...eventDoc.data() });
      } catch (error) {
        console.error("Error fetching event data:", error);
      }
    };

    fetchReportData();
  }, [reportId]);

  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;

    setData({ ...data, [id]: value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const eventRef = doc(db, "reports", reportId);
      await updateDoc(eventRef, {
        ...data,
      });

      navigate("/reports");
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1> {title} </h1>{" "}
        </div>{" "}
        <div className="bottom">
          <div className="right">
            <form onSubmit={handleUpdate}>
              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label> {input.label} </label>{" "}
                  <input
                    id={input.id}
                    type={input.type}
                    placeholder={input.placeholder}
                    value={data[input.id] || ""}
                    onChange={handleInput}
                  />{" "}
                </div>
              ))}{" "}
              <button disabled={per != null && per < 100} type="submit">
                {" "}
                Send{" "}
              </button>{" "}
            </form>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
};

export default UpdateReport;
