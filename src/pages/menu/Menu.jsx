/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import '../menu/style.scss';
import { FaShoppingBag, FaShoppingCart, FaAngleDown } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import useTitle from '../../utils/useTitle';
import LazyLoadItem from '../../components/lazyLoadItem/LazyLoadItem';
import { fetchMenu } from '../../utils/WebApi';
import { imageUrl } from '../../api/axiosConfig';
import veg from '../../assets/images/veg.svg'
import nonVeg from '../../assets/images/non_veg.svg'
import Lottie from 'react-lottie';
import emptyData from '../../assets/empty_cart.json'
import NoItem from '../../assets/no_data.json'
import loaderJson from '../../assets/loader1.json'
import { Link } from 'react-router-dom';
const Menu = () => {
  const [menuData, setMenuData] = useState([]);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(false)
  const [isSlideContainerVisible, setSlideContainerVisible] = useState(false);
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : {};
  });
  
  const navigate = useNavigate();

  useTitle("Menu");
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: emptyData,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
    
};

const noItemsOptions = {
  loop: false,
  autoplay: true,
  animationData: NoItem,
  rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
  }
}

const loaderOptions = {
  loop: true,
  autoplay: true,
  animationData: loaderJson,
  rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
  }
}
  // Fetch Menu
  useEffect(() => {
    const getMenu = async () => {
      try {
        setLoading(true)
        const fetchedMenu = await fetchMenu();
        // console.log('Fetched menu:', fetchedMenu.data);

        if (Array.isArray(fetchedMenu.data)) {
          setMenuData(fetchedMenu.data);
          setSelected(fetchedMenu.data.map(dataItem => dataItem.id));
        } else {
          console.error('Fetched menu is not an array:', fetchedMenu);
        }
      } catch (error) {
        
        console.error('Error fetching menu:', error);
      } finally{
        setLoading(false)
      }
    };
    getMenu();
    
  }, []);

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

  const saveCartToLocalStorage = (updatedCart) => {
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleAddToCart = (dish) => {
    setCart(prevCart => {
      const newCart = { ...prevCart };
      if (newCart[dish.id]) {
        newCart[dish.id].quantity += 1;
        newCart[dish.id].totalPrice = Number(newCart[dish.id].quantity) * Number(dish.price);
      } else {
        newCart[dish.id] = { ...dish, quantity: 1, totalPrice: Number(dish.price) };
      }
      saveCartToLocalStorage(newCart);
      console.log(newCart)
      return newCart;
    });
  };

  const handleIncrement = (dishId) => {
    setCart(prevCart => {
      const updatedCart = {
        ...prevCart,
        [dishId]: {
          ...prevCart[dishId],
          quantity: prevCart[dishId].quantity + 1,
          totalPrice: Number((prevCart[dishId].quantity + 1) * prevCart[dishId].price),
        },
      };
      saveCartToLocalStorage(updatedCart);
      return updatedCart;
    });
  };

  const handleDecrement = (dishId) => {
    setCart(prevCart => {
      let updatedCart;
      if (prevCart[dishId].quantity > 1) {
        updatedCart = {
          ...prevCart,
          [dishId]: {
            ...prevCart[dishId],
            quantity: prevCart[dishId].quantity - 1,
            totalPrice: Number((prevCart[dishId].quantity - 1) * prevCart[dishId].price),
          },
        };
      } else {
        const { [dishId]: removed, ...rest } = prevCart;
        updatedCart = rest;
      }
      saveCartToLocalStorage(updatedCart);
      return updatedCart;
    });
  };

  const cartCount = Object.values(cart).reduce((total, item) => total + item.quantity, 0);

  const getTotalBill = () => {
    const itemTotal = Object.values(cart).reduce((total, item) => total + item.totalPrice, 0);
    const packagingCharges = 24.54;
    const gst = itemTotal * 0.05;
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
  const handleGoToHome = () => {
    setSlideContainerVisible(!isSlideContainerVisible);
    navigate('/menu'); 
};


  return (
    <section className='menu-content'>
      <div className="container">
        <div className="row">
          <div className="col-lg-12 responsive_padding">
            <div className="accordion">
              {loading ?    <div style={{ width: '100%', maxWidth: '200px', margin: '0 auto' }}> <Lottie
                    options={loaderOptions}
                    height={'100%'}   // Let it scale with the container
                    width={'100%'}    // Let it scale with the container
                    style={{
                        maxWidth: '100%', // Ensure it doesn't overflow
                        maxHeight: '100%', // Ensure it doesn't overflow
                    }}
                /> </div>: menuData && menuData.length > 0 && !loading ? (
                menuData.map((dataItem) => (
                  <div className="item" key={dataItem.id}>
                    <LazyLoadItem isTitle={true}>
                      <div className="title" onClick={() => handleSingleSelection(dataItem.id)}>
                        <h5>{dataItem.name}</h5>
                        <span className={`icon ${selected.includes(dataItem.id) ? 'rotate' : ''}`}><FaAngleDown size={25} /></span>
                      </div>
                    </LazyLoadItem>
                    {selected.includes(dataItem.id) ? (
                      <ul className="grid-container">
                        {dataItem.items.map((dish) => (
                          <LazyLoadItem key={dish.id}>
                            <li className="background">
                              <div className="imageDiv">
                                <img src={`${imageUrl}${dish.image}`} alt={dish.name} />
                                <div className="orderBtn">
                                  {dish.status === 0 ? (
                                    <div className="stockStatus">
                                      <p>Out of Stock</p>
                                    </div>
                                  ) : (
                                    cart[dish.id] ? (
                                      <div className="quantity-control">
                                        <button className="btn" onClick={() => handleDecrement(dish.id)}>-</button>
                                        <span>{cart[dish.id].quantity}</span>
                                        <button className="btn" onClick={() => handleIncrement(dish.id)}>+</button>
                                      </div>
                                    ) : (
                                      <button className="order-button" onClick={() => handleAddToCart(dish)}>Order</button>
                                    )
                                  )}
                                </div>
                              </div>
                              <div>
                                <div className="itemDetails">
                                  <div className="bestSeller">
                                    <img src={dish.type === "non-veg" ? nonVeg : veg} alt={dish.type} />
                                  </div>
                                  <h4>{dish.name}</h4>
                                  <div className="price">
                                    <span>₹&nbsp;{dish.price}/-</span>
                                  </div>
                                </div>
                                <p>{dish.description}</p>
                                <div className="energyCalc">
                                  {dish.nutritions.map((nutrition, index) => (
                                    <React.Fragment key={index}>
                                      <span>{`${nutrition.type}: ${nutrition.value}`}g</span>
                                      {index < dish.nutritions.length - 1 && <div>|</div>}
                                    </React.Fragment>
                                  ))}
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
                <div style={{ width: '100%', maxWidth: '300px', margin: '0 auto' }}>
                <Lottie
                    options={noItemsOptions}
                    height={'100%'}   // Let it scale with the container
                    width={'100%'}    // Let it scale with the container
                    style={{
                        maxWidth: '100%', // Ensure it doesn't overflow
                        maxHeight: '100%', // Ensure it doesn't overflow
                    }}
                />
            </div>
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
                <div className="sidepanel-body" key={cartItem.id}>
                  <div className="leftSide">
                    <img src={`${imageUrl}${cartItem.image}`} alt={cartItem.name} />
                  </div>
                  <div className="rightSide">
                    <div className="headingText">
                      <img src={cartItem.type === "non-veg" ? nonVeg : veg} alt={cartItem.type} />
                      <h6>{cartItem.name}</h6>
                    </div>
                    <div className="quantity-price-wrapper">
                      <div className="priceWrapper">
                        <p>₹&nbsp;{Number(cartItem.totalPrice || 0).toFixed(2)}</p>
                      </div>
                      <div className="quantityWrapper">
                        <div className="quantity">
                          <button className="btn" onClick={() => handleDecrement(cartItem.id)}>-</button>
                          <span>{cartItem.quantity}</span>
                          <button className="btn" onClick={() => handleIncrement(cartItem.id)}>+</button>
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
                    <span className="total">₹&nbsp;{Math.round(total)}</span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="empty-cart-message">
                <Lottie options={defaultOptions} height={300} width={300} />
                <div style={{ textAlign: 'center', padding: '20px' }}>
            <span>Your cart is currently empty. Start adding items to it!</span>
            <br />
           
                <button className='goto-homepage' onClick={handleGoToHome} >
                    Go to Home Page
                </button>
         
        </div>
   
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
