import img from '../assets/main_img.png';
import Btn from '../components/Btn';
import ListItem from '../components/ListItem';
import React, { useState, useEffect } from 'react';
import getUserId from '../utils/getUserId.jsx';

const Friends = () => {

	const [friends, setFriends] = useState([]);
	const [userId, setUserId] = useState(null);
	const [referralLink, setReferralLink] = useState('');

	let tg = window.Telegram.WebApp;

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				//const user_id = await getUserId(tg.initDataUnsafe.user.id);
				const user_id = await getUserId("506652203")
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

	// Функция для обработки нажатия на кнопку
	const handleCopyReferralLink = async () => {
		try {
			if (userId) {
				const response = await fetch(`https://envytelegramapp.onrender.com/api/v1/users/${userId}`, {
					method: "GET"
				});
				const userData = await response.json();
				
				// Проверяем, существует ли реферальная ссылка
				if (userData && userData.referal_link) {
					const link_of_user = userData.referal_link;
					const link = `https://t.me/AppDevEnvyTest_bot?start=${link_of_user}`
					setReferralLink(`https://t.me/AppDevEnvyTest_bot?start=${link}`);

					// Копируем реферальную ссылку в буфер обмена
					await navigator.clipboard.writeText(link);
					console.log("Referral link copied to clipboard:", link);
				} else {
					console.error("Referral link not found");
				}
			}
		} catch (error) {
			console.error("Failed to fetch referral link:", error);
		}
	};

	console.log("User data: ", friends);

	return (
		<section className='pt-[118px] flex flex-col'>
			<h2 className='text-3xl mb-4 text-center'>ENVY</h2>
			<img className='w-[175px] mx-auto mb-8' src={img} alt='ENVY' />
			{/* Кнопка, на которую добавлено событие onClick */}
			<Btn text='To invite a friend' onClick={handleCopyReferralLink} />
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
