import Image from 'next/image'
import landingPageData from '../../../public/data/landingPage'
import Product from '../../product/Components/Product';
import Categories from '../Categories';
import ProductCarousel from './ProductCarousel';
import Footer from './Footer';

const topData = landingPageData.topData;
const midData = landingPageData.midData;

const LandingPage = () => { 
  return (
    <div className='flex flex-col items-center overflow-hidden'>
        <div className='min-w-[1280px] h-[234px]'>
            <Image src={topData.img} loading='lazy' width={1280} height={234} alt={topData.alt}/>
        </div>
        
        <div className='w-[1280px] overflow-hidden'>
            <div className='flex items-center gap-5 m-4'>
                {midData.map((res) => {
                    return (
                        <div key={res.id} className='h-[195px] w-[330px] shrink-0'>
                            <Image src={res.img} loading='lazy' width={330} height={195} alt={res.alt}/>
                        </div>
                    )
                })}
            </div>
        </div>

        <div>
            <Categories />
        </div>

        <div className='w-[1280px]'>
            <ProductCarousel />
            <ProductCarousel />
            <ProductCarousel />
        </div>

        <div className='mt-7'>
            {/* <Footer /> */}
        </div>
    </div>
  )
}

export default LandingPage