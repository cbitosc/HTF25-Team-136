import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import { Screen, OnboardingStep, UserProfile, Meal } from '../types';

interface AppContextType {
    screen: Screen;
    setScreen: (screen: Screen) => void;
    showOnboarding: boolean;
    onboardingStep: OnboardingStep;
    completeOnboardingStep: (nextStep: OnboardingStep | 'done') => void;
    userProfile: UserProfile | null;
    setUserProfile: (profile: UserProfile) => void;
    meals: Meal[];
    addMeal: (meal: Meal) => void;
    imageForAnalysis: string | null;
    setImageForAnalysis: (imageData: string | null) => void;
    signOut: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [screen, setScreen] = useState<Screen>(Screen.Dashboard);
    const [showOnboarding, setShowOnboarding] = useState<boolean>(true);
    const [onboardingStep, setOnboardingStep] = useState<OnboardingStep>('splash');
    const [userProfile, setUserProfileState] = useState<UserProfile | null>(null);
    const [meals, setMeals] = useState<Meal[]>([]);
    const [imageForAnalysis, setImageForAnalysis] = useState<string | null>(null);
    
    const completeOnboardingStep = useCallback((nextStep: OnboardingStep | 'done') => {
        if (nextStep === 'done') {
            setShowOnboarding(false);
        } else {
            setOnboardingStep(nextStep);
        }
    }, []);

    const setUserProfile = (profile: UserProfile) => {
        setUserProfileState(profile);
    };
    
    const addMeal = (meal: Meal) => {
        setMeals(prevMeals => [meal, ...prevMeals].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()));
    };

    const signOut = () => {
        setShowOnboarding(true);
        setOnboardingStep('welcome');
        setUserProfileState(null);
        setMeals([]);
        setImageForAnalysis(null);
        setScreen(Screen.Dashboard);
    };


    return (
        <AppContext.Provider value={{
            screen, setScreen, showOnboarding, onboardingStep, completeOnboardingStep, userProfile, setUserProfile, meals, addMeal, imageForAnalysis, setImageForAnalysis, signOut
        }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = (): AppContextType => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};