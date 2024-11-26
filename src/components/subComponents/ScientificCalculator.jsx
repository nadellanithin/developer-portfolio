import React, { useState } from "react";

const ScientificCalculator = () => {
  const [input, setInput] = useState("");
  const [isScientific, setIsScientific] = useState(false);

  const handleInput = (value) => {
    setInput((prev) => prev + value);
  };

  const clearInput = () => {
    setInput("");
  };

  const handleBackspace = () => {
    setInput((prev) => prev.slice(0, -1));
  };

  const toggleMode = () => {
    setIsScientific(!isScientific);
  };

  const handleScientificFunction = (func) => {
    try {
      const value = eval(input);
      const radians = value * (Math.PI / 180);
      let result;
      switch (func) {
        case "sin":
          result = Math.sin(radians);
          break;
        case "cos":
          result = Math.cos(radians);
          break;
        case "tan":
          result = Math.tan(radians);
          break;
        case "log":
          result = Math.log10(value);
          break;
        case "sqrt":
          result = Math.sqrt(value);
          break;
        case "square":
          result = value ** 2;
          break;
        case "inverse":
          result = 1 / value;
          break;
        default:
          result = "Error";
          break;
      }
      setInput(result.toString());
    } catch {
      setInput("Error");
    }
  };

  const handleCalculation = () => {
    try {
      const evaluation = eval(input);
      setInput(evaluation.toString());
    } catch {
      setInput("Error");
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Calculator</h1>
      <div style={styles.display}>
        <input type="text" value={input} readOnly style={styles.input} />
      </div>

      <div
        style={{
          ...styles.buttons,
          gridTemplateColumns: "repeat(5, 1fr)",
        }}
      >
        <button onClick={() => handleInput("7")} style={styles.button}>
          7
        </button>
        <button onClick={() => handleInput("8")} style={styles.button}>
          8
        </button>
        <button onClick={() => handleInput("9")} style={styles.button}>
          9
        </button>
        <button onClick={clearInput} style={styles.button}>
          C
        </button>
        <button onClick={handleBackspace} style={styles.button}>
          ⌫
        </button>
        <button onClick={() => handleInput("4")} style={styles.button}>
          4
        </button>
        <button onClick={() => handleInput("5")} style={styles.button}>
          5
        </button>
        <button onClick={() => handleInput("6")} style={styles.button}>
          6
        </button>
        <button onClick={() => handleInput("-")} style={styles.button}>
          -
        </button>
        <button onClick={() => handleInput("+")} style={styles.button}>
          +
        </button>
        <button onClick={() => handleInput("1")} style={styles.button}>
          1
        </button>
        <button onClick={() => handleInput("2")} style={styles.button}>
          2
        </button>
        <button onClick={() => handleInput("3")} style={styles.button}>
          3
        </button>
        <button onClick={() => handleInput("/")} style={styles.button}>
          ÷
        </button>
        <button onClick={() => handleInput("*")} style={styles.button}>
          ×
        </button>
        <button onClick={() => handleInput("0")} style={styles.button}>
          0
        </button>
        <button onClick={() => handleInput(".")} style={styles.button}>
          .
        </button>
        <button onClick={() => handleInput("%")} style={styles.button}>
          %
        </button>

        {isScientific && (
          <>
            <button
              onClick={() => handleScientificFunction("sin")}
              style={styles.button}
            >
              sin
            </button>
            <button
              onClick={() => handleScientificFunction("cos")}
              style={styles.button}
            >
              cos
            </button>
            <button
              onClick={() => handleScientificFunction("tan")}
              style={styles.button}
            >
              tan
            </button>
            <button
              onClick={() => handleScientificFunction("log")}
              style={styles.button}
            >
              log
            </button>
            <button
              onClick={() => handleScientificFunction("sqrt")}
              style={styles.button}
            >
              √
            </button>
            <button
              onClick={() => handleScientificFunction("square")}
              style={styles.button}
            >
              x²
            </button>
            <button
              onClick={() => handleScientificFunction("inverse")}
              style={styles.button}
            >
              x⁻¹
            </button>
          </>
        )}
        <button onClick={toggleMode} style={styles.toggleButton}>
          {isScientific ? (
            <span class="material-symbols-outlined">calculate</span>
          ) : (
            <span class="material-symbols-outlined">function</span>
          )}
        </button>
        <button onClick={handleCalculation} style={styles.equalsButton}>
          =
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    maxWidth: "400px",
    margin: "20px",
    padding: "20px",
    backgroundColor: "#000000",
    boxShadow: "0px 0px 5px #000",
    color: "#fff",
    borderRadius: "10px",
    textAlign: "center",
  },
  title: {
    margin: "0px 0px 10px",
    textShadow: "0px 0px 5px #fff",
    fontWeight: "300",
  },
  display: {
    marginBottom: "20px",
  },
  input: {
    width: "100%",
    padding: "10px",
    fontSize: "24px",
    backgroundColor: "#fff",
    color: "#333",
    border: "3px solid #ccc",
    borderRadius: "5px",
  },
  toggleButton: {
    padding: "15px",
    backgroundColor: "#ff9800",
    color: "#000",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  buttons: {
    display: "grid",
    gap: "10px",
  },
  button: {
    padding: "15px",
    fontSize: "14px",
    backgroundColor: "#444",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  equalsButton: {
    gridColumn: "span 4",
    padding: "15px",
    fontSize: "14px",
    backgroundColor: "#ff9800",
    color: "#000",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default ScientificCalculator;
