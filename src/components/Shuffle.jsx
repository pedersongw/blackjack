import React, { useState, useEffect, useRef, createElement } from "react";
import { useSprings, animated } from "@react-spring/web";
import styles from "./Shuffle.module.css";

const Shuffle = () => {
  const [hk, setHk] = useState({});
  const [coords, setCoords] = useState([]);

  const ref = useRef(null);

  useEffect(() => {
    let radius =
      window.innerWidth < window.innerHeight
        ? window.innerHeight
        : window.innerWidth;
    const { x: h, y: k } = ref.current.getBoundingClientRect();
    let viewportAdjustedH = (h / window.innerWidth) * 100;
    let viewportAdjustedK = (k / window.innerHeight) * 100;

    setHk({ h: viewportAdjustedH, k: viewportAdjustedK });

    let yDiff = radius + k - (k - radius);
    let coords = [];

    for (let i = 0; i < 52; i++) {
      let newY = Math.random() * yDiff + (k - radius);
      let x = Math.sqrt(Math.pow(radius, 2) - Math.pow(newY - k, 2));
      let newX =
        Math.random() >= 0.5
          ? ((x + h) / window.innerWidth) * 100
          : ((-Math.abs(x) + h) / window.innerWidth) * 100;
      let newYvH = (newY / window.innerHeight) * 100;

      coords.push([newX, newYvH]);
    }
    console.log(coords);
    setCoords(coords);
  }, []);

  const [springs, api] = useSprings(
    coords.length,
    (index) => ({
      xy: coords[index],
    }),
    []
  );

  const shuffleCenter = () => {
    for (let i = coords.length; i > 0; i--) {
      console.log(i);
      setTimeout(() => {
        api.current[i].start({ xy: [hk["h"], hk["k"]] });
      }, i * 100);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div id={styles.dot} ref={ref}></div>
      {springs.map((anim, index) => (
        <animated.div
          className={styles.dot}
          key={index}
          style={{
            transform: springs[index].xy.to(
              (x, y) => `translate3d(${x}vw, ${y}vh, 0)`
            ),
          }}
        />
      ))}
      <button onClick={() => shuffleCenter()}>Button</button>
    </div>
  );
};

export default Shuffle;
