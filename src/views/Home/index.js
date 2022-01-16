import React, { useState } from "react";
import { useSelector } from "react-redux";
import Calendar from "../../components/Calendar";

const Home = () => {
  const [checkIn, setCheckIn] = useState(false);
  const [checkOut, setCheckOut] = useState(false);
  let checkInDate = useSelector((state) => state.calendarReducer.checkInDate);
  let checkOutDate = useSelector((state) => state.calendarReducer.checkOutDate);

  const visibleCheck = (status) => {
    if (status === "in") {
      setCheckIn(true);
      setCheckOut(false);
    } else if (status === "out") {
      setCheckIn(false);
      setCheckOut(true);
    } else {
      setCheckIn(false);
      setCheckOut(false);
    }
  };

  return (
    <div className="app-wrapper">
      <div className="container">
        <div className="date-picker">
          <div className="checked-date">{checkInDate}</div>
          <button className="btn-date" onClick={() => visibleCheck("in")}>
            CheckIn
          </button>

          {checkIn && (
            <div>
              <button
                className="btn-close"
                onClick={() => visibleCheck("close")}
              >
                X
              </button>
              <Calendar />
            </div>
          )}
        </div>
        <div className="date-picker">
          <div className="checked-date">{checkOutDate}</div>
          <button className="btn-date" onClick={() => visibleCheck("out")}>
            CheckOut
          </button>
          {checkOut && (
            <div>
              <button
                className="btn-close"
                onClick={() => visibleCheck("close")}
              >
                X
              </button>
              <Calendar />
            </div>
          )}
        </div>
      </div>
      <footer>
        <p>
          Bu Proje <b>Ayşegül TOPYÜREK</b> tarafından yapılmıştır.
        </p>
        <div className="btn-set">
          <a
            href="https://github.com/AysegulTopyurek"
            target={"_blank"}
            rel={"noReferrer"}
          >
            <img
              src={require("../../assets/github.svg").default}
              alt="github"
            />
          </a>
          <a
            href={"https://www.linkedin.com/in/aysegultopyurek/"}
            target={"_blank"}
            rel={"noReferrer"}
          >
            <img
              src={require("../../assets/linkedin.svg").default}
              alt="linkedin"
            />
          </a>
        </div>
      </footer>
    </div>
  );
};
export default Home;
