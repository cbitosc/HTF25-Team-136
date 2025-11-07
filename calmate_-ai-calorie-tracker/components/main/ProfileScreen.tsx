import React from 'react';
import { useAppContext } from '../../context/AppContext';

const ProfileItem: React.FC<{ label: string; value: string | number; unit?: string }> = ({ label, value, unit }) => (
    <div className="flex justify-between items-center py-4 border-b border-gray-200 dark:border-gray-700">
        <span className="text-secondary-light dark:text-secondary-dark">{label}</span>
        <span className="font-semibold text-primary-light dark:text-primary-dark">{value} {unit}</span>
    </div>
);


const ProfileScreen: React.FC = () => {
    const { userProfile, signOut } = useAppContext();

    if (!userProfile) {
        return <div>Loading...</div>
    }

    return (
        <div className="p-6 bg-app-light dark:bg-app-dark min-h-full">
            <div className="flex flex-col items-center">
                <img
                    src={`https://api.dicebear.com/8.x/initials/svg?seed=${userProfile.name}`}
                    alt="Profile"
                    className="w-28 h-28 rounded-full object-cover border-4 border-[var(--primary)] shadow-lg bg-gray-200"
                />
                <h1 className="text-3xl font-bold mt-4 text-primary-light dark:text-primary-dark">{userProfile.name}</h1>
                <p className="text-secondary-light dark:text-secondary-dark">Age {userProfile.age}</p>
            </div>
            
            <div className="mt-8 bg-card-light dark:bg-card-dark rounded-2xl p-4 shadow-lg">
                <h2 className="font-bold text-xl text-primary-light dark:text-primary-dark mb-2 px-2">My Stats</h2>
                <ProfileItem label="Weight" value={userProfile.weight} unit="kg" />
                <ProfileItem label="Height" value={userProfile.height} unit="cm" />
                <ProfileItem label="Goal" value={userProfile.goal.replace('_', ' ').toLowerCase().replace(/\b\w/g, c => c.toUpperCase())} />
                <ProfileItem label="Target Weight" value={userProfile.targetWeight} unit="kg" />
            </div>

            <div className="mt-6 bg-card-light dark:bg-card-dark rounded-2xl p-4 shadow-lg">
                <h2 className="font-bold text-xl text-primary-light dark:text-primary-dark mb-2 px-2">Settings</h2>
                <button className="w-full text-left py-3 px-2 border-b border-gray-200 dark:border-gray-700 text-primary-light dark:text-primary-dark hover:bg-gray-100 dark:hover:bg-gray-700 rounded-t-lg">Account Information</button>
                <button className="w-full text-left py-3 px-2 border-b border-gray-200 dark:border-gray-700 text-primary-light dark:text-primary-dark hover:bg-gray-100 dark:hover:bg-gray-700">Notification Settings</button>
                <button className="w-full text-left py-3 px-2 text-primary-light dark:text-primary-dark hover:bg-gray-100 dark:hover:bg-gray-700 rounded-b-lg">Help & FAQ</button>
            </div>
            
            <div className="mt-8 text-center">
                <button onClick={signOut} className="text-red-500 font-semibold hover:underline">
                    Sign Out
                </button>
            </div>
        </div>
    );
};

export default ProfileScreen;