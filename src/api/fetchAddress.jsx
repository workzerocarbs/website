import axios from "axios";

const fetchAddress = async (latitude, longitude) => {
    const api_key = "669a6b36b3803268613439mlcdcce65";

    try {
        const response = await axios.get(`https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}&api_key=${api_key}`);
        if (response.data) {
            const { display_name, address } = response.data;
            const { residential, suburb, county, state_district, state, postcode, country } = address;

            return {
                displayName: display_name,            
                residential,
                suburb,
                county,
                state_district,
                state,
                postcode,
                country
            };
        } else {
            throw new Error('Address not found');
        }
    } catch (error) {
        console.error("Error fetching address:", error);
        throw error;
    }
};

export default fetchAddress;

// Payment.jsx:35 Latitude: 12.9007832, Longitude: 77.6175455

// https://geocode.maps.co/reverse?lat=12.9007832&lon=77.6175455&api_key=669a6b36b3803268613439mlcdcce65