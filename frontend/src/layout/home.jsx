import React,{ useEffect} from 'react'
import AOS from 'aos';

const Home = () => {
  useEffect(() => {
    AOS.init();
  }, [])
  return (
    <>
      <div className='text-center' data-aos="fade-in">
        <h1><span className='fw-bolder'> Marklist </span> Management</h1>
      </div>
    </>
  )
}

export default Home
