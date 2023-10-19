import { useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from '../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { addUserPost } from '../redux/post/postSlice';
import { selectUser } from '../redux/auth/authSlice';
import { useNavigate } from 'react-router-dom';

function CreatePostPage() {
    const [title, setTitle] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [percent, setPercent] = useState(0);
    const [imgUrl, setImgUrl] = useState('');
    const [enable, setEnable] = useState(true);

    const navigate = useNavigate();

    const user = useSelector(selectUser);
    const userId = user?.uid

    const dispatch = useDispatch<AppDispatch>();

    const handleTextChange = (e: any) => {
        setTitle(e.target.value);
    };

    const handleFileChange = (e: any) => {
        const file = e.target.files[0];
        setSelectedFile(file)
        setEnable(true);
        const storageRef = storage;
        const imageRef = ref(storageRef, `postImages/${file.name}`);
        const uploadTask = uploadBytesResumable(imageRef, file);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setPercent(percent);
            },
            (err) => console.log(err),
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    console.log(url);
                    setImgUrl(url);
                    setEnable(false)
                });
            }
        );

    };

    const hanldePost = () => {
        const postData = {
            title: title,
            userId: userId,
            userName: "Alex",
            imgUrl: imgUrl,
            likes: 0,
            comments: 0
        }
        dispatch(addUserPost(postData)).then(() => {
            setTitle('');
            setSelectedFile(null)
            setEnable(true)
            navigate("/")
        })
    }

    return (
        <div className="min-h-screen bg-[#F4F8FA] p-10 flex flex-col justify-center">
            <div className="container mx-auto mt-8 p-5 bg-white shadow-2xl rounded-lg">
                <h1 className="text-2xl font-bold mb-4">Create a Post</h1>
                <div className="mb-4">
                    <label htmlFor="postContent" className="block text-gray-600 text-sm font-medium mb-2">Post Content</label>
                    <textarea
                        id="postContent"
                        name="postContent"
                        value={title}
                        onChange={handleTextChange}
                        className="w-full px-3 py-2 placeholder-gray-400 border rounded-md focus:ring focus:ring-indigo-300 focus:outline-none mt-4 resize-none"
                        placeholder="What's on your mind?"
                    ></textarea>
                </div>
                <div className="mb-4">
                    <input
                        type="file"
                        id="imageUpload"
                        name="imageUpload"
                        onChange={handleFileChange}
                        className="hidden"
                        accept="image/*"
                    />
                    <label htmlFor="imageUpload" className="cursor-pointer bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-md">
                        Select Image
                    </label>
                </div>
                {selectedFile ? (
                    <div className="mb-4">
                        <img
                            src={URL.createObjectURL(selectedFile)}
                            className="w-full max-h-48 object-contain rounded-md"
                            alt="Selected Image"
                        />
                    </div>
                ) : (
                    <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/310px-Placeholder_view_vector.svg.png'
                        className="w-full max-h-48 object-contain rounded-md mb-2" />
                )}
                <p>Image Uploading {percent} % done</p>
                <button
                    className={`${!enable ? 'bg-indigo-500' : 'bg-slate-600'} text-white py-2 px-4 rounded-md`}
                    onClick={hanldePost}
                    disabled={enable}
                >
                    Post
                </button>
            </div>
        </div>
    );
}

export default CreatePostPage;
