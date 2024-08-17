import { useState, useEffect } from 'react';

const useCountdown = (lastClaimTime) => {
    const [timeLeft, setTimeLeft] = useState('00:00:00');

    useEffect(() => {
        if (!lastClaimTime) return;

        const calculateTimeLeft = () => {
            const claimInterval = 24 * 60 * 60 * 1000; // 24 часа в миллисекундах
            const lastClaimTimeInUTC1 = new Date(new Date(lastClaimTime).toLocaleString('en-US', { timeZone: 'Europe/Berlin' })).getTime();
            const nextClaimTimeInUTC1 = lastClaimTimeInUTC1 + claimInterval;
            const currentTimeInUTC1 = new Date(new Date().toLocaleString('en-US', { timeZone: 'Europe/Berlin' })).getTime();
            const timeLeft = nextClaimTimeInUTC1 - currentTimeInUTC1;

            if (timeLeft > 0) {
                const hours = String(Math.floor((timeLeft / (1000 * 60 * 60)) % 24)).padStart(2, '0');
                const minutes = String(Math.floor((timeLeft / (1000 * 60)) % 60)).padStart(2, '0');
                const seconds = String(Math.floor((timeLeft / 1000) % 60)).padStart(2, '0');
                console.log(`${hours}:${minutes}:${seconds}`)
                
                return `${hours}:${minutes}:${seconds}`;
            } else {
                return '00:00:00';
            }
            
        };

        const intervalId = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(intervalId);
    }, [lastClaimTime]);

    return timeLeft;
};

export default useCountdown;
