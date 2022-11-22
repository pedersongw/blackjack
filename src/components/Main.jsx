import React, { useState } from "react";
import { useTransition, animated } from "@react-spring/web";

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

  const transitions = useTransition(cards, {
    from: {
      transform: `translate3d(${whereDot()[0]}px, ${whereDot()[1]}px, 0)`,
    },
    enter: { transform: `translate3d(0px, 0px, 0)` },
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

  return (
    <div>
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
        background={background[0]}
        changeBackground={changeBackground}
      />
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
    </div>
  );
};

export default Main;
