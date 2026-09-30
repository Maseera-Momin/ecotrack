import React from 'react';
import { 
  Camera, 
  ArrowRight, 
  Award, 
  CheckCircle2, 
  Sparkles,
  MapPin,
  Leaf
} from 'lucide-react';

interface HeroSectionProps {
  onNavigate: (tab: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  return (
    <section className="relative pt-10 pb-16 px-4 max-w-6xl mx-auto font-sans">
      {/* Ambient warm gradient */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[320px] bg-emerald-500/10 blur-[120px] pointer-events-none rounded-full"></div>
      
      {/* Clean Eyebrow */}
      <div className="flex justify-center mb-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 text-xs sm:text-sm font-medium">
          <Leaf className="w-4 h-4 text-emerald-400" />
          <span>Campus Sustainability & Smart Recycling</span>
        </div>
      </div>

      {/* Main Headline */}
      <div className="text-center max-w-3xl mx-auto mb-10 space-y-4">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
          Classify waste in seconds.{' '}
          <span className="text-emerald-400">
            Earn green credits.
          </span>
        </h1>
        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Hold any item up to your front camera or upload a picture. EcoTrack identifies plastics, electronics, and compostables, directing you to the nearest campus bin.
        </p>

        {/* Action Buttons */}
        <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => onNavigate('classify')}
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm sm:text-base shadow-lg hover:shadow-emerald-500/25 active:scale-95 transition-all"
          >
            <Camera className="w-5 h-5" />
            <span>Open Waste Scanner</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => onNavigate('rewards')}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white/[0.05] hover:bg-white/[0.1] text-white border border-white/10 font-semibold text-sm transition-all"
          >
            <Award className="w-4 h-4 text-emerald-400" />
            <span>View Campus Rewards</span>
          </button>
        </div>
      </div>

      {/* Clean Impact Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto mb-16">
        <div className="p-5 rounded-2xl bg-slate-900/70 border border-white/[0.08] text-center space-y-1">
          <div className="text-2xl sm:text-3xl font-bold text-white">28,450 kg</div>
          <div className="text-xs text-slate-400 font-medium">Waste Diverted from Landfill</div>
        </div>
        <div className="p-5 rounded-2xl bg-slate-900/70 border border-white/[0.08] text-center space-y-1">
          <div className="text-2xl sm:text-3xl font-bold text-emerald-400">87%</div>
          <div className="text-xs text-slate-400 font-medium">Source Segregation Accuracy</div>
        </div>
        <div className="p-5 rounded-2xl bg-slate-900/70 border border-white/[0.08] text-center space-y-1">
          <div className="text-2xl sm:text-3xl font-bold text-cyan-400">48,920</div>
          <div className="text-xs text-slate-400 font-medium">Green Credits Awarded</div>
        </div>
      </div>

      {/* 3 Simple Steps */}
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-bold text-white">How EcoTrack Works</h2>
          <p className="text-sm text-slate-400">Three easy steps to keep our campus green and clean</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/[0.06] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
              1
            </div>
            <h3 className="text-lg font-semibold text-white">Show Your Item</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Use your front camera or upload a photo of any bottle, container, mouse, phone, or food waste.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/[0.06] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-bold">
              2
            </div>
            <h3 className="text-lg font-semibold text-white">AI Classification</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              The vision system classifies the material and directs you to the exact Blue, Green, or Red campus bin.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/[0.06] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold">
              3
            </div>
            <h3 className="text-lg font-semibold text-white">Earn & Redeem</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Claim verified Green Credits and redeem them for cafeteria coffee, bookstore vouchers, and print quotas.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
