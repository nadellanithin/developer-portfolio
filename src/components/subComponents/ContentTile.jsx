import "../../Css/explore.css";
import Card from "./Card";

function ContentTile({ Title, Data, onCardClick }) {
  return (
    <div className="ContentTile">
      <h1>{Title}</h1>
      <div className="card-view-container">
        {Data.map((cardData, index) => (
          <Card
            key={index}
            CardTitle={cardData.CardTitle}
            Url={cardData.Url}
            Description={cardData.Desc}
            onClickHandler={() => onCardClick(cardData.Component)}
          />
        ))}
      </div>
    </div>
  );
}

export default ContentTile;
