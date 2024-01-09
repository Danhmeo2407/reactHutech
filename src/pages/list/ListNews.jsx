import "./list.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DatatableNews from "../../components/datatable/DatatableNews";

const ListNews = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <DatatableNews />
      </div>{" "}
    </div>
  );
};

export default ListNews;
