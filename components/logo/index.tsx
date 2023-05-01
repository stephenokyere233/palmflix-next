import Link from 'next/link'
import React from 'react'

const Logo = () => {
  return (
      <Link href="/">
          <div className="uppercase flex relative">
              <h2 className='text-brand font-bold tracking-wider text-3xl '>
                  trailers</h2>
              <p className='absolute -right-10 -bottom-2 bg-white text-brand font-bold rounded-full px-3'>
                  home</p></div>
      </Link>
  )
}

export default Logo
