import React from 'react';
import { Home, Shield, Utensils, Users, Bot, Bell } from 'lucide-react';
import { sounds } from '../utils/audio';

export function BottomNav({ activeTab, onChangeTab, unreadCommunityCount = 3 }) {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'sports', label: 'Sports', icon: Shield },
    { id: 'nutrition', label: 'Nutrition', icon: Utensils },
    { id: 'community', label: 'Community', icon: Users, badge: unreadCommunityCount },
    { id: 'coach', label: 'Coach/Alerts', icon: Bot, isCoach: true }
  ];

  const handleTabClick = (tabId) => {
    sounds.playClick();
    onChangeTab(tabId);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 w-full max-w-[430px] mx-auto z-50 bg-[#0D0D0D]/95 backdrop-blur-lg border-t border-[#222222] px-2 py-1.5 pb-3">
      <div className="flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`relative flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all duration-200 select-none ${
                isActive
                  ? 'text-[#E50914] scale-105'
                  : 'text-zinc-400 hover:text-zinc-200 active:scale-95'
              }`}
            >
              {/* Active subtle red ambient glow behind icon */}
              {isActive && (
                <div className="absolute inset-0 bg-[#E50914]/10 rounded-xl blur-sm -z-10" />
              )}

              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform duration-200 ${
                    isActive ? 'stroke-[2.5px] drop-shadow-[0_0_8px_rgba(229,9,20,0.6)]' : 'stroke-[1.8px]'
                  }`}
                />

                {/* Badge if any */}
                {tab.badge && !isActive && (
                  <span className="absolute -top-1 -right-2 w-4 h-4 rounded-full bg-[#E50914] text-white text-[9px] font-bold flex items-center justify-center border border-black animate-pulse">
                    {tab.badge}
                  </span>
                )}
              </div>

              <span
                className={`text-[10px] mt-1 font-medium tracking-tight ${
                  isActive ? 'font-bold text-[#FFFFFF]' : 'text-zinc-400'
                }`}
              >
                {tab.label}
              </span>

              {/* Active bottom bar pill */}
              {isActive && (
                <span className="w-4 h-1 bg-[#E50914] rounded-full mt-0.5 shadow-glow-crimson-sm animate-pulse-subtle" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
