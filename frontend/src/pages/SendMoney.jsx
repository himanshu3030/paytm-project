// import { useSearchParams } from
import { useSearchParams } from 'react-router-dom'
import { useState } from 'react';

export const SendMoney = () => {

 const[searchParams] = useSearchParams();
 const id = searchParams.get('id')
 const name = searchParams.get('name')
 const[amount, setamount] = useState();

 console.log("this the name : " , name)

 const API_url = import.meta.env.VITE_URL

async function transfer(){
    
    const response = await fetch(`${API_url}/account/transfer`,{
        method: 'POST',          
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${localStorage.getItem('jwttoken')}`
        },
        body: JSON.stringify({
            touser: id,
            amount
        })
    })
  }

    return (
        <div >
            <div className="w-full h-[100vh] bg-gray-400 flex justify-center items-center">


                <div className='bg-gray-200 w-80  flex flex-col items-center p-5 rounded-md gap-4'>
                    <div className="font-bold text-3xl items-center m-3 mb-7">Send Money</div>

                    <div className="">
                        <span className="flex flex-col items-center gap-2 ">
                            <span className="flex justify-center item-center text-white bg-green-500 rounded-full w-10 h-10 text-3xl">{name[0].toUpperCase()}</span>

                            <span className="font-semibold">{name}</span>

                        </span>
                    </div>

                    <div className='flex flex-col gap-2 w-full'>
                        <div className='font-semibold'>Amount (in Rs)</div>
                        <input onChange={(e)=>{
                               setamount(e.target.value)
                        }} className='w-full p-2 border-2 rounded-md border-gray-300' type="text" placeholder="Enter amount" />
                    </div>

                    <button onClick={()=>{transfer()}} className="w-full bg-green-500 font-Semibold text-white p-2 rounded-md hover:cursor-pointer">Initiate Transfer</button>

                </div>
            </div>
        </div>
    )
}