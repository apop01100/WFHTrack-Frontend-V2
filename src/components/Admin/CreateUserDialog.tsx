import React from "react";
import { Formik, Form } from "formik";
import PositionDropdown from "./PositionsDropdown";
import useFetch from "../../hooks/useFetch";
import { API_CREATE_USER } from "../../constants/URL_API";
import { validationSchema } from "../../schemas/CreateUserValidationSchema";
import EntryInput from "../EntryInput";

interface CreateUserDialogProps {
  isOpen: boolean;
  onClose: () => void;
  updateTable: () => void;
}

interface NewUser {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
  confirm_password: string;
  position: string;
}

const initialValues: NewUser = {
  first_name: "",
  last_name: "",
  username: "",
  email: "",
  password: "",
  confirm_password: "",
  position: "",
};

const CreateUserDialog: React.FC<CreateUserDialogProps> = ({ isOpen, onClose, updateTable }) => {
  const { fetchData, loading } = useFetch(API_CREATE_USER, "POST");

  if (!isOpen) return null;

  const handleSubmit = async (values: NewUser) => {
    const { confirm_password, ...dataToSend } = values;
    await fetchData(dataToSend);
    updateTable()
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Create New User</h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col gap-4">
                <EntryInput label="First Name" id="first_name" name="first_name" placeholder="please input your first name..."/>
                <EntryInput label="Last Name" id="last_name" name="last_name" placeholder="please input your last name..."/>
                <EntryInput label="Email" id="email" name="email" placeholder="please input your email..."/>
                <EntryInput label="Username" id="username" name="username" placeholder="please input your username..."/>
                <EntryInput label="Password" type="password" id="password" name="password" placeholder="please input your password..."/>
                <EntryInput label="Confirm Password" type="password" id="confirm_password" name="confirm_password" placeholder="please your confirm password..."/>

                <PositionDropdown name="position" />

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
                    disabled={isSubmitting || loading}
                    className="px-4 py-2 bg-blue-600 text-white rounded"
                    >
                    {isSubmitting || loading ? "Creating..." : "Create"}
                    </button>
                </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CreateUserDialog;
