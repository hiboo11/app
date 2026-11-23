import React, { useState } from 'react';
import { X, Check, Dumbbell, Flame, Shield, Zap, Award, Activity, Compass, Waves, Sparkles, Scale, Ruler, Target } from 'lucide-react';
import { SPORTS_CATALOG } from '../data/sportsData';
import { sounds } from '../utils/audio';
import confetti from 'canvas-confetti';

const ICON_MAP = {
  Dumbbell,
  Flame,
  Shield,
  Zap,
  Award,
  Activity,
  Compass,
  Waves
};

export function OnboardingModal({ isOpen, user, onClose, onSave, onResetDemo }) {
  if (!isOpen) return null;

  const [name, setName] = useState(user.name || 'Alexandre R.');
  const [selectedSports, setSelectedSports] = useState(user.sports || ['kickboxing']);
  const [heightCm, setHeightCm] = useState(user.heightCm || 180);
  const [weightKg, setWeightKg] = useState(user.weightKg || 78);
  const [fitnessGoal, setFitnessGoal] = useState(user.fitnessGoal || 'Muscle Gain');
  const [experienceLevel, setExperienceLevel] = useState(user.experienceLevel || 'Intermediate');

  const goals = [
    { id: 'Muscle Gain', title: 'Muscle Gain (Hypertrophy)', desc: '+350 kcal / High Protein (2.2g/kg)', icon: '💪' },
    { id: 'Fat Loss', title: 'Fat Loss & Cutting', desc: '-500 kcal / Protein Sparing (2.4g/kg)', icon: '🔥' },
    { id: 'Endurance', title: 'Aerobic Endurance', desc: 'High Carb / VO2max & Glycogen focus', icon: '⚡' },
    { id: 'Technique Mastery', title: 'Technique & Striking Power', desc: 'Maintenance Calorie / Agility & Reflexes', icon: '🥋' }
  ];

  const levels = ['Beginner', 'Intermediate', 'Advanced'];

  const toggleSport = (sportId) => {
    sounds.playClick();
    if (selectedSports.includes(sportId)) {
      if (selectedSports.length > 1) {
        setSelectedSports(selectedSports.filter(s => s !== sportId));
      }
    } else {
      setSelectedSports([...selectedSports, sportId]);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    sounds.playSuccess();
    try {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#E50914', '#FFFFFF', '#FF3B47']
      });
    } catch (err) {}

    onSave({
      ...user,
      name,
      sports: selectedSports,
      heightCm: Number(heightCm),
      weightKg: Number(weightKg),
      fitnessGoal,
      experienceLevel,
      hasCompletedOnboarding: true
    });
  };

  // Quick BMI preview
  const heightM = heightCm / 100;
  const bmi = (weightKg / (heightM * heightM)).toFixed(1);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm p-0 sm:p-4">
      <div className="bg-[#121212] w-full max-w-[430px] rounded-t-3xl sm:rounded-3xl border border-[#262626] max-h-[92vh] flex flex-col overflow-hidden shadow-2xl animate-in slide-in-from-bottom duration-300">
        {/* Modal Header */}
        <div className="p-4 border-b border-[#222222] flex items-center justify-between bg-[#161616]">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-[#E50914] flex items-center justify-center shadow-glow-crimson-sm">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white leading-tight">Athlete Profile Setup</h2>
              <p className="text-[11px] text-zinc-400">Calibrates your nutrition, drills & coach</p>
            </div>
          </div>
          <button
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-[#202020] text-zinc-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSave} className="p-4 space-y-5 overflow-y-auto smooth-scroll text-sm flex-1">
          {/* Athlete Name */}
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">Athlete Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#1A1A1A] border border-[#2E2E2E] focus:border-[#E50914] rounded-xl px-3 py-2 text-white text-sm outline-none transition-all"
              placeholder="e.g. Alexandre R."
              required
            />
          </div>

          {/* Primary Sports Selection */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-zinc-300">Choose Primary Disciplines</label>
              <span className="text-[11px] text-[#E50914] font-medium">{selectedSports.length} Selected</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {SPORTS_CATALOG.map((sport) => {
                const Icon = ICON_MAP[sport.iconName] || Shield;
                const isSelected = selectedSports.includes(sport.id);

                return (
                  <button
                    type="button"
                    key={sport.id}
                    onClick={() => toggleSport(sport.id)}
                    className={`flex items-center space-x-2.5 p-2.5 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'bg-[#E50914]/15 border-[#E50914] text-white shadow-glow-crimson-sm'
                        : 'bg-[#181818] border-[#262626] text-zinc-400 hover:text-white hover:border-[#383838]'
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-[#E50914] text-white' : 'bg-[#222222] text-zinc-400'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <div className="truncate flex-1">
                      <div className="text-xs font-bold truncate leading-tight">{sport.name}</div>
                      <div className="text-[10px] text-zinc-400 truncate">{sport.badge}</div>
                    </div>
                    {isSelected && <Check className="w-3.5 h-3.5 text-[#E50914] shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Biometrics: Height & Weight */}
          <div className="grid grid-cols-2 gap-3 bg-[#181818] p-3 rounded-2xl border border-[#262626]">
            <div>
              <label className="flex items-center text-xs font-semibold text-zinc-300 mb-1">
                <Ruler className="w-3.5 h-3.5 mr-1 text-[#E50914]" />
                Height (cm)
              </label>
              <input
                type="number"
                min="120"
                max="230"
                value={heightCm}
                onChange={(e) => setHeightCm(e.target.value)}
                className="w-full bg-[#111111] border border-[#2E2E2E] focus:border-[#E50914] rounded-xl px-3 py-2 text-white font-bold text-sm outline-none"
                required
              />
            </div>
            <div>
              <label className="flex items-center text-xs font-semibold text-zinc-300 mb-1">
                <Scale className="w-3.5 h-3.5 mr-1 text-[#E50914]" />
                Weight (kg)
              </label>
              <input
                type="number"
                min="35"
                max="200"
                step="0.5"
                value={weightKg}
                onChange={(e) => setWeightKg(e.target.value)}
                className="w-full bg-[#111111] border border-[#2E2E2E] focus:border-[#E50914] rounded-xl px-3 py-2 text-white font-bold text-sm outline-none"
                required
              />
            </div>

            <div className="col-span-2 flex items-center justify-between pt-1 border-t border-[#262626] text-[11px] text-zinc-400">
              <span>Calculated BMI: <strong className="text-white">{bmi}</strong></span>
              <span className="text-[#FF4D55] font-semibold">Dynamic Calorie Recalibration</span>
            </div>
          </div>

          {/* Fitness Goal */}
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Primary Fitness Goal</label>
            <div className="space-y-1.5">
              {goals.map((g) => {
                const isSelected = fitnessGoal === g.id;
                return (
                  <div
                    key={g.id}
                    onClick={() => {
                      sounds.playClick();
                      setFitnessGoal(g.id);
                    }}
                    className={`p-2.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-[#E50914]/15 border-[#E50914] text-white shadow-glow-crimson-sm'
                        : 'bg-[#181818] border-[#262626] text-zinc-300 hover:border-[#383838]'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5">
                      <span className="text-lg">{g.icon}</span>
                      <div>
                        <div className="text-xs font-bold leading-tight">{g.title}</div>
                        <div className="text-[11px] text-zinc-400">{g.desc}</div>
                      </div>
                    </div>
                    {isSelected && (
                      <div className="w-5 h-5 rounded-full bg-[#E50914] flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 text-white stroke-[3]" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Experience Level */}
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">Experience Level</label>
            <div className="grid grid-cols-3 gap-2">
              {levels.map((lvl) => (
                <button
                  type="button"
                  key={lvl}
                  onClick={() => {
                    sounds.playClick();
                    setExperienceLevel(lvl);
                  }}
                  className={`py-2 px-1 text-center rounded-xl text-xs font-bold border transition-all ${
                    experienceLevel === lvl
                      ? 'bg-[#E50914] border-[#E50914] text-white shadow-glow-crimson-sm'
                      : 'bg-[#181818] border-[#2A2A2A] text-zinc-400 hover:text-white'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex items-center space-x-2">
            <button
              type="button"
              onClick={() => {
                if (window.confirm('Reset profile and sample logs to factory defaults?')) {
                  onResetDemo();
                }
              }}
              className="py-3 px-3 bg-[#1C1C1C] hover:bg-[#252525] text-zinc-400 hover:text-white text-xs font-semibold rounded-xl border border-[#2E2E2E] transition-all"
            >
              Reset Demo
            </button>
            <button
              type="submit"
              className="flex-1 py-3 px-4 bg-[#E50914] hover:bg-[#FF1A27] text-white font-extrabold text-sm rounded-xl shadow-glow-crimson transition-all active:scale-[0.98] flex items-center justify-center space-x-2"
            >
              <Check className="w-4 h-4 stroke-[3]" />
              <span>Save & Recalibrate</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
