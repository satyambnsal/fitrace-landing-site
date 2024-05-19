import React from 'react';

const Spinner = () => {
  return (
    <div className="flex justify-center items-center">
      <div
        className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"
        style={{ borderColor: 'transparent #222222 transparent #222222' }}
      ></div>
    </div>
  );
};

export default Spinner;
