import React, { useState } from "react";
import { useDispatch } from "react-redux";
import  {createUser}  from "../features/userDetailsSlice";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CraetePost = () => {

  const [users, setUsers] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

    const getUserData = (e)=>{
        setUsers({ ...users, [e.target.name] : e.target.value});
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        console.log("users...", users);
        dispatch(createUser(users))
        .then(() => {
          navigate("/");
          toast.success('successfully created');
        })
        .catch((error) => {
          // Handle error if any
          console.error("Error creating user:", error);
          // You can also display an error toast if needed
          toast.error('Failed to create form!', {
          });
        });
    };

    


  return (
    <>
     <div className=" max-w-[500px] max-h-[800px] p-8 mx-auto bg-white shadow-2xl mt-12 rounded-lg">
     <form onSubmit={handleSubmit} className="max-w-sm mx-auto" >
        <div className="mb-5">
          <label
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Name
          </label>
          <input
          onChange={getUserData}
            type="name"
            name="name"
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
          onChange={getUserData}
            type="email"
            name="email"
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
          onChange={getUserData}
            type="text"
            name="age"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            required
          />
        </div>
        <div className="flex my-4">
          <div className="flex items-center me-4">
            <input
            onChange={getUserData}
              id="inline-radio"
              type="radio"
              name="gender"
              value="Male"
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
            onChange={getUserData}
              id="inline-2-radio"
              type="radio"
              name="gender"
              value="Female"
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
          Submit
        </button>
      </form>
     </div>
    </>
  );
};

export default CraetePost;
