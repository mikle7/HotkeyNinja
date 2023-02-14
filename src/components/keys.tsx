import type { NextPage } from "next";
import { useCallback, useEffect, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import type { HotkeysEvent } from "react-hotkeys-hook/dist/types";
import { BsAlt, BsCommand, BsShift } from "react-icons/bs";

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
}: {
  targetKeys: string[];
  targetCombination: string;
}) => {
  const [keysPressed, setKeysPressed] = useState<string[]>([]);
  const [keyIndex, setKeyIndex] = useState(0);
  const [wrongKey, setWrongKey] = useState(false);
  // const keyIndex = 0;

  useHotkeys(
    "*",
    (event: KeyboardEvent) => {
      if (event.key.toLowerCase() !== targetKeys[keyIndex]?.toLowerCase()) {
        // Handle wrong keys
        setWrongKey(true);
        setKeysPressed([]);
        setKeyIndex(0);
        setTimeout(() => {
          setWrongKey(false);
        }, 1000);
        // setWrongKey(false);
      }
    },
    { preventDefault: true }
  );

  // Individually add the keystrokes but then for each iteration it also adds in the previous keystroke to the string
  // like this: ctrl, ctrl+shift, ctrl+shift+up

  const handleKey = useCallback(
    (event: KeyboardEvent) => {
      setWrongKey(false);

      if (event.key.toLowerCase() === targetKeys[keyIndex]?.toLowerCase()) {
        if (
          [...keysPressed, event.key.toLowerCase()].join("+") ===
          targetCombination
        ) {
          // Full combination, can move to next game
          console.log("Correct!");
          setKeyIndex(0);
          setKeysPressed([]);
        }
        console.log("Correct key", keysPressed, event.key);
        setKeysPressed([...keysPressed, event.key.toLowerCase()]);

        setKeyIndex((prev) => prev + 1);
      }
    },
    [keyIndex, keysPressed, targetKeys, targetCombination]
  );

  console.log("Keys Pressed", keysPressed);

  useHotkeys([...targetKeys, targetCombination], handleKey, {});

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
                  keysPressed.includes(key) &&
                  // key === expectedKeys[currentExpectedKeyIndex] &&
                  " from-green to-green  "
                }


                  `}
              >
                <p
                  className={` text-2xl ${
                    !keysPressed.includes(key) && "animate-fade"
                  }`}
                >
                  {key}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Keys;
