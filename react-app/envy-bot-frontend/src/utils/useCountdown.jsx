import { useState, useEffect } from 'react';

const useCountdown = (lastClaimTime) => {
    const [timeLeft, setTimeLeft] = useState('00:00:00');

    useEffect(() => {
        if (!lastClaimTime) return;

        const getOffsetFromUTC = () => {
            const offset = new Date().getTimezoneOffset();
            const sign = offset > 0 ? '-' : '+';
            const absOffset = Math.abs(offset);
            const hours = Math.floor(absOffset / 60) - 1;
            const minutes = String(absOffset % 60).padStart(2, '0');
            return hours;
        };

        const calculateTimeLeft = () => {
            const claimInterval = 24 * 60 * 60 * 1000; 
            console.log(getOffsetFromUTC())
            const lastClaimTimeInUTC1 = new Date(lastClaimTime).getTime()
            const nextClaimTimeInUTC1 = lastClaimTimeInUTC1 + claimInterval;
            const currentTimeInUTC1 = new Date().getTime();
            const timeLeft = nextClaimTimeInUTC1 - currentTimeInUTC1;

            if (timeLeft > 0) {
                const hours = String(Math.floor((timeLeft / (1000 * 60 * 60)) % 24) + 1 + getOffsetFromUTC()).padStart(2, '0');
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
