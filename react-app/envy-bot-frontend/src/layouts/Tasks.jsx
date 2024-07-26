import { useEffect, useState } from 'react';
import img from '../assets/main_img.png';
import Btn from '../components/Btn';
import ListItem from '../components/ListItem';


const user_id = 3

const Tasks = () => {

	const [tasks, setTasks] = useState([]);
	const [loading, setLoading] = useState(true);

	const response_tasks = useEffect(() => {
		fetch(`http://localhost:8000/api/v1/tasks/${user_id}/tasks`, {
			method: "GET"
		})
		.then((response) => response.json())
		.then((data) => {
			setTasks(data);
			setLoading(false);
		})
		.catch((error) => console.log(error))
	}, [])

	console.log("Your tasks: ", tasks)

	return (
		<section className='pt-[118px] flex flex-col'>
			<h2 className='text-3xl mb-4 text-center'>ENVY</h2>
			<img className='w-[175px] mx-auto mb-8' src={img} alt='ENVY' />
			<Btn text='Claim reward' />
			<ul className='flex flex-col gap-3 relative z-10'>
				{tasks.map(task => {
					return (
						<ListItem
							name={task.title}
							plus={task.award}
						/>
					);
				})}
			</ul>
		</section>
	);
};

export default Tasks;
