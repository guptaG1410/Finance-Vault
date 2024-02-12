import React from 'react';

const Modal = ({ show, onClose, children }) => {
  return (
    <div
      style={{
        display: show ? 'block' : 'none',
      }}
      className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50"
    >
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-screen-md mx-auto rounded-3xl bg-slate-800 py-6 px-4">
        <button
          onClick={() => {
            onClose(!show);
          }}
          className="absolute top-4 right-4 w-10 h-10 font-bold rounded-full bg-slate-600 flex items-center justify-center"
        >
          X
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
