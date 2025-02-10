"use client"
import React, { useState, useEffect } from 'react'
import Image from 'next/image';
import Account from './Account';
import NumberModal from './NumberModal';

const Login =  () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState(null);

  const setuserState = (user: any) => {
    setUser(user);
    console.log("user", user);
    localStorage.setItem('user', JSON.stringify(user));
  }
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {

    const storedUser = localStorage.getItem('user');
    console.log("Retrive user", storedUser);
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

  }, []);
  return (

      <div>
          {user ? 
        
            <Account  userState={setuserState}/> :
          <div>
            <p className="hover:cursor-pointer text-lg" onClick={openModal}>Login</p>
            <NumberModal user={user} setUser={setuserState} isOpen={isModalOpen} onClose={closeModal} />
          </div>}
      </div>
  )
}

export default Login