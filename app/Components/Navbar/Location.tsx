"use client";
import React, { useState, useEffect } from "react";

const Location = () => {
  const [isClient, setIsClient] = useState(false);
  const [currentLocation, setCurrentLocation] = useState('');


  useEffect(() => {
    setIsClient(true);
  }, []);

  const openModal = () => {
    if (isClient) {
      // Typecast the element as HTMLDialogElement to access showModal
      const modal = document.getElementById("my_modal") as HTMLDialogElement;
      if (modal) {
        modal.showModal();
      }
    }
  };

  const detectLocation = () => {
    navigator.geolocation.getCurrentPosition((loc) => {
      console.log(loc.coords.longitude);
      console.log(loc.coords.latitude);
    }, (err) => {
      console.log("Error in geolocation", err);
    })
  }
  

  return (
    <div className="hover:cursor-pointer" onClick={openModal}>
      <p className="font-extrabold text-lg">Delivery in 8 minutes</p>
      <p className="font-normal text-sm">New Delhi, Delhi, 110088, India</p>

      {isClient && (
        <dialog id="my_modal" className="modal">
          <div className="modal-box bg-location-bg rounded-none">
                <form method="dialog">
                    {/* The button within the form closes the modal automatically */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                        ✕
                    </button>
                </form>
                <div className="w-full">
                  <h3 className="font-normal text-base mb-5">Change Location</h3>
                  <div className="w-11/12 mb-2 flex justify-between items-center float-left">
                    <button className='btn bg-cart-green text-white hover:bg-cart-green rounded-none' onClick={detectLocation}> 
                      Detect my location
                    </button>
                    <p>OR</p>
                    <input type="text" placeholder="search delivery location" className="input input-bordered max-w-xs" />
                  </div>
                </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default Location;
