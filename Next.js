import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Home() {
  const [timeLeft, setTimeLeft] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const countdownTimer = setInterval(() => {
      const targetDate = new Date('2025-02-22T00:00:00');
      const now = new Date();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft("🎉 C'est l'heure de célébrer, Gangsta ! 🎉");
        clearInterval(countdownTimer);
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        setTimeLeft(`${days}j ${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(countdownTimer);
  }, []);

  const toggleMusic = () => {
    const music = document.getElementById('music');
    if (music.paused) {
      music.play();
      setIsPlaying(true);
    } else {
      music.pause();
      setIsPlaying(false);
    }
  };

  return (
    <motion.div 
      className="container"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <motion.h1 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 2 }}
      >
        🎉 ANNIVERSAIRE DE HUGUES 🎉
      </motion.h1>
      <div className="countdown">
        <p>Temps restant :</p>
        <div>{timeLeft}</div>
      </div>
      <button className="music-btn" onClick={toggleMusic}>
        {isPlaying ? "🎶 Pause Musique" : "🎶 Jouer Musique"}
      </button>
      <audio id="music" loop preload="auto">
        <source src="/happy-birthday.mp3" type="audio/mpeg" />
      </audio>

      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          background: linear-gradient(135deg, #1f1f1f, #383838);
          color: #fff;
          text-align: center;
        }
        h1 {
          font-size: 3rem;
          margin-bottom: 20px;
        }
        .countdown {
          font-size: 2rem;
          background: rgba(0, 0, 0, 0.6);
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0px 0px 20px rgba(255, 0, 0, 0.5);
        }
        .music-btn {
          margin-top: 30px;
          background-color: #ff0000;
          padding: 15px 25px;
          border: none;
          border-radius: 5px;
          color: white;
          font-size: 1.2rem;
          cursor: pointer;
        }
        .music-btn:hover {
          background-color: #cc0000;
        }
      `}</style>
    </motion.div>
  );
}
