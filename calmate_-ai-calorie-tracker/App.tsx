

import React, { useState, useCallback, useMemo } from 'react';
import { AppProvider, useAppContext } from './context/AppContext';
import SplashScreen from './components/onboarding/SplashScreen';
import WelcomeScreen from './components/onboarding/WelcomeScreen';
import ProfileSetupFlow from './components/onboarding/ProfileSetupFlow';
import FeatureShowcase from './components/onboarding/FeatureShowcase';
import AuthScreen from './components/onboarding/AuthScreen';
import DashboardScreen from './components/main/DashboardScreen';
import MealLogScreen from './components/main/MealLogScreen';
import CameraScreen from './components/main/CameraScreen';
import AnalysisScreen from './components/main/AnalysisScreen';
import PlannerScreen from './components/main/PlannerScreen';
import ProfileScreen from './components/main/ProfileScreen';
import BottomNav from './components/BottomNav';
import { Screen } from './types';

const AppContent: React.FC = () => {
    const { screen, onboardingStep, showOnboarding, imageForAnalysis } = useAppContext();

    if (showOnboarding) {
        switch (onboardingStep) {
            case 'splash':
                return <SplashScreen />;
            case 'welcome':
                return <WelcomeScreen />;
            case 'profileSetup':
                return <ProfileSetupFlow />;
            case 'features':
                return <FeatureShowcase />;
            case 'auth':
                return <AuthScreen />;
            default:
                return <SplashScreen />;
        }
    }

    const renderScreen = () => {
        if (imageForAnalysis) {
            return <AnalysisScreen />;
        }

        switch (screen) {
            case Screen.Dashboard:
                return <DashboardScreen />;
            case Screen.MealLog:
                return <MealLogScreen />;
            case Screen.Camera:
                return <CameraScreen />;
            case Screen.Planner:
                return <PlannerScreen />;
            case Screen.Profile:
                return <ProfileScreen />;
            default:
                return <DashboardScreen />;
        }
    };

    return (
        <div className="h-screen w-screen max-w-md mx-auto bg-app-light dark:bg-app-dark flex flex-col font-sans shadow-2xl overflow-hidden">
            <main className="flex-1 overflow-y-auto pb-24 no-scrollbar">
                {renderScreen()}
            </main>
            {!imageForAnalysis && <BottomNav />}
        </div>
    );
};


const App: React.FC = () => {
    return (
        <AppProvider>
            <AppContent />
        </AppProvider>
    );
};

export default App;