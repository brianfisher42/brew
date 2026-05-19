/**
 * App.tsx
 * 
 * Main application component for Brewtelligence - The Custom Cup's AI barista app.
 * This component serves as the layout shell and handles tab-based navigation
 * between the different sections of the app.
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { MoodSelector } from './components/MoodSelector';
import { CustomCreator } from './components/CustomCreator';
import { TabButton } from './components/TabButton';
import { Coffee, Wand2, SlidersHorizontal, LayoutList } from 'lucide-react';
import { AdminPanel } from './components/AdminPanel';
import { BaristaQueue } from './components/BaristaQueue';

/**
 * Union type for the available navigation tabs.
 * - 'mood': Mood-based drink recommendations
 * - 'custom': Custom drink creation with AI
 * - 'admin': Inventory management panel
 * - 'barista': Order queue for baristas
 */
type ActiveTab = 'mood' | 'custom' | 'admin' | 'barista';

/**
 * Root application component that manages navigation and renders the main layout.
 * Uses a tab-based navigation system to switch between different features.
 */
const App: React.FC = () => {
  // Track which tab is currently active, defaulting to mood-based recommendations
  const [activeTab, setActiveTab] = useState<ActiveTab>('mood');

  return (
    <div className="min-h-screen bg-coffee-cream text-coffee-dark font-sans flex flex-col items-center p-4 sm:p-6">
      <div className="w-full max-w-4xl mx-auto">
        {/* App header with branding */}
        <Header />
        
        {/* Navigation tab bar - centered pill-style buttons */}
        <div className="my-8 flex flex-wrap justify-center bg-coffee-dark/5 p-1 rounded-3xl sm:rounded-full shadow-inner w-full max-w-2xl mx-auto">
          {/* Mood-based recommendation tab */}
          <TabButton
            isActive={activeTab === 'mood'}
            onClick={() => setActiveTab('mood')}
          >
            <Coffee className="w-5 h-5 mr-1 sm:mr-2" />
            Mood
          </TabButton>

          {/* Custom drink creation tab */}
          <TabButton
            isActive={activeTab === 'custom'}
            onClick={() => setActiveTab('custom')}
          >
            <Wand2 className="w-5 h-5 mr-1 sm:mr-2" />
            Create
          </TabButton>

          {/* Barista order queue tab */}
          <TabButton
            isActive={activeTab === 'barista'}
            onClick={() => setActiveTab('barista')}
          >
            <LayoutList className="w-5 h-5 mr-1 sm:mr-2" />
            Queue
          </TabButton>

          {/* Inventory management tab */}
          <TabButton
            isActive={activeTab === 'admin'}
            onClick={() => setActiveTab('admin')}
          >
            <SlidersHorizontal className="w-5 h-5 mr-1 sm:mr-2" />
            Inventory
          </TabButton>
        </div>

        {/* Main content area - conditionally renders based on active tab */}
        <main className="transition-all duration-500 min-h-[400px]">
          {activeTab === 'mood' && <MoodSelector />}
          {activeTab === 'custom' && <CustomCreator />}
          {activeTab === 'admin' && <AdminPanel />}
          {activeTab === 'barista' && <BaristaQueue />}
        </main>

        {/* Footer with branding and tagline */}
        <footer className="text-center mt-12 text-coffee-accent text-sm pb-8">
            <p className="font-medium">Powered by Brewtelligence from The Custom Cup.</p>
            <p className="opacity-70 mt-1 italic">Voted "Best Pixelated Espresso" 2026</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
