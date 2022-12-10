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
    console.log("settingSlots");
    let slots = [
      firstRef.current.getBoundingClientRect(),
      secondRef.current.getBoundingClientRect(),
      thirdRef.current.getBoundingClientRect(),
      fourthRef.current.getBoundingClientRect(),
      fifthRef.current.getBoundingClientRect(),
      sixthRef.current.getBoundingClientRect(),
    ];
    props.setSlots(slots);
    console.log(slots);
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
          paddingLeft: props.whereHand
            ? `${props.whereHand.width * 0.05}px`
            : "0px",
          paddingTop: props.whereHand
            ? `${props.whereHand.height * 0.05}px`
            : "0px",
          backgroundColor: "yellow",
          backfaceVisibility: "hidden",
        }}
      >
        <div
          className={styles.hand}
          style={{
            width: `${props.cardSize[0] * (1 + 2 / 3)}px`,
            height: "90%",
          }}
        >
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
                  src={props.background}
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

                    visibility: props.cards[index][1] ? "visible" : "hidden",
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
          backgroundColor: "yellow",
          backfaceVisibility: "hidden",
        }}
      ></animated.div>
    </React.Fragment>
  );
};

export default Hand;
