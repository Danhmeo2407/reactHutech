/* eslint-disable jsx-a11y/alt-text */
import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link, useNavigate } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { AuthContext } from "../../context/AuthContext";
import { Newspaper, ReportProblem } from "@mui/icons-material";

const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);
  const navigate = useNavigate();
  const { dispatchs } = useContext(AuthContext);
  const handleLogout = (e) => {
    e.preventDefault();
    signOut(auth)
      .then(() => {
        dispatch({ type: "LOGOUT" });
        navigate("/login");
        console.log("Logged out");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">
            <img
              style={{ width: "30px", height: "30px" }}
              src="https://inkythuatso.com/uploads/thumbnails/800/2021/10/logo-hutech-inkythuatso-21-14-30-47.jpg"
            />{" "}
            HUTECH CHECKIN{" "}
          </span>{" "}
        </Link>{" "}
      </div>{" "}
      <hr />
      <div className="center">
        <ul>
          <p className="title"> MAIN </p>{" "}
          <Link to="/" style={{ textDecoration: "none" }}>
            <li>
              <DashboardIcon className="icon" />
              <span> Main </span>{" "}
            </li>{" "}
          </Link>{" "}
          <p className="title"> LISTS </p>{" "}
          <Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span> Users </span>{" "}
            </li>{" "}
          </Link>{" "}
          <Link to="/events" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span> Events </span>{" "}
            </li>{" "}
          </Link>{" "}
          <Link to="/news" style={{ textDecoration: "none" }}>
            <li>
              <Newspaper className="icon" />
              <span> News </span>{" "}
            </li>{" "}
          </Link>{" "}
          <Link to="/reports" style={{ textDecoration: "none" }}>
            <li>
              <ReportProblem className="icon" />
              <span> Reports </span>{" "}
            </li>{" "}
          </Link>{" "}
          <p className="title"> USER </p>{" "}
          <li onClick={handleLogout}>
            <ExitToAppIcon className="icon" />
            <span> Logout </span>{" "}
          </li>{" "}
        </ul>{" "}
      </div>{" "}
      <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>{" "}
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>{" "}
      </div>{" "}
    </div>
  );
};

export default Sidebar;
