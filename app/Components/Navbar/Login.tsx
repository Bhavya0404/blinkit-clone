"use client"
import React, { useState } from 'react'
import Image from 'next/image';
import Account from './Account';
import NumberModal from './NumberModal';

const Login =  () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const user = "";
  let firstName: any = "";
  let lastName: any= "";
  if(user){
    firstName = "user.given_name";
    lastName = "user.family_name";
  }

  return (

      <div>
          {user ? 
        
            <Account firstName={firstName} lastName={lastName} /> :
          <div>
            <p className="hover:cursor-pointer text-lg" onClick={openModal}>Login</p>
            <NumberModal isOpen={isModalOpen} onClose={closeModal} />
          </div>}
      </div>
  )
}

export default Login