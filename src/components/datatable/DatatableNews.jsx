import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { eventColumns, newsColumns } from "../../datatablesource";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, doc, deleteDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
const DatatableEvent = ({ type }) => {
  const [data, setData] = useState([]);
  const [selectedNewId, setSelectedNewId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    //LISTEN REALTIME
    const unsub = onSnapshot(
      collection(db, "news"),
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

  const handleViewNews = (id) => {
    setSelectedNewId(id);
    navigate(`/news/news?id=${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "news", id));
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
      field: "time",
      headerName: "Time",
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
              to={`/news/news?id=${params.row.id}`}
              style={{ textDecoration: "none" }}
              onClick={() => handleViewNews(params.row.id)}
            >
              <div className="viewButton"> View </div>
            </Link>{" "}
            <Link
              to={`/news/update/${params.row.id}`}
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
        Add News{" "}
        <Link to="/news/new" className="link">
          Add New{" "}
        </Link>{" "}
      </div>{" "}
      <DataGrid
        className="datagrid"
        rows={data}
        columns={newsColumns.concat(timestampColumn, actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default DatatableEvent;
