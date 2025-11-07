
import React, { useState, useEffect, useCallback } from 'react';
import { useAppContext } from '../../context/AppContext';
import { generateMealPlan, MealPlanItem } from '../../services/geminiService';

const PlanSkeleton: React.FC = () => (
    <div className="space-y-6 animate-pulse">
        {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-card-light dark:bg-card-dark rounded-2xl overflow-hidden shadow-md">
                <div className="p-5">
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/4 mb-3"></div>
                    <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-3"></div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/3"></div>
                </div>
            </div>
        ))}
    </div>
);


const PlanMealCard: React.FC<{ meal: MealPlanItem }> = ({ meal }) => (
    <div className="bg-card-light dark:bg-card-dark rounded-2xl overflow-hidden shadow-lg transition-transform hover:scale-105 duration-300">
        <div className="p-5">
            <div className="flex justify-between items-center">
                <p className="text-sm font-bold text-[var(--primary)] uppercase tracking-wider">{meal.mealType}</p>
                <p className="font-bold text-lg text-primary-light dark:text-primary-dark">{meal.calories} <span className="text-xs text-secondary-light dark:text-secondary-dark">kcal</span></p>
            </div>
            <h3 className="font-semibold text-xl mt-2 text-primary-light dark:text-primary-dark">{meal.dish}</h3>
        </div>
    </div>
);


const PlannerScreen: React.FC = () => {
    const { userProfile } = useAppContext();
    const [plan, setPlan] = useState<MealPlanItem[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchPlan = useCallback(async () => {
        if (!userProfile) return;
        setLoading(true);
        setError(null);
        try {
            const result = await generateMealPlan(userProfile);
            setPlan(result.plan);
        } catch (e) {
            setError(e instanceof Error ? e.message : 'An unexpected error occurred.');
            setPlan(null);
        } finally {
            setLoading(false);
        }
    }, [userProfile]);

    useEffect(() => {
        fetchPlan();
    }, [fetchPlan]);

    if (!userProfile) {
        return <div className="p-6 text-center text-secondary-light dark:text-secondary-dark">Loading profile to generate plan...</div>
    }

    return (
        <div className="p-6 bg-app-light dark:bg-app-dark min-h-full">
            <h1 className="text-3xl font-bold text-primary-light dark:text-primary-dark mb-2">Your AI Meal Plan</h1>
            <p className="text-secondary-light dark:text-secondary-dark mb-8">A suggested plan for your goal of <span className="font-semibold text-[var(--primary)]">{userProfile.dailyCalorieTarget} kcal</span>.</p>

            {loading && <PlanSkeleton />}
            {error && (
                <div className="text-center py-10 px-4 bg-red-100 dark:bg-red-900/20 text-red-500 dark:text-red-400 rounded-xl">
                    <p className="font-semibold">Oops! Something went wrong.</p>
                    <p className="text-sm mt-1">{error}</p>
                </div>
            )}
            
            {!loading && plan && (
                 <div className="space-y-6">
                    {plan.map((meal, index) => <PlanMealCard key={index} meal={meal} />)}
                </div>
            )}
            
            <button 
                onClick={fetchPlan}
                disabled={loading}
                className="w-full mt-8 bg-[var(--primary)] text-white font-bold py-4 rounded-2xl text-lg hover:bg-[var(--primary-hover)] transition disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center shadow-lg"
            >
                {loading ? 'Generating...' : 'Regenerate Plan'}
            </button>
        </div>
    );
};

export default PlannerScreen;
