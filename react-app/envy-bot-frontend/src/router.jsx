import { createBrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import { Home } from './layouts/Home';
import Friends from './layouts/Friends';
import Tasks from './layouts/Tasks';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				element: <Home />,
				index: true,
			},
			{
				element: <Friends />,
				path: '/friends',
			},
			{
				element: <Tasks />,
				path: '/tasks',
			},
		],
	},
]);

export default router;
