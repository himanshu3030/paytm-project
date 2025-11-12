export const Input = ({ placeholder, onChange, lable }) => {
    return (
        <div className='flex flex-col gap-2'>
            <div className='font-semibold'>{lable}</div>
            <input onChange={onChange} className='w-full p-2 border-2 rounded-md border-gray-300'  placeholder={placeholder} />
        </div>
    )
}