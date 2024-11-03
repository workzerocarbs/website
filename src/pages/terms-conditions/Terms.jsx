/* eslint-disable no-unused-vars */
import React from 'react'
import '../terms-conditions/style.scss'
import useTitle from '../../utils/useTitle'

const Terms = () => {

  useTitle("Terms & Condition");

  return (
    <section className='footer-content'>
      <div className="container">
        <div className="row">
          <div className="col-lg-6" data-aos="fade-up" data-aos-delay="0">
            <div className="heading-wrap">
              <h2 className="heading ">Terms & Conditions</h2>
            </div>
          </div>
        </div>
        <div className="row g-12 ">
          <div className="col-md-12 mb-5">
            <div className=" active" data-aos="fade-up" data-aos-delay="100">
              <span className="number">01</span>
              <h3>Acceptance of Terms:</h3>
              <p className="mb-3">By accessing and using the services provided by Zerocarbs, you hereby
                acknowledge and agree to comply with these terms and conditions. If you do not agree with
                any part of these terms, please refrain from using our services.
              </p>
            </div>
          </div>

          <div className="col-md-12 mb-5">
            <div className=" active" data-aos="fade-up" data-aos-delay="100">
              <span className="number">02</span>
              <h3>User Conduct:
              </h3>
              <p className="mb-3"> You agree to use our services only for lawful purposes and in a manner that
                does not disrupt the integrity or interfere with the functionality of our platform. Any
                violation of these terms may result in the termination of your access.
              </p>
            </div>
          </div>
          <div className="col-md-12 mb-5">
            <div className=" active" data-aos="fade-up" data-aos-delay="100">
              <span className="number">03</span>
              <h3>Intellectual Property:
              </h3>
              <p className="mb-3"> All content and materials available on our platform are the exclusive property
                of Zerocarbs and are protected by applicable intellectual property laws. Users are
                prohibited from reproducing, distributing, or creating derivative works without explicit
                permission.
              </p>
            </div>
          </div>

          <div className="col-md-12 mb-5">
            <div className=" active" data-aos="fade-up" data-aos-delay="100">
              <span className="number">04</span>
              <h3>Privacy:
              </h3>
              <p className="mb-3"> Our Privacy Policy, detailed below, outlines how we collect, use, and protect
                your personal information. Please review the Privacy Policy to understand our practices
                regarding your data.
              </p>
            </div>
          </div>

          <div className="col-md-12 mb-5">
            <div className=" active" data-aos="fade-up" data-aos-delay="100">
              <span className="number">05</span>
              <h3>Modifications:
              </h3>
              <p className="mb-3"> Zerocarbs reserves the right to modify or update these terms and conditions at
                any time. Users are encouraged to review this document periodically to stay informed of any
                changes.
              </p>
            </div>
          </div>

          <div className="col-md-12 mb-5">
            <div className=" active" data-aos="fade-up" data-aos-delay="100">
              <span className="number">06</span>
              <h3>Termination of Services:
              </h3>
              <p className="mb-3"> We reserve the right to terminate or suspend your access to our services at our
                discretion, without notice, for any reason, including a breach of these terms and
                conditions.</p>
            </div>
          </div>


        </div>
      </div>
    </section>
  )
}

export default Terms