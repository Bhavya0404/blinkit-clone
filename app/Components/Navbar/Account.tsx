import React from 'react'

const Account = () => {
  return (
    <div>
        <details className="dropdown ">
            <summary className='list-none flex items-center gap-1 hover:cursor-pointer font-normal'>Account
            </summary>
              
            <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                <li><a>My Orders</a></li>
                <li><a>Saved Address</a></li>
                <li>Log Out</li>
                {/* <li><a>{firstName} {lastName}</a></li> */}
            </ul>
        </details>
    </div>
  )
}

export default Account