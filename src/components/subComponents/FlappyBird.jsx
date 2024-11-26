import React, { useState, useEffect, useCallback } from "react";

const FlappyBird = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 600);

  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth < 600);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const GAME_WIDTH = isSmallScreen ? 300 : 600;
  const GAME_HEIGHT = isSmallScreen ? 200 : 400;
  const BIRD_WIDTH = isSmallScreen ? 15 : 30;
  const BIRD_HEIGHT = isSmallScreen ? 15 : 30;
  const PIPE_WIDTH = isSmallScreen ? 30 : 60;
  const GAP_HEIGHT = isSmallScreen ? 100 : 150;
  const GRAVITY = 2;
  const JUMP_HEIGHT = -10;
  const PIPE_SPEED = isSmallScreen ? 2 : 4;

  const [birdY, setBirdY] = useState(GAME_HEIGHT / 2);
  const [birdVelocity, setBirdVelocity] = useState(0);
  const [pipes, setPipes] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  const jump = () => {
    if (!gameOver) {
      setBirdVelocity(JUMP_HEIGHT);
    } else {
      restartGame();
    }
  };

  const generatePipe = useCallback(() => {
    const topHeight = Math.random() * (GAME_HEIGHT - GAP_HEIGHT - 50);
    return {
      top: topHeight,
      bottom: GAME_HEIGHT - topHeight - GAP_HEIGHT,
      x: GAME_WIDTH,
    };
  }, [GAME_HEIGHT, GAP_HEIGHT, GAME_WIDTH]);

  const movePipes = useCallback(() => {
    setPipes((prevPipes) => {
      let updatedPipes = prevPipes.map((pipe) => ({
        ...pipe,
        x: pipe.x - PIPE_SPEED,
      }));

      updatedPipes = updatedPipes.filter((pipe) => pipe.x + PIPE_WIDTH > 0);

      if (
        updatedPipes.length === 0 ||
        updatedPipes[updatedPipes.length - 1].x < GAME_WIDTH - 200
      ) {
        updatedPipes.push(generatePipe());
      }

      return updatedPipes;
    });
  }, [PIPE_SPEED, PIPE_WIDTH, GAME_WIDTH, generatePipe]);

  const checkCollision = useCallback(() => {
    const birdTop = birdY;
    const birdBottom = birdY + BIRD_HEIGHT;

    if (birdTop < 0 || birdBottom > GAME_HEIGHT) {
      setGameOver(true);
      return true;
    }

    for (let pipe of pipes) {
      const pipeTop = pipe.top;
      const pipeBottom = GAME_HEIGHT - pipe.bottom;
      const pipeLeft = pipe.x;
      const pipeRight = pipe.x + PIPE_WIDTH;

      if (
        pipeLeft < BIRD_WIDTH &&
        pipeRight > 0 &&
        (birdTop < pipeTop || birdBottom > pipeBottom)
      ) {
        setGameOver(true);
        return true;
      }
    }
    return false;
  }, [birdY, pipes, BIRD_HEIGHT, BIRD_WIDTH, GAME_HEIGHT, PIPE_WIDTH]);

  const restartGame = () => {
    setBirdY(GAME_HEIGHT / 2);
    setBirdVelocity(0);
    setPipes([]);
    setGameOver(false);
    setScore(0);
  };

  useEffect(() => {
    if (gameOver) return;

    const gameLoop = setInterval(() => {
      setBirdY((prevY) => prevY + birdVelocity);
      setBirdVelocity((prevVel) => prevVel + GRAVITY);

      movePipes();

      if (!checkCollision()) {
        setScore((prevScore) => prevScore + 1);
      }
    }, 30);

    return () => clearInterval(gameLoop);
  }, [birdVelocity, movePipes, checkCollision, gameOver, GRAVITY]);

  useEffect(() => {
    const handleSpacePress = (e) => {
      e.preventDefault();
      if (e.code === "Space") {
        jump();
      }
    };
    window.addEventListener("keydown", handleSpacePress);

    return () => {
      window.removeEventListener("keydown", handleSpacePress);
    };
  }, [jump]);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Flappy Bird</h1>
      <div
        style={{
          ...styles.gameBox,
          width: `${GAME_WIDTH}px`,
          height: `${GAME_HEIGHT}px`,
        }}
      >
        <div
          style={{
            ...styles.bird,
            width: `${BIRD_WIDTH}px`,
            height: `${BIRD_HEIGHT}px`,
            top: `${birdY}px`,
          }}
        />

        {pipes.map((pipe, index) => (
          <React.Fragment key={index}>
            <div
              style={{
                ...styles.pipe,
                width: `${PIPE_WIDTH}px`,
                height: `${pipe.top}px`,
                left: `${pipe.x}px`,
                top: "0",
              }}
            />
            <div
              style={{
                ...styles.pipe,
                width: `${PIPE_WIDTH}px`,
                height: `${pipe.bottom}px`,
                left: `${pipe.x}px`,
                bottom: "0",
              }}
            />
          </React.Fragment>
        ))}
      </div>
      {gameOver && <h2 style={styles.gameOver}>Game Over! Score: {score}</h2>}
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
    color: "#333",
    margin: "15px 30px",
  },
  title: {
    fontSize: "2rem",
    marginBottom: "10px",
    color: "#333",
    textShadow: "0px 0px 2px #333",
  },
  gameBox: {
    position: "relative",
    margin: "10px auto",
    border: "5px solid #555",
    overflow: "hidden",
    backgroundColor: "#90e0ef",
    boxShadow: "0px 0px 3px #555",
  },
  bird: {
    position: "absolute",
    backgroundColor: "#ffea00",
    borderRadius: "50%",
  },
  pipe: {
    position: "absolute",
    backgroundColor: "#008000",
  },
  gameOver: {
    color: "red",
    fontSize: "24px",
    margin: "10px 0px",
  },
};

export default FlappyBird;
