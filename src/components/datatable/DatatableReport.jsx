/* eslint-disable no-unused-vars */
import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { reportsColumns } from "../../datatablesource";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, doc, deleteDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
const DatatableReport = ({ type }) => {
  const [data, setData] = useState([]);
  const [selectedReportId, setSelectedReportId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "reports"),
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

  const handleViewReport = (id) => {
    setSelectedReportId(id);
    navigate(`/reports/reports?id=${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "reports", id));
      setData(data.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              to={`/reports/reports?id=${params.row.id}`}
              style={{ textDecoration: "none" }}
              onClick={() => handleViewReport(params.row.id)}
            >
              <div className="viewButton"> View </div>
            </Link>{" "}
            <Link
              to={`/reports/update/${params.row.id}`}
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
      <DataGrid
        className="datagrid"
        rows={data}
        columns={reportsColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default DatatableReport;
