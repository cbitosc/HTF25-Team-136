
import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';

const features = [
    {
        icon: '📷',
        title: "Snap & Track Instantly",
        description: "Just take a photo—our AI identifies dishes and calculates calories automatically.",
    },
    {
        icon: '🤖',
        title: "AI-Powered Meal Plans",
        description: "Get customized diet plans based on your goals and preferences.",
    },
    {
        icon: '📝',
        title: "Track Your Journey",
        description: "View your complete meal history with photos and nutritional trends.",
    },
    {
        icon: '📈',
        title: "Insights That Matter",
        description: "Monitor calories, macros, and progress with intuitive charts.",
    }
];

const FeatureShowcase: React.FC = () => {
    const [current, setCurrent] = useState(0);
    const { completeOnboardingStep } = useAppContext();

    const next = () => {
        if (current < features.length - 1) {
            setCurrent(c => c + 1);
        } else {
            completeOnboardingStep('auth');
        }
    };
    
    return (
        <div className="flex flex-col h-full w-full p-8 bg-app-light dark:bg-app-dark text-center">
            <div className="flex-1 flex flex-col justify-center items-center">
                <div className="text-6xl mb-6 p-6 bg-blue-100 dark:bg-blue-900/20 rounded-full">{features[current].icon}</div>
                <h2 className="text-3xl font-bold text-primary-light dark:text-primary-dark">{features[current].title}</h2>
                <p className="mt-4 text-lg text-secondary-light dark:text-secondary-dark max-w-sm">
                    {features[current].description}
                </p>
            </div>
            
            <div className="flex justify-center space-x-2 mb-8">
                {features.map((_, i) => (
                    <div key={i} className={`w-3 h-3 rounded-full transition-all duration-300 ${i === current ? 'bg-[var(--primary)] w-6' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
                ))}
            </div>

            <button
                onClick={next}
                className="w-full bg-[var(--primary)] text-white font-bold py-4 rounded-2xl text-lg hover:bg-[var(--primary-hover)] transition"
            >
                {current < features.length - 1 ? 'Next' : 'Get Started'}
            </button>
        </div>
    );
};

export default FeatureShowcase;
