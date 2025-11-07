import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { Gender, Goal, ActivityLevel, UserProfile } from '../../types';

type FormData = Omit<UserProfile, 'dailyCalorieTarget'>;

const StepIndicator: React.FC<{ current: number; total: number }> = ({ current, total }) => (
    <div className="flex justify-center space-x-2 my-4">
        {Array.from({ length: total }).map((_, i) => (
            <div
                key={i}
                className={`w-12 h-1.5 rounded-full ${i + 1 <= current ? 'bg-[var(--primary)]' : 'bg-gray-300 dark:bg-gray-700'}`}
            ></div>
        ))}
    </div>
);

const Step1_BasicInfo: React.FC<{ onNext: () => void; data: FormData; setData: React.Dispatch<React.SetStateAction<FormData>> }> = ({ onNext, data, setData }) => (
    <div className="flex flex-col items-center text-center">
        <h2 className="text-2xl font-bold text-primary-light dark:text-primary-dark">Tell Us About Yourself</h2>
        <p className="text-secondary-light dark:text-secondary-dark mt-2">This helps us create your personalized plan.</p>
        <div className="w-full mt-8 space-y-4">
            <input type="text" placeholder="Your Name" value={data.name} onChange={e => setData(d => ({ ...d, name: e.target.value }))} className="w-full p-4 bg-card-light dark:bg-card-dark border border-gray-300 dark:border-gray-600 rounded-xl text-lg text-primary-light dark:text-primary-dark" />
            <input type="number" placeholder="Age" value={data.age === 0 ? '' : data.age} onChange={e => setData(d => ({ ...d, age: Number(e.target.value) }))} className="w-full p-4 bg-card-light dark:bg-card-dark border border-gray-300 dark:border-gray-600 rounded-xl text-lg text-primary-light dark:text-primary-dark" />
            <select value={data.gender} onChange={e => setData(d => ({...d, gender: e.target.value as Gender}))} className="w-full p-4 bg-card-light dark:bg-card-dark border border-gray-300 dark:border-gray-600 rounded-xl text-lg text-primary-light dark:text-primary-dark">
                <option value={Gender.Female}>Female</option>
                <option value={Gender.Male}>Male</option>
                <option value={Gender.Other}>Other</option>
            </select>
        </div>
        <button onClick={onNext} className="w-full mt-8 bg-[var(--primary)] text-white font-bold py-4 rounded-2xl text-lg hover:bg-[var(--primary-hover)] transition">Next</button>
    </div>
);

const Step2_BodyMetrics: React.FC<{ onNext: () => void; data: FormData; setData: React.Dispatch<React.SetStateAction<FormData>> }> = ({ onNext, data, setData }) => (
    <div className="flex flex-col items-center text-center">
        <h2 className="text-2xl font-bold text-primary-light dark:text-primary-dark">Your Body Metrics</h2>
        <p className="text-secondary-light dark:text-secondary-dark mt-2">Let's get your starting point.</p>
        <div className="w-full mt-8">
            <label className="block text-left font-semibold text-primary-light dark:text-primary-dark">Current Weight (kg)</label>
            <input type="range" min="30" max="200" value={data.weight} onChange={e => setData(d => ({...d, weight: Number(e.target.value)}))} className="w-full mt-2 accent-[var(--primary)]" />
            <p className="text-3xl font-bold mt-2 text-[var(--primary)]">{data.weight} kg</p>
            
            <div className="w-full mt-6">
                <label className="block text-left font-semibold text-primary-light dark:text-primary-dark">Height (cm)</label>
                <input type="number" placeholder="e.g., 170" value={data.height === 0 ? '' : data.height} onChange={e => setData(d => ({...d, height: Number(e.target.value)}))} className="w-full p-4 bg-card-light dark:bg-card-dark border border-gray-300 dark:border-gray-600 rounded-xl mt-2 text-lg text-primary-light dark:text-primary-dark" />
            </div>
        </div>
        <button onClick={onNext} className="w-full mt-8 bg-[var(--primary)] text-white font-bold py-4 rounded-2xl text-lg hover:bg-[var(--primary-hover)] transition">Next</button>
    </div>
);

const Card: React.FC<{ title: string; icon: string; selected: boolean; onClick: () => void }> = ({ title, icon, selected, onClick }) => (
    <button onClick={onClick} className={`w-full p-6 border rounded-2xl text-center transition-all duration-200 ${selected ? 'bg-blue-100 dark:bg-blue-900/30 border-[var(--primary)] ring-2 ring-[var(--primary)]' : 'bg-card-light dark:bg-card-dark border-gray-300 dark:border-gray-600'}`}>
        <span className="text-4xl">{icon}</span>
        <p className="mt-2 font-semibold text-lg text-primary-light dark:text-primary-dark">{title}</p>
    </button>
);

const Step3_Goal: React.FC<{ onNext: () => void; data: FormData; setData: React.Dispatch<React.SetStateAction<FormData>> }> = ({ onNext, data, setData }) => (
    <div className="flex flex-col items-center text-center">
        <h2 className="text-2xl font-bold text-primary-light dark:text-primary-dark">What's Your Goal?</h2>
        <div className="grid grid-cols-2 gap-4 w-full mt-8">
            <Card title="Weight Loss" icon="🎯" selected={data.goal === Goal.WeightLoss} onClick={() => setData(d => ({...d, goal: Goal.WeightLoss, targetWeight: d.weight - 5}))} />
            <Card title="Weight Gain" icon="💪" selected={data.goal === Goal.WeightGain} onClick={() => setData(d => ({...d, goal: Goal.WeightGain, targetWeight: d.weight + 5}))} />
            <Card title="Maintain" icon="⚖️" selected={data.goal === Goal.Maintain} onClick={() => setData(d => ({...d, goal: Goal.Maintain, targetWeight: d.weight}))} />
            <Card title="Build Muscle" icon="🏋️" selected={data.goal === Goal.BuildMuscle} onClick={() => setData(d => ({...d, goal: Goal.BuildMuscle, targetWeight: d.weight + 2}))} />
        </div>
        <button onClick={onNext} className="w-full mt-8 bg-[var(--primary)] text-white font-bold py-4 rounded-2xl text-lg hover:bg-[var(--primary-hover)] transition">Next</button>
    </div>
);

const Step4_Activity: React.FC<{ onNext: () => void; data: FormData; setData: React.Dispatch<React.SetStateAction<FormData>> }> = ({ onNext, data, setData }) => {
    const levels = Object.values(ActivityLevel);
    return (
        <div className="flex flex-col items-center text-center">
            <h2 className="text-2xl font-bold text-primary-light dark:text-primary-dark">Your Activity Level</h2>
            <div className="w-full mt-6 space-y-3">
                {levels.map(l => (
                    <button key={l} onClick={() => setData(d => ({...d, activityLevel: l}))} className={`w-full p-4 border rounded-xl text-left transition ${data.activityLevel === l ? 'bg-blue-100 dark:bg-blue-900/30 border-[var(--primary)] font-semibold ring-2 ring-[var(--primary)]' : 'bg-card-light dark:bg-card-dark border-gray-300 dark:border-gray-600'}`}>
                        <span className="text-primary-light dark:text-primary-dark">{l.replace('_', ' ').toLowerCase().replace(/\b\w/g, c => c.toUpperCase())}</span>
                    </button>
                ))}
            </div>
            <button onClick={onNext} className="w-full mt-8 bg-[var(--primary)] text-white font-bold py-4 rounded-2xl text-lg hover:bg-[var(--primary-hover)] transition">Finish</button>
        </div>
    );
};

const ProfileSetupFlow: React.FC = () => {
    const [step, setStep] = useState(1);
    const { completeOnboardingStep, setUserProfile } = useAppContext();
    const [formData, setFormData] = useState<FormData>({
        name: '',
        age: 30,
        gender: Gender.Female,
        weight: 70,
        height: 170,
        goal: Goal.WeightLoss,
        targetWeight: 65,
        activityLevel: ActivityLevel.ModeratelyActive,
    });

    const nextStep = () => setStep(s => s + 1);

    const handleFinish = () => {
        // Calculate daily calorie target (Mifflin-St Jeor Equation - more accurate)
        let bmr = 0;
        if (formData.gender === Gender.Male) {
            bmr = (10 * formData.weight) + (6.25 * formData.height) - (5 * formData.age) + 5;
        } else { // Female or Other
            bmr = (10 * formData.weight) + (6.25 * formData.height) - (5 * formData.age) - 161;
        }

        const activityMultipliers = {
            [ActivityLevel.Sedentary]: 1.2,
            [ActivityLevel.LightlyActive]: 1.375,
            [ActivityLevel.ModeratelyActive]: 1.55,
            [ActivityLevel.VeryActive]: 1.725,
            [ActivityLevel.ExtremelyActive]: 1.9,
        };

        const tdee = bmr * activityMultipliers[formData.activityLevel];

        let calorieTarget = tdee;
        if (formData.goal === Goal.WeightLoss) calorieTarget -= 500;
        if (formData.goal === Goal.WeightGain) calorieTarget += 500;
        if (formData.goal === Goal.BuildMuscle) calorieTarget += 300;

        const finalProfile: UserProfile = {
            ...formData,
            dailyCalorieTarget: Math.round(calorieTarget),
        };
        
        setUserProfile(finalProfile);
        completeOnboardingStep('features');
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return <Step1_BasicInfo onNext={nextStep} data={formData} setData={setFormData} />;
            case 2:
                return <Step2_BodyMetrics onNext={nextStep} data={formData} setData={setFormData} />;
            case 3:
                return <Step3_Goal onNext={nextStep} data={formData} setData={setFormData} />;
            case 4:
                return <Step4_Activity onNext={handleFinish} data={formData} setData={setFormData} />;
            default:
                return null;
        }
    };

    return (
        <div className="flex flex-col h-full w-full p-6 bg-app-light dark:bg-app-dark">
            <StepIndicator current={step} total={4} />
            <div className="flex-1 flex flex-col justify-center">
                {renderStep()}
            </div>
        </div>
    );
};

export default ProfileSetupFlow;