import React, { useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import styles from "./Main.module.css";

const Main = () => {
  const [flipped, setFlipped] = useState(false);
  const spring = useSpring({
    transform: `perspective(600px) scale(${flipped ? 0.5 : 1}) rotateX(${
      flipped ? 180 : 0
    }deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });
  const secondSpring = useSpring({
    transform: flipped ? `translate3d(400px,0,0)` : `translate3d(0px,0,0)`,
  });
  return (
    <animated.div className={styles.card} style={secondSpring}>
      <animated.div
        id={styles.front}
        className={styles.face}
        onClick={() => setFlipped(!flipped)}
        style={{
          ...spring,
          backfaceVisibility: "hidden",
        }}
      ></animated.div>
      <animated.div
        id={styles.back}
        className={styles.face}
        onClick={() => setFlipped(!flipped)}
        style={{
          ...spring,
          backfaceVisibility: "hidden",
          rotateX: "180deg",
        }}
      ></animated.div>
    </animated.div>
  );
};

export default Main;
