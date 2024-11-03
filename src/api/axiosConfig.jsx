/* eslint-disable no-undef */
import axios from 'axios';

// Base URL of the API
export const base_url = 'https://api.zerocarbs.in/api';

// Url for Image
export const imageUrl = 'https://api.zerocarbs.in/'

const apiClient = axios.create({
    baseURL: base_url,
    headers: {
        'Content-Type': 'application/json',
    }
})

export const endpoints = {
    // Fetch menu
    getMenu: '/web/menu/get',

    // PLace order
    placeOrder: '/web/order/place-order',

    // Get OTP
    getOtp: '/web/order/send-otp',

    // Verify OTP
    verifyOtp: '/web/order/verify-otp',

    // Active Coupon
    activeCoupons: '/web/coupon/get',

    //Promocode
    promoCodes:'/web/promocode/get',

    //Get Order Details
    orderDetails:'/web/order/get/'

   

}

export default apiClient;