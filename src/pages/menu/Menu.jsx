/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import "../menu/style.scss";
import { FaShoppingBag, FaShoppingCart, FaAngleDown } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import useTitle from "../../utils/useTitle";
import LazyLoadItem from "../../components/lazyLoadItem/LazyLoadItem";
import { fetchMenu } from "../../utils/WebApi";
import { imageUrl } from "../../api/axiosConfig";
import veg from "../../assets/images/veg.svg";
import nonVeg from "../../assets/images/non_veg.svg";
import Lottie from "react-lottie";
import emptyData from "../../assets/empty_cart.json";
import NoItem from "../../assets/no_data.json";
import loaderJson from "../../assets/loader1.json";
import { Link } from "react-router-dom";
import StarRating from "../../components/startRaiting/StarRaiting";
import { FaShare } from "react-icons/fa";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { BsCartPlus } from "react-icons/bs";
import MultiSelectCounter from "../../components/multiSelectButton/MultiSelectButton";
import CartItemAddons from "../../components/cartItemAddons/CartItemAddons";
const Menu = () => {
  const [menuData, setMenuData] = useState([]);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSlideContainerVisible, setSlideContainerVisible] = useState(false);
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : {};
  });

  const navigate = useNavigate();

  useTitle("Menu");
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: emptyData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const noItemsOptions = {
    loop: false,
    autoplay: true,
    animationData: NoItem,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const loaderOptions = {
    loop: true,
    autoplay: true,
    animationData: loaderJson,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  // Fetch Menu
  useEffect(() => {
    const getMenu = async () => {
      try {
        setLoading(true);
        const fetchedMenu = await fetchMenu();
        console.log("Fetched menu:", fetchedMenu.data);

        if (Array.isArray(fetchedMenu.data)) {
          setMenuData(fetchedMenu.data);
          setSelected(fetchedMenu.data.map((dataItem) => dataItem.id));
        } else {
          console.error("Fetched menu is not an array:", fetchedMenu);
        }
      } catch (error) {
        console.error("Error fetching menu:", error);
      } finally {
        setLoading(false);
      }
    };
    getMenu();
  }, []);

  const handleSingleSelection = (currentId) => {
    if (selected.includes(currentId)) {
      setSelected(selected.filter((id) => id !== currentId));
    } else {
      setSelected([...selected, currentId]);
    }
  };

  const toggleSlideContainer = () => {
    setSlideContainerVisible(!isSlideContainerVisible);
    calculateToppingsPrice(cart);
  };

  const saveCartToLocalStorage = (updatedCart) => {
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleAddToCart = (dish) => {
    if (dish.addons.length == 0) {
      console.log("dish", dish);
      setCart((prevCart) => {
        const newCart = { ...prevCart };
        if (newCart[dish.id]) {
          newCart[dish.id].quantity += 1;
          newCart[dish.id].totalPrice =
            Number(newCart[dish.id].quantity) * Number(dish.price);
        } else {
          newCart[dish.id] = {
            ...dish,
            quantity: 1,
            totalPrice: Number(dish.price),
          };
        }
        saveCartToLocalStorage(newCart);
        console.log(newCart);
        return newCart;
      });
    } else {
      setIsSlidingPageOpen(!isSlidingPageOpen);
      setDishAddOnData(dish);
      console.log(dish);
      const formattedAddons = dish.addons.map((items) => ({
        group_id: items?.addon_group[0]?.id,
        group_name: items?.addon_group[0]?.name,
        max_quantity: items?.addon_group[0]?.max_quantity,
        addOnItems: items?.addon_group[0]?.items.map((addOnItem, index) => ({
          id: addOnItem.id,
          item: addOnItem.item,
          price: addOnItem.price,
          type: addOnItem.type,
          quantity: 0,
          selected: index == 0,
        })),
      }));

      setTopingsSelect(formattedAddons);
    }
  };

  const calculateToppingsPrice = (cart) => {
    const updatedCart = { ...cart };

    for (const key in updatedCart) {
      const item = updatedCart[key];

      if (item.topings && item.topings.length > 0) {
        let totalToppingsPrice = 0;

        item.topings.forEach((toppingGroup) => {
          toppingGroup.forEach((group) => {
            const { max_quantity, addOnItems } = group;

            addOnItems.forEach((addOn) => {
              if (max_quantity === 1 && addOn.selected) {
                totalToppingsPrice += parseFloat(addOn.price);
              } else if (max_quantity > 1 && addOn.quantity > 0) {
                totalToppingsPrice += parseFloat(addOn.price) * addOn.quantity;
              }
            });
          });
        });

        // Update the total_toppings_price in the item
        item.total_toppings_price = totalToppingsPrice;
      } else {
        // If no toppings, set total_toppings_price to 0
        item.total_toppings_price = 0;
      }
    }

    setCart(updatedCart);
    saveCartToLocalStorage(cart);
    return updatedCart;
  };

  useEffect(() => {
    console.log("cart:  ", cart);
  }, [cart]);

  const handleIncrement = (dish) => {
    const dishId = dish.id;
    if (dish?.addons?.length == 0) {
      setCart((prevCart) => {
        const updatedCart = {
          ...prevCart,
          [dishId]: {
            ...prevCart[dishId],
            quantity: prevCart[dishId].quantity + 1,
            totalPrice: Number(
              (prevCart[dishId].quantity + 1) * prevCart[dishId].price
            ),
          },
        };
        saveCartToLocalStorage(updatedCart);
        return updatedCart;
      });
    } else {
      setIsSlidingPageOpen(!isSlidingPageOpen);
      setDishAddOnData(dish);
      console.log(dish);
      const formattedAddons = dish.addons.map((items) => ({
        group_id: items?.addon_group[0]?.id,
        group_name: items?.addon_group[0]?.name,
        max_quantity: items?.addon_group[0]?.max_quantity,
        addOnItems: items?.addon_group[0]?.items.map((addOnItem, index) => ({
          id: addOnItem.id,
          item: addOnItem.item,
          price: addOnItem.price,
          type: addOnItem.type,
          quantity: 0,
          selected: index == 0,
        })),
      }));

      setTopingsSelect(formattedAddons);
    }
  };
  const handleDecrement = (dishId) => {
    setCart((prevCart) => {
      let updatedCart;

      if (prevCart[dishId].quantity > 1) {
        console.log("prev topings", prevCart[dishId]?.topings);

        // Safely handle topings array
        const currentTopings = prevCart[dishId]?.topings || [];
        const updatedTopings = [...currentTopings];
        updatedTopings.pop(); // Remove the last set of toppings for this dish

        updatedCart = {
          ...prevCart,
          [dishId]: {
            ...prevCart[dishId],
            quantity: prevCart[dishId].quantity - 1,
            totalPrice: Number(
              (prevCart[dishId].quantity - 1) * prevCart[dishId].price
            ),
            topings: updatedTopings,
          },
        };
      } else {
        // Remove the dish entirely if quantity is 1
        const { [dishId]: removed, ...rest } = prevCart;
        updatedCart = rest;
      }

      // Recalculate toppings price for the updated cart
      const upCart = calculateToppingsPrice(updatedCart);

      saveCartToLocalStorage(upCart);
      return upCart;
    });
  };

  const handleAddTopings = () => {};

  const cartCount = Object.values(cart).reduce(
    (total, item) => total + item.quantity,
    0
  );

  const getTotalBill = () => {
    const itemTotal = Object.values(cart).reduce(
      (total, item) => total + item.totalPrice + item?.total_toppings_price,
      0
    );
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
    navigate("/payment");
  };
  const handleGoToHome = () => {
    setSlideContainerVisible(!isSlideContainerVisible);
    navigate("/menu");
  };

  const [expandedDescriptions, setExpandedDescriptions] = useState({});

  const toggleDescription = (dishId) => {
    setExpandedDescriptions((prevState) => ({
      ...prevState,
      [dishId]: !prevState[dishId],
    }));
  };

  // Sliding page logic
  const [isSlidingPageOpen, setIsSlidingPageOpen] = useState(false);
  const accordionRef = useRef(null);
  const [accordionWidth, setAccordionWidth] = useState(0);
  const [dishAddOnData, setDishAddOnData] = useState();

  useEffect(() => {
    const updateWidth = () => {
      if (accordionRef.current) {
        setAccordionWidth(accordionRef.current.offsetWidth);
      }
    };

    // Initialize ResizeObserver to watch for changes in the element's size
    const resizeObserver = new ResizeObserver(() => {
      updateWidth();
    });

    if (accordionRef.current) {
      resizeObserver.observe(accordionRef.current); // Start observing the element
      updateWidth(); // Initial width update
    }

    // Cleanup function to disconnect the observer
    return () => {
      if (accordionRef.current) {
        resizeObserver.unobserve(accordionRef.current);
      }
    };
  }, []);

  // Disable background scroll when the sliding page is open
  useEffect(() => {
    if (isSlidingPageOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // Cleanup to ensure scroll behavior is reset on component unmount or state change
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isSlidingPageOpen]);

  useEffect(() => {
    return () => {
      setDishAddOnData({});
    };
  }, []);

  // This is to show topings select count

  // const [topingsSelect, setTopingsSelect] = useState([
  //   {
  //     id: 1,
  //     name: "watermelon and chia prassed juice",
  //     price: 399,
  //     quantity: 0,
  //   },
  // ]);

  const [topingsSelect, setTopingsSelect] = useState([]);

  const handleRadioChange = (addonGroupId, itemId, itemName) => {
    setTopingsSelect((prevState) =>
      prevState.map((group) => {
        if (group.group_id === addonGroupId) {
          return {
            ...group,
            addOnItems: group.addOnItems.map((item) => ({
              ...item,
              selected: item.id === itemId,
              quantity: item.id === itemId ? 1 : 0,
            })),
          };
        }
        return group;
      })
    );
  };

  function handleAddToCartBtn(dishData) {
    console.log(dishData);
    console.log("topings select", topingsSelect);

    setCart((prevCart) => {
      const newCart = { ...prevCart };

      if (newCart[dishData.id]) {
        newCart[dishData.id].quantity += 1;
        newCart[dishData.id].totalPrice =
          Number(newCart[dishData.id].quantity) * Number(dishData.price);

        // Add new toppings to the array
        newCart[dishData.id].topings = [
          ...newCart[dishData.id].topings,
          topingsSelect,
        ];
      } else {
        newCart[dishData.id] = {
          ...dishData,
          quantity: 1,
          totalPrice: Number(dishData.price),
          // Initialize toppings with the first selection
          topings: [topingsSelect],
        };
      }

      // Update total_toppings_price for each item
      for (const key in newCart) {
        const item = newCart[key];
        if (item.topings && item.topings.length > 0) {
          let totalToppingsPrice = 0;

          item.topings.forEach((toppingGroup) => {
            toppingGroup.forEach((group) => {
              const { max_quantity, addOnItems } = group;

              addOnItems.forEach((addOn) => {
                if (max_quantity === 1 && addOn.selected) {
                  totalToppingsPrice += parseFloat(addOn.price);
                } else if (max_quantity > 1 && addOn.quantity > 0) {
                  totalToppingsPrice +=
                    parseFloat(addOn.price) * addOn.quantity;
                }
              });
            });
          });

          item.total_toppings_price = totalToppingsPrice;
        } else {
          item.total_toppings_price = 0;
        }
      }

      // Save the updated cart to local storage
      saveCartToLocalStorage(newCart);
      console.log(newCart);

      return newCart;
    });

    setIsSlidingPageOpen(false);
    setDishAddOnData({});
  }

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxLength = screenWidth < 490 ? 57 : 100;

  return (
    <>
      <section className="menu-content">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 responsive_padding">
              <div ref={accordionRef} className="accordion">
                {loading ? (
                  <div
                    style={{
                      width: "100%",
                      maxWidth: "200px",
                      margin: "0 auto",
                    }}
                  >
                    {" "}
                    <Lottie
                      options={loaderOptions}
                      height={"100%"} // Let it scale with the container
                      width={"100%"} // Let it scale with the container
                      style={{
                        maxWidth: "100%", // Ensure it doesn't overflow
                        maxHeight: "100%", // Ensure it doesn't overflow
                      }}
                    />{" "}
                  </div>
                ) : menuData && menuData.length > 0 && !loading ? (
                  menuData.map((dataItem) => (
                    <div className="item" key={dataItem.id}>
                      <LazyLoadItem isTitle={true}>
                        <div
                          className="title"
                          onClick={() => handleSingleSelection(dataItem.id)}
                        >
                          <h5>{dataItem.name}</h5>
                          <span
                            className={`icon ${
                              selected.includes(dataItem.id) ? "rotate" : ""
                            }`}
                          >
                            <FaAngleDown size={25} />
                          </span>
                        </div>
                      </LazyLoadItem>
                      {selected.includes(dataItem.id) ? (
                        <ul className="grid-container">
                          {dataItem.items.map((dish) => (
                            <LazyLoadItem key={dish.id}>
                              <li className="menuItemContainer background flex flex-row-reverse items-center">
                                <div className="imageDiv w-1/3 ml-4">
                                  <img
                                    src={`${imageUrl}${dish.image}`}
                                    alt={dish.name}
                                    className=""
                                  />
                                  <div
                                    className={`orderBtn mt-2 ${
                                      dish.addons?.length > 0
                                        ? "has-addons"
                                        : ""
                                    }`}
                                  >
                                    {dish.status === 0 ? (
                                      <div className="stockStatus text-center">
                                        <p>Out of Stock</p>
                                      </div>
                                    ) : cart[dish.id] ? (
                                      <div className="quantity-control flex justify-center items-center">
                                        <button
                                          className="btn px-2 bg-gray-200"
                                          onClick={() =>
                                            handleDecrement(dish.id)
                                          }
                                        >
                                          -
                                        </button>
                                        <span className="mx-2">
                                          {cart[dish.id].quantity}
                                        </span>
                                        <button
                                          className="btn px-2 bg-gray-200"
                                          onClick={() => handleIncrement(dish)}
                                        >
                                          +
                                        </button>
                                      </div>
                                    ) : (
                                      <button
                                        className="order-button"
                                        onClick={() => handleAddToCart(dish)}
                                      >
                                        Order
                                      </button>
                                    )}
                                    {dish.addons?.length > 0 && (
                                      <span className="customizable-text">
                                        customizable
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <div className="w-2/3 pr-4 itemDetailsContainer">
                                  <div className="itemDetails">
                                    <div className="bestSeller">
                                      <img
                                        src={
                                          dish.type === "non-veg" ? nonVeg : veg
                                        }
                                        alt={dish.type}
                                      />
                                    </div>
                                    <h4>{dish.name}</h4>
                                    <div className="raitingDiv">
                                      <StarRating initialRating={4.5} />{" "}
                                      <span>98 raitings</span>
                                    </div>
                                    <div className="price">
                                      <span>₹&nbsp;{dish.price}/-</span>
                                    </div>
                                  </div>
                                  <p>
                                    {expandedDescriptions[dish.id]
                                      ? dish.description
                                      : `${dish.description.slice(
                                          0,
                                          maxLength
                                        )}...`}
                                    <span
                                      className="text-blue-500 ml-2"
                                      onClick={() => toggleDescription(dish.id)}
                                    >
                                      {expandedDescriptions[dish.id]
                                        ? "read less"
                                        : "read more"}
                                    </span>
                                  </p>
                                  <div className="energyCalc">
                                    {dish.nutritions?.map(
                                      (nutrition, index) => (
                                        <React.Fragment key={index}>
                                          <span>
                                            {`${nutrition.type}: ${nutrition.value}`}
                                            g
                                          </span>
                                          {index <
                                            dish.nutritions.length - 1 && (
                                            <div>.</div>
                                          )}
                                        </React.Fragment>
                                      )
                                    )}
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
                  <div
                    style={{
                      width: "100%",
                      maxWidth: "300px",
                      margin: "0 auto",
                    }}
                  >
                    <Lottie
                      options={noItemsOptions}
                      height={"100%"} // Let it scale with the container
                      width={"100%"} // Let it scale with the container
                      style={{
                        maxWidth: "100%", // Ensure it doesn't overflow
                        maxHeight: "100%", // Ensure it doesn't overflow
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div>
          {/* Overlay that blocks interactions */}
          {isSlidingPageOpen && (
            <div
              className="zpt-overlay"
              onClick={() => {
                setIsSlidingPageOpen(false);
                setDishAddOnData({});
              }}
            ></div>
          )}

          {/* Close Button */}
          <div
            onClick={() => {
              setIsSlidingPageOpen(!isSlidingPageOpen);
              setDishAddOnData({});
            }}
            className={`zpt-sliding-page-close ${
              isSlidingPageOpen ? "open" : ""
            }`}
          >
            <IoIosCloseCircleOutline color="white" size={40} />
          </div>

          {/* Sliding Page */}
          <div
            style={{
              width: accordionWidth < 575 ? "100%" : `${accordionWidth}px`,
            }}
            className={`zpt-sliding-page ${isSlidingPageOpen ? "open" : ""}`}
          >
            <div className="zpt-heading">
              <div>
                <img src={`${imageUrl}${dishAddOnData?.image}`} alt="Dish" />
                <span>{dishAddOnData?.name}</span>
              </div>

              <div>
                <FaShare
                size={20}
                style={{cursor:"pointer"}}
                  onClick={() => {
                    setIsSlidingPageOpen(!isSlidingPageOpen);
                    setDishAddOnData({});
                  }}
                />
              </div>
            </div>
            <div className="zpt-topings-container">
              {dishAddOnData?.addons?.map((addOnItems) => {
                return addOnItems?.addon_group[0]?.max_quantity === 1 ? (
                  <div
                    key={addOnItems?.addon_group_id}
                    className="zpt-topings-single-select"
                  >
                    <div className="zpt-toping-header">
                      <span>{addOnItems?.addon_group[0]?.name}</span>
                      <span>Required Select any 1 option</span>
                    </div>
                    <div className="zpt-topings-single-select-options">
                      <div className="zpt-single-toping-item">
                        {addOnItems?.addon_group[0]?.items.map(
                          (singleAddOnItem, index) => {
                            // Find the current addon group in topingsSelect
                            const currentGroup = topingsSelect.find(
                              (group) =>
                                group.group_id === addOnItems.addon_group_id
                            );

                            // Get the selected state from the matching item in topingsSelect
                            const isSelected = currentGroup?.addOnItems.find(
                              (item) => item.id === singleAddOnItem.id
                            )?.selected;
                            return (
                              <div
                                key={singleAddOnItem.id}
                                className="zpt-toping-name-container"
                              >
                                <span className="zpt-toping-name">
                                  {singleAddOnItem.item}
                                </span>
                                <input
                                  type="radio"
                                  name={`addon-group-${addOnItems.addon_group_id}`}
                                  value={singleAddOnItem.item}
                                  checked={isSelected}
                                  onChange={() =>
                                    handleRadioChange(
                                      addOnItems.addon_group_id,
                                      singleAddOnItem.id,
                                      singleAddOnItem.item
                                    )
                                  }
                                />
                              </div>
                            );
                          }
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    key={addOnItems?.addon_group_id}
                    className="zpt-topings-multi-select"
                  >
                    <div className="zpt-multi-toping-header">
                      <span>{addOnItems?.addon_group[0]?.name}</span>
                      <span>
                        Select Upto {addOnItems?.addon_group[0]?.max_quantity}{" "}
                        options
                      </span>
                    </div>

                    <div className="zpt-multi-options">
                      {addOnItems?.addon_group[0]?.items.map((items) => {
                        return (
                          <div key={items.id} className="zpt-multi-option-item">
                            <div>
                              <img
                                src={`${items.type == "veg" ? veg : nonVeg}`}
                              />
                              <span>{items.item}</span>
                            </div>
                            <div>
                              <MultiSelectCounter
                                maxItem={6}
                                topingsSelect={topingsSelect}
                                id={items.id}
                                groupId={addOnItems.addon_group_id}
                                setTopingsSelect={setTopingsSelect}
                              />
                              <span className="zpt-multi-item-price">
                                &#8377;{items.price}/-
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
            <div
              className="zpt-add-to-cart"
              onClick={() => handleAddToCartBtn(dishAddOnData)}
            >
              <span>
                <BsCartPlus size={30} />
              </span>
              <span>Add to Cart</span>
            </div>
          </div>
        </div>

        <div className="floating-button" onClick={toggleSlideContainer}>
          <span className="count">{cartCount}</span>
          <FaShoppingBag size={25} />
        </div>

        <div
          className={`overlay ${isSlideContainerVisible ? "visible" : ""}`}
          onClick={toggleSlideContainer}
        ></div>
        <div
          className={`slide-container ${
            isSlideContainerVisible ? "visible" : ""
          }`}
        >
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
                      <img
                        src={`${imageUrl}${cartItem.image}`}
                        alt={cartItem.name}
                      />
                    </div>
                    <div className="rightSide">
                      <div className="headingText">
                        <img
                          src={cartItem.type === "non-veg" ? nonVeg : veg}
                          alt={cartItem.type}
                        />
                        <h6>{cartItem.name}</h6>
                      </div>
                      <div className="quantity-price-wrapper">
                        <div className="priceWrapper">
                          <p>
                            ₹&nbsp;
                            {Number(
                              cartItem.totalPrice +
                                cartItem?.total_toppings_price || 0
                            ).toFixed(2)}
                          </p>
                        </div>
                        <div className="quantityWrapper">
                          <div className="quantity">
                            <button
                              className="btn"
                              onClick={() => handleDecrement(cartItem.id)}
                            >
                              -
                            </button>
                            <span>{cartItem.quantity}</span>
                            <button
                              className="btn"
                              onClick={() => handleIncrement(cartItem)}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    {console.log(cartItem)}
                    {cartItem.topings?.length > 0 && (
                      <CartItemAddons topings={cartItem.topings} />
                    )}
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
                <div style={{ textAlign: "center", padding: "20px" }}>
                  <span>
                    Your cart is currently empty. Start adding items to it!
                  </span>
                  <br />

                  <button className="goto-homepage" onClick={handleGoToHome}>
                    Go to Home Page
                  </button>
                </div>
              </div>
            )}
          </div>

          {Object.values(cart).length > 0 && (
            <div className="footer-sidePanel">
              <button type="button" className="btn" onClick={handlePlaceOrder}>
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Menu;
