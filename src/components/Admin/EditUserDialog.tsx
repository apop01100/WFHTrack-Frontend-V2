import { Formik, Form } from "formik";
import { validationSchema } from "../../schemas/EditUserAdminValidationSchema";
import PositionDropdown from "./PositionsDropdown";
import useFetch from "../../hooks/useFetch";
import { API_UPDATE_USER } from "../../constants/URL_API";

interface User {
  first_name: string;
  last_name: string;
  username: string;
  position: string;
}

interface EditUserDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  user: User | null;
  updateTable: () => void
}

const EditUserDialog: React.FC<EditUserDialogProps> = ({
  isOpen,
  onClose,
  user,
  updateTable,
  onSubmit
}) => {
    if (!isOpen || !user) return null;

    const { fetchData } = useFetch<User>(API_UPDATE_USER, "PUT")

    const handleUpdateUser = async (position: string) => {
        await fetchData({ username: user.username, update_user: { position: position }});
        updateTable()
        onSubmit()
    };


  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Edit User</h2>

        <Formik
            initialValues={user}
            validationSchema={validationSchema}
            onSubmit={async (values) => {
                await handleUpdateUser(values.position);
            }}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col gap-4">
                <div>
                    <PositionDropdown name="position" />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-300 rounded"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-4 py-2 bg-blue-600 text-white rounded"
                    >
                        {isSubmitting ? "Saving..." : "Save"}
                    </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EditUserDialog;
