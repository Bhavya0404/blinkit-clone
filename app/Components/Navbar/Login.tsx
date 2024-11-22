import React from 'react'

const Login = () => {
  return (
    <div>
        <details className="dropdown ">
            <summary className='list-none flex items-center gap-1 hover:cursor-pointer font-normal'>Account
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