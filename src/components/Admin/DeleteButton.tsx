import { API_DELETE_USER } from "../../constants/URL_API";
import useFetch from "../../hooks/useFetch";

interface Users {
  first_name: string;
  last_name: string;
  username: string;
  position: string;
}

interface DeleteButtonProps {
  user: Users;
  updateTable: () => void;
}

interface DeleteResponse {
    data: number;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ user, updateTable }) => {
    const { fetchData } = useFetch<DeleteResponse>(API_DELETE_USER, "DELETE")

    const handleDelete = async (user: Users) => {
        if (confirm(`Are you sure you want to delete ${user.username}?`)) {
            await fetchData({ username: user.username })
            updateTable()
        }
    };

  return (
    <button
        onClick={() => handleDelete(user)}
        className="text-sm bg-red-500 text-white rounded hover:bg-red-600 w-1/3"
    >
        Delete
    </button>
  )
}

export default DeleteButton