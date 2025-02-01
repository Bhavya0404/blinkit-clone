import { ProductType } from '@/app/types/interfaces';
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React from 'react'


const Product = ({ product }: {product: ProductType}) => {
    const router = useRouter();

  return (
    <div className="items-center w-[180px] pb-3 border shadow-card-box-shadow shadow bg-card-bg rounded-lg m-3" onClick={ () => router.push(`/product?productId=${product.id}`) }>
        <div className='flex justify-center'>
            <Image src={product.image_url}
            alt="Image" loading='lazy' width={140} height={140} />
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
                    <p className='font-semibold text-sm h-9 mb-1.5'>{product.name}</p>
                    <p className='h-3 mb-5 text-weight-unit-text text-sm'>{Number(product.weight)} g</p>
                </div>

                <div className='h-8 flex justify-between items-center'>
                    <p className='font-bold w-8 h-6'>₹{Number(product.price)}</p>
                    <button className='w-16 h-8 text-add-button border-solid border border-add-button rounded-md gap-0.5 cursor-pointer'>Add</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Product