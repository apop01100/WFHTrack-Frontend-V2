import { useEffect, useState } from "react"
import { API_LIST_ATTENDANCES } from "../../constants/URL_API"
import useFetch from "../../hooks/useFetch"
import Table from "../Table"
import ImageDialog from "../Home/ImageDialog";

type Column<T> = {
  header: string;
  accessor?: keyof T;
  cell?: (row: T) => React.ReactNode;
};

interface UsersAttendanceResponse {
  first_name: string;
  last_name: string;
  username: string;
  date: string;
  time: string;
  status: string;
  img_url: string;
}

const UsersAttendanceTable = () => {
  const { data, fetchData } = useFetch<UsersAttendanceResponse[]>(`${API_LIST_ATTENDANCES}?limit=10&page=1`);
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

  const userColumns: Column<UsersAttendanceResponse>[] = [
    { header: "Full Name",
      cell: (row) => (
        <>{row.first_name + " " + row.last_name}</>
      )  
    },
    { header: "Username", accessor: "username" },
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
    <div className="bg-neutral-50 flex flex-col w-full h-full gap-4">
        {
          data && <Table data={data} columns={userColumns}/>
        }

        <ImageDialog open={open} imageUrl={imageUrl} onClose={handleClose} />
    </div>
  )
}

export default UsersAttendanceTable