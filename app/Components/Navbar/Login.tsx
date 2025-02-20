"use client"
import React, { useState, useEffect } from 'react'
import Image from 'next/image';
import Account from './Account';
import NumberModal from './NumberModal';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hook';
import { getUser, setUser } from '@/lib/redux/features/user/userSlice';

const Login =  () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useAppDispatch()
  const user = useAppSelector(state => state.user.userId)

  const setuserState = (user: any) => {
    dispatch(setUser(user))
  }
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    dispatch(getUser());
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