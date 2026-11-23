import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { AlarmBanner } from './components/AlarmBanner';
import { OnboardingModal } from './components/OnboardingModal';
import { HomeView } from './views/HomeView';
import { SportsView } from './views/SportsView';
import { NutritionView } from './views/NutritionView';
import { CommunityView } from './views/CommunityView';
import { CoachView } from './views/CoachView';
import { storage, DEFAULT_USER, DEFAULT_REMINDERS, DEFAULT_NEXT_SESSION } from './utils/storage';
import { sounds } from './utils/audio';

export default function App() {
  // Core user state
  const [user, setUser] = useState(storage.getUser);
  const [activeTab, setActiveTab] = useState('home');
  const [showProfileModal, setShowProfileModal] = useState(false);

  // Home & Nutrition state
  const [water, setWater] = useState(storage.getWater);
  const [nutrition, setNutrition] = useState(storage.getConsumedNutrition);
  const [mealSwaps, setMealSwaps] = useState(storage.getMealSwaps);
  const [supplementsStatus, setSupplementsStatus] = useState(storage.getSupplementsStatus);
  const [nextSession, setNextSession] = useState(storage.getNextSession);

  // Sports & Drills state
  const [completedDrills, setCompletedDrills] = useState(storage.getCompletedDrills);

  // Community state
  const [communityMessages, setCommunityMessages] = useState(storage.getCommunityMessages);
  const [communityRsvps, setCommunityRsvps] = useState(storage.getCommunityRsvps);

  // Coach & Alarms state
  const [coachChat, setCoachChat] = useState(storage.getCoachChat);
  const [reminders, setReminders] = useState(storage.getReminders);
  const [activeAlarmAlert, setActiveAlarmAlert] = useState(null);

  // First-time onboarding check
  useEffect(() => {
    if (!user.hasCompletedOnboarding) {
      setShowProfileModal(true);
    }
  }, [user.hasCompletedOnboarding]);

  // Periodic alarm checker (matches HH:MM)
  useEffect(() => {
    const checkAlarms = () => {
      const now = new Date();
      const currentHours = String(now.getHours()).padStart(2, '0');
      const currentMinutes = String(now.getMinutes()).padStart(2, '0');
      const timeStr = `${currentHours}:${currentMinutes}`;

      const matchedReminder = reminders.find(
        (r) => r.enabled && r.time === timeStr
      );

      if (matchedReminder && (!activeAlarmAlert || activeAlarmAlert.id !== matchedReminder.id)) {
        triggerAlarmAlert({
          id: matchedReminder.id,
          title: matchedReminder.title,
          time: matchedReminder.time,
          category: matchedReminder.category,
          message: `Scheduled ${matchedReminder.category} reminder is firing now.`
        });
      }
    };

    const interval = setInterval(checkAlarms, 15000); // check every 15 seconds
    return () => clearInterval(interval);
  }, [reminders, activeAlarmAlert]);

  // Trigger in-app + native notification
  const triggerAlarmAlert = (alertData) => {
    setActiveAlarmAlert(alertData);
    sounds.playAlarmChime();

    // Browser Notification API if permitted
    if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
      try {
        new Notification(`APEX: ${alertData.title}`, {
          body: alertData.message || 'Scheduled athletic alarm triggered.',
          icon: '/apex-logo.svg'
        });
      } catch (e) {}
    }
  };

  // Manual Test Alarm Trigger
  const handleTestAlarm = () => {
    triggerAlarmAlert({
      id: `test-${Date.now()}`,
      title: '🥊 Test Athletic Alert (Sparring & Water)',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      category: 'training',
      message: 'Hydration and training alert verified! Sound and visual chime are operational.'
    });
  };

  // User Profile handlers
  const handleSaveProfile = (updatedUser) => {
    setUser(updatedUser);
    storage.saveUser(updatedUser);
    setShowProfileModal(false);
  };

  const handleResetDemo = () => {
    localStorage.clear();
    setUser(DEFAULT_USER);
    setWater(1750);
    setNutrition({ calories: 1840, protein: 135, carbs: 180, fats: 58 });
    setMealSwaps({ breakfast: 0, lunch: 0, dinner: 0, snack: 0 });
    setSupplementsStatus({ 'supp-1': true, 'supp-4': true });
    setCompletedDrills({ 'kb-1': true, 'musc-1': true });
    setCommunityMessages(null);
    setCommunityRsvps({ 'fight-m1': true, 'run-m2': true, 'surf-m1': true });
    setReminders(DEFAULT_REMINDERS);
    setNextSession(DEFAULT_NEXT_SESSION);
    setShowProfileModal(false);
  };

  // Water handler
  const handleUpdateWater = (amount) => {
    setWater(amount);
    storage.saveWater(amount);
  };

  // Nutrition handler
  const handleUpdateNutrition = (newNutrition) => {
    setNutrition(newNutrition);
    storage.saveConsumedNutrition(newNutrition);
  };

  // Meal swap handler
  const handleSwapMeal = (slotId, newIndex) => {
    const updated = { ...mealSwaps, [slotId]: newIndex };
    setMealSwaps(updated);
    storage.saveMealSwaps(updated);
  };

  // Supplement toggle handler
  const handleToggleSupplement = (suppId) => {
    const updated = { ...supplementsStatus, [suppId]: !supplementsStatus[suppId] };
    setSupplementsStatus(updated);
    storage.saveSupplementsStatus(updated);
  };

  // Drill toggle handler
  const handleToggleDrill = (drillId) => {
    const updated = { ...completedDrills, [drillId]: !completedDrills[drillId] };
    setCompletedDrills(updated);
    storage.saveCompletedDrills(updated);
  };

  // Community handlers
  const handleSendMessage = (channelId, message) => {
    const current = communityMessages ? { ...communityMessages } : {};
    const channelMsgs = current[channelId] || [];
    const updatedMsgs = [...channelMsgs, message];
    current[channelId] = updatedMsgs;

    setCommunityMessages(current);
    storage.saveCommunityMessages(current);
  };

  const handleReactMessage = (channelId, messageId, reactionType) => {
    const current = communityMessages ? { ...communityMessages } : {};
    const channelMsgs = current[channelId] || [];

    const updated = channelMsgs.map((m) => {
      if (m.id === messageId) {
        const isSame = m.userReaction === reactionType;
        const newReaction = isSame ? null : reactionType;
        let likes = m.likes || 0;
        let fires = m.fires || 0;

        if (reactionType === 'heart') {
          likes = isSame ? Math.max(0, likes - 1) : likes + 1;
        } else if (reactionType === 'fire') {
          fires = isSame ? Math.max(0, fires - 1) : fires + 1;
        }

        return { ...m, likes, fires, userReaction: newReaction };
      }
      return m;
    });

    current[channelId] = updated;
    setCommunityMessages(current);
    storage.saveCommunityMessages(current);
  };

  const handleToggleRsvp = (meetupId) => {
    const updated = { ...communityRsvps, [meetupId]: !communityRsvps[meetupId] };
    setCommunityRsvps(updated);
    storage.saveCommunityRsvps(updated);
  };

  const handleCreateMeetup = (channelId, meetup) => {
    handleToggleRsvp(meetup.id);
  };

  // Coach Chat handlers
  const handleSendCoachMessage = (message) => {
    const updated = [...coachChat, message];
    setCoachChat(updated);
    storage.saveCoachChat(updated);
  };

  const handleClearCoachChat = () => {
    setCoachChat([]);
    storage.saveCoachChat([]);
  };

  // Alarms / Reminders handlers
  const handleToggleReminder = (id) => {
    const updated = reminders.map(r => r.id === id ? { ...r, enabled: !r.enabled } : r);
    setReminders(updated);
    storage.saveReminders(updated);
  };

  const handleAddReminder = (newReminder) => {
    const updated = [newReminder, ...reminders];
    setReminders(updated);
    storage.saveReminders(updated);
  };

  const handleDeleteReminder = (id) => {
    const updated = reminders.filter(r => r.id !== id);
    setReminders(updated);
    storage.saveReminders(updated);
  };

  return (
    /* Outer Viewport Wrapper: min-h-[100dvh] w-full bg-black flex justify-center */
    <div className="min-h-[100dvh] w-full bg-black flex justify-center selection:bg-[#E50914] selection:text-white">
      {/* 
        Mobile App Shell (max-w-[430px]):
        w-full max-w-[430px] h-[100dvh] bg-[#0D0D0D] flex flex-col relative overflow-hidden
      */}
      <div className="w-full max-w-[430px] h-[100dvh] bg-[#0D0D0D] flex flex-col relative overflow-hidden sm:border sm:border-[#1F1F1F] shadow-phone-frame">
        {/* Real-time In-App Alarm Popup Banner */}
        <AlarmBanner
          alert={activeAlarmAlert}
          onDismiss={() => setActiveAlarmAlert(null)}
          onSnooze={() => {
            setActiveAlarmAlert(null);
            setTimeout(() => {
              triggerAlarmAlert({
                id: `snooze-${Date.now()}`,
                title: `[Snoozed] ${activeAlarmAlert?.title}`,
                category: activeAlarmAlert?.category || 'training',
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                message: 'Your 5-minute snoozed reminder is up!'
              });
            }, 5000); // 5 sec demo snooze
          }}
        />

        {/* Top Mobile Header (shrink-0) */}
        <Header
          user={user}
          onOpenProfile={() => setShowProfileModal(true)}
          onOpenAlarms={() => setActiveTab('coach')}
          onTestAlarm={handleTestAlarm}
          activeTab={activeTab}
        />

        {/* Scrollable Main Content Area */}
        <main
          className={`flex-1 overflow-y-auto overflow-x-hidden pb-24 px-4 overscroll-y-contain min-h-0 ${
            activeTab === 'coach' || activeTab === 'community' ? 'flex flex-col' : ''
          }`}
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {activeTab === 'home' && (
            <HomeView
              user={user}
              water={water}
              nutrition={nutrition}
              supplementsStatus={supplementsStatus}
              nextSession={nextSession}
              onUpdateWater={handleUpdateWater}
              onUpdateNutrition={handleUpdateNutrition}
              onToggleSupplement={handleToggleSupplement}
              onNavigateTab={(tab) => setActiveTab(tab)}
              onOpenProfile={() => setShowProfileModal(true)}
            />
          )}

          {activeTab === 'sports' && (
            <SportsView
              completedDrills={completedDrills}
              onToggleDrill={handleToggleDrill}
              initialSportId={user.sports?.[0]}
            />
          )}

          {activeTab === 'nutrition' && (
            <NutritionView
              user={user}
              nutrition={nutrition}
              mealSwaps={mealSwaps}
              supplementsStatus={supplementsStatus}
              onUpdateNutrition={handleUpdateNutrition}
              onSwapMeal={handleSwapMeal}
              onToggleSupplement={handleToggleSupplement}
            />
          )}

          {activeTab === 'community' && (
            <CommunityView
              user={user}
              communityMessages={communityMessages}
              communityRsvps={communityRsvps}
              onSendMessage={handleSendMessage}
              onReactMessage={handleReactMessage}
              onToggleRsvp={handleToggleRsvp}
              onCreateMeetup={handleCreateMeetup}
            />
          )}

          {activeTab === 'coach' && (
            <CoachView
              user={user}
              coachChat={coachChat}
              reminders={reminders}
              onSendCoachMessage={handleSendCoachMessage}
              onClearCoachChat={handleClearCoachChat}
              onToggleReminder={handleToggleReminder}
              onAddReminder={handleAddReminder}
              onDeleteReminder={handleDeleteReminder}
              onTriggerTestAlarm={handleTestAlarm}
            />
          )}
        </main>

        {/* Fixed 5-Tab Mobile Navigation */}
        <BottomNav
          activeTab={activeTab}
          onChangeTab={(tab) => setActiveTab(tab)}
          unreadCommunityCount={2}
        />

        {/* Onboarding & Profile Modal */}
        <OnboardingModal
          isOpen={showProfileModal}
          user={user}
          onClose={() => setShowProfileModal(false)}
          onSave={handleSaveProfile}
          onResetDemo={handleResetDemo}
        />
      </div>
    </div>
  );
}
