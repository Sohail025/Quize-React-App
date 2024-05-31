import { useEffect, useReducer } from "react";

import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "../NextButton";
import Progress from "./Progress";
import Finish from "./Finish";
import Timer from "./Timer";
const SECONDS = 30;
const intialValue = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  timeSeconds: null,
};
function reducer(state, action) {
  switch (action.type) {
    case "recieved data":
      return { ...state, questions: action.payload, status: "ready" };
    case "Error":
      return { ...state, questions: action.payload, status: "Error" };
    case "active":
      return {
        ...state,
        status: "active",
        timeSeconds: state.questions.length * SECONDS,
      };
    case "answer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "Nextpage":
      return { ...state, index: state.index + 1, answer: null };
    case "finish":
      return { ...state, status: "finish" };
    case "Restart":
      return { ...intialValue, questions: state.questions, status: "ready" };
    case "timer":
      return {
        ...state,
        timeSeconds: state.timeSeconds - 1,
        status: state.timeSeconds === 0 ? "finish" : state.status,
      };
    default:
      throw new Error("Unknown Action");
  }
}

export default function App() {
  const [{ questions, status, index, answer, points, timeSeconds }, dispatch] =
    useReducer(reducer, intialValue);
  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "recieved data", payload: data }))
      .catch((error) => dispatch({ type: "Error", payload: error }));
  }, []);
  const numQuestion = questions.length;
  const totalPoints = questions.reduce((pre, curr) => pre + curr.points, 0);
  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "ready" && (
          <StartScreen dispatch={dispatch} numQuestion={numQuestion} />
        )}
        {status === "Error" && <Error />}
        {status === "active" && (
          <>
            <Progress
              totalPoints={totalPoints}
              index={index}
              numQuestion={numQuestion}
              points={points}
            />
            <Question
              questions={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <NextButton
              dispatch={dispatch}
              index={index}
              numQuestion={numQuestion}
            />
            <Timer dispatch={dispatch} timeSeconds={timeSeconds} />
          </>
        )}
        {status === "finish" && (
          <Finish
            points={points}
            totalpoints={totalPoints}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}
