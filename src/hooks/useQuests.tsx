import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { toast } from '@/hooks/use-toast';

export interface Quest {
  id: string;
  title: string;
  category: 'Main Quest' | 'Side Quest' | 'Royal Ritual';
  start_time: string;
  end_time: string;
  completed: boolean;
  icon: string;
  xp: number;
}

// Mock data for now - will be replaced with Supabase once migration is approved
const mockQuests: Quest[] = [
  {
    id: "1",
    title: "Morning Kingdom Strategy",
    category: "Main Quest",
    start_time: new Date().toISOString().split('T')[0] + "T09:00:00",
    end_time: new Date().toISOString().split('T')[0] + "T11:00:00",
    completed: false,
    icon: "sword",
    xp: 25
  },
  {
    id: "2", 
    title: "Royal Training Session",
    category: "Main Quest",
    start_time: new Date().toISOString().split('T')[0] + "T14:00:00",
    end_time: new Date().toISOString().split('T')[0] + "T15:00:00",
    completed: false,
    icon: "shield",
    xp: 15
  },
  {
    id: "3",
    title: "Ancient Text Study",
    category: "Side Quest",
    start_time: new Date().toISOString().split('T')[0] + "T11:00:00",
    end_time: new Date().toISOString().split('T')[0] + "T12:00:00",
    completed: false,
    icon: "scroll",
    xp: 10
  },
  {
    id: "4",
    title: "Meditation Ritual",
    category: "Royal Ritual",
    start_time: new Date().toISOString().split('T')[0] + "T07:00:00",
    end_time: new Date().toISOString().split('T')[0] + "T08:00:00",
    completed: false,
    icon: "sparkles",
    xp: 15
  }
];

export const useQuests = () => {
  const { user } = useAuth();
  const [quests, setQuests] = useState<Quest[]>(mockQuests);
  const [loading, setLoading] = useState(false);

  const fetchQuests = async () => {
    // For now, just use mock data
    setQuests(mockQuests);
    setLoading(false);
  };

  const createQuest = async (questData: Omit<Quest, 'id' | 'completed'>) => {
    if (!user) return;

    try {
      const newQuest: Quest = {
        ...questData,
        id: Math.random().toString(36).substr(2, 9),
        completed: false,
      };
      
      setQuests(prev => [...prev, newQuest]);
      toast({
        title: "Quest Created",
        description: `${questData.title} has been added to your quest log!`,
      });
      
      return newQuest;
    } catch (error) {
      console.error('Error creating quest:', error);
      toast({
        title: "Error",
        description: "Failed to create quest",
        variant: "destructive",
      });
    }
  };

  const toggleQuestCompletion = async (questId: string) => {
    try {
      const quest = quests.find(q => q.id === questId);
      if (!quest) return;

      setQuests(prev => prev.map(quest => 
        quest.id === questId 
          ? { ...quest, completed: !quest.completed }
          : quest
      ));

      toast({
        title: quest.completed ? "Quest Incomplete" : "Quest Completed!",
        description: quest.completed 
          ? `${quest.title} marked as incomplete` 
          : `${quest.title} completed! +${quest.xp} XP`,
      });
    } catch (error) {
      console.error('Error updating quest:', error);
      toast({
        title: "Error",
        description: "Failed to update quest",
        variant: "destructive",
      });
    }
  };

  const deleteQuest = async (questId: string) => {
    try {
      setQuests(prev => prev.filter(quest => quest.id !== questId));
      toast({
        title: "Quest Deleted",
        description: "Quest has been removed from your quest log",
      });
    } catch (error) {
      console.error('Error deleting quest:', error);
      toast({
        title: "Error",
        description: "Failed to delete quest",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchQuests();
  }, [user]);

  const completedQuests = quests.filter(q => q.completed).length;
  const totalQuests = quests.length;
  const progressPercentage = totalQuests > 0 ? (completedQuests / totalQuests) * 100 : 0;

  return {
    quests,
    loading,
    createQuest,
    toggleQuestCompletion,
    deleteQuest,
    refetch: fetchQuests,
    completedQuests,
    totalQuests,
    progressPercentage,
  };
};