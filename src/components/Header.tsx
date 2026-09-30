import React from 'react';
import { 
  Camera, 
  BarChart3, 
  Award, 
  Leaf, 
  ArrowRight
} from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  userCredits: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  userCredits,
}) => {
  const navItems = [
    { id: 'classify', label: 'Waste Scanner', icon: Camera },
    { id: 'analytics', label: 'Campus Impact', icon: BarChart3 },
    { id: 'rewards', label: 'Green Rewards', icon: Award },
  ];

  return (
    <header className="sticky top-4 z-40 px-4 max-w-6xl mx-auto w-full transition-all duration-300">
      <div className="relative rounded-2xl bg-slate-900/90 backdrop-blur-xl border border-white/10 shadow-xl px-4 py-3 flex items-center justify-between gap-4">
        {/* Brand Identity */}
        <button
          onClick={() => setActiveTab('hero')}
          className="flex items-center gap-3 text-left focus:outline-none group"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
            <Leaf className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold tracking-tight text-white text-lg">
                Eco<span className="text-emerald-400">Track</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 font-normal">
              Campus Smart Waste & Rewards
            </p>
          </div>
        </button>

        {/* Central Nav Links */}
        <nav className="hidden md:flex items-center gap-1.5 p-1 rounded-xl bg-white/[0.04] border border-white/[0.06]">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
                  isActive
                    ? 'text-slate-950 bg-emerald-400 shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-white/[0.06]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Side: Credits & Quick Action */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 text-xs sm:text-sm font-semibold">
            <Leaf className="w-3.5 h-3.5 text-emerald-400" />
            <span>{userCredits.toLocaleString()} Credits</span>
          </div>

          <button
            onClick={() => setActiveTab('classify')}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs sm:text-sm font-bold shadow-md hover:shadow-emerald-500/25 active:scale-95 transition-all"
          >
            <span>Scan Waste</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
