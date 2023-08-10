const currentEmergencies = (state = [], action) => {
  switch (action.type) {
    case "SET_CURRENT_EMERGENCIES":
      return action.payload;
    case "UNSET_CURRENT_EMERGENCIES":
      return [];
    default:
      return state;
  }
};

export default currentEmergencies;
