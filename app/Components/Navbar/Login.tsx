"use client"
import React from 'react'
import Image from 'next/image';
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

      <div>
          {user ? 
        
            <Account firstName={firstName} lastName={lastName} /> :
          <div>
            <p className="hover:cursor-pointer text-lg" onClick={openModal}><a href="/api/auth/login">Login</a></p>
          </div>}
      </div>
  )
}

export default Login