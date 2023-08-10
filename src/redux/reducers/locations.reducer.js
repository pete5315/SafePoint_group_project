const locations = (state = [], action) => {
  switch (action.type) {
    case "SET_LOCATIONS":
      return action.payload;
    case "UNSET_LOCATIONS":
      return null;
    default:
      return state;
  }
};

export default locations;
