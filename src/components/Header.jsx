import React from 'react'

function Header() {
  return (
    <>
      <div className='bg-purple-600 p-4 flex sm:gap-2 gap-1 justify-between font-semibold text-white '>
        <div className='text-xl'>TodoApp</div>
        <ul className='flex sm:gap-8 gap-4 justify-center'>
          <li>Home</li>
          <li>About Us</li>
        </ul>
      </div>
    </>
  )
}

export default Header