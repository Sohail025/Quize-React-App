export default function NextButton({ dispatch, index, numQuestion }) {
  return (
    <div>
      {index < numQuestion - 1 && (
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "Nextpage" })}
        >
          Next
        </button>
      )}
      {index === numQuestion - 1 && (
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "finish" })}
        >
          Finish
        </button>
      )}
    </div>
  );
}
