import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import { Button } from '../components/Button'
import { Input } from '../components/Input'
// import { URL } from 

export const Signup = () => {

    const [firstname, setfirstname] = useState('');
    const [lastname, setlastname] = useState('');
    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');
    const navigate = useNavigate();

    const API_url = import.meta.env.VITE_URL

    async function signup() {
        const response = await fetch(`${API_url}/user/signup`, {
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
        console.log(data)
        localStorage.setItem('jwttoken', data.token)
        if (data.token) {
            navigate("/dashboard")
        }


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
                    <Input
                    onChange={(e)=>{
                        setfirstname(e.target.value)
                    }} 
                    placeholder={"Om"} 
                    lable={"First Name"}/>

                        {/* <div className='flex flex-col gap-2'>
                            <div className='font-semibold'>First Name</div>
                            <input onChange={(e) => { setfirstname(e.target.value) }} className='w-full p-2 border-2 rounded-md border-gray-300' type="text" placeholder="Om" />
                        </div> */}

                       <Input
                    onChange={(e)=>{
                        setfirstname(e.target.value)
                    }} 
                    placeholder={"Singn"} 
                    lable={"Last Name"}/>

                        <Input
                    onChange={(e)=>{
                        setfirstname(e.target.value)
                    }} 
                    placeholder={"abc@gmail.com"} 
                    lable={"Email"}/>

                       <Input
                    onChange={(e)=>{
                        setfirstname(e.target.value)
                    }} 
                    placeholder={"@Abc1234"} 
                    lable={"Passowrd"}/>

                    </div>

                    {/* Action button and links */}
                    <div className='flex flex-col gap-2'>
                        {/* <button onClick={() => signup()} className="w-full bg-black font-Semibold text-white p-2 rounded-md hover:cursor-pointer">Sign Up</button> */}
                        <Button onClick={() => signup()} lable={"Sign Up"}/>
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