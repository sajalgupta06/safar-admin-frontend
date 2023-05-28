const reducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_HEADING":
      return {
        ...state,
        heading: action.payload,
      };
    case "CHANGE_THEME":
      return {
        ...state,
        darkMode: action.payload,
      };
    case "SIDEBAR_COLLAPSE":
      return {
        ...state,
        IsSideBarCollapsed: !action.payload,
      };
      case "SET_LOADING":
        return {
          ...state,
          loading: action.payload,
        };
    case "SET_SCREEN_NAME":
      return {
        ...state,
        screenName: action.payload,
      };
    case "SET_USER":
      return {
        ...state,
        dashUser: action.payload,
      };

    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };
    case "SET_COMPANY_LOGO":
      return {
        ...state,
        companyLogo: action.payload,
      };
    case "SET_COMPANY_NAME":
      return {
        ...state,
        companyName: action.payload,
      };
    case "SET_COMPANY_PlAN":
      return {
        ...state,
        companyPlan: action.payload,
      };
    case "SET_COMPANY_PlAN_PERMISSIONS":
      return {
        ...state,
        permissions: action.payload,
      };

      case "SET_CREATE_TRIPVIEW":
        return {
          ...state,
          createTripView: action.payload,
        };



    default:
      return state;
  }
};

export default reducer;
