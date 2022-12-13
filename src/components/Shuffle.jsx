import React, { useState, useEffect, useRef, createElement } from "react";
import { useSprings, animated } from "@react-spring/web";
import styles from "./Shuffle.module.css";

const Shuffle = (props) => {
  const [coords, setCoords] = useState([]);

  const [lastCardMoved, setLastCardMoved] = useState(52);
  const [zIndexes, setZIndexes] = useState([]);

  const [faces, setFaces] = useState(null);
  const [facesLoaded, setFacesLoaded] = useState(null);

  const ref = useRef(null);

  const [springs, api] = useSprings(
    coords.length,
    (index) => ({
      xy: coords[index],
    }),
    []
  );

  const [flipSprings, flipSpringsApi] = useSprings(
    coords.length,
    (index) => ({
      from: { transform: `perspective(600px) rotateX(0deg)` },
    }),
    []
  );

  const resetFaces = () => {
    let arr = [];
    let loadedArr = [];
    for (let i = 0; i < 52; i++) {
      arr.push(null);
      loadedArr.push(false);
    }
    setFaces(arr);
    setFacesLoaded(loadedArr);
  };

  useEffect(() => {
    resetFaces();
  }, []);

  useEffect(() => {
    if (props.shuffling[0] === "in" && props.shuffling[1]) {
      for (let i = 0; i < coords.length; i++) {
        setTimeout(() => {
          if (i === 51) {
            api.current[i].start({
              xy: [props.hk[0], props.hk[1]],
              onStart: () => {
                props.setShuffling(["in", false]);
                console.log("last card", props.hk);
              },
              config: {
                friction: 30,
                clamp: true,
              },
            });
          } else {
            api.current[i].start({
              xy: [props.hk[0], props.hk[1]],

              config: {
                friction: 30,
              },
            });
          }
        }, Math.pow(i, 2));
      }
    } else if (props.shuffling[0] === "out" && props.shuffling[1]) {
      for (let i = 51; i >= 0; i--) {
        setTimeout(() => {
          if (i === 0) {
            api.current[i].start({
              xy: [coords[i][0], coords[i][1]],
              onStart: () => {
                setTimeout(() => {
                  props.changeBackground();
                }, 350);
              },
              config: { friction: 100 },
            });
          } else {
            api.current[i].start({
              xy: [coords[i][0], coords[i][1]],
              config: { friction: 100 },
            });
          }
        }, Math.pow(51 - i, 2));
      }
    }
  }, [props.shuffling]);

  useEffect(() => {
    props.setShuffling(["in", true]);
  }, [props.background]);

  useEffect(() => {
    if (coords !== []) {
      props.setShuffling(["in", true]);
    }
  }, [coords]);

  useEffect(() => {
    if (coords !== []) {
      props.setShuffling(["in", true]);
    }
  }, [props.hk]);

  useEffect(() => {
    if (props.rect.height && props.cardSize) {
      let h = Math.floor(props.rect.width / 2 - props.cardSize[0] / 2);
      let k = Math.floor(
        props.rect.height * 0.1 + (window.innerHeight / 3) * 2
      );

      props.setHk([h, k]);

      let radius =
        2 *
        (window.innerWidth > window.innerHeight
          ? window.innerWidth
          : window.innerHeight);

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

      setCoords(coords);
    }
  }, [props.rect]);

  const dealCard = (arg) => {
    console.log(props);
    let cards;
    let previousCards;
    let determineSpringProps;
    if (arg === "dealer") {
      cards = props.dealerCardsDealt;
      previousCards = props.previousDealerCardsDealt;
      determineSpringProps = "dealer";
    } else if (arg === "player") {
      cards = props.playerCardsDealt;
      previousCards = props.previousPlayerCardsDealt;
      determineSpringProps = "player";
    }

    console.log(arg, cards, previousCards, determineSpringProps);
    if (cards.length !== previousCards.length) {
      let difference = cards.length - previousCards.length;
      let startingIndex = cards.length - difference;
      let newCards = cards.slice(-Math.abs(difference));
      for (let i = 0; i < newCards.length; i++) {
        let thisCard = lastCardMoved - 1;
        setFaces((prevFaces) => {
          let faces = [...prevFaces];
          faces[thisCard] =
            arg === "dealer"
              ? props.dealerCardsDealt[startingIndex + i][0]
              : props.playerCardsDealt[startingIndex + i][0];
          return faces;
        });
        setTimeout(() => {
          setLastCardMoved(thisCard);
          setZIndexes((prevIndexes) => {
            let indexes = [...prevIndexes];
            indexes[thisCard] = 51 - thisCard;
            return indexes;
          });

          flipSpringsApi.current[thisCard].start({
            to: {
              transform: `perspective(600px) rotateX(180deg)`,
            },
            config: {
              mass: 17.3,
              tension: 86,
              friction: 113,
              clamp: true,
            },
          });
          api.current[thisCard].start({
            xy: [
              props[`${determineSpringProps}CardSlots`][startingIndex + i].x,
              props[`${determineSpringProps}CardSlots`][startingIndex + i].y,
            ],
            config: {
              mass: 17.3,
              tension: 86,
              friction: 113,
              clamp: true,
            },
            onRest: () => {
              setZIndexes((prevIndexes) => {
                let indexes = [...prevIndexes];
                indexes[thisCard] = 0;
                return indexes;
              });
              if (arg === "dealer") {
                props.setDealerCardsDealt((prevCards) => {
                  let cards = [...prevCards];
                  if (cards[startingIndex + i]) {
                    cards[startingIndex + i][1] = true;
                  }
                  return cards;
                });
              } else if (arg === "player") {
                props.setPlayerCardsDealt((prevCards) => {
                  let cards = [...prevCards];
                  if (cards[startingIndex + i]) {
                    cards[startingIndex + i][1] = true;
                  }

                  return cards;
                });
              }

              api.current[thisCard].start({
                xy: [coords[thisCard][0], coords[thisCard][1]],
                immediate: true,
              });
            },
          });
        }, i * 100 + 300);
      }
    }
  };

  useEffect(() => {
    dealCard("dealer");
  }, [props.dealerCardsDealt.length]);

  useEffect(() => {
    dealCard("player");
  }, [props.playerCardsDealt.length]);

  useEffect(() => {
    if (props.dealerCardsDealt.length === 0) {
      resetFaces();
      setZIndexes([0]);
      setLastCardMoved(52);
      api.start({
        xy: [props.hk[0], props.hk[1]],
        immediate: true,
      });
      flipSpringsApi.start({
        to: { transform: `perspective(600px) rotateX(0deg)` },
        immediate: true,
      });
    }
  }, [props.dealerCardsDealt]);

  return (
    <React.Fragment>
      {props.hk &&
        springs.map((anim, index) => (
          <animated.div
            className={styles.card}
            key={index}
            style={{
              transform: springs[index].xy.to(
                (x, y) => `translate3d(${x}px, ${y}px, 0)`
              ),
              width: `${props.cardSize[0]}px`,
              height: `${props.cardSize[1]}px`,
              zIndex: zIndexes[index],
            }}
          >
            <animated.img
              src={faces ? faces[index] : null}
              onLoad={() => console.log(`loaded${index}`)}
              style={{
                ...flipSprings[index],
                rotateX: "180deg",
              }}
              className={styles.cardFace}
            ></animated.img>
            <animated.img
              src={props.background[0]}
              style={{
                ...flipSprings[index],
                WebkitBackfaceVisibility: "hidden",
              }}
              className={styles.cardFace}
            ></animated.img>
          </animated.div>
        ))}
    </React.Fragment>
  );
};

export default Shuffle;
