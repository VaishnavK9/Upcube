import { useState, useEffect } from 'react';

export const useQuizTimer = (quizStarted: boolean, quizCompleted: boolean, onTimeUp: () => void) => {
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (quizStarted && !quizCompleted && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            onTimeUp();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [quizStarted, quizCompleted, timeLeft, onTimeUp]);

  const resetTimer = () => {
    setTimeLeft(900);
  };

  return { timeLeft, resetTimer };
};