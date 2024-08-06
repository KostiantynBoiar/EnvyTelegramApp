import React, { useState } from 'react';

const Btn = ({ text, onClick }) => {
  const [isDisabled, setIsDisabled] = useState(false);

  const handleClick = (event) => {
    onClick(event);

    setIsDisabled(true);

    setTimeout(() => {
      setIsDisabled(false);
    }, 5000);
  };

  return (
    <button
      className='w-full text-center bg-[#2972FF] text-[21px] font-medium tracking-[1.05px] mb-[33px] py-[14px] rounded-[18.48px]'
      onClick={handleClick}
      disabled={isDisabled}
    >
      {text}
    </button>
  );
};

export default Btn;
