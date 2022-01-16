const initialState = {
  checkInDate: null,
  checkOutDate: null,
  currentMonth: 0,
  currentYear: 2022,
};

const calendarReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_CHECKINDATE":
      return { ...state, checkInDate: action.payload };
    case "SET_CHECKOUTDATE":
      return { ...state, checkOutDate: action.payload };
    case "SET_CURRENTMONTH":
      return { ...state, currentMonth: action.payload };
    case "SET_CURRENTYEAR":
      return { ...state, currentYear: action.payload };
    default:
      return state;
  }
};

export default calendarReducer;
