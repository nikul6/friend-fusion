import { AiFillHome, AiOutlineSearch, AiFillPlusCircle } from "react-icons/ai";
import { auth } from '../firebase';
import { useNavigate } from 'react-router';
import { Link } from "react-router-dom";

function SideBar() {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("accessToken");
        auth.signOut();
        navigate("/login")
    }

    return (
        <div className="bg-white  max-md:d-nones">
            <h1 className="text-4xl m-4 max-md:hidden font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-purple-500">Friend Fusion</h1>
            <nav className="md:ms-4 md:mt-5 mb-auto  ">
                <ul className="md:flex-row flex-wrap flex items-center justify-between md:p-0 p-3 md:static fixed bottom-0 left-0 bg-white w-full">
                    <li className="text-lg md:basis-full flex items-center">
                        <AiFillHome className="text-xl"/>
                        <a href="" className="capitalize max-md:hidden ms-3 text-xl">home</a>
                    </li>
                    <li className="md:mt-3 text-lg md:basis-full flex  items-center">
                        <AiOutlineSearch className="text-xl"/>
                        <a href="" className="capitalize max-md:hidden ms-3 text-xl">search</a>
                    </li>
                    <li className="md:mt-3 text-lg md:basis-full flex  items-center">
                        <AiFillPlusCircle className="text-xl"/>
                        <Link to="/create" className="capitalize max-md:hidden showModal ms-3 text-xl">Create</Link>
                    </li>
                    <li className="md:mt-3 text-lg md:basis-full flex  items-center">
                        <AiFillHome className="text-xl"/>
                        <button className="capitalize max-md:hidden ms-3 text-xl" onClick={logout}>logout</button>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default SideBar