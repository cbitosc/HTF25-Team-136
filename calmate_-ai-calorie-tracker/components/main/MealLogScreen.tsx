
import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { Meal } from '../../types';

const MealLogItem: React.FC<{ meal: Meal }> = ({ meal }) => (
    <div className="bg-card-light dark:bg-card-dark rounded-2xl overflow-hidden shadow-md flex items-center p-4 space-x-4">
        <img src={meal.photo} alt={meal.items[0].name} className="w-24 h-24 rounded-xl object-cover" />
        <div className="flex-1">
            <div className="flex justify-between items-start">
                <div>
                    <p className="font-bold text-lg text-primary-light dark:text-primary-dark capitalize">{meal.type.toLowerCase()}</p>
                    <p className="text-sm text-secondary-light dark:text-secondary-dark max-w-xs truncate">{meal.items.map(i => i.name).join(', ')}</p>
                </div>
                <div className="text-right flex-shrink-0 ml-2">
                    <p className="font-semibold text-xl text-[var(--primary)]">{meal.totalCalories}</p>
                    <p className="text-xs text-secondary-light dark:text-secondary-dark">kcal</p>
                </div>
            </div>
        </div>
    </div>
);


const MealLogScreen: React.FC = () => {
    const { meals } = useAppContext();
    
    const groupedMeals = meals.reduce((acc, meal) => {
        const date = new Date(meal.timestamp).toDateString();
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(meal);
        return acc;
    }, {} as Record<string, Meal[]>);

    const sortedDates = Object.keys(groupedMeals).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
    
    return (
        <div className="p-6 bg-app-light dark:bg-app-dark min-h-full">
            <h1 className="text-3xl font-bold text-primary-light dark:text-primary-dark mb-8">Meal Log</h1>
            
            {meals.length === 0 ? (
                <div className="text-center py-16">
                    <p className="text-secondary-light dark:text-secondary-dark">Your meal log is empty.</p>
                     <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">Start by tracking your first meal!</p>
                </div>
            ) : (
                <div className="space-y-8">
                    {sortedDates.map(date => (
                        <div key={date}>
                            <h2 className="font-semibold text-secondary-light dark:text-secondary-dark mb-4">{new Date(date).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}</h2>
                            <div className="space-y-4">
                                {groupedMeals[date].map(meal => <MealLogItem key={meal.id} meal={meal} />)}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MealLogScreen;
