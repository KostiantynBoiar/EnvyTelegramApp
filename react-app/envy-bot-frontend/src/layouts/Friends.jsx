import img from '../assets/main_img.png';
import Btn from '../components/Btn';
import ListItem from '../components/ListItem';
import React, { useState, useEffect } from 'react';
import getUserId from '../utils/getUserId.jsx';
import copy from 'copy-to-clipboard';

const Friends = () => {
    const [friends, setFriends] = useState([]);
    const [userId, setUserId] = useState(null);
    const [referralLink, setReferralLink] = useState('');

    let tg = window.Telegram.WebApp;

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const user_id = await getUserId(tg.initDataUnsafe.user.id);
				//const user_id = await getUserId("506652203")
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

    const handleCopyReferralLink = async () => {
		if (!userId) {
			console.error("User ID is not available");
			return;
		}
	
		try {
			const response = await fetch(`https://envytelegramapp.onrender.com/api/v1/users/${userId}`, {
				method: "GET"
			});
	
			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
	
			const userData = await response.json();
	
			if (userData && userData.referal_link) {
				const referralLink = `https://t.me/AppDevEnvyTest_bot?start=${userData.referal_link}`;
				setReferralLink(referralLink);
	
				if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
					try {
						await navigator.clipboard.writeText(referralLink);
					} catch (err) {
						try{
							copy(referralLink)
						}
						catch(err){
							alert('Error copying text')
							console.error("Error copying text:", err);
						}
					}
				}
	
				console.log("Referral link copied to clipboard:", referralLink);
			} else {
				console.error("Referral link not found");
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
            <Btn text='To invite a friend' afterClickText="Link has been copied" onClick={handleCopyReferralLink} />
            <ul className='flex flex-col gap-3 relative z-10'>
                {friends.map((friend, index) => (
                    <ListItem
                        key={index}
                        icon={friend.icon}
                        name={friend.telegram_username}
                        plus={friend.count_of_coins}
                    />
                ))}
            </ul>
        </section>
    );
};

export default Friends;
