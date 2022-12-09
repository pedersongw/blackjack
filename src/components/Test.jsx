import React, { useState, useEffect, useRef } from "react";

const Test = () => {
  // const [counter, setCounter] = useState(1);

  // const previousValue = useRef(null);

  // useEffect(() => {
  //   previousValue.current = counter;
  //   console.log(counter);
  // }, [counter]);

  const [arr, setArr] = useState([1, 2, 3]);

  return (
    <div>
      {/* {counter} {previousValue.current} */}
      {/* <button onClick={() => setCounter(counter + 1)}>button</button>
       */}
      <button onClick={() => console.log(arr, arr.length)}>log arr</button>
      <button
        onClick={() =>
          setArr((prevArr) => {
            let arr = [...prevArr];
            arr[arr.length + 5] = true;
            return arr;
          })
        }
      >
        add item
      </button>
    </div>
  );
};

export default Test;
