/* eslint-disable no-unused-vars */
import React from 'react'
import useTitle from '../../utils/useTitle'

const Return = () => {

useTitle("Return-Policy")

  return (
    <section className='footer-content'>
      <div className="container">
        <div className="row">
          <div className="col-lg-6" data-aos="fade-up" data-aos-delay="0">
            <div className="heading-wrap">
              <h2 className="heading ">Return Policy</h2>
            </div>
          </div>
        </div>
        <div className="row g-12 ">
          <div className="col-md-12 mb-5">
            <div className=" active" data-aos="fade-up" data-aos-delay="100">

              <p className="mb-3"><b>Freshness Guarantee:</b>
                At Zerocarbs, we guarantee the freshness and quality of our food. If you&apos;re not satisfied with the freshness of your order, please contact us within 24 hours of delivery.</p>

              <p className="mb-3"><b>Order Accuracy:</b>
                We strive for order accuracy, but if there are any discrepancies with your order, please reach out to our customer support within 24 hours of receiving your delivery.</p>

              <p className="mb-3"><b>Damaged or Defective Items:</b>
                If any items in your order arrive damaged or are defective, please contact us immediately with a photo & video of the damaged items. We will gladly replace or refund the affected items.</p>

              <p className="mb-3"><b>Cancellations:</b>
                Cancellation requests must be made within 20 minutes of placing your order. After this timeframe, we cannot guarantee cancellations as the preparation process may have started.</p>

              <p className="mb-3"><b>Returns and Refunds:</b>
                Due to the nature of our fresh and perishable products, we generally do not accept returns. However, if you have concerns about the quality or freshness of your order, please contact our customer support for assistance.</p>

              <p className="mb-3"><b>Refund Process:</b>
                Refunds, if applicable, will be processed within 5-7 business days to the original payment method.</p>

              <p className="mb-3"><b>Contact Information:</b>
                For return-related inquiries or to report an issue, please contact our customer support at <a href="mailto:info@zerocarbs.in">info@zerocarbs.in</a> or <a href="tel:+91-86388-92886">+91-86388-92886</a>. Provide your order number and details of the issue for prompt assistance.</p>

              <p className="mb-3"><b>Customer Support Hours:</b>
                Our customer support team is available 06:00 AM - 10:00 PM to assist you with any concerns or questions you may have regarding your order.</p>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Return