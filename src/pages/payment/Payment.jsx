/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import "../payment/style.scss";
import Modal from "../../components/modal/Modal";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import useTitle from "../../utils/useTitle";
import fetchAddress from "../../api/fetchAddress";
import axios from "axios";
import { imageUrl } from "../../api/axiosConfig";
import PlacesAutocomplete from "react-places-autocomplete";
import { fetchActiveCoupons, fetchPromoCodes } from "../../utils/WebApi";
import MapAddress from "../../components/map/MapAddress";
import { Sheet } from "react-modal-sheet";
import BillingDetailsForm from "../../components/address/BilllingDetailsForm";
import ReusableOTPInput from "../../components/otp/OtpInputComponent";
import { MdLocationOn } from "react-icons/md";
import { GiWallet } from "react-icons/gi";
import { IoChevronBackCircleSharp } from "react-icons/io5";
import { IoIosAddCircle } from "react-icons/io";

import OrderSummary from "../../components/order/OrderSummary";
import PaymentSummary from "../../components/payment/paymentSummary/PaymentSummary";
import PaymentMethod from "../../components/payment/paymentMethod/PaymentMethod";
import PhoneNumberInput from "../../components/phonenumber/PhoneNumber";
import PromoCodeComponent from "../../components/promocode/PromoCode";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Payment = () => {
  const [coupons, setCoupons] = useState([]);
  const navigate = useNavigate();
  const otpInputRefs = useRef([]);
  const customerInfoRef = useRef(null);
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : {};
  });
  const [isModalVisible, setModalVisible] = useState(false);
  const [verifyOtpModal, setVerifyOtpModal] = useState(false);
  const [isBillingModalVisible, setBillingModalVisible] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [appliedPromoCode, setAppliedPomoCode] = useState(null);
  const [addressFormDetails, setAddressFormDetails] = useState({
    buildingHouseNo: "",
    society: "",
    landmark: "",
    contactDetails: "",
    phoneNo: "",
    addressType: "Home",
  });
  const [otpInputs, setOtpInputs] = useState(["", "", "", "", "", ""]);
  const [otpError, setOtpError] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [buttonText, setButtonText] = useState("Verify OTP");
  const [otpVerified, setOtpVerified] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [pin, setPin] = useState("");
  const [errors, setErrors] = useState({});
  const [state, setState] = useState("");
  const [orderId, setOrderId] = useState(0);
  const [taxId, setTaxId] = useState(0);
  const [addressInput, setAddressInput] = useState(address);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [promoCodes, setPromoCodes] = useState([]);
  const [enteredCode, setEnteredCode] = useState("");
  const [error, setError] = useState("");
  const [distance, setDistance] = useState(0);
  const storeLat = parseFloat(import.meta.env.VITE_STORE_LAT);
  const storeLng = parseFloat(import.meta.env.VITE_STORE_LNG);
  const [isOpen, setOpen] = useState(false);
  const [isLocationModalOpen, setLocationModalOpen] = useState(false);
  const [showPickDeliveryAddress, setShowPickDeliveryAddress] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showPaymentMethod, setShowPaymentMethod] = useState(false);
  const [showOTPInputField, setShowOTPInputField] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showAddressDetailForm, setShowAddressDetailForm] = useState(false);
  const sheetRef = useRef(null);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 480);
  const contentRef = useRef(null);
  const [snapPoints, setSnapPoints] = useState([0.4]);
  // Handler to update the state when the payment method changes

  useLayoutEffect(() => {
    if (isSmallScreen && contentRef.current) {
      const contentHeight = contentRef.current.offsetHeight;
      const screenHeight = window.innerHeight;
      const snapPoint = Math.min(contentHeight / screenHeight, 0.5);
      console.log(snapPoint);
      // Ensure snap points are in descending order
      if (snapPoint > 0 && snapPoint < 1) {
        setSnapPoints([1, 0.5]); // Full height first, then the content-based height
      } else {
        setSnapPoints([1]); // Fallback to full height if snap point is invalid
      }
    }
  }, [isSmallScreen, showOTPInputField, showAddressDetailForm]);

  const showForm = () => {
    setShowAddressDetailForm(true);
  };
  const handlePaymentChange = (value) => {
    setPaymentMethod(value);
  };

  const handleSelect = (selectedAddress) => {
    setAddressInput(selectedAddress);
    // Use Google Maps Geocoder to get details of the selected address
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: selectedAddress }, (results, status) => {
      if (status === window.google.maps.GeocoderStatus.OK) {
        const result = results[0];
        const addressComponents = result.address_components;
        let state = "";
        let pin = "";

        addressComponents.forEach((component) => {
          if (component.types.includes("administrative_area_level_1")) {
            state = component.long_name;
          }
          if (component.types.includes("postal_code")) {
            pin = component.long_name;
          }
        });

        setState(state);
        setPin(pin);

        // Update the state and pincode in the parent component
        handleInputChange(
          { target: { name: "address", value: selectedAddress } },
          "address"
        );
        handleInputChange({ target: { name: "state", value: state } }, "state");
        handleInputChange({ target: { name: "pin", value: pin } }, "pin");
      }
    });
  };
  useTitle("Payment");

  useEffect(() => {
    if ("geolocation" in navigator) {
      console.log("enters in geloacation");
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        console.log(latitude, longitude);
        const distance = calculateDistance(
          storeLat,
          storeLng,
          latitude,
          longitude
        );
        console.log("distance", distance);
        setDistance(distance);
        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
        try {
          const addressData = await fetchAddress(latitude, longitude);
          console.log("addressData ", addressData);
          if (addressData) {
            const address = `${addressData.residential}, ${addressData.suburb}, ${addressData.state_district}`;
            setAddress(address);
            setState(addressData.state || "");
            setPin(addressData.postcode || "");
          }
        } catch (error) {
          console.error("Error setting address:", error);
        }
      });
    } else {
      console.log("Geolocation is not available in your browser.");
    }
  }, []);

  const handleApplyCoupon = (coupon) => {
    console.log("coupon", coupon);
    setAppliedCoupon(coupon);
    setModalVisible(false);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleCloseOtpModal = () => {
    setOtpInputs(["", "", "", "", "", ""]);
    setOtpError("");
    setButtonText("Verify OTP");
    setVerifyOtpModal(false);
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setAppliedPomoCode(null);
    setEnteredCode("");
    setError("");
  };

  const validateForm = () => {
    const newErrors = {};
    if (!name) newErrors.name = "Name is required";
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }
    if (!mobile) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^\d{10}$/.test(mobile)) {
      newErrors.mobile = "Mobile number is invalid";
    }
    if (!address) newErrors.address = "Address is required";
    if (!state) newErrors.state = "State is required";
    if (!pin) {
      newErrors.pin = "Pincode is required";
    } else if (!/^\d{6}$/.test(pin)) {
      newErrors.pin = "Pincode is invalid";
    }
    return newErrors;
  };

  const handleInputChange = (e, field) => {
    const { value } = e.target;
    let updateField;
    switch (field) {
      case "name":
        updateField = setName;
        break;
      case "email":
        updateField = setEmail;
        break;
      case "mobile":
        updateField = setMobile;
        break;
      case "address":
        updateField = setAddress;
        break;
      case "state":
        updateField = setState;
        break;
      case "pin":
        updateField = setPin;
        break;
      default:
        return;
    }
    updateField(value);
    setErrors((prevErrors) => ({ ...prevErrors, [field]: "" }));
  };

  // Send OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formErrors = validateForm();

    try {
      console.log("sendotp", phoneNumber);
      const response = await axios.post(
        "https://api.zerocarbs.in/api/web/order/send-otp",
        {
          phone: phoneNumber.replace(/^(\+91)/, ""),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);

      if (response.status === 200) {
        setLoading(false);
        setGeneratedOtp(response.data.otp);
        setShowOTPInputField(true);
        toast.success("OTP sent successfully!", {
          position: "top-right",
        });
      } else {
        setLoading(false);
        toast.error(`Failed to send OTP:, ${response.data.message}`, {
          position: "top-right",
        });
        console.error("Failed to send OTP:", response.data.message);
      }
    } catch (error) {
      setLoading(false);
      toast.error("Failed to send OTP!", {
        position: "top-right",
      });
      console.error("Error sending OTP:", error);
    }
  };

  const handleOtpKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  const handleOtpChange = (index, value) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtpInputs = [...otpInputs];
      newOtpInputs[index] = value;
      setOtpInputs(newOtpInputs);

      // focus to the next input
      if (value.length === 1 && index < otpInputs.length - 1) {
        otpInputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (event, index) => {
    // focus to the previous input
    if (event.key === "Backspace" && index > 0 && otpInputs[index] === "") {
      otpInputRefs.current[index - 1].focus();
    }
  };

  // Verify OTP
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    //setShowOTPInputField(true)

    if (otpInputs.some((input) => input === "")) {
      setOtpError("Please enter OTP completely.");
      return;
    }

    const enteredOtp = otpInputs.join("");
    setButtonText("Verifying....");

    try {
      // Verify OTP
      const response = await axios.post(
        "https://api.zerocarbs.in/api/web/order/verify-otp",
        {
          phone: mobile,
          otp: enteredOtp,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("OTP Verification Response:", response);
      console.log(response.data.message);

      if (response.status === 200 && response.data.success) {
        setTimeout(() => {
          setButtonText("OTP Verified");
          setOtpInputs(["", "", "", "", "", ""]);
          setOtpVerified(true);
          console.log(response.data);
          setOrderId(response.data.data.id);
          setTaxId(response.data.data.tax_id);

          setTimeout(() => {
            setVerifyOtpModal(false);
          }, 1000);
        }, 2500);
      } else {
        setOtpError(response.data.message || "Invalid OTP. Please try again.");
        setButtonText("Verify OTP");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setOtpError("Invalid OTP. Please try again.");
      setButtonText("Verify OTP");
    }
  };

  // Place Order
  const handlePlaceOrder = async () => {
    console.log(orderId);
    try {
      const response = await axios.post(
        "https://api.zerocarbs.in/api/web/order/place-order",
        {
          order_id: orderId,
          items: formattedCart,
          packaging_charge: packagingCharges,
          tax_id: taxId,
          payment_mode: paymentMethod,
          promo_coupon_id: appliedCoupon?.id ?? null, // Use optional chaining
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);

      if (response.status === 201 && response.data.success) {
        localStorage.clear();

        navigate("/order-placed", {
          replace: true,
          state: { id: orderId }, // Passing id in the state
        });
        console.log(
          "Order placed successfully:",
          response?.data?.data.order_id
        );
      } else {
        console.error("Failed to place order:", response.data.message);
      }
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  const saveCartToLocalStorage = (updatedCart) => {
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleIncrement = (dish) => {
    const dishId = dish.id;
    if (dish?.addons.length === 0) {
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
        // Save the updated cart to localStorage
        saveCartToLocalStorage(updatedCart);
        return updatedCart;
      });
    } else {
      navigate("/menu"); // If there are addons, navigate to the menu
    }
  };

  const handleDecrement = (dishId) => {
    setCart((prevCart) => {
      let updatedCart;
      if (prevCart[dishId].quantity > 1) {
        updatedCart = {
          ...prevCart,
          [dishId]: {
            ...prevCart[dishId],
            quantity: prevCart[dishId].quantity - 1,
            totalPrice: Number(
              (prevCart[dishId].quantity - 1) * prevCart[dishId].price
            ),
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

  const getTotalBill = () => {
    const itemTotal = Object.values(cart).reduce(
      (total, item) => total + item.totalPrice,
      0
    );
    // console.log(distance)
    console.log(itemTotal);
    const packagingCharges = distance < 3 ? 0 : 24.54;
    const gst = itemTotal * 0.05;
    const total = itemTotal + packagingCharges + gst;
    return {
      itemTotal,
      packagingCharges,
      gst,
      total,
    };
  };

  const formattedCart = Object.values(cart).map((item) => ({
    id: item.id,
    quantity: item.quantity,
  }));

  let { itemTotal, packagingCharges, gst, total } = getTotalBill();
  if (appliedCoupon && appliedCoupon.discount) {
    const discountAmount = (appliedCoupon.discount / 100) * total;
    total -= discountAmount;
  }

  useEffect(() => {
    const getActiveCoupons = async () => {
      try {
        const fetchedCoupons = await fetchActiveCoupons();
        console.log("fetchedCoupons", fetchedCoupons);

        if (Array.isArray(fetchedCoupons.data)) {
          setCoupons(fetchedCoupons.data);

          // setMenuData(fetchedCoupons.data);
          // setSelected(fetchedCoupons.data.map(dataItem => dataItem.id));
        } else {
          console.error("Fetched menu is not an array:", fetchedMenu);
        }
      } catch (error) {
        console.error("Error fetching menu:", error);
      }
    };
    getActiveCoupons();
  }, []);

  useEffect(() => {
    const getPromoCodes = async () => {
      try {
        const fetchedPromoCodes = await fetchPromoCodes();
        console.log("fetchedPrmocodes", fetchedPromoCodes);

        if (Array.isArray(fetchedPromoCodes.data)) {
          setPromoCodes(fetchedPromoCodes.data);
        }
      } catch (error) {
        console.error("Error fetching Promocode:", error);
      }
    };
    getPromoCodes();
  }, []);

  const handleApplyPromoCode = () => {
    console.log(promoCodes);
    console.log(enteredCode);
    if (promoCodes.some((promo) => promo.title === enteredCode)) {
      console.log("enters");

      const appliedPromo = promoCodes.find(
        (promo) => promo.title === enteredCode
      );
      setAppliedPomoCode(true);
      setAppliedCoupon(appliedPromo);
      setError("");
    } else if (enteredCode == "") {
      setError("Enter the promo code.");
    } else {
      setError("Invalid promo code. Please try again.");
    }
  };

  const handlePromoCodeChange = (event) => {
    setEnteredCode(event.target.value.toUpperCase());
  };

  const getSelectedPaymentText = () => {
    switch (paymentMethod) {
      case "1":
        return "Pay at Counter";
      case "2":
        return "Credit Card/Debit Card/Netbanking (Razorpay)";
      default:
        return null;
    }
  };
  const discountAmount = appliedCoupon
    ? (appliedCoupon.discount / 100) * total
    : 0;

  // Function to calculate distance between two points using Haversine formula
  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    console.log(lat1, lng2, lat2, lng2);
    const R = 6371; // Radius of the Earth in km

    const dLat = toRad(lat2 - lat1);
    const dLng = toRad(lng2 - lng1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distance in km
  };

  const handleSaveAddress = (data) => {
    // Handle the address data after form submission
    console.log("Saved Address Data:", data);

    // You can perform additional actions here, such as sending the data to an API
  };

  const initialFormData = {
    buildingHouseNo: "123",
    society: "Green Meadows",
    landmark: "Near City Park",
    contactDetails: "John Doe",
    phoneNo: "1234567890",
    addressType: "Home",
  };

  const handleOtpSubmits = (otp) => {
    console.log("OTP submitted:", otp);
    // Your logic to verify OTP
  };

  const handleResendOtp = () => {
    console.log("OTP resent");
    // Your logic to resend OTP
  };

  const handleOnComplete = async (otp) => {
    console.log("otp value", otp);

    try {
      // Verify OTP
      const response = await axios.post(
        "https://api.zerocarbs.in/api/web/order/verify-otp",
        {
          phone: phoneNumber.replace(/^(\+91)/, ""),
          otp: otp,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("OTP Verification Response:", response);
      console.log(response.data.message);

      if (response.status === 200 && response.data.success) {
        console.log("enters here only");
        setTimeout(() => {
          setOtpInputs(["", "", "", "", "", ""]);
          setOtpVerified(true);
          console.log(response.data);

          setOrderId(response.data.data.id);
          setTaxId(response.data.data.tax_id);
          setIsOtpVerified(true);
          // setTimeout(() => {
          //     setVerifyOtpModal(false);
          // }, 1000);
        }, 2500);
      } else {
        console.log("enters in else");
        toast.error(response.data.message, {
          position: "top-right",
        });
        // setOtpError(response.data.message || 'Invalid OTP. Please try again.');
        // setButtonText('Verify OTP');
      }
    } catch (error) {
      toast.error(error?.response?.data?.message, {
        position: "top-right",
      });
    }
  };

  const handleResize = () => {
    setIsSmallScreen(window.innerWidth < 480);
    if (window.innerWidth > 480) {
      sheetRef.current?.hide(); // Close the modal
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSaveAddressDetails = (data) => {
    //setAddressDetails(data);
    setAddressFormDetails(data);
    setShowAddressDetailForm(false);
    console.log("Saved Address Details:", data);
  };

  const hideAddressForm = () => {
    console.log("listenetnetn");
    setShowAddressDetailForm(false);
  };

  const handleInitiatePayment = async () => {
    try {
      // Verify OTP
      const response = await axios.post(
        "https://api.zerocarbs.in/api/web/order/payment/initiate-payment",
        {
          order_id: orderId,
          amount: 10,
          redirectUrl: "{{base_url}}/web/order/payment-callback/1",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Payment Response:", response);

      if (response.status === 200 && response.data.success) {
      } else {
      }
    } catch (error) {
      toast.error(error?.response?.data?.message, {
        position: "top-right",
      });
    }
  };

  return (
    <section className="cartContainer" ref={customerInfoRef}>
      <ToastContainer />
      {/* 
<button onClick={()=> setLocationModalOpen(true)}>Show Map</button> */}

      {isSmallScreen && isOtpVerified && (
        <MapAddress
          onSave={handleSaveAddressDetails}
          initialData={addressFormDetails}
          showAddressDetailForm={showAddressDetailForm}
          hideForm={hideAddressForm}
          showForm={showForm}
          isSmallScreen={isSmallScreen}
        />
      )}
      {/* <Sheet
        isOpen={isSmallScreen}
        onClose={() => setOpen(false)}
        detent="content-height"
      >
        <Sheet.Container>
          <Sheet.Header />
          <Sheet.Content>
            <>
              {isSmallScreen && !showOTPInputField && (
                <div
                  className="d-flex flex-column gap-2"
                  style={{
                    border: "1px solid lightgrey",
                    padding: "20px 15px",
                  }}
                >
                  <div className="d-flex flex-column">
                    <div className="d-flex gap-2 ">
                      <IoChevronBackCircleSharp color="#9cd322" size={40} />

                      <div className="d-flex flex-column">
                        <h5 className="mb-0 fw-bold">Welcome</h5>
                        <div className="d-flex justify-content-center mt-1 mb-2">
                          <p className="mb-3">
                            To place your order now, log into your account
                          </p>
                        </div>
                      </div>
                    </div>
                    <PhoneNumberInput
                      value={phoneNumber}
                      onChange={setPhoneNumber}
                    />
                    <button
                      className="btn w-100 mt-5 mb-2"
                      style={{
                        backgroundColor: "#9cd322",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: loading ? "not-allowed" : "pointer",
                        borderRadius: "0px",
                        padding: "10px 15px",
                      }}
                      onClick={handleSendOtp}
                      disabled={loading} // Disable button while loading
                    >
                      {loading ? (
                        <div className="dots-loader p-2">
                          <span></span>
                          <span></span>
                          <span></span>
                        </div> // Bootstrap loader
                      ) : (
                        "Continue"
                      )}
                    </button>

                    <div className="d-flex justify-content-center text-center mt-2">
                      <span>
                        By continuing you agree to our Terms of Use & Privacy
                        Policy
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {showOTPInputField && (
                <div style={{ padding: "20px 15px" }}>
                  <div className="d-flex gap-2 mt-1 mb-3">
                    <IoChevronBackCircleSharp color="#9cd322" size={40} />

                    <div className="d-flex flex-column">
                      <h5 className="mb-0 fw-bold">OTP Verification</h5>
                      <p className="mb-0 text-center mt-2">
                        Enter OTP (Sent {phoneNumber})
                      </p>
                    </div>
                  </div>

                  <ReusableOTPInput
                    numInputs={6} // Number of OTP digits
                    resendTimeout={30} // Resend timeout in seconds
                    onSubmit={handleOtpSubmit}
                    onComplete={handleOnComplete}
                    phonenNumber={phoneNumber}
                    onResend={handleResendOtp}
                    isSmallScreen={true}
                  />
                </div>
              )}
            </>

            {showAddressDetailForm && isSmallScreen && (
              <BillingDetailsForm
                initialData={initialFormData}
                onSave={handleSaveAddress}
              />
            )}
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop />
      </Sheet> */}
      <div className="container">
        <div className="row">
          {!isSmallScreen && (
            <div className="col-md-6 d-flex flex-column gap-2">
              {isOtpVerified && (
                <div
                  className="d-flex gap-2 align-items-center"
                  style={{
                    border: "1px solid lightgrey",
                    padding: "20px 15px",
                  }}
                >
                  <IoChevronBackCircleSharp color="#9cd322" size={40} />

                  <p className="mb-0">Logged in as ({phoneNumber})</p>
                </div>
              )}

              {!showOTPInputField && (
                <div
                  className="d-flex flex-column gap-2"
                  style={{
                    border: "1px solid lightgrey",
                    padding: "20px 15px",
                  }}
                >
                  <div className="d-flex flex-column">
                    <div className="d-flex gap-2 ">
                      <IoChevronBackCircleSharp color="#9cd322" size={40} />

                      <div className="d-flex flex-column">
                        <h5 className="mb-0">Welcome</h5>
                        <p className="mb-3">
                          To place your order now, log into your account
                        </p>
                        <div className="d-flex gap-2">
                          <PhoneNumberInput
                            value={phoneNumber}
                            onChange={setPhoneNumber}
                          />
                        </div>

                        <button
                          className="btn w-50 mt-3"
                          style={{
                            backgroundColor: "#9cd322",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: loading ? "not-allowed" : "pointer",
                          }}
                          onClick={handleSendOtp}
                          disabled={loading} // Disable button while loading
                        >
                          {loading ? (
                            <div className="dots-loader p-2">
                              <span></span>
                              <span></span>
                              <span></span>
                            </div> // Bootstrap loader
                          ) : (
                            "Continue"
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {showOTPInputField && !isOtpVerified && (
                <div
                  className="d-flex flex-column gap-2"
                  style={{
                    border: "1px solid lightgrey",
                    padding: "20px 15px",
                  }}
                >
                  <div className="d-flex gap-2 mt-1 mb-3">
                    <IoChevronBackCircleSharp color="#9cd322" size={40} />

                    <div className="d-flex flex-column">
                      <h5 className="mb-0 fw-bold">OTP Verification</h5>
                      <p className="mb-0  mt-2">
                        Enter OTP (Sent {phoneNumber})
                      </p>
                      <ReusableOTPInput
                        numInputs={6} // Number of OTP digits
                        resendTimeout={30} // Resend timeout in seconds
                        onSubmit={handleOtpSubmit}
                        onComplete={handleOnComplete}
                        phonenNumber={phoneNumber}
                        onResend={handleResendOtp}
                      />
                    </div>
                  </div>
                </div>
              )}
              {!showPickDeliveryAddress && (
                <div
                  className="d-flex gap-1 align-items-center"
                  style={{
                    border: "1px solid lightgrey",
                    padding: "15px 15px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setShowPickDeliveryAddress(true);
                  }}
                >
                  <MdLocationOn color="#9cd322" size={40} />
                  <p className="mb-0">Choose Delivery Address</p>
                </div>
              )}

              {showPickDeliveryAddress && (
                <div
                  className="d-flex flex-column gap-1"
                  style={{
                    border: "1px solid lightgrey",
                    padding: "15px 15px",
                    cursor: "pointer",
                  }}
                >
                  <div className="d-flex align-items-center gap-2">
                    <MdLocationOn color="#9cd322" size={40} />
                    <p className="mb-0">Choose Delivery Address</p>
                  </div>
                  <div
                    className="d-flex justify-content-center align-items-center"
                    style={{ border: "1px dashed #007bff", padding: "55px" }}
                    onClick={() => {
                      setLocationModalOpen(true);
                    }}
                  >
                    <div className="d-flex align-items-center gap-2">
                      <IoIosAddCircle color="#9cd322" size={40} />{" "}
                      <p className="mb-0">Add New Address</p>
                    </div>
                  </div>
                </div>
              )}
              {!showPaymentMethod && (
                <div
                  className="d-flex gap-1 align-items-center mb-2"
                  style={{
                    border: "1px solid lightgrey",
                    padding: "15px 15px",
                  }}
                  onClick={() => {
                    setShowPaymentMethod(true);
                  }}
                >
                  <GiWallet color="#9cd322" size={40} />{" "}
                  <p className="mb-0">Choose Payment Method</p>
                </div>
              )}

              {showPaymentMethod && (
                <PaymentMethod
                  paymentMethod={paymentMethod}
                  handlePaymentChange={handlePaymentChange}
                />
              )}
            </div>
          )}
          <div className="col-md-6">
            {/* ORDERED ITEMS CONATINER */}
            <div>
              <h1 className="tw-font-semibold tw-text-2xl max-sm:tw-block sm:tw-hidden tw-pb-3">
                Order Summery
              </h1>
              <OrderSummary
                cart={cart}
                imageUrl={imageUrl}
                appliedCoupon={appliedCoupon}
                handleIncrement={handleIncrement}
                handleDecrement={handleDecrement}
                handleRemoveCoupon={handleRemoveCoupon}
                setModalVisible={setModalVisible}
              />
            </div>
            <PromoCodeComponent />
            <PaymentSummary
              itemTotal={itemTotal}
              gst={gst}
              packagingCharges={packagingCharges}
              discountAmount={discountAmount}
              total={total}
              appliedCoupon={appliedCoupon}
            />
          </div>
        </div>

        {/* <div className="row">
                <div className="col-md-12">
            <h2>Customer Information</h2>
            <div className="customer-info">
                <div className="customer-details">
                    <label>Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={name}
                        disabled={otpVerified}
                        onChange={(e) => handleInputChange(e, 'name')}
                    />
                    {errors.name && <p className="error">{errors.name}</p>}
                </div>
                <div className="customer-details">
                    <label>Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        disabled={otpVerified}
                        onChange={(e) => handleInputChange(e, 'email')}
                    />
                    {errors.email && <p className="error">{errors.email}</p>}
                </div>
                <div className="customer-details">
                    <label>Mobile Number</label>
                    <input
                        type="text"
                        id="mobile"
                        name="mobile"
                        value={mobile}
                        disabled={otpVerified}
                        onChange={(e) => handleInputChange(e, 'mobile')}
                    />
                    {errors.mobile && <p className="error">{errors.mobile}</p>}
                </div>
                <div className="customer-details">
                    <label>Address</label>
                    <PlacesAutocomplete
                        value={addressInput}
                        onChange={(value) => setAddressInput(value)}
                        onSelect={handleSelect}
                        componentRestrictions={{ country: 'IN' }} 
                        bounds={ {
                            north: 26.2152,
                            south: 26.0869,
                            east: 91.6331,
                            west: 91.5702,
                          }}
                    >
                        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                            <div style={{width: "100%"}}>
                                <input
                                    {...getInputProps({
                                        placeholder: 'Enter your address',
                                        disabled: otpVerified,
                                    })}
                                    id="address"
                                    name="address"
                                />
                                <div className="autocomplete-dropdown-container">
                                    {loading && <div>Loading...</div>}
                                    {suggestions.map(suggestion => (
                                        <div key={suggestion.id}
                                            {...getSuggestionItemProps(suggestion, {
                                                style: {
                                                    width:'100%',
                                                    backgroundColor: suggestion.active ? '#a0a0a0' : '#fff',
                                                    cursor: 'pointer'
                                                },
                                            })}
                                        >
                                            {suggestion.description}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </PlacesAutocomplete>
                    {errors.address && <p className="error">{errors.address}</p>}
                </div>
                <div className="customer-details">
                    <label>State</label>
                    <input
                        name="state"
                        id="state"
                        value={state}
                        disabled={otpVerified}
                        onChange={(e) => handleInputChange(e, 'state')}
                    />
                    {errors.state && <p className="error">{errors.state}</p>}
                </div>
                <div className="customer-details">
                    <label>Pincode</label>
                    <input
                        name="pin"
                        id="pin"
                        value={pin}
                        disabled={otpVerified}
                        onChange={(e) => handleInputChange(e, 'pin')}
                    />
                    {errors.pin && <p className="error">{errors.pin}</p>}
                </div>
            </div>
        </div>
    
                    
                </div> */}
      </div>

      {/* Apply Coupon */}
      <Modal
        isVisible={isModalVisible}
        onClose={handleCloseModal}
        className="couponsModal"
      >
        <h4 className="form-label">Apply Coupons</h4>
        <ul className="coupons-container">
          {coupons.map((coupon) => (
            <li key={coupon.id} className="coupons-body">
              <div className="leftBox">
                <div className="content">
                  <h3>{coupon.discount}% OFF</h3>
                </div>
              </div>
              <div className="rightbox">
                <div className="content">
                  <h1>{coupon.title}</h1>
                  <button
                    className="apply-btn"
                    onClick={() => handleApplyCoupon(coupon)}
                  >
                    Apply
                  </button>
                </div>
                <p>{coupon.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </Modal>

      {/* Verify OTP */}
      {/* <Modal isVisible={verifyOtpModal} onClose={handleCloseOtpModal}>
                <form className="otpModal" onSubmit={handleOtpSubmit} onKeyDown={handleOtpKeyDown}>
                    <h4 className='form-label'>Enter OTP</h4>
                    <div className="inputContainer">
                        {otpInputs.map((digit, index) => (
                            <input
                                key={index}
                                ref={(el) => otpInputRefs.current[index] = el}
                                type="text"
                                maxLength="1"
                                value={digit}
                                onChange={(e) => handleOtpChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                            />
                        ))}
                    </div>
                    <div id="otpError">{otpError}</div>
                    <div className="sendOtp">
                        <button type="submit" className='btn'>{buttonText}</button>
                    </div>
                </form>
            </Modal> */}

      <Modal isVisible={isBillingModalVisible} onClose={handleCloseOtpModal}>
        <BillingDetailsForm
          initialData={addressFormDetails}
          onSave={handleSaveAddress}
        />
      </Modal>

      <Modal
        isVisible={isLocationModalOpen}
        onClose={() => {
          setLocationModalOpen(false);
          setShowAddressDetailForm(false);
        }}
        className="p-0"
      >
        {/* <MapAddress
          onSave={handleSaveAddressDetails}
          initialData={addressFormDetails}
          showAddressDetailForm={showAddressDetailForm}
          hideForm={hideAddressForm}
          showForm={showForm}
        /> */}
      </Modal>
    </section>
  );
};

export default Payment;
