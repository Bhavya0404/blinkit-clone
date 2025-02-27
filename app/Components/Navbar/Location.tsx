"use client";
import React, { useState, useEffect } from "react";
import { SearchBox } from "@mapbox/search-js-react";
const SearchBoxComponent = SearchBox as React.ElementType;

const Location = () => {
  const [isClient, setIsClient] = useState(false);
  const [currentLocation, setCurrentLocation] = useState('');
  const [location, setLocation] = useState('');
  const [timeToDeliver, setTimeToDeliver] = useState('');

  let cordinates: any;


  useEffect(() => {
    const coordinates = sessionStorage.getItem('coordinates');
    if(coordinates){
      const [lat, lng] = coordinates.split(',');
      convertCordinatesToPlaceName(parseFloat(lat), parseFloat(lng));
      getClosestStore(parseFloat(lat), parseFloat(lng));
    }
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

  const detectLocationGPS = () => {
    navigator.geolocation.getCurrentPosition((loc) => {
      const lat = loc.coords.latitude;
      const lng = loc.coords.longitude;
      convertCordinatesToPlaceName(lat, lng);
      getClosestStore(lat, lng);
      setIsClient(false);

    }, (err) => {
      console.log("Error in geolocation", err);
    })
  }

  const convertCordinatesToPlaceName = async (lat:number, lng: number) => {
    const data = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?types=address&access_token=${process.env.NEXT_PUBLIC_MAP_API_KEY}`)
    const res = await data.json();
    const loc = res.features[0].place_name;
    setLocation(loc);
  }
  
  const getClosestStore = async (lat: number, lng: number) => {
    sessionStorage.removeItem('coordinates');
    sessionStorage.removeItem('store');
    sessionStorage.setItem('coordinates', `${lat},${lng}`);
    const res = await fetch('/api/getClosestStore', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ lat:lat , lng: lng }), // Send lat and lng in the request body
    })
    if(res.ok){
      const data = await res.json();
      sessionStorage.setItem('store', data.store_id);
      getTimeToDelivery(data.latitude, data.longitude, lat, lng);
      console.log(data);
    } else{
      throw new Error('Error fetching closest store to user');
    }        
  }

  const getTimeToDelivery = async (storeLat: number, storeLng: number, userLat: number, userLng: number) => {
    const data = await fetch(`https://api.mapbox.com/directions/v5/mapbox/driving-traffic/${storeLng},${storeLat};${userLng},${userLat}?language=en&overview=full&steps=true&access_token=${process.env.NEXT_PUBLIC_MAP_API_KEY}`)
    const res = await data.json();
    const duration = Math.ceil(res.routes[0].duration / 60);
    sessionStorage.setItem('timeToDeliver', duration.toString());
    setTimeToDeliver(duration.toString()); 
  }

  const retrieveVal = (res:any) => {
    cordinates = res.features[0].properties.coordinates;
    const loc = res.features[0].properties.full_address;
    console.log("cordinates", cordinates);
    console.log("loc", loc);
    setLocation(loc);
    getClosestStore(cordinates.latitude, cordinates.longitude);
    setIsClient(false);
  } 
  

  return (
    <div className="hover:cursor-pointer w-64 m-2 content-center" onClick={openModal}>
      <p className="font-extrabold text-lg">Delivery in {timeToDeliver} minutes</p>
      <p className="font-normal text-sm overflow-hidden text-ellipsis whitespace-nowrap">{location}</p>

      {isClient && (
        <dialog id="my_modal" className="modal">
          <div className="modal-box bg-location-bg rounded-none overflow-hidden h-80">
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                        ✕
                    </button>
                </form>
                <div className="w-full">
                  <h3 className="font-normal text-base mb-5">Change Location</h3>
                  <div className="w-full mb-2 flex justify-between items-center float-left">
                    <button className='btn bg-cart-green text-white hover:bg-cart-green rounded-none' onClick={detectLocationGPS}> 
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
