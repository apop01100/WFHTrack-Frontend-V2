import AdminLoginForm from "../components/Login/AdminLoginForm"
import LoginAdminCard from "../components/EntryCard"


const LoginAdmin = () => {
  return (
    <div>
      <LoginAdminCard title="Admin Login" text="Please enter your details!" linkTo="/login/user" linkText="Login as User">
        <AdminLoginForm />
      </LoginAdminCard>
    </div>
  )
}

export default LoginAdmin