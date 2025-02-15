"use client"
import React, { useEffect, useRef, useState } from 'react'
import { io, Socket } from "socket.io-client";

const Cart = () => {
  const [userId, setUserId] = useState(null);
  const [totalQuantity, setTotalQuantity] = useState(0);

  const socketRef = useRef<Socket | null>(null);

  const socketInitializer = async () => {
    await fetch('/api/websocket')
    socketRef.current = io(undefined, {
      path: "/api/websocket",
    });

    socketRef.current.on('connect', () => console.log('Connected to WebSocket:'));

    socketRef.current.on('update-input', (msg: any)=> {
      console.log("client msg: ", msg)
      setInput(msg)
    })

    socketRef.current.on("disconnect", () => console.log("Disconnected from WebSocket"));
    socketRef.current.on("error", (err: any) => console.error("Socket error:", err));
  }
  const [input, setInput] = useState('')

  const onChangeHandler = (e: any) => {
    setInput(e.target.value);
    socketRef.current?.emit('input-change', e.target.value);
  }

  function getUserId(){
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      setUserId(JSON.parse(storedUser));
    }
  }

  const fetchCartDetails = async () => {
      if(userId){
          const response = await fetch('/api/cartdetails', {
              method: 'POST',
              headers: { 
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({id: userId}),
          });
          const data = await response.json();
          const totalQuantity = data.cart.reduce((sum: number, curr: any) => sum + curr.quantity, 0); // sum = 0, curr maps to each element in the array
          console.log("totalQuantity", totalQuantity);
          setTotalQuantity(totalQuantity);
      }
  }

  useEffect(() => {
      fetchCartDetails();
  }, [userId]);

  useEffect(() => {
    getUserId();  
    socketInitializer()
  }, [])
  return (
    <div>
      {/* <form action="">
      <input
    placeholder="Type something"
    value={input}
    onChange={onChangeHandler}
  />
  <button>Send</button>
      </form> */}
      <button className='btn bg-cart-green text-white flex items-center space-x-2 font-bold hover:bg-cart-green'> 
          <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>

          {totalQuantity ?  
          <div className='flex flex-col'>
            <p>{totalQuantity} items</p> 
            <p className='self-start'>₹120</p>
          </div>
          : <p>My Cart</p>
          }
        </button>
    </div>
  )
}

export default Cart