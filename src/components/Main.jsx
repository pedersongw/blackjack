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
  const [windowSize, setWindowSize] = useState([0, 0]);
  const [cards, setCards] = useState([]);
  const [shuffling, setShuffling] = useState(["in", true]);

  const [hk, setHk] = useState([0, 0]);
  const [cardSize, setCardSize] = useState([0, 0]);

  const [whereShuffle, setWhereShuffle] = useState({});

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

  useEffect(() => {
    console.log(hk);
  }, [hk]);

  const changeBackground = () => {
    let bg = [...background];
    bg.unshift(bg.pop());
    console.log(bg);
    setBackground(bg);
  };

  function handleResize() {
    setWindowSize([window.innerWidth, window.innerHeight]);
    let shuffleRect = shuffleRef.current.getBoundingClientRect();
    let cardHeight = shuffleRect.height * 0.8;
    let cardWidth = (cardHeight / 333) * 234;
    setCardSize([cardWidth, cardHeight]);
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

  const transitions = useTransition(cards, {
    from: {
      transform: `translate3d(${hk[0]}px, ${hk[1]}px, 0) scale(1)`,
    },
    enter: {
      transform: `translate3d(50px, 0px, 0) scale(0.5)`,
    },
    leave: {
      transform: `translate3d(${hk[0]}px, ${hk[1]}px, 0) scale(1)`,
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
          deal card
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

      <animated.div
        className={styles.handWrapper}
        ref={handRef}
        style={{
          ...spring,

          backgroundColor: "yellow",
        }}
      >
        <div className={styles.hand}>
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
        </div>
      </animated.div>
      <div className={styles.shuffleWrapper} ref={shuffleRef}>
        {hk[0] + "   " + hk[1]}
        <Shuffle
          rect={whereShuffle}
          setHk={setHk}
          hk={hk}
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
