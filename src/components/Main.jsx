import React, { useState, useRef, useEffect } from "react";
import { useSpring, animated } from "@react-spring/web";

import Card from "./Card";
import Hand from "./Hand";
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
  const [whereDealerHand, setWhereDealerHand] = useState(null);
  const [wherePlayerHand, setWherePlayerHand] = useState(null);

  const [dealerCardsDealt, setDealerCardsDealt] = useState([]);
  const [previousDealerCardsDealt, setPreviousDealerCardsDealt] = useState([]);
  const [whereDealerCardSlots, setWhereDealerCardSlots] = useState(null);

  const [playerCardsDealt, setPlayerCardsDealt] = useState([]);
  const [previousPlayerCardsDealt, setPreviousPlayerCardsDealt] = useState([]);
  const [wherePlayerCardSlots, setWherePlayerCardSlots] = useState(null);

  const [testRect, setTestRect] = useState(null);

  const [isTestCardVisiblie, setIsTestCardVisible] = useState(false);

  const [shuffling, setShuffling] = useState(["in", true]);
  const [dealerFlipping, setDealerFlipping] = useState(false);
  const [playerFlipping, setPlayerFlipping] = useState(false);

  const [hk, setHk] = useState([0, 0]);
  const [whereShuffle, setWhereShuffle] = useState({});

  const wrapperRef = useRef();

  const dealerHandRef = useRef();
  const playerHandRef = useRef();
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

    setBackground(bg);
  };

  const calculateCardSize = () => {
    let dealerHandRect = dealerHandRef.current.getBoundingClientRect();
    setWhereDealerHand(dealerHandRect);

    let playerHandRect = playerHandRef.current.getBoundingClientRect();
    setWherePlayerHand(playerHandRect);

    let availableHandHeight = dealerHandRect.height * 0.9;
    let availableHandWidth = dealerHandRect.width * 0.9;
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

  useEffect(() => {
    console.log(whereDealerCardSlots);
  }, [whereDealerCardSlots]);

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <div className={styles.handWrapper} ref={dealerHandRef}>
        <Hand
          cards={dealerCardsDealt}
          setCards={setDealerCardsDealt}
          previousCards={previousDealerCardsDealt}
          background={background[0]}
          cardSize={cardSize}
          whereHand={whereDealerHand}
          flipping={dealerFlipping}
          setFlipping={setDealerFlipping}
          whereSlots={whereDealerCardSlots}
          setSlots={setWhereDealerCardSlots}
        />
      </div>

      <div className={styles.handWrapper} ref={playerHandRef}>
        <Hand
          cards={playerCardsDealt}
          setCards={setPlayerCardsDealt}
          previousCards={previousPlayerCardsDealt}
          background={background[0]}
          cardSize={cardSize}
          whereHand={wherePlayerHand}
          flipping={playerFlipping}
          setFlipping={setPlayerFlipping}
          whereSlots={wherePlayerCardSlots}
          setSlots={setWherePlayerCardSlots}
        />
        {/* <animated.div
          className={styles.handFlip}
          style={{
            ...spring,
            paddingLeft: whereDealerHand
              ? `${whereDealerHand.width * 0.05}px`
              : "0px",
            paddingTop: whereDealerHand
              ? `${whereDealerHand.height * 0.05}px`
              : "0px",
            backgroundColor: "yellow",
            backfaceVisibility: "hidden",
          }}
        >
          <div
            className={styles.hand}
            style={{
              width: `${cardSize[0] * (1 + 2 / 3)}px`,
              height: "90%",
            }}
          >
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
          </div>

          <button onClick={() => setDealerFlipping(true)}>flip</button>
        </animated.div>
        <animated.div
          className={styles.handFlip}
          style={{
            ...spring,
            rotateX: "180deg",
            backgroundColor: "yellow",
            backfaceVisibility: "hidden",
          }}
        ></animated.div> */}
      </div>
      <div className={styles.shuffleWrapper} ref={shuffleRef}>
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
            setDealerFlipping(true);
            setPlayerFlipping(true);
          }}
        >
          flip
        </button>
        <button
          className={styles.button}
          onClick={() => {
            if (dealerCardsDealt.length < 6) {
              setDealerCardsDealt((prevCards) => {
                setPreviousDealerCardsDealt(prevCards);

                let cards = [...prevCards];

                cards.push([
                  background[Math.floor(Math.random() * background.length)],
                  false,
                ]);
                return cards;
              });
            }
          }}
        >
          add dealer card
        </button>
        <button
          className={styles.button}
          onClick={() => {
            if (playerCardsDealt.length < 6) {
              setPlayerCardsDealt((prevCards) => {
                setPreviousPlayerCardsDealt(prevCards);

                let cards = [...prevCards];

                cards.push([
                  background[Math.floor(Math.random() * background.length)],
                  false,
                ]);
                return cards;
              });
            }
          }}
        >
          add player card
        </button>

        <Shuffle
          rect={whereShuffle}
          windowSize={windowSize}
          setHk={setHk}
          dealerCardsDealt={dealerCardsDealt}
          setDealerCardsDealt={setDealerCardsDealt}
          previousDealerCardsDealt={previousDealerCardsDealt}
          dealerCardSlots={whereDealerCardSlots && whereDealerCardSlots}
          playerCardsDealt={playerCardsDealt}
          setPlayerCardsDealt={setPlayerCardsDealt}
          previousPlayerCardsDealt={previousPlayerCardsDealt}
          playerCardSlots={wherePlayerCardSlots && wherePlayerCardSlots}
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
