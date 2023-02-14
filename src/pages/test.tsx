import React, { useState, useEffect } from "react";

const hotkeys = [
  ["Control", "Shift", "a"],
  ["Control", "k", "s"],
  ["Control", "p"],
  // ...
];

const HotkeyGame = () => {
  const [expectedKeys, setExpectedKeys] = useState<string[]>(hotkeys[0]);
  const [keysPressed, setKeysPressed] = useState<string[]>([]);
  const [correctKeys, setCorrectKeys] = useState<string[]>([]);
  const [currentHotkeyIndex, setCurrentHotkeyIndex] = useState(0);
  const [currentExpectedKeyIndex, setCurrentExpectedKeyIndex] = useState(0);
  const [gameStatus, setGameStatus] = useState("");
  const [controlPressed, setControlPressed] = useState(false);
  const [shiftPressed, setShiftPressed] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      setKeysPressed((prevKeysPressed) => [...prevKeysPressed, event.key]);
      if (
        event.key.toLowerCase() ===
        expectedKeys[currentExpectedKeyIndex]?.toLowerCase()
      ) {
        setCorrectKeys((prevCorrectKeys) => [...prevCorrectKeys, event.key]);
        setCurrentExpectedKeyIndex((prevIndex) => prevIndex + 1);
      } else {
        //Wrong key pressed
        setCurrentExpectedKeyIndex(0);
        setCorrectKeys([]);
      }

      event.preventDefault();
    };
    // const handleKeyUp = (event) => {
    //   // correctKeys.pop();
    //   // if (event.key === "Control") {
    //   //   console.log("Control key up");
    //   //   setControlPressed(false);
    //   // } else if (event.key === "Shift") {
    //   //   setShiftPressed(false);
    //   // }
    // };
    window.addEventListener("keydown", handleKeyDown);
    // window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      // window.removeEventListener("keyup", handleKeyUp);
    };
  }, [controlPressed, shiftPressed]);

  useEffect(() => {
    if (correctKeys.length === expectedKeys.length) {
      setGameStatus("Correct!");
      loadNextGame();
    }
  }, [keysPressed, expectedKeys, currentHotkeyIndex]);

  const loadNextGame = () => {
    setTimeout(() => {
      setCurrentHotkeyIndex((prevIndex) => prevIndex + 1);
      setExpectedKeys(hotkeys[currentHotkeyIndex + 1]);
      setKeysPressed([]);
      setGameStatus("");
    }, 1000);
  };

  return (
    <div className="flex  flex-col items-center justify-center">
      <p>Expected keys: {expectedKeys.join(", ")}</p>
      <p>Keys pressed: {keysPressed.join(", ")}</p>
      <p>Current key expected: {expectedKeys[currentExpectedKeyIndex]}</p>
      <p>Correct keys: {correctKeys.join(", ")}</p>
      <p>{gameStatus}</p>
      <div className="mt-8 grid w-60 grid-flow-col">
        {expectedKeys.map((key, i) => {
          return (
            <div
              key={i}
              className={` mx-2 flex h-14 w-fit items-center justify-center rounded-md border border-[#ffffff0d] bg-gradient-to-b from-background to-foreground p-4 text-center  font-medium uppercase text-white shadow-[0_0_0.375rem_0_rgba(0,0,0,0.25)] ${
                correctKeys.includes(key) &&
                key === expectedKeys[currentExpectedKeyIndex] &&
                " from-green to-green  "
              }`}
            >
              <p
                className={` text-2xl ${
                  !correctKeys.includes(key) &&
                  !keysPressed.includes(key) &&
                  "animate-fade"
                }`}
              >
                {key}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HotkeyGame;
