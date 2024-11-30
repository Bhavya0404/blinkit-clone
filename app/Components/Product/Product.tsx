import Image from 'next/image'
import React from 'react'
Image
const Product = () => {
  return (
    <div className="items-center w-[180px] pb-3 border shadow-card-box-shadow shadow bg-card-bg rounded-lg m-6">
        <div className='flex justify-center'>
            <Image src="https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/sliding_images/jpeg/0be0d49a-4dae-408a-8786-afae1dd05cb1.jpg?ts=1707312314"
            alt="Shoes" loading='lazy' width={140} height={140} />
        </div>
        <div className=" h-32 px-2">
            <div className='w-36 h-3.5 mb-2'>
                <div className='w-16 h-3.5 flex items-center bg-earliest-bg'>
                    <div className='m-auto'>
                        <Image src="https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/assets/eta-icons/15-mins.png"
                        alt="Shoes" width={11} height={11} /> 
                    </div>
                    <p className='text-xs font-semibold'>Earliest</p>
                </div>
            </div>
            {/* bottom title */}
            <div className='w-40 h-2'>
                <div className='flex flex-col'>
                    <p className='font-semibold text-sm h-9 mb-1.5'>Amul Salted Butter</p>
                    <p className='h-3 mb-5 text-weight-unit-text text-sm'>100 g</p>
                </div>

                <div className='h-8 flex justify-between items-center'>
                    <p className='font-bold w-8 h-6'>₹60</p>
                    <button className='w-16 h-8 text-add-button border-solid border border-add-button rounded-md gap-0.5 cursor-pointer'>Add</button>
                
                </div>
            </div>
        </div>
    </div>
  )
}

export default Product