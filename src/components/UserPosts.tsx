import { FcLike } from "react-icons/fc";
import { AiOutlineComment } from "react-icons/ai";
import { BiPaperPlane } from "react-icons/bi";
import { FiShare } from "react-icons/fi";

type Props = {
    results: Root[];
}

const userImg = "https://demo.foxthemes.net/instello/assets/images/avatars/avatar-2.jpg"

function UserPosts({ results }: Props) {
    return (
        <div>
            {Object.keys(results).map((itemId: any) => {
                const item = results[itemId];
                return (
                    <div className="bg-white mt-10 rounded-lg shadow-slate-500 shadow-xl w-[400px] m-auto" key={itemId}>
                        <div className="px-4">
                            <div className="flex items-center pt-4">
                                <img src={userImg} className="h-10 rounded-full " alt="" />
                                <div className="ms-2">
                                    <p className="capitalize font-bold text-left">{item.userName}</p>
                                    <p className="text-sm text-slate-500">2 hours ago</p>
                                </div>
                                <div className="ms-auto">
                                    <i className="fa-solid fa-bars"></i>
                                </div>
                            </div>
                            <div className="mt-4">
                                <div className="text-left w-[350px]">
                                    <p className="inline ">{item.title}</p>
                                </div>
                                <img src={item.imgUrl} className="h-[200px] w-[100%] bg-slate-600 rounded-lg" alt={item.title} />
                                <div className="my-4 flex items-center">
                                    <div className="flex items-center">
                                        <div className="h-8 w-8 bg-red-200 rounded-full flex items-center justify-center">
                                            <FcLike className="text-lg" />
                                        </div>
                                        <p className="text-sm text-slate-500 ms-2">{item.likes}</p>
                                    </div>
                                    <div className="flex items-center ms-4">
                                        <div className="h-8 w-8 bg-slate-200 rounded-full flex items-center justify-center">
                                            <AiOutlineComment className="text-lg" />
                                        </div>
                                        <p className="text-sm text-slate-500 ms-2">{item.comments}</p>
                                    </div>
                                    <div className="ms-auto flex items-center gap-5">
                                        <BiPaperPlane className="text-xl" />
                                        <FiShare className="text-xl" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="border-t-2 border-stone-200 px-4 ">
                            <div className="flex my-4">
                                <img src={userImg} className="h-10 rounded-full " alt="" />
                                <div className="ms-2">
                                    <p className="capitalize font-bold text-left">monroe parker</p>
                                    <p className="text-sm text-slate-500">What a beautiful photo! I love it. 😍</p>
                                </div>
                            </div>
                            <div className="flex my-4">
                                <img src={userImg} className="h-10 rounded-full " alt="" />
                                <div className="ms-2">
                                    <p className="capitalize font-bold text-left">monroe parker</p>
                                    <p className="text-sm text-slate-500">You captured the moment.😎</p>
                                </div>
                            </div>
                            {/* <div className="capitalize mb-4 font-semibold">
                                <p className="text-slate-500"><i className="fa-solid fa-angle-down me-3  "></i>More comment</p>
                            </div> */}
                        </div>
                        <div className="p-4 border-t-2 border-stone-200">
                            <div className="capitalize flex items-center" >
                                <img src={userImg} className="h-10 rounded-full " alt="" />
                                <input type="text" className=" text-sm   lg:pe-6 pe-0 py-2" placeholder="Add Comment..." />
                                <button className="bg-slate-300 px-4 py-1 capitalize ms-auto font-semibold rounded-full ">replay</button>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    )
}

export default UserPosts