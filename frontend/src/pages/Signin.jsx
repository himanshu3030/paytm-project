import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const Signin = () => {
    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');
    const navigate = useNavigate();

    const API_url = import.meta.env.VITE_URL
    // console.log()

    async function signin() {
        const response = await fetch(`${API_url}/user/signin`, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                password
            }),
        })
        const data = await response.json();
        console.log(data.firstname)
        localStorage.setItem('jwttoken', data.token)

        // console.log(localStorage.getItem('jwttoken'))

        if(data.token){
            navigate('/dashboard?id='+ data._id + '&name=' + data.firstname)
            // navigate('/dashboard')
        }
    }

    return (
        <div>
            <div className="w-full h-[100vh] bg-gray-400 flex justify-center items-center">

                <div className="bg-gray-200 w-80  flex flex-col justify-evenly p-5 rounded-md gap-4">

                    {/* Header */}
                    <div className="flex justify-center items-center flex-col">
                        <div className="text-3xl font-bold">Sign In</div>
                        <div className='text-center mt-2 text-gray-500'>Enter your credential to access your account</div>
                    </div>

                    {/* Inputs Fields */}
                    <div>

                        <div className='flex flex-col gap-2'>
                            <div className='font-semibold'>Email</div>
                            <input onChange={(e) => { setusername(e.target.value) }} className='w-full p-2 border-2 rounded-md border-gray-300' type="text" placeholder="Om" />
                        </div>

                        <div className='flex flex-col gap-2'>
                            <div className='font-semibold'>Password</div>
                            <input onChange={(e) => { setpassword(e.target.value) }} className='w-full p-2 border-2 rounded-md border-gray-300' type="text" placeholder="password" />
                        </div>

                    </div>

                    {/* Action button and links */}
                    <div className='flex flex-col gap-2'>
                        <button onClick={()=>{signin()}} className="w-full bg-black font-Semibold text-white p-2 rounded-md hover:cursor-pointer">Sign In</button>
                        <div className='flex justify-center'>
                            <p>Don't have an account?</p>
                            <Link className='font-mono text-decoration: underline ' to='/signup'>Sign Up</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}