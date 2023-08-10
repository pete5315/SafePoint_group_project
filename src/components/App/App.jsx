import React, { useEffect } from "react";
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import Footer from "../Footer/Footer";

import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import ProtectedRouteAdmin from "../ProtectedRouteAdmin/ProtectedRouteAdmin";

import InfoPage from "../InfoPage/InfoPage";
import LoginPage from "../Login-Registration/LoginPage/LoginPage";
import EventList from "../Admin/1-EventList/EventList";
import CreateEvent from "../Admin/2-CreateEvent/2-CreateEvent";
import Alerts from "../Admin/3-Alerts/3-Alerts";
import SOS from "../Attendee-User/1-SOS";
import Injury from "../Attendee-User/2-Injury";
import Location from "../Attendee-User/3-Location";
import Confirmation from "../Attendee-User/4-Confirmation";
import FirstAid from "../Attendee-User/5-FirstAid";
import Survey from "../Attendee-User/6-Survey";
import Welcome from "../Login-Registration/Welcome/1-Welcome";
import Purpose from "../Login-Registration/Welcome/2-Purpose";
import Justification from "../Login-Registration/Welcome/3-Justification";
import Selection from "../Login-Registration/Welcome/4-Selection";
import Register from "../Login-Registration/Register/Register";
import SurveyResponse from "../Admin/5-SurveyResults/5-SurveyResults";
import Header from "../Header/Header";
import "./App.css";
import "../Nav/Nav.css";
import "../SafePointLogo/SafePointLogo.css";

function App() {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);
  console.log("in app.jsx", user);

  useEffect(() => {
    dispatch({ type: "FETCH_USER" });
  }, [dispatch]);

  return (
    <Router>
      <Header />
      {/* <Nav /> */}
      <div className="pageContainer">
        <div className="contentWrap">
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/Welcome */}
            <Redirect exact from="/" to="/Welcome" />

            <ProtectedRoute
              // Protected Route requires the user to be logged in
              exact
              path="/SOS"
            >
              {user.id && user.is_venue === true ? (
                // If the user is already logged in and is_venue is true,
                // redirect to the /EventList page
                <Redirect to="/EventList" />
              ) : (
                <SOS />
              )}
            </ProtectedRoute>

            <Route exact path="/Welcome">
              {user.id ? (
                // If the user is already logged in,
                // redirect to the /SOS page
                <Redirect to="/SOS" />
              ) : (
                <Welcome />
              )}
            </Route>

            <Route exact path="/Purpose">
              {user.id ? <Redirect to="/SOS" /> : <Purpose />}
            </Route>

            <Route exact path="/Justification">
              {user.id ? <Redirect to="/SOS" /> : <Justification />}
            </Route>

            <Route exact path="/Selection">
              <Selection />
            </Route>

            <Route exact path="/Register">
              {/* if the user is logged in redirect to /SOS */}
              {user.id ? <Redirect to="/SOS" /> : <Register />}
            </Route>

            <ProtectedRoute exact path="/Injury">
              <Injury />
            </ProtectedRoute>

            <ProtectedRoute exact path="/Location">
              <Location />
            </ProtectedRoute>

            <ProtectedRoute exact path="/Confirmation">
              <Confirmation />
            </ProtectedRoute>

            <ProtectedRoute exact path="/FirstAid">
              <FirstAid />
            </ProtectedRoute>

            <ProtectedRoute exact path="/Survey">
              <Survey />
            </ProtectedRoute>

            <ProtectedRouteAdmin
              // ProtectedRouteAdmin requires user to have the is_venue trait be true in database, otherwise redirects to SOS.
              exact
              path="/EventList"
            >
              <EventList />
            </ProtectedRouteAdmin>

            <ProtectedRouteAdmin exact path="/CreateEvent">
              <CreateEvent />
            </ProtectedRouteAdmin>

            <ProtectedRouteAdmin exact path="/Alerts">
              <Alerts />
            </ProtectedRouteAdmin>

            <ProtectedRouteAdmin exact path="/SurveyResponse">
              <SurveyResponse />
            </ProtectedRouteAdmin>

            <Route exact path="/info">
              <InfoPage />
            </Route>

            <Route exact path="/login">
              {user.id ? (
                // If the user is already logged in,
                // redirect to the /SOS page
                <Redirect to="/SOS" />
              ) : (
                // Otherwise, show the login page
                <LoginPage />
              )}
            </Route>

            {/* If none of the other routes matched, we will show a 404. */}
            <Route>
              <h1>404</h1>
            </Route>
          </Switch>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
