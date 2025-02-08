import Image from 'next/image'
import React, { useState } from 'react'

interface NumberModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NumberModal = ({isOpen, onClose}: NumberModalProps) => {
  const [number, setNumber] = useState('');

  const validateNumber = () => {
    console.log(parseInt(number));
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    
    // Allow only numbers (0-9) and limit to 10 digits
    if (/^\d{0,10}$/.test(value)) {
      setNumber(value);
    }
  };

  const resetInput = () => {
    onClose();
    setNumber('');
  }
  return (
    <dialog id="login_modal" className="modal" open={isOpen}>
            <div className="modal-box h-80">
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={resetInput}>✕</button>
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
                <form action="#">
                  <div className='h-28 flex flex-col justify-around'>
                    <label className="input input-bordered flex items-center gap-4">
                      <p className='font-medium'>+91</p>
                      <input type="text" className="grow" inputMode="numeric"  value={number} placeholder="Enter mobile number" onChange={handleInputChange} />
                    </label>

                    <button className="btn btn-wide bg-add-button text-white" disabled={number.length !== 10}  onClick={validateNumber}>Continue</button>
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