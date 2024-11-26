import React, { useState, useEffect, useCallback } from "react";

const BOARD_ROWS = 15;
const BOARD_COLS = 20;
const INITIAL_SNAKE = [[5, 5]];
const INITIAL_FOOD = [10, 10];
const DIRECTIONS = {
  ArrowUp: [-1, 0],
  ArrowDown: [1, 0],
  ArrowLeft: [0, -1],
  ArrowRight: [0, 1],
};

const SnakeGame = () => {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState(INITIAL_FOOD);
  const [direction, setDirection] = useState(DIRECTIONS.ArrowRight);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 600);

  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth < 600);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getRandomFoodPosition = useCallback(() => {
    let newFood;
    do {
      newFood = [
        Math.floor(Math.random() * BOARD_ROWS),
        Math.floor(Math.random() * BOARD_COLS),
      ];
    } while (snake.some(([x, y]) => x === newFood[0] && y === newFood[1]));
    return newFood;
  }, [snake]);

  const moveSnake = useCallback(() => {
    const newHead = [snake[0][0] + direction[0], snake[0][1] + direction[1]];

    if (
      newHead[0] < 0 ||
      newHead[0] >= BOARD_ROWS ||
      newHead[1] < 0 ||
      newHead[1] >= BOARD_COLS
    ) {
      setGameOver(true);
      return;
    }

    if (snake.some(([x, y]) => x === newHead[0] && y === newHead[1])) {
      setGameOver(true);
      return;
    }

    const newSnake = [newHead, ...snake];

    if (newHead[0] === food[0] && newHead[1] === food[1]) {
      setScore((prev) => prev + 1);
      setFood(getRandomFoodPosition());
    } else {
      newSnake.pop();
    }

    setSnake(newSnake);
  }, [snake, direction, food, getRandomFoodPosition]);

  const handleKeyDown = (e) => {
    if (DIRECTIONS[e.key]) {
      e.preventDefault();
      const [dx, dy] = DIRECTIONS[e.key];
      const [currentDx, currentDy] = direction;
      if (dx !== -currentDx && dy !== -currentDy) {
        setDirection(DIRECTIONS[e.key]);
      }
    }
  };

  useEffect(() => {
    if (gameOver) return;

    const interval = setInterval(moveSnake, 100);
    return () => clearInterval(interval);
  }, [moveSnake, gameOver]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [direction]);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setFood(INITIAL_FOOD);
    setDirection(DIRECTIONS.ArrowRight);
    setGameOver(false);
    setScore(0);
  };

  const styles = {
    container: {
      textAlign: "center",
      fontFamily: "Arial, sans-serif",
      margin: "0px",
    },
    title: {
      fontSize: "2rem",
      marginBottom: "10px",
      color: "#333",
      textShadow: "0px 0px 2px #333",
    },
    board: {
      display: "grid",
      gridTemplateRows: `repeat(${BOARD_ROWS}, ${
        isSmallScreen ? "15px" : "20px"
      })`,
      gap: "1px",
      justifyContent: "center",
      margin: "auto",
      backgroundColor: "#555",
      padding: "5px",
      borderRadius: "10px",
      boxShadow: "0px 0px 3px #555",
    },
    row: {
      display: "grid",
      gridTemplateColumns: `repeat(${BOARD_COLS}, ${
        isSmallScreen ? "15px" : "20px"
      })`,
    },
    cell: {
      width: isSmallScreen ? "15px" : "20px",
      height: isSmallScreen ? "15px" : "20px",
      borderRadius: "4px",
    },
    gameOver: {
      fontSize: "1.5rem",
      color: "red",
      margin: "5px 0px 0px",
    },
    resetButton: {
      marginTop: "10px",
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
      <h1 style={styles.title}>Snake Game</h1>
      <div style={styles.board}>
        {Array.from({ length: BOARD_ROWS }, (_, row) => (
          <div key={row} style={styles.row}>
            {Array.from({ length: BOARD_COLS }, (_, col) => {
              const isSnake = snake.some(([x, y]) => x === row && y === col);
              const isFood = food[0] === row && food[1] === col;
              return (
                <div
                  key={col}
                  style={{
                    ...styles.cell,
                    backgroundColor: isSnake
                      ? "#34eb5b"
                      : isFood
                      ? "#eb3434"
                      : "#333",
                  }}
                />
              );
            })}
          </div>
        ))}
      </div>
      {gameOver && (
        <h2 style={styles.gameOver}>Game Over! Your score: {score}</h2>
      )}
      <button style={styles.resetButton} onClick={resetGame}>
        Restart
      </button>
    </div>
  );
};

export default SnakeGame;
