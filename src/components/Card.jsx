import React, { useState, useEffect } from "react";
import { useSpring, animated } from "@react-spring/web";
import styles from "./Card.module.css";

import abstractClouds from "../svg_playing_cards/backs/png_96_dpi/abstract_clouds.png";

const Card = (props) => {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState(true);
  const spring = useSpring({
    transform: `perspective(600px) rotateX(${flipped ? 0 : 180}deg)`,
  });

  useEffect(() => {
    setFlipped(!flipped);
  }, []);

  useEffect(() => {
    if (props.card === undefined) {
      setFlipped(true);
      console.log("not in array anymore", props.card);
    }
  }, [props.card]);

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
          backgroundSize: "cover",
          backgroundImage: `url(${props.background})`,
          width: `${props.cardSize[0]}px`,
          height: `${props.cardSize[1]}px`,
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
          backgroundImage: `url(${props.face})`,
          backgroundSize: "cover",
          width: `${props.cardSize[0]}px`,
          height: `${props.cardSize[1]}px`,
        }}
      ></animated.div>
    </React.Fragment>
  );
};

export default Card;
