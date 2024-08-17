import React, { useState, useEffect } from 'react';

const Btn = ({ afterClickText, text, onClick, disabled }) => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [buttonText, setButtonText] = useState(text);
  const [buttonColor, setButtonColor] = useState('bg-[#2972FF]')

  useEffect(() => {
    setButtonText(text);
    if(disabled){
      setButtonColor('bg-[#5D5D5D]'); 
    }
  }, [text]);

  const handleClick = (event) => {
    if (disabled) {
      
      return;
    }

    if (!isDisabled) {
      setIsDisabled(true);
      setButtonText(afterClickText);
      onClick(event);
      setButtonColor('bg-[#5D5D5D]'); 

      setTimeout(() => {
        setButtonText(text); 
        setButtonColor('bg-[#2972FF]'); 
        setIsDisabled(false);
      }, 5000);
    }
  };

  return (
    <button
      className={`w-full text-center ${buttonColor} text-[21px] font-medium tracking-[1.05px] mb-[33px] py-[14px] rounded-[18.48px] transition-all duration-200 active:bg-[#1d5bbf] focus:outline-none focus:ring-4 focus:ring-[#2972FF] focus:ring-opacity-50`}
      onClick={handleClick}
      disabled={isDisabled || disabled} 
      style={{
        touchAction: 'manipulation',
      }}
    >
      {buttonText}
    </button>
  );
};


export default Btn;
