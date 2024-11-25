import React from 'react'

const Badge = ({ logo, name }) => {
  return (
    <div className="badge">
      <img src={logo} alt={`${name} logo`} className="badge-logo" />
      <span className="badge-name">{name}</span>
    </div>
  );
};

export default Badge;
