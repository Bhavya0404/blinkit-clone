import Image from 'next/image'
import React from 'react'

const NumberModal = () => {
  return (
    <dialog id="login_modal" className="modal">
            <div className="modal-box h-80">
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
              </form>
              <div className='flex flex-col justify-between items-center h-full'>
                <div>
                  <Image src="https://cdn.grofers.com/layout-engine/2023-11/app_logo.svg" width={64}
                    height={64} alt="Blinkit" />
                </div>
                <div>
                  <p className='font-bold text-2xl'>India's last minute app</p>
                  <p className='font-medium text-center'>Log in or Sign up</p>
                </div>
                <form action="">
                  <div className='h-28 flex flex-col justify-around'>
                    <label className="input input-bordered flex items-center gap-4">
                      <p className='font-medium'>+91</p>
                      <input type="text" className="grow" placeholder="Enter mobile number" />
                    </label>

                    <button className="btn btn-wide">Continue</button>
                  </div>
                </form>
                <div>
                  <p className='text-sm'>By continuing, you agree to our Terms of service & Privacy policy</p>
                </div>
              </div>
            </div>
          </dialog>
  )
}

export default NumberModal