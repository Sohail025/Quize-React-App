import { useReducer } from "react";
const tempValue = { count: 0, step: 1 };
function reducer(state, action) {
  switch (action.type) {
    case "dec":
      return { ...state, count: state.count - state.step };
    case "inc":
      return { ...state, count: state.count + state.step };
    case "defineCount":
      return { ...state, count: action.payload };
    case "defineStep":
      return { ...state, step: action.payload };
    case "reset":
      return tempValue;
    default:
      throw new Error("Unknown Action");
  }
}
function DateCounter() {
  const [state, dispatch] = useReducer(reducer, tempValue);
  const { count, step } = state;
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + state.count);

  const dec = function () {
    dispatch({ type: "dec" });
  };

  const inc = function () {
    dispatch({ type: "inc" });
  };

  const defineCount = function (e) {
    dispatch({ type: "defineCount", payload: Number(e.target.value) });
  };

  const defineStep = function (e) {
    dispatch({ type: "defineStep", payload: Number(e.target.value) });
  };

  const reset = function () {
    dispatch({ type: "reset" });
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
