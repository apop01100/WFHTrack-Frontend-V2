import React from "react";

interface AttendanceImageDialogProps {
  imageUrl: string;
  loading: boolean;
  onClose: () => void;
  onMarkAttendance: (imageUrl: string) => void;
}

const AttendanceImageDialog: React.FC<AttendanceImageDialogProps> = ({
  imageUrl,
  loading,
  onClose,
  onMarkAttendance,
}) => {
  if (!imageUrl) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white flex flex-col gap-4 p-4 rounded-lg shadow-lg max-w-md w-full">
        <img src={imageUrl} alt="Photo" className="w-full rounded" />
        <div className="flex flex-row gap-4 w-full justify-center">
          <button
            onClick={() => onMarkAttendance(imageUrl)}
            className="px-4 py-2 rounded text-white bg-green-400 hover:bg-green-500"
          >
            {loading ? "Loading..." : "Present"}
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded text-white bg-red-500 hover:bg-red-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AttendanceImageDialog;
