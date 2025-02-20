'use client'; import { useState, useEffect } from 'react'; import { motion } from 'framer-motion'; import Confetti from 'react-confetti'; import { useWindowSize } from 'react-use';

export default function BirthdayCountdown() { const targetDate = new Date('2025-02-22T00:00:00'); const [timeLeft, setTimeLeft] = useState(calculateTimeLeft()); const [showConfetti, setShowConfetti] = useState(false); const { width, height } = useWindowSize();

function calculateTimeLeft() { const now = new Date(); const difference = targetDate - now; return { days: Math.floor(difference / (1000 * 60 * 60 * 24)), hours: Math.floor((difference / (1000 * 60 * 60)) % 24), minutes: Math.floor((difference / 1000 / 60) % 60), seconds: Math.floor((difference / 1000) % 60), }; }

useEffect(() => { const timer = setInterval(() => { setTimeLeft(calculateTimeLeft()); if (targetDate - new Date() <= 0) { setShowConfetti(true); clearInterval(timer); } }, 1000); return () => clearInterval(timer); }, []);

return ( <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-700 text-white text-center p-6"> {showConfetti && <Confetti width={width} height={height} />} <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-4xl md:text-6xl font-bold mb-4" > Joyeux Anniversaire Hugues ! 🎉 </motion.h1> <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="bg-black/30 p-6 rounded-lg shadow-lg" > <p className="text-lg md:text-2xl font-semibold mb-2">Temps restant :</p> <div className="flex space-x-4 text-2xl md:text-4xl font-bold"> <span>{timeLeft.days}j</span> <span>{timeLeft.hours}h</span> <span>{timeLeft.minutes}m</span> <span>{timeLeft.seconds}s</span> </div> </motion.div> <audio autoPlay loop> <source src="/happy-birthday.mp3" type="audio/mpeg" /> </audio> </div> ); }

