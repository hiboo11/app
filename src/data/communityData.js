// Community Channels, Group Sessions & Activity Feeds

export const COMMUNITY_CHANNELS = [
  {
    id: 'running',
    name: 'Running (Courses)',
    badge: '🏃 5K-Marathon & Trail',
    icon: 'Activity',
    color: '#E50914',
    description: 'Pacing strategies, marathon prep, interval splits, shoe rotation, and group runs.',
    meetups: [
      {
        id: 'run-m1',
        title: 'Morning 5K Sunrise Recovery Jog',
        date: 'Tomorrow, 06:45 AM',
        location: 'Parc des Buttes-Chaumont / River Path',
        host: 'Marc V. (Marathon Pacer)',
        pace: '5:45 min/km (Conversational Zone 2)',
        attendees: 14,
        maxSpots: 25,
        isJoined: false,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop'
      },
      {
        id: 'run-m2',
        title: 'Threshold Interval Track Session (8x800m)',
        date: 'Saturday, 09:00 AM',
        location: 'Municipal Athletic Stadium Track',
        host: 'Sarah B. (Track Coach)',
        pace: 'Sub-4:15 min/km splits with 200m jog recovery',
        attendees: 9,
        maxSpots: 16,
        isJoined: true,
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=150&auto=format&fit=crop'
      }
    ],
    initialMessages: [
      {
        id: 'msg-run-1',
        user: 'Thomas D.',
        badge: 'Sub-3h Marathoner',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop',
        time: '25m ago',
        content: 'Just wrapped up a 18km long run in Zone 2 with 3x2km progressive pickups at the end. Hydrated with 750ml electrolyte mix. Cadence stayed steady at 178 SPM!',
        likes: 12,
        fires: 8,
        userReaction: null
      },
      {
        id: 'msg-run-2',
        user: 'Camille R.',
        badge: 'Trail Enthusiast',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop',
        time: '1h ago',
        content: 'Anyone tested carbon-plated shoes for hilly half marathons? Debating between Nike Vaporfly and Saucony Endorphin Pro 4 for next month.',
        likes: 6,
        fires: 4,
        userReaction: 'fire'
      }
    ]
  },
  {
    id: 'cycling',
    name: 'Cycling (Vélo)',
    badge: '🚴 Road, Gravel & Sprint',
    icon: 'Compass',
    color: '#E50914',
    description: 'Peloton drafting, FTP training intervals, gravel adventures, bike nutrition, and gear setup.',
    meetups: [
      {
        id: 'cyc-m1',
        title: 'Weekend 80km Coastline Gran Fondo',
        date: 'Sunday, 08:00 AM',
        location: 'Central Plaza -> Coastal Ridge & Return',
        host: 'Antoine G. (Cat 2 Racer)',
        pace: '28-30 km/h average paceline with coffee stop',
        attendees: 18,
        maxSpots: 30,
        isJoined: false,
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop'
      },
      {
        id: 'cyc-m2',
        title: 'Gravel Hill Climbing & Switchbacks (45km)',
        date: 'Thursday, 06:00 PM',
        location: 'Forest Trailhead North Entrance',
        host: 'Julien M.',
        pace: '+850m elevation gain, technical dirt segments',
        attendees: 7,
        maxSpots: 12,
        isJoined: false,
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop'
      }
    ],
    initialMessages: [
      {
        id: 'msg-cyc-1',
        user: 'Maxime L.',
        badge: 'FTP 315W',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=150&auto=format&fit=crop',
        time: '40m ago',
        content: 'Crushed a 2x20 minute sweet-spot session at 270W on the smart trainer this morning. Carbed up with rice cakes + honey 45 mins prior. Zero power fade!',
        likes: 15,
        fires: 11,
        userReaction: null
      },
      {
        id: 'msg-cyc-2',
        user: 'Elena S.',
        badge: 'Gravel Rider',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop',
        time: '3h ago',
        content: 'Switched to tubeless 40mm tires at 2.4 bar. The grip on loose gravel descents is completely game-changing. Who is joining Sunday ride?',
        likes: 9,
        fires: 5,
        userReaction: 'heart'
      }
    ]
  },
  {
    id: 'surf',
    name: 'Surf',
    badge: '🏄 Swell, Dawn Patrol & Lineup',
    icon: 'Waves',
    color: '#E50914',
    description: 'Swell forecasting, wave reading, paddle endurance, pop-up mechanics, and surf trip tips.',
    meetups: [
      {
        id: 'surf-m1',
        title: 'Dawn Patrol Point Break Session (1.5m Swell)',
        date: 'Saturday, 06:30 AM',
        location: 'North Point Reef / Main Beach Access',
        host: 'Lucas "Koa" P. (Surf Instructor)',
        pace: 'Clean offshore glass, incoming high tide',
        attendees: 11,
        maxSpots: 15,
        isJoined: true,
        avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=150&auto=format&fit=crop'
      },
      {
        id: 'surf-m2',
        title: 'Sunset Longboard & Rail Carve Clinic',
        date: 'Wednesday, 06:15 PM',
        location: 'South Bay Sandy Peaking Beach',
        host: 'Chloe T.',
        pace: 'Mellow waist-to-chest waves for nose-riding',
        attendees: 8,
        maxSpots: 12,
        isJoined: false,
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=150&auto=format&fit=crop'
      }
    ],
    initialMessages: [
      {
        id: 'msg-surf-1',
        user: 'Romain B.',
        badge: 'Shortboarder',
        avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=150&auto=format&fit=crop',
        time: '15m ago',
        content: 'Morning report: offshore wind 6 knots, clean 1.3m peelers on the right reef! Wax your boards, tide is filling in nicely until 10:30.',
        likes: 19,
        fires: 14,
        userReaction: null
      },
      {
        id: 'msg-surf-2',
        user: 'Manon V.',
        badge: 'Ocean Lover',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop',
        time: '2h ago',
        content: 'Did the dry-land pop-up tape drill 30 times yesterday. Caught 8 waves cleanly this morning without a single knee catch! The hip snap is everything.',
        likes: 14,
        fires: 9,
        userReaction: 'fire'
      }
    ]
  },
  {
    id: 'martial_gym',
    name: 'Martial Arts & Gym',
    badge: '🥊 Sparring, Clinch & Heavy Iron',
    icon: 'Flame',
    color: '#E50914',
    description: 'Boxing, Kickboxing, Muay Thai sparring, Kyokushin conditioning, and heavy powerlifting PRs.',
    meetups: [
      {
        id: 'fight-m1',
        title: 'Dutch Kickboxing & Muay Thai Open Mat',
        date: 'Saturday, 11:00 AM',
        location: 'Apex Fight Club Mat 1 (Ring)',
        host: 'Coach Thorne (Head Striking Coach)',
        pace: 'Controlled technical sparring (16oz gloves + shin guards mandatory)',
        attendees: 16,
        maxSpots: 20,
        isJoined: true,
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop'
      },
      {
        id: 'fight-m2',
        title: 'Heavy Deadlift & Squat Mechanics Workshop',
        date: 'Sunday, 03:00 PM',
        location: 'Apex Performance Barbell Zone',
        host: 'Alex R. (Strength Coach)',
        pace: 'Video bar-path analysis + intra-abdominal bracing clinic',
        attendees: 10,
        maxSpots: 12,
        isJoined: false,
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop'
      }
    ],
    initialMessages: [
      {
        id: 'msg-fight-1',
        user: 'Kenzo T.',
        badge: 'Muay Thai Fighter',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=150&auto=format&fit=crop',
        time: '12m ago',
        content: 'Tip of the day: don’t drop your right hand when throwing the lead teep! Keep your right glove glued to your cheek so you don’t eat a counter overhand.',
        likes: 24,
        fires: 17,
        userReaction: null
      },
      {
        id: 'msg-fight-2',
        user: 'Gabriel D.',
        badge: 'Powerlifter (550kg Total)',
        avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=150&auto=format&fit=crop',
        time: '55m ago',
        content: 'Hit 210kg x 3 on conventional deadlift today! Pre-workout meal: 2 rice cakes with almond butter + 1 double espresso 40 mins prior. Zero lower back tightness thanks to cueing lats into back pockets.',
        likes: 18,
        fires: 15,
        userReaction: 'fire'
      }
    ]
  },
  {
    id: 'general',
    name: 'General & Motivation',
    badge: '💬 All Disciplines, Nutrition & Mindset',
    icon: 'MessageSquare',
    color: '#E50914',
    description: 'Daily motivation, sleep hacks, hydration milestones, supplement reviews, and personal bests.',
    meetups: [
      {
        id: 'gen-m1',
        title: 'Sunday Morning Ice Bath & Breathwork Circle',
        date: 'Sunday, 10:00 AM',
        location: 'Wellness Studio & Outdoor Pool Terrace',
        host: 'Dr. Claire Laurent',
        pace: 'Box breathing + 3 mins cold plunge at 6°C',
        attendees: 22,
        maxSpots: 25,
        isJoined: false,
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop'
      }
    ],
    initialMessages: [
      {
        id: 'msg-gen-1',
        user: 'Coach Kai',
        badge: 'Master Head Coach',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop',
        time: '5m ago',
        content: 'Remember: Discipline over motivation. Show up for your water target, execute your drills with precision, and fuel your body for performance. Let’s crush today!',
        likes: 38,
        fires: 31,
        userReaction: 'heart'
      },
      {
        id: 'msg-gen-2',
        user: 'Yasmine K.',
        badge: 'Triathlon & Kickboxing',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=150&auto=format&fit=crop',
        time: '1h ago',
        content: 'Already logged 2000ml of water and completed my morning kickboxing stance drills. This app makes tracking progress addicting! Keep moving everyone.',
        likes: 21,
        fires: 16,
        userReaction: null
      }
    ]
  }
];
