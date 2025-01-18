"use client"
import React, { useEffect, useState, useRef } from 'react'
import Product from '../Product/Product';

interface ProductType {
    id: string;
    name: string;
    image_url: string;
    secondary_images: string[];
    price: string;
    discounted_price: string;
    weight: string;
    subcategory_id: string;
    company: string;
    additional_attributes: {
        shelf_life: string;
        storage_tips: string;
        return_policy: string;
        country_of_origin: string;
        customer_care_details: string;
    };
    outOfStock: boolean;
}

const ProductCarousel = () => {
    const [products, setProducts] = useState<ProductType[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    
    const fetchProducts = async () => {
        setIsLoading(true);
        const productRes = await fetch('/api/getproducts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ subCategoryId: 'd0e6c978-e5ee-49a7-8b8e-577af537ae57' })
        })

        if(productRes.ok){
            const productsData = await productRes.json();
            const parsedProductsdata = productsData.map((res: any) => {
                return {
                    ...res,
                    secondary_images: JSON.parse(res.secondary_images),
                    additional_attributes: JSON.parse(res.additional_attributes)
                };
            });
            setProducts(parsedProductsdata);
            setIsLoading(false);
        } else {
            throw new Error('Error fetching products');
        }
    }

    const scroll = (direction: 'left' | 'right') => {
        const container = scrollContainerRef.current;
        if (!container) return;
        
        const scrollAmount = 800; // Adjust based on your needs
        const newScrollPosition = direction === 'left' 
            ? container.scrollLeft - scrollAmount
            : container.scrollLeft + scrollAmount;
            
        container.scrollTo({
            left: newScrollPosition,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        fetchProducts();
    }, [])

    const productsData = products.slice(0, 10);
  return (
   <div>
    {!isLoading && <div>
        <div className='flex justify-between mx-2 mt-4 mb-2'>
            <p className='font-bold text-2xl'>Dairy, Bread & Eggs</p>
            <p ><a href="#" className='text-green-700 font-medium text-xl'>see all</a></p>
        </div>
        <div className="relative">
            <div ref={scrollContainerRef}className="flex overflow-x-hidden scroll-smooth">
                {productsData.map((res)=> {
                    return (
                        <Product key={res.id} product={res} />
                    )
                })}
            </div>
            
            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                <button 
                    onClick={() => scroll('left')} 
                    className="btn btn-circle">
                    ❮
                </button>
                <button 
                    onClick={() => scroll('right')} 
                    className="btn btn-circle">
                    ❯
                </button>
            </div>
        </div>
   </div>}
   </div>
  )
}

export default ProductCarousel