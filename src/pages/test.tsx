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
  const [currentHotkeyIndex, setCurrentHotkeyIndex] = useState(0);
  const [currentExpectedKeyIndex, setCurrentExpectedKeyIndex] = useState(0);
  const [gameStatus, setGameStatus] = useState("");
  const [controlPressed, setControlPressed] = useState(false);
  const [shiftPressed, setShiftPressed] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      setKeysPressed((prevKeysPressed) => [...prevKeysPressed, event.key]);
      if (event.key === "Control") {
        setControlPressed(true);
      }
      event.preventDefault();
    };
    const handleKeyUp = (event) => {
      if (event.key === "Control") {
        console.log("Control key up");
        setControlPressed(false);
      } else if (event.key === "Shift") {
        setShiftPressed(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [controlPressed, shiftPressed]);

  useEffect(() => {
    if (keysPressed.length === expectedKeys.length) {
      let correct = true;
      for (let i = 0; i < keysPressed.length; i++) {
        console.log("Keys pressed", keysPressed[i]);
        if (keysPressed[i].includes("Control") && !controlPressed) {
          correct = false;
          break;
        }
        if (keysPressed[i]?.toLowerCase() !== expectedKeys[i]?.toLowerCase()) {
          correct = false;
          break;
        }
      }

      if (correct) {
        setGameStatus("Correct!");
        loadNextGame();
      } else {
        setGameStatus("Incorrect!");
        loadNextGame();
      }
    } else {
      if (keysPressed.length > 0) {
        for (let i = 0; i < keysPressed.length; i++) {
          setCurrentExpectedKeyIndex(keysPressed.length);
          if (keysPressed[i] !== expectedKeys[i]) {
            setGameStatus("Incorrect!");
            loadNextGame();
          }
        }
      } else {
        setCurrentExpectedKeyIndex(keysPressed.length);
        setGameStatus("Keep going...");
      }
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
    <div>
      <p>Expected keys: {expectedKeys.join(", ")}</p>
      <p>Keys pressed: {keysPressed.join(", ")}</p>
      <p>Current key expected: {expectedKeys[currentExpectedKeyIndex]}</p>
      <p>{gameStatus}</p>
    </div>
  );
};

export default HotkeyGame;
