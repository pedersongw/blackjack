import React, { useState } from "react";
import styles from "./Test.module.css";
import { useSpring, animated } from "@react-spring/web";

const Test = () => {
  const [boxShadowString, setBoxShadowString] = useState(
    "0px 0px 0px 13px #333"
  );
  const [formFieldOne, setFormFieldOne] = useState("0px");
  const [formFieldTwo, setFormFieldTwo] = useState("0px");
  const [formFieldThree, setFormFieldThree] = useState("0px");
  const [formFieldFour, setFormFieldFour] = useState("13px");
  const [formFieldFive, setFormFieldFive] = useState("#333");
  const spring = useSpring({
    boxShadow: boxShadowString,
    config: {
      tension: 500,
      mass: 5,
      clamp: true,
    },
  });
  const onFormSubmit = (event) => {
    event.preventDefault();
    setBoxShadowString(
      `${formFieldOne} ${formFieldTwo} ${formFieldThree} ${formFieldFour} ${formFieldFive}`
    );
  };
  return (
    <React.Fragment>
      <animated.div style={spring} className={styles.box} />

      <form className={styles.form} onSubmit={(event) => onFormSubmit(event)}>
        <input
          className={styles.input}
          value={formFieldOne}
          onChange={(event) => setFormFieldOne(event.target.value)}
        ></input>
        <input
          className={styles.input}
          value={formFieldTwo}
          onChange={(event) => setFormFieldTwo(event.target.value)}
        ></input>
        <input
          className={styles.input}
          value={formFieldThree}
          onChange={(event) => setFormFieldThree(event.target.value)}
        ></input>
        <input
          className={styles.input}
          value={formFieldFour}
          onChange={(event) => setFormFieldFour(event.target.value)}
        ></input>
        <input
          className={styles.input}
          value={formFieldFive}
          onChange={(event) => setFormFieldFive(event.target.value)}
        ></input>
        <button type="submit">Change</button>
      </form>
    </React.Fragment>
  );
};

export default Test;
