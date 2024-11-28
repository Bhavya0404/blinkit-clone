"use client"
import React, { FormEvent, useEffect, useState } from 'react'
import Image from 'next/image';
import { getSession } from '@auth0/nextjs-auth0';
import { useUser } from '@auth0/nextjs-auth0/client';
import Account from './Account';
import { ConfirmationResult, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from '@/firebase';

const openModal = () => {
    const modal = document.getElementById("login_modal") as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    }
};

const Login =  () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(0);
  const [recaptchaVerifier, setRecaptchaVerifier] = useState<RecaptchaVerifier | null>(null);
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const [otpScreen, setOtpscreen] = useState(false);

  const { user, isLoading } = useUser();
  let firstName: any = "";
  let lastName: any= "";

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if(resendCountdown > 0){
      timer = setTimeout(() => setResendCountdown(resendCountdown - 1), 1000);
    }
    return() => clearTimeout(timer);
  }, [resendCountdown]);

  useEffect(() => {
    const recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', { 'size': 'invisible'});

    setRecaptchaVerifier(recaptchaVerifier);

    // return () => {
    //   recaptchaVerifier.clear();
    // }
  }, [auth])

  const requestOTP = async (e?: FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    setResendCountdown(60);

    try {
      if(!recaptchaVerifier){
        throw setError("recaptcha error");
      }
      const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
      setConfirmationResult(confirmationResult);
    } catch (err){
      console.log("login error", err);
      setOtpscreen(false);
      setResendCountdown(0);
    }


    
    
  }
  const signIn = () => {
    
  }
  return (
    <div>
      <div id='recaptcha-container'></div>
      {user ? 
      
      <Account firstName={firstName} lastName={lastName} /> :
      <div>
        {/* <p><a href="/api/auth/login">Login</a></p> */}

        <p className="hover:cursor-pointer" onClick={openModal}>Log in</p>
        <dialog id="login_modal" className="modal">
          <div className="modal-box h-80">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
            {!otpScreen ? 
              <div className='flex flex-col justify-between items-center h-full'>
              <div>
                <Image src="https://cdn.grofers.com/layout-engine/2023-11/app_logo.svg" width={64}
                  height={64} alt="Blinkit" />
              </div>
              <div>
                <p className='font-bold text-2xl'>India's last minute app</p>
                <p className='font-medium text-center'>Log in or Sign up</p>
              </div>
              <form onSubmit={requestOTP}>
                <div className='h-28 flex flex-col justify-around'>
                  <label className="input input-bordered flex items-center gap-4">
                    <p className='font-medium'>+91</p>
                    <input type="text" className="grow"value={phoneNumber} onChange={(e)=> setPhoneNumber(e.target.value)} placeholder="Enter mobile number" />
                  </label>

                  <button className="btn btn-wide"  >Continue</button>
                </div>
              </form>
              <div>
                <p className='text-sm'>By continuing, you agree to our Terms of service & Privacy policy</p>
              </div>
            </div> : 
            // OTP screen
              <div className='flex flex-col justify-between items-center h-full'>
            
                <form>
                  <div className='h-28 flex flex-col justify-around'>
                    <label className="input input-bordered flex items-center gap-4">
                      <input type="number" className="grow" value={otp} onChange={(e)=> setOtp(e.target.value)} placeholder="OTP" />
                    </label>
                    <button disabled={!otp} className="btn btn-wide" >Log In</button>
                    <p>{resendCountdown}</p>
                  </div>
                </form>
              </div>
            }
            
          </div>
        </dialog>
      </div>}
      </div>
      
  )
}

export default Login