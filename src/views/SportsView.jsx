import React, { useState } from 'react';
import {
  Shield,
  Dumbbell,
  Flame,
  Zap,
  Award,
  Activity,
  Compass,
  Waves,
  ChevronRight,
  ArrowLeft,
  CheckCircle2,
  Circle,
  AlertCircle,
  Sparkles,
  Trophy,
  Filter
} from 'lucide-react';
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

export function SportsView({ completedDrills, onToggleDrill, initialSportId }) {
  const [selectedSportId, setSelectedSportId] = useState(initialSportId || null);
  const [activeFilter, setActiveFilter] = useState('All');
  const [detailTab, setDetailTab] = useState('stances'); // 'stances' | 'techniques' | 'drills' | 'tips'

  const categories = ['All', 'Martial Arts', 'Strength', 'Endurance', 'Water'];

  const filteredSports = SPORTS_CATALOG.filter((sport) => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Martial Arts') return sport.category.toLowerCase().includes('martial');
    if (activeFilter === 'Strength') return sport.category.toLowerCase().includes('strength');
    if (activeFilter === 'Endurance') return sport.category.toLowerCase().includes('endurance');
    if (activeFilter === 'Water') return sport.category.toLowerCase().includes('water');
    return true;
  });

  const selectedSport = SPORTS_CATALOG.find(s => s.id === selectedSportId);

  const handleSelectSport = (id) => {
    sounds.playClick();
    setSelectedSportId(id);
    setDetailTab('stances');
  };

  const handleBackToCatalog = () => {
    sounds.playClick();
    setSelectedSportId(null);
  };

  const handleToggleDrillCheckbox = (drillId) => {
    sounds.playClick();
    const willBeDone = !completedDrills[drillId];
    onToggleDrill(drillId);

    if (willBeDone) {
      sounds.playSuccess();
      try {
        confetti({
          particleCount: 40,
          spread: 50,
          origin: { y: 0.7 },
          colors: ['#E50914', '#FFFFFF']
        });
      } catch (e) {}
    }
  };

  // If a sport is selected, show its deep-dive Fundamentals view
  if (selectedSport) {
    const Icon = ICON_MAP[selectedSport.iconName] || Shield;
    const sportDrills = selectedSport.drills || [];
    const completedCount = sportDrills.filter(d => completedDrills[d.id]).length;
    const drillProgressPercent = sportDrills.length > 0 ? Math.round((completedCount / sportDrills.length) * 100) : 0;

    return (
      <div className="space-y-4 pb-20 animate-in fade-in duration-200">
        {/* Back Button & Header */}
        <div className="flex items-center justify-between">
          <button
            onClick={handleBackToCatalog}
            className="flex items-center space-x-1.5 text-xs font-bold text-zinc-300 hover:text-white bg-[#181818] px-3 py-2 rounded-xl border border-[#282828] active:scale-95 transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#E50914]" />
            <span>All Disciplines</span>
          </button>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#FF4D55] bg-[#E50914]/15 px-2.5 py-1 rounded-full border border-[#E50914]/30">
            {selectedSport.badge}
          </span>
        </div>

        {/* Hero Card */}
        <div className="bg-[#181818] rounded-3xl border border-[#262626] overflow-hidden relative shadow-xl">
          <div className="p-4 relative z-10">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-10 h-10 rounded-2xl bg-[#E50914] flex items-center justify-center text-white shadow-glow-crimson-sm">
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-black text-white leading-tight">{selectedSport.name}</h2>
                <p className="text-xs text-zinc-400">{selectedSport.subtitle}</p>
              </div>
            </div>

            <p className="text-xs text-zinc-300 leading-relaxed mb-3">
              {selectedSport.description}
            </p>

            <div className="flex items-center space-x-3 text-[11px]">
              <div className="bg-[#111111] px-2.5 py-1.5 rounded-xl border border-[#262626] flex items-center space-x-1 text-zinc-300">
                <Flame className="w-3.5 h-3.5 text-[#E50914]" />
                <span><strong>~{selectedSport.calorieBurnRate}</strong> kcal/hr</span>
              </div>
              <div className="bg-[#111111] px-2.5 py-1.5 rounded-xl border border-[#262626] text-zinc-300">
                <span>Drill Mastery: <strong className="text-white">{drillProgressPercent}%</strong></span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs for Fundamentals */}
        <div className="flex items-center bg-[#141414] p-1 rounded-2xl border border-[#222222]">
          {[
            { id: 'stances', label: 'Stances' },
            { id: 'techniques', label: 'Techniques' },
            { id: 'drills', label: `Drills (${completedCount}/${sportDrills.length})` },
            { id: 'tips', label: 'Coach Tips' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                sounds.playClick();
                setDetailTab(tab.id);
              }}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all text-center ${
                detailTab === tab.id
                  ? 'bg-[#E50914] text-white shadow-glow-crimson-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: Core Stances & Postures */}
        {detailTab === 'stances' && (
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 px-1">
              Foundational Stances & Mechanical Alignment
            </h3>
            {selectedSport.stances.map((stance, idx) => (
              <div key={idx} className="bg-[#181818] p-3.5 rounded-2xl border border-[#262626] space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="w-5 h-5 rounded-full bg-[#E50914]/20 text-[#FF4D55] text-xs font-black flex items-center justify-center border border-[#E50914]/30">
                    {idx + 1}
                  </span>
                  <h4 className="text-sm font-bold text-white">{stance.name}</h4>
                </div>
                <p className="text-xs text-zinc-300">{stance.description}</p>
                <div className="bg-[#111111] p-2.5 rounded-xl border border-[#242424] text-[11px] space-y-1">
                  <div>
                    <strong className="text-zinc-200">Biomechanical Cue: </strong>
                    <span className="text-zinc-400">{stance.mechanics}</span>
                  </div>
                  <div className="text-red-400 flex items-start space-x-1 pt-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                    <span><strong>Mistake to avoid: </strong>{stance.mistakeToAvoid}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 2: Key Techniques */}
        {detailTab === 'techniques' && (
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 px-1">
              Core Signature Techniques
            </h3>
            {selectedSport.techniques.map((tech, idx) => (
              <div key={idx} className="bg-[#181818] p-3.5 rounded-2xl border border-[#262626] space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white">{tech.name}</h4>
                  <span className="text-[10px] text-zinc-400 bg-[#121212] px-2 py-0.5 rounded-lg border border-[#2A2A2A]">
                    {tech.repsRecommendation}
                  </span>
                </div>
                <div className="bg-[#121212] p-2.5 rounded-xl border border-[#242424] text-xs space-y-1">
                  <p className="text-zinc-200">
                    <strong className="text-[#FF4D55]">Execution Cue: </strong>
                    {tech.cue}
                  </p>
                  <p className="text-[11px] text-zinc-400">
                    <strong>Primary Focus: </strong>{tech.focus}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: Drills with Interactive Checkboxes */}
        {detailTab === 'drills' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                Progressive Drills Checklist
              </h3>
              <span className="text-xs font-bold text-[#FF4D55]">{drillProgressPercent}% Completed</span>
            </div>

            {/* Drill Progress Bar */}
            <div className="w-full h-2 bg-[#202020] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#E50914] to-[#FF4D55] rounded-full transition-all duration-500 shadow-glow-crimson-sm"
                style={{ width: `${drillProgressPercent}%` }}
              />
            </div>

            <div className="space-y-2">
              {sportDrills.map((drill) => {
                const isCompleted = !!completedDrills[drill.id];

                return (
                  <div
                    key={drill.id}
                    onClick={() => handleToggleDrillCheckbox(drill.id)}
                    className={`p-3 rounded-2xl border flex items-start space-x-3 cursor-pointer transition-all ${
                      isCompleted
                        ? 'bg-[#E50914]/10 border-[#E50914]/40 text-zinc-200'
                        : 'bg-[#181818] border-[#262626] text-white hover:border-[#383838]'
                    }`}
                  >
                    <div className="pt-0.5 shrink-0">
                      {isCompleted ? (
                        <CheckCircle2 className="w-5 h-5 text-[#E50914] fill-[#E50914]/20" />
                      ) : (
                        <Circle className="w-5 h-5 text-zinc-500 hover:text-zinc-300" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className={`text-xs font-bold ${isCompleted ? 'line-through text-zinc-400' : 'text-white'}`}>
                          {drill.name}
                        </h4>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${
                          drill.level === 'Beginner'
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                            : drill.level === 'Intermediate'
                            ? 'bg-amber-950 text-amber-400 border border-amber-800'
                            : 'bg-red-950 text-red-400 border border-red-800'
                        }`}>
                          {drill.level}
                        </span>
                      </div>
                      <div className="text-[11px] text-zinc-400 mt-0.5 font-medium">
                        Volume: <span className="text-zinc-200">{drill.reps}</span>
                      </div>
                      <p className="text-[11px] text-zinc-400 mt-1 italic">
                        "{drill.note}"
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 4: Form Tips */}
        {detailTab === 'tips' && (
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 px-1">
              Coaching Cues & Injury Prevention
            </h3>
            <div className="space-y-2">
              {selectedSport.formTips.map((tip, idx) => (
                <div key={idx} className="bg-[#181818] p-3.5 rounded-2xl border border-[#262626] flex items-start space-x-2.5">
                  <div className="w-6 h-6 rounded-lg bg-[#E50914]/20 text-[#FF4D55] flex items-center justify-center shrink-0 text-xs font-black mt-0.5">
                    💡
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    {tip}
                  </p>
                </div>
              ))}
            </div>

            {/* Equipment checklist */}
            <div className="bg-[#121212] p-3.5 rounded-2xl border border-[#242424] mt-3">
              <h4 className="text-xs font-bold text-white mb-2 flex items-center">
                <Trophy className="w-3.5 h-3.5 text-[#E50914] mr-1.5" />
                Recommended Gear & Protection
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {selectedSport.equipment.map((item, idx) => (
                  <span key={idx} className="text-[11px] bg-[#1E1E1E] text-zinc-300 px-2 py-1 rounded-lg border border-[#333333]">
                    ✓ {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Sports Catalog Overview Grid
  return (
    <div className="space-y-4 pb-20 animate-in fade-in duration-300">
      {/* Title & Description */}
      <div>
        <h1 className="text-xl font-black text-white tracking-tight">Sports & Fundamentals</h1>
        <p className="text-xs text-zinc-400 mt-0.5">
          Master biomechanics, core stances, techniques & progressive drills.
        </p>
      </div>

      {/* Filter Chips */}
      <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar py-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              sounds.playClick();
              setActiveFilter(cat);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeFilter === cat
                ? 'bg-[#E50914] text-white shadow-glow-crimson-sm'
                : 'bg-[#181818] text-zinc-400 hover:text-white border border-[#262626]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Sports Grid */}
      <div className="grid grid-cols-1 gap-3">
        {filteredSports.map((sport) => {
          const Icon = ICON_MAP[sport.iconName] || Shield;
          const sportDrills = sport.drills || [];
          const completedCount = sportDrills.filter(d => completedDrills[d.id]).length;
          const percent = sportDrills.length > 0 ? Math.round((completedCount / sportDrills.length) * 100) : 0;

          return (
            <div
              key={sport.id}
              onClick={() => handleSelectSport(sport.id)}
              className="bg-[#181818] hover:bg-[#1E1E1E] active:scale-[0.99] rounded-2xl p-3.5 border border-[#262626] hover:border-[#E50914]/50 cursor-pointer transition-all shadow-md flex items-center justify-between group"
            >
              <div className="flex items-center space-x-3 flex-1 min-w-0 pr-2">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#242424] to-[#141414] border border-[#333333] group-hover:border-[#E50914] flex items-center justify-center shrink-0 text-white transition-colors">
                  <Icon className="w-6 h-6 text-[#E50914]" />
                </div>
                <div className="truncate">
                  <div className="flex items-center space-x-2">
                    <h3 className="text-sm font-extrabold text-white truncate">{sport.name}</h3>
                    <span className="text-[10px] bg-[#111111] text-zinc-400 px-1.5 py-0.5 rounded border border-[#2A2A2A]">
                      {sport.badge}
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-400 truncate mt-0.5">{sport.subtitle}</p>

                  <div className="flex items-center space-x-2 text-[10px] text-zinc-400 mt-1">
                    <span>🔥 {sport.calorieBurnRate} kcal/h</span>
                    <span>•</span>
                    <span className={percent === 100 ? 'text-emerald-400 font-bold' : 'text-[#FF4D55]'}>
                      {completedCount}/{sportDrills.length} Drills ({percent}%)
                    </span>
                  </div>
                </div>
              </div>

              <div className="w-8 h-8 rounded-full bg-[#202020] group-hover:bg-[#E50914] text-zinc-400 group-hover:text-white flex items-center justify-center transition-colors shrink-0">
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
