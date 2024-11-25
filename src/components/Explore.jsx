import React, { useState } from "react";
import ContentTile from "./subComponents/ContentTile";
import CardInsights from "../json/CardInsights.json";
import componentRegistry from "./subComponents/ComponentRegistry";
import "../Css/explore.css";
import Modal from "./subComponents/Modal";

function Explore() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeComponent, setActiveComponent] = useState(null);

  const handleCardClick = (ComponentName) => {
    setActiveComponent(() => componentRegistry[ComponentName]);
    console.log(componentRegistry[ComponentName]);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setActiveComponent(null);
  };

  return (
    <div className="Explore">
      <h1 className="main-header">explore.</h1>
      <ContentTile
        Title="widgets"
        Data={CardInsights.widgets}
        onCardClick={handleCardClick}
      />
      <ContentTile
        Title="games"
        Data={CardInsights.games}
        onCardClick={handleCardClick}
      />
      {isModalOpen && (
        <Modal onClose={closeModal}>
          {activeComponent && React.createElement(activeComponent)}
        </Modal>
      )}
    </div>
  );
}

export default Explore;
