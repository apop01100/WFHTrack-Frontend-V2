import { useEffect } from "react";
import ControlUser from "../components/Admin/ControlUser"
import WelcomeBar from "../components/WelcomeBar"
import { API_GET_ADMIN_PROFILE } from "../constants/URL_API";
import useFetch from "../hooks/useFetch";
import Loading from "../components/Loading";

interface GetProfileResponse {
  username: string;
}

const Admin = () => {
  const { data, fetchData } = useFetch<GetProfileResponse>(API_GET_ADMIN_PROFILE)

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="flex flex-col w-full h-full gap-4 text-neutral-800">
      {data ? <WelcomeBar username={data?.username} updateData={fetchData} isUser={false}/> : <Loading />}
      <ControlUser />
    </div>
  )
}

export default Admin