import React, { useState } from "react";
import EditUserDialog from "./EditUserDialog"; // adjust path as needed

interface Users {
  first_name: string;
  last_name: string;
  username: string;
  position: string;
}

interface EditButtonProps {
  user: Users;
  updateTable: () => void
}

const EditButton: React.FC<EditButtonProps> = ({ user, updateTable }) => {
  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleOpenDialog = () => setDialogOpen(true);
  const handleCloseDialog = () => setDialogOpen(false);

  return (
    <>
      <button
        onClick={handleOpenDialog}
        className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 w-1/3"
      >
        Edit
      </button>

      <EditUserDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        updateTable={updateTable}
        user={user}
        onSubmit={() => {
          handleCloseDialog();
        }}
      />
    </>
  );
};

export default EditButton;
