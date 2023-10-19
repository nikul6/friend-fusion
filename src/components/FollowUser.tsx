import { useDispatch } from "react-redux"
import { AppDispatch, useAppSelector } from "../redux/store"
import { useEffect } from "react"
import { getUsers } from "../redux/user/userSlice";

const userImg = "https://demo.foxthemes.net/instello/assets/images/avatars/avatar-2.jpg"

function FollowUser() {
    const users = useAppSelector((state) => state.user.users);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(getUsers())
    }, [dispatch])

    return (
        <div className=" bg-white rounded-lg ms-0 lg:ms-10 p-4 shadow-slate-500 shadow-xl">
            <div className="capitalize font-bold flex items-center">
                <p>people you might know</p>
                <i className="fa-solid fa-arrows-rotate ms-auto"></i>
            </div>
            <div>
                {users.map((data, index) => (
                    <div className="flex items-center mt-4" key={index}>
                        <img src={userImg} className="h-10 rounded-full " alt="" />
                        <div className="ms-2 me-3">
                            <p className="capitalize font-bold text-left">{data.name}</p>
                            <p className="text-sm text-slate-500">Suggested For You</p>
                        </div>
                        <button className="ms-auto font-semibold rounded-full bg-slate-300 px-4 py-1 ">follow</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default FollowUser