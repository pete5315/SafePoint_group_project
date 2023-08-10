const emergency = (state = {}, action) => {
  switch (action.type) {
    case "SET_EMERGENCY":
      return { ...state, ...action.payload };
    case "UNSET_EMERGENCY":
      return {};
    default:
      return state;
  }
};

export default emergency;
