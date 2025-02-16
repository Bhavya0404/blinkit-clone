"use client"
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import Carousel from './Carousel';
import { ProductType } from '@/app/types/interfaces';
import { useSearchParams } from 'next/navigation';
import AddToCart from './AddToCart';

const ProductsPage = () => {
    const [productsDetails, setProductsDetails] = useState<ProductType>();
    const [userId, setUserId] = useState(null);
    const [cartDetails, setCartDetails] = useState([]);
    const params = useSearchParams();
    const productId = params?.get('productId');

    const fetchProductDetails = async () => {
        const res = await fetch('/api/productdetails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ productId: productId })
        })
        if(res.ok){
            const data = await res.json();
            setProductsDetails(data);
            
        } else {
            throw new Error('Error fetching product details');
        }
        
    }

    function getUserId(){
        const storedUser = sessionStorage.getItem('user');
        if (storedUser) {
          setUserId(JSON.parse(storedUser));
        }
    }

    const fetchCartDetails = async () => {
        if(userId){
            const response = await fetch('/api/cartdetails', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({id: userId}),
            });
            const data = await response.json();
            setCartDetails(data);
        }
    }

    useEffect(() => {
        fetchCartDetails();
    }, [userId]);
    
    useEffect(() => {
        fetchProductDetails();
        getUserId(); 
    }, [])
  return (
    <div className='w-9/12 m-auto mb-10 flex align-middle overflow-hidden'>
        <div className='w-6/12 border-r px-10'>
            <div className='flex flex-col'>
                <div className='h-2/4 border-b mt-7'>
                    <div className='flex justify-center items-center'>
                        <Image src={productsDetails?.image_url || ''} loading='lazy' width={460} height={400} alt={"Name"}/>
                    </div>
                    <div>
                        <Carousel />
                    </div>
                </div>

                <div className='h-2/4 mt-5 mr-28'>
                    <h1 className='font-semibold text-2xl'>Product Details</h1>

                    <h3 className='font-semibold mt-3'>Toned Milk</h3>
                    <p className='text-gray-500'>Type</p>

                    <h3 className='font-semibold mt-3'>Key Features</h3>
                    <p className='text-gray-500'>Wholesome taste
                        Healthy and nutritious milk
                        Rich in calcium</p>
                    
                    {productsDetails?.additional_attributes?.shelf_life ? <div>
                        <h3 className='font-semibold mt-3'>Shelf Life</h3>
                        <p className='text-gray-500'>{productsDetails?.additional_attributes?.shelf_life}</p>
                    </div> : null}

                    {productsDetails?.additional_attributes?.country_of_origin ? <div>
                        <h3 className='font-semibold mt-3'>Country Of Origin</h3>
                        <p className='text-gray-500'>{productsDetails?.additional_attributes?.country_of_origin}</p>
                    </div> : null}

                    {productsDetails?.additional_attributes?.customer_care_details ? <div>
                        <h3 className='font-semibold mt-3'>Customer Care Details</h3>
                        <p className='text-gray-500'>{productsDetails?.additional_attributes?.customer_care_details}</p>
                    </div> : null}

                    {productsDetails?.additional_attributes?.return_policy ? <div>
                        <h3 className='font-semibold mt-3'>Return Policy</h3>
                        <p className='text-gray-500'>{productsDetails?.additional_attributes?.return_policy}</p>
                    </div> : null}

                    <h3 className='font-semibold mt-3'>Return Policy</h3>
                    <p className='text-gray-500'>The product is non-returnable. For a damaged, defective, expired or incorrect item, you can request a replacement within 24 hours of delivery.
                    In case of an incorrect item, you may raise a replacement or return request only if the item is sealed/ unopened/ unused and in original condition.</p>
                </div>
            </div>
        </div>
        <div className='w-6/12 pt-16 pl-10'>
           
            <div className='border-b pb-3'>
                <h1 className='font-semibold text-2xl'>{productsDetails?.name}</h1>
        
                <div className='w-20 h-3.5 flex items-center bg-earliest-bg mt-3'>
                    <div className='m-auto'>
                        <Image src="https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/assets/eta-icons/15-mins.png"
                            alt="Shoes" width={14} height={14} /> 
                    </div>
                    <p className='text font-semibold'>13 mins</p>
                </div>

                <p className='text-green-600 text-lg font-medium mt-3'>View all by {productsDetails?.company}</p>
            </div>

            <div className='flex justify-between pt-3'>
                <div className='pt-3'>
                    <p className='text-gray-500 font-medium text-sm'>{productsDetails?.weight} ml</p>
                    <p className='text-gray-500 font-medium text-base'>MRP <span className='font-semibold text-black'>₹{productsDetails?.price}</span></p>
                    <p className='text-gray-400 font-medium text-xs'>(inclusive of all taxes)</p>
                </div>
                <div className='pt-3'>
                    <AddToCart productId={productId || ''} cartInfo={cartDetails}/>
                </div>
            </div>

            <div className='pt-4'>
                <h3 className='font-semibold text-lg mt-3'>Why shop from blinkit?</h3>

                <div className='flex mt-3'>
                    <Image src="https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/assets/web/blinkit-promises/10_minute_delivery.png"
                            alt="Shoes" width={56} height={56} /> 
                    <div className='pl-3'>
                        <p>Super fast Delievery</p>
                        <p>Get your order delivered to your doorstep at the earliest from dark stores near you.</p>
                    </div>
                </div>

                <div className='flex mt-3'>
                    <Image src="https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/assets/web/blinkit-promises/Wide_Assortment.png"
                            alt="Shoes" width={56} height={56} /> 
                    <div className='pl-3'>
                        <p>Wide Assortment</p>
                        <p>Choose from 5000+ products across food, personal care, household & other categories.</p>
                    </div>
                </div>

                <div className='flex mt-3'>
                    <Image src="https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=90/assets/web/blinkit-promises/Best_Prices_Offers.png"
                            alt="Shoes" width={56} height={56} /> 
                    <div className='pl-3'>
                        <p>	Best Prices & Offers</p>
                        <p>Best price destination with offers directly from the manufacturers</p>
                    </div>
                </div>

            </div>
        </div>
    </div>
  )
}

export default ProductsPage