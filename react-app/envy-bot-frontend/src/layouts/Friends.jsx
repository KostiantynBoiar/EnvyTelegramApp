import img from '../assets/main_img.png';
import Btn from '../components/Btn';
import ListItem from '../components/ListItem';

const friends = [
	{ name: 'Player1', plus: '100', icon: true },
	{ name: 'Player2', plus: '100', icon: true },
	{ name: 'Player3', plus: '100', icon: true },
	{ name: 'Player4', plus: '100', icon: true },
	{ name: 'Player5', plus: '100', icon: true },
];

const Friends = () => {
	return (
		<section className='pt-[118px] flex flex-col'>
			<h2 className='text-3xl mb-4 text-center'>ENVY</h2>
			<img className='w-[175px] mx-auto mb-8' src={img} alt='ENVY' />
			<Btn text='To invite a friend' />
			<ul className='flex flex-col gap-3 relative z-10'>
				{friends.map(friend => {
					return (
						<ListItem
							key={friend.name}
							icon={friend.icon}
							name={friend.name}
							plus={friend.plus}
						/>
					);
				})}
			</ul>
		</section>
	);
};

export default Friends;
