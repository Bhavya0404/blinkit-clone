import Image from 'next/image'
import React from 'react'
import landingPageData from '../../../public/data/landingPage'
import Product from '../Product/Product';

const topData = landingPageData.topData;
const midData = landingPageData.midData;
const categoriesData = landingPageData.categoriesData;

const LandingPage = () => {
  return (
    <div className='w-8/12 h-full m-auto flex flex-col align-middle overflow-hidden'>
        <div>
            <Image src={topData.img} loading='lazy' width={1280} height={234} alt={topData.alt}/>
        </div>
        
        <div>
            <div className='flex gap-x-5 m-5 grow'>
                {midData.map((res) => {
                    return (
                        <div key={res.id}>
                            <Image src={res.img} loading='lazy' width={330} height={195} alt={res.alt}/>
                        </div>
                    )
                })}
            </div>
        </div>
        <div>
            <div className='grid grid-cols-10'>
                {categoriesData.map((res) => {
                    return (
                        <div key={res.id}>
                            <Image src={res.img} loading='lazy' width={128} height={188} alt={res.alt}/>
                        </div>
                    )
                })}
            </div>
        </div>
        <Product />
    </div>
  )
}

export default LandingPage