import "../../Css/explore.css";

function Card({ CardTitle, Url, Description, onClickHandler }) {
  return (
    <div className="Card" onClick={onClickHandler}>
      <div className="card-inner">
        <div className="card-front">
          <span className="card-title">{CardTitle}</span>
          <img src={Url} alt="Logo" className="card-logo"></img>
        </div>
        <div className="card-back">
          <p className="card-insights">{Description}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
