import { useEffect, useState } from "react"
import { Button } from "./Button"
import { useNavigate } from "react-router-dom"

export const Users = () => {

    const [users, setusers] = useState([])
    const [filter, setfilter] = useState('')
    const API_url = import.meta.env.VITE_URL

     async function filters() {
        const response = await fetch(`${API_url}/user/bulk?filter=${filter}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },

        })
        const result = await response.json()
        console.log(result)
        setusers(result.user);
    }
    useEffect(()=>{
        filters()
    },)
    console.log(users)

    return (
        <>
            <div className="font-bold mt-6 text-lg">
                Users
            </div>
            <div className="my-2">
                <input onChange={(e) => {
                    setfilter(e.target.value)
                }} type="text" placeholder="Search users..." className="w-full px-2 py-1 border rounded border-slate-200"></input>
            </div>
            <div>
                {users?.length > 0 && users.map((user, index) => (
                    <User user={user} key={user._id || index} />
                ))}
            </div>
        </>
    )
}

function User({ user }) {
    const navigate = useNavigate()
    return (
        <div className="flex justify-between m-2 p-1">

            <span className="flex items-center gap-2 ">
                <span className="text-purple-600 bg-purple-300 rounded-full w-10 h-10  text-3xl text-center flex justify-center items-center">
                    {user.firstname[0].toUpperCase()}</span>

                <span className="font-semibold">{user.firstname} {user.lastname}</span>

            </span>

            <span>
                <Button
                    onClick={(e) => {
                        navigate('/send?id=' + u._id + '&name=' + u.firstname)
                    }}
                    lable={"Send Money"} />
                {/*                                 
                                <button onClick={()=>{
                                    console.log("button clicked")
                                    navigate("/send?id="+ u._id + '&name=' + u.firstname)
                                    
                                }} className=" bg-black font-Semibold text-white p-2 rounded-md hover:cursor-pointer">Send Money</button> */}

            </span>

        </div>
    )
}