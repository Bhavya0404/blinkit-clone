"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { Category } from '../types/interfaces';


const Categories = () => {
    const [category, setCategory] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    
    const getCategory = async () => {
        setIsLoading(true);
        const res = await fetch('/api/category');
          if(res.ok){
            const data = await res.json();
            setCategory(data);
          } else{
            throw new Error('Error fetching category');
          }
          setIsLoading(false);
    }

    useEffect(() => {
        getCategory();
    }, [])

  return (
    <div className='grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10  '>
        {isLoading && <div className="flex justify-center items-center col-span-full">
             <span className="loading loading-spinner loading-lg text-warning"></span>
        </div>}
         {category.map((res) => {
            return (
                <div key={res.id} onClick={() => router.push(`/cn?categoryId=${res.id}`)}>
                    <Image src={res.image_url} loading='lazy' width={128} height={188} alt={res.name}/>
                </div>
            )
        })}
    </div>
  )
}

export default Categories