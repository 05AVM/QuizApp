import React, { useRef, useState } from "react";
import "./Quiz.css";
import { data } from "../../assets/data";
const Quiz = () => {
  let [index, setIndex] = useState(0); // index 0 is the first state which refers to the initial question..
  let [ques, setQues] = useState(data[index]); 
  // Questions will be displayed in this variable...
  let [lock, setLock] = useState(false);
  let [score, setScore] = useState(0);
  let [result, setResult] = useState(false);

  // here i am using useRef to access the DOM directly as option 1 , option2,option3..
  let option1 = useRef(null);
  let option2 = useRef(null);
  let option3 = useRef(null);
  let option4 = useRef(null);
  let op_ar = [option1, option2, option3, option4];

  const checkans = (e, ans) => {
    //console.log("Your answer: ", ans)
    //console.log( "Correct Answer :", ques.ans)
    if (lock == false) {
      if (ques.ans === ans) {
        e.target.classList.add("Correct");
        setLock(true);
        setScore((prev) => prev + 10);
      } else {
        e.target.classList.add("Wrong");
        setLock(true);
        op_ar[ques.ans - 1].current.classList.add("Correct"); //it adds correct class to the correct option..
      }
    }
  };
  const next = () => {
    if (lock === true) {
      if (index === data.length - 1) {
        setResult(true);
        return 0;
      }
      setIndex(++index);
      setQues(data[index]);
      setLock(false);
      op_ar.map((Option) => {
        Option.current.classList.remove("Correct", "Wrong");
        return null;
      });
    }
  };
  const Reset = () => {
    setIndex(0); //reset the index to first question..
    setQues(data[0]); //reset it to the first question..
    setScore(0);
    setLock(false);
    setResult(false);
  };

  return (
    <div className="container">
      <hr />
      {result ? (
        <></>
      ) : (
        <>
          <h1>
            <i>Quiz App</i>
          </h1>
          <hr />
          <h2>
            {index + 1}.{ques.ques}
          </h2>
          <ul>
            <li
              ref={option1}
              onClick={(e) => {
                checkans(e, 1);
              }}
            >
              {ques.option1}
            </li>
            <li
              ref={option2}
              onClick={(e) => {
                checkans(e, 2);
              }}
            >
              {ques.option2}
            </li>
            <li
              ref={option3}
              onClick={(e) => {
                checkans(e, 3);
              }}
            >
              {ques.option3}
            </li>
            <li
              ref={option4}
              onClick={(e) => {
                checkans(e, 4);
              }}
            >
              {ques.option4}
            </li>
          </ul>
          <button onClick={next}>Next</button>
          <div className="options">
            {" "}
            {index + 1}of {data.length} Questions
          </div>
        </>
      )}
      {result ? (
        <>
          <h2>
            Total Score: {score} out of {data.length * 10}
          </h2>
        </>
      ) : (
        <></>
      )}

      <button onClick={Reset}>Reset</button>
    </div>
  );
};

export default Quiz;

/*useRef:-- The useRef Hook allows you to persist values between renders.
useRef() only returns one item. It returns an Object called current.

When we initialize useRef we set the initial value: useRef(0).

It can be used to store a mutable value that does not cause a re-render when updated.

It can be used to access a DOM element directly.

In React, we can add a ref attribute to an element to access it directly in the DOM.
*/
