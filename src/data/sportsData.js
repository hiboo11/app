// Sports & Fundamentals Library Data

export const SPORTS_CATALOG = [
  {
    id: 'musculation',
    name: 'Musculation',
    subtitle: 'Hypertrophy & Strength Training',
    category: 'Strength & Conditioning',
    iconName: 'Dumbbell',
    badge: 'Strength',
    accentColor: '#E50914',
    bgGradient: 'from-red-950/40 via-zinc-900 to-black',
    heroImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=600&auto=format&fit=crop',
    calorieBurnRate: 480, // kcal/hr approx
    description: 'Master mechanical tension, compound barbell movements, and progressive overload for aesthetic muscular development and raw power.',
    equipment: ['Barbell', 'Dumbbells', 'Cable Machine', 'Weight Plates'],
    stances: [
      {
        name: 'Deadlift Setup & Hip Hinge',
        description: 'Feet shoulder-width apart, shins vertical to bar, lats locked in rear pocket, neutral spine with braced core.',
        mechanics: 'Drive hips back while keeping chest proud. Scapulae retracted, weight balanced over midfoot.',
        mistakeToAvoid: 'Rounding the lumbar spine or hyperextending aggressively at lockout.'
      },
      {
        name: 'Squat Stance & Foot Angulation',
        description: 'Feet slightly wider than hip-width, toes angled 15-30 degrees outward to allow deep hip socket clearance.',
        mechanics: 'Break at knees and hips simultaneously. Keep knees tracking over 2nd & 3rd toes while maintaining chest angle.',
        mistakeToAvoid: 'Knees caving inward (valgus collapse) or heels lifting off the floor.'
      },
      {
        name: 'Bench Press Retraction & Arch',
        description: 'Retract and depress scapulae into the bench padding. Plant feet flat to generate leg drive.',
        mechanics: 'Create stable base with tight glutes. Bar touches lower sternum with forearms vertically stacked beneath bar.',
        mistakeToAvoid: 'Flaring elbows 90 degrees out or unpinning shoulder blades at lockout.'
      }
    ],
    techniques: [
      {
        name: 'The Conventional Barbell Deadlift',
        cue: 'Push the floor away through midfoot; pull bar in contact with shins.',
        repsRecommendation: '3 sets of 5 reps @ 80-85% 1RM',
        focus: 'Posterior chain, glutes, hamstrings, and erector spinae.'
      },
      {
        name: 'Barbell Back Squat (Low/High Bar)',
        cue: 'Deep diaphragmatic brace, drive through the floor, lead with chest out of the hole.',
        repsRecommendation: '4 sets of 6-8 reps',
        focus: 'Quadriceps, glutes, adductors, and spinal stabilizers.'
      },
      {
        name: 'Strict Overhead Barbell Press',
        cue: 'Squeeze glutes and quads; clear head back, press vertically, tuck head forward at lockout.',
        repsRecommendation: '4 sets of 6-8 reps',
        focus: 'Anterior deltoids, triceps, upper chest, and core stability.'
      },
      {
        name: 'Romanian Deadlift (RDL)',
        cue: 'Push hips backward towards the wall behind you until deep hamstring stretch.',
        repsRecommendation: '3 sets of 8-10 reps with 3-sec eccentric',
        focus: 'Hamstring hypertrophy and eccentric hip control.'
      }
    ],
    formTips: [
      'Mind-Muscle Connection: Consciously recruit target muscles during peak contraction and control the negative eccentric (2-3 seconds).',
      'Intra-Abdominal Pressure: Practice the Valsalva maneuver by inhaling 360 degrees into your belt before starting heavy compound reps.',
      'Progressive Overload: Aim to add 1 rep or +1.25kg to +2.5kg each week rather than sacrificing textbook execution for ego lifting.'
    ],
    drills: [
      { id: 'musc-1', name: 'Hip Hinge PVC Pipe Alignment Drill', reps: '3 sets x 15 reps', level: 'Beginner', note: 'Maintain 3 points of contact: head, upper back, sacrum.' },
      { id: 'musc-2', name: 'Paused Squat at Depth (3-Second Pause)', reps: '4 sets x 5 reps @ 65% 1RM', level: 'Intermediate', note: 'Build explosive reversal strength and eliminate bounce reliance.' },
      { id: 'musc-3', name: 'Deficit Romanian Deadlift with Slow Eccentric', reps: '3 sets x 8 reps', level: 'Intermediate', note: 'Focus on maximum hamstring stretch and neutral pelvic tilt.' },
      { id: 'musc-4', name: 'Compound Pyramid Protocol (Deadlift or Squat)', reps: '5 sets (12, 10, 8, 6, 4 reps)', level: 'Advanced', note: 'Rest 2.5 minutes between heavy sets.' }
    ]
  },
  {
    id: 'kickboxing',
    name: 'Kickboxing',
    subtitle: 'Dutch Style & K-1 Striking',
    category: 'Martial Arts & Striking',
    iconName: 'Flame',
    badge: 'Striking',
    accentColor: '#E50914',
    bgGradient: 'from-red-950/40 via-zinc-900 to-black',
    heroImage: 'https://images.unsplash.com/photo-1517438322307-e67111335449?q=80&w=600&auto=format&fit=crop',
    calorieBurnRate: 680,
    description: 'High-volume Dutch kickboxing combinations blending boxing punching volume with devastating low kicks and liver hooks.',
    equipment: ['16oz Boxing Gloves', 'Shin Guards', 'Hand Wraps', 'Mouthguard', 'Heavy Bag'],
    stances: [
      {
        name: 'Dutch High Guard Stance',
        description: 'Hands glued to temples, elbows tucked close to ribcage, chin tucked down into chest collarbone.',
        mechanics: 'Slightly more square-on than boxing to allow instant checking of incoming low kicks with both lead and rear shins.',
        mistakeToAvoid: 'Dropping hands when throwing punches or crossing legs while advancing.'
      },
      {
        name: 'Weight Distribution (50/50)',
        description: 'Center of gravity evenly balanced between both balls of feet; knees soft and spring-loaded.',
        mechanics: 'Allows immediate transition between punching combinations and explosive kicks without telegraphing weight shifts.',
        mistakeToAvoid: 'Leaning weight heavily on front leg, which makes it easy prey for chopping low kicks.'
      }
    ],
    techniques: [
      {
        name: 'The Dutch 1-2-Hook-Low Kick Combo',
        cue: 'Jab, cross, lead shovel hook to liver, followed by stepping outside for rear low kick.',
        repsRecommendation: '5 rounds x 3 minutes on bag or pads',
        focus: 'Hands set up the legs; turn hips over fully on low kick.'
      },
      {
        name: 'Lead Check to Cross Counter',
        cue: 'Raise lead shin 45 degrees outward to shield kick, return foot down immediately, fire rear straight.',
        repsRecommendation: '4 sets x 20 reps alternating',
        focus: 'Defensive integrity and immediate retaliation timing.'
      },
      {
        name: 'Liver Hook (Body Shot)',
        cue: 'Dip weight slightly to the left, pivot lead foot 45 degrees, dig shovel hook upward into lower right ribs.',
        repsRecommendation: '50 reps on heavy bag focusing on torque',
        focus: 'Liver knockout shot; generate power from ankle and hip pivot.'
      }
    ],
    formTips: [
      'Turn the hip over completely on the low kick: aim the dense shin bone, not the foot or ankle.',
      'Keep the non-punching hand glued to your cheekbone for defensive guard at all times.',
      'Exhale sharply (kiai or sharp hiss) with every strike to brace core and conserve cardiovascular stamina.'
    ],
    drills: [
      { id: 'kb-1', name: 'Shadowboxing: Footwork & High Guard Reset', reps: '3 rounds x 3 mins (1 min rest)', level: 'Beginner', note: 'Every combination must finish with a high guard reset and angle cut.' },
      { id: 'kb-2', name: 'Low Kick Shin Conditioning & Speed Drill', reps: '100 kicks per leg (sets of 10)', level: 'Intermediate', note: 'Turn the hip over like chopping wood with an axe.' },
      { id: 'kb-3', name: 'Ernesto Hoost Heavy Bag Dutch Flow', reps: '5 rounds x 3 mins', level: 'Advanced', note: 'Jab -> Cross -> Lead Body Hook -> Rear Low Kick -> Lead Switch Knee.' }
    ]
  },
  {
    id: 'muaythai',
    name: 'Muay Thai',
    subtitle: 'The Art of Eight Limbs',
    category: 'Martial Arts & Striking',
    iconName: 'Shield',
    badge: 'Art of 8 Limbs',
    accentColor: '#E50914',
    bgGradient: 'from-amber-950/40 via-zinc-900 to-black',
    heroImage: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=600&auto=format&fit=crop',
    calorieBurnRate: 720,
    description: 'Traditional Thai combat discipline utilizing fists, elbows, knees, and shins combined with neck wrestling (clinch work).',
    equipment: ['Muay Thai Shorts', 'Fairtex/Twins Gloves', 'Thai Shin Guards', 'Heavy Bag'],
    stances: [
      {
        name: 'Traditional Thai Stance (Tep Phon)',
        description: 'Tall, upright spine posture, hips square, lead foot lightly tapping the mat on ball of foot.',
        mechanics: 'Allows instant front push kick (teep) or high knee shield. Hands held at eye level with palms facing out.',
        mistakeToAvoid: 'Crouching forward like an American boxer; exposes head to upward elbows and head kicks.'
      },
      {
        name: 'Thai Clinch Frame (Plum)',
        description: 'Forearms squeezed together on opponent crown/neck, elbows pulled tight into opponent chest collarbone.',
        mechanics: 'Use leverage of forearms and neck control to steer opponent head downward into rising spears of knees.',
        mistakeToAvoid: 'Interlocking fingers (can get broken); instead cup one palm over the back of the other hand.'
      }
    ],
    techniques: [
      {
        name: 'The Teep (Lead Foot Push Kick)',
        cue: 'Raise knee high to chest, extend ball of foot like a piston into opponent solar plexus or hip.',
        repsRecommendation: '100 teeps daily for range dominance',
        focus: 'The jab of Muay Thai; breaks opponent forward momentum.'
      },
      {
        name: 'Horizontal & Downward Slicing Elbows',
        cue: 'Step forward 45 degrees, whip elbow across jawline like slicing bread; cover chin with opposite shoulder.',
        repsRecommendation: '3 sets of 30 reps per arm',
        focus: 'Short-range lacerating cuts in close pocket or out of clinch.'
      },
      {
        name: 'Switch Kick (Dteh Chiang)',
        cue: 'Hop-swap feet position in place, explode off rear ball of foot, whip whole body around like a baseball bat.',
        repsRecommendation: '50 switch kicks on heavy bag',
        focus: 'Fast liver strike without stepping forward first.'
      }
    ],
    formTips: [
      'Swing the same-side arm downward violently when kicking to generate counter-rotational torque.',
      'Rise up onto the tiptoes of your plant foot as you kick to maximize reach and rotation angle.',
      'Control your breathing rhythm (saying "Owee" or sharp exhalation on impact) to stay relaxed.'
    ],
    drills: [
      { id: 'mt-1', name: 'Teep Rhythm & Heavy Bag Distance Control', reps: '4 rounds x 3 mins', level: 'Beginner', note: 'Push the bag away at full extension, catch it on the backswing.' },
      { id: 'mt-2', name: 'Continuous Switch Kick Speed Burnout', reps: '50 rapid-fire kicks per leg', level: 'Intermediate', note: 'Immediate recoil and ground contact bounce.' },
      { id: 'mt-3', name: 'Clinch Knee & Turn Drill with Partner or Bag', reps: '10 mins nonstop clinch wrestling', level: 'Advanced', note: 'Maintain plum grip, off-balance opponent with side pull, drive spear knee.' }
    ]
  },
  {
    id: 'taekwondo',
    name: 'Taekwondo',
    subtitle: 'Dynamic Kicks & Agility',
    category: 'Martial Arts & Kicking',
    iconName: 'Zap',
    badge: 'High Kicks',
    accentColor: '#E50914',
    bgGradient: 'from-blue-950/40 via-zinc-900 to-black',
    heroImage: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=600&auto=format&fit=crop',
    calorieBurnRate: 650,
    description: 'Fast, high-flying Olympic style sparring (Kyorugi) and traditional poomsae focusing on lightning-quick chambered kicks.',
    equipment: ['Dobok (Uniform)', 'Chest Protector (Hogu)', 'Kicking Paddles', 'Forearm/Shin Guards'],
    stances: [
      {
        name: 'Ap Seogi & Ap Koobi (Walking & Front Stance)',
        description: 'Ap Koobi has front knee bent over ankle, rear leg straight, weight 70% front / 30% rear.',
        mechanics: 'Provides solid linear grounding for punches, low blocks, and front leg drive.',
        mistakeToAvoid: 'Allowing the rear heel to peel off the mat or tilting pelvis sideways.'
      },
      {
        name: 'Gyeorugi Seogi (Bouncing Sparring Stance)',
        description: 'Light, sideways athletic stance with light bouncing on balls of feet, hands guarding chest.',
        mechanics: 'Enables rapid forward slide, back-step cut kick, or instant spin kick execution.',
        mistakeToAvoid: 'Flat-footed stance that delays reaction time to incoming blitzes.'
      }
    ],
    techniques: [
      {
        name: 'Dollyo Chagi (Turning Roundhouse Kick)',
        cue: 'Chamber knee directly forward, pivot standing foot 180 degrees, whip shin/instep across target.',
        repsRecommendation: '5 sets x 15 reps per leg on target paddle',
        focus: 'Chamber, pivot, snap, re-chamber, land.'
      },
      {
        name: 'Dwi Chagi (Back Thrust Kick)',
        cue: 'Look over rear shoulder, bring heel directly past your knee, thrust rear heel straight into solar plexus.',
        repsRecommendation: '40 kicks per leg',
        focus: 'Linear counter-strike that stops opponent charging forward.'
      },
      {
        name: 'Naeryeo Chagi (Axe Kick)',
        cue: 'Swing leg straight up outside or inside opponent guard, pull heel violently downward onto crown/collarbone.',
        repsRecommendation: '3 sets x 10 reps',
        focus: 'Flexibility and hamstring pull velocity.'
      }
    ],
    formTips: [
      'The secret to high kicks is standing foot pivot: pivot 180 degrees to open your hip joint safely.',
      'Re-chamber the kick before setting foot down; never let your kicking leg drop dead to the floor.',
      'Dynamic flexibility (leg swings, hip adductor stretches) prevents groin and hip impingement.'
    ],
    drills: [
      { id: 'tkd-1', name: 'Wall Support Chamber & Slow Extension Drill', reps: '3 sets x 10 holds (5s each)', level: 'Beginner', note: 'Develop gluteus medius balance and hip isometric strength.' },
      { id: 'tkd-2', name: 'Double Roundhouse (Low-High) Paddle Kick', reps: '5 sets x 10 combos per leg', level: 'Intermediate', note: 'Without putting foot down between bottom and top kick.' },
      { id: 'tkd-3', name: '360 Tornado Kick & Spin Back Kick Drills', reps: '30 attempts focusing on spotting target', level: 'Advanced', note: 'Head turns first to lock visual target before leg leaves ground.' }
    ]
  },
  {
    id: 'karate',
    name: 'Karate',
    subtitle: 'Precision, Kime & Kata',
    category: 'Traditional Martial Arts',
    iconName: 'Award',
    badge: 'Discipline',
    accentColor: '#E50914',
    bgGradient: 'from-zinc-950 via-zinc-900 to-black',
    heroImage: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=600&auto=format&fit=crop',
    calorieBurnRate: 600,
    description: 'Traditional Japanese budo emphasizing focus (Kime), deep grounded stances, explosive straight punching (Gyaku-Zuki), and kata precision.',
    equipment: ['Karate Gi', 'Belt', 'Makiwara / Punching Pad', 'Focus Mitts'],
    stances: [
      {
        name: 'Zenkutsu Dachi (Forward Stance)',
        description: 'Long, deep stance: 60% weight on front bent leg (shin vertical), rear leg fully locked straight.',
        mechanics: 'Rear foot turned out 30-45 degrees, hips squared forward to drive direct kinetic energy into strikes.',
        mistakeToAvoid: 'Narrowing feet into a tightrope line; feet must remain shoulder-width apart.'
      },
      {
        name: 'Kiba Dachi (Horse Riding Stance)',
        description: 'Wide parallel feet, toes pointing dead forward, knees pushed outward over toes, pelvis tucked.',
        mechanics: 'Builds immense hip and adductor stability; strengthens roots for side snap kicks and blocks.',
        mistakeToAvoid: 'Allowing toes to flare outward or letting knees collapse inward.'
      }
    ],
    techniques: [
      {
        name: 'Gyaku Zuki (Reverse Straight Punch)',
        cue: 'Fire from hip chamber (hikite); rotate fist 180 degrees right before impact point with explosive Kime.',
        repsRecommendation: '100 punches per arm focusing on hip drive',
        focus: 'Maximum focus of muscular tension at the instant of impact.'
      },
      {
        name: 'Mae Geri Keage (Front Snap Kick)',
        cue: 'Raise knee tight to chest, snap ball of foot forward into ribs/chin, snap back instantly to chamber.',
        repsRecommendation: '50 kicks per leg',
        focus: 'Toe pull back to strike with koshi (ball of the foot).'
      },
      {
        name: 'Age Uke to Gyaku Zuki (Rising Block & Counter)',
        cue: 'Forearm blocks upward at 45 degrees over forehead; immediately counter with rear reverse punch.',
        repsRecommendation: '3 sets x 20 reps',
        focus: 'Classic block-and-strike simultaneous transition.'
      }
    ],
    formTips: [
      'Hikite (pulling hand): Squeeze the opposite fist back tightly to your floating ribs to double punch power.',
      'Kime (focus): Stay relaxed during travel; tense all core, lat, and forearm muscles for 0.1 second at impact.',
      'Rooting: Push down into the tatami with your big toes and arches to anchor recoil.'
    ],
    drills: [
      { id: 'kt-1', name: 'Zenkutsu Dachi Stepping & Hikite Basics', reps: '50 steps forward and backward', level: 'Beginner', note: 'Keep head height completely level without bobbing up and down.' },
      { id: 'kt-2', name: 'Kiba Dachi 3-Minute Isometric Wall Sit/Stance Hold', reps: '3 sets of 2 mins hold', level: 'Intermediate', note: 'Keep thighs parallel to the ground with deep abdominal breathing.' },
      { id: 'kt-3', name: 'Heian / Bassai Dai Kata Sequential Execution', reps: '5 full rounds with full Kime', level: 'Advanced', note: 'Pay special attention to transition pauses and rhythm changes.' }
    ]
  },
  {
    id: 'running',
    name: 'Running',
    subtitle: 'Endurance, 5K-Marathon & Trail',
    category: 'Endurance & Cardio',
    iconName: 'Activity',
    badge: 'Cardio',
    accentColor: '#E50914',
    bgGradient: 'from-orange-950/40 via-zinc-900 to-black',
    heroImage: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?q=80&w=600&auto=format&fit=crop',
    calorieBurnRate: 650,
    description: 'Optimize running biomechanics, cadence (170-185 SPM), aerobic base conditioning, threshold pacing, and trail resilience.',
    equipment: ['Running Shoes', 'GPS Watch / Phone', 'Hydration Vest', 'Technical Apparel'],
    stances: [
      {
        name: 'Forward Lean from the Ankles',
        description: 'Slight forward lean of 3-5 degrees originating entirely from ankles (not bending at the waist).',
        mechanics: 'Harnesses gravity to pull you forward naturally with zero unnecessary braking force.',
        mistakeToAvoid: 'Bending forward at the waist or leaning backward behind hips.'
      },
      {
        name: 'Midfoot Landing Beneath Center of Mass',
        description: 'Landing with flat midfoot directly under your hips, rather than out in front with locked knee.',
        mechanics: 'Eliminates heel-strike braking forces; preserves meniscus and Achilles tendon elasticity.',
        mistakeToAvoid: 'Overstriding with heel striking far in front of your pelvis.'
      }
    ],
    techniques: [
      {
        name: 'Cadence Optimization (175-180 SPM)',
        cue: 'Take shorter, lighter, quicker steps like running over hot coals.',
        repsRecommendation: 'Run with 175-180 BPM metronome for 10-minute intervals',
        focus: 'Reduces ground contact time and lower extremity impact stress.'
      },
      {
        name: 'Compact Arm Carriage',
        cue: 'Elbows bent at 90 degrees, hands relaxed like holding potato chips, swing front-to-back.',
        repsRecommendation: 'Check arm swing every kilometer',
        focus: 'Prevents rotational torque wasting energy through your core.'
      },
      {
        name: 'Zone 2 Conversational Base Building',
        cue: 'Run at a pace where you could comfortably speak a full paragraph without gasping.',
        repsRecommendation: '45-75 minutes continuous',
        focus: 'Mitochondrial density and fat oxidation capacity.'
      }
    ],
    formTips: [
      'Keep gaze 15-20 meters ahead on the path rather than staring directly down at your shoe laces.',
      'Breathe rhythmically in a 3:3 or 2:2 footstep cadence to sync diaphragm with stride.',
      'Strength train calves, tibialis anterior, and glute medius to bulletproof shins against splints.'
    ],
    drills: [
      { id: 'run-1', name: 'A-Skips, B-Skips & High Knee Piston Drills', reps: '3 sets x 30m each', level: 'Beginner', note: 'Emphasize sharp dorsiflexion of the ankle and posture tall.' },
      { id: 'run-2', name: 'Strides: 100m Controlled Accelerations', reps: '6 x 100m @ 90% speed with walk back', level: 'Intermediate', note: 'Focus on tall posture, high turnover, and effortless relaxation.' },
      { id: 'run-3', name: 'Norwegian 4x4 VO2max Interval Protocol', reps: '4 x 4 mins @ 90-95% Max HR (3 min easy jog rest)', level: 'Advanced', note: 'Gold standard for boosting aerobic engine and race pace ceiling.' }
    ]
  },
  {
    id: 'cycling',
    name: 'Cycling',
    subtitle: 'Road, Gravel & Sprint Cycling',
    category: 'Endurance & Cardio',
    iconName: 'Compass',
    badge: 'Speed',
    accentColor: '#E50914',
    bgGradient: 'from-emerald-950/40 via-zinc-900 to-black',
    heroImage: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?q=80&w=600&auto=format&fit=crop',
    calorieBurnRate: 600,
    description: 'Elevate Functional Threshold Power (FTP), smooth circular pedal stroke ergonomics, aerodynamic tucks, and group paceline drafting.',
    equipment: ['Road/Gravel Bike', 'Cycling Helmet', 'Clipless Shoes & Pedals', 'Padded Bib Shorts'],
    stances: [
      {
        name: 'The Aerodynamic Hoods Position',
        description: 'Hands on brake hoods, elbows bent 90 degrees, flat horizontal back, relaxed shoulders.',
        mechanics: 'Reduces frontal aerodynamic drag by up to 30% compared to upright riding on the tops.',
        mistakeToAvoid: 'Locking elbows straight or hunching shoulders up into the neck.'
      },
      {
        name: 'Drops Position for Cornering & Sprints',
        description: 'Hands deep in the handlebar hooks with one finger resting on the brake lever.',
        mechanics: 'Lowers center of gravity for maximum bike stability when descending and cornering at 50+ km/h.',
        mistakeToAvoid: 'Gripping handlebars with white knuckles; maintain relaxed wrist flexibility.'
      }
    ],
    techniques: [
      {
        name: 'Circular Pedal Stroke (Scraping Mud)',
        cue: 'Push over top (12 o clock), drive down, scrape mud off the bottom (6 o clock), unweight foot on return.',
        repsRecommendation: 'Single-leg pedaling drill: 3 x 1 min per leg',
        focus: 'Eliminates dead spots in pedaling cycle and engages hamstrings.'
      },
      {
        name: 'Cadence Sweet Spot (85-95 RPM)',
        cue: 'Spin a lighter gear rather than grinding a heavy gear at low RPM.',
        repsRecommendation: 'Maintain 90 RPM on flat terrain',
        focus: 'Spares glycogen stores in leg muscles by offloading strain to cardiovascular system.'
      },
      {
        name: 'Out of Saddle Climbing Rock',
        cue: 'Shift up 1-2 gears, stand up with weight centered over bottom bracket, sway bike gently side-to-side.',
        repsRecommendation: '5 x 1-minute hill repeats',
        focus: 'Utilize body weight to overcome steep inclines without stalling.'
      }
    ],
    formTips: [
      'Bike Fit is King: Ensure saddle height allows 25-30 degree knee flexion at bottom of stroke to protect patella.',
      'Look through corners: Point your chin and inside knee toward the corner exit, leaning the bike beneath you.',
      'Fuel with 60-90g of carbohydrates per hour on rides exceeding 90 minutes to prevent bonking.'
    ],
    drills: [
      { id: 'cyc-1', name: 'High Cadence Spin-Ups (110-120 RPM)', reps: '5 x 1 min fast spin with 1 min recovery', level: 'Beginner', note: 'Smooth pedaling with zero hip rocking on the saddle.' },
      { id: 'cyc-2', name: 'Single-Leg Isolation Trainer Drill', reps: '3 sets x 90s per leg', level: 'Intermediate', note: 'Hear and feel a completely seamless whirring sound.' },
      { id: 'cyc-3', name: 'Sweet-Spot Threshold Intervals (2x15 mins)', reps: '2 x 15 mins @ 88-93% FTP (5 min rest)', level: 'Advanced', note: 'Greatest stimulus for raising hour power and climbing stamina.' }
    ]
  },
  {
    id: 'surf',
    name: 'Surf',
    subtitle: 'Wave Riding & Ocean Awareness',
    category: 'Water Sports & Balance',
    iconName: 'Waves',
    badge: 'Ocean & Board',
    accentColor: '#E50914',
    bgGradient: 'from-cyan-950/40 via-zinc-900 to-black',
    heroImage: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?q=80&w=600&auto=format&fit=crop',
    calorieBurnRate: 550,
    description: 'Master efficient paddling, explosive two-stage pop-up mechanics, reading wave breaks, bottom turns, and fluid rail-to-rail transitions.',
    equipment: ['Surfboard', 'Leash', 'Wetsuit / Rashguard', 'Surf Wax'],
    stances: [
      {
        name: 'Low Athletic Compression Stance',
        description: 'Feet shoulder-width apart, knees bent inward (cross-legged athletic squat), chest facing forward.',
        mechanics: 'Rear foot directly over the fins for steering control; front foot centered over the stringer.',
        mistakeToAvoid: 'The "Poo Stance" (knees splayed wide out and butt sticking back), which kills rail maneuverability.'
      },
      {
        name: 'Prone Paddling Arch (Cobra Pose)',
        description: 'Lying centered on the stringer, ribs lifted off the deck, chin held high, feet together.',
        mechanics: 'Centers weight sweet spot so nose does not pearl (dive underwater) nor drag excessive tail rocker.',
        mistakeToAvoid: 'Lying too far back on tail (drags water) or too far forward (nosedives on takeoff).'
      }
    ],
    techniques: [
      {
        name: 'The Explosive Pop-Up (Snap to Feet)',
        cue: 'Hands flat under lower ribs, explode hips upward in one fluid motion, slide feet beneath center of gravity.',
        repsRecommendation: '25 dry-land pop-up repetitions daily on yoga mat',
        focus: 'Zero hesitation; land both feet simultaneously without using knees.'
      },
      {
        name: 'The Deep Bottom Turn',
        cue: 'Compress into bottom of wave face, drop leading shoulder, dig inside rail with commitment.',
        repsRecommendation: 'Practice visualizing and carving on a surf-skate',
        focus: 'The foundational turn that converts drop speed into vertical propulsion.'
      },
      {
        name: 'Duck Diving Wave Sets',
        cue: 'Push nose down deep beneath white-water crest; drive rear foot onto tail traction pad to submerge board.',
        repsRecommendation: 'Practice in calm water or swimming pool first',
        focus: 'Puncturing beneath heavy breaking sets to reach the lineup clean.'
      }
    ],
    formTips: [
      'Where your head and eyes go, the surfboard follows: never look down at your feet or board nose.',
      'Paddle with deep, full s-stroke arm pulls deep under the board rather than shallow slapping on the surface.',
      'Respect ocean lineup etiquette: surfer closest to the breaking peak has immediate right of way.'
    ],
    drills: [
      { id: 'surf-1', name: 'Dry-Land Precision Pop-Up on Tape Line', reps: '3 sets x 15 reps', level: 'Beginner', note: 'Mark stringer line with tape; feet must land centered across the line in athletic crouch.' },
      { id: 'surf-2', name: 'Deep Breath-Hold & Apnea Survival Intervals', reps: '4 x 45-second controlled breath holds', level: 'Intermediate', note: 'Build mental calmness under simulated wave hold-downs.' },
      { id: 'surf-3', name: 'Surf-Skate Carving & Rail Transition Simulation', reps: '20 minutes bowl or flat carving', level: 'Advanced', note: 'Lead with head, rotate shoulders, pump through lower body compression.' }
    ]
  }
];
