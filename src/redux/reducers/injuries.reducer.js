const injuries = (state = [], action) => {
  switch (action.type) {
    case "SET_INJURIES":
      return action.payload;
    case "UNSET_INJURIES":
      return null;
    default:
      return state;
  }
};

export default injuries;
