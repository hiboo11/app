import React, { useEffect } from 'react';
import { Bell, Volume2, X, Check, Clock } from 'lucide-react';
import { sounds } from '../utils/audio';

export function AlarmBanner({ alert, onDismiss, onSnooze }) {
  useEffect(() => {
    // Play alert chime when banner opens
    sounds.playAlarmChime();
  }, [alert]);

  if (!alert) return null;

  const categoryColors = {
    supplement: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    water: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
    training: 'bg-[#E50914]/20 text-[#FF4D55] border-[#E50914]/40'
  };

  return (
    <div className="fixed top-14 left-0 right-0 max-w-[410px] mx-auto px-3 z-50 animate-bounce-soft">
      <div className="bg-[#181818] border-2 border-[#E50914] rounded-2xl p-3.5 shadow-glow-crimson shadow-2xl backdrop-blur-md">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 rounded-xl bg-[#E50914] flex items-center justify-center shrink-0 shadow-glow-crimson-sm animate-pulse">
              <Bell className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full border border-current"
                  style={{
                    backgroundColor: alert.category === 'training' ? 'rgba(229,9,20,0.2)' : alert.category === 'water' ? 'rgba(6,182,212,0.2)' : 'rgba(16,185,129,0.2)',
                    color: alert.category === 'training' ? '#FF4D55' : alert.category === 'water' ? '#22D3EE' : '#34D399',
                    borderColor: alert.category === 'training' ? 'rgba(229,9,20,0.4)' : alert.category === 'water' ? 'rgba(6,182,212,0.4)' : 'rgba(16,185,129,0.4)'
                  }}
                >
                  {alert.category.toUpperCase()} ALERT
                </span>
                <span className="text-xs text-zinc-400 flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  {alert.time || 'NOW'}
                </span>
              </div>
              <h4 className="text-sm font-bold text-white mt-1">{alert.title}</h4>
              <p className="text-xs text-zinc-300 mt-0.5">
                {alert.message || 'Time to stay on track with your physical conditioning routine.'}
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              sounds.playClick();
              onDismiss();
            }}
            className="text-zinc-400 hover:text-white p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Action buttons */}
        <div className="flex items-center space-x-2 mt-3 pt-2.5 border-t border-[#2A2A2A]">
          <button
            onClick={() => {
              sounds.playAlarmChime();
            }}
            className="flex items-center justify-center space-x-1 py-1.5 px-3 bg-[#242424] hover:bg-[#2C2C2C] text-xs text-zinc-300 rounded-lg border border-[#3A3A3A] transition-all"
          >
            <Volume2 className="w-3.5 h-3.5 text-[#E50914]" />
            <span>Replay Sound</span>
          </button>

          <button
            onClick={() => {
              sounds.playClick();
              onSnooze();
            }}
            className="flex-1 py-1.5 px-3 bg-[#242424] hover:bg-[#2C2C2C] text-xs text-zinc-300 font-medium rounded-lg border border-[#3A3A3A] transition-all text-center"
          >
            Snooze 5m
          </button>

          <button
            onClick={() => {
              sounds.playSuccess();
              onDismiss();
            }}
            className="flex-1 py-1.5 px-3 bg-[#E50914] hover:bg-[#FF1A27] text-xs text-white font-bold rounded-lg shadow-glow-crimson-sm transition-all text-center flex items-center justify-center space-x-1"
          >
            <Check className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Done / Got it</span>
          </button>
        </div>
      </div>
    </div>
  );
}
