import { useState, useEffect } from "react";
import { Crown, Settings, Calendar, User, Menu, X } from "lucide-react";
import { QuestCard, Quest } from "@/components/QuestCard";
import { ProgressSun } from "@/components/ProgressSun";
import { DNARune } from "@/components/DNARune";
import { AryaCharacter } from "@/components/AryaCharacter";
import stonePathBg from "@/assets/stone-path-background.jpg";

const Dashboard = () => {
  const [quests, setQuests] = useState<Quest[]>([
    {
      id: '1',
      title: 'Morning Temple Ritual',
      description: 'Sacred preparation for the day ahead. Meditation, planning, and warrior mindset activation.',
      type: 'ritual',
      duration: 30,
      timeSlot: '06:00 - 06:30',
      completed: true
    },
    {
      id: '2',
      title: 'Conquer the Code Fortress',
      description: 'Deploy the new authentication system and fortify the kingdom\'s digital walls.',
      type: 'main',
      duration: 120,
      timeSlot: '09:00 - 11:00',
      completed: true
    },
    {
      id: '3',
      title: 'Strategic Council Meeting',
      description: 'Align with fellow warriors on the quarterly conquest plans.',
      type: 'main',
      duration: 60,
      timeSlot: '11:30 - 12:30',
      completed: false
    },
    {
      id: '4',
      title: 'Midday Checkpoint',
      description: 'Assess progress, realign focus, and prepare for the afternoon battles.',
      type: 'ritual',
      duration: 15,
      timeSlot: '13:00 - 13:15',
      completed: false
    },
    {
      id: '5',
      title: 'Reply to Royal Correspondence',
      description: 'Answer the messages from your subjects and maintain diplomatic relations.',
      type: 'side',
      duration: 45,
      timeSlot: '14:00 - 14:45',
      completed: false
    },
    {
      id: '6',
      title: 'Build the Analytics Dashboard',
      description: 'Create the intelligence gathering system for kingdom insights.',
      type: 'main',
      duration: 90,
      timeSlot: '15:00 - 16:30',
      completed: false
    },
    {
      id: '7',
      title: 'Physical Training',
      description: 'Strengthen the vessel that carries the warrior spirit.',
      type: 'side',
      duration: 60,
      timeSlot: '17:00 - 18:00',
      completed: false
    },
    {
      id: '8',
      title: 'Nightfall Reflection',
      description: 'Review conquests, acknowledge growth, and prepare the mind for rest.',
      type: 'ritual',
      duration: 20,
      timeSlot: '21:00 - 21:20',
      completed: false
    }
  ]);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const completedQuests = quests.filter(q => q.completed).length;
  const totalQuests = quests.length;
  const progressPercentage = (completedQuests / totalQuests) * 100;

  const handleCompleteQuest = (questId: string) => {
    setQuests(prev => prev.map(quest => 
      quest.id === questId ? { ...quest, completed: true } : quest
    ));
  };

  const handleStartQuest = (questId: string) => {
    console.log('Starting quest:', questId);
    // Future: Navigate to quest view
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${stonePathBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/70 to-background/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-gold/10" />
      </div>

      {/* Main Layout */}
      <div className="relative z-10 min-h-screen">
        {/* Header */}
        <header className="border-b border-border/30 bg-card/20 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Logo & User */}
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-3">
                  <Crown className="w-8 h-8 text-gold" />
                  <span className="font-royal text-2xl text-gold text-shadow-gold">AJBU</span>
                </div>
                <div className="hidden md:flex items-center space-x-2 text-muted-foreground">
                  <User className="w-5 h-5" />
                  <span className="font-imperial">King Arya</span>
                </div>
              </div>

              {/* Progress & Actions */}
              <div className="flex items-center space-x-6">
                <div className="hidden lg:block">
                  <ProgressSun completed={completedQuests} total={totalQuests} />
                </div>
                
                <div className="flex items-center space-x-3">
                  <button className="p-2 text-muted-foreground hover:text-gold transition-colors">
                    <Calendar className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-muted-foreground hover:text-gold transition-colors">
                    <Settings className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="lg:hidden p-2 text-muted-foreground hover:text-gold transition-colors"
                  >
                    {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Quest Timeline */}
            <div className="lg:col-span-2 space-y-6">
              {/* DNA Rune */}
              <DNARune />

              {/* Character Progress */}
              <AryaCharacter 
                progress={progressPercentage}
                totalQuests={totalQuests}
                completedQuests={completedQuests}
              />

              {/* Today's Quests Header */}
              <div className="text-center mb-8">
                <h1 className="font-royal text-3xl md:text-4xl text-gold text-shadow-gold mb-2">
                  Today's Sacred Questline
                </h1>
                <p className="font-imperial text-muted-foreground">
                  {new Date().toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>

              {/* Quest Cards */}
              <div className="space-y-4">
                {quests.map((quest) => (
                  <QuestCard
                    key={quest.id}
                    quest={quest}
                    onComplete={handleCompleteQuest}
                    onStart={handleStartQuest}
                  />
                ))}
              </div>

              {/* Motivational Footer */}
              <div className="text-center py-8">
                <div className="panel-throne rounded-lg p-6 max-w-md mx-auto">
                  <p className="font-imperial text-lg text-gold italic">
                    "Every quest completed is a step closer to the throne."
                  </p>
                </div>
              </div>
            </div>

            {/* Sidebar - Progress & Stats */}
            <div className={`lg:block ${sidebarOpen ? 'block' : 'hidden'} space-y-6`}>
              {/* Mobile Progress */}
              <div className="lg:hidden">
                <ProgressSun completed={completedQuests} total={totalQuests} />
              </div>

              {/* Daily Stats */}
              <div className="panel-throne rounded-xl p-6">
                <h3 className="font-royal text-xl text-gold mb-4 text-center">
                  Royal Statistics
                </h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-border/30">
                    <span className="font-imperial text-sm text-muted-foreground">Total Quests</span>
                    <span className="font-royal text-gold">{totalQuests}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border/30">
                    <span className="font-imperial text-sm text-muted-foreground">Completed</span>
                    <span className="font-royal text-gold">{completedQuests}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border/30">
                    <span className="font-imperial text-sm text-muted-foreground">Remaining</span>
                    <span className="font-royal text-primary-glow">{totalQuests - completedQuests}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="font-imperial text-sm text-muted-foreground">Progress</span>
                    <span className="font-royal text-gold">{Math.round(progressPercentage)}%</span>
                  </div>
                </div>
              </div>

              {/* Throne Meter */}
              <div className="panel-throne rounded-xl p-6 text-center">
                <h3 className="font-royal text-lg text-gold mb-4">
                  Throne Meter
                </h3>
                <div className="space-y-3">
                  <div className="w-full bg-stone-dark rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-gold to-gold-light h-3 rounded-full transition-all duration-1000 shadow-[0_0_10px_hsl(var(--gold)/0.5)]"
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                  <p className="font-imperial text-sm text-muted-foreground">
                    {progressPercentage < 50 ? 'Peasant' : 
                     progressPercentage < 80 ? 'Knight' : 
                     progressPercentage < 100 ? 'Lord' : 'King'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;