import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

import { motion } from 'framer-motion';

import { IoIosArrowForward } from 'react-icons/io';
import { useFetchProductQuery } from '../store';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { Skeleton } from '../components';
import { BsHeart } from 'react-icons/bs';
import ProductsCarousel from '../components/ProductsCarousel';
import useWindowWidth from '../hooks/use-windowWidth';

const ProductPage = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useFetchProductQuery(id);
  const windowWidth = useWindowWidth();

  let content;
  if (isLoading) {
    content = (
      <section className='flex mt-6 flex-wrap container justify-center gap-8 p-4 mx-auto'>
        <Skeleton className='min-h-[49vh] w-full md:w-2/5' times={1} />
        <div className='w-full md:w-1/3'>
          <Skeleton times={1} className='w-2/3 h-12' />
          <Skeleton times={1} className='w-2/4 h-14' />
          <div className='flex items-center gap-4'>
            <Skeleton times={1} className='w-1/3 h-12' />
            <Skeleton times={1} className='w-12 h-12 rounded-full' />
          </div>
          <Skeleton times={1} className='w-full h-8' />
          <Skeleton times={1} className='w-full h-8' />
          <Skeleton times={1} className='w-full h-8' />
          <Skeleton times={1} className='w-full h-8' />
        </div>
      </section>
    );
  } else if (error) {
    content = (
      <section className='min-h-[49vh] flex items-center justify-center'>
        <p>Something went wrong</p>
      </section>
    );
  } else {
    content = (
      <section className='flex mt-6 flex-wrap container justify-center gap-8 p-4 mx-auto'>
        <div className='md:min-h-[49vh] flex items-center justify-center p-4 w-full md:w-2/5'>
          <LazyLoadImage
            src={data.image}
            className='w-full max-h-[49vh] object-center object-contain'
          />
        </div>
        <div className='w-full md:w-1/3'>
          <h2 className='font-semibold'>{data.title}</h2>
          <p className='font-bold text-3xl p-2'>${data.price}</p>
          <div className='flex items-center gap-4'>
            <button className='btn btn-black'>Add to cart</button>
            <button
              times={1}
              className='w-11 h-11 leading-[0] rounded-full border border-black text-xl flex items-center justify-center'
            >
              <BsHeart />
            </button>
          </div>
          <p className='mt-4'>{data.description.substring(0, 300)}..</p>
        </div>
      </section>
    );
  }

  let similarContent;
  if (isLoading) {
    if (windowWidth < 620) {
      similarContent = (
        <div className='flex justify-center items-center flex-wrap'>
          <Skeleton times={1} className='w-full max-w-[300px] mt-4 h-96' />
        </div>
      );
    } else if (windowWidth < 930) {
      similarContent = (
        <div className='flex justify-between items-center flex-wrap'>
          <Skeleton times={2} className='w-full max-w-[300px] mt-4 h-96' />
        </div>
      );
    } else if (windowWidth < 1340) {
      similarContent = (
        <div className='flex justify-between items-center flex-wrap'>
          <Skeleton times={3} className='w-full max-w-[300px] mt-4 h-96' />
        </div>
      );
    } else {
      similarContent = (
        <div className='flex justify-between items-center flex-wrap'>
          <Skeleton times={4} className='w-full max-w-[300px] mt-4 h-96' />
        </div>
      );
    }
  }

  return (
    <motion.main
      initial={{ opacity: 0, translateX: 999 }}
      animate={{ opacity: 1, translateX: 0 }}
      exit={{ opacity: 0, translateX: 999 }}
      transition={{ duration: 0.4 }}
    >
      <section className='container text-indigo-600 p-4 mx-auto flex gap-2 items-center'>
        <Link to='/'>Home</Link>
        <span>
          <IoIosArrowForward className='text-sm' />
        </span>
        <Link to='/products'>Products</Link>
        <span>
          <IoIosArrowForward className='text-sm text-black' />
        </span>
        <p className='text-black'>product-{data?.id || ''}</p>
      </section>

      {content}

      <section className='mt-2 container p-4 mx-auto'>
        <h2 className='text-xl md:2xl font-semibold'>You will Love it!</h2>

        {data ? (
          <ProductsCarousel categoryName={data.category} />
        ) : (
          similarContent
        )}
      </section>
    </motion.main>
  );
};

export default ProductPage;
