import React, { useState } from 'react'
import { AiOutlineArrowUp, AiOutlineArrowDown, AiOutlineFunction } from "react-icons/ai"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { format } from 'date-fns'


function Todo() {
  const [inp, setInp] = useState()
  const [data, setData] = useState([])
  const [yes, setbtn] = useState(0)
  const newdate = new Date();
  const formittime = format (newdate,"yyyy-mm-dd HH:mm:ss")
  
console.log(formittime,inp,"test")
const handleKeyPress = (e) => {

    if (e.key==='Enter') {
      handleSave()
    }
   
  }

  function handleChange(e) {
    setInp(e.target.value)
  }

  function handleSave() {
    if (inp !== "") {
      setData([...data , [inp,formittime]])
      setInp('')
      toast.success("Successfully Submitted")
    }

    else {
      toast.error("Please Enter Something")
    }
  }
  function handeldell(index) {
    var arr = [...data]
    arr.splice(index, 1)
    setData(arr);
    toast.success("successfully daleted ")

  }
  const [myindex, setmyindex] = useState(-1)
  function handeledit(index) {
    setInp(data[index])
    setmyindex(index)
    setbtn(1)
    toast.success("successfully in input")
  }

  function handleUpdate() {
    data[myindex] = inp;
    setData([...data]);
    setbtn(0)
    toast.success("successfully update")
  }
  function handleUp(index) {
    if (index == 0) {
      toast.warning("already at the top")

    }
    else {
      var temp = data[index]
      data[index] = data[index - 1]
      data[index - 1] = temp
      setData([...data])
    }
  }
  function handelddown(index) {

    if (data.length - 1 === index) {
      toast.warning('already at the bottom')



    } else {
      var x = data[index]
      data[index] = data[index, 1]
      data[index + 1] = x
      setData([...data])
    }
  }


  return (
    <>
      <h1 className="text-red-600 text-center text-[50px]">TODO LIST</h1>
      <div>


        <input className='border-2 border-black  mt-[80px] ml-[39%] w-[12%]' onChange={handleChange} value={inp} onKeyPress={handleKeyPress} type="text" placeholder='Enter' />
        {
          yes === 0 && <button className='bg-blue-600 text-white h-[5vh] w-[7%] rounded-[30px] ml-[2%]' onClick={handleSave} >Submit</button>
        }
        {
          yes === 1 && <button onClick={handleUpdate} className='bg-blue-600 text-white h-[5vh] w-[7%] rounded-[30px] ml-[2%]'>Update</button>
        }

      </div>

      <table className='mx-auto border-2 border-black mt-[60px] w-[30%]'>
        <tr>
          <th>Sr</th>
          <th className='text-red-600 border-2 border-black  '>Name</th>
          <th className='text-red-600 border-2 border-black '>Date/Time</th>
          <th className='text-green-600 border-2 border-black '>delete</th>
          <th className='text-yellow-500 border-2 border-black '>edit</th>
          <th className='text-yellow-500 border-2 border-black '>up</th>
          <th className='text-yellow-500 border-2 border-black '>down</th>

          
          
        </tr>

        {data.map((ele, index) => (
          <tr className='text-center'>
            <td>{index}</td>
            <td>{ele[0]}</td>
            <td>{ele[1]}</td>
            <td className='text-red-454'><button onClick={() => { handeldell(index) }}>Delete</button></td>
            <td><button onClick={() => { handeledit(index) }}>Edit</button></td>
    
            <td> <AiOutlineArrowUp onClick={() => { handleUp(index) }} /></td>
            <td>  <AiOutlineArrowDown onClick={() => { handelddown(index) }} /></td>
          </tr>
        ))}
      </table>


    </>
  )
}


export default Todo;