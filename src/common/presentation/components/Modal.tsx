// src/common/presentation/components/Modal.tsx
import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="bg-opacity-10 fixed inset-0 z-50 flex items-center justify-center backdrop-blur">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        {title && <h2 className="mb-4 text-2xl font-bold text-blue-800">{title}</h2>}
        <div className="text-gray-800">{children}</div>
        <div className="mt-4 flex justify-end">
          <button
            className="rounded bg-gray-200 px-4 py-2 font-semibold text-gray-700 hover:bg-gray-300"
            onClick={onClose}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
