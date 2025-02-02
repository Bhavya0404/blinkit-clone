import React from 'react'

const MobileCart = () => {
  return (
    <div className='flex justify-between bg-cart-green text-white text-xl rounded-xl h-[52px] px-3'>
      <div className='flex'>
            <div className='w-[30px] h-[30px] flex self-center'>
                <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-30 w-30"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            </div>
            <div className='text-sm self-center px-2'>
                <div className='flex flex-col'>
                    2 items
                </div>
                <div >
                    ₹74
                </div>
            </div>
      </div>
      <div className='text-lg self-center'>
        <p>View Cart</p>
      </div>
    </div>
  )
}

export default MobileCart
