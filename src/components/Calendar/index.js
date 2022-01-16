import React from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {
  setCheckInDate,
  setCheckOutDate,
  setCurrentMonth,
  setCurrentYear,
} from "../../store/actions/calendarAction";
function Calendar() {
  const dispatch = useDispatch();
  let checkInDate = useSelector((state) => state.calendarReducer.checkInDate);
  let checkOutDate = useSelector((state) => state.calendarReducer.checkOutDate);
  let currentMonth = useSelector((state) => state.calendarReducer.currentMonth);
  let currentYear = useSelector((state) => state.calendarReducer.currentYear);
  const daysInYear = [];
  const daysInMonth = [];

  const getAllDaysInMonth = (month, year) => {
    var date = new Date(year, month, 1);
    var days = [];
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  };
  const getAllDays = (month) => {
    return getAllDaysInMonth(month, currentYear).map((x) =>
      x.toLocaleDateString()
    );
  };

  //12 ayın bütün günlerini arraye push eder
  for (let i = 0; i < 12; i++) {
    daysInYear.push(getAllDays(i));
  }

  // Burada 12 ay içerisindeki mevcut ayın günlerini alır ve daysInMontha push eder
  for (let i = 0; i < daysInYear[currentMonth].length; i++) {
    daysInMonth.push(daysInYear[currentMonth][i]);
  }
  //takvimde geri gitme
  const prevMonth = () => {
    if (currentMonth <= 0) {
      dispatch(setCurrentYear(currentYear - 1));
      dispatch(setCurrentMonth(11));
    } else {
      dispatch(setCurrentMonth(currentMonth - 1));
    }
  };
  //takvimde ileri gitme
  const nextMonth = () => {
    if (currentMonth >= 11) {
      dispatch(setCurrentYear(currentYear + 1));
      dispatch(setCurrentMonth(0));
    } else {
      dispatch(setCurrentMonth(currentMonth + 1));
    }
  };
  //Seçilen ayın renklerini koyulaştır
  const selectDate = (item) => {
    if (checkInDate === null) {
      dispatch(setCheckInDate(item));
    } else if (checkInDate != null && checkOutDate === null) {
      dispatch(setCheckOutDate(item));
    } else {
      dispatch(setCheckInDate(item));
      dispatch(setCheckOutDate(null));
    }
  };

  //Seçilen aynı ayın içindeki aralıkları  koyulaştır
  const setColor = (item) => {
    if (checkInDate === item || checkOutDate === item) {
      return "#1a8fffb5";
    }
  };
  const selectedItems = (days) => {
    let handledDays = moment(days, "DD.MM.YYYY");
    let handledCheckInDate = moment(checkInDate, "DD.MM.YYYY");
    let handledCheckOutDate = moment(checkOutDate, "DD.MM.YYYY");

    if (handledDays > handledCheckInDate && handledDays < handledCheckOutDate) {
      return "selected";
    }

    if (handledDays > handledCheckOutDate && handledDays < handledCheckInDate) {
      dispatch(setCheckOutDate(checkInDate));
      dispatch(setCheckInDate(checkOutDate));
      return "selected";
    }
  };

  return (
    <div className="wrapper">
      <div className="calendar">
        <header className="header">
          <div>
            <button className="btn-arrow" onClick={() => prevMonth()}>
              <span className="material-icons">arrow_back_ios</span>
            </button>
          </div>
          <div className="this-month">{currentMonth + 1}</div>
          <div className="this-month">{currentYear}</div>
          <div>
            <button className="btn-arrow" onClick={() => nextMonth()}>
              <span className="material-icons">arrow_forward_ios</span>
            </button>
          </div>
        </header>
        <div>
          <div className="days">
            {daysInMonth.map((item) => (
              <button
                key={item}
                className={selectedItems(item)}
                style={{ backgroundColor: setColor(item) }}
                onClick={() => selectDate(item)}
              >
                {item.slice(0, 2)}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calendar;
