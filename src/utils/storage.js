// LocalStorage State Management & Initial Mock Data Seeder

const STORAGE_KEYS = {
  USER: 'apex_user_profile',
  HYDRATION: 'apex_hydration_data',
  CALORIES: 'apex_consumed_nutrition',
  DRILLS: 'apex_completed_drills',
  SUPPLEMENTS: 'apex_supplements_status',
  REMINDERS: 'apex_smart_reminders',
  NEXT_SESSION: 'apex_next_training_session',
  COMMUNITY_MESSAGES: 'apex_community_messages',
  COMMUNITY_RSVP: 'apex_community_rsvps',
  COACH_CHAT: 'apex_coach_chat_history',
  MEAL_SWAPS: 'apex_meal_swaps_selection'
};

// Initial default user profile
export const DEFAULT_USER = {
  id: 'usr_athlete_1',
  name: 'Alexandre R.',
  sports: ['kickboxing', 'musculation'],
  heightCm: 182,
  weightKg: 78,
  fitnessGoal: 'Muscle Gain', // 'Muscle Gain' | 'Fat Loss' | 'Endurance' | 'Technique Mastery'
  experienceLevel: 'Intermediate',
  streakDays: 14,
  hasCompletedOnboarding: true,
  dailyWaterGoalMl: 3200,
  waterConsumedMl: 1750,
  consumedCalories: 1840,
  consumedMacros: {
    protein: 135,
    carbs: 180,
    fats: 58
  }
};

// Default initial smart reminders (Supplements, Water Intake, Training Sessions)
export const DEFAULT_REMINDERS = [
  {
    id: 'rem-1',
    title: 'Morning Creatine & Electrolytes',
    time: '08:00',
    category: 'supplement',
    enabled: true,
    repeat: 'Daily'
  },
  {
    id: 'rem-2',
    title: 'Midday 500ml Hydration Surge',
    time: '12:00',
    category: 'water',
    enabled: true,
    repeat: 'Daily'
  },
  {
    id: 'rem-3',
    title: 'Pre-Workout Snack & Amino Priming',
    time: '16:30',
    category: 'supplement',
    enabled: true,
    repeat: 'Mon, Wed, Fri'
  },
  {
    id: 'rem-4',
    title: 'Dutch Kickboxing & Sparring Session',
    time: '18:00',
    category: 'training',
    enabled: true,
    repeat: 'Today'
  },
  {
    id: 'rem-5',
    title: 'Nighttime Magnesium & Sleep Protocol',
    time: '22:15',
    category: 'supplement',
    enabled: true,
    repeat: 'Daily'
  }
];

// Default next training session
export const DEFAULT_NEXT_SESSION = {
  title: 'Kickboxing Dutch Drills & Heavy Bag',
  sport: 'Kickboxing',
  scheduledTime: new Date(Date.now() + 2 * 3600 * 1000 + 45 * 60 * 1000).toISOString(), // 2h 45m from now
  location: 'Apex Gym - Ring B',
  durationMins: 60
};

// Storage helper methods
export const storage = {
  getUser: () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.USER);
      return saved ? JSON.parse(saved) : DEFAULT_USER;
    } catch (e) {
      return DEFAULT_USER;
    }
  },
  saveUser: (user) => {
    try {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    } catch (e) {}
  },

  getWater: () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.HYDRATION);
      if (saved) {
        const parsed = JSON.parse(saved);
        const today = new Date().toDateString();
        if (parsed.date === today) {
          return parsed.amount;
        }
      }
      return 1750; // default for demo
    } catch (e) {
      return 1750;
    }
  },
  saveWater: (amount) => {
    try {
      localStorage.setItem(
        STORAGE_KEYS.HYDRATION,
        JSON.stringify({ date: new Date().toDateString(), amount })
      );
    } catch (e) {}
  },

  getConsumedNutrition: () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CALORIES);
      return saved ? JSON.parse(saved) : { calories: 1840, protein: 135, carbs: 180, fats: 58 };
    } catch (e) {
      return { calories: 1840, protein: 135, carbs: 180, fats: 58 };
    }
  },
  saveConsumedNutrition: (data) => {
    try {
      localStorage.setItem(STORAGE_KEYS.CALORIES, JSON.stringify(data));
    } catch (e) {}
  },

  getCompletedDrills: () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.DRILLS);
      return saved ? JSON.parse(saved) : { 'kb-1': true, 'musc-1': true };
    } catch (e) {
      return { 'kb-1': true, 'musc-1': true };
    }
  },
  saveCompletedDrills: (drills) => {
    try {
      localStorage.setItem(STORAGE_KEYS.DRILLS, JSON.stringify(drills));
    } catch (e) {}
  },

  getSupplementsStatus: () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SUPPLEMENTS);
      return saved ? JSON.parse(saved) : { 'supp-1': true, 'supp-4': true };
    } catch (e) {
      return { 'supp-1': true, 'supp-4': true };
    }
  },
  saveSupplementsStatus: (status) => {
    try {
      localStorage.setItem(STORAGE_KEYS.SUPPLEMENTS, JSON.stringify(status));
    } catch (e) {}
  },

  getReminders: () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.REMINDERS);
      return saved ? JSON.parse(saved) : DEFAULT_REMINDERS;
    } catch (e) {
      return DEFAULT_REMINDERS;
    }
  },
  saveReminders: (reminders) => {
    try {
      localStorage.setItem(STORAGE_KEYS.REMINDERS, JSON.stringify(reminders));
    } catch (e) {}
  },

  getNextSession: () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.NEXT_SESSION);
      return saved ? JSON.parse(saved) : DEFAULT_NEXT_SESSION;
    } catch (e) {
      return DEFAULT_NEXT_SESSION;
    }
  },
  saveNextSession: (session) => {
    try {
      localStorage.setItem(STORAGE_KEYS.NEXT_SESSION, JSON.stringify(session));
    } catch (e) {}
  },

  getCommunityMessages: () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.COMMUNITY_MESSAGES);
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  },
  saveCommunityMessages: (messagesByChannel) => {
    try {
      localStorage.setItem(STORAGE_KEYS.COMMUNITY_MESSAGES, JSON.stringify(messagesByChannel));
    } catch (e) {}
  },

  getCommunityRsvps: () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.COMMUNITY_RSVP);
      return saved ? JSON.parse(saved) : { 'fight-m1': true, 'run-m2': true, 'surf-m1': true };
    } catch (e) {
      return { 'fight-m1': true, 'run-m2': true, 'surf-m1': true };
    }
  },
  saveCommunityRsvps: (rsvps) => {
    try {
      localStorage.setItem(STORAGE_KEYS.COMMUNITY_RSVP, JSON.stringify(rsvps));
    } catch (e) {}
  },

  getCoachChat: () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.COACH_CHAT);
      return saved ? JSON.parse(saved) : [
        {
          id: 'init-1',
          sender: 'coach',
          time: 'Just now',
          text: 'Welcome to APEX! I am your AI Coach. I have calibrated your targets based on your profile. How is your body feeling today? Pick a quick chip or ask me anything!'
        }
      ];
    } catch (e) {
      return [];
    }
  },
  saveCoachChat: (messages) => {
    try {
      localStorage.setItem(STORAGE_KEYS.COACH_CHAT, JSON.stringify(messages));
    } catch (e) {}
  },

  getMealSwaps: () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.MEAL_SWAPS);
      return saved ? JSON.parse(saved) : { breakfast: 0, lunch: 0, dinner: 0, snack: 0 };
    } catch (e) {
      return { breakfast: 0, lunch: 0, dinner: 0, snack: 0 };
    }
  },
  saveMealSwaps: (swaps) => {
    try {
      localStorage.setItem(STORAGE_KEYS.MEAL_SWAPS, JSON.stringify(swaps));
    } catch (e) {}
  }
};
