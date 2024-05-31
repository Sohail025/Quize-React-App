export default function Question({ questions, dispatch, answer }) {
  const isAnswered = answer !== null;
  return (
    <div>
      <h3>{questions.question}</h3>
      {questions.options.map((option, i) => (
        <button
          onClick={() => dispatch({ type: "answer", payload: i })}
          className={`btn btn-option ${i === answer ? "answer" : ""} ${
            isAnswered
              ? i === questions.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          key={option}
          disabled={isAnswered}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
