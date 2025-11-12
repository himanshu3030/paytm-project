import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
// import { Button } from '../components/Button'
// import { Input } from '../components/Input'
import { Users } from '../components/Users';


export const Dashboard = () => {
    const [searchParams] = useSearchParams();
    const name = searchParams.get('name')
    const [search, setsearch] = useState();
    const [data, setdata] = useState([]);
    const navigate = useNavigate();

    const API_url = import.meta.env.VITE_URL

    async function filter() {
        const response = await fetch(`${API_url}/user/bulk?filter=${search}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },

        })
        const result = await response.json()
        console.log(result)
        setdata(result.user);



    }
    useEffect(() => {
        console.log("type of :- ", typeof (data), data)
    }, [data])
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

                <Users/>

            </div>
        </div>
    )
}