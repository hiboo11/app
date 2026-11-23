import React, { useState, useEffect } from 'react';
import { Flame, Droplet, Clock, CheckCircle2, Circle, ChevronRight, Plus, RefreshCw, Sparkles, MapPin, Dumbbell, Shield, Trophy } from 'lucide-react';
import { sounds } from '../utils/audio';
import confetti from 'canvas-confetti';
import { SPORTS_CATALOG } from '../data/sportsData';
import { calculateNutritionTargets } from '../data/nutritionData';

export function HomeView({
  user,
  water,
  nutrition,
  supplementsStatus,
  nextSession,
  onUpdateWater,
  onUpdateNutrition,
  onToggleSupplement,
  onNavigateTab,
  onOpenProfile
}) {
  const targets = calculateNutritionTargets(user);
  const primarySport = SPORTS_CATALOG.find(s => s.id === user.sports?.[0]) || SPORTS_CATALOG[0];

  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0, isPast: false });
  const [sessionCompleted, setSessionCompleted] = useState(false);

  useEffect(() => {
    const updateCountdown = () => {
      const targetTime = new Date(nextSession.scheduledTime).getTime();
      const now = Date.now();
      const diff = targetTime - now;

      if (diff <= 0) {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0, isPast: true });
      } else {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeLeft({ hours, minutes, seconds, isPast: false });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [nextSession.scheduledTime]);

  // Calorie calculation
  const caloriePercent = Math.min(100, Math.round((nutrition.calories / targets.calories) * 100));
  const remainingCalories = Math.max(0, targets.calories - nutrition.calories);

  // SVG Progress Ring calculations
  const radius = 68;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (caloriePercent / 100) * circumference;

  // Water calculation
  const waterPercent = Math.min(100, Math.round((water / user.dailyWaterGoalMl) * 100));

  const handleAddWater = (ml) => {
    sounds.playWaterChime();
    const newTotal = water + ml;
    onUpdateWater(newTotal);

    if (newTotal >= user.dailyWaterGoalMl && water < user.dailyWaterGoalMl) {
      sounds.playSuccess();
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.8 },
          colors: ['#06B6D4', '#E50914', '#FFFFFF']
        });
      } catch (e) {}
    }
  };

  const handleResetWater = () => {
    sounds.playClick();
    onUpdateWater(0);
  };

  const handleQuickAddCalories = () => {
    sounds.playClick();
    const addKcal = 300;
    const addProtein = 25;
    const addCarbs = 35;
    const addFats = 8;

    onUpdateNutrition({
      calories: nutrition.calories + addKcal,
      protein: nutrition.protein + addProtein,
      carbs: nutrition.carbs + addCarbs,
      fats: nutrition.fats + addFats
    });
  };

  const handleCheckInSession = () => {
    sounds.playSuccess();
    setSessionCompleted(true);
    try {
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#E50914', '#FFD700', '#FFFFFF']
      });
    } catch (e) {}
  };

  // Supplement progress count
  const allSupplements = [
    { id: 'supp-1', name: 'Creatine Monohydrate (5g)', timing: 'Morning' },
    { id: 'supp-2', name: 'Whey Protein Isolate (30g)', timing: 'Post-Workout' },
    { id: 'supp-3', name: 'Electrolyte Mineral Complex', timing: 'During Training' },
    { id: 'supp-4', name: 'Omega-3 Fish Oil (EPA/DHA)', timing: 'With Lunch' },
    { id: 'supp-5', name: 'Magnesium Bisglycinate (300mg)', timing: 'Night' }
  ];
  const completedSuppsCount = allSupplements.filter(s => supplementsStatus[s.id]).length;

  return (
    <div className="space-y-4 py-2 animate-in fade-in duration-300">
      {/* Daily Motivation & Athlete Header */}
      <div className="bg-gradient-to-r from-[#181818] via-[#151515] to-[#1C1113] p-4 rounded-3xl border border-[#262626] relative overflow-hidden">
        <div className="absolute -right-6 -bottom-6 w-28 h-28 bg-[#E50914]/10 rounded-full blur-2xl pointer-events-none" />
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[11px] font-semibold text-[#FF4D55] uppercase tracking-wider">
                {user.fitnessGoal} Target
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#E50914] animate-ping" />
            </div>
            <h1 className="text-xl font-extrabold text-white mt-0.5 tracking-tight">
              Ready, {user.name.split(' ')[0]}
            </h1>
            <p className="text-xs text-zinc-400 mt-0.5">
              Primary discipline: <span className="text-white font-semibold">{primarySport.name}</span>
            </p>
          </div>
          <button
            onClick={onOpenProfile}
            className="flex flex-col items-center bg-[#202020] hover:bg-[#282828] active:scale-95 border border-[#333333] px-3 py-2 rounded-2xl transition-all"
          >
            <div className="flex items-center space-x-1 text-[#E50914] font-black text-sm">
              <Flame className="w-4 h-4 fill-current" />
              <span>{user.streakDays || 14}</span>
            </div>
            <span className="text-[10px] text-zinc-400 font-medium">Day Streak</span>
          </button>
        </div>
      </div>

      {/* 1. Red Circular Progress Ring (Calories & Macros) */}
      <div className="bg-[#181818] rounded-3xl p-4 border border-[#262626] shadow-xl">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 rounded-lg bg-[#E50914]/20 flex items-center justify-center border border-[#E50914]/30">
              <Flame className="w-4 h-4 text-[#E50914]" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white leading-tight">Energy & Fuel Intake</h3>
              <p className="text-[11px] text-zinc-400">Target calibrated to {user.weightKg}kg & {user.fitnessGoal}</p>
            </div>
          </div>
          <button
            onClick={handleQuickAddCalories}
            className="flex items-center space-x-1 text-xs bg-[#E50914]/15 hover:bg-[#E50914]/25 text-[#FF4D55] px-2.5 py-1 rounded-full border border-[#E50914]/30 active:scale-95 transition-all font-semibold"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+300 kcal</span>
          </button>
        </div>

        {/* Circular Ring and Calorie Details */}
        <div className="flex items-center justify-around py-2">
          {/* SVG Circular Ring */}
          <div className="relative w-36 h-36 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
              {/* Background Ring */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                stroke="#262626"
                strokeWidth="12"
                fill="none"
              />
              {/* Red Progress Ring */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                stroke="#E50914"
                strokeWidth="12"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="none"
                className="progress-ring-circle"
              />
            </svg>

            {/* Centered Text inside Ring */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-2xl font-black text-white tracking-tight">
                {nutrition.calories}
              </span>
              <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">
                / {targets.calories} kcal
              </span>
              <span className="text-[11px] font-extrabold text-[#E50914] mt-0.5">
                {caloriePercent}%
              </span>
            </div>
          </div>

          {/* Quick Metrics Column */}
          <div className="space-y-2.5 w-36">
            <div className="bg-[#111111] p-2.5 rounded-2xl border border-[#262626]">
              <span className="text-[10px] text-zinc-400 block font-medium">REMAINING TODAY</span>
              <span className="text-base font-extrabold text-white">
                {remainingCalories} <span className="text-xs font-normal text-zinc-400">kcal</span>
              </span>
            </div>

            <div className="bg-[#111111] p-2.5 rounded-2xl border border-[#262626]">
              <span className="text-[10px] text-zinc-400 block font-medium">BASE METABOLIC RATE</span>
              <span className="text-base font-extrabold text-zinc-300">
                {targets.tdee} <span className="text-xs font-normal text-zinc-400">TDEE</span>
              </span>
            </div>
          </div>
        </div>

        {/* Macro Bars */}
        <div className="grid grid-cols-3 gap-2 mt-2 pt-3 border-t border-[#242424]">
          {/* Protein */}
          <div className="bg-[#111111] p-2 rounded-xl border border-[#242424]">
            <div className="flex items-center justify-between text-[11px] mb-1">
              <span className="font-bold text-red-400">Protein</span>
              <span className="text-zinc-400">{nutrition.protein}/{targets.protein}g</span>
            </div>
            <div className="w-full h-1.5 bg-[#222222] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#E50914] rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, (nutrition.protein / targets.protein) * 100)}%` }}
              />
            </div>
          </div>

          {/* Carbs */}
          <div className="bg-[#111111] p-2 rounded-xl border border-[#242424]">
            <div className="flex items-center justify-between text-[11px] mb-1">
              <span className="font-bold text-amber-400">Carbs</span>
              <span className="text-zinc-400">{nutrition.carbs}/{targets.carbs}g</span>
            </div>
            <div className="w-full h-1.5 bg-[#222222] rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-500 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, (nutrition.carbs / targets.carbs) * 100)}%` }}
              />
            </div>
          </div>

          {/* Fats */}
          <div className="bg-[#111111] p-2 rounded-xl border border-[#242424]">
            <div className="flex items-center justify-between text-[11px] mb-1">
              <span className="font-bold text-emerald-400">Fats</span>
              <span className="text-zinc-400">{nutrition.fats}/{targets.fats}g</span>
            </div>
            <div className="w-full h-1.5 bg-[#222222] rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, (nutrition.fats / targets.fats) * 100)}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Interactive Water Hydration Tracker */}
      <div className="bg-[#181818] rounded-3xl p-4 border border-[#262626] relative overflow-hidden">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 rounded-lg bg-cyan-500/20 flex items-center justify-center border border-cyan-500/30">
              <Droplet className="w-4 h-4 text-cyan-400 fill-cyan-400/30" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white leading-tight">Hydration Tracker</h3>
              <p className="text-[11px] text-zinc-400">Goal: {(user.dailyWaterGoalMl / 1000).toFixed(1)}L / day for sports recovery</p>
            </div>
          </div>
          <button
            onClick={handleResetWater}
            title="Reset water intake"
            className="text-zinc-400 hover:text-white p-1"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Progress Display */}
        <div className="bg-[#111111] p-3 rounded-2xl border border-[#242424] flex items-center justify-between mb-3">
          <div>
            <div className="flex items-baseline space-x-1.5">
              <span className="text-2xl font-black text-cyan-400">{water}</span>
              <span className="text-xs text-zinc-400">/ {user.dailyWaterGoalMl} ml</span>
            </div>
            <span className="text-[11px] text-zinc-400">
              {waterPercent >= 100 ? '🎉 Hydration target reached!' : `${user.dailyWaterGoalMl - water} ml remaining`}
            </span>
          </div>
          <div className="text-right">
            <span className="text-lg font-black text-white">{waterPercent}%</span>
            <div className="w-24 h-2 bg-[#222222] rounded-full overflow-hidden mt-1">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-300"
                style={{ width: `${waterPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Quick Add Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => handleAddWater(250)}
            className="flex items-center justify-center space-x-1.5 py-2.5 px-3 bg-[#202020] hover:bg-[#282828] active:scale-95 text-xs font-bold text-white rounded-xl border border-[#303030] transition-all"
          >
            <Droplet className="w-3.5 h-3.5 text-cyan-400" />
            <span>+250 ml (Glass)</span>
          </button>
          <button
            onClick={() => handleAddWater(500)}
            className="flex items-center justify-center space-x-1.5 py-2.5 px-3 bg-cyan-950/40 hover:bg-cyan-900/40 active:scale-95 text-xs font-bold text-cyan-300 rounded-xl border border-cyan-800/40 transition-all"
          >
            <Droplet className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400" />
            <span>+500 ml (Bottle)</span>
          </button>
        </div>
      </div>

      {/* 3. Live Countdown to Next Training Session */}
      <div className="bg-gradient-to-b from-[#1E1213] to-[#181818] rounded-3xl p-4 border border-[#3A1F22] relative overflow-hidden">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 rounded-lg bg-[#E50914] flex items-center justify-center shadow-glow-crimson-sm">
              <Clock className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-[#FF4D55] uppercase tracking-wider">UPCOMING SESSION</span>
              <h3 className="text-sm font-bold text-white">{nextSession.title}</h3>
            </div>
          </div>
          <span className="text-[10px] bg-[#E50914]/20 text-[#FF4D55] px-2 py-0.5 rounded-full border border-[#E50914]/40 font-bold">
            {nextSession.sport}
          </span>
        </div>

        {/* Countdown Ticker Box */}
        <div className="bg-[#121212]/90 p-3 rounded-2xl border border-[#2D2224] my-2.5">
          <div className="flex items-center justify-around text-center">
            <div className="flex-1">
              <span className="text-2xl font-black text-white font-mono">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span className="block text-[9px] uppercase font-bold text-zinc-400">Hours</span>
            </div>
            <span className="text-xl font-bold text-[#E50914] -mt-3">:</span>
            <div className="flex-1">
              <span className="text-2xl font-black text-white font-mono">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span className="block text-[9px] uppercase font-bold text-zinc-400">Minutes</span>
            </div>
            <span className="text-xl font-bold text-[#E50914] -mt-3">:</span>
            <div className="flex-1">
              <span className="text-2xl font-black text-[#FF4D55] font-mono">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
              <span className="block text-[9px] uppercase font-bold text-zinc-400">Seconds</span>
            </div>
          </div>

          <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#222222] text-[11px] text-zinc-400">
            <span className="flex items-center">
              <MapPin className="w-3 h-3 text-[#E50914] mr-1" />
              {nextSession.location}
            </span>
            <span className="text-zinc-300 font-medium">{nextSession.durationMins} Mins duration</span>
          </div>
        </div>

        {/* Check In Action */}
        <button
          onClick={handleCheckInSession}
          disabled={sessionCompleted}
          className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1.5 ${
            sessionCompleted
              ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/40 cursor-default'
              : 'bg-[#E50914] hover:bg-[#FF1A27] text-white shadow-glow-crimson-sm active:scale-[0.98]'
          }`}
        >
          {sessionCompleted ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Checked In & Training Ready!</span>
            </>
          ) : (
            <>
              <Dumbbell className="w-4 h-4 stroke-[2.5]" />
              <span>Check In / Start Session Now</span>
            </>
          )}
        </button>
      </div>

      {/* 4. Today's Supplement Reminders Quick-View */}
      <div className="bg-[#181818] rounded-3xl p-4 border border-[#262626]">
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white leading-tight">Today's Supplements</h3>
              <p className="text-[11px] text-zinc-400">{completedSuppsCount} of {allSupplements.length} taken</p>
            </div>
          </div>
          <button
            onClick={() => onNavigateTab('nutrition')}
            className="text-xs text-[#FF4D55] hover:text-white font-medium flex items-center"
          >
            <span>All Details</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Quick Checkbox List */}
        <div className="space-y-1.5">
          {allSupplements.map((supp) => {
            const isDone = !!supplementsStatus[supp.id];
            return (
              <div
                key={supp.id}
                onClick={() => {
                  sounds.playClick();
                  onToggleSupplement(supp.id);
                }}
                className={`p-2 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                  isDone
                    ? 'bg-emerald-950/20 border-emerald-800/30 text-zinc-300'
                    : 'bg-[#121212] border-[#222222] text-zinc-300 hover:border-[#333333]'
                }`}
              >
                <div className="flex items-center space-x-2.5">
                  <div className="w-5 h-5 flex items-center justify-center">
                    {isDone ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Circle className="w-4 h-4 text-zinc-500" />
                    )}
                  </div>
                  <div>
                    <span className={`text-xs font-semibold ${isDone ? 'line-through text-zinc-400' : 'text-white'}`}>
                      {supp.name}
                    </span>
                    <span className="block text-[10px] text-zinc-400">{supp.timing}</span>
                  </div>
                </div>
                <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                  isDone ? 'bg-emerald-500/20 text-emerald-300' : 'bg-[#222222] text-zinc-400'
                }`}>
                  {isDone ? 'Taken' : 'Pending'}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
