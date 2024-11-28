"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { getSession } from '@auth0/nextjs-auth0';
import { useUser } from '@auth0/nextjs-auth0/client';
import Account from './Account';

const openModal = () => {
    const modal = document.getElementById("login_modal") as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    }
};

const Login =  () => {
  const { user, error, isLoading } = useUser();
  let firstName: any = "";
  let lastName: any= "";
  if(user){
    firstName = user.given_name;
    lastName = user.family_name;
  }

  return (

      (user ? 
      
      <Account firstName={firstName} lastName={lastName} /> :
      <div>
        <p><a href="/api/auth/login">Login</a></p>

        <p className="hover:cursor-pointer" onClick={openModal}>Log in</p>
        <dialog id="login_modal" className="modal">
          <div className="modal-box h-80">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
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
              <form action="">
                <div className='h-28 flex flex-col justify-around'>
                  <label className="input input-bordered flex items-center gap-4">
                    <p className='font-medium'>+91</p>
                    <input type="text" className="grow" placeholder="Enter mobile number" />
                  </label>

                  <button className="btn btn-wide">Continue</button>
                </div>
              </form>
              <div>
                <p className='text-sm'>By continuing, you agree to our Terms of service & Privacy policy</p>
              </div>
            </div>
          </div>
        </dialog>
      </div>)
      
      
  )
}

export default Login