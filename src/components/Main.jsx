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

import C2 from "../svg_playing_cards/fronts/png_96_dpi/clubs_2.png";
import C3 from "../svg_playing_cards/fronts/png_96_dpi/clubs_3.png";
import C4 from "../svg_playing_cards/fronts/png_96_dpi/clubs_4.png";
import C5 from "../svg_playing_cards/fronts/png_96_dpi/clubs_5.png";
import C6 from "../svg_playing_cards/fronts/png_96_dpi/clubs_6.png";
import C7 from "../svg_playing_cards/fronts/png_96_dpi/clubs_7.png";
import C8 from "../svg_playing_cards/fronts/png_96_dpi/clubs_8.png";
import C9 from "../svg_playing_cards/fronts/png_96_dpi/clubs_9.png";
import C10 from "../svg_playing_cards/fronts/png_96_dpi/clubs_10.png";
import CJ from "../svg_playing_cards/fronts/png_96_dpi/clubs_jack.png";
import CQ from "../svg_playing_cards/fronts/png_96_dpi/clubs_queen.png";
import CK from "../svg_playing_cards/fronts/png_96_dpi/clubs_king.png";
import CA from "../svg_playing_cards/fronts/png_96_dpi/clubs_ace.png";

import D2 from "../svg_playing_cards/fronts/png_96_dpi/diamonds_2.png";
import D3 from "../svg_playing_cards/fronts/png_96_dpi/diamonds_3.png";
import D4 from "../svg_playing_cards/fronts/png_96_dpi/diamonds_4.png";
import D5 from "../svg_playing_cards/fronts/png_96_dpi/diamonds_5.png";
import D6 from "../svg_playing_cards/fronts/png_96_dpi/diamonds_6.png";
import D7 from "../svg_playing_cards/fronts/png_96_dpi/diamonds_7.png";
import D8 from "../svg_playing_cards/fronts/png_96_dpi/diamonds_8.png";
import D9 from "../svg_playing_cards/fronts/png_96_dpi/diamonds_9.png";
import D10 from "../svg_playing_cards/fronts/png_96_dpi/diamonds_10.png";
import DJ from "../svg_playing_cards/fronts/png_96_dpi/diamonds_jack.png";
import DQ from "../svg_playing_cards/fronts/png_96_dpi/diamonds_queen.png";
import DK from "../svg_playing_cards/fronts/png_96_dpi/diamonds_king.png";
import DA from "../svg_playing_cards/fronts/png_96_dpi/diamonds_ace.png";

import H2 from "../svg_playing_cards/fronts/png_96_dpi/hearts_2.png";
import H3 from "../svg_playing_cards/fronts/png_96_dpi/hearts_3.png";
import H4 from "../svg_playing_cards/fronts/png_96_dpi/hearts_4.png";
import H5 from "../svg_playing_cards/fronts/png_96_dpi/hearts_5.png";
import H6 from "../svg_playing_cards/fronts/png_96_dpi/hearts_6.png";
import H7 from "../svg_playing_cards/fronts/png_96_dpi/hearts_7.png";
import H8 from "../svg_playing_cards/fronts/png_96_dpi/hearts_8.png";
import H9 from "../svg_playing_cards/fronts/png_96_dpi/hearts_9.png";
import H10 from "../svg_playing_cards/fronts/png_96_dpi/hearts_10.png";
import HJ from "../svg_playing_cards/fronts/png_96_dpi/hearts_jack.png";
import HQ from "../svg_playing_cards/fronts/png_96_dpi/hearts_queen.png";
import HK from "../svg_playing_cards/fronts/png_96_dpi/hearts_king.png";
import HA from "../svg_playing_cards/fronts/png_96_dpi/hearts_ace.png";

import S2 from "../svg_playing_cards/fronts/png_96_dpi/spades_2.png";
import S3 from "../svg_playing_cards/fronts/png_96_dpi/spades_3.png";
import S4 from "../svg_playing_cards/fronts/png_96_dpi/spades_4.png";
import S5 from "../svg_playing_cards/fronts/png_96_dpi/spades_5.png";
import S6 from "../svg_playing_cards/fronts/png_96_dpi/spades_6.png";
import S7 from "../svg_playing_cards/fronts/png_96_dpi/spades_7.png";
import S8 from "../svg_playing_cards/fronts/png_96_dpi/spades_8.png";
import S9 from "../svg_playing_cards/fronts/png_96_dpi/spades_9.png";
import S10 from "../svg_playing_cards/fronts/png_96_dpi/spades_10.png";
import SJ from "../svg_playing_cards/fronts/png_96_dpi/spades_jack.png";
import SQ from "../svg_playing_cards/fronts/png_96_dpi/spades_queen.png";
import SK from "../svg_playing_cards/fronts/png_96_dpi/spades_king.png";
import SA from "../svg_playing_cards/fronts/png_96_dpi/spades_ace.png";

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

  const [cardsInDeck, setCardsInDeck] = useState([
    C2,
    C3,
    C4,
    C5,
    C6,
    C7,
    C8,
    C9,
    C10,
    CJ,
    CQ,
    CK,
    CA,
    D2,
    D3,
    D4,
    D5,
    D6,
    D7,
    D8,
    D9,
    D10,
    DJ,
    DQ,
    DK,
    DA,
    H2,
    H3,
    H4,
    H5,
    H6,
    H7,
    H8,
    H9,
    H10,
    HJ,
    HQ,
    HK,
    HA,
    S2,
    S3,
    S4,
    S5,
    S6,
    S7,
    S8,
    S9,
    S10,
    SJ,
    SQ,
    SK,
    SA,
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

  const resetDeck = () => {
    setCardsInDeck([
      C2,
      C3,
      C4,
      C5,
      C6,
      C7,
      C8,
      C9,
      C10,
      CJ,
      CQ,
      CK,
      CA,
      D2,
      D3,
      D4,
      D5,
      D6,
      D7,
      D8,
      D9,
      D10,
      DJ,
      DQ,
      DK,
      DA,
      H2,
      H3,
      H4,
      H5,
      H6,
      H7,
      H8,
      H9,
      H10,
      HJ,
      HQ,
      HK,
      HA,
      S2,
      S3,
      S4,
      S5,
      S6,
      S7,
      S8,
      S9,
      S10,
      SJ,
      SQ,
      SK,
      SA,
    ]);
  };

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
                let deck = [...cardsInDeck];
                let cards = [...prevCards];
                let cardDealt = [
                  deck[Math.floor(Math.random() * deck.length)],
                  false,
                ];
                for (let i = 0; i < deck.length; i++) {
                  if (cardDealt[0] === deck[i]) {
                    console.log("card found");
                    deck.splice(i, 1);
                  }
                }
                cards.push(cardDealt);
                setCardsInDeck(deck);
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
                let deck = [...cardsInDeck];
                let cards = [...prevCards];
                let cardDealt = [
                  deck[Math.floor(Math.random() * deck.length)],
                  false,
                ];
                for (let i = 0; i < deck.length; i++) {
                  if (cardDealt[0] === deck[i]) {
                    console.log("card found");
                    deck.splice(i, 1);
                  }
                }
                cards.push(cardDealt);
                setCardsInDeck(deck);
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
