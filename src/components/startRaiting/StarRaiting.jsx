import React, { useState } from "react";
import "./starRaiting.scss";

const StarRating = ({ initialRating = 0, onRatingChange }) => {
  const [rating, setRating] = useState(initialRating);

  const handleRating = (newRating) => {
    // setRating(newRating);
    // if (onRatingChange) {
    //   onRatingChange(newRating);
    // }
  };

  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((value) => {
        const isFilled = value <= Math.floor(rating);
        const isHalf = value - rating < 1 && value - rating > 0;

        return (
          <span
            key={value}
            className={`star ${isFilled ? "filled" : ""} ${isHalf ? "half" : ""}`}
            onClick={() => handleRating(value)}
            data-value={value}
          >
            ★
          </span>
        );
      })}
    </div>
  );
};

export default StarRating;
