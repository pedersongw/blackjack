import React, { useState, useEffect, useRef, createElement } from "react";
import { useSprings, animated } from "@react-spring/web";
import styles from "./Shuffle.module.css";

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

const Shuffle = () => {
  const [hk, setHk] = useState({});
  const [coords, setCoords] = useState([]);
  const [shuffling, setShuffling] = useState(false);
  const [background, setBackground] = useState([
    abstractClouds,
    abstractScene,
    abstract,
    astronaut,
    blue,
    blue2,
    cars,
    castle,
    fish,
    frog,
    red,
    red2,
  ]);

  const ref = useRef(null);

  const changeBackground = () => {
    let bg = [...background];
    bg.unshift(bg.pop());
    console.log(bg);
    setBackground(bg);
  };

  const [springs, api] = useSprings(
    coords.length,
    (index) => ({
      xy: coords[index],
    }),
    []
  );

  const shuffleCenter = () => {
    setShuffling(true);

    for (let i = 0; i < coords.length; i++) {
      setTimeout(() => {
        if (i === 51) {
          api.current[i].start({
            xy: [hk["h"], hk["k"]],
            onStart: () => {
              setShuffling(false);
            },
          });
        } else {
          api.current[i].start({ xy: [hk["h"], hk["k"]] });
        }
      }, Math.pow(i, 2));
    }
  };

  const shuffleOut = () => {
    setShuffling(true);

    for (let i = 51; i >= 0; i--) {
      setTimeout(() => {
        if (i === 0) {
          api.current[i].start({
            xy: [coords[i][0], coords[i][1]],
            onRest: () => {
              changeBackground();
              shuffleCenter();
            },
          });
        } else {
          api.current[i].start({ xy: [coords[i][0], coords[i][1]] });
        }
      }, (51 - i) * 25);
    }
  };

  useEffect(() => {
    let radius =
      2 *
      (window.innerWidth > window.innerHeight
        ? window.innerWidth
        : window.innerHeight);
    const { x: h, y: k } = ref.current.getBoundingClientRect();

    setHk({ h: h, k: k });

    // let yDiff = radius + k - (k - radius);
    let coords = [];

    for (let i = 0; i < 52; i++) {
      //   let newY = Math.random() * yDiff + (k - radius);
      //   let x = Math.sqrt(Math.pow(radius, 2) - Math.pow(newY - k, 2));
      //   let newX =
      //     Math.random() >= 0.5
      //       ? ((x + h) / window.innerWidth) * 100
      //       : ((-Math.abs(x) + h) / window.innerWidth) * 100;
      //   let newYvH = (newY / window.innerHeight) * 100;

      //   coords.push([newX, newYvH]);
      let radians = ((Math.PI * 2) / 52) * (i + 1);

      let newX = h + radius * Math.cos(radians);
      let newY = k + radius * Math.sin(radians);
      coords.push([newX, newY]);
    }

    console.log(coords);
    setCoords(coords);
  }, []);

  useEffect(() => {
    if (coords !== []) {
      shuffleCenter();
    }
  }, [coords]);

  return (
    <div className={styles.wrapper}>
      <div id={styles.dot} ref={ref}></div>
      {springs.map((anim, index) => (
        <animated.div
          className={styles.dot}
          key={index}
          style={{
            transform: springs[index].xy.to(
              (x, y) => `translate3d(${x}px, ${y}px, 0)`
            ),
            backgroundImage: `url(${background[0]})`,
          }}
        />
      ))}

      <button onClick={() => shuffleOut()} disabled={shuffling}>
        Shuffle
      </button>
    </div>
  );
};

export default Shuffle;
