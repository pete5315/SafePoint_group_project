import React from "react";
import { Route, Redirect } from "react-router-dom";
import SOS from "../Attendee-User/1-SOS";
import { useSelector } from "react-redux";

// A Custom Wrapper Component -- This will keep our code DRY.
// Responsible for watching redux state, and returning an appropriate component
// API for this component is the same as a regular route

// THIS IS NOT SECURITY! That must be done on the server
// A malicious user could change the code and see any view
// so your server-side route must implement real security
// by checking req.isAuthenticated for authentication
// and by checking req.user for authorization

function ProtectedRouteAdmin({ component, children, ...props }) {
  const user = useSelector((store) => store.user);

  // Component may be passed in as a "component" prop,
  // or as a child component.
  const ProtectedComponent = component || (() => children);

  // We return a Route component that gets added to our list of routes
  return (
    <Route
      // all props like 'exact' and 'path' that were passed in
      // are now passed along to the 'Route' Component
      {...props}
    >
      {user.is_venue ? (
        // If the user is logged in as an admin, show the protected component
        <ProtectedComponent />
      ) : (
        // Otherwise, redirect to the SOS page
        <SOS />
      )}
    </Route>
  );
}

export default ProtectedRouteAdmin;
