"use client"
import Product from '@/app/Components/Product/Product';
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
}

const ProductsPage = () => {
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
                console.log("productsData",productsData);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            // setLoading(false);
        }
    };


    useEffect(() => {
        fetchData();
    }, []);

    const displayedCategories = category.slice(0, 7);
  return (
    <div>
        <div className="navbar bg-base-100 min-h-12" style={{ boxShadow: '0 1px 6px rgba(0, 0, 0, 0.1)' }}>
            <div className='w-8/12 h-full m-auto'>
                <nav className='w-full flex justify-between'>
                    {displayedCategories.map((res)=> {
                        return (
                            <li key={res.id} className='list-none'><a href="" className='block whitespace-normal text-center'>{res.name}</a></li>
                        )
                    })}

                    <li className='list-none'>
                        <div className="dropdown dropdown-bottom dropdown-end">
                            <div tabIndex={0} role="button" className="m-1">More </div>
                            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                            {category.map((res)=> {
                                return (
                                    <li key={res.id} className='list-none'><a href="" className='block whitespace-normal text-center'>{res.name}</a></li>
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
                            <li key={res.id} className='list-none'><a href="" className='block whitespace-normal text-center'>{res.name}</a></li>
                        )
                    })}
                </ul>
            </div>

            <div className='flex h-full overflow-x-hidden flex-wrap justify-start'>
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