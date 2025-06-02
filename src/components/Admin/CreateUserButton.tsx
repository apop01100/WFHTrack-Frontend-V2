import { useState } from "react";
import CreateUserDialog from "./CreateUserDialog";

interface CreateUserButtonProps {
    updateTable: () => void;
}

const CreateUserButton: React.FC<CreateUserButtonProps> = ({ updateTable }) => {
  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleOpen = () => setDialogOpen(true);
  const handleClose = () => setDialogOpen(false);

  return (
    <>
      <button
        onClick={handleOpen}
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 w-44 items-end"
      >
        + Create User
      </button>

      <CreateUserDialog isOpen={isDialogOpen} onClose={handleClose} updateTable={updateTable} />
    </>
  );
}

export default CreateUserButton