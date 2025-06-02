import { useNavigate } from "react-router-dom";
import { API_LOGOUT } from "../constants/URL_API";
import useFetch from "../hooks/useFetch";
import { useState } from "react";
import ProfileDialog from "./ProfileDialog";

interface WelcomeBarProps {
  firstName?: string;
  lastName?: string;
  username: string;
  position?: string;
  email?: string;
  isUser: boolean;
  updateData: () => void;
}

const WelcomeBar: React.FC<WelcomeBarProps> = ({...props}) => {
  const { fetchData } = useFetch(API_LOGOUT)
  const navigate = useNavigate();
  const [openProfile, setOpenProfile] = useState<boolean>(false)

  const handleLogout = () => {
    fetchData()
    props.isUser ? navigate("/login/user") : navigate("/login/admin")
  }

  const handleOpenProfile = () => {
    setOpenProfile(true)
  }

  const handleCloseProfile = () => {
    setOpenProfile(false)
  }

  return (
    <div className="bg-neutral-50 w-full flex flex-row justify-between items-center px-4 py-4 rounded-2xl">
      <div>
        <h1 className="font-semibold">
          Welcome, {props.firstName ? (props.firstName + " " + props.lastName) : props.username} 👋
        </h1>
        {props.firstName && <p><span className="font-semibold">Username: </span> {props.username}</p>}
        {props.email && <p><span className="font-semibold">Email: </span>{props.email}</p>}
        {props.position && <p><span className="font-semibold">Position: </span>{props.position}</p>}
      </div>
      <div className="flex flex-col gap-2 justify-center items-center">
        {props.isUser && 
          <button 
            className="bg-blue-500 text-neutral-50 hover:bg-blue-600 w-full"
            onClick={handleOpenProfile}
          >
            Edit Profile
          </button>
        }
        <button 
          className="bg-neutral-700 text-neutral-50 hover:bg-neutral-800 w-full"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      {openProfile && 
        <ProfileDialog 
          user={{
            first_name: props.firstName || '',
            last_name: props.lastName || '',
            email: props.email || '',
            username: props.username,
          }} 
          onClose={handleCloseProfile} 
          updateData={props.updateData}
        />
      }
    </div>
  )
}

export default WelcomeBar