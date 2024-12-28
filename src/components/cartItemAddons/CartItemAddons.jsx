// import React, { useState } from 'react';

// const CartItemAddons = ({ topings }) => {
//   const [isExpanded, setIsExpanded] = useState(false);
  
//   if (!topings?.length) return null;
  
//   const formatAddons = (toping, index) => {
//     const addonItems = [];
    
//     toping.forEach(group => {
//       if (group.max_quantity === 1) {
//         const selectedItem = group.addOnItems.find(item => item.selected);
//         if (selectedItem) {
//           addonItems.push(selectedItem.item);
//         }
//       } else {
//         const itemsWithQuantity = group.addOnItems.filter(item => item.quantity > 0);
//         itemsWithQuantity.forEach(item => {
//           addonItems.push(item.item);
//         });
//       }
//     });
    
//     return addonItems;
//   };
  
//   const allAddons = topings.flatMap(formatAddons);
//   const displayAddons = isExpanded ? allAddons : allAddons.slice(0, 3);
//   const needsToggle = allAddons.length > 3;

//   return (
//     <div className="cart-addons">
//       <span className="addon-text">
//         <b>Addons:</b>{" "}
//         {displayAddons.join(", ")}
//         {!isExpanded && needsToggle && "..."}
//         {needsToggle && (
//           <span
//             onClick={() => setIsExpanded(!isExpanded)}
//             className="read-more-btn"
//           >
//             {isExpanded ? " Read Less" : " Read More"}
//           </span>
//         )}
//       </span>
//     </div>
//   );
// };

// export default CartItemAddons;

import React, { useState } from 'react';

const CartItemAddons = ({ topings }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  if (!topings?.length) return null;
  
  const formatAddons = (toping, index) => {
    const addonItems = new Set(); // Using Set to automatically handle duplicates
    
    toping.forEach(group => {
      if (group.max_quantity === 1) {
        const selectedItem = group.addOnItems.find(item => item.selected);
        if (selectedItem) {
          addonItems.add(selectedItem.item);
        }
      } else {
        const itemsWithQuantity = group.addOnItems.filter(item => item.quantity > 0);
        itemsWithQuantity.forEach(item => {
          addonItems.add(item.item);
        });
      }
    });
    
    return Array.from(addonItems);
  };
  
  const allAddons = topings.flatMap(formatAddons);
  // Remove duplicates from the final array
  const uniqueAddons = [...new Set(allAddons)];
  const displayAddons = isExpanded ? uniqueAddons : uniqueAddons.slice(0, 3);
  const needsToggle = uniqueAddons.length > 3;

  return (
    <div className="cart-addons">
      <span className="addon-text">
        <b className='addonSpan'>Addons:</b>{" "}
        {displayAddons.join(", ")}
        {!isExpanded && needsToggle && "..."}
        {needsToggle && (
          <span
            onClick={() => setIsExpanded(!isExpanded)}
            className="read-more-btn"
          >
            {isExpanded ? " read less" : " read more"}
          </span>
        )}
      </span>
    </div>
  );
};

export default CartItemAddons;