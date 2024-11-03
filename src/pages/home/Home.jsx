/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
import React from 'react'
import { Link } from 'react-router-dom'
import personalized_diet from '../../assets/images/Get_Personalized_Diet.webp'
import certified_dietitian from '../../assets/images/Certified_Dietician_Assistant.webp'
import custom_meal from '../../assets/images/Custome_Meal_Access.jpeg.jpg'
import about_us from '../../assets/images/About_US.jpeg.jpg'
import phone from '../../assets/images/phone-call.png'
import email from '../../assets/images/email.png'
import pin from '../../assets/images/pin.png'
import '../home/style.scss'
import useTitle from '../../utils/useTitle'

const Home = () => {
    useTitle("Home");

    return (
        <section className='content' id='home-section'>
            <div className='container'>
                <div className="row">
                    <div className="col-md-12">
                        <div className="bg-image">
                            <h1 className='heading'>Just for the health of it!</h1>
                            <div className="hero_btn">
                                <Link to="/menu" className="btn">Order Now</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='services-section' id='services'>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12" data-aos="fade-up" data-aos-delay="0">
                            <div className="heading-wrap">
                                <h2 className="heading">Elevate Your Wellness with Cutting-Edge Tracking Tools</h2>
                                <p className="mb-4 heading_wrap_content">We prioritize your holistic well-being by providing
                                    advanced tracking tools that empower you to monitor and optimize your health journey. Our
                                    focus is on meticulous meal planning and detailed tracking, ensuring that you have the tools
                                    you need to make informed decisions and celebrate your achievements.
                                </p>
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="100">
                            <div className="service_category">
                                <img src={personalized_diet} alt="Get Personalized Diet" />
                                <h5>Get Personalized Diet</h5>
                                <p>Our certified dietitians, who collaborate with advanced algorithms to tailor your nutrition
                                    plan based on your unique profile and aspirations.</p>
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="200">
                            <div className="service_category">
                                <img src={certified_dietitian} alt="Certified Dietitian" />
                                <h5>Certified Dietitian & Assistant</h5>
                                <p>Receive expert advice and ongoing support, ensuring that your personalized diet is not only
                                    effective but also sustainable for the long term.</p>
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="300">
                            <div className="service_category">
                                <img src={custom_meal} alt="Custom Meal Access" />
                                <h5>Custom Meal Access</h5>
                                <p>Enjoy the convenience of accessing custom meal plans that align with your dietary references
                                    and restrictions.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='process-section' id='process'>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12" data-aos="fade-up" data-aos-delay="0">
                            <div className="heading-wrap">
                                <h2 className="heading">Bring Your Craving Here</h2>
                                <p className="mb-4 heading_wrap_content">We revolves around your unique needs. We start by gathering
                                    detailed information through out app, analyzing your profile to craft poersonalized meal
                                    plans and suggest the best low-card options. Seamlessly order custom meals, tailored
                                    specifically to support your health goals and elevate your well-being.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center g-5 gutter">
                        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4">
                            <div className="step active" data-aos="fade-up" data-aos-delay="100">
                                <span className="number">01</span>
                                <h3>Comprehensive Body Metrics:</h3>
                                <p className="mb-3">Track changes over time to visualize your progress and make informed adjustments
                                    to your
                                    personalized diet and fitness plan</p>
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4">
                            <div className="step" data-aos="fade-up" data-aos-delay="200">
                                <span className="number">02</span>
                                <h3>Nutrient-Rich Meal Logging:</h3>
                                <p className="mb-3">Understand the correlation between your dietary choices and your health metrics
                                    for a
                                    comprehensive view of your well-being.</p>
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4">
                            <div className="step" data-aos="fade-up" data-aos-delay="300">
                                <span className="number">03</span>
                                <h3>Personalized Progress Insights:</h3>
                                <p className="mb-3">Leverage actionable recommendations to fine-tune your personalized diet and
                                    achieve your
                                    health goals.</p>
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4">
                            <div className="step" data-aos="fade-up" data-aos-delay="100">
                                <span className="number">04</span>
                                <h3>Real-Time Health Parameter Tracking:</h3>
                                <p className="mb-3">Receive real-time feedback and trends, empowering you to proactively manage your
                                    health..</p>
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4">
                            <div className="step" data-aos="fade-up" data-aos-delay="200">
                                <span className="number">05</span>
                                <h3>Timeline & History:</h3>
                                <p className="mb-3">Get a consolidated feed of your entire day in one accessible place..</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='about-section' id='about-us'>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12" data-aos="fade-up" data-aos-delay="0">
                            <div className="heading-wrap about_margin">
                                <h2 className="heading">About Us</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row about-image ">
                        <div className="col-lg-6 mb-4 mb-lg-0" data-aos="fade-up" data-aos-delay="100">
                            <img src={about_us} alt="Image" className="img-fluid" />
                        </div>
                        <div className="col-lg-6 ps-lg-5 about_content" data-aos="fade-up" data-aos-delay="200">
                            <p>In the realm of transformative wellness, we redefine the approach to lasting lifestyle changes.
                                Beyond being a mere application, our philosophy signifies a commitment to sustainable health and
                                enduring results. Picture a space where cutting-edge science meets unwavering dedication. Our
                                team of skilled nutritionists and fitness experts crafts personalized meal plans that have left
                                a global impact.
                            </p>
                            <p>Whether your journey involves shedding weight or managing health conditions, our approach
                                seamlessly combines expertise, compassion, and advanced technology for remarkable
                                outcomes. We go beyond mere calorie counting, leading the way in healthifying lives on a global
                                scale. Today marks more than just another day; it&apos;s an opportunity to reshape your wellness
                                journey. Join us and become a vital part of the future of fitness, where the concept of wellness
                                transcends boundaries.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='contact-section' id='contact-us'>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6" data-aos="fade-up" data-aos-delay="0">
                            <div className="heading-wrap contact_margin">
                                <h2 className="heading">Contact Us</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6 mb-5 mb-lg-0" data-aos="fade-up" data-aos-delay="100">
                            <form className="contact-form">
                                <div className="row">
                                    <div className="col-6">
                                        <div className="mb-3">
                                            <label className="text-black">First name</label>
                                            <input type="text" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="mb-3">
                                            <label className="text-black">Last name</label>
                                            <input type="text" className="form-control" />
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label className="text-black">Email address</label>
                                    <input type="email" className="form-control"/>
                                </div>
                                <div className="mb-3">
                                    <label className="text-black">Message</label>
                                    <textarea className="form-control" id="message" cols="30" rows="5"></textarea>
                                </div>
                                <button type="submit" className="btn">Send Message</button>
                            </form>
                        </div>
                        <div className="col-lg-5 ml-auto" data-aos="fade-up" data-aos-delay="200">
                            <div className="quick-contact-item d-flex align-items-center mb-4">
                                <span className="opopo">
                                    <img src={pin} width="20" height="20" />
                                </span>
                                <address className="text">
                                    House No. 5, Nilomani Road, Christian Basti, Guwahati, Assam 781005
                                </address>
                            </div>
                            <div className="quick-contact-item d-flex align-items-center mb-4">
                                <span className="opopo">
                                    <img src={phone} width="20" height="20" />
                                </span>
                                <address className="text">
                                    <a className="phone-number" href="tel:+918638892886">+91 8638892886</a>
                                </address>
                            </div>
                            <div className="quick-contact-item d-flex align-items-center mb-4">
                                <span className="opopo">
                                    <img src={email} width="20" height="20" />
                                </span>
                                <address className="text">
                                    info@zerocarbs.in
                                </address>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='maps-section' id="map">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14324.59157645445!2d91.7808676!3d26.1593125!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x375a5982647dcf03%3A0x35c7acbbe531fe5d!2sZerocarbs%20-%20Just%20for%20the%20health%20of%20it*21!5e0!3m2!1sen!2sin!4v1703607177711!5m2!1sen!2sin"
                    width="100%"
                    height="450"
                    allowFullScreen=""
                    aria-hidden="false"
                    tabIndex="0" />
            </div>
        </section>
    )
}

export default Home