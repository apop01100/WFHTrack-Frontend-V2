import { Form, Formik } from "formik";
import useFetch from "../hooks/useFetch";
import { API_UPDATE_USER_FOR_USER } from "../constants/URL_API";
import { validationSchema } from "../schemas/EditUserForUserValidationSchema";
import EntryInput from "./EntryInput";

interface User {
  first_name: string;
  last_name: string;
  email: string;
  username: string;
}

interface ProfileEditDialogProps {
  user: User;
  onClose: () => void;
  updateData: () => void;
}

const ProfileDialog: React.FC<ProfileEditDialogProps> = ({user, onClose, updateData}) => {
    const { fetchData } = useFetch<User>(API_UPDATE_USER_FOR_USER, "PUT")

    const handleUpdateUser = async (user: User) => {
        await fetchData({ first_name: user.first_name, last_name: user.last_name, email: user.email, username: user.username });
        updateData()
        onClose()
    };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Edit User</h2>

        <Formik
            initialValues={user}
            validationSchema={validationSchema}
            onSubmit={async (values) => {
                await handleUpdateUser(values);
            }}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col gap-4">
                <EntryInput label="First Name" id="first_name" name="first_name" placeholder="please input your first name..."/>
                <EntryInput label="Last Name" id="last_name" name="last_name" placeholder="please input your last name..."/>
                <EntryInput label="Email" id="email" name="email" placeholder="please input your email..."/>
                <EntryInput label="Username" id="username" name="username" placeholder="please input your username..."/>

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
  )
}

export default ProfileDialog