import { Link } from "react-router-dom";

interface LoginCardProps {
  title: string;
  text: string;
  children: React.ReactNode;
  linkTo: string;
  linkText: string;
}

const LoginCard: React.FC<LoginCardProps> = ({ title, text, children, linkTo, linkText }) => {

  return (
    <div className="bg-neutral-50 text-neutral-800 rounded-2xl flex flex-col justify-between px-8 py-8 gap-4 h-full w-80">
      <div className="flex flex-col text-start gap-4 w-full h-full">
        <h1 className="font-semibold">
          {title}
        </h1>
        <p className="text-sm text-neutral-400">
          {text}
        </p>
      </div>

      { children }

      {linkTo && linkText && (
        <Link
          to={linkTo}
          className="text-xs text-blue-600 hover:underline text-center"
        >
          {linkText}
        </Link>
      )}
    </div>
  )
}

export default LoginCard