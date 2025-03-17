import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Todo = () => {
    const [form , setForm] = useState({task : '' , completed : false});
    const [Tasks , setTasks ] = useState([]);
    const [taskId , setTaskId] = useState(null);

    useEffect(()=>{
        fetchTask();
    } , []);

    const fetchTask = async ()=>{
      const res=  await axios.get(`${API_BASE_URL}/task`);
        setTasks(res.data)
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            if(taskId){
                await axios.put(`${API_BASE_URL}/task/${taskId}` , form)
                setTaskId(null); 
                setForm({task : '' , completed : false});
                fetchTask();

            }
            else{

            
            await axios.post(`${API_BASE_URL}/task` , form)
            setForm({task : '' , completed : false});
            fetchTask();
            console.log("form submitted")
            }
        }catch(err){
            console.log("form submission Error " , err);
        }
        

    }
    const handleDelete = async (id) =>{
      const yes =   window.confirm("Are you sure you want to delete?")
      if (!yes){
        console.log("Task Deletion Canceled");
        return;
      }
         await axios.delete(`${API_BASE_URL}/task/${id}`);
         fetchTask();
            console.log('Task deleted')
    }

    const handleStatus = async (id , currStatus ) =>{
       await axios.patch(`${API_BASE_URL}/task/${id}`   , { completed: !currStatus });
        fetchTask();
    }

    const handleUpdate = async (Task ) =>{
            setTaskId(Task._id);
            setForm({task : Task.task , completed : false})
    }

   
    
  return (
    <div>
        <div className='w-full h-16 flex items-center justify-center '>
      <h1 className='font-bold text-purple-500 text-2xl  ' >  Welcome to Your To-Do App ✅</h1>
        </div>

    <div className='w-full h-full flex justify-center items-center'>
        <form action="" onSubmit={handleSubmit}>
            <input type="text" name="task" id="task" placeholder='Enter your Task...' value={form.task} onChange={(e)=>setForm({...form , task : e.target.value})}
             className='h-12 w-96 border-4 border-b-purple-700 border-t-purple-700 border-l-purple-700 border-r-purple-700 outline-none rounded-md bg-gradient-to-r from-purple-300  px-2 py-1
            mt-10 placeholder:text-black  placeholder:opacity-30  placeholder:text-xl  text-xl text-black text-opacity-80' />

            <div className='w-full flex justify-center items-center'>
                <button type='submit' className='px-3 py-2 bg-green-500 border-none rounded-lg text-lg text-center text-black hover:bg-green-600 active:scale-90  mt-10 font-semibold'>
                    {taskId ? "Re-write" : "Create Task"}
                </button>
            </div>
        </form>

  


    </div>
    <div className='flex justify-center items-center flex-col-reverse gap-y-1 '> 
        {Tasks.length > 0 ? (
       Tasks.map((Task)=>(
        <ul key={Task._id} className='flex justify-center items-center flex-col  h-40  w-96 mt-10 border border-purple-400 rounded-md bg-purple-100 '>

            <li className='font-semibold text-2xl text-black mt-6 ' >
                {Task.task}
            </li>

            <li className='flex items-center justify-center flex-row mt-4'>
             <p className='font-medium text-xl text-gray-500 mt-2' >Status : </p> <p className='font-medium text-xl mt-2'>  {Task.completed ? " ✅ Completed" : " ❌ Pending" }</p>
            </li>

            
            <div>

            <button onClick={()=> handleDelete(Task._id) } className='px-2 py-1 bg-red-500 text-white border rounded-md text-center -ml-44  -translate-x-3 hover:bg-red-600 translate-y-8' >
                Delete
            </button>

            </div>
            <div className='w-full flex justify-end  ' onClick={()=> handleUpdate(Task) } >
                <button  className='px-2 py-1 bg-yellow-500 text-white border rounded-md text-center mb-5   hover:bg-yellow-600 -translate-x-40 -translate-y-1 '>
                Re-write
                </button>
            </div>

            <div className='w-full flex justify-end  ' onClick={()=> handleStatus(Task._id , Task.completed) } >
                <button  className='px-2 py-1 bg-blue-500 text-white border rounded-md text-center -mb-8     hover:bg-blue-600 -translate-y-14 '>
                    {Task.completed ?  "Mark Undone" : "Mark Done" }
                </button>
            </div>

        </ul>

       ))
    ) : <p className="text-center text-gray-500 mt-56">No tasks available</p> }

     </div>

    </div>
  )
}

export default Todo
