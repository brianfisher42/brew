import React, { useState } from 'react';
import { Header } from './components/Header';
import { MoodSelector } from './components/MoodSelector';
import { CustomCreator } from './components/CustomCreator';
import { TabButton } from './components/TabButton';
import { Coffee, Wand2, SlidersHorizontal, LayoutList } from 'lucide-react';
import { AdminPanel } from './components/AdminPanel';
import { BaristaQueue } from './components/BaristaQueue';

type ActiveTab = 'mood' | 'custom' | 'admin' | 'barista';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('mood');

  return (
    <div className="min-h-screen bg-coffee-cream text-coffee-dark font-sans flex flex-col items-center p-4 sm:p-6">
      <div className="w-full max-w-4xl mx-auto">
        <Header />
        
        <div className="my-8 flex flex-wrap justify-center bg-coffee-dark/5 p-1 rounded-3xl sm:rounded-full shadow-inner w-full max-w-2xl mx-auto">
          <TabButton
            isActive={activeTab === 'mood'}
            onClick={() => setActiveTab('mood')}
          >
            <Coffee className="w-5 h-5 mr-1 sm:mr-2" />
            Mood
          </TabButton>
          <TabButton
            isActive={activeTab === 'custom'}
            onClick={() => setActiveTab('custom')}
          >
            <Wand2 className="w-5 h-5 mr-1 sm:mr-2" />
            Create
          </TabButton>
          <TabButton
            isActive={activeTab === 'barista'}
            onClick={() => setActiveTab('barista')}
          >
            <LayoutList className="w-5 h-5 mr-1 sm:mr-2" />
            Queue
          </TabButton>
           <TabButton
            isActive={activeTab === 'admin'}
            onClick={() => setActiveTab('admin')}
          >
            <SlidersHorizontal className="w-5 h-5 mr-1 sm:mr-2" />
            Inventory
          </TabButton>
        </div>

        <main className="transition-all duration-500 min-h-[400px]">
          {activeTab === 'mood' && <MoodSelector />}
          {activeTab === 'custom' && <CustomCreator />}
          {activeTab === 'admin' && <AdminPanel />}
          {activeTab === 'barista' && <BaristaQueue />}
        </main>

        <footer className="text-center mt-12 text-coffee-accent text-sm pb-8">
            <p className="font-medium">Powered by Brewtelligence from The Custom Cup.</p>
            <p className="opacity-70 mt-1 italic">Voted "Best Pixelated Espresso" 2026</p>
        </footer>
      </div>
    </div>
  );
};

export default App;