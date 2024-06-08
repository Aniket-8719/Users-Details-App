import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { EditUser } from '../features/userDetailsSlice';
import { toast } from 'react-toastify';

const Edit = () => {
    const {id} = useParams();
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [upadatedUser , setUpdatedUser] = useState();
    const {users, loading} = useSelector((c) => c.app);
   useEffect(()=>{
       if(id){
        const singleUser = users.filter((e)=> e.id === id);
        setUpdatedUser(singleUser[0]);
    }
   },[]);

   const newData = (e)=>{
         setUpdatedUser({...upadatedUser, [ e.target.name ]: e.target.value})
   }
   const handleSubmit = (e)=>{
    e.preventDefault();
    dispatch(EditUser(upadatedUser)).then(()=>{
      toast.success("Update Successfully");
      navigate("/");
    })
    .catch((e)=>{
      console.error("Error creating user:", error);
       toast.error("Failed");
    })
   }
   console.log(upadatedUser);
  return (
    <>
      <h1 className=" flex justify-center items-center mt-8 mx-auto text-5xl text-gray-900 font-bold">Edit Users</h1>
     <div className=" max-w-[500px] max-h-[800px] p-8 mx-auto bg-white shadow-2xl mt-12 rounded-lg">
     <form 
     onSubmit={handleSubmit}
     className="max-w-sm mx-auto" >
        <div className="mb-5">
          <label
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Name
          </label>
          <input
          onChange={newData}
            type="name"
            name="name"
            value={upadatedUser && upadatedUser.name}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            required
          />
        </div>
        <div className="mb-5">
          <label
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Your email
          </label>
          <input
          onChange={newData}
            type="email"
            name="email"
            value={upadatedUser && upadatedUser.email}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="name@123.com"
            required
          />
        </div>
        <div className="mb-5">
          <label
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Age
          </label>
          <input
          onChange={newData}
            type="text"
            name="age"
            value={upadatedUser && upadatedUser.age}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            required
          />
        </div>
        <div className="flex my-4">
          <div className="flex items-center me-4">
            <input
            onChange={newData}
              id="inline-radio"
              type="radio"
              name="gender"
              value="Male"
              checked={upadatedUser && upadatedUser.gender === "Male"}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
            />
            <label
              className="ms-2 text-sm font-medium text-gray-900 "
            >
              Male
            </label>
          </div>
          <div className="flex items-center me-4">
            <input
            onChange={newData}
              id="inline-2-radio"
              type="radio"
              name="gender"
              value="Female"
              checked={upadatedUser && upadatedUser.gender === "Female"}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
            />
            <label
              className="ms-2 text-sm font-medium text-gray-900"
            >
              Female
            </label>
          </div>
        </div>
        <button
          type="submit"
          className="mt-8 text-white flex justify-center items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-[170px] py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Update
        </button>
      </form>
     </div>
      
    </>
  )
}

export default Edit
