const eventList = (state = [], action) => {
  switch (action.type) {
    case "SET_EVENT_LIST":
      return action.payload;
    case "UNSET_EVENT_LIST":
      return null;
    default:
      return state;
  }
};

export default eventList;
