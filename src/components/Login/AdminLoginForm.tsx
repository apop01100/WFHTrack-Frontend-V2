import { Formik, Form } from "formik";
import validationLoginSchema from "../../schemas/LoginValidationScema";
import useFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import EntryInput from "../EntryInput";
import { API_ADMIN_LOGIN } from "../../constants/URL_API";

interface LoginAdminValues {
    username: string;
    password: string;
}

interface LoginAdminResponse {
    message: string
}

const initialValues: LoginAdminValues = {
    username: "",
    password: "",
}

const AdminLoginForm = () => {
    const { data, error, loading, fetchData } = useFetch<LoginAdminResponse>(API_ADMIN_LOGIN, "POST"); 
    const navigate = useNavigate()

    const handleSubmit = async (values: LoginAdminValues) => {
        await fetchData({ username: values.username, password: values.password })
    }

    useEffect(() => {
        if (data) {
            navigate("/admin")
        }
    }, [data]);

  return (
    <div>
        <Formik
            initialValues={initialValues}
            validationSchema={validationLoginSchema}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting }) => (
                <Form className="flex flex-col gap-8">
                    <div className="flex flex-col gap-4">
                        <EntryInput label="Username" id="username" name="username" placeholder="Input your username..."/>
                        <EntryInput label="Password" id="password" name="password" placeholder="Input your password..." type="password"/>
                    </div>

                    {
                        error && <p className="text-red-500 text-md text-center">{error}</p>
                    }

                    <button className="text-neutral-50 bg-blue-500" type="submit" disabled={isSubmitting}>
                        { loading ? "Loading..." : "Login"}
                    </button>
                </Form>
            )}
        </Formik>
    </div>
  )
}

export default AdminLoginForm