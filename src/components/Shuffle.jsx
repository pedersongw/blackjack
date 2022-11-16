import React, { useState } from "react";
import { useSprings, animated } from "@react-spring/web";
import styles from "./Shuffle.module.css";

const Shuffle = () => {
  const [coords, setCoords] = useState([]);
  for (let i = 0; i < 8; i++) {
    let xPos = Math.sqrt(Math.pow(100, 2) - Math.pow());
  }
  return (
    <div className={styles.wrapper}>
      <div
        className={styles.dot}
        style={{ left: coords[0][0], top: coords[0][1] }}
      ></div>
      <div
        className={styles.outerDot}
        style={{ left: coords[1][0], top: coords[1][1] }}
      ></div>
      <div
        className={styles.outerDot}
        style={{ left: coords[2][0], top: coords[2][1] }}
      ></div>
      <div
        className={styles.outerDot}
        style={{ left: coords[3][0], top: coords[3][1] }}
      ></div>
      <div
        className={styles.outerDot}
        style={{ left: coords[4][0], top: coords[4][1] }}
      ></div>
      <div
        className={styles.outerDot}
        style={{ left: coords[5][0], top: coords[5][1] }}
      ></div>
      <div
        className={styles.outerDot}
        style={{ left: coords[6][0], top: coords[6][1] }}
      ></div>
      <div
        className={styles.outerDot}
        style={{ left: coords[7][0], top: coords[7][1] }}
      ></div>
    </div>
  );
};

export default Shuffle;
