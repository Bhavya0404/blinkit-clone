import React from 'react'
import { fetchCartDetails } from '@/lib/redux/features/user/cartDetailsSlice';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hook';

const AddToCart = ({productId}: {productId: string}) => {

    const userId = JSON.parse(sessionStorage.getItem('user') || '{}');
    const dispatch = useAppDispatch();
    const addedProduct = useAppSelector((state: any) => state.cartDetails.productDetails.find((res: any) => res.productId === productId)?.quantity);

    const increment = async (event: React.MouseEvent) => {
        event.stopPropagation(); // Prevents parent div's onClick from firing
        dispatch(fetchCartDetails({userId: userId, productId: productId, addProduct: true, removeProduct: false}));
      };
    
      const decrement = async (event: React.MouseEvent) => {
        event.stopPropagation(); 
        if (addedProduct > 0) {
          dispatch(fetchCartDetails({userId: userId, productId: productId, addProduct: false, removeProduct: true}));
        };
      };

  return (
    <div>
        {!addedProduct ? 
            <button className='w-16 h-8 text-add-button border-solid border border-add-button rounded-md gap-0.5 cursor-pointer' onClick={increment}>Add</button> : 

            <button className='w-16 h-8 text-white bg-add-button border-solid border border-add-button rounded-md gap-0.5 cursor-pointer'>
                <div className='flex justify-evenly self-center font-medium h-full'>
                    <p className="self-center w-full" onClick={decrement}>-</p>
                    <p className="self-center">{addedProduct}</p>
                    <p className="self-center w-full" onClick={increment}>+</p>
                </div>
            </button>
        }      
    </div>
  )
}

export default AddToCart
