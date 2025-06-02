import { useEffect } from "react";
import { useField } from "formik";
import useFetch from "../../hooks/useFetch";
import { API_GET_ALL_POSITIONS } from "../../constants/URL_API";

interface Position {
  id: number;
  position: string;
}

interface PositionDropdownProps {
  name: string;
}

const PositionDropdown: React.FC<PositionDropdownProps> = ({ name }) => {
  const [field, meta] = useField(name);
  const { data, loading, fetchData } = useFetch<Position[]>(API_GET_ALL_POSITIONS);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
        <label className="text-sm text-neutral-800">Positions</label>
        <select
            {...field}
            className="text-sm px-2 h-10 w-full bg-neutral-200 text-neutral-800 rounded-lg select-none font-semibold"
            disabled={loading}
        >
            <option value="">Select position</option>
            {data?.map((pos) => (
            <option key={pos.id} value={pos.position}>
                {pos.position}
            </option>
            ))}
        </select>
        {meta.touched && meta.error && (
            <div className="text-red-500 text-sm mt-1">{meta.error}</div>
        )}
    </div>
  );
};

export default PositionDropdown;
