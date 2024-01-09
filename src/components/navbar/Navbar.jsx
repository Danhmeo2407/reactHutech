import "./navbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";

const Navbar = () => {
  const { dispatch } = useContext(DarkModeContext);

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
          <input type="text" placeholder="Search..." />
          <SearchOutlinedIcon />
        </div>{" "}
        <div className="items">
          <div className="item">
            <DarkModeOutlinedIcon
              className="icon"
              onClick={() => dispatch({ type: "TOGGLE" })}
            />{" "}
          </div>{" "}
          <div className="item">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/react-64fdf.appspot.com/o/events%2F1704474045866logo_hutech.png?alt=media&token=4b893ebc-df15-4103-9200-8f2c5a847a86"
              alt=""
              className="avatar"
            />
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
};

export default Navbar;
