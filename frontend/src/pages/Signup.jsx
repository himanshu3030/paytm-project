import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
// import { URL } from 

export const Signup = () => {

    const [firstname, setfirstname] = useState('');
    const [lastname, setlastname] = useState('');
    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');
    const navigate = useNavigate();


    async function signup() {
        const response = await fetch(`http://localhost:3000/api/v1/user/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstname,
                lastname,
                username,
                password
            })
        })
        const data = await response.json();
        localStorage.setItem('jwttoken', data.token)
        navigate("/dashboard")

    }

    return (
        <div>
            <div className="w-full h-[100vh] bg-gray-400 flex justify-center items-center">

                <div className="bg-gray-200 w-80  flex flex-col justify-evenly p-5 rounded-md gap-4">

                    {/* Header */}
                    <div className="flex justify-center items-center flex-col">
                        <div className="text-3xl font-bold">Sign Up</div>
                        <div className='text-center mt-2 text-gray-500'>Enter your information to create account</div>
                    </div>

                    {/* Inputs Fields */}
                    <div>

                        <div className='flex flex-col gap-2'>
                            <div className='font-semibold'>First Name</div>
                            <input onChange={(e) => { setfirstname(e.target.value) }} className='w-full p-2 border-2 rounded-md border-gray-300' type="text" placeholder="Om" />
                        </div>

                        <div className='flex flex-col gap-2'>
                            <div className='font-semibold'>Last Name</div>
                            <input onChange={(e) => { setlastname(e.target.value) }} className='w-full p-2 border-2 rounded-md border-gray-300' type="text" placeholder="Singh" />
                        </div>

                        <div className='flex flex-col gap-2'>
                            <div className='font-semibold'>Email</div>
                            <input onChange={(e) => { setusername(e.target.value) }} className='w-full p-2 border-2 rounded-md border-gray-300' type="text" placeholder="abc@gmail.com" />
                        </div>

                        <div className='flex flex-col gap-2'>
                            <div className='font-semibold'>Password</div>
                            <input onChange={(e) => { setpassword(e.target.value) }} className='w-full p-2 border-2 rounded-md border-gray-300' type="text" placeholder="Om" />
                        </div>

                    </div>

                    {/* Action button and links */}
                    <div className='flex flex-col gap-2'>
                        <button onClick={() => signup()} className="w-full bg-black font-Semibold text-white p-2 rounded-md hover:cursor-pointer">Sign Up</button>
                        <div className='flex justify-center'>
                            <p>Already have an account?</p>
                            <Link className='font-mono text-decoration: underline ' to='/signin'>Login</Link>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    )
}