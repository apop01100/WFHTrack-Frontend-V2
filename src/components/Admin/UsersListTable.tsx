import { useEffect } from "react"
import { API_GET_ALL_USER } from "../../constants/URL_API"
import useFetch from "../../hooks/useFetch"
import Table from "../Table"
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";
import CreateUserButton from "./CreateUserButton";
import Loading from "../Loading";

type Column<T> = {
  header: string;
  accessor?: keyof T;
  cell?: (row: T) => React.ReactNode;
};

interface UsersListResponse {
  first_name: string;
  last_name: string;
  username: string;
  position: string;
}

const UsersListTable = () => {
  const { data, fetchData } = useFetch<UsersListResponse[]>(`${API_GET_ALL_USER}?limit=10&page=1`);

  useEffect(() => {
    fetchData();
  }, []);



  const userColumns: Column<UsersListResponse>[] = [
    { header: "Full Name",
      cell: (row) => (
        <>{row.first_name + " " + row.last_name}</>
      )  
    },
    { header: "Username", accessor: "username" },
    { header: "Position", accessor: "position"},
    {
        header: "Actions",
        cell: (row) => (
            <div className="flex gap-2">
                <EditButton user={row} updateTable={fetchData} />
                <DeleteButton user={row} updateTable={fetchData} />
            </div>
        )
    }
  ];

  return (
    <div className="bg-neutral-50 flex flex-col w-full h-full gap-2">
        <div className="flex justify-end">
            <CreateUserButton updateTable={fetchData}/>
        </div>
        {
            data ? <Table data={data} columns={userColumns}/> : <Loading />
        }
    </div>
  )
}

export default UsersListTable