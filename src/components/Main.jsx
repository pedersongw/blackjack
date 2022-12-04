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

import face from "../svg_playing_cards/fronts/png_96_dpi/hearts_queen.png";

const Main = () => {
  const [windowSize, setWindowSize] = useState([0, 0]);
  const [cardSize, setCardSize] = useState([0, 0]);
  const [testRect, setTestRect] = useState(null);
  const [isTestCardVisible, setIsTestCardVisible] = useState(false);

  const [cards, setCards] = useState([]);
  const [shuffling, setShuffling] = useState(["in", true]);

  const [hk, setHk] = useState([0, 0]);
  const [whereHand, setWhereHand] = useState(null);
  const [whereShuffle, setWhereShuffle] = useState({});

  const wrapperRef = useRef();

  const handRef = useRef();
  const shuffleRef = useRef();
  const testRef = useRef();

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

  function handleResize() {
    setWindowSize([window.innerWidth, window.innerHeight]);
    let shuffleRect = shuffleRef.current.getBoundingClientRect();
    let handRect = handRef.current.getBoundingClientRect();
    let testRect = testRef.current.getBoundingClientRect();
    let cardHeight = shuffleRect.height * 0.8;
    let cardWidth = (cardHeight / 333) * 234;
    setCardSize([cardWidth, cardHeight]);
    setTestRect(testRect);
    setWhereHand([handRect.x, handRect.y]);
    setWhereShuffle(shuffleRect);
    console.log("resizing");
  }

  useEffect(() => {
    console.log(testRect);
  }, [testRect]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const transitions = useTransition(cards, {
    from: {
      transform: `translate3d(${whereHand ? hk[0] - whereHand[0] : 0}px, ${
        whereHand ? hk[1] - whereHand[1] : 0
      }px, 0)`,
    },
    enter: {
      transform: `translate3d(50px, 0px, 0)`,
    },
    leave: {
      transform: `translate3d(${whereHand ? hk[0] - whereHand[0] : 0}px, ${
        whereHand ? hk[1] - whereHand[1] : 0
      }px, 0)`,
    },
  });

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

  const returnCard = (index) => {
    setCards((prevCards) => {
      let arr = [...cards];
      arr.splice(index, 1);
      return arr;
    });
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
              from: { transform: `perspective(600px) rotateX(0deg)` },
              to: {
                transform: `perspective(600px) rotateX(180deg)`,
              },
            })
          }
        >
          flip
        </button>
        <button
          className={styles.button}
          onClick={() => setIsTestCardVisible(!isTestCardVisible)}
        >
          Set Visibility Test Card
        </button>
      </div>

      <div className={styles.handWrapper}>
        {" "}
        <animated.div
          className={styles.handFlip}
          ref={handRef}
          style={{
            ...spring,

            backgroundColor: "yellow",
            backfaceVisibility: "hidden",
          }}
        >
          <div className={styles.hand}>
            {/* {whereHand &&
            transitions((anim, item, t, i) => (
              <animated.div className={styles.card} style={anim}>
                <Card
                  index={i}
                  card={cards[i]}
                  cardSize={cardSize}
                  returnCard={returnCard}
                  background={background[0]}
                  face={face}
                  changeBackground={changeBackground}
                />
              </animated.div>
            ))} */}
          </div>
          <div
            className={styles.testCard}
            ref={testRef}
            style={{
              backgroundImage: `url(${abstractClouds})`,
              backgroundSize: "cover",
              width: `${cardSize[0]}px`,
              height: `${cardSize[1]}px`,
              visibility: isTestCardVisible ? "visible" : "hidden",
            }}
          ></div>
        </animated.div>
        <animated.div
          className={styles.handFlip}
          ref={handRef}
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
          testRect={testRect}
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
