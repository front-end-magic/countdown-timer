import "./app.css";
import { useState, useEffect } from "react";

const CountDown = () => {
  const [targetTime, setTargetTime] = useState();
  const [timer, setTimer] = useState();

  const handleTimeChange = (event) => {
    const currentTime = new Date();
    const selectedTime = new Date(event.target.value);
    if (selectedTime >= currentTime) {
      setTargetTime(event.target.value);
    } else {
      setTargetTime("Invalid Time");
      alert("invalid time; please select a future date and time");
    }
  };
  const getTargetTime = new Date(targetTime);
  const getCountDownTime = () => {
    const totalTimeLeft = getTargetTime - new Date();
    const daysLeft = Math.floor(totalTimeLeft / (1000 * 60 * 60 * 24));
    const hoursLeft = Math.floor((totalTimeLeft / (1000 * 60 * 60)) % 24);
    const minutesLeft = Math.floor((totalTimeLeft / (1000 * 60)) % 60);
    const secondsLeft = Math.floor((totalTimeLeft / 1000) % 60);
    return [daysLeft, hoursLeft, minutesLeft, secondsLeft];
  };
  useEffect(() => {
    const total = getTargetTime - new Date();

    const countDownInterval = setInterval(() => {
      console.log(total);
      if (total >= 0) {
        setTimer(getCountDownTime());
      } else {
        clearInterval(countDownInterval);
        alert(`Time up
           Set New Time`);
      }
    }, 1000);

    return () => {
      clearInterval(countDownInterval);
    };
  }, [timer, getTargetTime]);

  return (
    <>
      <div className="container">
        <h1>Countdown Timer</h1>

        <section className="select-time">
          <div>Set Countdown Target Time</div>
          <input
            type="datetime-local"
            value={targetTime}
            onChange={handleTimeChange}
          ></input>
          <div>Countdown Target Time</div>
          <div className="time-set">{targetTime}</div>
        </section>
        <section className="display-time">
          <div className="wrapper">
            <div className="time">{getCountDownTime()[0]}</div>
            <div className="label">Days</div>
          </div>

          <div className="wrapper">
            <div className="time">{getCountDownTime()[1]}</div>
            <div className="label">Hours</div>
          </div>

          <div className="wrapper">
            <div className="time">{getCountDownTime()[2]}</div>
            <div className="label">Minutes</div>
          </div>

          <div className="wrapper">
            <div className="time">{getCountDownTime()[3]}</div>
            <div className="label">Seconds</div>
          </div>
        </section>
      </div>
    </>
  );
};

export default CountDown;
