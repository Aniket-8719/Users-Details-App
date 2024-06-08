import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteUser, showData } from "../features/userDetailsSlice";
import ViewModel from "./ViewModel";
import { toast } from "react-toastify";

const ShowData = () => {
  const dispatch = useDispatch();
  const [showPopup, setshowPopup] = useState(false);
  const [id, setId] = useState();
  const [redioData, setRadioData] = useState("");
  const { users, loading, searchData } = useSelector((c) => c.app);

  
  useEffect(() => {
    dispatch(showData());
  }, [dispatch] );

  useEffect(() => {
    let handler = () => {
      setshowPopup(false);
    };
    document.addEventListener("mousedown", handler);
    // return () => {
    //   document.removeEventListener("mousedown", handler);
    // };
  }, []);

  if (loading) {
    return (
      <div className="absolute top-[50%] left-[50%]">
        <h1 className="font-bold text-2xl">Loading...</h1>
      </div>
    );
  }
  return (
    <>
      {/* popup after clicking view */}
      {showPopup && (
        <ViewModel id={id} showPopup={showPopup} setshowPopup={setshowPopup} />
      )}
      <h1 className="flex justify-center items-center mt-8 mx-auto text-5xl text-gray-900 font-bold">
        All Users
      </h1>
      <div className="flex justify-center items-center mt-8">
        <div className="flex items-center me-4">
          <input
            onChange={(e)=>{setRadioData("")}}
            type="radio"
            checked={redioData === ""}
            name="gender"
            className="w-4 h-4 text-blue-600 bg-gray-900 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600"
          />
          <label
            className="ms-2 text-md font-medium text-gray-900"
          >
            All
          </label>
        </div>
        <div className="flex items-center me-4">
          <input
          onChange={(e)=>{setRadioData(e.target.value)}}
            type="radio"
            value="Male"
            checked={redioData === "Male"}
            name="gender"
            className="w-4 h-4 text-blue-600 bg-gray-900 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600"
          />
          <label
            className="ms-2 text-md font-medium text-gray-900"
          >
            Male
          </label>
        </div>
        <div className="flex items-center me-4">
          <input
          onChange={(e)=>{setRadioData(e.target.value)}}
            type="radio"
            value="Female"
            checked={redioData === "Female"}
            name="gender"
            className="w-4 h-4 text-blue-600 bg-gray-900 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600"
          />
          <label
            className="ms-2 text-md font-medium text-gray-900"
          >
            Female
          </label>
        </div>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8 items-center justify-center px-8 mx-auto md:mx-auto lg:max-w-[1400px] md:max-w-[900px] my-12">
        {users &&
          users
            .filter((e) => {
              if (searchData.length === 0) {
                return e; // Include all users if searchData is not defined or not a string or empty
              } else {
                return e.name.toLowerCase().includes(searchData.toLowerCase());
              }
            })
            .filter((e)=>{
              if(redioData === "Male"){
                return e.gender === redioData;
              }else if(redioData === "Female"){
                return e.gender === redioData;
              }else{
                return e;
              }
            })
            
            .map((ele) => (
              <div
                key={ele.id}
                className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow"
              >
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                  {ele.name}
                </h5>
                <h5>{ele.email}</h5>
                <p className="mb-3 font-normal text-gray-700">{ele.gender}</p>
                <div className="flex justify-between items-center mt-8">
                  <Link
                    onClick={() => {
                      setshowPopup(true);
                      setId(ele.id);
                    }}
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                  >
                    View
                  </Link>
                  <Link
                    to={`/edit/${ele.id}`}
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                  >
                    Edit
                  </Link>
                  <Link
                    onClick={() => {
                      dispatch(deleteUser(ele.id));
                      toast.success("Deleted Successfully");
                    }}
                    
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                  >
                    Delete
                  </Link>
                </div>
              </div>
            ))}
      </div>
    </>
  );
};

export default ShowData;
