import React, { useState, useRef, useEffect } from 'react';
import {
  Users,
  MessageSquare,
  Calendar,
  MapPin,
  Send,
  Heart,
  Flame,
  Zap,
  Plus,
  CheckCircle2,
  Clock,
  UserCheck,
  Share2,
  X,
  Compass,
  Activity,
  Waves,
  Shield
} from 'lucide-react';
import { COMMUNITY_CHANNELS } from '../data/communityData';
import { sounds } from '../utils/audio';
import confetti from 'canvas-confetti';

const CHANNEL_ICONS = {
  running: Activity,
  cycling: Compass,
  surf: Waves,
  martial_gym: Flame,
  general: MessageSquare
};

export function CommunityView({
  user,
  communityMessages,
  communityRsvps,
  onSendMessage,
  onReactMessage,
  onToggleRsvp,
  onCreateMeetup
}) {
  const [activeChannelId, setActiveChannelId] = useState('running');
  const [viewMode, setViewMode] = useState('chat'); // 'chat' | 'meetups'
  const [inputText, setInputText] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);

  // New meetup form state
  const [newTitle, setNewTitle] = useState('');
  const [newDate, setNewDate] = useState('This Saturday, 10:00 AM');
  const [newLocation, setNewLocation] = useState('Main Sports Arena / Park');
  const [newPace, setNewPace] = useState('All skill levels welcome');

  const messagesEndRef = useRef(null);

  const activeChannel = COMMUNITY_CHANNELS.find(c => c.id === activeChannelId) || COMMUNITY_CHANNELS[0];
  const channelMessages = (communityMessages && communityMessages[activeChannelId]) || activeChannel.initialMessages;

  useEffect(() => {
    if (viewMode === 'chat') {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [channelMessages, viewMode]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    sounds.playClick();
    onSendMessage(activeChannelId, {
      id: `msg-${Date.now()}`,
      user: user.name,
      badge: `${user.fitnessGoal} Athlete`,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop',
      time: 'Just now',
      content: inputText.trim(),
      likes: 0,
      fires: 0,
      userReaction: null
    });
    setInputText('');
  };

  const handleToggleJoin = (meetupId) => {
    sounds.playSuccess();
    const isNowJoined = !communityRsvps[meetupId];
    onToggleRsvp(meetupId);

    if (isNowJoined) {
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#E50914', '#FFFFFF', '#06B6D4']
        });
      } catch (e) {}
    }
  };

  const handleCreateMeetupSubmit = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    sounds.playSuccess();
    onCreateMeetup(activeChannelId, {
      id: `m-${Date.now()}`,
      title: newTitle.trim(),
      date: newDate,
      location: newLocation,
      host: `${user.name} (Organizer)`,
      pace: newPace,
      attendees: 1,
      maxSpots: 20,
      isJoined: true,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop'
    });

    setNewTitle('');
    setShowCreateModal(false);
  };

  const IconComponent = CHANNEL_ICONS[activeChannel.id] || MessageSquare;

  return (
    <div className="space-y-3 pb-24 animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <h1 className="text-xl font-black text-white tracking-tight">Community & Activity</h1>
        <p className="text-xs text-zinc-400 mt-0.5">
          Connect with local athletes, share logs, and organize group sessions.
        </p>
      </div>

      {/* Channel Switcher (Horizontal scroll bar) */}
      <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar py-1">
        {COMMUNITY_CHANNELS.map((ch) => {
          const isActive = ch.id === activeChannelId;
          const ChannelIcon = CHANNEL_ICONS[ch.id] || MessageSquare;

          return (
            <button
              key={ch.id}
              onClick={() => {
                sounds.playClick();
                setActiveChannelId(ch.id);
              }}
              className={`flex items-center space-x-1.5 px-3 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all border ${
                isActive
                  ? 'bg-[#E50914] text-white border-[#E50914] shadow-glow-crimson-sm'
                  : 'bg-[#181818] text-zinc-400 hover:text-white border-[#262626]'
              }`}
            >
              <ChannelIcon className="w-3.5 h-3.5" />
              <span>{ch.name}</span>
            </button>
          );
        })}
      </div>

      {/* Sub-Tabs: Chat Rooms vs Meetups / Sessions */}
      <div className="flex items-center bg-[#141414] p-1 rounded-2xl border border-[#222222]">
        <button
          onClick={() => {
            sounds.playClick();
            setViewMode('chat');
          }}
          className={`flex-1 py-1.5 text-xs font-bold rounded-xl transition-all flex items-center justify-center space-x-1.5 ${
            viewMode === 'chat'
              ? 'bg-[#252525] text-white shadow-sm'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <MessageSquare className="w-3.5 h-3.5 text-[#E50914]" />
          <span>Activity Chat ({channelMessages.length})</span>
        </button>
        <button
          onClick={() => {
            sounds.playClick();
            setViewMode('meetups');
          }}
          className={`flex-1 py-1.5 text-xs font-bold rounded-xl transition-all flex items-center justify-center space-x-1.5 ${
            viewMode === 'meetups'
              ? 'bg-[#252525] text-white shadow-sm'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <Calendar className="w-3.5 h-3.5 text-[#E50914]" />
          <span>Group Meetups ({activeChannel.meetups.length})</span>
        </button>
      </div>

      {/* VIEW 1: Activity Chat Feed */}
      {viewMode === 'chat' && (
        <div className="space-y-3">
          {/* Channel Banner Description */}
          <div className="bg-[#181818] p-3 rounded-2xl border border-[#262626] flex items-center justify-between text-xs text-zinc-300">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span><strong>#{activeChannel.id}</strong> • {activeChannel.description}</span>
            </div>
          </div>

          {/* Message List */}
          <div className="space-y-2.5 max-h-[50vh] overflow-y-auto smooth-scroll pr-1">
            {channelMessages.map((msg) => {
              const isUser = msg.user === user.name;

              return (
                <div
                  key={msg.id}
                  className={`p-3 rounded-2xl border transition-all ${
                    isUser
                      ? 'bg-gradient-to-r from-[#201012] to-[#181818] border-[#E50914]/40 ml-4'
                      : 'bg-[#181818] border-[#262626] mr-4'
                  }`}
                >
                  {/* User info & timestamp */}
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center space-x-2">
                      <img
                        src={msg.avatar}
                        alt={msg.user}
                        className="w-6 h-6 rounded-full object-cover border border-[#333333]"
                      />
                      <div>
                        <span className="text-xs font-extrabold text-white leading-none block">
                          {msg.user}
                        </span>
                        <span className="text-[10px] text-[#FF4D55] font-semibold">
                          {msg.badge}
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] text-zinc-400 flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {msg.time}
                    </span>
                  </div>

                  {/* Message Content */}
                  <p className="text-xs text-zinc-200 leading-relaxed">
                    {msg.content}
                  </p>

                  {/* Reactions Bar */}
                  <div className="flex items-center space-x-2 mt-2 pt-2 border-t border-[#222222]">
                    <button
                      onClick={() => {
                        sounds.playClick();
                        onReactMessage(activeChannelId, msg.id, 'heart');
                      }}
                      className={`flex items-center space-x-1 text-[11px] px-2 py-0.5 rounded-lg border transition-all ${
                        msg.userReaction === 'heart'
                          ? 'bg-[#E50914]/20 border-[#E50914] text-[#FF4D55] font-bold'
                          : 'bg-[#121212] border-[#222222] text-zinc-400 hover:text-white'
                      }`}
                    >
                      <Heart className="w-3 h-3 fill-current" />
                      <span>{msg.likes || 0}</span>
                    </button>

                    <button
                      onClick={() => {
                        sounds.playClick();
                        onReactMessage(activeChannelId, msg.id, 'fire');
                      }}
                      className={`flex items-center space-x-1 text-[11px] px-2 py-0.5 rounded-lg border transition-all ${
                        msg.userReaction === 'fire'
                          ? 'bg-amber-500/20 border-amber-500 text-amber-400 font-bold'
                          : 'bg-[#121212] border-[#222222] text-zinc-400 hover:text-white'
                      }`}
                    >
                      <Flame className="w-3 h-3 fill-current" />
                      <span>{msg.fires || 0}</span>
                    </button>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Sticky Message Input */}
          <form onSubmit={handleSend} className="bg-[#181818] p-2 rounded-2xl border border-[#282828] flex items-center space-x-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={`Share in #${activeChannel.name}...`}
              className="flex-1 bg-transparent px-3 py-1.5 text-xs text-white placeholder-zinc-500 outline-none"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="w-8 h-8 rounded-xl bg-[#E50914] hover:bg-[#FF1A27] disabled:opacity-40 text-white flex items-center justify-center shadow-glow-crimson-sm transition-all active:scale-95 shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* VIEW 2: Meetups / Group Sessions Board */}
      {viewMode === 'meetups' && (
        <div className="space-y-3">
          {/* Action to Host a Meetup */}
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              Upcoming Group Sessions
            </h2>
            <button
              onClick={() => {
                sounds.playClick();
                setShowCreateModal(true);
              }}
              className="flex items-center space-x-1 text-xs font-bold bg-[#E50914] hover:bg-[#FF1A27] text-white px-2.5 py-1.5 rounded-xl shadow-glow-crimson-sm active:scale-95 transition-all"
            >
              <Plus className="w-3.5 h-3.5 stroke-[3]" />
              <span>Host Session</span>
            </button>
          </div>

          {/* Meetup Cards */}
          <div className="space-y-3">
            {activeChannel.meetups.map((meetup) => {
              const isJoined = !!communityRsvps[meetup.id];
              const attendeeCount = meetup.attendees + (isJoined && !meetup.isJoined ? 1 : 0);

              return (
                <div
                  key={meetup.id}
                  className="bg-[#181818] p-4 rounded-3xl border border-[#262626] space-y-2.5 shadow-md relative overflow-hidden"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-[#FF4D55] uppercase tracking-wider bg-[#E50914]/15 px-2 py-0.5 rounded-full border border-[#E50914]/30">
                        {meetup.date}
                      </span>
                      <h3 className="text-sm font-extrabold text-white mt-1 leading-snug">
                        {meetup.title}
                      </h3>
                    </div>
                    <img
                      src={meetup.avatar}
                      alt={meetup.host}
                      className="w-8 h-8 rounded-full object-cover border border-[#333333]"
                    />
                  </div>

                  <div className="bg-[#111111] p-2.5 rounded-2xl border border-[#242424] space-y-1 text-xs">
                    <div className="flex items-center text-zinc-300">
                      <MapPin className="w-3.5 h-3.5 text-[#E50914] mr-1.5 shrink-0" />
                      <span className="truncate">{meetup.location}</span>
                    </div>
                    <div className="flex items-center text-zinc-400 text-[11px]">
                      <Clock className="w-3.5 h-3.5 text-zinc-500 mr-1.5 shrink-0" />
                      <span>Pace / Level: {meetup.pace}</span>
                    </div>
                    <div className="text-[11px] text-zinc-400 pt-0.5">
                      Host: <strong className="text-zinc-200">{meetup.host}</strong>
                    </div>
                  </div>

                  {/* Attendees & RSVP button */}
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center space-x-1.5 text-xs text-zinc-300">
                      <Users className="w-4 h-4 text-emerald-400" />
                      <span>
                        <strong className="text-white">{attendeeCount}</strong> / {meetup.maxSpots} Athletes Going
                      </span>
                    </div>

                    <button
                      onClick={() => handleToggleJoin(meetup.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                        isJoined
                          ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/50 shadow-sm'
                          : 'bg-[#E50914] hover:bg-[#FF1A27] text-white shadow-glow-crimson-sm active:scale-95'
                      }`}
                    >
                      {isJoined ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Joined / Going</span>
                        </>
                      ) : (
                        <>
                          <UserCheck className="w-3.5 h-3.5" />
                          <span>Join Session</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Create Meetup Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm p-3">
          <div className="bg-[#141414] w-full max-w-[410px] rounded-3xl border border-[#282828] p-4 space-y-4 shadow-2xl animate-in slide-in-from-bottom">
            <div className="flex items-center justify-between border-b border-[#242424] pb-3">
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-[#E50914]" />
                <h3 className="text-sm font-bold text-white">Post a Group Meetup</h3>
              </div>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateMeetupSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-zinc-300 font-semibold mb-1">Session Title</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Dawn Patrol Surf / 10k Tempo Run"
                  className="w-full bg-[#1C1C1C] border border-[#2E2E2E] focus:border-[#E50914] rounded-xl px-3 py-2 text-white outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-zinc-300 font-semibold mb-1">Date & Time</label>
                <input
                  type="text"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  placeholder="e.g. Saturday, 08:30 AM"
                  className="w-full bg-[#1C1C1C] border border-[#2E2E2E] focus:border-[#E50914] rounded-xl px-3 py-2 text-white outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-zinc-300 font-semibold mb-1">Meeting Location</label>
                <input
                  type="text"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  placeholder="e.g. South Beach Pier / Club Ring"
                  className="w-full bg-[#1C1C1C] border border-[#2E2E2E] focus:border-[#E50914] rounded-xl px-3 py-2 text-white outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-zinc-300 font-semibold mb-1">Pace / Target Level</label>
                <input
                  type="text"
                  value={newPace}
                  onChange={(e) => setNewPace(e.target.value)}
                  placeholder="e.g. Conversational Zone 2 / All Levels"
                  className="w-full bg-[#1C1C1C] border border-[#2E2E2E] focus:border-[#E50914] rounded-xl px-3 py-2 text-white outline-none"
                />
              </div>

              <div className="pt-2 flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 py-2.5 bg-[#202020] text-zinc-300 rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#E50914] hover:bg-[#FF1A27] text-white rounded-xl font-bold shadow-glow-crimson-sm"
                >
                  Publish Meetup
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
