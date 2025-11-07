
export enum Screen {
    Dashboard = 'DASHBOARD',
    MealLog = 'MEAL_LOG',
    Camera = 'CAMERA',
    Planner = 'PLANNER',
    Profile = 'PROFILE',
}

export type OnboardingStep = 'splash' | 'welcome' | 'profileSetup' | 'features' | 'auth';

export enum Gender {
    Male = 'MALE',
    Female = 'FEMALE',
    Other = 'OTHER',
}

export enum Goal {
    WeightLoss = 'WEIGHT_LOSS',
    WeightGain = 'WEIGHT_GAIN',
    Maintain = 'MAINTAIN',
    BuildMuscle = 'BUILD_MUSCLE',
}

export enum ActivityLevel {
    Sedentary = 'SEDENTARY',
    LightlyActive = 'LIGHTLY_ACTIVE',
    ModeratelyActive = 'MODERATELY_ACTIVE',
    VeryActive = 'VERY_ACTIVE',
    ExtremelyActive = 'EXTREMELY_ACTIVE',
}

export interface UserProfile {
    name: string;
    age: number;
    gender: Gender;
    weight: number; // in kg
    height: number; // in cm
    goal: Goal;
    targetWeight: number;
    activityLevel: ActivityLevel;
    dailyCalorieTarget: number;
}

export interface FoodItem {
    name: string;
    quantity: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
}

export enum MealType {
    Breakfast = 'BREAKFAST',
    Lunch = 'LUNCH',
    Dinner = 'DINNER',
    Snack = 'SNACK',
}

export interface Meal {
    id: string;
    type: MealType;
    items: FoodItem[];
    totalCalories: number;
    photo?: string; // base64 string
    timestamp: Date;
}
