"use client"
import React, { useEffect, useState } from 'react'

interface Category {
    id: number;
    name: string;
}

const ProductsPage = () => {
    const [category, setCategory] = useState<Category[]>([]);
    
    const getCategory = async () => {
        const res = await fetch('/api/category');
          if(res.ok){
            const data = await res.json();
            setCategory(data);
          } else{
            throw new Error('Error fetching category');
          }  
    }

    useEffect(() => {
        getCategory();
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

        <div className='w-8/12 h-full m-auto mt-4'>
            <div>
                <ul className="menu bg-base-200 w-56">
                    <li><a>Item 1</a></li>
                    <li><a>Item 2</a></li>
                    <li><a>Item 3</a></li>
                    <li><a>Item 3</a></li>
                    <li><a>Item 3</a></li>
                    <li><a>Item 3</a></li>
                    <li><a>Item 3</a></li>
                    <li><a>Item 3</a></li>
                    <li><a>Item 3</a></li>
                    <li><a>Item 3</a></li>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default ProductsPage