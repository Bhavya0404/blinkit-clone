import React from 'react'
import SearchBox from './SearchBox'
import Login from './Login'
import Cart from './Cart'
import dynamic from 'next/dynamic';
import MobileCart from './MobileCart';
const Location = dynamic(() => import('./Location'), {ssr: false});

const MobileNavbar = () => {
  return (
    <div>
        <div className='w-full flex flex-col '>
            <div className='flex justify-between my-3'>
                <Location />
                <Login />
            </div>
            <div className='w-full'>
                <SearchBox />
            </div>
        </div>
        <div className='fixed z-[9999] opacity-100 left-3 right-3 bottom-3'>
            <MobileCart />
        </div>
    </div>
  )
}

export default MobileNavbar
