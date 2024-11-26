import React, { useState, useEffect } from "react";

const SIZE = 4;
const EMPTY_TILE = 0;

const initializeBoard = () => {
  const board = Array(SIZE)
    .fill(null)
    .map(() => Array(SIZE).fill(EMPTY_TILE));
  addRandomTile(board);
  addRandomTile(board);
  return board;
};

const addRandomTile = (board) => {
  const emptyTiles = [];
  board.forEach((row, rowIndex) =>
    row.forEach((tile, colIndex) => {
      if (tile === EMPTY_TILE) emptyTiles.push([rowIndex, colIndex]);
    })
  );

  if (emptyTiles.length) {
    const [row, col] =
      emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
    board[row][col] = Math.random() > 0.1 ? 2 : 4;
  }
};

const moveAndMergeRow = (row) => {
  const nonZeroTiles = row.filter((tile) => tile !== EMPTY_TILE);
  let score = 0;

  for (let i = 0; i < nonZeroTiles.length - 1; i++) {
    if (nonZeroTiles[i] === nonZeroTiles[i + 1]) {
      nonZeroTiles[i] *= 2;
      score += nonZeroTiles[i];
      nonZeroTiles[i + 1] = EMPTY_TILE;
    }
  }

  const mergedRow = nonZeroTiles.filter((tile) => tile !== EMPTY_TILE);
  return {
    row: [...mergedRow, ...Array(SIZE - mergedRow.length).fill(EMPTY_TILE)],
    score,
  };
};

const transposeBoard = (board) => {
  return board[0].map((_, colIndex) => board.map((row) => row[colIndex]));
};

const reverseBoard = (board) => {
  return board.map((row) => [...row].reverse());
};

const moveBoard = (board, direction) => {
  let newBoard;
  let totalScore = 0;

  if (direction === "left") {
    newBoard = board.map((row) => {
      const { row: newRow, score } = moveAndMergeRow(row);
      totalScore += score;
      return newRow;
    });
  } else if (direction === "right") {
    newBoard = reverseBoard(board).map((row) => {
      const { row: newRow, score } = moveAndMergeRow(row);
      totalScore += score;
      return newRow;
    });
    newBoard = reverseBoard(newBoard);
  } else if (direction === "up") {
    newBoard = transposeBoard(board);
    newBoard = newBoard.map((row) => {
      const { row: newRow, score } = moveAndMergeRow(row);
      totalScore += score;
      return newRow;
    });
    newBoard = transposeBoard(newBoard);
  } else if (direction === "down") {
    newBoard = transposeBoard(board);
    newBoard = reverseBoard(newBoard).map((row) => {
      const { row: newRow, score } = moveAndMergeRow(row);
      totalScore += score;
      return newRow;
    });
    newBoard = reverseBoard(newBoard);
    newBoard = transposeBoard(newBoard);
  }

  return { newBoard, score: totalScore };
};

const areBoardsEqual = (board1, board2) => {
  return JSON.stringify(board1) === JSON.stringify(board2);
};

const isGameOver = (board) => {
  for (let row = 0; row < SIZE; row++) {
    for (let col = 0; col < SIZE; col++) {
      if (board[row][col] === EMPTY_TILE) return false;
      if (col < SIZE - 1 && board[row][col] === board[row][col + 1])
        return false;
      if (row < SIZE - 1 && board[row][col] === board[row + 1][col])
        return false;
    }
  }
  return true;
};

const Game2048 = () => {
  const [board, setBoard] = useState(initializeBoard());
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 600);

  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth < 600);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      e.preventDefault();
      if (gameOver) return;

      let direction;
      if (e.key === "ArrowLeft") direction = "left";
      else if (e.key === "ArrowRight") direction = "right";
      else if (e.key === "ArrowUp") direction = "up";
      else if (e.key === "ArrowDown") direction = "down";
      else return;

      const { newBoard, score: gainedScore } = moveBoard(board, direction);
      if (!areBoardsEqual(board, newBoard)) {
        addRandomTile(newBoard);
        setBoard(newBoard);
        setScore(score + gainedScore);
        if (isGameOver(newBoard)) {
          setGameOver(true);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [board, gameOver, score]);

  const resetGame = () => {
    setBoard(initializeBoard());
    setGameOver(false);
    setScore(0);
  };

  const styles = {
    container: {
      textAlign: "center",
      fontFamily: "Arial, sans-serif",
    },
    title: {
      fontSize: "2rem",
      marginBottom: "0px",
      color: "#333",
      textShadow: "0px 0px 2px #333",
    },
    score: {
      fontSize: "1.5rem",
      marginBottom: "10px",
      color: "#333",
    },
    board: {
      display: "grid",
      gridTemplateRows: `repeat(${SIZE}, 1fr)`,
      gap: "5px",
      justifyContent: "center",
      margin: "auto",
      width: `${SIZE * (isSmallScreen ? 90 : 100)}px`,
    },
    row: {
      display: "grid",
      gridTemplateColumns: `repeat(${SIZE}, 1fr)`,
      gap: "5px",
    },
    tile: {
      width: "70px",
      height: "70px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "2rem",
      fontWeight: "bold",
      backgroundColor: "#cdc1b4",
      borderRadius: "5px",
    },
    gameOver: {
      fontSize: "1.5rem",
      color: "red",
      margin: "5px 0px 0px",
    },
    resetButton: {
      marginTop: "20px",
      padding: "10px 20px",
      fontSize: "1rem",
      backgroundColor: "#007bff",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      boxShadow: "2px 2px 3px #333",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>2048</h1>
      <div style={styles.score}>Score: {score}</div>
      <div style={styles.board}>
        {board.map((row, rowIndex) => (
          <div key={rowIndex} style={styles.row}>
            {row.map((tile, colIndex) => (
              <div
                key={colIndex}
                style={{
                  ...styles.tile,
                  backgroundColor: tile === EMPTY_TILE ? "#cdc1b4" : "#f2b179",
                  color: tile > 4 ? "#f9f6f2" : "#776e65",
                }}
              >
                {tile !== EMPTY_TILE ? tile : ""}
              </div>
            ))}
          </div>
        ))}
      </div>
      {gameOver && <h4 style={styles.gameOver}>Game Over!</h4>}
      <button style={styles.resetButton} onClick={resetGame}>
        Reset Game
      </button>
    </div>
  );
};

export default Game2048;
