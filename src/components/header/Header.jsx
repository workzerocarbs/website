/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import "../header/style.scss";
import logo from "../../assets/logo/logo1.png";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link as ScrollLink, scroller } from "react-scroll";

const Header = () => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const [color, setColor] = useState(false);
  const navigate = useNavigate();

  const changeColor = () => {
    if (window.scrollY >= 100) {
      setColor(true);
    } else {
      setColor(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeColor);
    return () => {
      window.removeEventListener("scroll", changeColor);
    };
  }, []);

  const handleNavigation = (section) => {
    setClick(false);
    if (window.location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        scroller.scrollTo(section, {
          duration: 100,
          smooth: true,
        });
        window.history.pushState(null, "", `#${section}`);
      }, 100);
    } else {
      scroller.scrollTo(section, {
        duration: 100,
        smooth: true,
      });
      window.history.pushState(null, "", `#${section}`);
    }
  };

  const handleLogoClick = () => {
    setClick(false);
    if (window.location.pathname !== "/") {
      navigate("/");
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="main-header">
      <div className={color ? "header header-bg" : "header"}>
        <div
          className="logo"
          onClick={handleLogoClick}
          style={{ cursor: "pointer" }}
        >
          <img src={logo} alt="logo" />
        </div>
        <ul className={click ? "nav-menu active" : "nav-menu"}>
          <li>
            <ScrollLink
              to="home-section"
              smooth={true}
              duration={100}
              onClick={() => handleNavigation("home-section")}
            >
              Home
            </ScrollLink>
          </li>
          <li>
            <ScrollLink
              to="about-us"
              smooth={true}
              duration={100}
              onClick={() => handleNavigation("about-us")}
            >
              About us
            </ScrollLink>
          </li>
          <li>
            <ScrollLink
              to="services"
              smooth={true}
              duration={100}
              onClick={() => handleNavigation("services")}
            >
              Services
            </ScrollLink>
          </li>
          <li>
            <Link to="/menu" onClick={() => setClick(false)}>
              Menu
            </Link>
          </li>
          <li>
            <Link to="https://forms.gle/Ln1Tp1vrAq9pFoSHA" target="_blank">
              Career
            </Link>
          </li>
          <li>
            <ScrollLink
              to="contact-us"
              smooth={true}
              duration={100}
              onClick={() => handleNavigation("contact-us")}
            >
              Contact
            </ScrollLink>
          </li>
        </ul>
        <div className="hamburger" onClick={handleClick}>
          {click ? (
            <FaTimes size={20} style={{ color: "black" }} />
          ) : (
            <FaBars size={20} style={{ color: "black" }} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
