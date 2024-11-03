/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import '../menu/style.scss';
import data from '../../utils/MenuData';
import { FaShoppingBag, FaShoppingCart, FaAngleDown } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import useTitle from '../../utils/useTitle';
import LazyLoadItem from '../../components/lazyLoadItem/LazyLoadItem';
import { fetchMenu } from '../../utils/MenuApi';

const Menu = () => {
  const [selected, setSelected] = useState([]);
  const [isSlideContainerVisible, setSlideContainerVisible] = useState(false);
  const [cart, setCart] = useState({});
  const navigate = useNavigate();

  useTitle("Menu");

  useEffect(() => {
    if (data && data.length > 0) {
      setSelected(data.map(dataItem => dataItem.id));
    }
  }, []);

  // Fetch Menu
  useEffect(() => {
    const getMenu = async () => {
      try {
        const fetchedMenu = await fetchMenu();
        console.log(fetchedMenu)

      } catch (error) {
        console.error('Error fetching menu:', error);
      }
    }
    getMenu();
  }, [])

  const handleSingleSelection = (currentId) => {
    if (selected.includes(currentId)) {
      setSelected(selected.filter(id => id !== currentId));
    } else {
      setSelected([...selected, currentId]);
    }
  };

  const toggleSlideContainer = () => {
    setSlideContainerVisible(!isSlideContainerVisible);
  };

  const handleAddToCart = (dish) => {
    setCart(prevCart => {
      const newCart = { ...prevCart };
      if (newCart[dish.item_id]) {
        newCart[dish.item_id].quantity += 1;
        newCart[dish.item_id].totalPrice = (newCart[dish.item_id].quantity) * dish.price;
      } else {
        newCart[dish.item_id] = { ...dish, quantity: 1, totalPrice: dish.price };
      }
      return newCart;
    });
  };

  const handleIncrement = (dishId) => {
    setCart(prevCart => ({
      ...prevCart,
      [dishId]: {
        ...prevCart[dishId],
        quantity: prevCart[dishId].quantity + 1,
        totalPrice: (prevCart[dishId].quantity + 1) * prevCart[dishId].price,
      },
    }));
  };

  const handleDecrement = (dishId) => {
    setCart(prevCart => {
      if (prevCart[dishId].quantity > 1) {
        return {
          ...prevCart,
          [dishId]: {
            ...prevCart[dishId],
            quantity: prevCart[dishId].quantity - 1,
            totalPrice: (prevCart[dishId].quantity - 1) * prevCart[dishId].price,
          },
        };
      } else {
        const { [dishId]: removed, ...rest } = prevCart;
        return rest;
      }
    });
  };

  const cartCount = Object.values(cart).reduce((total, item) => total + item.quantity, 0);

  const getTotalBill = () => {
    const itemTotal = Object.values(cart).reduce((total, item) => total + item.totalPrice, 0);
    const packagingCharges = 24.54;
    const gst = itemTotal * 0.18;
    const total = itemTotal + packagingCharges + gst;
    return {
      itemTotal,
      packagingCharges,
      gst,
      total,
    };
  };

  const { itemTotal, packagingCharges, gst, total } = getTotalBill();

  const handlePlaceOrder = () => {
    navigate('/payment');
  };


  

  return (
    <section className='menu-content'>
      <div className="container">
        <div className="row">
          <div className="col-lg-12 responsive_padding">
            <div className="accordion">
              {data && data.length > 0 ? (
                data.map((dataItem) => (
                  <div className="item" key={dataItem.id}>
                    <LazyLoadItem isTitle={true}>
                      <div className="title" onClick={() => handleSingleSelection(dataItem.id)}>
                        <h5>{dataItem.title}</h5>
                        <span className={`icon ${selected.includes(dataItem.id) ? 'rotate' : ''}`}><FaAngleDown size={25} /></span>
                      </div>
                    </LazyLoadItem>
                    {selected.includes(dataItem.id) ? (
                      <ul className="grid-container">
                        {dataItem.dishes.map((dish) => (
                          <LazyLoadItem key={dish.item_id}>
                            <li className="background">
                              <div className="imageDiv">
                                <img src={dish.imgSrc} alt={dish.altText} />
                                <div className="orderBtn">
                                  {cart[dish.item_id] ? (
                                    <div className="quantity-control">
                                      <button className="btn" onClick={() => handleDecrement(dish.item_id)}>-</button>
                                      <span>{cart[dish.item_id].quantity}</span>
                                      <button className="btn" onClick={() => handleIncrement(dish.item_id)}>+</button>
                                    </div>
                                  ) : (
                                    <button className="order-button" onClick={() => handleAddToCart(dish)}>Order</button>
                                  )}
                                </div>
                              </div>
                              <div>
                                <div className="itemDetails">
                                  <div className="bestSeller">
                                    <img src={dish.veg_non_veg} alt="" />
                                  </div>
                                  <h4>{dish.name}</h4>
                                  <div className="price">
                                    <span>₹&nbsp;{dish.price}/-</span>
                                  </div>
                                </div>
                                <p>{dish.description}</p>
                                <div className="energyCalc">
                                  <span>{dish.nutrition.kcal}</span>
                                  <div>|</div>
                                  <span>{dish.nutrition.protein}</span>
                                  <div>|</div>
                                  <span>{dish.nutrition.carbs}</span>
                                  <div>|</div>
                                  <span>{dish.nutrition.fat}</span>
                                </div>
                              </div>
                            </li>
                          </LazyLoadItem>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                ))
              ) : (
                <div>No Data Found</div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="floating-button" onClick={toggleSlideContainer}>
        <span className="count">{cartCount}</span>
        <FaShoppingBag size={25} />
      </div>

      <div className={`overlay ${isSlideContainerVisible ? 'visible' : ''}`} onClick={toggleSlideContainer}></div>
      <div className={`slide-container ${isSlideContainerVisible ? 'visible' : ''}`}>
        <div className="header-sidePanel">
          <div className="close-button" onClick={toggleSlideContainer}>
            <MdClose />
          </div>
          <h2>Your Cart</h2>
        </div>
        <div className="middle-part">
          {Object.values(cart).length > 0 ? (
            <>
              {Object.values(cart).map((cartItem) => (
                <div className="sidepanel-body" key={cartItem.item_id}>
                  <div className="leftSide">
                    <img src={cartItem.imgSrc} alt={cartItem.altText} />
                  </div>
                  <div className="rightSide">
                    <div className="headingText">
                      <img src={cartItem.veg_non_veg} alt="" />
                      <h6>{cartItem.name}</h6>
                    </div>
                    <div className="quantity-price-wrapper">
                      <div className="priceWrapper">
                        <p>₹&nbsp;{cartItem.totalPrice.toFixed(2)}</p>
                      </div>
                      <div className="quantityWrapper">
                        <div className="quantity">
                          <button className="btn" onClick={() => handleDecrement(cartItem.item_id)}>-</button>
                          <span>{cartItem.quantity}</span>
                          <button className="btn" onClick={() => handleIncrement(cartItem.item_id)}>+</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="billDetailsContainer">
                <div className="headingText">
                  <h6>Bill Details</h6>
                </div>
                <hr />
                <div className="billDetailsBody">
                  <div className="billDetailsContent">
                    <p>Item Total</p>
                    <span>₹&nbsp;{itemTotal.toFixed(2)}</span>
                  </div>
                  <div className="billDetailsContent">
                    <p>Packaging Charges</p>
                    <span>₹&nbsp;{packagingCharges.toFixed(2)}</span>
                  </div>
                  <div className="billDetailsContent">
                    <p>GST</p>
                    <span>₹&nbsp;{gst.toFixed(2)}</span>
                  </div>
                  <hr />
                  <div className="billDetailsContent">
                    <p className="total">Total</p>
                    <span className="total">₹&nbsp;{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="empty-cart-message">
              <FaShoppingCart />
           
            </div>
          )}
        </div>

        {Object.values(cart).length > 0 && (
          <div className="footer-sidePanel">
            <button type="button" className="btn" onClick={handlePlaceOrder}>Proceed to Checkout</button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Menu;
