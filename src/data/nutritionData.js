// Personalized Nutrition Engine & Swappable Meal Catalog

// Calculate BMR using Mifflin-St Jeor and Goal/Sport factors
export function calculateNutritionTargets(user) {
  const weight = Number(user.weightKg) || 75;
  const height = Number(user.heightCm) || 178;
  const age = 27; // baseline athletic age

  // Mifflin-St Jeor formula
  const bmr = 10 * weight + 6.25 * height - 5 * age + 5;

  // Activity multipliers by primary sport
  const sportMultipliers = {
    musculation: 1.45,
    kickboxing: 1.6,
    muaythai: 1.65,
    taekwondo: 1.5,
    karate: 1.5,
    running: 1.65,
    cycling: 1.6,
    surf: 1.55
  };

  const primarySport = user.sports?.[0] || 'musculation';
  const multiplier = sportMultipliers[primarySport] || 1.5;
  let tdee = Math.round(bmr * multiplier);

  // Goal adjustment
  let calorieTarget = tdee;
  let proteinRatio = 2.0; // g per kg
  let fatRatio = 0.9;     // g per kg

  switch (user.fitnessGoal) {
    case 'Muscle Gain':
      calorieTarget = tdee + 350;
      proteinRatio = 2.2;
      fatRatio = 1.0;
      break;
    case 'Fat Loss':
      calorieTarget = Math.max(1500, tdee - 500);
      proteinRatio = 2.4; // higher protein to preserve lean muscle
      fatRatio = 0.8;
      break;
    case 'Endurance':
      calorieTarget = tdee + 250;
      proteinRatio = 1.6;
      fatRatio = 0.9;
      break;
    case 'Technique Mastery':
    default:
      calorieTarget = tdee;
      proteinRatio = 2.0;
      fatRatio = 0.9;
      break;
  }

  // Protein calculation (4 kcal / g)
  const proteinGrams = Math.round(weight * proteinRatio);
  const proteinKcal = proteinGrams * 4;

  // Fat calculation (9 kcal / g)
  const fatGrams = Math.round(weight * fatRatio);
  const fatKcal = fatGrams * 9;

  // Carbs fill the remainder (4 kcal / g)
  const remainingKcal = Math.max(400, calorieTarget - proteinKcal - fatKcal);
  const carbsGrams = Math.round(remainingKcal / 4);

  return {
    tdee,
    calories: calorieTarget,
    protein: proteinGrams,
    carbs: carbsGrams,
    fats: fatGrams
  };
}

// Swappable Meals Catalog
export const MEAL_SLOTS = [
  {
    slotId: 'breakfast',
    title: 'Breakfast / Déjeuner',
    time: '07:30 AM',
    options: [
      {
        id: 'b-1',
        name: 'Athletic High-Protein Power Oatmeal',
        calories: 580,
        protein: 42,
        carbs: 68,
        fats: 14,
        prepTime: '8 min',
        description: 'Rolled oats cooked in almond milk with 1 scoop vanilla whey isolate, wild blueberries, crushed walnuts, and cinnamon.',
        ingredients: ['70g Rolled Oats', '30g Whey Isolate', '80g Blueberries', '15g Walnuts', '200ml Almond Milk'],
        tags: ['High Protein', 'Slow Digestion Carbs', 'Clean Energy']
      },
      {
        id: 'b-2',
        name: 'Avocado & 4-Egg Scramble on Sourdough',
        calories: 610,
        protein: 38,
        carbs: 44,
        fats: 26,
        prepTime: '10 min',
        description: '3 whole eggs + 2 egg whites scrambled with spinach, served over toasted artisanal sourdough and 1/2 sliced Hass avocado.',
        ingredients: ['3 Whole Eggs', '2 Egg Whites', '2 Slices Sourdough', '1/2 Hass Avocado', 'Fresh Spinach'],
        tags: ['Healthy Fats', 'Bioavailable Choline', 'Gut Friendly']
      },
      {
        id: 'b-3',
        name: 'Greek Yogurt Superfruit Parfait',
        calories: 520,
        protein: 45,
        carbs: 58,
        fats: 10,
        prepTime: '5 min',
        description: '250g 0% Greek yogurt layered with organic granola, sliced bananas, chia seeds, and raw organic honey drizzle.',
        ingredients: ['250g Greek Yogurt', '40g Granola', '1 Banana', '10g Chia Seeds', '10g Raw Honey'],
        tags: ['Probiotic', 'Quick Prep', 'Lean Protein']
      }
    ]
  },
  {
    slotId: 'lunch',
    title: 'Lunch / Repas du Midi',
    time: '12:30 PM',
    options: [
      {
        id: 'l-1',
        name: 'Grilled Herb Chicken & Sweet Potato Bowl',
        calories: 680,
        protein: 54,
        carbs: 72,
        fats: 18,
        prepTime: '20 min',
        description: '200g rosemary-marinated grilled chicken breast paired with roasted sweet potato cubes, steamed broccoli, and cold-pressed olive oil.',
        ingredients: ['200g Chicken Breast', '250g Sweet Potatoes', '150g Broccoli florets', '10ml Extra Virgin Olive Oil'],
        tags: ['Lean Muscle', 'Micronutrient Dense', 'Low GI']
      },
      {
        id: 'l-2',
        name: 'Sesame Seared Salmon & Quinoa Pilaf',
        calories: 720,
        protein: 48,
        carbs: 64,
        fats: 28,
        prepTime: '15 min',
        description: 'Pan-seared Atlantic salmon fillet with toasted sesame seeds, served over fluffy tri-color quinoa and sautéed asparagus spears.',
        ingredients: ['180g Salmon Fillet', '80g Dry Quinoa (cooked)', '120g Asparagus', '1 tsp Sesame Oil', 'Soy Glaze'],
        tags: ['Omega-3 Rich', 'Joint Health', 'Complete Protein']
      },
      {
        id: 'l-3',
        name: 'Mediterranean Lean Beef & Jasmine Rice Bowl',
        calories: 710,
        protein: 52,
        carbs: 76,
        fats: 20,
        prepTime: '15 min',
        description: '180g 5% lean minced beef cooked with cumin, garlic and bell peppers, on a bed of fluffy jasmine rice with cucumber tzatziki.',
        ingredients: ['180g 5% Minced Beef', '90g Jasmine Rice', '1 Bell Pepper', '30g Tzatziki', 'Fresh Parsley'],
        tags: ['Creatine Rich', 'Iron & Zinc', 'Anabolic']
      }
    ]
  },
  {
    slotId: 'dinner',
    title: 'Dinner / Dîner Récupération',
    time: '07:30 PM',
    options: [
      {
        id: 'd-1',
        name: 'Spiced Turkey Breast & Roasted Butternut Squash',
        calories: 620,
        protein: 50,
        carbs: 58,
        fats: 16,
        prepTime: '25 min',
        description: 'Oven-roasted lean turkey breast tenders served with caramelized spiced squash, steamed green beans, and toasted pumpkin seeds.',
        ingredients: ['200g Turkey Breast', '300g Butternut Squash', '150g Green Beans', '15g Pumpkin Seeds'],
        tags: ['Tryptophan / Sleep Quality', 'Easy Digestion', 'High Protein']
      },
      {
        id: 'd-2',
        name: 'Pacific White Fish with Brown Rice & Avocado Salad',
        calories: 590,
        protein: 46,
        carbs: 60,
        fats: 18,
        prepTime: '18 min',
        description: 'Delicate baked cod or sea bass seasoned with paprika and fresh lime, accompanied by nutty brown rice and crisp avocado garden salad.',
        ingredients: ['220g Cod Fillet', '80g Brown Rice', '1/2 Avocado', 'Mixed Greens', 'Lime Vinaigrette'],
        tags: ['Anti-Inflammatory', 'Light & Clean', 'Cellular Repair']
      },
      {
        id: 'd-3',
        name: 'Tofu & Edamame High-Protein Stir-Fry',
        calories: 580,
        protein: 44,
        carbs: 62,
        fats: 17,
        prepTime: '15 min',
        description: 'Crispy pan-fried organic firm tofu with shelled edamame, bok choy, snap peas, and buckwheat soba noodles in ginger tamari sauce.',
        ingredients: ['200g Firm Tofu', '80g Edamame', '70g Soba Noodles', 'Baby Bok Choy', 'Ginger Tamari Sauce'],
        tags: ['Plant Power', 'Antioxidant', 'Fast Recovery']
      }
    ]
  },
  {
    slotId: 'snack',
    title: 'Pre/Post Workout Snack',
    time: '04:00 PM',
    options: [
      {
        id: 's-1',
        name: 'Rice Cakes with Almond Butter & Honey',
        calories: 340,
        protein: 10,
        carbs: 48,
        fats: 12,
        prepTime: '2 min',
        description: '3 organic brown rice cakes topped with creamy 100% almond butter, banana slices, and raw honey.',
        ingredients: ['3 Brown Rice Cakes', '25g Almond Butter', '1/2 Sliced Banana', '1 tsp Honey'],
        tags: ['Fast Glycogen', 'Pre-Workout Fuel']
      },
      {
        id: 's-2',
        name: 'Isolate Shake with Frozen Mixed Berries',
        calories: 310,
        protein: 36,
        carbs: 32,
        fats: 4,
        prepTime: '3 min',
        description: 'Blended whey or plant isolate with frozen strawberries, coconut water, and a scoop of glutamine.',
        ingredients: ['35g Protein Isolate', '120g Frozen Berries', '250ml Coconut Water', '5g L-Glutamine'],
        tags: ['Post-Workout', 'Rapid Absorption', 'Hydration']
      },
      {
        id: 's-3',
        name: 'High-Protein Cottage Cheese & Pineapple Bowl',
        calories: 280,
        protein: 32,
        carbs: 26,
        fats: 4,
        prepTime: '2 min',
        description: '200g low-fat cottage cheese paired with fresh diced pineapple rich in bromelain for digestive support.',
        ingredients: ['200g Cottage Cheese', '120g Fresh Pineapple', 'Sprinkle of Chia'],
        tags: ['Slow Release Casein', 'Anti-Inflammatory Enzyme']
      }
    ]
  }
];

// Daily Supplement Schedule
export const SUPPLEMENTS_CATALOG = [
  {
    id: 'supp-1',
    name: 'Creatine Monohydrate (Creapure)',
    timing: 'Morning or Post-Workout',
    dosage: '5g with water or fruit juice',
    benefits: 'Boosts phosphocreatine cellular ATP resynthesis, increases muscle power output, and enhances brain neuroprotection.',
    completed: false
  },
  {
    id: 'supp-2',
    name: 'Whey Protein Isolate',
    timing: 'Post-Workout / Recovery Window',
    dosage: '30g in 300ml cold water',
    benefits: 'Fast-acting essential amino acids (leucine rich) triggering muscle protein synthesis (mTOR).',
    completed: false
  },
  {
    id: 'supp-3',
    name: 'Electrolyte Mineral Complex',
    timing: 'During / Immediately After Training',
    dosage: '1 scoop (500mg Na, 200mg K, 60mg Mg)',
    benefits: 'Prevents cramping, restores osmotic hydration balance, and sustains neurological firing in long martial arts/cardio sessions.',
    completed: false
  },
  {
    id: 'supp-4',
    name: 'Omega-3 Fish Oil (EPA/DHA)',
    timing: 'With Lunch or Dinner',
    dosage: '2 softgels (1200mg EPA / 600mg DHA)',
    benefits: 'Reduces joint inflammation from heavy sparring and lifting, accelerates systemic muscle recovery.',
    completed: false
  },
  {
    id: 'supp-5',
    name: 'Magnesium Bisglycinate & Zinc',
    timing: '30-45 minutes before bedtime',
    dosage: '300mg Elemental Magnesium + 15mg Zinc',
    benefits: 'Regulates parasympathetic nervous system, promotes deep stage-3 slow-wave sleep, and aids testosterone synthesis.',
    completed: false
  }
];
