/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from 'react';
import '../payment/style.scss';
import Modal from '../../components/modal/Modal';
import Button from '@mui/material/Button';
import { coupons } from '../../utils/Coupons';
import { Link } from 'react-router-dom';
import useTitle from '../../utils/useTitle';
import fetchAddress from '../../api/fetchAddress';

const Payment = () => {
    const otpInputRefs = useRef([]);
    const customerInfoRef = useRef(null);

    const [isModalVisible, setModalVisible] = useState(false);
    const [verifyOtpModal, setVerifyOtpModal] = useState(false);
    const [appliedCoupon, setAppliedCoupon] = useState(null);
    
    const [otpInputs, setOtpInputs] = useState(['', '', '', '', '']);
    const [otpError, setOtpError] = useState('');
    const [generatedOtp, setGeneratedOtp] = useState('');

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [address, setAddress] = useState('');
    const [pin, setPin] = useState('');
    const [errors, setErrors] = useState({});
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [district, setDistrict] = useState('');

    useTitle("Payment");

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const { latitude, longitude } = position.coords;
                console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
                try {
                    const addressData = await fetchAddress(latitude, longitude);
                    if (addressData) {
                        setAddress(addressData.residential || '');
                        setStreet(addressData.suburb || '');
                        setCity(addressData.county || '');
                        setDistrict(addressData.state_district || '');
                        setState(addressData.state || '');
                        setPin(addressData.postcode || '');
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
        setAppliedCoupon(coupon);
        setModalVisible(false);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    const handleCloseOtpModal = () => {
        setVerifyOtpModal(false);
    };

    const handleRemoveCoupon = () => {
        setAppliedCoupon(null);
    };

    const validateForm = () => {
        const newErrors = {};
        if (!name) newErrors.name = 'Name is required';
        if (!email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Email is invalid';
        }
        if (!mobile) {
            newErrors.mobile = 'Mobile number is required';
        } else if (!/^\d{10}$/.test(mobile)) {
            newErrors.mobile = 'Mobile number is invalid';
        }
        if (!address) newErrors.address = 'Address is required';
        if (!street) newErrors.street = 'Street is required';
        if (!city) newErrors.city = 'City is required';
        if (!district) newErrors.district = 'District is required';
        if (!state) newErrors.state = 'State is required';
        if (!pin) {
            newErrors.pin = 'Pincode is required';
        } else if (!/^\d{6}$/.test(pin)) {
            newErrors.pin = 'Pincode is invalid';
        }
        return newErrors;
    };

    const handleInputChange = (e, field) => {
        const { value } = e.target;
        let updateField;
        switch (field) {
            case 'name':
                updateField = setName;
                break;
            case 'email':
                updateField = setEmail;
                break;
            case 'mobile':
                updateField = setMobile;
                break;
            case 'address':
                updateField = setAddress;
                break;
            case 'suburb':
                updateField = setStreet;
                break;
            case 'city':
                updateField = setCity;
                break;
            case 'district':
                updateField = setDistrict;
                break;
            case 'state':
                updateField = setState;
                break;
            case 'pin':
                updateField = setPin;
                break;
            default:
                return;
        }
        updateField(value);
        setErrors(prevErrors => ({ ...prevErrors, [field]: '' }));
    };

    const handleSendOtp = (e) => {
        e.preventDefault();
        const formErrors = validateForm();
        if (Object.keys(formErrors).length === 0) {
            setVerifyOtpModal(true);
        } else {
            setErrors(formErrors);
            customerInfoRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleOtpKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
        }
    };

    const generatedNewOtp = () => {
        const newOtp = Math.floor(10000 + Math.random() * 90000).toString();
        setGeneratedOtp(newOtp);
        setOtpInputs(['', '', '', '', '']);
        setOtpError('');
        alert(`New OTP generated: ${newOtp}`);
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
        if (event.key === 'Backspace' && index > 0 && otpInputs[index] === '') {
            otpInputRefs.current[index - 1].focus();
        }
    };

    const handleOtpSubmit = (e) => {
        e.preventDefault();

        if (otpInputs.some(input => input === '')) {
            setOtpError('Please enter OTP completely.');
            return;
        }

        const enteredOtp = otpInputs.join('');
        if (enteredOtp === generatedOtp) {
            alert('OTP Verified');
        } else {
            setOtpError('Invalid OTP. Please try again.');
        }
    };

fetchActiveCoupons = ()=>{

}

   
    return (
        <section className="cartContainer" ref={customerInfoRef}>
            <div className="container">
                <div className="row">
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
                                    onChange={(e) => handleInputChange(e, 'mobile')}
                                />
                                {errors.mobile && <p className="error">{errors.mobile}</p>}
                            </div>
                            <div className="customer-details">
                                <label>Address</label>
                                <textarea
                                    name="address"
                                    id="address"
                                    value={address}
                                    onChange={(e) => handleInputChange(e, 'address')}
                                />
                                {errors.address && <p className="error">{errors.address}</p>}
                            </div>
                            {/* <div className="customer-details">
                                <label>Street</label>
                                <input
                                    name="street"
                                    id="street"
                                    value={street}
                                    onChange={(e) => handleInputChange(e, 'street')}
                                />
                                {errors.street && <p className="error">{errors.street}</p>}
                            </div>
                            <div className="customer-details">
                                <label>City</label>
                                <input
                                    name="city"
                                    id="city"
                                    value={city}
                                    onChange={(e) => handleInputChange(e, 'city')}
                                />
                                {errors.city && <p className="error">{errors.city}</p>}
                            </div>
                            <div className="customer-details">
                                <label>District</label>
                                <input
                                    name="district"
                                    id="district"
                                    value={district}
                                    onChange={(e) => handleInputChange(e, 'district')}
                                />
                                {errors.district && <p className="error">{errors.district}</p>}
                            </div> */}
                            <div className="customer-details">
                                <label>State</label>
                                <input
                                    name="state"
                                    id="state"
                                    value={state}
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
                                    onChange={(e) => handleInputChange(e, 'pin')}
                                />
                                {errors.pin && <p className="error">{errors.pin}</p>}
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-7 col-md-6">
                        <div className="order-summary">
                            <h2>Order Summary</h2>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Item</th>
                                        <th>Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <div className="itemDetails">
                                                <img src="/img/non-veg.svg" alt="" />
                                                <h5>Exotic Fruits Oatmeal Bowl</h5>
                                            </div>
                                            <div className="quantity">
                                                <button className="btn">-</button>
                                                <span>1</span>
                                                <button className="btn">+</button>
                                            </div>
                                        </td>
                                        <td>Rs 409.00</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="addMore">
                                <Link to="/menu">Add More Items</Link>
                            </div>
                            <div className="form-group">
                                <label>Additional Information</label>
                                <textarea id="additional-info" name="additional-info" rows="4"></textarea>
                            </div>
                            <div className="coupons">
                                {appliedCoupon ? (
                                    <div className="applied-coupon">
                                        <h4>{appliedCoupon.title} <span>(Applied Coupon)</span></h4>
                                        <button onClick={handleRemoveCoupon}>Remove</button>
                                    </div>
                                ) : (
                                    <button type='button' className='apply-coupon' onClick={() => setModalVisible(true)}>Apply Coupon</button>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-5 col-md-6">
                        <div className="payment-summary">
                            <table>
                                <tbody>
                                    <tr>
                                        <td><h5>Sub Total </h5></td>
                                        <td><h5>Rs 409.00</h5></td>
                                    </tr>
                                    <tr>
                                        <td><h5>Packaging Charges</h5></td>
                                        <td><h5>Rs 24.54</h5></td>
                                    </tr>
                                    <tr>
                                        <td><h5>SGST (2.5%)</h5></td>
                                        <td><h5>Rs 10.84</h5></td>
                                    </tr>
                                    <tr>
                                        <td><h5>CGST (2.5%)</h5></td>
                                        <td><h5>Rs 10.84</h5></td>
                                    </tr>
                                    <tr>
                                        <td><h4>Total</h4></td>
                                        <td><h4>Rs 455.00</h4></td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="form-group">
                                <label>Enter Promo Code (if available)</label>
                                <div className="redeem-section">
                                    <input type="text" id="promo" name="promo" />
                                    <Button>Redeem</Button>
                                </div>
                            </div>
                            <div className="payment-options">
                                <label>
                                    <input type="radio" name="payment" value="counter" /> Pay at Counter
                                </label>
                                <label>
                                    <input type="radio" name="payment" value="razorpay" /> Credit Card/Debit Card/Netbanking
                                    (Razorpay)
                                </label>
                            </div>
                            <div className="checkout-button">
                                <Button onClick={handleSendOtp}>Send OTP</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Apply Coupon */}
            <Modal isVisible={isModalVisible} onClose={handleCloseModal} className="couponsModal">
                <h4 className='form-label'>Apply Coupons</h4>
                <ul className='coupons-container'>
                    {coupons.map((coupon) => (
                        <li key={coupon.id} className='coupons-body'>
                            <div className="leftBox">
                                <div className="content">
                                    <h3>{coupon.discount}% OFF</h3>
                                </div>
                            </div>
                            <div className="rightbox">
                                <div className="content">
                                    <h1>{coupon.title}</h1>
                                    <button className='apply-btn' onClick={() => handleApplyCoupon(coupon)}>Apply</button>
                                </div>
                                <p>{coupon.desc}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </Modal>

            {/* Verify OTP */}
            <Modal isVisible={verifyOtpModal} onClose={handleCloseOtpModal}>
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
                    <div className="newOtp">
                        <button onClick={generatedNewOtp}>Click here to resend OTP</button>
                    </div>
                    <div className="sendOtp">
                        <button type="submit" className='btn'>Verify OTP</button>
                    </div>
                </form>
            </Modal>
        </section>
    );
};

export default Payment;
