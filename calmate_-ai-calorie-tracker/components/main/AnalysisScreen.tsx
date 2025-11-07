
import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import { analyzeMealFromImage } from '../../services/geminiService';
import { FoodItem, Meal, MealType } from '../../types';

const SkeletonLoader: React.FC = () => (
    <div className="animate-pulse">
        <div className="h-64 bg-gray-300 dark:bg-gray-700 rounded-2xl"></div>
        <div className="mt-8 p-5 bg-card-light dark:bg-card-dark rounded-2xl">
            <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
            <div className="space-y-4 mt-4">
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
            </div>
        </div>
        <div className="h-12 bg-gray-300 dark:bg-gray-700 rounded-2xl mt-8"></div>
    </div>
);

const AnalysisScreen: React.FC = () => {
    const { imageForAnalysis, setImageForAnalysis, addMeal } = useAppContext();
    const [analysis, setAnalysis] = useState<{ items: FoodItem[], totalCalories: number } | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [mealType, setMealType] = useState<MealType>(MealType.Lunch);

    useEffect(() => {
        const performAnalysis = async () => {
            if (imageForAnalysis) {
                try {
                    setLoading(true);
                    setError(null);
                    const result = await analyzeMealFromImage(imageForAnalysis);
                    setAnalysis(result);
                } catch (err) {
                    setError(err instanceof Error ? err.message : 'An unknown error occurred.');
                } finally {
                    setLoading(false);
                }
            }
        };
        performAnalysis();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [imageForAnalysis]);

    const handleAddToLog = () => {
        if (!analysis || !imageForAnalysis) return;

        const newMeal: Meal = {
            id: new Date().toISOString(),
            type: mealType,
            items: analysis.items,
            totalCalories: analysis.totalCalories,
            photo: `data:image/jpeg;base64,${imageForAnalysis}`,
            timestamp: new Date(),
        };
        addMeal(newMeal);
        setImageForAnalysis(null);
    };

    return (
        <div className="p-6 bg-app-light dark:bg-app-dark min-h-full">
            <header className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-primary-light dark:text-primary-dark">Analysis Results</h1>
                <button onClick={() => setImageForAnalysis(null)} className="text-secondary-light dark:text-secondary-dark hover:text-primary-light dark:hover:text-primary-dark font-semibold">
                    Retake
                </button>
            </header>

            {loading && <SkeletonLoader />}
            {error && <div className="text-center py-10 px-4 bg-red-100 dark:bg-red-900/20 text-red-500 dark:text-red-400 rounded-xl">
                <p className="font-semibold">Oops! Something went wrong.</p>
                <p className="text-sm mt-1">{error}</p>
            </div>}
            
            {!loading && analysis && (
                <div>
                    <img
                        src={`data:image/jpeg;base64,${imageForAnalysis}`}
                        alt="Analyzed meal"
                        className="w-full h-64 object-cover rounded-2xl shadow-lg"
                    />
                    <div className="mt-8 p-5 bg-card-light dark:bg-card-dark rounded-2xl shadow-lg">
                        <div className="flex justify-between items-start">
                            <h2 className="text-xl font-bold text-primary-light dark:text-primary-dark">Nutritional Breakdown</h2>
                            <div className="text-right">
                                <p className="text-3xl font-bold text-[var(--primary)]">{analysis.totalCalories}</p>
                                <p className="text-sm text-secondary-light dark:text-secondary-dark">Total Calories</p>
                            </div>
                        </div>

                        <ul className="mt-4 divide-y divide-gray-200 dark:divide-gray-700">
                            {analysis.items.map((item, index) => (
                                <li key={index} className="py-3">
                                    <div className="flex justify-between font-semibold">
                                        <span className="text-primary-light dark:text-primary-dark">{item.name} <em className="text-secondary-light dark:text-secondary-dark font-normal">({item.quantity})</em></span>
                                        <span className="text-primary-light dark:text-primary-dark">{item.calories} kcal</span>
                                    </div>
                                    <div className="flex justify-between text-xs text-secondary-light dark:text-secondary-dark mt-1">
                                        <span>P: {item.protein}g</span>
                                        <span>C: {item.carbs}g</span>
                                        <span>F: {item.fat}g</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                     <div className="mt-8">
                        <label className="font-semibold text-secondary-light dark:text-secondary-dark">Meal Type</label>
                        <select
                            value={mealType}
                            onChange={(e) => setMealType(e.target.value as MealType)}
                            className="w-full p-4 mt-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-card-light dark:bg-card-dark text-primary-light dark:text-primary-dark"
                        >
                            <option value={MealType.Breakfast}>Breakfast</option>
                            <option value={MealType.Lunch}>Lunch</option>
                            <option value={MealType.Dinner}>Dinner</option>
                            <option value={MealType.Snack}>Snack</option>
                        </select>
                    </div>

                    <button
                        onClick={handleAddToLog}
                        className="w-full mt-8 bg-[var(--primary)] text-white font-bold py-4 rounded-2xl text-lg hover:bg-[var(--primary-hover)] transition shadow-lg"
                    >
                        Add to Meal Log
                    </button>
                </div>
            )}
        </div>
    );
};

export default AnalysisScreen;
