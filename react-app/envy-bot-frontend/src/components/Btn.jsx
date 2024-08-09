import React, { useState } from 'react';

const Btn = ({ text, onClick }) => {
  const [isDisabled, setIsDisabled] = useState(false);

  const handleClick = (event) => {
    if (!isDisabled) {
      setIsDisabled(true);

      onClick(event);

      setTimeout(() => {
        setIsDisabled(false);
      }, 5000);
    }
  };

  return (
    <button
      className='w-full text-center bg-[#2972FF] text-[21px] font-medium tracking-[1.05px] mb-[33px] py-[14px] rounded-[18.48px] transition-all duration-200 active:bg-[#1d5bbf] focus:outline-none focus:ring-4 focus:ring-[#2972FF] focus:ring-opacity-50'
      onClick={handleClick}
      disabled={isDisabled}
      style={{
        touchAction: 'manipulation', 
      }}
    >
      {text}
    </button>
  );
};

export default Btn;
