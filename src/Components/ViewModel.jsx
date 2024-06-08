import React from 'react'
import { useSelector } from 'react-redux';

const ViewModel = ({id, showPopup, setshowPopup}) => {
    const allUsers = useSelector((c) => c.app.users);
    const singleUser = allUsers.filter((ele)=> ele.id === id);
  return (
    <>
{/* <!-- Main modal --> */}
<div className='fixed top-0 left-0 w-full h-full flex items-center justify-center'>
    <div className="overflow-y-auto overflow-x-hidden bg-black bg-opacity-50 fixed top-0 right-0 bottom-0 left-0 z-50"></div>
    <div className="z-50 relative bg-white rounded-lg shadow-lg w-full max-w-lg">
        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
            <h3 className="text-xl font-bold text-gray-900">
            {singleUser[0].name}
            </h3>
            <button onClick={()=>{setshowPopup(false)}} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="static-modal">
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
            </button>
        </div>
        <div className="p-4 md:p-5 space-y-4">
            <p className="text-base leading-relaxed text-gray-900">
            <span className='text-gray-900 font-bold'>Email:</span> {singleUser[0].email}
            </p>
            <p className="text-base leading-relaxed text-gray-900 ">
            <span className='text-gray-900 font-bold'>Age:</span> {singleUser[0].age}
            </p>
            <p className="text-base leading-relaxed text-gray-900 ">
            <span className='text-gray-900 font-bold'>Gender:</span> {singleUser[0].gender}
            </p>
        </div>
    </div>
</div>


      
    </>
  )
}

export default ViewModel
