import React, { useState } from "react";
import axios from "axios";
import useFetch from "../../hooks/useFetch";
import { API_USER_MARK_ATTENDANCE } from "../../constants/URL_API";
import AttendanceImageDialog from "./AttendanceImageDialog";

interface PresentAttendanceProps {
  onUploadSuccess: (url: string) => void;
  updateData: () => void;
}

interface PresentAttendanceResponse {
    messages: string
}

const PresentAttendance: React.FC<PresentAttendanceProps> = ({ onUploadSuccess, updateData }) => {
    const [isUploading, setIsUploading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const { loading, fetchData } = useFetch<PresentAttendanceResponse>(API_USER_MARK_ATTENDANCE, "POST")

    const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        setError(null);

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", import.meta.env.VITE_UNSIGNED_PRESET);

        try {
            const res = await axios.post(
                `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/image/upload`,
                formData
            );
            const secureUrl = res.data.secure_url;
            setImageUrl(secureUrl);
            onUploadSuccess(secureUrl);
        } catch (err) {
            setError("Upload failed");
        console.error(err);
        } finally {
            setIsUploading(false);
        }
    };

    const handleClose = () => {
        setImageUrl("");
    };

    const markAttendance = async (imageUrl: string) => {
        await fetchData({ img_url: imageUrl })
        updateData();
        setImageUrl("");
    }

  return (
    <div className="flex justify-center items-center rounded">
      <label className="cursor-pointer px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600">
        {isUploading ? "Uploading..." : "Present" }
        <input type="file" accept="image/*" className="hidden" onChange={handleUpload} />
      </label>

      {error && <p className="mt-2 text-red-600">{error}</p>}

      <AttendanceImageDialog 
        imageUrl={imageUrl}
        loading={loading}
        onClose={handleClose}
        onMarkAttendance={markAttendance}
      />
    </div>
  );
};

export default PresentAttendance;
