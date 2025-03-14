import AddToCart from '@/app/product/Components/AddToCart';
import { ProductType } from '@/app/types/interfaces';
import { useAppSelector } from '@/lib/redux/hook';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
const CartProducts = ({cartDetails, totalQuantity}: {cartDetails: any, totalQuantity: number}) => {

    const [productsDetails, setProductsDetails] = useState<ProductType[]>();
    const [itemTotal, setItemTotal] = useState(0);
    const [deliveryCharge, setDeliveryCharge] = useState(0);
    const [handlingCharge, setHandlingCharge] = useState(9);
    const [grandTotal, setGrandTotal] = useState(0);
    const user = useAppSelector(state => state.user);
    const storeId = sessionStorage.getItem('store')
    const [showInfoToast, setShowInfoToast] = useState(false);
    const [showSuccessToast, setShowSuccessToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    
    const fetchProductDetails = async () => {
        const productId = cartDetails.map((res: any) => res.productId);
        const res = await fetch('/api/productdetails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ productId: productId, fromCart: true })
        })
        if(res.ok){
            const data = await res.json();
            setProductsDetails(data);

        } else {
            throw new Error('Error fetching product details');
        }
        
    }
    const BillDetails = async () => {
        const itemsPrice = cartDetails?.reduce(
            (acc: number, res: any) => acc + Number(res.price) * Number(res.quantity), 0).toFixed(2);
          
        console.log("Total Price:", itemsPrice);
        setItemTotal(itemsPrice);
        let otherCharges = 0;
        if(!cartDetails.length){
            otherCharges = 0;
            setHandlingCharge(0);
        } else {
            otherCharges += handlingCharge;
            if(itemsPrice < 200){
                const deliverCharges = (itemsPrice*10)/100
                setDeliveryCharge(deliverCharges);
                otherCharges += deliverCharges; // delivery charge
            }
        }
        const total = (Number(itemsPrice) + Number(otherCharges)).toFixed(2);
        setGrandTotal(Math.round(Number(total)));
    }

    const placeOrder = async () => {
        try {
            const res = await fetch('/api/placeorder', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({userId: user, orderDetails: cartDetails, grandTotal: grandTotal, totalQuantity: totalQuantity, storeId: storeId})
            })
            if(res.ok){
                const data = await res.json();
                setToastMessage('Order placed successfully!');
                setShowSuccessToast(true);
                
                setTimeout(() => {
                    setShowSuccessToast(false);
                    setTimeout(() => {
                        window.location.href = '/';
                    }, 300);
                }, 2000);
                console.log("order placed", data);
            }
        } catch (error){
            setToastMessage('Failed to place order');
            setShowInfoToast(true);
            console.log("error Placing order");
            
            setTimeout(() => {
                setShowInfoToast(false);
            }, 3000);
        }
    }
    

    useEffect(() => {
        BillDetails();
        fetchProductDetails();
    }, [cartDetails])

    return (
        <div className="flex flex-col min-h-screen">
            <div className='w-full h-[60px] bg-card-bg flex items-center px-5'>
                <p className='text-lg font-bold'>My Cart</p>
            </div>

            {/* products Card */}
            <div className='bg-card-bg my-4 border rounded-xl mx-1'>
                {productsDetails?.map((res: any) => (
                    <div className='flex justify-between py-4 mx-1 w-full' key={res.productId}>
                        <div className='flex'>
                            <div className='border border-base-200 rounded ml-1'>
                                <Image src={res.image_url}
                                alt="Image" loading='lazy' width={70} height={70} />
                            </div>
                            <div className='pl-3 w-[140px]'>
                                <p className="text-xs line-clamp-2 w-[140px] overflow-hidden text-ellipsis">{res.name}</p>
                                <p className='text-gray-500 text-xs pt-1'>{res.weight} g</p>
                                <p className='font-bold w-8 h-6 text-xs pt-1'>₹{res.price}</p>
                            </div>
                        </div>
                        <div className='mr-4 self-center'>
                            <AddToCart productId={res.productId} />
                        </div>
                    </div>
                ))}
            </div>

            {/* Bill Details */}
            <div className='bg-card-bg my-4 border rounded-xl mx-1 p-3'>
                <div>
                    <p className='text-base font-bold'>Bill Details</p>
                </div>
                <div>
                    <div className='flex justify-between'>
                        <div className='flex'>
                            <div className='self-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-3">
                                <path fillRule="evenodd" d="M4.125 3C3.089 3 2.25 3.84 2.25 4.875V18a3 3 0 0 0 3 3h15a3 3 0 0 1-3-3V4.875C17.25 3.839 16.41 3 15.375 3H4.125ZM12 9.75a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5H12Zm-.75-2.25a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5H12a.75.75 0 0 1-.75-.75ZM6 12.75a.75.75 0 0 0 0 1.5h7.5a.75.75 0 0 0 0-1.5H6Zm-.75 3.75a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5H6a.75.75 0 0 1-.75-.75ZM6 6.75a.75.75 0 0 0-.75.75v3c0 .414.336.75.75.75h3a.75.75 0 0 0 .75-.75v-3A.75.75 0 0 0 9 6.75H6Z" clipRule="evenodd" />
                                <path d="M18.75 6.75h1.875c.621 0 1.125.504 1.125 1.125V18a1.5 1.5 0 0 1-3 0V6.75Z" />
                            </svg>
                            </div>

                            <p>Items Total</p>
                        </div>
                        <div>
                            <p>₹{itemTotal}</p>
                        </div>
                    </div>
                    <div className='flex justify-between'>
                        <div className='flex'>
                            <div className='self-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-3">
                                <path fillRule="evenodd" d="M7.5 3.75A1.5 1.5 0 0 0 6 5.25v13.5a1.5 1.5 0 0 0 1.5 1.5h6a1.5 1.5 0 0 0 1.5-1.5V15a.75.75 0 0 1 1.5 0v3.75a3 3 0 0 1-3 3h-6a3 3 0 0 1-3-3V5.25a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3V9A.75.75 0 0 1 15 9V5.25a1.5 1.5 0 0 0-1.5-1.5h-6Zm10.72 4.72a.75.75 0 0 1 1.06 0l3 3a.75.75 0 0 1 0 1.06l-3 3a.75.75 0 1 1-1.06-1.06l1.72-1.72H9a.75.75 0 0 1 0-1.5h10.94l-1.72-1.72a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                            </svg>
                            </div>


                            <p>Delivery charge</p>
                        </div>
                        <div>
                            <p>₹{deliveryCharge}</p>
                        </div>
                    </div>

                    <div className='flex justify-between'>
                        <div className='flex'>
                            <div className='self-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-3">
                                <path fillRule="evenodd" d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 0 0 4.25 22.5h15.5a1.875 1.875 0 0 0 1.865-2.071l-1.263-12a1.875 1.875 0 0 0-1.865-1.679H16.5V6a4.5 4.5 0 1 0-9 0ZM12 3a3 3 0 0 0-3 3v.75h6V6a3 3 0 0 0-3-3Zm-3 8.25a3 3 0 1 0 6 0v-.75a.75.75 0 0 1 1.5 0v.75a4.5 4.5 0 1 1-9 0v-.75a.75.75 0 0 1 1.5 0v.75Z" clipRule="evenodd" />
                            </svg>
                            </div>

                            <p>Handling charge</p>
                        </div>
                        <div>
                            <p>₹{handlingCharge}</p>
                        </div>
                    </div>

                    <div className='flex justify-between mt-2'>
                        <p className='font-bold'>Grand Total</p>
                        <p className='font-bold'>₹{grandTotal}</p>
                    </div>
                    
                </div>

            </div>

            {/* Cancellation Policy */}
            <div className='bg-card-bg my-4 border rounded-xl mx-1 px-3 py-2'>
                <p className='text-base font-bold'>Cancellation Policy</p>
                <p >Orders cannot be cancelled once packed for delivery. In case of unexpected delays, a refund will be provided, if applicable.</p>
            </div>

            <div className='bg-card-bg my-4 border-t sticky bottom-0 rounded-xl mx-1 p-4 mt-auto'>
                <div className='flex justify-between'>
                    <div className='flex'>
                        <div className='self-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                            </svg>
                        </div>
                        <p className='pl-3 font-bold '>Delivering to Home</p>
                    </div>
                    <p className='text-green-700'>Change</p>   
                </div>
                <div className='mt-3'>
                    <button className='bg-green-700 text-white px-3 py-2 rounded-md w-full' onClick={placeOrder}>
                        <div className='flex justify-between w-full'>
                            <div>
                                <p className='font-bold text-left'>₹{grandTotal}</p>
                                <p className=''>TOTAL</p>
                            </div>
                            <p className='self-center text-lg'>Proceed to Pay</p>
                        </div>
                    </button>
                </div>
            </div>
            {(showInfoToast || showSuccessToast) && (
                <div className="toast toast-top toast-end">
                    {showInfoToast && (
                        <div className="alert alert-info border shadow-card-box-shadow shadow bg-card-bg rounded-xl">
                            <span>{toastMessage}</span>
                        </div>
                    )}
                    {showSuccessToast && (
                        <div className="alert alert-success border shadow-card-box-shadow shadow bg-card-bg rounded-xl">
                            <span>{toastMessage}</span>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default CartProducts
