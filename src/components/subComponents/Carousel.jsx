import React, { useState, useEffect } from "react";

function Carousel({ items }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % items.length);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, items.length]);

  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft") {
      setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
    } else if (e.key === "ArrowRight") {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentIndex, items.length]);

  const handleNav = (direction) => {
    if (direction === "right") {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    } else if (direction === "left") {
      setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
    }
  };

  const handlePlayPause = () => {
    setIsPlaying((prevState) => !prevState);
  };

  return (
    <>
      <div className="Carousel">
        {items.map((item, index) => (
          <div
            key={index}
            className={`Carousel-item ${
              index === currentIndex
                ? "center"
                : index === (currentIndex - 1 + items.length) % items.length
                ? "left"
                : index === (currentIndex + 1) % items.length
                ? "right"
                : ""
            }`}
          >
            <div className="CarouselContent">
              <span className="Badge">
                <img src={item.Badge} className="Badge-img" />
              </span>
              <div className="CarouselInfo">
                <h2 className="InfoHeader">{item.Header}</h2>
                <p
                  className="Info"
                  dangerouslySetInnerHTML={{ __html: item.Info }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div
        className="banner-navigation"
        title="You can use the arrow keys on your keyboard as well"
      >
        <span
          className="material-symbols-outlined navIcon"
          onClick={() => handleNav("left")}
        >
          chevron_left
        </span>
        {isPlaying ? (
          <span
            className="material-symbols-outlined navIcon"
            onClick={handlePlayPause}
          >
            pause
          </span>
        ) : (
          <span
            className="material-symbols-outlined navIcon"
            onClick={handlePlayPause}
          >
            play_arrow
          </span>
        )}
        <span
          className="material-symbols-outlined navIcon"
          onClick={() => handleNav("right")}
        >
          chevron_right
        </span>
      </div>
    </>
  );
}

export default Carousel;
