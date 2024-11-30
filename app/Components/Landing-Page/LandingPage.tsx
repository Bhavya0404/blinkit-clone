import Image from 'next/image'
import React from 'react'
import landingPageData from '../../../public/data/landingPage'

const midData = landingPageData.midData;
const categoriesData = landingPageData.categoriesData;

const LandingPage = () => {
  return (
    <div className='w-8/12 h-screen m-auto flex flex-col align-middle overflow-x-hidden'>
        <div className='w-screen'>
            <Image src="https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=2700/layout-engine/2022-05/Group-33704.jpg" loading='lazy' width={1280} height={234} alt='pan-corner'/>
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
    </div>
  )
}

export default LandingPage