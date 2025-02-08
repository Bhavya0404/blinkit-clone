import React, { useState } from 'react'

const AddToCart = () => {
    const [addedProduct, setAddedProduct] = useState(0);
    const increment = (event: React.MouseEvent) => {
        event.stopPropagation(); // Prevents parent div's onClick from firing
        setAddedProduct((prev) => prev + 1);
      };
    
      const decrement = (event: React.MouseEvent) => {
        event.stopPropagation(); 
        if (addedProduct > 0) {
          setAddedProduct((prev) => prev - 1);
        }
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
