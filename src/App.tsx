import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ClassifyModule } from './components/ClassifyModule';
import { AnalyticsModule } from './components/AnalyticsModule';
import { CampusRewardsModule } from './components/CampusRewardsModule';
import { INITIAL_GREEN_CREDITS } from './data/initialData';
import { ClassificationResult, GreenCreditContribution } from './types';
import { Leaf, CheckCircle2 } from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState<string>('classify');
  const [userCredits, setUserCredits] = useState<number>(48920);
  const [contributions, setContributions] = useState<GreenCreditContribution[]>(INITIAL_GREEN_CREDITS);
  const [globalToast, setGlobalToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setGlobalToast(msg);
    setTimeout(() => {
      setGlobalToast(null);
    }, 4000);
  };

  const handleDisposalSubmitted = (item: ClassificationResult) => {
    const newContrib: GreenCreditContribution = {
      id: `gc-${Date.now()}`,
      contributionId: `GC-${Math.floor(1000 + Math.random() * 9000)}`,
      user: 'You (Campus Student)',
      wasteType: item.item,
      category: item.category,
      disposalLocation: item.disposalLocation.split('—')[0].trim(),
      submissionDate: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      verificationSource: 'Campus Smart Deposit',
      pointsAwarded: item.greenCredits,
      status: 'Rewarded',
      duplicateHash: `VERIFIED_${Date.now()}`,
    };

    setContributions([newContrib, ...contributions]);
    setUserCredits((prev) => prev + item.greenCredits);
    showToast(`Deposited ${item.item}! +${item.greenCredits} Green Credits added to your account.`);
  };

  const handleRedeemReward = (cost: number, title: string) => {
    setUserCredits((prev) => Math.max(0, prev - cost));
    showToast(`Claimed "${title}"! -${cost} Credits.`);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-slate-950 font-sans relative overflow-x-hidden">
      {/* Soft Background Ambiance */}
      <div className="fixed top-0 left-1/3 w-[600px] h-[350px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none z-0"></div>
      <div className="fixed bottom-0 right-1/4 w-[600px] h-[350px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none z-0"></div>

      {/* Clean Floating Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userCredits={userCredits}
      />

      {/* Global Toast */}
      {globalToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-2xl bg-slate-900 border border-emerald-500/40 text-emerald-300 text-xs sm:text-sm font-semibold shadow-2xl flex items-center gap-2.5 animate-fade-in backdrop-blur-xl">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>{globalToast}</span>
        </div>
      )}

      {/* Main View Area */}
      <main className="flex-1 z-10">
        {activeTab === 'hero' && (
          <HeroSection onNavigate={setActiveTab} />
        )}

        {activeTab === 'classify' && (
          <ClassifyModule
            onDisposalSubmitted={handleDisposalSubmitted}
            isDemoMode={false}
          />
        )}

        {activeTab === 'analytics' && <AnalyticsModule />}

        {activeTab === 'rewards' && (
          <CampusRewardsModule
            userCredits={userCredits}
            contributions={contributions}
            onRedeemReward={handleRedeemReward}
          />
        )}
      </main>

      {/* Clean, Human-Designed Footer */}
      <footer className="border-t border-white/10 bg-slate-900/60 backdrop-blur-xl py-10 px-4 mt-20 z-10">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Leaf className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-white text-sm">EcoTrack</span>
              <p className="text-[11px] text-slate-400">Campus Waste Intelligence & Circular Recycling</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => setActiveTab('classify')}
              className="hover:text-white transition-colors"
            >
              Waste Scanner
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className="hover:text-white transition-colors"
            >
              Campus Impact
            </button>
            <button
              onClick={() => setActiveTab('rewards')}
              className="hover:text-white transition-colors"
            >
              Green Rewards
            </button>
          </div>

          <div className="text-[11px] text-slate-500">
            Empowering cleaner university campuses.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
