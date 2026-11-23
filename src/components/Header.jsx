import React from 'react';
import { Flame, Bell, User, Sparkles } from 'lucide-react';
import { SPORTS_CATALOG } from '../data/sportsData';

export function Header({ user, onOpenProfile, onOpenAlarms, onTestAlarm, activeTab }) {
  const currentSport = SPORTS_CATALOG.find(s => s.id === user.sports?.[0]) || SPORTS_CATALOG[0];

  return (
    <header className="shrink-0 z-40 bg-[#0D0D0D]/95 backdrop-blur-md border-b border-[#202020] px-4 py-2.5 flex items-center justify-between">
      {/* Brand & Active Sport Badge */}
      <div className="flex items-center space-x-2.5">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#E50914] to-[#80050B] flex items-center justify-center shadow-glow-crimson-sm">
          <span className="font-black text-xs tracking-tighter text-white">APEX</span>
        </div>
        <div>
          <div className="flex items-center space-x-1.5">
            <span className="text-sm font-extrabold tracking-wider text-white">APEX</span>
            <span className="text-[10px] font-semibold bg-[#E50914]/20 text-[#FF4D55] px-1.5 py-0.5 rounded-full border border-[#E50914]/30 uppercase">
              {currentSport.name}
            </span>
          </div>
          <div className="flex items-center space-x-1 text-[11px] text-muted">
            <Flame className="w-3 h-3 text-[#E50914] fill-[#E50914]" />
            <span className="font-medium text-white">{user.streakDays || 14} Day Streak</span>
          </div>
        </div>
      </div>

      {/* Quick Action Buttons */}
      <div className="flex items-center space-x-1.5">
        {/* Test Alarm Quick Trigger */}
        <button
          onClick={onTestAlarm}
          title="Test Smart Alarm Alert"
          className="flex items-center space-x-1 bg-[#1E1E1E] hover:bg-[#282828] active:scale-95 text-xs text-zinc-300 hover:text-white px-2 py-1.5 rounded-lg border border-[#333333] transition-all"
        >
          <Bell className="w-3.5 h-3.5 text-[#E50914]" />
          <span className="text-[11px] font-medium hidden xs:inline">Test Alarm</span>
        </button>

        {/* Profile Avatar Trigger */}
        <button
          onClick={onOpenProfile}
          className="relative w-8 h-8 rounded-full bg-[#1E1E1E] border border-[#383838] hover:border-[#E50914] flex items-center justify-center overflow-hidden transition-all active:scale-95"
          title="Open Athlete Profile"
        >
          <User className="w-4 h-4 text-zinc-300" />
          <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 border border-black"></span>
        </button>
      </div>
    </header>
  );
}
