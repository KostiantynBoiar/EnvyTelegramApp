import main_img from '../assets/main_img.png';
import Btn from '../components/Btn';
import React, { useState, useEffect } from 'react';
import getUserId from '../utils/getUserId.jsx';
import useCountdown from '../utils/useCountdown.jsx';


export const Home = () => {
    const [coins, setCoins] = useState([]);
    const [user, setUser] = useState(null);
    const timeLeft = useCountdown(user ? user.last_time_of_the_claim : null);
    const [text, setText] = useState("Claim reward");
    let tg = window.Telegram.WebApp;

    useEffect(() => {
        if (timeLeft !== "00:00:00") {
            setText("Not available now");
        } else {
            setText("Claim reward");
        }
    }, [timeLeft]);

    useEffect(() => {
        const fetchUserData = async () => {
			//const user_id = await getUserId(tg.initDataUnsafe.user.id);
            const user_id = await getUserId("506652203");
            if (user_id) {
                fetch(`https://envytelegramapp.onrender.com/api/v1/users/${user_id}`, {
                    method: "GET"
                })
                .then((response) => response.json())
                .then((data) => {
                    setUser(data);
                })
                .catch((error) => {
                    console.log(error);
                });
            }
        };

        fetchUserData();
    }, []);

    const handleRewardClick = async () => {
        if (timeLeft !== "00:00:00") {
            alert(`Time left until next claim: ${timeLeft}`);
            return;
        }

        const reward = { coins: 7 };

        try {
            const response = await fetch(`https://envytelegramapp.onrender.com/api/v1/users/claim/${user.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(reward),
            });

            if (response.ok) {
                const updatedUser = await response.json();
                setUser(updatedUser);
                setCoins(updatedUser.count_of_coins);
                setText("Process farm...");
                console.log('Reward claimed successfully:', updatedUser);

                try {
                    await fetch(`https://envytelegramapp.onrender.com/api/v1/users/reward/${user.reffered_by}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({coins: 1}),
                    });
                } catch (err) {
                    console.log("User has no refferer");
                }

            } else {

                switch (response.status) {
                    case 404:
                        setText("User not found");
                        console.error('User not found');
                        break;
                    case 500:
                        setText("Not available yet");
                        break;
                    default:
                        setText("Something went wrong");
                        console.error('Something went wrong');
                        break;
                }
            }
        } catch (error) {
            setText("Something went wrong");
            console.error('Request failed:', error);
        }
    };

    console.log("User data: ", coins);

	return (
		<section className='pt-[120px] flex flex-col'>
			<h1 className='text-[50px] font-semibold leading-[64px] text-center mb-5'>
				ENVY
			</h1>
			<img className='w-[286px] mx-auto mb-10' src={main_img} alt='ENVY' />
			<div className='flex items-center gap-3 justify-center mb-8'>
				<span className='text-[48px] leading-[61px] font-semibold '>
				{user ? user.count_of_coins : 0}.00
				</span>{' '}
				<svg
					xmlns='http://www.w3.org/2000/svg'
					width='43'
					height='47'
					viewBox='0 0 43 47'
					fill='none'
				>
					<path
						fillRule='evenodd'
						clipRule='evenodd'
						d='M25.479 0.2819L25.6886 0.304965C26.1312 0.358566 26.5438 0.438803 26.9657 0.585324C27.3199 1.03714 27.326 1.60134 27.3811 2.15554C27.4203 2.43819 27.4203 2.43819 27.6268 2.54468L27.8396 2.62433C27.9765 2.72923 28.11 2.83875 28.2401 2.95203L28.4411 3.12422C28.7148 3.40501 28.804 3.59106 28.8295 3.98518L28.8227 4.29923L28.8174 4.6163L28.8106 4.85753L28.4222 4.95462L28.6164 5.4401C28.9048 5.40687 28.9048 5.40686 29.1989 5.343C29.4155 4.90993 29.3439 4.43238 29.208 3.98556C28.9282 3.27792 28.5715 2.71485 28.0649 2.15175C27.5748 1.60541 27.5748 1.60541 27.5483 1.1679C27.7929 1.07792 27.9122 1.06309 28.1642 1.14241L28.4153 1.26082L28.696 1.39274L28.9926 1.53807L29.296 1.68512C30.106 2.08739 30.824 2.54682 31.5292 3.10981L31.7416 3.26228C32.2515 3.64687 32.4998 4.15901 32.773 4.72241L32.7915 4.76043L32.9436 5.0521C33.9521 7.07163 34.0388 9.31445 33.374 11.46C32.456 14.144 30.9936 16.5349 29.0958 18.6329L28.9589 18.7854C28.8489 18.9045 28.7331 19.0181 28.6164 19.1306L28.3251 19.4219C27.9911 19.739 27.6218 20.015 27.257 20.2957L27.1032 20.4155C23.987 22.8193 19.9834 23.6997 16.2549 24.7075C10.0915 26.1158 10.0915 26.1158 5.62901 30.2419C5.11469 31.2217 4.82005 32.217 5.09764 33.3133C5.57172 34.6327 6.78798 35.5254 7.99609 36.1591C9.81464 36.9501 11.7711 36.6001 13.558 35.9175C15.6941 35.0724 17.6094 33.9066 19.5052 32.6189C19.8672 32.3741 20.231 32.132 20.5948 31.8899L20.6597 31.8467C21.046 31.5894 21.4317 31.3312 21.8167 31.072C24.7289 29.1118 24.7289 29.1118 26.1796 28.2788C26.3797 28.1625 26.5768 28.0422 26.7738 27.9207C29.3709 26.3475 32.7377 25.9195 35.7043 26.5098C36.1757 26.6274 36.6196 26.7993 37.0637 26.9953L37.325 27.1042C39.5367 28.1044 40.7638 30.3717 41.615 32.5297C42.3534 34.5516 42.1767 36.5411 41.2843 38.4852C40.0976 40.797 38.2277 42.64 36.0927 44.0841L35.8105 44.2772C33.8099 45.576 31.4982 46.6028 29.1018 46.8028L28.8792 46.8236C27.3278 46.8964 25.7721 46.3312 24.6079 45.3183C24.3476 45.0784 24.1007 44.8279 23.8587 44.5696L23.6137 44.3086C22.3496 42.859 21.7881 41.2637 21.8962 39.3512C22.0736 37.4601 23.4345 35.9872 24.8228 34.8153C26.7079 33.4139 29.0327 32.9549 31.3251 33.2891C32.4297 33.4763 33.4295 33.8625 34.1174 34.7842C34.8072 35.8526 34.9676 37.01 34.8305 38.2584C34.7478 38.6166 34.6238 38.9109 34.4421 39.2293L34.3241 39.4444C33.4817 40.8338 32.1145 41.8926 30.5583 42.3364C29.3327 42.5693 28.31 42.3128 27.257 41.6567C26.7006 41.2164 26.2693 40.737 26.16 40.0066C26.1465 39.8012 26.1436 39.5991 26.1465 39.3932L26.1483 39.1741C26.1705 38.3897 26.3807 37.6466 26.9657 37.0932C27.8327 36.5308 28.553 36.4269 29.5873 36.5107C30.1139 36.665 30.3944 37.0098 30.6554 37.4816C30.8313 38.0094 30.8214 38.5479 30.6372 39.0716C30.3714 39.4564 30.1336 39.6655 29.6844 39.8058C29.3366 39.8131 29.1841 39.7239 28.9077 39.5206C28.9259 39.3446 28.9259 39.3446 29.0047 39.1322C29.2536 38.9623 29.2536 38.9623 29.4902 38.841C29.4245 38.5406 29.4245 38.5406 29.1989 38.4283C28.8049 38.3298 28.4229 38.3258 28.0338 38.4526C27.7463 38.7362 27.6984 38.9657 27.694 39.3628C27.7034 39.7331 27.7329 39.9695 27.967 40.261C28.3997 40.6433 28.8054 40.6274 29.3609 40.622C30.1713 40.5384 30.8621 40.1471 31.4784 39.631C31.6263 39.5206 31.9066 39.2155 31.9066 39.2155C31.9066 39.2155 32.0565 39.06 32.1399 38.9161C32.5097 38.2521 32.6216 37.7195 32.4505 36.9738C32.2591 36.3841 31.9096 36.0298 31.3836 35.7096C30.2606 35.1481 28.8043 35.3962 27.6488 35.7637C26.5246 36.1467 25.4412 36.5643 24.8418 37.6515C24.3378 38.7803 24.3233 40.0527 24.7208 41.2224C25.2287 42.3427 26.0535 42.9509 27.1539 43.4348C28.965 44.0972 31.019 43.8854 32.7744 43.1609C35.1869 42.0274 37.1825 39.8751 38.1317 37.3845C38.5277 36.2477 38.6468 34.9105 38.1317 33.792C37.2437 32.2252 35.6652 31.114 33.946 30.5935C33.6889 30.5416 33.4413 30.5092 33.1799 30.4907L32.9534 30.4706C28.7015 30.2803 24.3848 33.5978 21.2917 36.1708C17.9549 38.9145 13.5119 41.3823 9.05504 41.0371C6.39584 40.7681 3.94989 39.5614 2.18932 37.529C1.15491 36.1853 0.435137 34.529 0.361575 32.821L0.349817 32.6003C0.284534 30.227 1.24245 27.9473 2.81893 26.2026C3.17818 25.8241 3.54532 25.4749 3.95411 25.1505L4.16613 24.9798C5.6512 23.8629 7.55926 23.2625 9.32091 22.7379L9.57312 22.6625C10.4326 22.4078 11.2972 22.1727 12.1628 21.9399C15.9532 20.9252 15.9532 20.9252 19.6836 19.7131L19.9087 19.6337C23.1249 18.4859 25.9091 16.6295 27.4512 13.499C27.9411 12.3745 28.2667 11.2995 28.2644 10.0643L28.2639 9.79306C28.2519 9.12335 28.1618 8.56084 27.8396 7.96458L27.6697 7.64902C26.8461 6.64237 25.8324 6.2089 24.552 6.0496C22.8724 5.90128 21.2938 6.2701 19.6836 6.70234L19.6896 6.91284C19.6733 7.70403 19.4424 8.17305 19.0092 8.82593C18.7212 9.26455 18.5133 9.70915 18.3242 10.1978L18.2537 10.3785C17.6222 12.0428 17.4725 13.7941 17.2752 15.5513L17.2373 15.8826C17.2142 16.0874 17.1922 16.2924 17.1714 16.4975C17.1091 17.0635 17.0117 17.5441 16.7707 18.0625C16.3011 18.4288 15.8168 18.5893 15.2172 18.548C14.6006 18.377 14.2297 17.9814 13.8579 17.4799L14.3319 17.3472C14.5966 17.2681 14.8581 17.1789 15.1201 17.0916V15.538C14.3509 15.2261 14.3509 15.2261 13.5666 14.9555C13.7138 14.5808 13.9118 14.3993 14.2462 14.1787C14.5332 14.0655 14.8237 13.9726 15.1201 13.8874L15.0719 13.719C14.9974 13.3839 15.0173 13.065 15.023 12.7223L14.8516 12.6441C14.6286 12.5249 14.4595 12.3918 14.2705 12.2246L14.09 12.0661L13.9549 11.9455C14.2598 11.5066 14.5584 11.3129 15.023 11.0716C15.0256 10.9159 15.0275 10.7601 15.0291 10.6044L15.0325 10.3415C15.0337 10.0877 15.0337 10.0877 14.9259 9.8094L14.8433 9.97929C13.7895 12.1375 12.6777 14.2817 11.0129 16.0368C9.7518 17.3745 8.26616 19.2277 8.1076 21.1388L8.12921 21.3638L8.37195 21.5094L8.61469 21.655C8.64503 21.916 8.64503 21.916 8.61469 22.1405C8.29955 22.3506 8.00388 22.3806 7.63426 22.373C7.44955 22.3347 7.44955 22.3347 7.21288 22.1041C6.78877 21.3916 6.86098 20.3976 7.04523 19.6009C7.57988 17.6494 8.75094 16.1529 10.1743 14.7613C10.8844 14.0652 11.4917 13.3745 12.013 12.5281L12.1372 12.3311C12.9209 11.0728 13.4521 9.7295 13.6637 8.25587L13.4888 8.4163C13.0502 8.8154 12.6068 9.20476 12.1465 9.5788L11.8795 9.80029C11.6247 10.0036 11.6247 10.0036 11.388 10.1583C11.0048 10.4266 10.8679 10.5773 10.7789 11.0493C10.7463 11.4135 10.7433 11.7743 10.7508 12.1397C10.3615 12.2497 10.173 12.2289 9.81625 12.0426C9.60072 11.9258 9.60072 11.9258 9.39146 11.8484L9.10017 11.9455C8.97818 12.2384 8.97818 12.2384 8.88777 12.5827L8.78651 12.935L8.71179 13.2077C8.22921 13.3288 7.98662 13.258 7.54664 13.0135C7.35852 12.7526 7.35852 12.7526 7.25536 12.5281C6.83378 12.546 6.83378 12.546 6.47859 12.7223C6.46155 13.1567 6.49248 13.5581 6.57569 13.9845C6.06478 14.0152 5.74507 13.9747 5.31345 13.6932C4.84354 13.234 4.64086 12.7968 4.63074 12.1355C4.68384 11.4493 4.99563 10.9726 5.47729 10.5012C5.94239 10.1041 6.45524 9.84182 6.99695 9.56675C7.99812 9.05461 8.92693 8.42291 9.79615 7.70971C9.97403 7.5762 9.97403 7.5762 10.1853 7.4791C10.3966 7.38935 10.3966 7.38935 10.4595 7.09072H10.6537L10.7273 6.93029C10.8717 6.65731 11.0436 6.41591 11.2227 6.16429L11.2241 6.16225C11.6066 5.62007 11.9604 5.06302 12.3104 4.49949C13.3293 2.87268 14.3679 1.6363 16.267 1.08901C16.905 0.943902 17.5784 0.867528 18.2271 0.973706C18.4749 1.17273 18.5983 1.32854 18.743 1.61089C19.0611 2.07043 19.564 2.14061 20.0841 2.23595C20.5497 2.32214 20.8618 2.44989 21.2068 2.78211C21.3986 3.12927 21.458 3.49883 21.5284 3.88657C21.9305 3.90693 21.9305 3.90693 22.3052 3.78948C22.3478 3.42305 22.3469 3.26072 22.117 2.96416L21.8197 2.72142L21.6611 2.58564C21.0636 2.12843 20.3743 1.9188 19.6672 1.68832L19.4169 1.60634L19.1904 1.53438C19.0039 1.45918 19.0039 1.45918 18.8097 1.26499C18.8461 1.01012 18.8461 1.01012 18.9068 0.779515C19.5255 0.541901 20.0907 0.421475 20.7516 0.391133L20.9655 0.376862C21.2097 0.361505 21.4537 0.351597 21.6983 0.342585L21.9385 0.326394C22.2836 0.318871 22.5057 0.318827 22.7821 0.539052C23.179 0.987618 23.179 0.987618 23.179 1.26499L23.352 1.34805C23.5483 1.44931 23.7243 1.56055 23.9072 1.68372C24.3354 1.96052 24.791 2.1209 25.2723 2.28412C25.5093 2.43014 25.5093 2.43014 25.5973 2.70739C25.6058 2.99142 25.5859 3.21227 25.5154 3.48605L25.4581 3.7159L25.4122 3.88657L25.8006 4.08076C25.9846 3.92602 26.0818 3.8356 26.134 3.59718C26.1351 2.95159 25.9905 2.49162 25.581 1.98828C25.0035 1.42589 24.1894 1.12075 23.4703 0.779515L23.2761 0.682419C23.3065 0.494297 23.3065 0.494297 23.3732 0.294037C24.0449 0.0701552 24.787 0.20352 25.479 0.2819ZM13.2969 5.61419C13.5862 5.08064 13.8911 4.64153 14.3069 4.19606C14.5091 3.96174 14.5091 3.96174 14.7317 3.98367C14.3653 5.22968 14.3653 5.22968 13.5666 6.31396C13.2293 6.71717 12.9391 7.09741 12.4014 7.18782C12.3721 6.88831 12.3721 6.88831 12.5713 6.672C12.8498 6.33942 13.0866 5.99388 13.2969 5.61419Z'
						fill='white'
					/>
					<path
						d='M34.9274 7.18794C35.5251 7.48608 35.87 7.97451 36.1897 8.54728C36.3348 8.98272 36.3992 9.47086 36.1999 9.89903C36.0926 10.0583 36.0926 10.0583 35.8984 10.295C36.1596 10.1765 36.1596 10.1765 36.3839 10.0037C36.8113 9.95871 36.8113 9.95871 37.0229 10.1228C37.3259 10.5017 37.3778 11.0386 37.3302 11.5102C37.2525 11.8796 37.1432 12.1941 36.9664 12.5282C37.0245 12.5082 37.0826 12.4881 37.1424 12.4675C37.3548 12.4311 37.3548 12.4311 37.6461 12.6253C37.7978 13.382 37.5923 14.2898 37.197 14.9374C36.9006 15.3454 36.5671 15.6459 36.0926 15.8294C35.6869 15.8122 35.6869 15.8122 35.51 15.6352C35.483 15.3164 35.4875 14.9962 35.4857 14.6764C35.4837 14.5867 35.4817 14.4969 35.4797 14.4045C35.4792 14.3182 35.4787 14.232 35.4781 14.1432C35.4768 14.0243 35.4768 14.0243 35.4754 13.9031C35.5175 13.6476 35.6042 13.5633 35.8013 13.4021C35.7372 13.3059 35.6731 13.2098 35.6071 13.1108C35.5607 12.9398 35.5186 12.7677 35.4797 12.5949C35.3502 12.0916 35.1792 11.8366 34.8303 11.4601C34.7514 11.2295 34.7514 11.2295 34.7332 11.0718C34.6251 11.0918 34.517 11.1118 34.4055 11.1324C34.2894 11.1445 34.1732 11.1565 34.0536 11.1689C33.9895 11.1048 33.9254 11.0407 33.8594 10.9747C33.8897 10.6652 33.8897 10.6652 33.9565 10.295C34.0679 9.65235 34.0856 9.01021 34.1082 8.35915C34.1124 8.24644 34.1166 8.13374 34.1209 8.01761C34.1311 7.74106 34.141 7.46451 34.1507 7.18794C34.4442 7.04118 34.6122 7.10468 34.9274 7.18794ZM34.9274 8.25599C34.8954 8.86478 34.8633 9.47357 34.8303 10.1008C35.2344 9.91921 35.2344 9.91921 35.51 9.61533C35.5784 9.11439 35.5784 9.11439 35.4042 8.6584C35.2612 8.47795 35.2612 8.47795 35.0245 8.25599C34.9925 8.25599 34.9604 8.25599 34.9274 8.25599ZM36.1351 11.1203C36.0728 11.1654 36.0106 11.2104 35.9465 11.2568C35.8986 11.2919 35.8507 11.3269 35.8013 11.363C35.9226 11.6989 36.061 11.9599 36.2868 12.2369C36.5786 11.7505 36.6065 11.4284 36.578 10.8776C36.402 10.8776 36.2728 11.0201 36.1351 11.1203ZM36.4749 13.8936C36.2475 14.0798 36.2475 14.0798 36.2625 14.4398C36.2705 14.5459 36.2785 14.652 36.2868 14.7614C36.489 14.6607 36.489 14.6607 36.6751 14.4701C36.7541 14.1201 36.7541 14.1201 36.7722 13.7904C36.652 13.783 36.652 13.783 36.4749 13.8936Z'
						fill='white'
					/>
					<path
						d='M38.4232 21.9465C39.3205 22.6499 39.3205 22.6499 39.4817 23.0233C39.4912 23.2088 39.4912 23.2088 39.297 23.5001C39.1118 23.5568 39.1118 23.5568 38.8882 23.5854C38.7669 23.6024 38.7669 23.6024 38.6432 23.6197C38.5585 23.6303 38.4739 23.6409 38.3868 23.6518C38.22 23.6735 38.0534 23.6959 37.8869 23.7189C37.8128 23.7282 37.7388 23.7376 37.6626 23.7472C37.4374 23.7945 37.2674 23.8806 37.0638 23.9855C36.6965 24.0214 36.6045 24.003 36.2871 23.7913C36.147 23.8959 36.0075 24.0012 35.8683 24.1069C35.7906 24.1655 35.7129 24.2241 35.6328 24.2844C35.4243 24.4616 35.2757 24.6344 35.1219 24.8594C34.7971 24.8305 34.6641 24.7905 34.432 24.5541C34.3653 24.4686 34.2986 24.3831 34.2299 24.295C33.8513 23.8477 33.5438 23.6493 32.9828 23.4917C32.7916 23.403 32.7916 23.403 32.7036 23.2145C32.6945 23.0146 32.6945 23.0146 32.8887 22.7658C33.4318 22.3245 33.9134 22.1881 34.6012 22.209C34.9164 22.2486 35.1448 22.3629 35.4132 22.5291C35.4893 22.5672 35.5654 22.6052 35.6438 22.6444C35.6959 22.6704 35.7479 22.6965 35.8016 22.7233C35.7235 22.6652 35.6454 22.6071 35.5649 22.5473C35.3161 22.3349 35.3161 22.3349 35.219 22.0436C35.2676 21.8434 35.2676 21.8434 35.4132 21.6552C36.3827 21.2146 37.5658 21.3395 38.4232 21.9465ZM36.3842 22.3349C36.6245 22.7194 36.6245 22.7194 36.8696 23.1117C37.3521 23.0618 37.7717 22.9919 38.229 22.8204C37.848 22.36 37.3685 22.1738 36.7847 22.1104C36.5576 22.1228 36.5576 22.1228 36.3842 22.3349ZM35.8987 22.9175C35.9307 23.0136 35.9628 23.1097 35.9958 23.2088C35.9958 23.1126 35.9958 23.0165 35.9958 22.9175C35.9637 22.9175 35.9317 22.9175 35.8987 22.9175ZM34.0539 23.0146C34.142 23.1245 34.2312 23.2336 34.3209 23.3423C34.3704 23.4031 34.42 23.4639 34.4711 23.5266C34.6444 23.7023 34.7995 23.7915 35.0248 23.8884C35.153 23.7603 35.2812 23.6321 35.4132 23.5001C34.9125 23.0916 34.7062 23.0025 34.0539 23.0146Z'
						fill='white'
					/>
					<path
						d='M33.8596 11.46C34.1614 11.4671 34.3719 11.4958 34.6038 11.6978C35.0032 12.1513 35.244 12.5226 35.225 13.1409C35.1537 13.6858 34.8267 14.0044 34.4422 14.3728C34.5123 14.3408 34.5824 14.3087 34.6546 14.2757C34.9293 14.178 35.1247 14.1622 35.4131 14.1786C35.6383 14.629 35.4767 15.2481 35.3255 15.7068C34.9972 16.4352 34.4909 16.8711 33.7625 17.1886C33.5076 17.1765 33.5076 17.1765 33.277 17.0915C33.1375 16.9337 33.1375 16.9337 33.0829 16.7031C33.1315 16.5476 33.1804 16.3921 33.2315 16.2374C33.3269 15.7891 33.3076 15.2971 33.1799 14.8583C32.9424 14.6932 32.9424 14.6932 32.6945 14.567C32.4831 13.933 33.0003 13.1618 33.2831 12.5948C33.3779 12.4105 33.4729 12.2264 33.5683 12.0425C33.6657 11.8485 33.7629 11.6543 33.8596 11.46ZM34.248 12.4309C33.9917 12.9436 33.7353 13.4562 33.4712 13.9844C33.9435 13.7955 34.1499 13.7089 34.4422 13.3048C34.4538 13.0033 34.4098 12.7249 34.3451 12.4309C34.3131 12.4309 34.281 12.4309 34.248 12.4309ZM34.0538 15.3438C34.0538 15.6001 34.0538 15.8564 34.0538 16.1205C34.4694 15.7539 34.4694 15.7539 34.6364 15.2467C34.2697 15.2177 34.2697 15.2177 34.0538 15.3438Z'
						fill='white'
					/>
					<path
						d='M33.1798 23.791C33.7769 24.0726 34.2814 24.6361 34.5392 25.2474C34.4906 25.5872 34.4906 25.5872 34.345 25.7329C34.18 25.739 34.0147 25.7386 33.8496 25.7355C33.697 25.7337 33.697 25.7337 33.5413 25.7319C33.3269 25.7285 33.1124 25.7248 32.898 25.7205C32.3305 25.7147 31.8727 25.7492 31.335 25.9271C31.0012 25.8907 31.0012 25.8907 30.7524 25.83C30.6679 25.5441 30.6391 25.389 30.7426 25.1052C31.3223 24.1343 32.0056 23.5806 33.1798 23.791ZM31.9176 24.7619C31.8855 24.826 31.8535 24.8901 31.8205 24.9561C32.3332 24.9561 32.8458 24.9561 33.374 24.9561C33.3086 24.6596 33.3086 24.6596 33.1009 24.5495C32.6293 24.3744 32.3284 24.5246 31.9176 24.7619Z'
						fill='white'
					/>
					<path
						d='M37.2548 24.4463C37.8442 24.7565 38.1834 25.1746 38.417 25.7814C38.5374 26.1767 38.5105 26.422 38.3259 26.8009C37.8841 26.8255 37.6107 26.7643 37.2154 26.5703C36.6147 26.3034 36.0653 26.2222 35.4184 26.1561C35.1218 26.1212 35.1218 26.1212 34.9276 26.0241C34.8783 25.5063 34.9911 25.2608 35.316 24.859C35.9141 24.278 36.4694 24.1471 37.2548 24.4463ZM35.8985 25.2473C35.8985 25.3114 35.8985 25.3755 35.8985 25.4415C36.0988 25.4881 36.299 25.5346 36.4993 25.5811C36.6108 25.607 36.7224 25.6329 36.8373 25.6596C37.1063 25.7205 37.3755 25.7774 37.6463 25.8299C37.4457 25.4394 37.2763 25.2288 36.8695 25.0531C36.441 25.0162 36.2603 25.0062 35.8985 25.2473Z'
						fill='white'
					/>
					<path
						d='M39.914 24.0437C40.3768 24.4373 40.7303 24.938 40.8504 25.5388C40.8383 25.8058 40.8383 25.8058 40.7533 26.0243C40.5773 26.1578 40.5773 26.1578 40.3649 26.2185C40.2345 26.1905 40.1051 26.1571 39.9766 26.1214C39.633 26.1015 39.3066 26.0896 38.9753 26.1881C38.9212 26.1982 38.8671 26.2082 38.8114 26.2185C38.5422 26.0026 38.4321 25.7597 38.2956 25.4478C38.0835 25.003 37.8745 24.8271 37.4521 24.5679C37.361 24.313 37.361 24.313 37.355 24.0824C37.4521 23.8882 37.4521 23.8882 37.6083 23.8294C38.3415 23.7084 39.2595 23.6416 39.914 24.0437ZM38.6172 24.4708C38.7774 24.7591 38.9376 25.0475 39.1027 25.3446C39.3911 25.3446 39.6794 25.3446 39.9766 25.3446C39.7918 25.0028 39.6401 24.7586 39.2969 24.5679C38.9422 24.4975 38.9422 24.4975 38.6172 24.4708Z'
						fill='white'
					/>
					<path
						d='M40.3649 26.5186C40.8264 26.8776 41.0746 27.3122 41.2388 27.8692C41.3045 28.4046 41.1866 28.8485 40.9475 29.3256C40.8834 29.3897 40.8193 29.4538 40.7533 29.5198C40.5235 29.516 40.5235 29.516 40.2678 29.4227C40.0668 29.1959 40.0668 29.1959 39.8673 28.9008C39.4743 28.3355 39.0276 27.8829 38.5194 27.4201C38.3259 27.1895 38.3259 27.1895 38.3309 26.9782C38.4941 26.6646 38.7578 26.4617 39.0928 26.3528C39.5333 26.2726 39.9678 26.3021 40.3649 26.5186ZM39.394 27.0924C39.7229 27.5479 40.0525 27.9692 40.462 28.3546C40.4936 27.902 40.4445 27.6516 40.1707 27.2866C39.8573 27.0777 39.7548 27.0729 39.394 27.0924Z'
						fill='white'
					/>
					<path
						d='M32.4697 14.8828C32.6942 14.9556 32.6942 14.9556 32.8642 15.1377C33.0771 15.6699 33.1832 16.241 32.9673 16.7883C32.6598 17.3186 32.4102 17.5118 31.8204 17.6743C31.4908 17.6967 31.4908 17.6967 31.1589 17.6925C31.0482 17.6919 30.9374 17.6913 30.8233 17.6906C30.5581 17.6743 30.5581 17.6743 30.461 17.5772C30.4206 17.2656 30.432 17.1323 30.6173 16.8736C30.6859 16.8034 30.7545 16.7332 30.8252 16.6609C31.1323 16.3349 31.3812 16.011 31.6262 15.6353C32.0967 14.9869 32.0967 14.9869 32.4697 14.8828ZM32.2088 16.1208C32.0165 16.4092 32.0165 16.4092 31.8204 16.7034C31.9165 16.7034 32.0126 16.7034 32.1117 16.7034C32.1758 16.6393 32.2398 16.5752 32.3059 16.5092C32.2749 16.3045 32.2749 16.3045 32.2088 16.1208Z'
						fill='white'
					/>
				</svg>
			</div>
			<Btn text={timeLeft != "00:00:00" ? timeLeft : "Claim reward"} afterClickText={text} onClick={handleRewardClick} disabled={timeLeft != "00:00:00" ? true : false} />
		</section>
	);
};
