const currentEvent = (state = "", action) => {
  switch (action.type) {
    case "SET_CURRENT_EVENT":
      return action.payload;
    case "UNSET_CURRENT_EVENT":
      return null;
    default:
      return state;
  }
};

export default currentEvent;
