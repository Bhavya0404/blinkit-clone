import Image from 'next/image'
import React, { useState } from 'react'

interface NumberModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: any;
  setUser: (user: any) => void;
}


const NumberModal = ({isOpen, onClose, user, setUser}: NumberModalProps) => {
  const [number, setNumber] = useState('');
  const [userOTP, setuserOTP] = useState('');
  const [generatedOTP, setGeneratedOTP] = useState('');
  const [isOtpScreen, setisOtpScreen] = useState(false);

  const validateNumber = async () => {
    const num = parseInt(number);

      const res = await fetch(`/api/auth/send_sms`);
      if(res.ok){
        const authData = await res.json();
        setGeneratedOTP(authData.otp);
        setisOtpScreen(true);
      } else {
        throw new Error("Error recieving OTP");
      }
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    
    // Allow only numbers (0-9) and limit to 10 digits
    if (/^\d{0,10}$/.test(value)) {
      setNumber(value);
    }
  };

  const handleOTPChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    if (/^\d{0,4}$/.test(value)) {
      setuserOTP(value);
    }
  };

  const validateOTP = async () => {
    if(parseInt(userOTP) === parseInt(generatedOTP)){

      try {
        const loginRes = await fetch(`/api/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({number})
        });
        if(loginRes.ok){
          const authRes = await fetch(`/api/auth/auth`);
          if(authRes.ok){
            const authData = await authRes.json();
            if(authData.isAuthenticated){
              setUser(authData.user.user_id);
              resetInput();
            }
          } else {
            console.error("Error in Auth");
          }
        } else {
          console.error("Error in Login");
        }
        
      } catch (error) {
        console.error("Error in verifying user", error);
      }
    } else {
      console.log("OTP is incorrect");
    }
  }

  const stopEventProp = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  }

  const resetInput = () => {
    onClose();
    setNumber('');
    setuserOTP('');
    setisOtpScreen(false);
  }


  return (
    <dialog id="login_modal" className="modal" open={isOpen}>
          {!isOtpScreen ? 
            <div className="modal-box h-80">
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={resetInput}>✕</button>
              </form>
              <div className='flex flex-col justify-between items-center h-full'>
                <div>
                  <Image src="https://cdn.grofers.com/layout-engine/2023-11/app_logo.svg" width={64}
                    height={64} alt="Blinkit" />
                </div>
                <div>
                  <p className='font-bold text-2xl'>India's last minute app</p>
                  <p className='font-medium text-center'>Log in or Sign up</p>
                </div>
                <form action="#" onSubmit={stopEventProp}>
                  <div className='h-28 flex flex-col justify-around'>
                    <label className="input input-bordered flex items-center gap-4">
                      <p className='font-medium'>+91</p>
                      <input type="text" className="grow" inputMode="numeric"  value={number} placeholder="Enter mobile number" onChange={handleInputChange} />
                    </label>
                    <button className="btn btn-wide bg-add-button text-white" disabled={number.length !== 10}  onClick={validateNumber}>Continue</button>
                  </div>
                </form>
                <div>
                  <p className='text-sm'>By continuing, you agree to our Terms of service & Privacy policy</p>
                </div>
              </div>
            </div>  : 

            <div className="modal-box h-80">
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={resetInput}>✕</button>
              </form>
              <div className='flex flex-col justify-between items-center h-full'>
                <div>
                  <p className='font-bold text-2xl text-center'>OTP Verification</p>
                  <p className='font-medium text-center'>We have sent a verification code to</p>
                  <p className='font-medium text-center'>+91-{number}</p>
                </div>
                <form action="#" onSubmit={stopEventProp}>
                  <div className='h-28 flex flex-col justify-around'>
                    <label className="input input-bordered flex items-center gap-4">
                      <input type="text" className="grow" inputMode="numeric"  value={userOTP} placeholder="Enter 4 digit otp" onChange={handleOTPChange} />
                    </label>
                    <button className="btn btn-wide bg-add-button text-white" disabled={userOTP.length !== 4}  onClick={validateOTP}>Submit</button>
                  </div>
                </form>
                <div>
                  <p className='text-sm'>By continuing, you agree to our Terms of service & Privacy policy</p>
                </div>
              </div>
            </div>
        } 
    </dialog>
  )
}

export default NumberModal