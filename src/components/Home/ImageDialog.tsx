import React from "react";

interface ImageDialogProps {
  open: boolean;
  imageUrl: string;
  onClose: () => void;
}

const ImageDialog: React.FC<ImageDialogProps> = ({ open, imageUrl, onClose }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white flex flex-col gap-4 p-4 rounded-lg shadow-lg max-w-md w-full">
            <img src={imageUrl} alt="Photo" className="w-full rounded" />
            <button
            onClick={onClose}
            className="top-2 right-2 text-gray-50 bg-neutral-700 hover:bg-neutral-800"
            >
            Close
            </button>
        </div>
    </div>
  );
};

export default ImageDialog;
