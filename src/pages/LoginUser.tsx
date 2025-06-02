import LoginCard from "../components/EntryCard"
import LoginForm from "../components/Login/UserLoginForm"

const LoginUser = () => {
  return (
    <div>
        <LoginCard title="Login to yor account." text="Please enter your details!" linkTo="/login/admin" linkText="Login as Admin">
            <LoginForm />
        </LoginCard>
    </div>
  )
}

export default LoginUser