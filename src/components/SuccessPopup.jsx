import React, { useEffect } from "react";

const SuccessPopup = ({ isOpen, onClose, message }) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      {/* Background backdrop */}
      <div
        className="fixed  top-0 inset-0 bg-gray-500/25 transition-opacity"
        aria-hidden="true"
      ></div>

      {/* Modal content */}
      <div className="fixed inset-0 z-10 flex items-center justify-center">
        <div className="relative transform overflow-hidden bg-white rounded shadow-lg transition-all sm:w-full sm:max-w-lg p-4">
          <p className="text-sm text-black">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default SuccessPopup;
