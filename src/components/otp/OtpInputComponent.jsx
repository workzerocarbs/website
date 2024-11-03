import React, { useState, useEffect } from 'react';
import OtpInput from 'react-otp-input';

function ReusableOTPInput({
  numInputs = 4,
  onComplete,
  onResend,
  resendTimeout = 30,
  phonenNumber,
  placeholder = '_',
}) {
  const [otp, setOtp] = useState('');
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [timer, setTimer] = useState(resendTimeout);

  // Handle OTP submission when complete
  useEffect(() => {
    if (otp.length === numInputs && onComplete) {
      onComplete(otp);
    }
  }, [otp, numInputs, onComplete]);

  // Handle timer for resend button
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    } else {
      setIsResendDisabled(false);
    }
  }, [timer]);

  // Resend OTP
  const handleResend = () => {
    setIsResendDisabled(true);
    setTimer(resendTimeout);
    if (onResend) onResend();
  };

  return (
    <div className='d-flex flex-column align-items-center gap-2'>
        <h4>Verify Account</h4>
          <p className='mb-0 text-center'>An OTP has been sent to your entered mobile number {phonenNumber}</p>
 <div className='d-flex justify-content-center '>
    

      <OtpInput
        value={otp}
        onChange={setOtp}
        numInputs={numInputs}
        shouldAutoFocus
        renderInput={(inputProps, index) => (
          <input
            {...inputProps}
            style={{
              width: '40px',
              height: '40px',
              fontSize: '18px',
              borderRadius: '4px',
              border: '1px solid lightgray',
              textAlign: 'center',
              margin: '0 5px',
              outline: 'none',
            }}
            onFocus={(e) => (e.target.style.borderColor = '#9cd322')}
            onBlur={(e) => (e.target.style.borderColor = 'lightgray')}
          />
        )}
      
      />

    
    </div>
      {/* Resend Button */}
      <div className='d-flex flex-column align-items-center gap-2' style={{ marginTop: '15px' }}>
      <p className='mb-0 text-center'>Didn't receive the code? <span style={{fontWeight: "500"}}>Resend {isResendDisabled && `in ${timer}s`}</span></p>
        <button
          onClick={handleResend}
          disabled={isResendDisabled}
          style={{
            padding: '10px 15px',
            fontSize: '0.9rem',
            color: isResendDisabled ? 'gray' : 'black',
            backgroundColor: '#9cd322',
            border: 'none',
            cursor: isResendDisabled ? 'not-allowed' : 'pointer',
            borderRadius: '4px'
          }}
        >
          Resend OTP 
        </button>
      </div>
    </div>
   
  );
}

export default ReusableOTPInput;
