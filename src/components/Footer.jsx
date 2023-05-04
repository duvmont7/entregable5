import React from 'react'

const Footer = () => {
  return (
    <section className='relative'>
        <div className='h-10 bg-red-600 '></div>
        
        <div className='h-5 bg-black '></div>

        <div className="h-20 aspect-square rounded-full bg-white border-[8px] border-black absolute bottom-2 left-1/2 -translate-x-1/2 after:content-[''] after:h-12 after:aspect-square after:rounded-full  after:absolute after:border-[7px] after:border-black after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2"></div>
        <div className='h-10 bg-white'></div>
    </section>
  )
}

export default Footer