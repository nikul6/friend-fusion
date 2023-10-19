import { useNavigate } from 'react-router';
import { useEffect } from 'react'
import { gql, useQuery } from '@apollo/client';
import UserPosts from '../components/UserPosts';
import SideBar from '../components/SideBar';
import Search from '../components/Search';
import FollowUser from '../components/FollowUser';

function HomePage() {

    const navigate = useNavigate();

    const { data } = useQuery(gql`  query myQuery {
        myQuery
      }`, {
        variables: {},
    })

    useEffect(() => {
        const check: any = localStorage.getItem("accessToken");
        if (check) {
            navigate("/")
        } else {
            navigate("/login")
        }
    }, [])

    if (!data || !data.myQuery) {
        return <p>No data available.</p>;
    }
    const results: Root[] = data.myQuery;

    return (
        <div className='bg-[#F4F8FA]'>
            <div className="md:grid md:grid-cols-[16%,84%] grid-cols-[100%] duration-100  ">
                <SideBar />
                <div className="col  bg-[#F4F8FA]  lg:flex flex-row justify-center md:pt-10 h-[100vh] overflow-y-auto">
                    <div className="lg:m-0 m-auto">
                        {/* search box */}
                        <Search />
                        {/* post box */}
                        <UserPosts results={results} />
                    </div>
                    <div className="lg:m-0 m-auto mt-4 w-[400px]">
                        {/* follow box */}
                        <FollowUser />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage