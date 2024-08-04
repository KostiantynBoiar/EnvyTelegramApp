import img from '../assets/main_img.png';
import Btn from '../components/Btn';
import ListItem from '../components/ListItem';
import React, { useState, useEffect } from 'react';
import getUserId from '../utils/getUserId.jsx';


const Friends = () => {

	const [friends, setFriends] = useState([]);
	const [userId, setUserId] = useState(null);
  
	let tg = window.Telegram.WebApp;
  
	useEffect(() => {
		const fetchUserData = async () => {
		  try {
		    const user_id = await getUserId(tg.initDataUnsafe.user.id);
			//const user_id = await getUserId("506652203");
			setUserId(user_id);
			console.log("User ID:", user_id);
	
			if (user_id) {
			  const response = await fetch(`https://envytelegramapp.onrender.com/api/v1/users/referrals/${user_id}`, {
				method: "GET"
			  });
			  const data = await response.json();
			  console.log("Data from API:", data);
	
			  if (Array.isArray(data)) {
				setFriends(data);
			  } else {
				console.error("Expected an array but got:", data);
				setFriends([]); // Fallback to an empty array
			  }
			}
		  } catch (error) {
			console.log(error);
		  }
		};
	
		fetchUserData();
	  }, []);
	
	  console.log("User data: ", friends);

	  return (
		<section className='pt-[118px] flex flex-col'>
		  <h2 className='text-3xl mb-4 text-center'>ENVY</h2>
		  <img className='w-[175px] mx-auto mb-8' src={img} alt='ENVY' />
		  <Btn text='To invite a friend' />
		  <ul className='flex flex-col gap-3 relative z-10'>
			{friends.map((friend, index) => {
			  return (
				<ListItem
				  key={index}
				  icon={friend.icon}
				  name={friend.telegram_username}
				  plus={friend.count_of_coins}
				/>
			  );
			})}
		  </ul>
		</section>
	  );
};

export default Friends;
