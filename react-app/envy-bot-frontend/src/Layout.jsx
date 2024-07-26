import { Outlet } from 'react-router-dom';
import { ScrollRestoration } from './components/ScrollRestoration';
import { useState } from 'react';
import Nav from './components/Nav';

const Layout = () => {
	const [activeSlide, setActiveSlide] = useState('Home');

	return (
		<ScrollRestoration>
			<div className='wrapper'>
				<div className='content'>
					<Outlet></Outlet>
				</div>
				<Nav activeSlide={activeSlide} setActiveSlide={setActiveSlide} />
			</div>
		</ScrollRestoration>
	);
};

export default Layout;
