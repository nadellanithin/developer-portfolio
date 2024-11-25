import "../../Css/subComponents.css";
import Marquee from "./Marquee";
import SkillData from "../../json/SkillsList.json";

function Skills() {
  return (
    <div id="Skills" className="Skills">
      <h1 className="SHeaderAlternate">skills.</h1>
      <Marquee skills={SkillData.skillSet1} direction="left" />
      <Marquee skills={SkillData.skillSet2} direction="right" />
      <Marquee skills={SkillData.skillSet3} direction="left" />
      <div className="SContentAlt">
        <div className="S-container">
          <img src="src/assets/Mobile_Mockup.png" className="elevated-image" />
          Mobile app Developement
        </div>
        <div className="S-container">
          <img src="src/assets/Web_Mockup.png" className="elevated-image" />
          Web app Developement
        </div>
        <div className="S-container">
          <img src="src/assets/Ai.png" className="elevated-image" />
          AI/ML
        </div>
      </div>
    </div>
  );
}

export default Skills;
