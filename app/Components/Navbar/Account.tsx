import React from 'react'
import { setUser } from '@/lib/redux/features/user/userSlice';
import { useAppDispatch } from '@/lib/redux/hook';

interface AccountProps {
  userState: (user: any) => void;
}

const Account = ({userState}: AccountProps) => {
  const dispatch = useAppDispatch();
    
  const handleLogout = () => {
    dispatch(setUser(null));
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