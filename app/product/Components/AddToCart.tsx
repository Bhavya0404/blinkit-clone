import React, { useState } from 'react'

const AddToCart = ({productId}: {productId: string}) => {
    const [addedProduct, setAddedProduct] = useState(0);
    const userId = JSON.parse(sessionStorage.getItem('user') || '{}');
    const storeId = 3;

    const increment = async (event: React.MouseEvent) => {
        event.stopPropagation(); // Prevents parent div's onClick from firing
        console.log("productId AddToCart", productId);
        try {
          const res = await fetch('/api/cart', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({userId: userId, storeId: storeId, productId: productId, addProduct: true})
          });
          setAddedProduct((prev) => prev + 1);
          const data = await res.json();
        } catch (error) {
          console.error("Error adding to cart", error);
        }
      };
    
      const decrement = async (event: React.MouseEvent) => {
        event.stopPropagation(); 
        if (addedProduct > 0) {
          // setAddedProduct((prev) => prev - 1);
          console.log("productId RemoveFromCart", productId);
          try {
            const res = await fetch('/api/cart', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({userId: userId, storeId: storeId, productId: productId, addProduct: false})
            });
            setAddedProduct((prev) => prev - 1);
            const data = await res.json();
            console.log("Remove from cart response", data);
          } catch (error) {
            console.error("Error removing from cart", error);
          }
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
