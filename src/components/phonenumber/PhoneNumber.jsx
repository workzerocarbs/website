import React from 'react';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';

const PhoneNumberInput = ({ value, onChange }) => {
  return (
    <PhoneInput
      defaultCountry="IN"
      placeholder="Enter phone number"
      value={value}
      onChange={onChange}
      international
    />
  );
};

export default PhoneNumberInput;
