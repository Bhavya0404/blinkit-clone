import React from 'react'

interface AccountProps {
  userState: (user: any) => void;
}

const Account = ({userState}: AccountProps) => {
  const handleLogout = () => {
    // Clear user authentication data
    sessionStorage.removeItem('user'); 
    userState(null);
  };
  return (
    <div>
        <details className="dropdown ">

            <summary className='list-none flex items-center gap-1 hover:cursor-pointer font-normal'>Account
            </summary>
              
            <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                <li><a>My Orders</a></li>
                <li><a>Saved Address</a></li>
                <li onClick={handleLogout}><a>Log Out</a></li>
                {/* <li><a>{firstName} {lastName}</a></li> */}
            </ul>
        </details>

    </div>
  )
}

export default Account