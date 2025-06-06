import { API_CREATE_ATTENDANCE } from "../../constants/URL_API"
import useFetch from "../../hooks/useFetch"

interface AttendanceResponse {
    id: number
}

interface AddAttendanceTodayButtonProps {
    updateData: () => void;
}

const AddAttendanceTodayButton: React.FC<AddAttendanceTodayButtonProps> = ({ updateData }) => {
    const { loading, fetchData } = useFetch<AttendanceResponse>(API_CREATE_ATTENDANCE, "POST");

    const handleButton = async () => {
        await fetchData()
        updateData()
    }

  return (
    <div className="flex justify-end w-full">
        <button className="bg-blue-500 flex justify-center items-center w-44 text-neutral-50 font-semibold text-sm" onClick={handleButton}>
            {loading ? "Loading..." : "+ Add Attendance Today"}
        </button>
    </div>
  )
}

export default AddAttendanceTodayButton