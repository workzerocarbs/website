import React from 'react';
import Lottie from 'react-lottie';
import emptyData from '../../assets/order_placed.json'
import "../orderconfirmation/style.scss"
import { useNavigate, useLocation } from 'react-router-dom';
const OrderConfirmation = () => {
    const navigate = useNavigate()
    const location = useLocation();
    const { id } = location.state || {}; 
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: emptyData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };
    const handleViewOrderDetails = () => {
        if (!id) {
          // If id is null, undefined, or empty, redirect to /menu
          navigate('/menu');
        } else {
          // If id is valid, navigate to /order-details with the id
          navigate('/order-details', { state: { id: id } });
        }
      };
    return (
        <div className='orderConfirmation'>
            <Lottie options={defaultOptions} height={200} width={200} style={{marginTop:"80px"}}/>
            <span className='thankyou'>Thank You</span>
            <p>Your order has been placed. You will get a confirmation SMS once your order is accepted.</p>
            <p>In case of any query related to your order please feel free to contact us</p>
            <p className='contact_number'>on  +91 8638892886</p>
            <p className='contact_email'>info@zerocarbs.in</p>
            <p className='contact_location'> House No. 5, Nilomani Road, Christian Basti, Guwahati, Assam 781005</p>
            <button className='view-order-details-btn' onClick={handleViewOrderDetails}>View Order Details</button>
        </div>
    );
};

export default OrderConfirmation;
