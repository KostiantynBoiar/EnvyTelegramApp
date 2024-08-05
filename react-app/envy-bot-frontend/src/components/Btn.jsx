const Btn = ({text, onClick }) => {
	return (
		<button className='w-full text-center bg-[#2972FF] text-[21px] font-medium tracking-[1.05px] mb-[33px] py-[14px] rounded-[18.48px]' onClick={onClick}>
			{text}
		</button>
	);
};

export default Btn;
