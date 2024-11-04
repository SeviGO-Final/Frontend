import React from "react";

interface AlertProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

const Alert: React.FC<AlertProps> = ({ isOpen, onClose, message }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <p className="text-center text-gray-800">{message}</p>
        <div className="flex justify-center mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default Alert;
