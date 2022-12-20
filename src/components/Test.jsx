import React, { useState, useEffect } from "react";

const Test = () => {
  const [score, setScore] = useState([0]);

  const testFunc = () => {
    if (score[1]) {
      if (score[1] === 21) {
        console.log("don't draw");
      } else if (score[1] > 17 && score[1] < 21) {
        console.log("don't draw");
      } else if ((score[1] > 21 && score[0] < 17) || score[1] < 17) {
        console.log("draw");
      } else {
        console.log("don't draw");
      }
    } else {
      if (score[0] === 21) {
        console.log("don't draw");
      } else if (score[0] < 17) {
        console.log("draw");
      } else {
        console.log("don't draw");
      }
    }
  };
  return (
    <div>
      <label>
        [0]
        <input
          onChange={(e) => {
            let arr = [...score];
            arr[0] = Number(e.target.value);
            setScore(arr);
          }}
        ></input>
      </label>
      <label>
        [1]
        <input
          onChange={(e) => {
            let arr = [...score];
            arr[1] = Number(e.target.value);
            setScore(arr);
          }}
        ></input>
        <button onClick={() => testFunc()}>button</button>
      </label>
    </div>
  );
};

export default Test;
