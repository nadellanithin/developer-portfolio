import { useContext } from "react";
import "../../Css/subComponents.css";
import LIcon from "../../../public/assets/LMIcon.png";
import DIcon from "../../../public/assets/DMIcon.png";
import { ThemeContext } from "../ThemeContext";

function Home() {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <div id="Home" className="Home">
      <div className="Intro">
        <h1 className="MsgHeader">
          Welcome to the <em>{isDarkMode ? "Dark Side" : "Light Side"}</em>
        </h1>
        <span className="Greetings">
          Greetings fellow <em>{isDarkMode ? "Sith Lord" : "Jedi"}</em>,
        </span>
        <p className="Msg">
          I am <em>Nithin Subhash Nadella</em>, a{" "}
          {isDarkMode ? "master" : "guardian"} of the{" "}
          <em>{isDarkMode ? "Dark Side" : "Light Side"}</em> of development. As
          a <em>Fullstack Developer</em>, I wield the power of both mobile and
          web applications. My passion lies in{" "}
          {isDarkMode
            ? "delivering seamless and intuitive"
            : "crafting intuitive and smooth"}{" "}
          user experiences while{" "}
          {isDarkMode ? "conquering" : "upholding the core values of"}{" "}
          {isDarkMode
            ? "the true force behind every application: the back-end logic"
            : "simplicity and clarity"}
          . As a <em>{isDarkMode ? "Sith Lord" : "Jedi"}</em>, I strive for{" "}
          {isDarkMode ? "ultimate perfection" : "balance and harmony"}, ensuring
          every line of code{" "}
          {isDarkMode
            ? "stands as the backbone of the empire I build"
            : "brings light to the projects I create"}
          .
        </p>
        <pre className="Msg">
          <em>
            {" "}
            - Join me, and together we can code the galaxy{" "}
            {isDarkMode ? "to perfection" : "with peace and elegance"}.
          </em>
        </pre>
      </div>
      <div className="IconContainer">
        <img src={isDarkMode ? DIcon : LIcon} className="Icon" />
        <div className="Iconshadow"></div>
      </div>
    </div>
  );
}

export default Home;
