import { type NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import Keys from "../components/keys";
import { trpc } from "../utils/trpc";

type KeyCombinations = {
  title: string;
  description: string;
  shortcut: string;
  category: string;
};

const Home: NextPage = () => {
  const [roundIndex, setRoundIndex] = useState(0);
  const [shortcutInfo, setShortcutInfo] = useState<KeyCombinations[]>([]);
  const [targetKeys, setTargetKeys] = useState<string[]>([]);
  const [targetCombination, setTargetCombination] = useState<string>("");
  const [shortcutTitle, setShorcutTitle] = useState<string>("");
  const [shortcutDescription, setShortcutDescription] = useState<string>("");
  const rounds = 10;
  const [gameOver, setGameOver] = useState(false);

  const handleEndGame = () => {
    setGameOver(true);
    setTargetCombination("");
    setTargetKeys([]);
    setShortcutInfo([]);
    setShorcutTitle("");
    setShortcutDescription("");
    setRoundIndex(0);
  };

  const handleNextRound = () => {
    if (roundIndex === rounds - 1) {
      handleEndGame();
    }
    setRoundIndex(roundIndex + 1);
    const target = shortcutInfo[roundIndex + 1]?.shortcut
      .split("+")
      .map((key: string) => key.trim().toLowerCase());
    if (target) {
      setTargetKeys(target);
      setTargetCombination(target.join("+"));
      setShorcutTitle(shortcutInfo[roundIndex + 1]?.title || "ERROR");
      setShortcutDescription(shortcutInfo[roundIndex + 1]?.description || "");
    } else {
      console.error("No target found");
    }
  };

  const keyCombinations = trpc.example.getVsCodeKeyCombinations.useQuery(
    undefined,
    {
      onSuccess: (data) => {
        // Select 10 random key combinations and put them into state
        const randomKeyCombinations = [];

        for (let i = 0; i < 10; i++) {
          const randomIndex = Math.floor(Math.random() * data.shortcuts.length);
          randomKeyCombinations.push(data.shortcuts[randomIndex]);
        }

        setShortcutInfo(randomKeyCombinations);
        const target = randomKeyCombinations[roundIndex].shortcut
          .split("+")
          .map((key: string) => key.trim().toLowerCase());

        setTargetKeys(target);
        setTargetCombination(target.join("+"));
        setShorcutTitle(randomKeyCombinations[roundIndex].title);
        setShortcutDescription(randomKeyCombinations[roundIndex].description);
      },
      enabled: false,
    }
  );
  const handleStartGame = () => {
    keyCombinations.refetch();
  };

  if (keyCombinations.isError) {
    return <div>Error: {keyCombinations.error.message}</div>;
  }

  return (
    <>
      <Head>
        <title>Hotkey Ninja</title>
        <meta name="description" content="Learn VSCode hotkeys" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container mx-auto flex min-h-screen flex-col items-center justify-center p-4">
        <Keys
          targetKeys={targetKeys}
          targetCombination={targetCombination || ""}
          shortcutTitle={shortcutTitle}
          shortcutDescription={shortcutDescription}
          onNextRound={handleNextRound}
        />
        <div
          onClick={gameOver ? handleStartGame : handleEndGame}
          className="mt-8 rounded-md border border-slate-600 p-4 text-white hover:cursor-pointer hover:border-slate-800 hover:bg-slate-800"
        >
          {gameOver ? "Start Game" : "End Game"}
        </div>
      </main>
    </>
  );
};

export default Home;
