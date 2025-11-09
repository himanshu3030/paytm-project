import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';


export const Dashboard = () => {
  const[searchParams] = useSearchParams();
  const name = searchParams.get('name')
    const[search, setsearch] = useState();
    const[data, setdata] = useState([]);
    const navigate = useNavigate();

    const API_url = import.meta.env.VITE_URL

   async function filter(){
        const response = await fetch(`${API_url}/bulk?filter=${search}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            
        })
       const result = await response.json()
        setdata(result.user);
        
        
       
    }
    useEffect(()=>{
        console.log("type of :- ", typeof(data), data)
    },[data])
    return (
        <div>
            <div className="flex flex-col gap-3">

                {/* Appbar Component */}

                <div className='flex justify-between p-2 border-b-2 border-gray-200'>
                    {/* Logo */}
                    <span className=" font-bold text-2xl ">
                        PayTM App
                    </span>
                    {/* Profile */}
                    <span className="flex gap-4 justify-center items-center">
                        <p className="font-semibold">{name}</p>
                        <div className="text-purple-600 bg-purple-300 p-1 rounded-full pl-3 pr-3 text-3xl">U</div>
                    </span>
                </div>

                {/* Balance Componrnt */}

                <div className="p-4 border-b-2 border-gray-200">
                    <span className='font-semibold '>Your Balance : </span>
                    <span className="font-bold">Rs 10,000</span>
                </div>

                {/* Users display component */}

                <div className='flex flex-col gap-3 p-4'>
                    <div className="font-extrabold">Users</div>

                    <div className="border-gray-200 border-2 rounded-md p-2">
                        <input onChange={(e) => {setsearch(e.target.value)}} className="w-full" type="text" placeholder="Search users... " />
                       
                    </div>
                     <button onClick={()=>{filter()}} className='text-white bg-black font-semibold rounded-md p-1'>search</button>
                     {/* User component */}
                    {data && data.map((u)=>(
                            <div >
                        <div key={u._id} className="flex justify-between m-2 p-1">

                            <span className="flex items-center gap-2 ">
                                <span className="text-purple-600 bg-purple-300 rounded-full w-10 h-10  text-3xl text-center flex justify-center items-center">
                                    {u.firstname[0].toUpperCase()}</span>

                                <span className="font-semibold">{u.firstname} {u.lastname}</span>

                            </span>

                            <span>
                                <button onClick={(e)=>{
                                    navigate("/send?id="+ u._id + '&name=' + u.firstname)
                                }} className="bg-black font-Semibold text-white p-2 rounded-md hover:cursor-pointer">Send Money</button>
                            </span>

                        </div>
                    </div>
                    ))}
                    <div>
                        <div className="flex justify-between m-2 p-1">

                            <span className="flex items-center gap-2 ">
                                <span className="flex justify-center item-center text-purple-600 bg-purple-300  rounded-full w-10 h-10 text-3xl">H</span>

                                <span className="font-semibold">Himanshu Singh</span>

                            </span>

                            <span>
                                <button  className="bg-black font-Semibold text-white p-2 rounded-md hover:cursor-pointer">Send Money</button>
                            </span>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}