import React from 'react'

const Login = () => {
  return (
    <div>
        <details className="dropdown ">
            <summary className='list-none flex items-center gap-1 hover:cursor-pointer font-normal'>Account
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-4 font-black">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
            </summary>
            
            <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                <li><a>Item 1</a></li>
                <li><a>Item 2</a></li>
            </ul>
        </details>
    </div>
  )
}

export default Login