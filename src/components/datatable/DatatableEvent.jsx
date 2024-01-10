/* eslint-disable no-unused-vars */
import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { eventColumns } from "../../datatablesource";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, doc, deleteDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
const DatatableEvent = ({ type }) => {
  const [data, setData] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "events"),
      (snapShot) => {
        let list = [];
        snapShot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setData(list);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsub();
    };
  }, []);

  const handleViewEvent = (id) => {
    setSelectedEventId(id);
    navigate(`/events/events?id=${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "events", id));
      setData(data.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const formatTimestamp = (timestamp) => {
    const dateObject = timestamp.toDate();
    return dateObject.toLocaleDateString();
  };

  const timestampColumn = [
    {
      field: "beginTime",
      headerName: "BeginTime",
      width: 200,
      renderCell: (params) => (
        <div className="cellTimestamp">{formatTimestamp(params.value)}</div>
      ),
    },
  ];

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              to={`/events/events?id=${params.row.id}`}
              style={{ textDecoration: "none" }}
              onClick={() => handleViewEvent(params.row.id)}
            >
              <div className="viewButton"> View </div>
            </Link>{" "}
            <Link
              to={`/events/update/${params.row.id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="updateButton">Update</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete{" "}
            </div>{" "}
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New Event{" "}
        <Link to="/events/new" className="link">
          Add New{" "}
        </Link>{" "}
      </div>{" "}
      <DataGrid
        className="datagrid"
        rows={data}
        columns={eventColumns.concat(timestampColumn, actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default DatatableEvent;
