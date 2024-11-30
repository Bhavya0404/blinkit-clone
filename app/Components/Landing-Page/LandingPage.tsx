import Image from 'next/image'
import React from 'react'

const categoriesData = [
    {
        id: 1,
        img: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/layout-engine/2022-12/paan-corner_web.png",
        alt: "Paan-corner"
    },
    {
        id: 2,
        img: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/layout-engine/2022-11/Slice-2_10.png",
        alt: "Paan-corner"
    },
    {
        id: 3,
        img: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/layout-engine/2022-11/Slice-3_9.png",
        alt: "Paan-corner"
    },
    {
        id: 4,
        img: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/layout-engine/2022-11/Slice-4_9.png",
        alt: "Paan-corner"
    },
    {
        id: 5,
        img: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/layout-engine/2022-11/Slice-5_4.png",
        alt: "Paan-corner"
    },
    {
        id: 6,
        img: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/layout-engine/2022-11/Slice-6_5.png",
        alt: "Paan-corner"
    },
    {
        id: 7,
        img: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/layout-engine/2022-11/Slice-7_3.png",
        alt: "Paan-corner"
    },
    {
        id: 8,
        img: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/layout-engine/2022-11/Slice-8_4.png",
        alt: "Paan-corner"
    },
    {
        id: 9,
        img: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/layout-engine/2022-11/Slice-9_3.png",
        alt: "Paan-corner"
    },
    {
        id: 10,
        img: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/layout-engine/2022-11/Slice-10.png",
        alt: "atta-rice"
    },
    {
        id: 11,
        img: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/layout-engine/2022-11/Slice-11.png",
        alt: "Paan-corner"
    },
    {
        id: 12,
        img: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/layout-engine/2022-11/Slice-12.png",
        alt: "Paan-corner"
    },
    {
        id: 13,
        img: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/layout-engine/2022-11/Slice-13.png",
        alt: "paan-corner"
    },
    {
        id: 14,
        img: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/layout-engine/2022-11/Slice-14.png",
        alt: "paan-corner"
    },
    {
        id: 15,
        img: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/layout-engine/2022-11/Slice-15.png",
        alt: "paan-corner"
    },
    {
        id: 16,
        img: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/layout-engine/2022-11/Slice-16.png",
        alt: "paan-corner"
    },
    {
        id: 17,
        img: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/layout-engine/2022-11/Slice-17.png",
        alt: "paan-corner"
    },
    {
        id: 18,
        img: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/layout-engine/2022-11/Slice-18.png",
        alt: "paan-corner"
    },
    {
        id: 19,
        img: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/layout-engine/2022-11/Slice-19.png",
        alt: "paan-corner"
    },
    {
        id: 20,
        img: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/layout-engine/2022-11/Slice-20.png",
        alt: "paan-corner"
    },
    

]

const midData = [
    {
        id: 1,
        img: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=720/layout-engine/2023-07/print_crystal_WEB_0.jpg",
        alt: "paan-corner"
    },
    {
        id: 2,
        img: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=720/layout-engine/2023-07/pharmacy-WEB.jpg",
        alt: "paan-corner"
    },
    {
        id: 3,
        img: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=720/layout-engine/2023-07/Pet-Care_WEB.jpg",
        alt: "paan-corner"
    },
    {
        id: 4,
        img: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=720/layout-engine/2023-03/babycare-WEB.jpg",
        alt: "paan-corner"
    },
]


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