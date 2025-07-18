import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useQuests } from "@/hooks/useQuests";
import { Button } from "@/components/ui/button";
import { LogOut, Settings, Calendar, Menu, User } from "lucide-react";
import AryaLogo from "@/components/AryaLogo";
import CalendarView from "@/components/CalendarView";
import DNARune from "@/components/DNARune";
import PixelCharacter from "@/components/PixelCharacter";
import PixelOverlay from "@/components/PixelOverlay";
import ThroneProgressMeter from "@/components/ThroneProgressMeter";
import { QuestCreationModal } from "@/components/QuestCreationModal";
import stonePathBg from "@/assets/stone-path-background.jpg";

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const { 
    quests, 
    loading, 
    createQuest, 
    updateQuest,
    toggleQuestCompletion, 
    deleteQuest,
    completedQuests, 
    totalQuests, 
    progressPercentage 
  } = useQuests();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [questModalOpen, setQuestModalOpen] = useState(false);
  const [questModalTimes, setQuestModalTimes] = useState<{start: string, end: string}>({start: '', end: ''});
  
  const isProductiveDay = completedQuests >= 3;

  const handleQuestClick = (questId: string) => {
    toggleQuestCompletion(questId);
  };

  const handleCreateQuest = (startTime: string, endTime: string) => {
    setQuestModalTimes({ start: startTime, end: endTime });
    setQuestModalOpen(true);
  };

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 relative overflow-hidden">
      {/* Background */}
      <div 
        className="fixed inset-0 opacity-10 bg-cover bg-center"
        style={{ 
          backgroundImage: `url(${stonePathBg})`,
          filter: 'blur(2px) grayscale(40%)'
        }}
      />
      
      {/* DNA Rune */}
      <DNARune />
      
      {/* Pixel Overlay */}
      <PixelOverlay questsCompleted={completedQuests} isProductiveDay={isProductiveDay} />

      {/* Header */}
      <header className="relative z-20 bg-card/80 backdrop-blur-sm border-b border-border/50">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-4">
            <AryaLogo size="md" animate className="text-gold" />
            <div>
              <h1 className="font-royal text-xl text-gold">Arya Kingdom</h1>
              <p className="text-sm text-muted-foreground font-imperial">
                Welcome back, {user?.email?.split('@')[0] || 'King Lawrence of Arya'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-gold">
              <Calendar className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-gold">
              <Settings className="w-5 h-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-muted-foreground hover:text-destructive"
              onClick={handleSignOut}
            >
              <LogOut className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-muted-foreground hover:text-gold"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex relative z-10">
        {/* Main Content */}
        <main className="flex-1 p-6 max-w-5xl mx-auto">
          {/* Pixel Character */}
          <div className="mb-8">
            <PixelCharacter questsCompleted={completedQuests} totalQuests={totalQuests} />
          </div>

          {/* Calendar */}
          <div className="mb-8">
            <CalendarView
              quests={quests}
              onQuestClick={handleQuestClick}
              onCreateQuest={handleCreateQuest}
              onUpdateQuest={updateQuest}
              onDeleteQuest={deleteQuest}
            />
          </div>

          {/* Throne Progress Meter */}
          <div className="max-w-md mx-auto">
            <ThroneProgressMeter progress={progressPercentage} label="Daily Kingdom Progress" />
          </div>
        </main>

        {/* Sidebar */}
        <aside className={`
          fixed md:relative top-0 right-0 h-full w-80 bg-card/90 backdrop-blur-sm border-l border-border/50 
          transform transition-transform duration-300 z-30
          ${sidebarOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}
        `}>
          <div className="p-6 space-y-6">
            {/* Stats Panel */}
            <div className="panel-throne p-4 space-y-4">
              <h3 className="font-royal text-lg text-gold flex items-center space-x-2">
                <AryaLogo size="sm" />
                <span>Royal Statistics</span>
              </h3>
              
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-quest-main/20 rounded-lg p-3">
                  <div className="font-royal text-2xl text-gold">{totalQuests}</div>
                  <div className="text-xs text-muted-foreground font-imperial">Total Quests</div>
                </div>
                <div className="bg-quest-ritual/20 rounded-lg p-3">
                  <div className="font-royal text-2xl text-primary-glow">{completedQuests}</div>
                  <div className="text-xs text-muted-foreground font-imperial">Completed</div>
                </div>
                <div className="bg-quest-side/20 rounded-lg p-3">
                  <div className="font-royal text-2xl text-gold-light">{totalQuests - completedQuests}</div>
                  <div className="text-xs text-muted-foreground font-imperial">Remaining</div>
                </div>
                <div className="bg-gradient-to-br from-gold/20 to-primary/20 rounded-lg p-3">
                  <div className="font-royal text-2xl text-gold">{Math.round(progressPercentage)}%</div>
                  <div className="text-xs text-muted-foreground font-imperial">Progress</div>
                </div>
              </div>
            </div>

            {/* Progress Meters */}
            <div className="space-y-4">
              <ThroneProgressMeter progress={progressPercentage} label="Daily Progress" />
              <ThroneProgressMeter progress={65} label="Weekly Streak" />
              <ThroneProgressMeter progress={80} label="Monthly Goals" />
            </div>

            {/* User Info */}
            <div className="panel-quest p-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-gold to-primary rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <div className="font-royal text-gold">Royal Profile</div>
                  <div className="text-sm text-muted-foreground font-imperial">
                    {user?.email}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Sidebar Overlay for Mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Quest Creation Modal */}
      <QuestCreationModal
        open={questModalOpen}
        onClose={() => setQuestModalOpen(false)}
        onCreateQuest={createQuest}
        initialStartTime={questModalTimes.start}
        initialEndTime={questModalTimes.end}
      />
    </div>
  );
};

export default Dashboard;