"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';

interface Category {
    id: string;
    name: string;
    display_order: number;
    is_active: boolean;
    image_url: string;
}

const Categories = () => {
    const [category, setCategory] = useState<Category[]>([]);
    const router = useRouter();
    
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

  return (
    <div className='grid grid-cols-10'>
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