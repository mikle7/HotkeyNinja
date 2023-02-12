import type { NextPage } from "next";
import { useCallback, useEffect } from "react";

const ShortcutPage: NextPage = () => {
  // handle what happens on key press
  const handleKeyPress = useCallback((event) => {
    console.log(`Key pressed: ${event.key}`);
  }, []);

  useEffect(() => {
    // attach the event listener
    document.addEventListener("keydown", handleKeyPress);

    // remove the event listener
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  return <div>Shortcuts</div>;
};

export default ShortcutPage;
