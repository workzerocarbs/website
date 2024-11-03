/* eslint-disable no-unused-vars */
import React from 'react'
import useTitle from '../../utils/useTitle'

const Shipping = () => {

useTitle("Shipping-Policy");

  return (
    <section className='footer-content'>
      <div className="container">
        <div className="row">
          <div className="col-lg-6" data-aos="fade-up" data-aos-delay="0">
            <div className="heading-wrap">
              <h2 className="heading ">Shipping Policy</h2>
            </div>
          </div>
        </div>
        <div className="row g-12 ">
          <div className="col-md-12 mb-5">
            <div className=" active" data-aos="fade-up" data-aos-delay="100">
              <p className="mb-3"><b>Order Fulfillment:</b>
                All food items are prepared fresh upon receiving your order. Orders will be promptly initiated upon confirmation and delivered within the estimated timeframe.</p>

              <p className="mb-3"><b>Delivery Partners:</b>
                We&apos;ve partnered with trusted third-party delivery services like Zomato and Swiggy for efficient and secure order fulfillment. Customers can choose their preferred delivery service at checkout.</p>

              <p className="mb-3"><b>Delivery Zones:</b>
                Our cloud kitchen services, in collaboration with Zomato and Swiggy, cover specific delivery zones. Please check with the respective delivery partners for precise delivery area information.</p>

              <p className="mb-3"><b>Delivery Timeframes:</b>
                Standard delivery times are based on the policies of Zomato and Swiggy. Estimated delivery times may vary based on location and unforeseen circumstances.</p>

              <p className="mb-3"><b>Order Tracking:</b>
                Once your order is handed over to Zomato or Swiggy, you&apos;ll receive a tracking number via email. Use the tracking number to monitor the status and estimated delivery date through the respective delivery service.</p>

              <p className="mb-3"><b>Delivery Issues:</b>
                In the event of any issues with Zomato or Swiggy deliveries, please contact the respective customer support for assistance. We are committed to ensuring a smooth handover of orders to our delivery partners.</p>

              <p className="mb-3"><b>Address Accuracy:</b>
                Ensure that your delivery address is accurate and complete during the checkout process. We are not responsible for delays or additional charges due to incorrect addresses.</p>

              <p className="mb-3"><b>Returns and Refunds:</b>
                Please refer to our Return Policy for information on returns and refunds facilitated through Zomato and Swiggy. Customers are encouraged to follow the policies of the respective delivery partners for returns.</p>

              <p className="mb-3"><b>Customer Support:</b>
                For any questions or concerns regarding the delivery process, contact the customer support of Zomato or Swiggy. For inquiries specific to our kitchen, contact our support at <a href="mailtoinfo@zerocarbs.in">info@zerocarbs.in</a> or <a href="tel:+91-86388 92886">+91-86388 92886</a>.</p>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Shipping