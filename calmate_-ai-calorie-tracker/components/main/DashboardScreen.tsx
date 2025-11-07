

import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { Meal, MealType } from '../../types';

const CircularProgress: React.FC<{
    progress: number;
    size: number;
    strokeWidth: number;
    calories: number;
    target: number;
}> = ({ progress, size, strokeWidth, calories, target }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (progress / 100) * circumference;

    return (
        <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
            <svg width={size} height={size} className="transform -rotate-90">
                 <defs>
                    <linearGradient id="progressGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="var(--accent)" />
                        <stop offset="100%" stopColor="var(--primary)" />
                    </linearGradient>
                </defs>
                <circle
                    stroke="#e6e6e6"
                    className="dark:stroke-gray-700"
                    fill="transparent"
                    strokeWidth={strokeWidth}
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                />
                <circle
                    stroke="url(#progressGradient)"
                    fill="transparent"
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                    className="transition-all duration-500 ease-in-out"
                />
            </svg>
            <div className="absolute flex flex-col items-center">
                <span className="text-4xl font-bold text-primary-light dark:text-primary-dark">{Math.round(calories)}</span>
                <span className="text-sm text-secondary-light dark:text-secondary-dark">kcal consumed</span>
                <span className="text-xs text-gray-400 mt-1">Target: {target}</span>
            </div>
        </div>
    );
};

const MacroBar: React.FC<{ label: string; value: number; total: number; color: string }> = ({ label, value, total, color }) => (
    <div>
        <div className="flex justify-between text-sm font-medium text-secondary-light dark:text-secondary-dark">
            <span>{label}</span>
            <span>{Math.round(value)}g</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mt-1">
            <div className={`${color} h-2.5 rounded-full`} style={{ width: `${(value / (total > 0 ? total : 1)) * 100}%` }}></div>
        </div>
    </div>
);

const MealCard: React.FC<{ meal: Meal }> = ({ meal }) => (
    <div className="flex items-center space-x-4 p-4 bg-card-light dark:bg-card-dark rounded-2xl shadow-sm">
        <img src={meal.photo} alt={meal.items[0].name} className="w-20 h-20 rounded-xl object-cover" />
        <div className="flex-1">
            <p className="font-bold text-lg text-primary-light dark:text-primary-dark capitalize">{meal.type.toLowerCase().replace('_', ' ')}</p>
            <p className="text-sm text-secondary-light dark:text-secondary-dark">{meal.items.map(i => i.name).join(', ')}</p>
        </div>
        <div className="text-right">
            <p className="font-bold text-xl text-primary-light dark:text-primary-dark">{meal.totalCalories}</p>
            <p className="text-xs text-secondary-light dark:text-secondary-dark">kcal</p>
        </div>
    </div>
);

const DashboardScreen: React.FC = () => {
    const { userProfile, meals } = useAppContext();

    if (!userProfile) {
        return <div className="p-4">Loading user profile...</div>;
    }

    const today = new Date().toDateString();
    const todaysMeals = meals.filter(m => new Date(m.timestamp).toDateString() === today);

    const totalCalories = todaysMeals.reduce((sum, meal) => sum + meal.totalCalories, 0);
    const totalProtein = todaysMeals.reduce((sum, meal) => sum + meal.items.reduce((s, i) => s + i.protein, 0), 0);
    const totalCarbs = todaysMeals.reduce((sum, meal) => sum + meal.items.reduce((s, i) => s + i.carbs, 0), 0);
    const totalFat = todaysMeals.reduce((sum, meal) => sum + meal.items.reduce((s, i) => s + i.fat, 0), 0);

    const calorieProgress = (totalCalories / userProfile.dailyCalorieTarget) * 100;

    return (
        <div className="p-6 bg-app-light dark:bg-app-dark min-h-full">
            <header>
                <h1 className="text-3xl font-bold text-primary-light dark:text-primary-dark">Hello, {userProfile.name}</h1>
                <p className="text-secondary-light dark:text-secondary-dark">Here's your summary for today.</p>
            </header>

            <section className="my-8 flex justify-center">
                <CircularProgress 
                    progress={calorieProgress} 
                    size={200} 
                    strokeWidth={15}
                    calories={totalCalories}
                    target={userProfile.dailyCalorieTarget}
                />
            </section>

            <section className="p-5 bg-card-light dark:bg-card-dark rounded-2xl shadow-lg">
                <h2 className="font-bold text-xl mb-4 text-primary-light dark:text-primary-dark">Macros Breakdown</h2>
                <div className="space-y-4">
                    <MacroBar label="Protein" value={totalProtein} total={150} color="bg-red-400" />
                    <MacroBar label="Carbs" value={totalCarbs} total={250} color="bg-blue-400" />
                    <MacroBar label="Fat" value={totalFat} total={70} color="bg-yellow-400" />
                </div>
            </section>

            <section className="mt-8">
                <h2 className="font-bold text-xl mb-4 text-primary-light dark:text-primary-dark">Today's Meals</h2>
                <div className="space-y-4">
                    {todaysMeals.length > 0 ? (
                        todaysMeals.map(meal => <MealCard key={meal.id} meal={meal} />)
                    ) : (
                        <div className="text-center py-10 bg-card-light dark:bg-card-dark rounded-2xl">
                            <p className="text-secondary-light dark:text-secondary-dark">No meals logged yet today.</p>
                            <p className="text-gray-400 text-sm mt-1">Tap the camera button to add a meal!</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default DashboardScreen;