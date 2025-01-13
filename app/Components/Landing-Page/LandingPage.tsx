import Image from 'next/image'
import landingPageData from '../../../public/data/landingPage'
import Product from '../Product/Product';
import Categories from '../Categories';

const topData = landingPageData.topData;
const midData = landingPageData.midData;

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
            <Categories />
        </div>
    </div>
  )
}

export default LandingPage