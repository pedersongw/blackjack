import React, { useState, useEffect, useRef, createElement } from "react";
import { useSprings, animated } from "@react-spring/web";
import styles from "./Shuffle.module.css";

const Shuffle = (props) => {
  const [hk, setHk] = useState({});
  const [coords, setCoords] = useState([]);

  const ref = useRef(null);

  const [springs, api] = useSprings(
    coords.length,
    (index) => ({
      xy: coords[index],
    }),
    []
  );

  useEffect(() => {
    if (props.shuffling[0] === "in" && props.shuffling[1]) {
      for (let i = 0; i < coords.length; i++) {
        setTimeout(() => {
          if (i === 51) {
            api.current[i].start({
              xy: [hk["h"], hk["k"]],
              onStart: () => {
                props.setShuffling(["in", false]);
              },
              config: {
                friction: 30,
              },
            });
          } else {
            api.current[i].start({
              xy: [hk["h"], hk["k"]],
              config: {
                friction: 30,
              },
            });
          }
        }, Math.pow(i, 2));
      }
    } else if (props.shuffling[0] === "out" && props.shuffling[1]) {
      for (let i = 51; i >= 0; i--) {
        setTimeout(() => {
          if (i === 0) {
            api.current[i].start({
              xy: [coords[i][0], coords[i][1]],
              onStart: () => {
                setTimeout(() => {
                  props.changeBackground();
                }, 350);
              },
              config: { friction: 100 },
            });
          } else {
            api.current[i].start({
              xy: [coords[i][0], coords[i][1]],
              config: { friction: 100 },
            });
          }
        }, Math.pow(51 - i, 2));
      }
    }
  }, [props.shuffling]);

  useEffect(() => {
    props.setShuffling(["in", true]);
  }, [props.background]);

  useEffect(() => {
    let radius =
      2 *
      (window.innerWidth > window.innerHeight
        ? window.innerWidth
        : window.innerHeight);
    const { x: h, y: k } = ref.current.getBoundingClientRect();

    setHk({ h: h, k: k });

    // let yDiff = radius + k - (k - radius);
    let coords = [];

    for (let i = 0; i < 52; i++) {
      //   let newY = Math.random() * yDiff + (k - radius);
      //   let x = Math.sqrt(Math.pow(radius, 2) - Math.pow(newY - k, 2));
      //   let newX =
      //     Math.random() >= 0.5
      //       ? ((x + h) / window.innerWidth) * 100
      //       : ((-Math.abs(x) + h) / window.innerWidth) * 100;
      //   let newYvH = (newY / window.innerHeight) * 100;

      //   coords.push([newX, newYvH]);
      let radians = ((Math.PI * 2) / 52) * (i + 1);

      let newX = h + radius * Math.cos(radians);
      let newY = k + radius * Math.sin(radians);
      coords.push([newX, newY]);
    }

    console.log(coords);
    setCoords(coords);
  }, []);

  useEffect(() => {
    if (coords !== []) {
      props.setShuffling(["in", true]);
    }
  }, [coords]);

  return (
    <React.Fragment>
      <div
        id={styles.dot}
        ref={ref}
        style={{ top: `${props.xy[1]}px`, left: `${props.xy[0]}px` }}
      ></div>
      {springs.map((anim, index) => (
        <animated.div
          className={styles.dot}
          key={index}
          style={{
            transform: springs[index].xy.to(
              (x, y) => `translate3d(${x}px, ${y}px, 0)`
            ),
            backgroundImage: `url(${props.background[0]})`,
          }}
        />
      ))}
    </React.Fragment>
  );
};

export default Shuffle;
