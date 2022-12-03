import React, { useState, useEffect, useRef, createElement } from "react";
import { useSprings, animated } from "@react-spring/web";
import styles from "./Shuffle.module.css";

const Shuffle = (props) => {
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
              xy: [props.hk[0], props.hk[1]],
              onStart: () => {
                props.setShuffling(["in", false]);
                console.log("last card", props.hk);
              },
              config: {
                friction: 30,
                clamp: true,
              },
            });
          } else {
            api.current[i].start({
              xy: [props.hk[0], props.hk[1]],
              onStart: () => {
                props.setShuffling(["in", false]);
                console.log("card", props.hk);
              },
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
    if (coords !== []) {
      props.setShuffling(["in", true]);
    }
  }, [coords]);

  useEffect(() => {
    if (coords !== []) {
      props.setShuffling(["in", true]);
    }
    console.log(props.hk);
  }, [props.hk]);

  useEffect(() => {
    if (props.rect.height && props.cardSize) {
      let h = Math.floor(props.rect.width / 2 - props.cardSize[0] / 2);
      let k = Math.floor(
        props.rect.height * 0.1 + (window.innerHeight / 3) * 2
      );
      console.log(props.rect.width, props.cardSize);
      props.setHk([h, k]);

      let radius =
        2 *
        (window.innerWidth > window.innerHeight
          ? window.innerWidth
          : window.innerHeight);

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

      setCoords(coords);
    }
  }, [props.rect.height]);

  return (
    <React.Fragment>
      {props.hk &&
        springs.map((anim, index) => (
          <animated.div
            className={styles.card}
            key={index}
            style={{
              transform: springs[index].xy.to(
                (x, y) => `translate3d(${x}px, ${y}px, 0)`
              ),
              backgroundImage: `url(${props.background[0]})`,
              backgroundSize: "cover",
              width: `${props.cardSize[0]}px`,
              height: `${props.cardSize[1]}px`,
            }}
          />
        ))}
    </React.Fragment>
  );
};

export default Shuffle;
