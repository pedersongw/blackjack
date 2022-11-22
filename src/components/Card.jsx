import React, { useState, useEffect } from "react";
import { useSpring, animated } from "@react-spring/web";
import styles from "./Card.module.css";

import abstractClouds from "../svg_playing_cards/backs/png_96_dpi/abstract_clouds.png";

const Card = (props) => {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState(true);
  const spring = useSpring({
    transform: `perspective(600px) scale(${flipped ? 1 : 0.5}) rotateX(${
      flipped ? 180 : 0
    }deg)`,
  });

  useEffect(() => {
    setFlipped(!flipped);
  }, []);

  return (
    <React.Fragment>
      <animated.div
        id={styles.front}
        className={styles.face}
        onClick={() => {
          console.log("clicked");
          setFlipped(!flipped);
          props.returnCard(props.index);
        }}
        style={{
          ...spring,
          backfaceVisibility: "hidden",
        }}
      ></animated.div>
      <animated.div
        className={styles.face}
        onClick={() => {
          console.log("clicked");
          setFlipped(!flipped);
          props.returnCard(props.index);
        }}
        style={{
          ...spring,
          backfaceVisibility: "hidden",
          rotateX: "180deg",
          backgroundImage: `url(${props.background})`,
        }}
      ></animated.div>
    </React.Fragment>
  );
};

export default Card;
