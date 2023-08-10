import React, { useEffect, useState } from "react";
import Input from "@mui/material/Input";
import IconButton from "@mui/material/IconButton";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useDispatch, useSelector } from "react-redux";

function Locations({ locations, setLocations, currentEvent }) {
  const dispatch = useDispatch();

  // Local State
  const [newLocation, setNewLocation] = useState("");
  
  // adds a new location the the location list
  function addToList(e) {
    e.preventDefault();
    setLocations([...locations, { name: newLocation }]);
    setNewLocation("");
  }

  // grabs the location from the store/reducer/server side.
  const oldLocations = useSelector((store) => store.locations);

  // on page load, grab locations from the server side of the selected the event and save it inside the local state locations
  useEffect(() => {
    dispatch({ type: "GET_LOCATIONS", payload: currentEvent.id });
    setLocations(oldLocations);
  }, []);

  return (
    <div>
      <div>
        <p>
          <span>LOCATIONS</span> <br></br>
          <span className="smalltext">
            {" "}
            (use common landmarks)
          </span>
        </p>
      </div>
      <form>
        <Input
          sx={{ m: 0.5, width: "25ch", backgroundColor: "#FFFFFF" }}
          type="text"
          name="location"
          placeholder=" Location"
          value={newLocation}
          required
          onChange={(event) => setNewLocation(event.target.value)}
        />
        <button className="btn" onClick={(e) => addToList(e)}>
          Add
        </button>
      </form>
      {locations &&
        locations.map((location, i) => (
          <div key={i}>
            <span>{location.name}</span>
            <span>
              {/* Filters out the event being delete, removing it from the list */}
              <IconButton
                onClick={() =>
                  setLocations(
                    locations.filter((location, index) => index !== i)
                  )
                }
              >
                <DeleteForeverIcon sx={{ size: "small", color: "white" }} />
              </IconButton>
            </span>
          </div>
        ))}
    </div>
  );
}

export default Locations;
