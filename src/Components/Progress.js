export default function Progress({ totalPoints, index, numQuestion, points }) {
  return (
    <header className="progress">
      <progress max={numQuestion} value={index} />
      <p>
        Question
        <strong> {index}</strong>/{numQuestion}
      </p>
      <p>
        <strong>{points}</strong>/{totalPoints}
      </p>
    </header>
  );
}
