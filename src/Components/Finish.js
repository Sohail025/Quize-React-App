export default function Finish({ points, totalpoints, dispatch }) {
  const percentage = Math.ceil((points * 100) / totalpoints);
  return (
    <div className="result">
      <p>
        You Scored<strong> {points} </strong>out of {totalpoints} (
        {`${percentage}%`})
      </p>
      <button className="btn " onClick={() => dispatch({ type: "Restart" })}>
        Restart the Quize
      </button>
    </div>
  );
}
