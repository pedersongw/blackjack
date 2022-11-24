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
  const [cards, setCards] = useState([]);
  const [shuffling, setShuffling] = useState(["in", true]);
  const [whereHand, setWhereHand] = useState([0, 0]);
  const [hand, setHand] = useState([]);

  const handRef = useRef();
  const backHandRef = useRef();

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

  useEffect(() => {
    const { x, y } = handRef.current.getBoundingClientRect();
    setWhereHand([x, y]);
  }, []);

  const transitions = useTransition(cards, {
    from: {
      transform: `translate3d(${whereDot()[0]}px, ${whereDot()[1]}px, 0)`,
    },
    enter: {
      transform: `translate3d(${whereHand[0]}px, ${whereHand[1]}px, 0)`,
    },
    leave: {
      transform: `translate3d(${whereDot()[0]}px, ${whereDot()[1]}px, 0)`,
    },
    trail: 200,
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
  }));

  const cardTransition = useTransition(hand, {
    from: {
      top: 50,
      right: "0",
      opacity: 0,
    },
    enter: {
      top: 50,
      right: "80%",
      opacity: 1,
    },
    leave: {
      opacity: 0,
    },
  });

  return (
    <div className={styles.wrapper}>
      {transitions((anim, item, t, i) => (
        <animated.div className={styles.card} style={anim}>
          <Card
            index={i}
            returnCard={returnCard}
            background={background[0]}
            changeBackground={changeBackground}
          />
        </animated.div>
      ))}

      <Shuffle
        xy={whereDot()}
        background={background}
        changeBackground={changeBackground}
        shuffling={shuffling}
        setShuffling={setShuffling}
      />
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
      <div className={styles.handWrapper}></div>
      <animated.div
        className={styles.hand}
        style={{
          ...spring,
          backfaceVisibility: "hidden",
          rotateY: "180deg",
        }}
      ></animated.div>
      <animated.div
        className={styles.hand}
        ref={handRef}
        style={{ ...spring, backfaceVisibility: "hidden" }}
      >
        {cardTransition((anim, item, t, i) => (
          <animated.div
            className={styles.handCard}
            style={anim}
            key={Math.random()}
          ></animated.div>
        ))}
      </animated.div>

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
      <button
        className={styles.button}
        onClick={() => {
          let hand = handRef.current;
          let backHand = backHandRef.current;
          hand.style.transform = `perspective(600px) rotateY(0deg)`;
          backHand.style.transform = `perspective(600px) rotateY(180deg)`;
        }}
      >
        revert
      </button>
      <button
        className={styles.button}
        onClick={() => {
          setHand((prevHand) => {
            let hand = [...prevHand];
            hand.push(1);
            return hand;
          });
        }}
      >
        add card
      </button>
    </div>
  );
};

export default Main;
