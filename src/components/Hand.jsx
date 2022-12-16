import React, { useRef, useEffect } from "react";
import { useSpring, animated } from "@react-spring/web";

import styles from "./Hand.module.css";

const Hand = (props) => {
  const firstRef = useRef();
  const secondRef = useRef();
  const thirdRef = useRef();
  const fourthRef = useRef();
  const fifthRef = useRef();
  const sixthRef = useRef();

  const [spring, springApi] = useSpring(() => ({
    from: {
      transform: `perspective(600px) rotateX(0deg)`,
    },
    onRest: () => {
      springApi.start({
        to: {
          transform: `perspective(600px) rotateX(0deg)`,
        },
        immediate: true,
        onRest: () => {
          props.setFlipping(false);
        },
      });
    },
  }));

  const setSlots = () => {
    let slots = [
      firstRef.current.getBoundingClientRect(),
      secondRef.current.getBoundingClientRect(),
      thirdRef.current.getBoundingClientRect(),
      fourthRef.current.getBoundingClientRect(),
      fifthRef.current.getBoundingClientRect(),
      sixthRef.current.getBoundingClientRect(),
    ];
    props.setSlots(slots);
  };

  useEffect(() => {
    window.addEventListener("resize", setSlots);
    return () => {
      window.removeEventListener("resize", setSlots);
    };
  }, []);

  useEffect(() => {
    setSlots();
  }, [firstRef.current]);

  useEffect(() => {
    if (props.flipping) {
      springApi.start({
        from: { transform: `perspective(600px) rotateX(0deg)` },
        to: {
          transform: `perspective(600px) rotateX(180deg)`,
        },
        onRest: () => {
          props.setCards([]);
        },
      });
    }
  }, [props.flipping]);

  return (
    <React.Fragment>
      <animated.div
        className={styles.handFlip}
        style={{
          ...spring,

          backgroundColor: "lightgreen",
          backfaceVisibility: "hidden",
        }}
      >
        <div
          className={styles.hand}
          style={{
            width: `${props.cardSize[0] * (1 + 2 / 3)}px`,
            height: "90%",
            paddingLeft: props.whereHand
              ? `${props.whereHand.width * 0.05}px`
              : "0px",
            paddingTop: props.whereHand
              ? `${props.whereHand.height * 0.05}px`
              : "0px",
          }}
        >
          <p
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              backgroundColor: props.score[0] > 21 ? "red" : null,
            }}
          >
            {props.score[0]}
          </p>
          <p style={{ position: "absolute", top: 0, right: 0 }}>
            {props.score[1] && props.score[1]}
          </p>
          <div className={styles.dot} ref={firstRef}></div>
          <div className={styles.dot} ref={secondRef}></div>
          <div className={styles.dot} ref={thirdRef}></div>
          <div className={styles.dot} ref={fourthRef}></div>
          <div className={styles.dot} ref={fifthRef}></div>
          <div className={styles.dot} ref={sixthRef}></div>
          {props.cards &&
            props.cards.map((card, index) => {
              return (
                <img
                  key={index}
                  src={props.cards[index][1]}
                  alt="playing card"
                  style={{
                    position: "absolute",
                    width: `${props.cardSize[0]}px`,
                    height: `${props.cardSize[1]}px`,
                    left: 0,
                    top: 0,
                    transform: `translate3d(${
                      props.whereSlots &&
                      props.whereSlots[index].x - props.whereHand.x
                    }px, ${
                      props.whereSlots &&
                      props.whereSlots[index].y - props.whereHand.y
                    }px, 0)`,

                    visibility: props.cards[index][2] ? "visible" : "hidden",
                  }}
                ></img>
              );
            })}
        </div>
      </animated.div>
      <animated.div
        className={styles.handFlip}
        style={{
          ...spring,
          rotateX: "180deg",
          backgroundColor: "lightgreen",
          backfaceVisibility: "hidden",
        }}
      ></animated.div>
    </React.Fragment>
  );
};

export default Hand;
