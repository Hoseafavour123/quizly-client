import Confetti from "react-confetti";
import { useState, useEffect } from "react";

export default function ConfettiEffect() {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return showConfetti ? <Confetti numberOfPieces={200} recycle={false} /> : null;
}
