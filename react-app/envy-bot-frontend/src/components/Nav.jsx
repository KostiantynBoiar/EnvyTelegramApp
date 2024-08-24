import { NavLink } from 'react-router-dom';

const Nav = ({ activeSlide, setActiveSlide }) => {
	return (
		<nav className='flex items-center justify-center fixed bottom-0 gap-16 pt-[10px] w-[393px] nav pb-[58px]'>
			<NavLink
				to='/'
				className='flex flex-col justify-center items-center gap-[10px] cursor-pointer p-3 duration-300 hover:scale-105'
				onClick={() => setActiveSlide('Home')}
			>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					width='29'
					height='28'
					viewBox='0 0 29 28'
					fill='none'
				>
					<path
						d='M15.1032 0.303819C14.9351 0.160055 14.7212 0.0810547 14.5 0.0810547C14.2788 0.0810547 14.0649 0.160055 13.8968 0.303819L0.581055 11.7174V25.1352C0.581055 25.8735 0.874346 26.5816 1.39641 27.1037C1.91847 27.6257 2.62654 27.919 3.36484 27.919H10.7883C11.0344 27.919 11.2704 27.8212 11.4444 27.6472C11.6184 27.4732 11.7162 27.2372 11.7162 26.9911V21.4235C11.7162 20.6852 12.0095 19.9771 12.5316 19.4551C13.0536 18.933 13.7617 18.6397 14.5 18.6397C15.2383 18.6397 15.9464 18.933 16.4684 19.4551C16.9905 19.9771 17.2838 20.6852 17.2838 21.4235V26.9911C17.2838 27.2372 17.3816 27.4732 17.5556 27.6472C17.7296 27.8212 17.9656 27.919 18.2117 27.919H25.6352C26.3735 27.919 27.0815 27.6257 27.6036 27.1037C28.1257 26.5816 28.419 25.8735 28.419 25.1352V11.7174L15.1032 0.303819Z'
						fill={activeSlide === 'Home' ? '#E82C2C' : 'white'}
					/>
				</svg>
				<p
					className={`text-[10px] font-medium ${
						activeSlide === 'Home' ? 'text-[#E82C2C]' : 'text-white'
					}`}
				>
					Home
				</p>
			</NavLink>
			<NavLink to='/friends'
				className='flex flex-col justify-center items-center gap-[10px] cursor-pointer p-3 duration-300 hover:scale-105'
				onClick={() => setActiveSlide('Friends')}
			>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					width='40'
					height='28'
					viewBox='0 0 40 28'
					fill='none'
				>
					<path
						d='M11.865 13.8425C15.6902 13.8425 18.7863 10.7465 18.7863 6.92125C18.7863 3.09602 15.6902 0 11.865 0C8.03978 0 4.94375 3.09602 4.94375 6.92125C4.94375 10.7465 8.03978 13.8425 11.865 13.8425ZM16.611 15.82H16.0981C14.8127 16.438 13.3852 16.8088 11.865 16.8088C10.3448 16.8088 8.92347 16.438 7.63192 15.82H7.119C3.18872 15.82 0 19.0087 0 22.939V24.7188C0 26.3564 1.32863 27.685 2.96625 27.685H20.7638C22.4014 27.685 23.73 26.3564 23.73 24.7188V22.939C23.73 19.0087 20.5413 15.82 16.611 15.82ZM29.6625 13.8425C32.9378 13.8425 35.595 11.1852 35.595 7.91C35.595 4.63477 32.9378 1.9775 29.6625 1.9775C26.3873 1.9775 23.73 4.63477 23.73 7.91C23.73 11.1852 26.3873 13.8425 29.6625 13.8425ZM32.6288 15.82H32.3939C31.535 16.1166 30.6265 16.3144 29.6625 16.3144C28.6985 16.3144 27.7901 16.1166 26.9311 15.82H26.6963C25.4356 15.82 24.2738 16.1846 23.2542 16.7717C24.762 18.3969 25.7075 20.5537 25.7075 22.939V25.312C25.7075 25.448 25.6766 25.5777 25.6704 25.7075H36.5838C38.2214 25.7075 39.55 24.3789 39.55 22.7413C39.55 18.916 36.454 15.82 32.6288 15.82Z'
						fill={activeSlide === 'Friends' ? '#E82C2C' : 'white'}
					/>
				</svg>
				<p
					className={`text-[10px] font-medium ${
						activeSlide === 'Friends' ? 'text-[#E82C2C]' : 'text-white'
					}`}
				>
					Friends
				</p>
			</NavLink>
			<NavLink to='/tasks'
				className='flex flex-col justify-center items-center gap-[10px] cursor-pointer p-3 duration-300 hover:scale-105'
				onClick={() => setActiveSlide('Tasks')}
			>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					width='26'
					height='28'
					viewBox='0 0 26 28'
					fill='none'
				>
					<path
						d='M4.02368 0C3.02103 0 2.05944 0.398303 1.35045 1.10729C0.641467 1.81627 0.243164 2.77786 0.243164 3.78052V24.1371C0.243164 25.1398 0.641467 26.1014 1.35045 26.8104C2.05944 27.5194 3.02103 27.9177 4.02368 27.9177H15.1535L12.6444 25.4086C12.4014 25.1655 12.2086 24.877 12.0771 24.5594C11.9455 24.2419 11.8778 23.9016 11.8778 23.5579C11.8778 23.2141 11.9455 22.8738 12.0771 22.5563C12.2086 22.2387 12.4014 21.9502 12.6444 21.7071C12.8875 21.4641 13.176 21.2713 13.4935 21.1398C13.8111 21.0083 14.1514 20.9406 14.4951 20.9406C14.8388 20.9406 15.1792 21.0083 15.4967 21.1398C15.8143 21.2713 16.1028 21.4641 16.3458 21.7071L17.9825 23.3438L23.1112 18.2151C23.2353 18.091 23.3675 17.9825 23.5079 17.8894V3.78052C23.5079 2.77786 23.1096 1.81627 22.4006 1.10729C21.6916 0.398303 20.73 0 19.7274 0H4.02368ZM7.8042 7.85184C7.8042 8.23748 7.651 8.60732 7.37832 8.88001C7.10563 9.15269 6.73579 9.30589 6.35015 9.30589C5.96452 9.30589 5.59467 9.15269 5.32199 8.88001C5.0493 8.60732 4.89611 8.23748 4.89611 7.85184C4.89611 7.46621 5.0493 7.09636 5.32199 6.82368C5.59467 6.55099 5.96452 6.3978 6.35015 6.3978C6.73579 6.3978 7.10563 6.55099 7.37832 6.82368C7.651 7.09636 7.8042 7.46621 7.8042 7.85184ZM6.35015 15.4129C5.96452 15.4129 5.59467 15.2597 5.32199 14.987C5.0493 14.7143 4.89611 14.3445 4.89611 13.9588C4.89611 13.5732 5.0493 13.2034 5.32199 12.9307C5.59467 12.658 5.96452 12.5048 6.35015 12.5048C6.73579 12.5048 7.10563 12.658 7.37832 12.9307C7.651 13.2034 7.8042 13.5732 7.8042 13.9588C7.8042 14.3445 7.651 14.7143 7.37832 14.987C7.10563 15.2597 6.73579 15.4129 6.35015 15.4129ZM6.35015 21.5199C5.96452 21.5199 5.59467 21.3667 5.32199 21.094C5.0493 20.8213 4.89611 20.4515 4.89611 20.0658C4.89611 19.6802 5.0493 19.3103 5.32199 19.0377C5.59467 18.765 5.96452 18.6118 6.35015 18.6118C6.73579 18.6118 7.10563 18.765 7.37832 19.0377C7.651 19.3103 7.8042 19.6802 7.8042 20.0658C7.8042 20.4515 7.651 20.8213 7.37832 21.094C7.10563 21.3667 6.73579 21.5199 6.35015 21.5199ZM10.4215 6.97941H17.9825C18.2139 6.97941 18.4358 7.07133 18.5994 7.23494C18.763 7.39856 18.8549 7.62046 18.8549 7.85184C18.8549 8.08322 18.763 8.30513 18.5994 8.46874C18.4358 8.63235 18.2139 8.72427 17.9825 8.72427H10.4215C10.1901 8.72427 9.96819 8.63235 9.80458 8.46874C9.64097 8.30513 9.54905 8.08322 9.54905 7.85184C9.54905 7.62046 9.64097 7.39856 9.80458 7.23494C9.96819 7.07133 10.1901 6.97941 10.4215 6.97941ZM9.54905 13.9588C9.54905 13.7274 9.64097 13.5055 9.80458 13.3419C9.96819 13.1783 10.1901 13.0864 10.4215 13.0864H17.9825C18.2139 13.0864 18.4358 13.1783 18.5994 13.3419C18.763 13.5055 18.8549 13.7274 18.8549 13.9588C18.8549 14.1902 18.763 14.4121 18.5994 14.5757C18.4358 14.7393 18.2139 14.8313 17.9825 14.8313H10.4215C10.1901 14.8313 9.96819 14.7393 9.80458 14.5757C9.64097 14.4121 9.54905 14.1902 9.54905 13.9588ZM10.4215 19.1934H17.9825C18.2139 19.1934 18.4358 19.2853 18.5994 19.4489C18.763 19.6125 18.8549 19.8344 18.8549 20.0658C18.8549 20.2972 18.763 20.5191 18.5994 20.6827C18.4358 20.8463 18.2139 20.9382 17.9825 20.9382H10.4215C10.1901 20.9382 9.96819 20.8463 9.80458 20.6827C9.64097 20.5191 9.54905 20.2972 9.54905 20.0658C9.54905 19.8344 9.64097 19.6125 9.80458 19.4489C9.96819 19.2853 10.1901 19.1934 10.4215 19.1934ZM18.599 27.6617L25.5784 20.6823C25.6642 20.6025 25.7329 20.5061 25.7806 20.3991C25.8283 20.2921 25.8539 20.1766 25.856 20.0594C25.858 19.9423 25.8365 19.8259 25.7926 19.7173C25.7487 19.6087 25.6834 19.51 25.6006 19.4272C25.5177 19.3443 25.4191 19.279 25.3104 19.2351C25.2018 19.1912 25.0854 19.1697 24.9683 19.1718C24.8512 19.1738 24.7356 19.1995 24.6286 19.2472C24.5216 19.2948 24.4253 19.3636 24.3454 19.4493L17.9825 25.8122L15.1116 22.9413C14.9463 22.7872 14.7275 22.7033 14.5015 22.7073C14.2755 22.7113 14.0598 22.8029 13.9 22.9627C13.7401 23.1226 13.6486 23.3382 13.6446 23.5642C13.6406 23.7902 13.7245 24.009 13.8786 24.1744L17.366 27.6617C17.5296 27.8251 17.7513 27.9169 17.9825 27.9169C18.2137 27.9169 18.4354 27.8251 18.599 27.6617Z'
						fill={activeSlide === 'Tasks' ? '#E82C2C' : 'white'}
					/>
					<path
						d='M6.35015 21.5199C5.96452 21.5199 5.59467 21.3667 5.32199 21.094C5.0493 20.8213 4.89611 20.4515 4.89611 20.0658C4.89611 19.6802 5.0493 19.3103 5.32199 19.0377C5.59467 18.765 5.96452 18.6118 6.35015 18.6118C6.73579 18.6118 7.10563 18.765 7.37832 19.0377C7.651 19.3103 7.8042 19.6802 7.8042 20.0658C7.8042 20.4515 7.651 20.8213 7.37832 21.094C7.10563 21.3667 6.73579 21.5199 6.35015 21.5199Z'
						fill={activeSlide === 'Tasks' ? '#E82C2C' : 'white'}
					/>
					<path
						d='M10.4215 19.1934H17.9825C18.2139 19.1934 18.4358 19.2853 18.5994 19.4489C18.763 19.6125 18.8549 19.8344 18.8549 20.0658C18.8549 20.2972 18.763 20.5191 18.5994 20.6827C18.4358 20.8463 18.2139 20.9382 17.9825 20.9382H10.4215C10.1901 20.9382 9.96819 20.8463 9.80458 20.6827C9.64097 20.5191 9.54905 20.2972 9.54905 20.0658C9.54905 19.8344 9.64097 19.6125 9.80458 19.4489C9.96819 19.2853 10.1901 19.1934 10.4215 19.1934Z'
						fill={activeSlide === 'Tasks' ? '#E82C2C' : 'white'}
					/>
				</svg>
				<p
					className={`text-[10px] font-medium ${
						activeSlide === 'Tasks' ? 'text-[#E82C2C]' : 'text-white'
					}`}
				>
					Tasks
				</p>
			</NavLink>
		</nav>
	);
};

export default Nav;
