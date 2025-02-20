"use client"
import Product from '@/app/product/Components/Product';
import { BasicDetails, Category, ProductType } from '@/app/types/interfaces';
import { getUser } from '@/lib/redux/features/user/userSlice';
import { useAppSelector } from '@/lib/redux/hook';
import { useAppDispatch } from '@/lib/redux/hook';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'


const ProductsListing = () => {
    const [isLoading, setLoading] = useState(false);
    const [category, setCategory] = useState<Category[]>([]);
    const [subcategory, setSubCategory] = useState<BasicDetails[]>([]);
    const [currentSubcategory, setCurrentSubcategory] = useState<BasicDetails>();
    const [products, setProducts] = useState<ProductType[]>([]);
    const [selectedTab, setSelectedTab] = useState('');
    const [cartDetails, setCartDetails] = useState([]);
    const dispatch = useAppDispatch()
    const userId = useAppSelector(state => state.user.userId)
    const params = useSearchParams();
    const categoryId = params?.get('categoryId');

    const router = useRouter();

    const handleLeftPanel = (subcategoryId: string) => {
        setSelectedTab(subcategoryId);
    }   

    const fetchData = async () => {
        try {
            const [categoryRes, subcategoryRes] = await Promise.all([
                fetch('/api/category'),
                fetch(`/api/subcategory`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ categoryId: categoryId })
                }),
                
            ]);

            if (categoryRes.ok && subcategoryRes.ok) {
                const categoryData = await categoryRes.json();
                const subcategoryData = await subcategoryRes.json();

                setCategory(categoryData);
                setSubCategory(subcategoryData);
                setCurrentSubcategory(subcategoryData[0])
                setSelectedTab(subcategoryData[0]?.id);

            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchProducts = async () => {
        setLoading(true);
        const productRes = await fetch('/api/getproducts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ subCategoryId: selectedTab })
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
        } else {
            throw new Error('Error fetching products');
        }
        setLoading(false);
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
        fetchData();
    }, [categoryId]);

    useEffect(() => {
        fetchProducts();
    }, [selectedTab])

    useEffect(() => {
        fetchCartDetails();
    }, [userId]);

    useEffect(() => {
        dispatch(getUser());   
    }, [])

    const displayedCategories = category.slice(0, 7);
  return (
    <div>
        {isLoading && <div className="fixed inset-0 flex justify-center items-center">
             <span className="loading loading-spinner loading-lg text-warning"></span>
        </div>}
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
                <ul className="w-60 overflow-y-auto">
                    {subcategory.map((res)=> {
                        const isSelected = selectedTab === res.id;
                    return (
                        <li key={res.id} className={`
                            flex items-center min-h-[4rem] text-sm leading-5 
                            border-b border-x border-gray-200 
                            last:border-b-0 p-3 hover:cursor-pointer
                             hover:bg-green-hover ${isSelected ? 'bg-green-hover border-l-green-800 border-l-4' : 'hover:bg-green-hover'}
                            `}
                        onClick={() => handleLeftPanel(res.id)}><a href="#" className='block whitespace-normal text-left hover:bg-transparent'>{res.name}</a></li>
                    )
                    })}
                </ul>
            </div>

            <div className='flex h-full overflow-x-hidden flex-wrap bg-right-product-bg'>
                {products.map((res)=> {
                    return (
                        <Product key={res.id} product={res} cartDetails={cartDetails}/>
                    )
                })}
            </div>
        </div>
    </div>
  )
}

export default ProductsListing