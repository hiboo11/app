// AI Coach Knowledge Base, Response Engine & Contextual Intelligence

export const COACH_QUICK_CHIPS = [
  { label: '🔥 20-Min Workout', prompt: 'Suggest an intense 20-minute workout for my current sport and goal.' },
  { label: '🥊 Fix My Jab Form', prompt: 'How do I fix my jab mechanics and stop telegraphing my punches?' },
  { label: '🥗 Adjust My Macros', prompt: 'Analyze my current height, weight, and goal to give me ideal macro targets.' },
  { label: '⚡ Pre-Workout Fuel', prompt: 'What should I eat 45 to 60 minutes before heavy training?' },
  { label: '🥋 Clinch & Knee Tips', prompt: 'Give me 3 vital cues for controlling opponent head in the Muay Thai clinch.' },
  { label: '🏃 Prevent Shin Splints', prompt: 'How do I prevent shin splints and optimize running footstrike?' },
  { label: '💤 Recovery Routine', prompt: 'What is the optimal evening recovery protocol for nervous system repair?' }
];

// Generates an expert contextual coach response based on user profile
export function generateCoachResponse(prompt, user) {
  const p = prompt.toLowerCase();
  const sport = user.sports?.[0] || 'musculation';
  const weight = user.weightKg || 75;
  const height = user.heightCm || 178;
  const goal = user.fitnessGoal || 'Muscle Gain';

  // 1. Workout suggestion
  if (p.includes('20-min') || p.includes('workout') || p.includes('training session') || p.includes('routine')) {
    if (sport === 'kickboxing' || sport === 'muaythai') {
      return `### ⚡ 20-Minute High-Intensity Striking Protocol (${sport.toUpperCase()})
**Tailored for:** ${weight}kg | Goal: ${goal}

**Warmup (3 min):**
* 60s Jump rope / high knees
* 60s Shadowboxing focusing on hip rotation
* 60s Dynamic leg swings & hip openers

**The Combat Circuit (5 Rounds × 3 min work | 45s rest):**
1. **Round 1:** Jab-Cross-Lead Hook + Double Check defense (Speed focus)
2. **Round 2:** Heavy bag power low kicks (10 per leg) + 15 explosive sprawl burpees
3. **Round 3:** Lead Teep push kick -> Step in Rear Knee -> Disengage high guard
4. **Round 4:** 1-2-Liver Hook -> Rear High Kick combo burnout
5. **Round 5 (Championship Round):** Nonstop 30s straight punches + 30s power kicks + 30s clinch knees

*💡 Coach Cue: Keep your chin tucked into your chest collarbone on every punch. Breathe with sharp exhalations on impact!*`;
    } else if (sport === 'running') {
      return `### 🏃 20-Minute VO2max & Threshold Booster
**Tailored for:** ${weight}kg runner | Goal: ${goal}

* **0-4 min:** Easy conversational warm-up jog (Zone 2)
* **4-6 min:** Form strides: 3 × 20 seconds accelerating to 85% with walk-back recovery
* **6-16 min (The Engine Block - 5 Sets):**
  * 90 seconds @ 5K race pace (Zone 4/5)
  * 30 seconds easy float recovery jog
* **16-20 min:** Easy cooldown jog + calf and hip flexor static elongations

*💡 Coach Cue: Keep cadence above 175 SPM. Land soft on the midfoot beneath your center of mass!*`;
    } else if (sport === 'cycling') {
      return `### 🚴 20-Minute High-Torque Power Burn
**Tailored for:** ${weight}kg cyclist | Goal: ${goal}

* **0-5 min:** Cadence ramp (from 80 RPM up to 105 RPM, easy gear)
* **5-15 min (Microburst Tabata):**
  * 10 rounds of: 40 seconds @ 110% FTP (seated aerodynamic tuck) followed by 20 seconds spinning recovery
* **15-20 min:** High cadence cool-down spin (95 RPM, low resistance)

*💡 Coach Cue: Keep your upper body rock solid. All power originates from glute and hip hinge extension!*`;
    } else if (sport === 'surf') {
      return `### 🏄 20-Minute Surf Fitness & Explosive Pop-Up Circuit
**Tailored for:** ${weight}kg | Goal: ${goal}

**4 Rounds (45s work / 15s rest):**
1. **Dry-Land Explosive Pop-Ups:** Chest to mat, snap feet cleanly under hips without touching knees.
2. **Cobra Swimmers:** Prone arch with continuous arm swim strokes for lat/rhomboid endurance.
3. **Rotational Squat Jumps:** Simulating bottom-turn compression and rail snap.
4. **Hanging Knee Tucks / Core Hollow Rocks:** Essential for duck-dive core stability.

*💡 Coach Cue: Eyes stay up looking at the horizon line, never down at the ground!*`;
    } else {
      // Default Musculation / Strength
      return `### 🏋️ 20-Minute Anabolic Density Circuit
**Tailored for:** ${weight}kg | Goal: ${goal}

**Complete 4 Giant Sets with 90s rest between sets:**
1. **Dumbbell / Barbell Romanian Deadlifts:** 10 reps (3-second slow lowering phase)
2. **Incline Dumbbell Chest Press / Floor Press:** 10-12 reps
3. **Weighted Bulgarian Split Squats:** 8 reps per leg
4. **Bodyweight Pull-Ups or Inverted Rows:** Max reps to 1 rep in reserve

*💡 Coach Cue: Zero momentum. Control the negative eccentric phase to maximize muscle fiber micro-trauma and hypertrophy.*`;
    }
  }

  // 2. Form check: Jab / Punch
  if (p.includes('jab') || p.includes('punch') || p.includes('telegraph') || p.includes('strike')) {
    return `### 🥊 The Master Jab Blueprint (Zero Telegraphing)

1. **The Piston Mechanism:**
   * The jab does **not** begin in the arm—it starts with an explosive push from your rear big toe.
   * Do not flare your lead elbow out before extending! If your elbow pops out sideways, your opponent sees it coming 100 milliseconds early.
   
2. **Shoulder Shield:**
   * At full extension, rotate your fist 90 degrees so the knuckles are horizontal.
   * Shrug your lead shoulder upward to bury your chin behind it. This shields you from overhand right counters!

3. **Snap & Return Velocity:**
   * The return trip must be **faster** than the outward strike.
   * Snap your hand right back to your cheekbone like touching a hot stove. Never drop it to your waist after punching.

*💡 Drill for Today:* Stand with your lead shoulder 5 cm from a flat wall. Throw 50 straight jabs without allowing your elbow to scrape against the wall. That guarantees straight-line trajectory!`;
  }

  // 3. Macro adjustments
  if (p.includes('macro') || p.includes('calorie') || p.includes('nutrition') || p.includes('diet') || p.includes('protein')) {
    const isGain = goal === 'Muscle Gain';
    const isLoss = goal === 'Fat Loss';
    const targetProtein = Math.round(weight * (isLoss ? 2.4 : isGain ? 2.2 : 2.0));
    const targetFats = Math.round(weight * (isLoss ? 0.8 : 1.0));

    return `### 🥗 Personalized Macro Assessment
**Profile:** ${height}cm | ${weight}kg | Primary Sport: **${sport.toUpperCase()}** | Goal: **${goal}**

**Your Optimal Daily Targets:**
* 🥩 **Protein:** **${targetProtein}g / day** (~${Math.round(targetProtein / 4)}g per meal over 4 meals)
  * *Why:* Crucial for muscle protein synthesis and nitrogen balance at ${weight}kg.
* 🥑 **Fats:** **${targetFats}g / day**
  * *Why:* Hormonal support, joint lubrication, and cellular membrane integrity.
* 🍚 **Carbohydrates:** Tailored to training volume
  * On heavy training days: prioritize complex carbs (oats, sweet potato, jasmine rice) around workout windows.
  * On active recovery days: slightly reduce carbs and boost hydration with electrolytes.

*💡 Action Step: Check your Nutrition tab now to log today's meals and see your live circular macro ring!*`;
  }

  // 4. Pre-workout meal
  if (p.includes('pre-workout') || p.includes('pre workout') || p.includes('eat before') || p.includes('fuel')) {
    return `### ⚡ The 45-60 Minute Pre-Training Fuel Protocol

**Goal:** Rapid glycogen availability, zero stomach discomfort, and zero blood-sugar crash during heavy rounds.

**The Golden Ratio (30-45g Fast-Acting Carbs + 15-20g Lean Protein + Low Fat):**

* **Option A (The Athlete Staple):**
  * 3 Organic rice cakes smeared with 1 tbsp 100% almond butter + 1 sliced banana + drizzle of raw honey.
  * *Digestion time: 40 minutes.*
* **Option B (Liquid Fuel):**
  * 25g Whey Isolate mixed in 250ml pure coconut water + 1 peeled medjool date.
  * *Digestion time: 30 minutes.*

**Hydration Priming:**
Drink 400ml water with 1 pinch of pink Himalayan sea salt 30 minutes prior. This expands blood plasma volume for better vascular pump and endurance!`;
  }

  // 5. Clinch tips
  if (p.includes('clinch') || p.includes('knee') || p.includes('muay thai') || p.includes('plum')) {
    return `### 🥋 3 Golden Rules of Muay Thai Clinch (The Plum)

1. **Crown Control (No Finger Interlocking):**
   * Place one palm over the back of your other hand right on the crown of the opponent's skull.
   * Pull their head downward while squeezing your forearms into their collarbones like a vice grip.

2. **Steer with Your Elbows:**
   * Your elbows must remain tightly pinned to their sternum.
   * If you flare your elbows, your opponent will swim their arms inside and take inside bicep control.

3. **Off-Balance Before the Spear Knee:**
   * Never throw a knee while standing completely static.
   * Step backward or turn your hips 45 degrees to jerk their balance off-center; as their posture breaks, drive your knee upward through their ribs!`;
  }

  // 6. Shin splints & Running form
  if (p.includes('shin') || p.includes('splint') || p.includes('foot') || p.includes('stride')) {
    return `### 🏃 Curing & Preventing Shin Splints (Medial Tibial Stress)

1. **Stop Overstriding Immediately:**
   * Shin splints are almost always caused by landing with your heel far out in front of your knee.
   * Shorten your stride and aim for 175-180 strides per minute (SPM).

2. **Bulletproof Tibialis Anterior:**
   * Lean back against a smooth wall, heels 30cm out, and raise your toes toward your shins for 3 sets of 25 reps daily.
   * This strengthens the exact muscle decelerating your footfall.

3. **Calf Soleus Foam Rolling & Ice Cups:**
   * Use an ice paper cup directly along the medial shin bone for 8 minutes after runs.
   * Replace running shoes if they have exceeded 600-750 kilometers.`;
  }

  // 7. Recovery & Sleep
  if (p.includes('recovery') || p.includes('sleep') || p.includes('sore') || p.includes('rest')) {
    return `### 💤 Championship Nervous System Recovery Protocol

**1. Sleep Architecture (Growth Hormone Peak):**
* Keep your bedroom at **18°C (64°F)** and pitch black.
* Take **300mg Magnesium Bisglycinate** 40 minutes before bed to switch on parasympathetic tone.

**2. Contrast Hydrotherapy:**
* 3 minutes hot shower followed by 60 seconds icy cold rinse, cycled 3 times.
* Vasoconstriction and vasodilation flush metabolic waste and lactic byproducts from muscle tissue.

**3. Active Mobility Routine (10 mins):**
* Couch stretch (2 min per side for tight psoas/hip flexors).
* Pigeon pose for glutes after heavy kicks and squats.
* Cat-cow with deep 4-second box inhalations.`;
  }

  // Default intelligent coach response
  return `### 🥊 Coach Kai's Tactical Briefing
**Sport:** ${sport.toUpperCase()} | **Current Goal:** ${goal} (${weight}kg)

You are dialed in. Here is what we are focusing on today:

1. **Execution Over Speed:** Whatever drills you have on your docket today, focus on textbook mechanics before cranking up the pace.
2. **Fuel & Hydration:** Have you hit your water intake goal yet? Aim for 35ml per kg of bodyweight today.
3. **Recovery Window:** Ensure your post-training protein intake is logged within 60 minutes of your workout.

Ask me anything specific—whether it's breaking down a complex combination, fixing your squat depth, or fine-tuning your daily calorie deficit!`;
}
