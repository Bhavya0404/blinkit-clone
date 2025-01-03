"use client"
import Product from '@/app/Components/Product/Product';
import { useUser } from '@auth0/nextjs-auth0/client';
import React, { useEffect, useState } from 'react'

interface Category {
    id: number;
    name: string;
}

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

const ProductsPage = () => {
    const {user, isLoading: authLoading} = useUser();
    const [category, setCategory] = useState<Category[]>([]);
    const [subcategory, setSubCategory] = useState<Category[]>([]);
    const [products, setProducts] = useState<ProductType[]>([]);
    
    const fetchData = async () => {
        try {
            // setLoading(true);
            const [categoryRes, subcategoryRes, productsRes] = await Promise.all([
                fetch('/api/category'),
                fetch('/api/subcategory'),
                fetch('/api/getproducts')
            ]);

            if (categoryRes.ok && subcategoryRes.ok && productsRes.ok) {
                const categoryData = await categoryRes.json();
                const subcategoryData = await subcategoryRes.json();
                const productsData = await productsRes.json();

                // const formattedProducts = productsData.map((res: ProductType) => ({
                //     ...res,
                //     secondary_images: JSON.parse(res.secondary_images || '[]'),
                //     additional_attributes: JSON.parse(res.additional_attributes || '{}'),
                // }));

                setCategory(categoryData);
                setSubCategory(subcategoryData);
                setProducts(productsData);
                // console.log("categoryData",categoryData);
                // console.log("subcategoryData",subcategoryData);
                // console.log("productsData",productsData);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            // setLoading(false);
        }
    };


    useEffect(() => {
        if (authLoading) return;
        fetchData();
    }, [authLoading]);

    const displayedCategories = category.slice(0, 7);
  return (
    <div>
        <div className="navbar bg-base-100 min-h-12 p-0" style={{ boxShadow: '0 1px 6px rgba(0, 0, 0, 0.1)' }}>
            <div className='w-8/12 h-full m-auto my-0'>
            <nav className='h-12 w-full flex justify-between items-center'>
                {displayedCategories.map((res)=> {
                return (
                    <li key={res.id} className='list-none hover:bg-gray-100 h-full w-44'><a href="" className='h-full flex items-center justify-center whitespace-normal text-center'>{res.name}</a></li>
                )
                })}

                <li className='list-none hover:bg-gray-100 hover:cursor-pointer h-full w-11'>
                <div className="dropdown dropdown-bottom dropdown-end h-12">
                    <div tabIndex={0} role="button" className='h-full flex items-center justify-center'>More </div>
                    <ul tabIndex={0} className="dropdown-content menu bg-base-100 p-0 z-[1] w-52 shadow rounded-none">
                    {category.map((res)=> {
                    return (
                        <li key={res.id} className='list-none border-b border-gray-200 p-2 hover:bg-gray-100'><a href="" className='block whitespace-normal text-left hover:bg-transparent'>{res.name}</a></li>
                    )
                    })}
                    </ul>
                </div>
                </li>
            </nav>
            </div>
        </div>

        <div className='w-8/12 h-full m-auto my-0 pt-1 flex'>
            <div className='h-screen'>
                <ul className="menu bg-base-100 w-60 p-0 overflow-y-auto">
                    {subcategory.map((res)=> {
                    return (
                        <li key={res.id} className='list-none border-b border-x border-gray-200 last:border-b-0 p-3 hover:cursor-pointer hover:bg-green-hover'><a href="" className='block whitespace-normal text-left hover:bg-transparent'>{res.name}</a></li>
                    )
                    })}
                </ul>
            </div>

            <div className='flex h-full overflow-x-hidden flex-wrap bg-right-product-bg'>
                {products.map((res)=> {
                    return (
                        <Product key={res.id} product={res} />
                    )
                })}
            </div>
        </div>
    </div>
  )
}

export default ProductsPage