import React, { useState, useRef, useEffect } from "react";
import { useSpring, useTransition, animated } from "@react-spring/web";

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

const Main = () => {
  const whereDot = () => {
    return [window.innerWidth / 4, window.innerHeight / 3];
  };
  const [windowSize, setWindowSize] = useState([0, 0]);
  const [cards, setCards] = useState([]);
  const [shuffling, setShuffling] = useState(["in", true]);
  const [whereHand, setWhereHand] = useState([0, 0]);
  const [whereShuffle, setWhereShuffle] = useState({});
  const [handDimensions, setHandDimensions] = useState([0, 0]);

  const handRef = useRef();
  const shuffleRef = useRef();

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
    console.log(bg);
    setBackground(bg);
  };

  function handleResize() {
    setWindowSize([window.innerWidth, window.innerHeight]);
    setShuffle();
    console.log("resizing");
  }

  function setShuffle() {
    let shuffleRect = shuffleRef.current.getBoundingClientRect();
    setWhereShuffle(shuffleRect);
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    handleResize();
    setShuffle();

    let rect = handRef.current.getBoundingClientRect();
    const { right, left, top, bottom } = rect;
    console.log(right - left, bottom - top);
    const { x, y } = rect;
    setWhereHand([x, y]);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const transitions = useTransition(cards, {
    from: {
      transform: `translate3d(${whereDot()[0]}px, ${
        whereDot()[1]
      }px, 0) scale(1)`,
    },
    enter: {
      transform: `translate3d(${whereHand[0]}px, ${whereHand[1]}px, 0) scale(0.5)`,
    },
    leave: {
      transform: `translate3d(${whereDot()[0]}px, ${
        whereDot()[1]
      }px, 0) scale(1)`,
    },
  });

  const returnCard = (index) => {
    setCards((prevCards) => {
      let arr = [...cards];
      arr.splice(index, 1);
      return arr;
    });
  };

  const [spring, springApi] = useSpring(() => ({
    from: {
      transform: `perspective(600px) rotateY(0deg)`,
    },
    onRest: () => {
      springApi.start({
        to: {
          transform: `perspective(600px) rotateY(0deg)`,
        },
        immediate: true,
      });
    },
  }));

  return (
    <div className={styles.wrapper}>
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
          onClick={() =>
            setCards((prevCards) => {
              console.log("clicked");
              let cards = [...prevCards];
              cards.push([0, 0]);
              return cards;
            })
          }
        >
          button
        </button>
        <button className={styles.button} onClick={() => setCards([])}>
          Return All
        </button>
        <button
          className={styles.button}
          onClick={() =>
            springApi.start({
              from: { transform: `perspective(600px) rotateY(0deg)` },
              to: {
                transform: `perspective(600px) rotateY(180deg)`,
              },
            })
          }
        >
          flip
        </button>
      </div>

      <div className={styles.handWrapper} ref={handRef}>
        <animated.div
          className={styles.hand}
          style={{
            ...spring,
            backfaceVisibility: "hidden",
            rotateY: "180deg",
            backgroundColor: "blue",
          }}
        ></animated.div>
        <animated.div
          className={styles.hand}
          style={{
            ...spring,
            backfaceVisibility: "hidden",
            backgroundColor: "yellow",
          }}
        >
          <div className={styles.cardExample}></div>
        </animated.div>
      </div>
      <div className={styles.shuffleWrapper} ref={shuffleRef}>
        {transitions((anim, item, t, i) => (
          <animated.div className={styles.card} style={anim}>
            <Card
              index={i}
              card={cards[i]}
              returnCard={returnCard}
              background={background[0]}
              changeBackground={changeBackground}
            />
          </animated.div>
        ))}
        <Shuffle
          rect={whereShuffle}
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
