import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { ArrowRightIcon } from '../icons';

const WelcomeScreen: React.FC = () => {
    const { completeOnboardingStep } = useAppContext();

    return (
        <div className="flex flex-col h-full w-full p-8 bg-app-light dark:bg-app-dark">
            <div className="flex-1 flex flex-col justify-center text-center">
                <div className="w-24 h-24 bg-[var(--primary)] rounded-full mx-auto flex items-center justify-center mb-8 shadow-lg">
                    <svg className="w-12 h-12 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM16.6 13.71L12.28 10.23C11.5 9.58 11.25 8.59 11.58 7.72L12.45 9.79L14.5 10.68C15.39 11.03 16.36 10.76 17 10L17.29 10.29C17.76 10.76 17.65 11.53 17.06 12.12L16.6 12.58C16.03 13.15 15.26 13.26 14.68 12.8L13.79 12.25L11.72 13.12C10.85 13.45 9.86 13.2 9.21 12.42L8.75 11.96L8 12.71C7.43 13.28 6.66 13.39 6.08 12.93L5.62 12.47L4.46 13.63C3.87 14.22 3.87 15.17 4.46 15.76L5.93 17.22C6.52 17.81 7.47 17.81 8.06 17.22L9.22 16.06L9.68 16.52C10.25 17.09 11.02 17.2 11.6 16.74L12.35 16L12.81 16.46C13.59 17.11 14.58 17.36 15.45 17.03L16.32 15.96L17 15.25C17.65 14.57 17.38 13.58 16.6 12.93L16.6 13.71Z" fill="currentColor"/>
                    </svg>
                </div>
                <h1 className="text-4xl font-bold text-primary-light dark:text-primary-dark">Welcome to CALMATE</h1>
                <p className="mt-4 text-lg text-secondary-light dark:text-secondary-dark">
                    Smart nutrition tracking made simple.
                </p>
            </div>
            <div className="pb-4">
                <button
                    onClick={() => completeOnboardingStep('profileSetup')}
                    className="w-full bg-[var(--primary)] text-white font-bold py-4 px-4 rounded-2xl flex items-center justify-center text-lg hover:bg-[var(--primary-hover)] transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                    Get Started
                    <ArrowRightIcon className="w-6 h-6 ml-2" />
                </button>
                <p className="text-center mt-4 text-sm text-secondary-light dark:text-secondary-dark">
                    Already have an account? <button onClick={() => completeOnboardingStep('profileSetup')} className="font-semibold text-[var(--primary)]">Sign In</button>
                </p>
            </div>
        </div>
    );
};

export default WelcomeScreen;