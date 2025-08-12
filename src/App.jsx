import "./App.css";

import { useCallback, useEffect, useState } from "react";

import { Words } from "./components/db/Words";

import StartScreen from "./components/StartScreen";
import Game from "./components/Game";
import GameOver from "./components/GameOver";

const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" },
];

function App() {
  const [words] = useState(Words);
  const [pickedWord, setPickedWord] = useState('');
  const [pickedCategory, setPickedCategory] = useState('frutas');
  const [letters, setLetters] = useState([]);
  const [gameStage, setGameStage] = useState(stages[0].name);

  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setguesses] = useState(10);
  const [score, setScore] = useState();

  const pickedWordAndCategory = () => {
    let category = Object.keys(words);
    category =
      category[Math.floor(Math.random() * Object.keys(category).length)];

    let word =
      words[category][
        Math.floor(Math.random() * Object.keys(words[category]).length)
      ];

    return { word, category };
  };

  const startGame = () => {
    setGameStage(stages[1].name);

    const { word, category } = pickedWordAndCategory();

    let wordLetters = word.split("");
    wordLetters = wordLetters.map((l) => l.toLowerCase());

    setPickedWord(word);
    setPickedCategory(category);
    setLetters(wordLetters);
    
  };
  
  const verifyLetter = (letter) => {
    const normalizedLetter = letter.toLowerCase()

    if (guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)) {
      return;
    }

    if (letters.includes(normalizedLetter)) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizedLetter
      ])
    }else{
      setWrongLetters((actualWrongGuessedLetters) => [
        ...actualWrongGuessedLetters,
        normalizedLetter
      ])
    }
    
  };

  const retry = () => {
    setGameStage(stages[0].name);
  };

  return (
    <div className="App">
      {gameStage === "start" && <StartScreen startGame={startGame} />}
      {gameStage == "game" && (
        <Game
          verifyLetter={verifyLetter}
          pickedWord={pickedWord}
          pickedCategory={pickedCategory}
          letters={letters}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score}
        />
      )}
      {gameStage == "end" && <GameOver retry={retry} />}
    </div>
  );
}

export default App;
