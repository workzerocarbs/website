import React, { useState, useEffect } from "react";
import "./style.scss";

const MultiSelectCounter = ({
  price,
  maxItem,
  id,
  setTopingsSelect,
  topingsSelect,
  groupId,
}) => {
  const [count, setCount] = useState(0); // Local state to track the count

  // Find current group and item
  const currentGroup = topingsSelect.find(
    (group) => group.group_id === groupId
  );
  const currentItem = currentGroup?.addOnItems.find((item) => item.id === id);

  // Calculate total quantity in the current group
  const groupTotalQuantity =
    currentGroup?.addOnItems.reduce(
      (total, item) => total + item.quantity,
      0
    ) || 0;

  // Sync local count with the actual data
  useEffect(() => {
    if (currentItem) {
      setCount(currentItem.quantity);
    }
  }, [currentItem]);

  const handleClick = (action) => {
    setTopingsSelect(prev => {
      return prev.map(group => {
        if (group.group_id === groupId) {
          // Check if increasing quantity would exceed group max_quantity
          if (action === 'increase' && groupTotalQuantity >= group.max_quantity) {
            return group;
          }

          const updatedItems = group.addOnItems.map(item => {
            if (item.id === id) {
              const newQuantity = action === 'increase' 
                ? item.quantity + 1 
                : Math.max(0, item.quantity - 1);
              
              return {
                ...item,
                quantity: newQuantity,
                selected: newQuantity > 0
              };
            }
            return item;
          });

          return {
            ...group,
            addOnItems: updatedItems
          };
        }
        return group;
      });
    });
  };

    // Determine if increase should be disabled
    const isIncreaseDisabled = count >= maxItem || groupTotalQuantity >= currentGroup?.max_quantity;
    if (count === 0) {
      return (
        <button
          className="zpt-add-button"
          onClick={() => handleClick('increase')}
          disabled={isIncreaseDisabled}
        >
          Add +
        </button>
      );
    }

  return (
    <div className="zpt-counter-container" style={{ flexDirection: "row" }}>
      <button
        className="zpt-counter-decrease"
        onClick={() => handleClick("decrease")}
      >
        -
      </button>
      <span style={{ margin: "0px" }} className="zpt-counter-value">
        {count}
      </span>
      <button
        className="zpt-counter-increase"
        onClick={() => handleClick("increase")}
        disabled={isIncreaseDisabled}
      >
        +
      </button>
    </div>
  );
};

export default MultiSelectCounter;
