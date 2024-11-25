import React, { useState } from "react";

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [winningLine, setWinningLine] = useState([]);

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);

    const playerWon = calculateWinner(newBoard);
    if (playerWon) {
      setWinner(playerWon.symbol);
      setWinningLine(playerWon.line);
    } else if (!newBoard.includes(null)) {
      setWinner("Draw");
    } else {
      setIsXNext(!isXNext);
    }
  };

  const calculateWinner = (board) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let line of lines) {
      const [a, b, c] = line;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return { symbol: board[a], line };
      }
    }

    return null;
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    setWinningLine([]);
  };

  const isWinningCell = (index) => winningLine.includes(index);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Tic Tac Toe</h1>
      <div style={styles.board}>
        {board.map((cell, index) => (
          <div
            key={index}
            style={{
              ...styles.cell,
              backgroundColor: isWinningCell(index) ? "#70e000" : "#f0f0f0",
            }}
            onClick={() => handleClick(index)}
          >
            {cell}
          </div>
        ))}
      </div>
      {winner === "Draw" ? (
        <h2 style={styles.message}>It's a Draw!</h2>
      ) : winner ? (
        <h2 style={styles.message}>Winner: {winner}</h2>
      ) : (
        <h2 style={styles.message}>Next Player: {isXNext ? "X" : "O"}</h2>
      )}
      <button style={styles.resetButton} onClick={resetGame}>
        Reset Game
      </button>
    </div>
  );
};

const styles = {
  container: {
    width: "500px",
    textAlign: "center",
    marginTop: "10px",
    fontFamily: "'Arial', sans-serif",
  },
  title: {
    fontSize: "2rem",
    marginBottom: "10px",
    color: "#333",
    textShadow: "0px 0px 2px #333",
  },
  board: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 100px)",
    gridTemplateRows: "repeat(3, 100px)",
    gap: "5px",
    justifyContent: "center",
  },
  cell: {
    width: "100px",
    height: "100px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "2rem",
    fontWeight: "bold",
    color: "#333",
    cursor: "pointer",
    border: "1px solid #ddd",
  },
  message: {
    margin: "10px 0px",
    fontSize: "1.5rem",
    color: "#333",
  },
  resetButton: {
    padding: "10px 20px",
    fontSize: "1rem",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    boxShadow: "2px 2px 3px #333",
  },
};

export default TicTacToe;
