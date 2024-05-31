import { useEffect } from "react";

export default function Timer({ dispatch, timeSeconds }) {
  useEffect(
    function () {
      const id = setInterval(function () {
        dispatch({ type: "timer" });
      }, 1000);
      return () => clearInterval(id);
    },
    [dispatch, timeSeconds]
  );
  return (
    <div className="timer">{`${Math.floor(timeSeconds / 60)} : ${
      timeSeconds % 60 < 10 ? `0${timeSeconds % 60}` : timeSeconds % 60
    }`}</div>
  );
}
