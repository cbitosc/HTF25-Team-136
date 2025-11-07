
import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Screen } from '../types';
import { HomeIcon, LogIcon, CameraIcon, PlannerIcon, ProfileIcon } from './icons';

const NavItem: React.FC<{
    screen: Screen;
    label: string;
    Icon: React.FC<{ className?: string }>;
}> = ({ screen, label, Icon }) => {
    const { screen: currentScreen, setScreen } = useAppContext();
    const isActive = currentScreen === screen;
    const color = isActive ? 'text-[var(--primary)]' : 'text-gray-400 dark:text-gray-500';
    const iconColor = isActive ? 'text-white' : 'text-gray-500 dark:text-gray-400 group-hover:text-[var(--primary)]';

    return (
        <button
            onClick={() => setScreen(screen)}
            aria-label={label}
            className="flex flex-col items-center justify-center w-full transition-colors duration-300 ease-in-out group"
        >
            <div className={`relative w-12 h-8 flex items-center justify-center`}>
              <div className={`absolute top-0 w-12 h-8 rounded-full bg-[var(--primary)] transition-all duration-300 ease-in-out ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}></div>
              <Icon className={`relative h-6 w-6 transition-colors duration-300 ${iconColor}`} />
            </div>
            <span className={`text-xs mt-1 font-medium transition-colors duration-300 ${color}`}>{label}</span>
        </button>
    );
};


const BottomNav: React.FC = () => {
    const { setScreen, screen } = useAppContext();
    const isCameraActive = screen === Screen.Camera;

    return (
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-[90%] max-w-sm">
            <div className="relative h-20 bg-card-light/70 dark:bg-card-dark/70 backdrop-blur-lg border border-gray-200 dark:border-gray-700 flex items-center justify-around shadow-2xl rounded-3xl">
                <NavItem screen={Screen.Dashboard} label="Home" Icon={HomeIcon} />
                <NavItem screen={Screen.MealLog} label="Log" Icon={LogIcon} />
                
                <div className="w-16 h-16"></div>
                
                <NavItem screen={Screen.Planner} label="Plan" Icon={PlannerIcon} />
                <NavItem screen={Screen.Profile} label="Profile" Icon={ProfileIcon} />
            </div>
             <button
                onClick={() => setScreen(Screen.Camera)}
                aria-label="Open Camera"
                className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-[var(--primary)] rounded-full flex items-center justify-center text-white -mt-5 shadow-lg hover:bg-[var(--primary-hover)] transition-all duration-300 transform hover:scale-110 ${isCameraActive ? 'ring-4 ring-offset-2 ring-offset-card-light dark:ring-offset-card-dark ring-[var(--primary)]' : ''}`}
            >
                <CameraIcon className="w-8 h-8" />
            </button>
        </div>
    );
};

export default BottomNav;
