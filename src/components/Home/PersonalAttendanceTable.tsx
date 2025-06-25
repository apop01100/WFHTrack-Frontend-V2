import { useEffect, useState } from "react"
import { API_USER_ATTENDANCES } from "../../constants/URL_API"
import useFetch from "../../hooks/useFetch"
import Table from "../Table"
import ImageDialog from "./ImageDialog";
import PresentAttendance from "./PresentAttendance";
import Loading from "../Loading";

type Column<T> = {
  header: string;
  accessor?: keyof T;
  cell?: (row: T) => React.ReactNode;
};

interface UserAttendanceResponse {
  date: string;
  time: string;
  status: string;
  img_url: string;
}

const PersonalAttendanceTable = () => {
  const { data, fetchData } = useFetch<UserAttendanceResponse[]>(`${API_USER_ATTENDANCES}?limit=10&page=1`);
  const [open, setOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpen = (url: string) => {
    setImageUrl(url);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setImageUrl("");
  };

  const userColumns: Column<UserAttendanceResponse>[] = [
    { header: "Date", 
      accessor: "date",
      cell: (row) => (
        <>{row.date.substring(0, 10)}</>
      )
    },
    { header: "Time", accessor: "time" },
    { header: "Status", 
      accessor: "status",
      cell: (row) =>  (
        row.status === "present" ? (
          <>✅</>
        ) : (
          <>❌</>
        )
      )
    },
    {
      header: "Photo",
      cell: (row) => (
        row.img_url ? (
          <button
            onClick={() => handleOpen(row.img_url)}
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
          >
            View
          </button>
        ) : (
          "None"
        )
          
      ),
    },
  ];

  return (
    <div className="bg-neutral-50 flex flex-col w-full h-full px-6 py-4 rounded-2xl gap-4">
      <div className="flex flex-row justify-between items-center">
        <h2 className="text-2xl font-semibold">
          Yours Attendance
        </h2>
        <PresentAttendance onUploadSuccess={setImageUrl} updateData={fetchData}/>
      </div>
        {
          data ? <Table data={data} columns={userColumns}/> : <Loading />
        }

        <ImageDialog open={open} imageUrl={imageUrl} onClose={handleClose} />
    </div>
  )
}

export default PersonalAttendanceTable