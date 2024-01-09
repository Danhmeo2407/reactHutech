import "./list.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DatatableReport from "../../components/datatable/DatatableReport";

const ListReport = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <DatatableReport />
      </div>{" "}
    </div>
  );
};

export default ListReport;
