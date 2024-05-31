export default function StartScreen({ dispatch, numQuestion }) {
  return (
    <div className="start">
      <h2>Welcome to the Quize App</h2>
      <h3>{`${numQuestion} Questions for Check you React Knowledge`}</h3>
      <button className="btn" onClick={() => dispatch({ type: "active" })}>
        Let's Start
      </button>
    </div>
  );
}
