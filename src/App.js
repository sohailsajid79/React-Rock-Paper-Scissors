import { useState } from "react";
import { FaHandRock, FaHandPaper, FaHandScissors } from "react-icons/fa";
import "./App.css";

export default function App() {
  const [playerAction, setPlayerAction] = useState("");
  const [computerAction, setComputerAction] = useState("");

  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);

  const [winner, setWinner] = useState("");

  function Player({ name = "Player", score = 0, action = "rock" }) {
    return (
      <div className="player">
        <div className="score">{`${name}: ${score}`}</div>
        <div className="action">
          {action && <ActionIcon action={action} FaHandRock size={60} />}
        </div>
      </div>
    );
  }

  function ActionButton({ action = "rock", onActionSelected }) {
    return (
      <button className="round-btn" onClick={() => onActionSelected(action)}>
        <ActionIcon action={action} size={30} />
      </button>
    );
  }

  function ActionIcon({ action, ...props }) {
    const icons = {
      rock: FaHandRock,
      paper: FaHandPaper,
      scissors: FaHandScissors,
    };
    const Icon = icons[action];
    return <Icon {...props} />;
  }

  const onActionSelected = (selectedAction) => {
    const newComputerAction = randomAction();

    setPlayerAction(selectedAction);
    setComputerAction(newComputerAction);

    const newWinner = calculateWinner(selectedAction, newComputerAction);
    setWinner(newWinner);
    if (newWinner === -1) {
      setPlayerScore(playerScore + 1);
    } else if (newWinner === 1) {
      setComputerScore(computerScore + 1);
    }
  };

  const actions = {
    rock: "scissors",
    paper: "rock",
    scissors: "paper",
  };

  function randomAction() {
    const keys = Object.keys(actions);
    const index = Math.floor(Math.random() * keys.length);
    return keys[index];
  }

  function calculateWinner(action1, action2) {
    if (action1 === action2) {
      return 0;
    } else if (actions[action1] === action2) {
      return -1;
    } else if (actions[action2] === action1) {
      return 1;
    }
    return null;
  }

  function ShowWinner({ winner = 0 }) {
    const text = {
      "-1": "You Win",
      0: "It's a Tie",
      1: "You Lose",
    };
    return <h2>{text[winner]}</h2>;
  }

  return (
    <div className="center">
      <h1>Rock Paper Scissors</h1>
      <div>
        <div className="container">
          <Player
            name="Player Score "
            action={playerAction}
            score={playerScore}
          />
          <Player
            name="Computer Score "
            action={computerAction}
            score={computerScore}
          />
        </div>
        <div>
          <ActionButton action="rock" onActionSelected={onActionSelected} />
          <ActionButton action="paper" onActionSelected={onActionSelected} />
          <ActionButton action="scissors" onActionSelected={onActionSelected} />
        </div>
        <h2>
          <ShowWinner winner={winner} />
        </h2>
      </div>
    </div>
  );
}
