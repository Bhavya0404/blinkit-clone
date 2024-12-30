"use client"
import Product from '@/app/Components/Product/Product';
import React, { useEffect, useState } from 'react'

interface Category {
    id: number;
    name: string;
}

interface Product {
    name: string;
    image_url: string;
    secondary_images: any;
    price: number;
    discounted_price: number;
    weight: number;
    subcategory_id: string;
    company: string;
    additional_attributes: any;
}

const ProductsPage = () => {
    const [category, setCategory] = useState<Category[]>([]);
    const [subcategory, setSubCategory] = useState<Category[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    
    const getCategory = async () => {
        const res = await fetch('/api/category');
          if(res.ok){
            const data = await res.json();
            setCategory(data);
          } else{
            throw new Error('Error fetching category');
          }  
    }

    const getSubCategory = async () => {
        const res = await fetch('/api/subcategory');
          if(res.ok){
            const data = await res.json();
            setSubCategory(data);
          } else{
            throw new Error('Error fetching category');
          }  
    }

    const getProducts = async () => {
        const res = await fetch('/api/getproducts');
          if(res.ok){
            const data = await res.json();
            console.log(data);
            setProducts(data);
          } else{
            throw new Error('Error fetching category');
          }  
    }

    useEffect(() => {
        getCategory();
        getSubCategory();
        getProducts();
    }, [])

    const displayedCategories = category.slice(0, 7);
  return (
    <div>
        <div className="navbar bg-base-100 min-h-12" style={{ boxShadow: '0 1px 6px rgba(0, 0, 0, 0.1)' }}>
            <div className='w-8/12 h-full m-auto'>
                <nav className='w-full flex justify-between'>
                    {displayedCategories.map((res)=> {
                        return (
                            <li className='list-none'><a href="" className='block whitespace-normal text-center'>{res.name}</a></li>
                        )
                    })}

                    <li className='list-none'>
                        <div className="dropdown dropdown-bottom dropdown-end">
                            <div tabIndex={0} role="button" className="m-1">More </div>
                            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                            {category.map((res)=> {
                                return (
                                    <li className='list-none'><a href="" className='block whitespace-normal text-center'>{res.name}</a></li>
                                )
                            })}
                            </ul>
                        </div>
                    </li>
                </nav>
            </div>
        </div>

        <div className='w-8/12 h-full m-auto mt-4 flex'>
            <div>
                <ul className="menu bg-base-200 w-56">
                    {subcategory.map((res)=> {
                        return (
                            <li className='list-none'><a href="" className='block whitespace-normal text-center'>{res.name}</a></li>
                        )
                    })}
                </ul>
            </div>

            <div className='flex h-full overflow-x-hidden flex-wrap justify-start'>
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
            </div>
        </div>
    </div>
  )
}

export default ProductsPage