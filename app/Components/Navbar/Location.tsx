"use client";
import React, { useState, useEffect } from "react";
import { SearchBox } from "@mapbox/search-js-react";
const SearchBoxComponent = SearchBox as React.ElementType;

const Location = () => {
  const [isClient, setIsClient] = useState(false);
  const [currentLocation, setCurrentLocation] = useState('');
  const [location, setLocation] = useState('');

  let cordinates: any;


  useEffect(() => {
    setIsClient(true);
  }, [location]);

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
      console.log(loc);
      const lat = loc.coords.longitude;
      const lng = loc.coords.latitude;
      console.log(lat);
      console.log(lng);

      convertCordinates(lat, lng);
    }, (err) => {
      console.log("Error in geolocation", err);
    })
  }

  const convertCordinates = async (lat:number, lng: number) => {
    const data = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lat},${lng}.json?types=address&access_token=${process.env.NEXT_PUBLIC_MAP_API_KEY}`)
    const res = await data.json();
    const loc = res.features[0].place_name;
    setLocation(loc);
    console.log(loc);
    console.log(res);
  }
  

  const retrieveVal = (res:any) => {
    console.log("retrive", res);
    const loc = res.features[0].properties.name;
    setLocation(loc);
    cordinates = res.features[0].geometry.coordinates;
    console.log("val", location)
    console.log("val", cordinates)

  } 
  

  return (
    <div className="hover:cursor-pointer" onClick={openModal}>
      <p className="font-extrabold text-lg">Delivery in 8 minutes</p>
      <p className="font-normal text-sm">{location}</p>

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
                    {/* <input type="text" placeholder="search delivery location" className="input input-bordered max-w-xs" /> */}
                    <div>
                      <SearchBoxComponent
                        accessToken= {process.env.NEXT_PUBLIC_MAP_API_KEY}
                        options={{
                          language: 'en',
                          country: 'IN'
                        }}
                        // value={location}
                        onSuggest={(res:any) => console.log('suggest: ',res)}
                        onRetrieve={retrieveVal}
                        onSuggestError={(err:any) => console.log('error: ',err)}
                      />
                    </div>
                  </div>
                </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default Location;
