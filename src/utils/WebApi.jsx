import apiClient, { endpoints } from "../api/axiosConfig";

// Fetch Menu
export const fetchMenu = async () => {
    try {
        const response = await apiClient.get(endpoints.getMenu);
        return response.data;
    } catch (error) {
        console.log('Err', error);
        throw error;
    }
}

// Send OTP
export const sendOtpRequest = async (data) => {
    try {
        const response = await apiClient.post(endpoints.sendOtp, data);
        return response.data;
    } catch (error) {
        console.error("Error sending OTP:", error);
        throw error;
    }
};

// Verify OTP
export const verifyOtpRequest = async (data) => {
    try {
        const response = await apiClient.post(endpoints.verifyOtp, data);
        return response.data;
    } catch (error) {
        console.error("Error verifying OTP:", error);
        throw error;
    }
};


// Fetch Menu
export const fetchActiveCoupons = async () => {
    try {
        const response = await apiClient.get(endpoints.activeCoupons);
        return response.data;
    } catch (error) {
        console.log('Err', error);
        throw error;
    }
}


// Fetch Promocodes
export const fetchPromoCodes = async () => {
    try {
        const response = await apiClient.get(endpoints.promoCodes);
        return response.data;
    } catch (error) {
        console.log('Err', error);
        throw error;
    }
}



// Fetch Promocodes
export const fetchOrderDetails = async (orderId) => {
    try {
        const response = await apiClient.get(endpoints.orderDetails+orderId);
        return response.data;
    } catch (error) {
        console.log('Err', error);
        throw error;
    }
}

