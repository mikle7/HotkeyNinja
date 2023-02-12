import type { NextPage } from "next";
import { useCallback, useEffect, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import type { HotkeysEvent } from "react-hotkeys-hook/dist/types";

const ShortcutPage: NextPage = () => {
  // handle what happens on key press

  const [count, setCount] = useState(0);
  const [targetKeys, setTargetKeys] = useState<string[]>([
    "ctrl",
    "shift",
    "up",
  ]);

  const [keysPressed, setKeysPressed] = useState<string[]>([]);

  useHotkeys(
    "*",
    () => {
      console.log("Anything pressed");
    },
    { preventDefault: true }
  );

  const targetString = targetKeys.join("+");

  console.log(targetString);

  // Individually add the keystrokes but then for each iteration it also adds in the previous keystroke to the string
  // like this: ctrl, ctrl+shift, ctrl+shift+up

  const handleKey = useCallback((event: KeyboardEvent) => {
    console.log("Event", event);
    if (event.key === "Control" || event.key === "Shift") {
      if (!targetKeys.includes(event.key.toLowerCase())) {
        setKeysPressed((prev) => [...prev, event.key.toLowerCase()]);
      }
    } else {
      setKeysPressed([event.key.toLowerCase()]);
    }
  }, []);

  console.log("Keys pressed", keysPressed);

  useHotkeys([targetString, ...targetKeys], handleKey, {});

  // useHotkeys(
  //   [targetString, ...targetKeys],
  //   (keyboardEvent: KeyboardEvent, hotkeysEvent: HotkeysEvent) => {
  //     console.log("Event", keyboardEvent);
  //     console.log("hotkeys", hotkeysEvent);
  //     setCount((count) => count + 1);
  //   },
  //   {}
  // );

  return <span>Pressed a key {count} times.</span>;
};

export default ShortcutPage;
