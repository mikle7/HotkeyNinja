import type { NextPage } from "next";
import { useCallback, useEffect, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import type { HotkeysEvent } from "react-hotkeys-hook/dist/types";
import { BsAlt, BsCommand, BsShift } from "react-icons/bs";
import { Transition } from "@headlessui/react";

const KeyIcons = {
  control: "Ctrl",
  shift: <BsShift />,
  alt: <BsAlt />,
  meta: <BsCommand />,
  // alt: <BsAlt />,
};

type KeyProps = {
  targetKeys: string[];
};

const Keys = ({
  targetKeys,
  targetCombination,
  onNextRound,
}: {
  targetKeys: string[];
  targetCombination: string;
  onNextRound: () => void;
}) => {
  const [keysPressed, setKeysPressed] = useState<string[]>([]);
  const [keyIndex, setKeyIndex] = useState(0);
  const [wrongKey, setWrongKey] = useState(false);
  const [roundWon, setRoundWon] = useState(false);
  const [correctCombo, setCorrectCombo] = useState<string[]>([]);
  const [isShowing, setIsShowing] = useState(false);

  const handleWrongKey = () => {
    setWrongKey(true);
    setCorrectCombo([]);
    setKeyIndex(0);
    setTimeout(() => {
      setWrongKey(false);
    }, 1000);
  };

  const handleNextRound = () => {
    //TODO: Handle incorrect keys for stats later
    setRoundWon(true);

    setTimeout(() => {
      setRoundWon(false);
      setKeysPressed([]);
      setCorrectCombo([]);
      setKeyIndex(0);
      onNextRound();
    }, 200);
  };

  const handleKey = (event: KeyboardEvent) => {
    event.preventDefault();
    const currentKey = event.key.toLowerCase();

    if (roundWon) return;
    if (event.type === "keydown") setKeysPressed([...keysPressed, currentKey]);
    setWrongKey(false);
    console.log(
      "event type",
      [...correctCombo, currentKey].join("+"),
      "Target",
      targetCombination
    );

    if ([...correctCombo, currentKey].join("+") === targetCombination) {
      console.log("Correct combination!");
      setCorrectCombo([...correctCombo, currentKey]);
      handleNextRound();
      return;
    } else if (currentKey === targetKeys[keyIndex]?.toLowerCase()) {
      if (event.type !== "keyup") {
        console.log("Correct key", currentKey);
        setCorrectCombo([...correctCombo, currentKey]);
        setKeyIndex((prev) => prev + 1);
      }
    } else {
      if (event.type === "keyup" && keysPressed.includes(currentKey)) {
        console.log(
          "WRONG KEY! Key pressed: ",
          currentKey,
          "Expected: ",
          targetKeys[keyIndex]
        );
        handleWrongKey();
      }
    }
  };

  useHotkeys(["*", targetCombination], handleKey, {
    keyup: true,
    keydown: true,
    preventDefault: true,
  });

  return (
    <div>
      <p>Expected keys: {targetKeys.join(", ")}</p>
      <p>Keys pressed: {keysPressed.join(", ")}</p>

      <div className="flex  flex-col items-center justify-center">
        <div
          className={` mt-8 grid w-60 grid-flow-col ${
            wrongKey && "animate-shake"
          }`}
        >
          {targetKeys.map((key, i) => {
            return (
              <div
                key={i}
                className={`  mx-2 flex h-14 w-fit items-center justify-center rounded-md border border-[#ffffff0d] bg-gradient-to-b from-background to-foreground p-4 text-center  font-medium uppercase text-white shadow-[0_0_0.375rem_0_rgba(0,0,0,0.25)] ${
                  (correctCombo.includes(key) || roundWon) &&
                  // key === expectedKeys[currentExpectedKeyIndex] &&
                  " from-green to-green  "
                }
                  `}
              >
                <p
                  key={`${key}-${i}`}
                  className={`  text-2xl ${
                    !keysPressed.includes(key) ? "animate-fade" : null
                  }
                   `}
                >
                  {key}
                </p>
              </div>
            );
          })}
        </div>
        <button onClick={() => setIsShowing((isShowing) => !isShowing)}>
          Toggle
        </button>
      </div>
    </div>
  );
};

export default Keys;
