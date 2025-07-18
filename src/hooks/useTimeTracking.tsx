import { useState, useEffect, useCallback } from 'react';
import { toZonedTime, format } from 'date-fns-tz';
import { Quest } from './useQuests';

const CET_TIMEZONE = 'Europe/Berlin';

export const useTimeTracking = (quests: Quest[]) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentTimeInCET, setCurrentTimeInCET] = useState(() => 
    toZonedTime(new Date(), CET_TIMEZONE)
  );

  // Update time every minute
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      setCurrentTimeInCET(toZonedTime(now, CET_TIMEZONE));
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  // Check if current date is today
  const isToday = useCallback(() => {
    const today = format(currentTimeInCET, 'yyyy-MM-dd', { timeZone: CET_TIMEZONE });
    const questDate = new Date().toISOString().split('T')[0];
    return today === questDate;
  }, [currentTimeInCET]);

  // Get current time position in pixels (40px per hour)
  const getCurrentTimePosition = useCallback(() => {
    if (!isToday()) return null;
    
    const hours = currentTimeInCET.getHours();
    const minutes = currentTimeInCET.getMinutes();
    const totalMinutes = hours * 60 + minutes;
    
    // 40px per hour = 40/60 px per minute
    return (totalMinutes / 60) * 40;
  }, [currentTimeInCET, isToday]);

  // Check if quest is overdue
  const isQuestOverdue = useCallback((quest: Quest) => {
    if (quest.completed || !isToday()) return false;
    
    const questEndTime = new Date(quest.end_time);
    return currentTimeInCET > questEndTime;
  }, [currentTimeInCET, isToday]);

  // Get overdue quests
  const overdueQuests = quests.filter(isQuestOverdue);

  // Format current time for display
  const formattedCurrentTime = format(currentTimeInCET, 'HH:mm', { timeZone: CET_TIMEZONE });

  // Check if it's midnight for daily reset
  const isMidnight = useCallback(() => {
    const hours = currentTimeInCET.getHours();
    const minutes = currentTimeInCET.getMinutes();
    return hours === 0 && minutes === 0;
  }, [currentTimeInCET]);

  return {
    currentTime: currentTimeInCET,
    formattedCurrentTime,
    isToday: isToday(),
    getCurrentTimePosition,
    isQuestOverdue,
    overdueQuests,
    isMidnight: isMidnight(),
  };
};