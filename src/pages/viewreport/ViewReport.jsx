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
  const reportId = queryParams.get("id");

  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReportData = async () => {
      if (reportId) {
        const reportDoc = await getDoc(doc(db, "reports", reportId));
        setReportData({ id: reportDoc.id, ...reportDoc.data() });
        setLoading(false);
      }
    };

    fetchReportData();
  }, [reportId]);

  console.log(setReportData);
  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <div className="bottom">
              <div className="details">
                <h1 className="event-itemTitle"> {reportData.title} </h1>{" "}
                <div className="detailItem">
                  <span className="itemKey"> FullName: </span>{" "}
                  <span className="itemValue"> {reportData.fullName} </span>{" "}
                </div>{" "}
                <div className="detailItem">
                  <span className="itemKey"> StudentID: </span>{" "}
                  <span className="itemValue"> {reportData.mssv} </span>{" "}
                </div>{" "}
                <div className="detailItem">
                  <span className="itemKey"> ReportContent: </span>{" "}
                  <span className="itemValue">
                    {" "}
                    {reportData.reportContent}{" "}
                  </span>{" "}
                </div>{" "}
                <div className="detailItem">
                  <span className="itemKey"> Feedback: </span>{" "}
                  <span className="itemValue"> {reportData.feedback} </span>{" "}
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
