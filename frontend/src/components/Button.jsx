

export const Button = ({lable, onClick}) =>{
    return(
        <button onClick={onClick} className="w-full bg-black font-Semibold text-white p-2 rounded-md hover:cursor-pointer">{lable}</button>
    )
}