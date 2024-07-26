import img from '../assets/main_img.png';
import Btn from '../components/Btn';
import ListItem from '../components/ListItem';

const tasks = [
	{ name: 'Subscribe Telegram', plus: '10' },
	{ name: 'Subscribe Instagram', plus: '10' },
	{ name: 'Subscribe Youtube', plus: '10' },
	{ name: 'Subscribe Twitter', plus: '10' },
];

const Tasks = () => {
	return (
		<section className='pt-[118px] flex flex-col'>
			<h2 className='text-3xl mb-4 text-center'>ENVY</h2>
			<img className='w-[175px] mx-auto mb-8' src={img} alt='ENVY' />
			<Btn text='Claim reward' />
			<ul className='flex flex-col gap-3 relative z-10'>
				{tasks.map(task => {
					return (
						<ListItem
							key={task.name}
							icon={false}
							name={task.name}
							plus={task.plus}
						/>
					);
				})}
			</ul>
		</section>
	);
};

export default Tasks;
