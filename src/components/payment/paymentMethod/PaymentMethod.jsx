import React from 'react';

const PaymentMethod = ({ paymentMethod, handlePaymentChange }) => {
  return (
    <div className="payment-options" style={styles.container}>
      <label style={styles.label}>
        <input 
          type="radio" 
          name="payment" 
          value="1"
          checked={paymentMethod === '1'}
          onChange={() => handlePaymentChange('1')}
          style={styles.radio} // Style for radio input
        /> 
        <span style={styles.labelText}>Pay at Counter</span>
      </label>

      <label style={styles.label}>
        <input 
          type="radio" 
          name="payment" 
          value="2"
          checked={paymentMethod === '2'}
          onChange={() => handlePaymentChange('2')}
          style={styles.radio} // Style for radio input
        /> 
        <span style={styles.labelText}>Credit Card/Debit Card/Netbanking (Razorpay)</span>
      </label>
    </div>  
  );
};


const styles = {
  container: {
    border: "1px solid lightgrey",
    padding: "15px",
    
  },
  label: {
    display: "flex", 
    alignItems: "center", 
    margin: "10px 0", 
    fontSize: "16px",
    cursor: "pointer",
  },
  radio: {
    marginRight: "10px", 
    width: "15px", 
    height: "15px",
    cursor: "pointer",
  },
  labelText: {
    marginLeft: "5px", 
  },
};

export default PaymentMethod;
