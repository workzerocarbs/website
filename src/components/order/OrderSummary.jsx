import React from 'react';
import { Link } from 'react-router-dom';
import "../order/style.scss"
import vegImage from '../../assets/images/veg.svg';
import nonVegImage from '../../assets/images/non_veg.svg'
import { GiCookingPot } from "react-icons/gi";
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
                    {/* <img src={`${imageUrl}${item.image}`} alt={item.name} /> */}
                   
                  </div>
                  <div className='d-flex flex-column w-100'>
                 <div className='d-flex gap-2 align-items-center'>
                 <h6 className='mb-0'>{item.name}</h6>
                  <img className='food-type' src={item.type === 'veg' ? vegImage : nonVegImage}
                                        alt={item.type === 'veg' ? 'Veg' : 'Non-Veg'} />
                 </div>
                  <div className='d-flex justify-content-between align-items-center'>
                 <span className='fw-bold'>Rs {(item.totalPrice + item.total_toppings_price).toFixed(2)}</span> 
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
                        onClick={() => handleIncrement(item)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  </div>
                 
                </div>
            
            </div>
          ))}
      
      <div className="d-flex justify-content-end self-align-center addMore mt-1">
        <Link to="/menu">Add More</Link>
      </div>
      <div className="me-3 ms-3" style={{position: "relative"}}>
        <textarea id="additional-info" name="additional-info" rows="2" placeholder='Cooking Instruction'></textarea>
        <GiCookingPot style={{position: "absolute", top: "3px", left: "3px"}} size={30} color='#9cd322'/>
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
