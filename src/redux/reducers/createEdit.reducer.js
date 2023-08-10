const createEdit = (state = null, action) => {
  switch (action.type) {
    case "SET_CREATE_EDIT":
      return action.payload;
    case "UNSET_CREATE_EDIT":
      return null;
    default:
      return state;
  }
};

export default createEdit;
