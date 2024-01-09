import "./list.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DatatableEvent from "../../components/datatable/DatatableEvent";

const ListEvent = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <DatatableEvent />
      </div>{" "}
    </div>
  );
};

export default ListEvent;
