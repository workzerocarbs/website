/* eslint-disable no-unused-vars */
import React from 'react'
import useTitle from '../../utils/useTitle'

const Refund = () => {

useTitle("Refund-Policy");

  return (
    <section className='footer-content'>
      <div className="container">
        <div className="row">
          <div className="col-lg-6" data-aos="fade-up" data-aos-delay="0">
            <div className="heading-wrap">
              <h2 className="heading ">Refund Policy</h2>
            </div>
          </div>
        </div>
        <div className="row g-12 ">
          <div className="col-md-12 mb-5">
            <div className=" active" data-aos="fade-up" data-aos-delay="100">
              <p className="mb-3"><b>Freshness Guarantee:</b>
                We stand by the freshness and quality of our food. If you are unsatisfied with the freshness
                of your order, contact us within 24 hours of delivery for a refund or replacement.</p>

              <p className="mb-3"><b>Order Accuracy:</b>
                While we strive for accuracy, if there are discrepancies in your order, please notify our
                customer support within 24 hours of receiving your delivery to arrange a refund or
                correction.</p>

              <p className="mb-3"><b>Damaged or Defective Items:</b>
                In the rare event that items arrive damaged or are defective, please contact us immediately
                with a photo of the affected items. We will promptly issue a refund or send replacements.
              </p>

              <p className="mb-3"><b>Cancellations:</b>
                Requests for cancellations must be made within 30 minutes of placing your order. After this
                period, cancellations cannot be guaranteed as the preparation process may have commenced.
              </p>

              <p className="mb-3"><b>Returns and Refunds:</b>
                Due to the perishable nature of our products, traditional returns may not be accepted. If
                you have concerns about the quality or freshness, contact customer support for resolution.
              </p>

              <p className="mb-3"><b>Refund Process:</b>
                Refunds, when applicable, will be processed within 5-7 business days to the original payment
                method.</p>

              <p className="mb-3"><b>Contact Information:</b>
                For refund inquiries or to report an issue, please reach out to our customer support at <a
                  href="mailto:info@zerocarbs.in">info@zerocarbs.in</a> or <a
                    href="tel:+91-86388 92886">+91-86388 92886</a>. Include your order number and details of
                the concern for swift assistance.</p>

              <p className="mb-3"><b>Customer Support Hours:</b>
                Our customer support team is available 06:AM - 10:00 PM to address any questions or concerns
                regarding refunds or other matters related to your order.</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Refund