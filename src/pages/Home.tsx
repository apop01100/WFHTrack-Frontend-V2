import { useEffect } from "react";
import PersonalAttendanceTable from "../components/Home/PersonalAttendanceTable"
import { API_GET_USER_PROFILE } from "../constants/URL_API";
import useFetch from "../hooks/useFetch";
import WelcomeBar from "../components/WelcomeBar";
import Loading from "../components/Loading";

interface GetProfileResponse {
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  position: string;
}

const Home = () => {
  const { data, fetchData, loading } = useFetch<GetProfileResponse>(API_GET_USER_PROFILE)

  useEffect(() => {
    fetchData()
  }, [])
  
  return (
    <div className="flex flex-col w-full h-full gap-4 text-neutral-800">
      {loading && data ? <WelcomeBar 
        firstName={data.first_name} 
        lastName={data.last_name}
        email={data.email} 
        username={data.username}
        position={data.position}
        updateData={fetchData} 
        isUser={true}
      /> : <Loading />}
      <PersonalAttendanceTable />
    </div>
  )
}

export default Home