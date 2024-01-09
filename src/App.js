import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { eventInputs, userInputs, newInputs, reportInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";
import ListEvent from "./pages/list/ListEvent";
import NewEvent from "./pages/new/NewEvent";
import UpdateUser from "./pages/update/UpdateUser";
import UpdateEvent from "./pages/update/UpdateEvent";
import ViewEvent from "./pages/View/ViewEvent";
import ListNews from "./pages/list/ListNews";
import News from "./pages/new/News";
import ViewNews from "./pages/viewNews/ViewNews";
import UpdateNew from "./pages/update/UpdateNew";
import ListReport from "./pages/list/ListReport";
import ViewReport from "./pages/viewreport/ViewReport";
import NewReport from "./pages/new/NewReport";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  const { currentUser } = useContext(AuthContext);

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />} />{" "}
            <Route
              index
              element={
                <RequireAuth>
                  {" "}
                  <Home />{" "}
                </RequireAuth>
              }
            />{" "}
            <Route path="users">
              <Route index element={<List />} />{" "}
              <Route path=":userId" element={<Single />} />{" "}
              <Route
                path="update/:userId"
                element={
                  <RequireAuth>
                    {" "}
                    <UpdateUser
                      inputs={userInputs}
                      title="Update New User"
                    />{" "}
                  </RequireAuth>
                }
              />
              <Route
                path="new"
                element={
                  <RequireAuth>
                    {" "}
                    <New inputs={userInputs} title="Add New User" />{" "}
                  </RequireAuth>
                }
              />{" "}
            </Route>{" "}
            <Route path="events">
              <Route index element={<ListEvent />} />{" "}
              <Route path=":eventId" element={<ViewEvent />} />{" "}
              <Route
                path="new"
                element={
                  <NewEvent inputs={eventInputs} title="Add New Event" />
                }
              />{" "}
              <Route
                path="update/:eventId"
                element={
                  <RequireAuth>
                    {" "}
                    <UpdateEvent
                      inputs={eventInputs}
                      title="Update New Event"
                    />{" "}
                  </RequireAuth>
                }
              />
              <Route />{" "}
            </Route>{" "}
            <Route path="news">
              <Route index element={<ListNews />} />{" "}
              <Route path=":newId" element={<ViewNews />} />{" "}
              <Route
                path="update/:newId"
                element={
                  <RequireAuth>
                    {" "}
                    <UpdateNew
                      inputs={newInputs}
                      title="Update NewsPaper"
                    />{" "}
                  </RequireAuth>
                }
              />
              <Route
                path="new"
                element={<News inputs={newInputs} title="Add News" />}
              />{" "}
            </Route>{" "}
            <Route path="reports">
              <Route index element={<ListReport />} />{" "}
              <Route path=":reportId" element={<ViewReport />} />{" "}
              <Route
                path="update/:reportId"
                element={
                  <RequireAuth>
                    {" "}
                    <UpdateNew
                      inputs={reportInputs}
                      title="Update NewsPaper"
                    />{" "}
                  </RequireAuth>
                }
              />
              <Route
                path="new"
                element={
                  <NewReport inputs={reportInputs} title="Add Feedback" />
                }
              />{" "}
            </Route>{" "}
          </Route>{" "}
        </Routes>{" "}
      </BrowserRouter>{" "}
    </div>
  );
}

export default App;
