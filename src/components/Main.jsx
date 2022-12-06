import React, { useState, useRef, useEffect } from "react";
import { useSpring, animated } from "@react-spring/web";

import Card from "./Card";
import Shuffle from "./Shuffle";

import styles from "./Main.module.css";

import abstractClouds from "../svg_playing_cards/backs/png_96_dpi/abstract_clouds.png";
import abstractScene from "../svg_playing_cards/backs/png_96_dpi/abstract_scene.png";
import abstract from "../svg_playing_cards/backs/png_96_dpi/abstract.png";
import astronaut from "../svg_playing_cards/backs/png_96_dpi/astronaut.png";
import blue from "../svg_playing_cards/backs/png_96_dpi/blue.png";
import blue2 from "../svg_playing_cards/backs/png_96_dpi/blue2.png";
import cars from "../svg_playing_cards/backs/png_96_dpi/cars.png";
import castle from "../svg_playing_cards/backs/png_96_dpi/castle.png";
import fish from "../svg_playing_cards/backs/png_96_dpi/fish.png";
import frog from "../svg_playing_cards/backs/png_96_dpi/frog.png";
import red from "../svg_playing_cards/backs/png_96_dpi/red.png";
import red2 from "../svg_playing_cards/backs/png_96_dpi/red2.png";

import face from "../svg_playing_cards/fronts/png_96_dpi/hearts_queen.png";

const Main = () => {
  const [windowSize, setWindowSize] = useState([0, 0]);
  const [cardSize, setCardSize] = useState([0, 0]);
  const [whereHand, setWhereHand] = useState(null);

  const [whereCardsShouldGo, setWhereCardsShouldGo] = useState(null);
  const [testRect, setTestRect] = useState(null);

  const [isTestCardVisiblie, setIsTestCardVisible] = useState(false);

  const [shuffling, setShuffling] = useState(["in", true]);

  const [hk, setHk] = useState([0, 0]);
  const [whereShuffle, setWhereShuffle] = useState({});

  const wrapperRef = useRef();

  const handRef = useRef();
  const shuffleRef = useRef();
  const testRef = useRef();
  const evenTestierRef = useRef();

  const [background, setBackground] = useState([
    abstractClouds,
    abstractScene,
    red2,
    abstract,
    astronaut,
    blue,
    cars,
    castle,
    fish,
    blue2,
    frog,
    red,
  ]);

  const changeBackground = () => {
    let bg = [...background];
    bg.unshift(bg.pop());

    setBackground(bg);
  };

  const calculateCardSize = () => {
    let handRect = handRef.current.getBoundingClientRect();
    setWhereHand(handRect);
    console.log(handRect, window.innerWidth, window.innerHeight);
    let availableHandHeight = handRect.height * 0.9;
    let availableHandWidth = handRect.width * 0.9;
    let cardHeight;
    let cardWidth = (availableHandWidth / 8) * 3;
    console.log(cardWidth);
    if ((cardWidth / 234) * 333 > availableHandHeight) {
      cardHeight = availableHandHeight;
      cardWidth = (cardHeight / 333) * 234;
    } else {
      cardHeight = (cardWidth / 234) * 333;
    }
    setCardSize([cardWidth, cardHeight]);
    console.log(cardWidth);

    calculateWhereCardsShouldGo(handRect, cardWidth);
  };

  const calculateWhereCardsShouldGo = (whereHand, cardWidth) => {
    let coords = [];
    let x = whereHand.x + whereHand.width * 0.05;
    let y = whereHand.y + whereHand.height * 0.05;
    for (let i = 0; i < 6; i++) {
      coords.push([x + cardWidth * (1 / 3) * i, y]);
    }
    setWhereCardsShouldGo(coords);
    console.log(coords);
    let style = window
      .getComputedStyle(handRef.current)
      .getPropertyValue("border-top-width");
    console.log(style);
  };

  function handleResize() {
    setWindowSize([window.innerWidth, window.innerHeight]);
    let shuffleRect = shuffleRef.current.getBoundingClientRect();

    calculateCardSize();

    setWhereShuffle(shuffleRect);
    console.log("resizing");
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
      });
    },
  }));

  const produceTestRectXy = () => {
    const { x, y } = testRef.current.getBoundingClientRect();
    return [x, y];
  };

  const produceTestierRectXy = () => {
    const { x, y } = evenTestierRef.current.getBoundingClientRect();
    return [x, y];
  };

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <div className={styles.buttonWrapper}>
        <button
          onClick={() => setShuffling(["out", true])}
          className={styles.button}
          disabled={shuffling[1]}
        >
          Shuffle
        </button>

        <button
          className={styles.button}
          onClick={() => {
            springApi.start({
              from: { transform: `perspective(600px) rotateX(0deg)` },
              to: {
                transform: `perspective(600px) rotateX(180deg)`,
              },
            });
          }}
        >
          flip
        </button>
        <button
          className={styles.button}
          onClick={() => {
            setIsTestCardVisible(!isTestCardVisiblie);
          }}
        >
          set visible
        </button>
        <button
          className={styles.button}
          onClick={() => {
            console.log(testRef.current.getBoundingClientRect());
          }}
        >
          log test ref
        </button>
      </div>

      <div className={styles.handWrapper} ref={handRef}>
        <animated.div
          className={styles.handFlip}
          style={{
            ...spring,

            backgroundColor: "yellow",
            backfaceVisibility: "hidden",
          }}
        >
          <div
            className={styles.hand}
            style={{
              width: `${cardSize[0] * (1 + 2 / 3)}px`,
              height: "90%",
              marginLeft: whereHand ? `${whereHand.width * 0.05}px` : "0px",
              marginTop: whereHand ? `${whereHand.height * 0.05}px` : "0px",
            }}
          >
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
            <div className={styles.dot} ref={testRef}></div>
            <div className={styles.dot}></div>
          </div>
          <div
            ref={evenTestierRef}
            style={{
              position: "absolute",
              width: `${cardSize[0]}px`,
              height: `${cardSize[1]}px`,
              left: 0,
              top: 0,
              transform: `translate3d(${
                testRef.current &&
                testRef.current.getBoundingClientRect().x - whereHand.x
              }px, ${
                testRef.current &&
                testRef.current.getBoundingClientRect().y - whereHand.y
              }px, 0)`,
              backgroundSize: "cover",
              backgroundImage: `url(${abstractClouds})`,
              visibility: isTestCardVisiblie ? "visible" : "hidden",
              backfaceVisibility: "hidden",
            }}
          ></div>
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
      </div>
      <div className={styles.shuffleWrapper} ref={shuffleRef}>
        <Shuffle
          rect={whereShuffle}
          windowSize={windowSize}
          setHk={setHk}
          hk={hk}
          testXy={evenTestierRef.current && produceTestierRectXy()}
          cardSize={cardSize}
          background={background}
          changeBackground={changeBackground}
          shuffling={shuffling}
          setShuffling={setShuffling}
        />
      </div>
    </div>
  );
};

export default Main;
