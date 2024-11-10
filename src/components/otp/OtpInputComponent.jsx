import React, { useState, useEffect } from 'react';
import OtpInput from 'react-otp-input';

function ReusableOTPInput({
  numInputs = 4,
  onComplete,
  onResend,
  resendTimeout = 30,
  phonenNumber,
  placeholder = '_',
  className, 
  isSmallScreen = false
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
    <div className={`d-flex flex-column gap-2 mt-2 ${isSmallScreen ? '': ''} `}>
        {/* <h4>OTP Verification</h4>
          <p className='mb-0 text-center'>Enter OTP (Sent {phonenNumber})</p> */}
 <div className={`d-flex ${isSmallScreen ? 'justify-content-center': ''}`}>
    

      <OtpInput
        value={otp}
        onChange={setOtp}
        numInputs={numInputs}
        shouldAutoFocus
        renderInput={(inputProps, index) => (
          <input
            {...inputProps}
            style={{
              width: isSmallScreen ? '70px': '40px',
              height: isSmallScreen ? '50px': '40px',
              fontSize: isSmallScreen ?  '25px': '20px',
              borderRadius: '4px',
              border: '1px solid lightgray',
              textAlign: 'center',
              margin: '0 2px',
              outline: 'none',
              marginRight: '5px',
              marginLeft:'5px'
            }}
            onFocus={(e) => (e.target.style.borderColor = '#9cd322')}
            onBlur={(e) => (e.target.style.borderColor = 'lightgray')}
          />
        )}
      
      />

    
    </div>
      {/* Resend Button */}
      <div className='d-flex flex-column  gap-2' style={{ marginTop: '15px' }}>
      <p className='mb-0 text-center'>Didn't receive the code? <span style={{fontWeight: "500"}}>Resend {isResendDisabled && (
    <>
        in <span className="fw-bold">{timer}</span>s
    </>
)}</span></p>
        <button
          onClick={handleResend}
          disabled={isResendDisabled}
          style={{
            width: isSmallScreen ?? '100%',
            padding: '10px 15px',
            fontSize: '0.9rem',
            color: isResendDisabled ? 'gray' : 'black',
            backgroundColor: '#9cd322',
            border: 'none',
            cursor: isResendDisabled ? 'not-allowed' : 'pointer',
            borderRadius: '0px'
          }}
        >
          Enter OTP 
        </button>
      </div>
    </div>
   
  );
}

export default ReusableOTPInput;
