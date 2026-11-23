import React, { useState, useRef, useEffect } from 'react';
import {
  Bot,
  Bell,
  Send,
  Volume2,
  VolumeX,
  Sparkles,
  Clock,
  Plus,
  Trash2,
  CheckCircle2,
  AlertCircle,
  ToggleLeft,
  ToggleRight,
  X,
  Copy,
  Check
} from 'lucide-react';
import { COACH_QUICK_CHIPS, generateCoachResponse } from '../data/coachData';
import { sounds } from '../utils/audio';
import confetti from 'canvas-confetti';

export function CoachView({
  user,
  coachChat,
  reminders,
  onSendCoachMessage,
  onClearCoachChat,
  onToggleReminder,
  onAddReminder,
  onDeleteReminder,
  onTriggerTestAlarm,
  defaultSubTab = 'chat'
}) {
  const [subTab, setSubTab] = useState(defaultSubTab); // 'chat' | 'alarms'
  const [inputPrompt, setInputPrompt] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [copiedId, setCopiedId] = useState(null);

  // New Reminder Modal
  const [showAddReminderModal, setShowAddReminderModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newTime, setNewTime] = useState('09:00');
  const [newCategory, setNewCategory] = useState('supplement'); // 'supplement' | 'water' | 'training'
  const [newRepeat, setNewRepeat] = useState('Daily');

  // Notification API status
  const [notificationPermission, setNotificationPermission] = useState(
    typeof window !== 'undefined' && 'Notification' in window ? Notification.permission : 'unsupported'
  );

  const chatBottomRef = useRef(null);

  useEffect(() => {
    if (subTab === 'chat') {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [coachChat, subTab]);

  const requestNotificationPermission = async () => {
    sounds.playClick();
    if ('Notification' in window) {
      try {
        const permission = await Notification.requestPermission();
        setNotificationPermission(permission);
        if (permission === 'granted') {
          new Notification('APEX Athletic Coaching', {
            body: 'Smart Alarms & Coaching reminders activated!',
            icon: '/apex-logo.svg'
          });
        }
      } catch (e) {
        console.warn('Notification permission error:', e);
      }
    }
  };

  const speakText = (text) => {
    if ('speechSynthesis' in window && voiceEnabled) {
      try {
        window.speechSynthesis.cancel();
        // Strip markdown hashes and asterisks for speech
        const clean = text.replace(/[*#_`]/g, '').slice(0, 300);
        const utterance = new SpeechSynthesisUtterance(clean);
        utterance.rate = 1.05;
        utterance.pitch = 0.95;
        window.speechSynthesis.speak(utterance);
      } catch (e) {}
    }
  };

  const handleSendPrompt = (promptText) => {
    const textToSend = promptText || inputPrompt;
    if (!textToSend.trim()) return;

    sounds.playClick();
    const userMsg = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: textToSend.trim()
    };

    onSendCoachMessage(userMsg);
    setInputPrompt('');
    setIsTyping(true);

    // Contextual intelligent coach response
    setTimeout(() => {
      const responseText = generateCoachResponse(textToSend, user);
      const coachMsg = {
        id: `coach-${Date.now()}`,
        sender: 'coach',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: responseText
      };
      onSendCoachMessage(coachMsg);
      setIsTyping(false);
      speakText(responseText);
    }, 600);
  };

  const handleCopy = (id, text) => {
    sounds.playClick();
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSaveReminder = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    sounds.playSuccess();
    onAddReminder({
      id: `rem-${Date.now()}`,
      title: newTitle.trim(),
      time: newTime,
      category: newCategory,
      enabled: true,
      repeat: newRepeat
    });

    setNewTitle('');
    setShowAddReminderModal(false);
  };

  return (
    <div className="space-y-3 pb-24 animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <h1 className="text-xl font-black text-white tracking-tight">Coach & Reminders</h1>
        <p className="text-xs text-zinc-400 mt-0.5">
          Tactical guidance, training adjustments & smart alarms.
        </p>
      </div>

      {/* Sub-Tabs: AI Coach vs Smart Reminders */}
      <div className="flex items-center bg-[#141414] p-1 rounded-2xl border border-[#222222]">
        <button
          onClick={() => {
            sounds.playClick();
            setSubTab('chat');
          }}
          className={`flex-1 py-1.5 text-xs font-bold rounded-xl transition-all flex items-center justify-center space-x-1.5 ${
            subTab === 'chat'
              ? 'bg-[#E50914] text-white shadow-glow-crimson-sm'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <Bot className="w-3.5 h-3.5" />
          <span>AI Coach Chat</span>
        </button>

        <button
          onClick={() => {
            sounds.playClick();
            setSubTab('alarms');
          }}
          className={`flex-1 py-1.5 text-xs font-bold rounded-xl transition-all flex items-center justify-center space-x-1.5 ${
            subTab === 'alarms'
              ? 'bg-[#E50914] text-white shadow-glow-crimson-sm'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <Bell className="w-3.5 h-3.5" />
          <span>Smart Alarms ({reminders.filter(r => r.enabled).length})</span>
        </button>
      </div>

      {/* SUB-TAB 1: AI Coach Chat Screen */}
      {subTab === 'chat' && (
        <div className="space-y-3">
          {/* Quick Reply Action Chips */}
          <div>
            <div className="flex items-center justify-between text-[11px] text-zinc-400 mb-1.5 px-1">
              <span>Quick Tactical Inquiries</span>
              <button
                onClick={() => setVoiceEnabled(!voiceEnabled)}
                className={`flex items-center space-x-1 px-2 py-0.5 rounded-lg border text-[10px] ${
                  voiceEnabled
                    ? 'bg-[#E50914]/20 border-[#E50914] text-[#FF4D55]'
                    : 'bg-[#181818] border-[#2A2A2A] text-zinc-400'
                }`}
                title="Voice Readout Toggle"
              >
                {voiceEnabled ? <Volume2 className="w-3 h-3" /> : <VolumeX className="w-3 h-3" />}
                <span>{voiceEnabled ? 'Voice ON' : 'Voice OFF'}</span>
              </button>
            </div>

            <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar py-1">
              {COACH_QUICK_CHIPS.map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendPrompt(chip.prompt)}
                  className="px-3 py-1.5 bg-[#181818] hover:bg-[#222222] text-zinc-300 hover:text-white border border-[#282828] rounded-xl text-xs font-semibold whitespace-nowrap active:scale-95 transition-all shadow-sm"
                >
                  {chip.label}
                </button>
              ))}
            </div>
          </div>

          {/* Conversational Chat Feed */}
          <div className="bg-[#121212] p-3 rounded-3xl border border-[#222222] max-h-[52vh] min-h-[280px] overflow-y-auto smooth-scroll space-y-3">
            {coachChat.map((msg) => {
              const isUser = msg.sender === 'user';

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                >
                  <div className="flex items-center space-x-1.5 mb-1 px-1">
                    {!isUser && (
                      <span className="w-4 h-4 rounded-full bg-[#E50914] text-white text-[9px] font-black flex items-center justify-center">
                        K
                      </span>
                    )}
                    <span className="text-[10px] text-zinc-400 font-semibold">
                      {isUser ? user.name : 'Coach Kai'} • {msg.time}
                    </span>
                  </div>

                  <div
                    className={`max-w-[88%] rounded-2xl p-3 text-xs leading-relaxed relative group ${
                      isUser
                        ? 'bg-[#E50914] text-white shadow-glow-crimson-sm rounded-tr-none'
                        : 'bg-[#1C1C1C] text-zinc-200 border border-[#2B2B2B] rounded-tl-none shadow-md'
                    }`}
                  >
                    {/* Render basic markdown formatting */}
                    <div className="space-y-1.5 whitespace-pre-line">
                      {msg.text}
                    </div>

                    {!isUser && (
                      <div className="flex items-center justify-end space-x-2 mt-2 pt-1.5 border-t border-[#262626] text-[10px] text-zinc-400">
                        <button
                          onClick={() => handleCopy(msg.id, msg.text)}
                          className="hover:text-white flex items-center space-x-1"
                        >
                          {copiedId === msg.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedId === msg.id ? 'Copied' : 'Copy'}</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {isTyping && (
              <div className="flex items-center space-x-1.5 text-zinc-400 text-xs pl-2">
                <span className="w-2 h-2 rounded-full bg-[#E50914] animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-[#E50914] animate-bounce delay-100" />
                <span className="w-2 h-2 rounded-full bg-[#E50914] animate-bounce delay-200" />
                <span className="text-[11px] italic ml-1">Coach Kai is formulating tactical advice...</span>
              </div>
            )}
            <div ref={chatBottomRef} />
          </div>

          {/* Chat Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendPrompt();
            }}
            className="bg-[#181818] p-2 rounded-2xl border border-[#2A2A2A] flex items-center space-x-2"
          >
            <input
              type="text"
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              placeholder="Ask Coach: workout, jab form, macros..."
              className="flex-1 bg-transparent px-3 py-1.5 text-xs text-white placeholder-zinc-500 outline-none"
            />
            <button
              type="submit"
              disabled={!inputPrompt.trim() || isTyping}
              className="w-8 h-8 rounded-xl bg-[#E50914] hover:bg-[#FF1A27] disabled:opacity-40 text-white flex items-center justify-center shadow-glow-crimson-sm transition-all active:scale-95 shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* SUB-TAB 2: Smart Alarms & Reminders Manager */}
      {subTab === 'alarms' && (
        <div className="space-y-3">
          {/* Top Controls: Notification Permission & Test Alarm */}
          <div className="bg-[#181818] p-3.5 rounded-3xl border border-[#262626] space-y-2.5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold text-white leading-tight">Browser Notifications</h3>
                <p className="text-[10px] text-zinc-400">
                  Status: <strong className="text-zinc-200 uppercase">{notificationPermission}</strong>
                </p>
              </div>
              {notificationPermission !== 'granted' && (
                <button
                  onClick={requestNotificationPermission}
                  className="px-2.5 py-1 bg-cyan-950/60 text-cyan-300 border border-cyan-800 text-[11px] font-bold rounded-xl active:scale-95 transition-all"
                >
                  Enable Alerts
                </button>
              )}
            </div>

            <div className="flex items-center space-x-2 pt-2 border-t border-[#242424]">
              <button
                onClick={onTriggerTestAlarm}
                className="flex-1 py-2 px-3 bg-[#E50914] hover:bg-[#FF1A27] active:scale-95 text-white text-xs font-bold rounded-xl shadow-glow-crimson-sm transition-all flex items-center justify-center space-x-1.5"
              >
                <Bell className="w-3.5 h-3.5" />
                <span>Test Alarm Now</span>
              </button>

              <button
                onClick={() => {
                  sounds.playClick();
                  setShowAddReminderModal(true);
                }}
                className="py-2 px-3 bg-[#242424] hover:bg-[#2C2C2C] text-zinc-200 text-xs font-bold rounded-xl border border-[#383838] transition-all flex items-center space-x-1"
              >
                <Plus className="w-3.5 h-3.5 text-[#E50914] stroke-[3]" />
                <span>Add Reminder</span>
              </button>
            </div>
          </div>

          {/* Reminders List */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 px-1">
              Active Schedules ({reminders.length})
            </h3>

            {reminders.map((rem) => {
              const isEnabled = rem.enabled;

              const categoryBadge = {
                supplement: { label: 'Supplement', color: 'bg-emerald-950/40 text-emerald-400 border-emerald-800' },
                water: { label: 'Water Intake', color: 'bg-cyan-950/40 text-cyan-400 border-cyan-800' },
                training: { label: 'Training Session', color: 'bg-red-950/40 text-red-400 border-red-800' }
              }[rem.category] || { label: 'Reminder', color: 'bg-zinc-800 text-zinc-300 border-zinc-700' };

              return (
                <div
                  key={rem.id}
                  className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between ${
                    isEnabled
                      ? 'bg-[#181818] border-[#2A2A2A]'
                      : 'bg-[#121212] border-[#202020] opacity-60'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-center shrink-0 w-12 bg-[#121212] py-1.5 rounded-xl border border-[#252525]">
                      <span className="text-sm font-black text-white font-mono block">
                        {rem.time}
                      </span>
                      <span className="text-[9px] text-zinc-400 uppercase font-semibold">
                        {rem.repeat || 'Daily'}
                      </span>
                    </div>

                    <div>
                      <h4 className={`text-xs font-bold ${isEnabled ? 'text-white' : 'text-zinc-400'}`}>
                        {rem.title}
                      </h4>
                      <span className={`text-[9px] px-1.5 py-0.5 rounded font-semibold border ${categoryBadge.color}`}>
                        {categoryBadge.label}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    {/* Toggle Switch */}
                    <button
                      onClick={() => {
                        sounds.playClick();
                        onToggleReminder(rem.id);
                      }}
                      className="text-zinc-400 hover:text-white transition-all"
                      title={isEnabled ? 'Deactivate alarm' : 'Activate alarm'}
                    >
                      {isEnabled ? (
                        <ToggleRight className="w-7 h-7 text-[#E50914]" />
                      ) : (
                        <ToggleLeft className="w-7 h-7 text-zinc-600" />
                      )}
                    </button>

                    {/* Delete reminder */}
                    <button
                      onClick={() => {
                        sounds.playClick();
                        onDeleteReminder(rem.id);
                      }}
                      className="text-zinc-500 hover:text-red-400 p-1"
                      title="Delete reminder"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Add Reminder Modal */}
      {showAddReminderModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm p-3">
          <div className="bg-[#141414] w-full max-w-[400px] rounded-3xl border border-[#2A2A2A] p-4 space-y-3.5 shadow-2xl animate-in slide-in-from-bottom">
            <div className="flex items-center justify-between border-b border-[#242424] pb-2.5">
              <div className="flex items-center space-x-2">
                <Bell className="w-4 h-4 text-[#E50914]" />
                <h3 className="text-sm font-bold text-white">Add Smart Reminder</h3>
              </div>
              <button
                onClick={() => setShowAddReminderModal(false)}
                className="text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveReminder} className="space-y-3 text-xs">
              <div>
                <label className="block text-zinc-300 font-semibold mb-1">Reminder Title</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Creatine 5g / 500ml Water / Kickboxing Sparring"
                  className="w-full bg-[#1C1C1C] border border-[#2E2E2E] focus:border-[#E50914] rounded-xl px-3 py-2 text-white outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-zinc-300 font-semibold mb-1">Time (24h)</label>
                  <input
                    type="time"
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    className="w-full bg-[#1C1C1C] border border-[#2E2E2E] focus:border-[#E50914] rounded-xl px-3 py-2 text-white font-mono font-bold outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-zinc-300 font-semibold mb-1">Repeat</label>
                  <select
                    value={newRepeat}
                    onChange={(e) => setNewRepeat(e.target.value)}
                    className="w-full bg-[#1C1C1C] border border-[#2E2E2E] focus:border-[#E50914] rounded-xl px-2 py-2 text-white outline-none"
                  >
                    <option value="Daily">Daily</option>
                    <option value="Weekdays">Weekdays</option>
                    <option value="Weekends">Weekends</option>
                    <option value="Training Days">Training Days</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-zinc-300 font-semibold mb-1">Category</label>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { id: 'supplement', label: 'Supplements' },
                    { id: 'water', label: 'Water' },
                    { id: 'training', label: 'Training' }
                  ].map((cat) => (
                    <button
                      type="button"
                      key={cat.id}
                      onClick={() => setNewCategory(cat.id)}
                      className={`py-1.5 text-[11px] font-bold rounded-xl border transition-all ${
                        newCategory === cat.id
                          ? 'bg-[#E50914] text-white border-[#E50914]'
                          : 'bg-[#1C1C1C] text-zinc-400 border-[#2E2E2E]'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => setShowAddReminderModal(false)}
                  className="flex-1 py-2.5 bg-[#202020] text-zinc-300 rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#E50914] hover:bg-[#FF1A27] text-white rounded-xl font-bold shadow-glow-crimson-sm"
                >
                  Save Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
