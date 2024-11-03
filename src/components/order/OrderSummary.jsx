import React from 'react';
import { Link } from 'react-router-dom';
import "../order/style.scss"
const OrderSummary = ({
  cart,
  imageUrl,
  appliedCoupon,
  handleIncrement,
  handleDecrement,
  handleRemoveCoupon,
  setModalVisible,
}) => {
  return (
    <div className="order-summary">
    
      <div  style={{border: "1px solid lightgrey", padding: "5px 5px", marginBottom: "10px"}}>
        
      {Object.values(cart).map((item) => (
            <div key={item.id}>
                <div className="orderSummary d-flex gap-2 w-100 p-2">
                  <div className="itemImageContainer d-flex">
                    <img src={`${imageUrl}${item.image}`} alt={item.name} />
                   
                  </div>
                  <div className='d-flex flex-column w-100'>
                  <h6 className='mb-0'>{item.name}</h6>
                  <div className='d-flex justify-content-between align-items-center'>
                 <span>Rs {item.totalPrice.toFixed(2)}</span> 
                    <div className="quantity">
                      <button
                        className="btn decrementBtn"
                        onClick={() => handleDecrement(item.id)}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        className="btn incrementBtn"
                        onClick={() => handleIncrement(item.id)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  </div>
                 
                </div>
            
            </div>
          ))}
      
      <div className="d-flex justify-content-end addMore mt-1">
        <Link to="/menu">Add More</Link>
      </div>
      <div className="me-3 ms-3">
        <textarea id="additional-info" name="additional-info" rows="2" placeholder='Cooking Instruction'></textarea>
      </div>
      </div>
      <div className="coupons">
        {/* {appliedCoupon ? (
          <div className="applied-coupon">
            <h4>
              {appliedCoupon.title} <span>(Applied Coupon)</span>
            </h4>
            <button onClick={handleRemoveCoupon}>Remove</button>
          </div>
        ) : (
          <button
            type="button"
            className="apply-coupon"
            onClick={() => setModalVisible(true)}
          >
            Apply Coupon
          </button>
        )} */}
      </div>
    </div>
  );
};

export default OrderSummary;
