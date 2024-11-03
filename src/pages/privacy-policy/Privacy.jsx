/* eslint-disable no-unused-vars */
import React from 'react'
import useTitle from '../../utils/useTitle'

const Privacy = () => {
  useTitle("Privacy-Policy");
  
  return (
    <section className='footer-content'>
      <div className="container">
        <div className="row">
          <div className="col-lg-6" data-aos="fade-up" data-aos-delay="0">
            <div className="heading-wrap">
              <h2 className="heading ">Privacy Policy</h2>
            </div>
          </div>
        </div>
        <div className="row g-12 ">
          <div className="col-md-12 mb-5">
            <div className=" active" data-aos="fade-up" data-aos-delay="100">
              <span className="number">01</span>
              <h3>Information We Collect:</h3>
              <p className="mb-3">When you use our services, we collect various types of information, including
                personal information like your name, email address, and other relevant details. We also
                collect non-personal information such as your IP address and device information.
              </p>
            </div>
          </div>

          <div className="col-md-12 mb-5">
            <div className=" active" data-aos="fade-up" data-aos-delay="100">
              <span className="number">02</span>
              <h3>How We Use Your Information: </h3>
              <p className="mb-3"> The information we collect is used to provide and improve our services. We may
                use it to personalize your experience, communicate with you, and ensure the functionality of
                our platform. We do not sell or share your information with third parties for marketing
                purposes.
              </p>
            </div>
          </div>

          <div className="col-md-12 mb-5">
            <div className=" active" data-aos="fade-up" data-aos-delay="100">
              <span className="number">03</span>
              <h3>Data Security: </h3>
              <p className="mb-3">We employ industry-standard security measures to protect your information from
                unauthorized access, disclosure, alteration, and destruction. These measures include
                encryption, access controls, and regular security audits.
              </p>
            </div>
          </div>

          <div className="col-md-12 mb-5">
            <div className=" active" data-aos="fade-up" data-aos-delay="100">
              <span className="number">04</span>
              <h3>Cookies and Similar Technologies: </h3>
              <p className="mb-3">Our platform may use cookies and similar technologies to enhance your user
                experience. Cookies are small files stored on your device that help us understand your
                preferences and improve our services. You can manage your preferences for these technologies
                through your browser settings.
              </p>
            </div>
          </div>

          <div className="col-md-12 mb-5">
            <div className=" active" data-aos="fade-up" data-aos-delay="100">
              <span className="number">05</span>
              <h3>Third-Party Links:</h3>
              <p className="mb-3">Our platform may contain links to third-party websites. While we strive to link
                only to reputable sources, we are not responsible for the privacy practices or content of
                these third-party sites. Users should exercise caution and review the privacy policies of
                external websites.
              </p>
            </div>
          </div>

          <div className="col-md-12 mb-5">
            <div className=" active" data-aos="fade-up" data-aos-delay="100">
              <span className="number">06</span>
              <h3>Children&apos;s Privacy:</h3>
              <p className="mb-3">Our services are not intended for individuals under the age of 13. If you are a
                parent or guardian and believe that your child has provided us with personal information,
                please contact us, and we will take appropriate steps to remove the information.
              </p>
            </div>
          </div>

          <div className="col-md-12 mb-5">
            <div className=" active" data-aos="fade-up" data-aos-delay="100">
              <span className="number">07</span>
              <h3>Changes to the Privacy Policy:</h3>
              <p className="mb-3">We reserve the right to update or modify this Privacy Policy at any time.
                Changes will be effective immediately upon posting. Users are encouraged to review this
                policy regularly to stay informed about how we collect, use, and protect their information.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Privacy