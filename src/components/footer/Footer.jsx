/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import '../footer/style.scss'
import { Link, useNavigate } from 'react-router-dom';
import { Link as ScrollLink, scroller } from 'react-scroll';
import { FaLinkedin, FaInstagram, FaFacebook } from "react-icons/fa";


const Footer = () => {
    // const [click, setClick] = useState(false);
    const navigate = useNavigate();

    const handleNavigation = (section) => {
        // setClick(false);
        if (window.location.pathname !== '/') {
            navigate('/');
            setTimeout(() => {
              scroller.scrollTo(section, {
                duration: 100,
                smooth: true,
              });
              window.history.pushState(null, '', `#${section}`);
            }, 100);
          } else {
            scroller.scrollTo(section, {
              duration: 100,
              smooth: true,
            });
            window.history.pushState(null, '', `#${section}`);
          }
    };

    return (
        <div className="site-footer">
            <div className="inner first">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 col-lg-4">
                            <div className="widget">
                                <h3 className="heading">About</h3>
                                <p>In the realm of transformative wellness, we redefine the approach to lasting lifestyle
                                    changes. Beyond being a mere application, our philosophy signifies a commitment to
                                    sustainable health and enduring results. <ScrollLink to="about-us" smooth={true} duration={100} onClick={() => handleNavigation('about-us')}><strong>Know
                                        More...</strong></ScrollLink>
                                </p>
                            </div>
                            <div className="widget">
                                <ul className="list-unstyled social">
                                    <li>
                                        <Link to="https://www.linkedin.com/company/zerocarbs/" target="_blank">
                                            <FaLinkedin size={30} />
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="https://instagram.com/zerocarbs_/" target="_blank">
                                            <FaInstagram size={30} />
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="https://www.facebook.com/zerocarbsguwahati/" target="_blank">
                                            <FaFacebook size={30} />
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4 pl-lg-5">
                            <div className="widget middle_widget">
                                <h3 className="heading">Pages</h3>
                                <ul className="links list-unstyled">
                                    <li>
                                        <ScrollLink to="about-us" smooth={true} duration={100} onClick={() => handleNavigation('about-us')}>
                                            About us
                                        </ScrollLink>
                                    </li>
                                    <li>
                                        <ScrollLink to="services" smooth={true} duration={100} onClick={() => handleNavigation('services')}>
                                            Services
                                        </ScrollLink>
                                    </li>
                                    <li>
                                        <Link to="https://forms.gle/Ln1Tp1vrAq9pFoSHA" target='_blank'>Career</Link>
                                    </li>
                                    <li>
                                        <ScrollLink to="contact-us" smooth={true} duration={100} onClick={() => handleNavigation('contact-us')}>
                                            Contact
                                        </ScrollLink>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4">
                            <div className="widget">
                                <h3 className="heading">Contact</h3>
                                <ul className="list-unstyled quick-info links">
                                    <li className="email">
                                        <address className="text">
                                            <i className="fa-solid fa-envelope"></i>&nbsp; info@zerocarbs.in
                                        </address>
                                    </li>
                                    <li className="phone">
                                        <p><i className="fa-solid fa-phone"></i>&nbsp;+91 8638892886</p>
                                    </li>
                                    <li className="address">
                                        <p><i className="fa-solid fa-location-dot"></i>&nbsp;House No. 5, Nilomani Road, Christian Basti, Guwahati, Assam 781005</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="inner dark">
                <div className="container">
                    <div className="row text-center text-md-start">
                        <div className="col-md-6 mb-3 mb-md-0">
                            <p>Copyright &copy;{(new Date().getFullYear())} <b>Zerocarbs</b></p>
                        </div>
                        <div className="col-md-6 text-md-end">
                            <Link to='/terms-condition' className='mx-2'>Terms & Conditions</Link>
                            <Link to='/privacy-policy' className='mx-2'>Privacy Policy</Link>
                            <Link to='/return-policy' className='mx-2'>Return Policy</Link>
                            <Link to='/refund-policy' className='mx-2'>Refund Policy</Link>
                            <Link to='/shipping-policy' className='mx-2'>Shipping Policy</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer