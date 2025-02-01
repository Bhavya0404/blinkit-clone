"use client"
import React, { useRef } from 'react'
import Image from 'next/image';

const Carousel = () => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const scroll = (direction: 'left' | 'right') => {
        const container = scrollContainerRef.current;
        if (!container) return;
        
        const scrollAmount = 200; // Adjust based on your needs
        const newScrollPosition = direction === 'left' 
            ? container.scrollLeft - scrollAmount
            : container.scrollLeft + scrollAmount;
            
        container.scrollTo({
            left: newScrollPosition,
            behavior: 'smooth'
        });
    };

    const data = ["https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/sliding_images/jpeg/3ddcf321-04e9-4145-826f-553339b01ea2.jpg?ts=1727417441",
        "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/sliding_images/jpeg/3ddcf321-04e9-4145-826f-553339b01ea2.jpg?ts=1727417441",
        "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/sliding_images/jpeg/3ddcf321-04e9-4145-826f-553339b01ea2.jpg?ts=1727417441",
        "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/sliding_images/jpeg/3ddcf321-04e9-4145-826f-553339b01ea2.jpg?ts=1727417441",
        "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/sliding_images/jpeg/3ddcf321-04e9-4145-826f-553339b01ea2.jpg?ts=1727417441",
        "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/sliding_images/jpeg/3ddcf321-04e9-4145-826f-553339b01ea2.jpg?ts=1727417441",
        "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/sliding_images/jpeg/3ddcf321-04e9-4145-826f-553339b01ea2.jpg?ts=1727417441",
        "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/app/assets/products/sliding_images/jpeg/3ddcf321-04e9-4145-826f-553339b01ea2.jpg?ts=1727417441",





    ]
    let count = 0;
  return (
    <div className='flex justify-center relative'>
         <button 
        onClick={() => scroll('left')} 
        className="absolute left-0 top-1/2 -translate-y-1/2 
        w-10 h-10 rounded-full bg-white shadow-lg z-10
        flex items-center justify-center
        border border-gray-200
        hover:bg-gray-50"
    >
        ❮
    </button>
        <div className="cursor-pointer w-10/12">
            <div ref={scrollContainerRef}className="flex overflow-x-hidden scroll-smooth">
                {data.map((res)=> {
                    count++;
                    return (
                        <div key={count} className='m-2'>
                            <div className='h-16 w-16 border border-gray-200 rounded'>
                                <Image className="w-full" key={count} src={res} loading='lazy' width={320} height={320} alt={"Name"}/>
                            </div>
                        </div>

                    )
                })}
            </div>
        </div>
        <button 
        onClick={() => scroll('right')} 
        className="absolute right-0 top-1/2 -translate-y-1/2 
        w-10 h-10 rounded-full bg-white shadow-lg z-10
        flex items-center justify-center
        border border-gray-200
        hover:bg-gray-50"
    >
        ❯
    </button>
   </div>
  )
}

export default Carousel