import { ErrorMessage, Field } from "formik";

interface EntryInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    id: string;
}

const EntryInput = ({label, id, ...props}: EntryInputProps) => {
  return (
    <div className="w-full flex flex-col items-start gap-2 text-neutral-800">
            <label className="text-sm text-neutral-800 font-semibold" htmlFor={id}>{label}</label>
            <Field 
                className="text-sm px-2 h-10 w-full bg-neutral-200 text-neutral-800 rounded-lg focus:outline-none select-none" 
                id={id}  
                {...props} 
            />
            <ErrorMessage name={id} component="div" className="text-sm text-red-500" />
    </div>
  )
}

export default EntryInput