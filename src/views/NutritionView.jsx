import React from 'react';
import {
  Utensils,
  RefreshCw,
  Plus,
  Check,
  Flame,
  CheckCircle2,
  Circle,
  Clock,
  Sparkles,
  ChevronRight,
  Info
} from 'lucide-react';
import { calculateNutritionTargets, MEAL_SLOTS, SUPPLEMENTS_CATALOG } from '../data/nutritionData';
import { sounds } from '../utils/audio';
import confetti from 'canvas-confetti';

export function NutritionView({
  user,
  nutrition,
  mealSwaps,
  supplementsStatus,
  onUpdateNutrition,
  onSwapMeal,
  onToggleSupplement
}) {
  const targets = calculateNutritionTargets(user);

  const handleSwap = (slotId) => {
    sounds.playClick();
    const slot = MEAL_SLOTS.find(s => s.slotId === slotId);
    if (!slot) return;
    const currentIdx = mealSwaps[slotId] || 0;
    const nextIdx = (currentIdx + 1) % slot.options.length;
    onSwapMeal(slotId, nextIdx);
  };

  const handleLogMeal = (meal) => {
    sounds.playSuccess();
    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#E50914', '#10B981', '#FFFFFF']
      });
    } catch (e) {}

    onUpdateNutrition({
      calories: nutrition.calories + meal.calories,
      protein: nutrition.protein + meal.protein,
      carbs: nutrition.carbs + meal.carbs,
      fats: nutrition.fats + meal.fats
    });
  };

  const totalMealCalories = MEAL_SLOTS.reduce((acc, slot) => {
    const idx = mealSwaps[slot.slotId] || 0;
    const meal = slot.options[idx] || slot.options[0];
    return acc + meal.calories;
  }, 0);

  return (
    <div className="space-y-4 pb-20 animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <h1 className="text-xl font-black text-white tracking-tight">Personalized Nutrition</h1>
        <p className="text-xs text-zinc-400 mt-0.5">
          Caloric balance & macro distribution tailored for <span className="text-[#FF4D55] font-semibold">{user.fitnessGoal}</span>.
        </p>
      </div>

      {/* Target Breakdown Card */}
      <div className="bg-[#181818] p-4 rounded-3xl border border-[#262626] shadow-xl space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">DAILY TARGET</span>
            <div className="flex items-baseline space-x-1.5 mt-0.5">
              <span className="text-2xl font-black text-white">{targets.calories}</span>
              <span className="text-xs text-zinc-400 font-semibold">kcal / day</span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-bold text-[#FF4D55] uppercase tracking-wider bg-[#E50914]/15 px-2 py-0.5 rounded-full border border-[#E50914]/30">
              {user.fitnessGoal}
            </span>
            <span className="block text-[11px] text-zinc-400 mt-1">
              Planned: <strong className="text-white">{totalMealCalories} kcal</strong>
            </span>
          </div>
        </div>

        {/* Macro Targets Bar */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#262626]">
          <div className="bg-[#111111] p-2.5 rounded-2xl border border-[#262626]">
            <span className="text-[10px] text-red-400 font-bold block">PROTEIN</span>
            <span className="text-base font-extrabold text-white">{targets.protein}g</span>
            <span className="text-[10px] text-zinc-400 block mt-0.5">~{Math.round((targets.protein * 4 / targets.calories) * 100)}% kcal</span>
          </div>
          <div className="bg-[#111111] p-2.5 rounded-2xl border border-[#262626]">
            <span className="text-[10px] text-amber-400 font-bold block">CARBS</span>
            <span className="text-base font-extrabold text-white">{targets.carbs}g</span>
            <span className="text-[10px] text-zinc-400 block mt-0.5">~{Math.round((targets.carbs * 4 / targets.calories) * 100)}% kcal</span>
          </div>
          <div className="bg-[#111111] p-2.5 rounded-2xl border border-[#262626]">
            <span className="text-[10px] text-emerald-400 font-bold block">FATS</span>
            <span className="text-base font-extrabold text-white">{targets.fats}g</span>
            <span className="text-[10px] text-zinc-400 block mt-0.5">~{Math.round((targets.fats * 9 / targets.calories) * 100)}% kcal</span>
          </div>
        </div>
      </div>

      {/* Daily Meal Cards with Swap Meal Button */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
            Daily Meal Schedule
          </h2>
          <span className="text-[11px] text-[#FF4D55] font-semibold">Tap "Swap Meal" to cycle recipes</span>
        </div>

        {MEAL_SLOTS.map((slot) => {
          const currentIdx = mealSwaps[slot.slotId] || 0;
          const meal = slot.options[currentIdx] || slot.options[0];

          return (
            <div
              key={slot.slotId}
              className="bg-[#181818] rounded-3xl p-4 border border-[#262626] space-y-3 shadow-md"
            >
              {/* Slot Header */}
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF4D55]">
                    {slot.title} • {slot.time}
                  </span>
                  <h3 className="text-sm font-extrabold text-white mt-0.5 leading-snug">
                    {meal.name}
                  </h3>
                </div>

                {/* Swap Meal Button */}
                <button
                  onClick={() => handleSwap(slot.slotId)}
                  className="flex items-center space-x-1.5 py-1.5 px-3 bg-[#202020] hover:bg-[#282828] active:scale-95 text-xs font-bold text-zinc-200 rounded-xl border border-[#333333] transition-all"
                  title="Cycle to alternative recipe"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-[#E50914]" />
                  <span>Swap</span>
                  <span className="text-[10px] text-zinc-400">({currentIdx + 1}/{slot.options.length})</span>
                </button>
              </div>

              {/* Recipe Description & Ingredients */}
              <p className="text-xs text-zinc-300 leading-relaxed">
                {meal.description}
              </p>

              {/* Ingredients Pills */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {meal.ingredients.map((ing, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] bg-[#111111] text-zinc-400 px-2 py-0.5 rounded-lg border border-[#242424]"
                  >
                    {ing}
                  </span>
                ))}
              </div>

              {/* Macro stats + Log action */}
              <div className="flex items-center justify-between pt-2 border-t border-[#242424]">
                <div className="flex items-center space-x-3 text-xs">
                  <span className="font-extrabold text-white">
                    {meal.calories} <span className="text-[10px] text-zinc-400 font-normal">kcal</span>
                  </span>
                  <span className="text-red-400 font-semibold">{meal.protein}g P</span>
                  <span className="text-amber-400 font-semibold">{meal.carbs}g C</span>
                  <span className="text-emerald-400 font-semibold">{meal.fats}g F</span>
                </div>

                <button
                  onClick={() => handleLogMeal(meal)}
                  className="flex items-center space-x-1 py-1.5 px-3 bg-[#E50914] hover:bg-[#FF1A27] active:scale-95 text-white text-xs font-bold rounded-xl shadow-glow-crimson-sm transition-all"
                >
                  <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>Log as Eaten</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Dedicated Supplements Schedule */}
      <div className="bg-[#181818] rounded-3xl p-4 border border-[#262626] space-y-3 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
              <Sparkles className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">Supplements Schedule</h2>
              <p className="text-[11px] text-zinc-400">Clinically dosed athletic ergogenic aids</p>
            </div>
          </div>
          <span className="text-[11px] text-emerald-400 font-semibold">
            {Object.values(supplementsStatus).filter(Boolean).length}/{SUPPLEMENTS_CATALOG.length} Complete
          </span>
        </div>

        <div className="space-y-2">
          {SUPPLEMENTS_CATALOG.map((supp) => {
            const isDone = !!supplementsStatus[supp.id];

            return (
              <div
                key={supp.id}
                onClick={() => {
                  sounds.playClick();
                  onToggleSupplement(supp.id);
                }}
                className={`p-3 rounded-2xl border cursor-pointer transition-all space-y-1.5 ${
                  isDone
                    ? 'bg-emerald-950/20 border-emerald-800/30'
                    : 'bg-[#121212] border-[#222222] hover:border-[#333333]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-5 h-5 flex items-center justify-center">
                      {isDone ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Circle className="w-4 h-4 text-zinc-500" />
                      )}
                    </div>
                    <div>
                      <h4 className={`text-xs font-bold ${isDone ? 'line-through text-zinc-400' : 'text-white'}`}>
                        {supp.name}
                      </h4>
                      <span className="text-[10px] text-zinc-400">{supp.timing} • {supp.dosage}</span>
                    </div>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                    isDone ? 'bg-emerald-500/20 text-emerald-300' : 'bg-[#1E1E1E] text-zinc-400'
                  }`}>
                    {isDone ? 'Completed' : 'Pending'}
                  </span>
                </div>
                <p className="text-[11px] text-zinc-400 pl-7">
                  {supp.benefits}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
