const isVenue = (state = false, action) => {
  switch (action.type) {
    case "SET_ISVENUE":
      return action.payload;
    case "UNSET_ISVENUE":
      return null;
    default:
      return state;
  }
};

export default isVenue;
