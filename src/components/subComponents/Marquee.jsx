import React from 'react'
import Badge from './Badge'

const Marquee = ({ skills, direction }) => {
    return (
      <div className={`marquee-row ${direction}`}>
        <div className="marquee-content">
          {skills.map((skill, index) => (
            <Badge key={index} logo={skill.Logo} name={skill.Name} />
          ))}
        </div>
        {/* Duplicate content for continuous effect */}
        <div className="marquee-content">
          {skills.map((skill, index) => (
            <Badge key={`duplicate-${index}`} logo={skill.Logo} name={skill.Name} />
          ))}
        </div>
        {/* Additonal Duplicate content for continuous effect on larger screens */}
        <div className="marquee-content">
          {skills.map((skill, index) => (
            <Badge key={`duplicate-sub-${index}`} logo={skill.Logo} name={skill.Name} />
          ))}
        </div>
      </div>
    );
  };

export default Marquee;
