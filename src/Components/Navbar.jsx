import React, { useEffect, useState, useRef} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { searchUser } from "../features/userDetailsSlice";
import { AiOutlineMenuFold } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import { CiSearch } from "react-icons/ci";

const Navbar = () => {
  const allUsers = useSelector((c) => c.app.users);
  const dispatch = useDispatch();
  const [searchData, setSearchData] = useState("");
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    dispatch(searchUser(searchData));
    console.log(searchData);
  }, [searchData, dispatch]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  return (
    <>
      <nav className="flex fixed right-0 left-0 top-0 z-50 text-white bg-gray-900 max-w-screen-xl" ref={menuRef}>
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto  p-4">
          <a
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <Link className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              REDUX
            </Link>
          </a>
          <div className="flex justify-between gap-16 md:order-2">
            <div className="relative mr-2 md:block">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3  pointer-events-none">
              <CiSearch className="text-gray-700"/>
              </div>
              <input
                onChange={(e) => setSearchData(e.target.value)}
                type="text"
                id="search-navbar"
                className="block w-full h-10 p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search..."
              />
            </div>
            <button
              onClick={() => setOpen(!open)}
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-search"
              aria-expanded={open}
            >
              {open ? <IoMdClose className="text-2xl text-white" />:<AiOutlineMenuFold className="text-2xl text-white" />}
            </button>
          </div>
          <div
            className={`items-center justify-between w-full md:flex md:w-auto md:order-1 transition-all duration-500 ease-in ${open ? "block" : "hidden"}`}
            id="navbar-search"
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link
                  to="/create"
                  className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                  aria-current="page"
                >
                  Create a Post
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  All Data({allUsers.length})
                </Link>
              </li>
            </ul>
          </div>
          
        </div>
      </nav>
    </>
  );
};

export default Navbar;
