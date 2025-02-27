"use client"
import React, { useEffect, useRef, useState } from 'react'
import CartProducts from './CartProducts';
import { useAppSelector } from '@/lib/redux/hook';
import { useAppDispatch } from '@/lib/redux/hook';
import { getUser } from '@/lib/redux/features/user/userSlice';
import { fetchCartDetails } from '@/lib/redux/features/user/cartDetailsSlice';
const Cart = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const dispatch = useAppDispatch()
  const userId = useAppSelector(state => state.user.userId)

  const cartDetails = useAppSelector(state => state.cartDetails.productDetails)
  const totalQuantity = useAppSelector(state => state.cartDetails.totalQuantity)
  const itemTotal = useAppSelector(state => state.cartDetails.itemsPrice)


  useEffect(() => {
    if (userId) {
      dispatch(fetchCartDetails({userId: userId}));
    }
  }, [userId]);

  useEffect(() => {
    dispatch(getUser());  
  }, [])
  return (
    <div>
      <button className='btn bg-cart-green text-white flex items-center space-x-2 font-bold hover:bg-cart-green' onClick={() => setIsDrawerOpen(true)}> 
          <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>

          {totalQuantity ?  
          <div className='flex flex-col'>
            <p>{totalQuantity} items</p> 
            <p className='self-start'>₹{itemTotal}</p>
          </div>
          : <p>My Cart</p>
          }
        </button>

        {isDrawerOpen && (
        <div className="drawer drawer-end">
          <input
            id="cart-drawer"
            type="checkbox"
            className="drawer-toggle"
            checked={isDrawerOpen}
            onChange={() => setIsDrawerOpen(!isDrawerOpen)}
          />


          <div className="drawer-side">
            <label
              htmlFor="cart-drawer"
              aria-label="close sidebar"
              className="drawer-overlay"
              onClick={() => setIsDrawerOpen(false)}
            ></label>

            <ul className="menu bg-right-product-bg text-base-content min-h-full w-96 ">
              <CartProducts cartDetails={cartDetails} totalQuantity={totalQuantity}/>
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart