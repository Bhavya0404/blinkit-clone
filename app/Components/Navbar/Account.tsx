import React from 'react'

const Account = ({firstName, lastName}: { firstName: string; lastName: string }) => {
  return (
    <div>
        <details className="dropdown ">
            <summary className='list-none flex items-center gap-1 hover:cursor-pointer font-normal'>Account
            </summary>
              
            <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                <li><a>My Orders</a></li>
                <li><a>Saved Address</a></li>
                <li><a href="/api/auth/logout">Log Out</a></li>
                <li><a>{firstName} {lastName}</a></li>
            </ul>
        </details>
    </div>
  )
}

export default Account