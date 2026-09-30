import React, { useState, useEffect } from 'react';
import { 
  X, 
  ChevronRight, 
  ChevronLeft, 
  Sparkles, 
  CheckCircle2, 
  ExternalLink,
  Play,
  Pause,
  Layers,
  ArrowRight
} from 'lucide-react';

interface JudgeDemoTourProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onSelectSample: (sampleId: string) => void;
}

export const JudgeDemoTour: React.FC<JudgeDemoTourProps> = ({
  isOpen,
  onClose,
  setActiveTab,
  onSelectSample,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);

  const demoSteps = [
    {
      step: 1,
      title: 'STEP 1 — CLASSIFY',
      subtitle: 'Camera AI Waste Classification',
      tab: 'classify',
      description:
        'Open Identify Waste, trigger the device camera or pick the demo plastic bottle. The computer vision model determines the category (Dry Recyclable) with 94% confidence and shows recommended disposal + reward potential.',
      actionLabel: 'Test Camera & Classify Bottle',
      executeAction: () => {
        setActiveTab('classify');
        onSelectSample('sample-plastic-bottle');
      },
      highlightPill: 'AI / Computer Vision',
    },
    {
      step: 2,
      title: 'STEP 2 — DISPOSE',
      subtitle: 'Campus Location Mapping & Submission',
      tab: 'classify',
      description:
        'View the designated disposal location (Campus Blue Bin #07 at CSE Atrium). The student registers their physical disposal contribution, which enters the tamper-evident queue in "Submitted" status.',
      actionLabel: 'Submit Disposal Contribution',
      executeAction: () => {
        setActiveTab('classify');
      },
      highlightPill: 'Disposal Logistics',
    },
    {
      step: 3,
      title: 'STEP 3 — VERIFY + REWARD',
      subtitle: 'Green Credits & Anti-Fraud Verification',
      tab: 'reward',
      description:
        'Points are NOT awarded blindly. The contribution undergoes optical and weight validation to prevent double-claiming. Once verified, +10 Green Credits are credited to Alex Chen (#GC-1042).',
      actionLabel: 'Inspect Green Credits Ledger',
      executeAction: () => {
        setActiveTab('reward');
      },
      highlightPill: 'Verification & Anti-Fraud',
    },
    {
      step: 4,
      title: 'STEP 4 — TRACK E-WASTE',
      subtitle: 'QR & Barcode Asset Dual-Tagging',
      tab: 'track',
      description:
        'Explore institutional e-waste tracking for decommissioned equipment. Inspect Dell Latitude 5420 (EW-2026-001) with live generated SVG QR and Barcodes, department ownership, and serial tags.',
      actionLabel: 'Open Asset EW-2026-001',
      executeAction: () => {
        setActiveTab('track');
      },
      highlightPill: 'QR + Barcode Audit',
    },
    {
      step: 5,
      title: 'STEP 5 — SHOW AUDIT TRAIL',
      subtitle: 'Certified E-Recycler Chain of Custody',
      tab: 'track',
      description:
        'E-waste does not end with "Recycled". Inspect the complete 8-stage custody timeline from CSE Lab 204 to GreenCycle E-Waste Solutions (Cert #CERT-DEMO-2026-018) with signed timestamps and verifiers.',
      actionLabel: 'View Custody Timeline',
      executeAction: () => {
        setActiveTab('track');
      },
      highlightPill: 'Institutional Compliance',
    },
    {
      step: 6,
      title: 'STEP 6 — PREDICT',
      subtitle: 'Smart-Bin Telemetry & Overflow AI',
      tab: 'predict',
      description:
        'Examine BIN-CSE-07 telemetry time-series: 42% → 51% → 63% → 76% → 88% → 94%. The predictive engine calculates +8.5%/hr fill rate, forecasts overflow in 1h 18m, and automatically generates a Critical collection dispatch.',
      actionLabel: 'Inspect Overflow Forecast',
      executeAction: () => {
        setActiveTab('predict');
      },
      highlightPill: 'Time-Series & Prediction',
    },
    {
      step: 7,
      title: 'STEP 7 — ADMIN IMPACT',
      subtitle: 'Campus Segregation & Contamination Analytics',
      tab: 'analytics',
      description:
        'Campus-wide sustainability dashboard: 42% Biodegradable, 38% Dry Recyclable, 20% E-Waste. Track 87% segregation accuracy, 13% contamination rate, cafeteria hotspots, and the interactive campus bin map.',
      actionLabel: 'View Campus KPI Analytics',
      executeAction: () => {
        setActiveTab('analytics');
      },
      highlightPill: 'Executive Intelligence',
    },
  ];

  // Auto-play timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isAutoPlaying && isOpen) {
      timer = setTimeout(() => {
        if (currentStep < demoSteps.length - 1) {
          goToStep(currentStep + 1);
        } else {
          setIsAutoPlaying(false);
        }
      }, 7000);
    }
    return () => clearTimeout(timer);
  }, [isAutoPlaying, currentStep, isOpen]);

  const goToStep = (index: number) => {
    setCurrentStep(index);
    demoSteps[index].executeAction();
  };

  if (!isOpen) return null;

  const current = demoSteps[currentStep];

  return (
    <div className="fixed inset-x-0 bottom-6 z-50 px-4 max-w-4xl mx-auto animate-fade-in pointer-events-auto">
      <div className="relative rounded-2xl bg-obsidian-900/95 backdrop-blur-2xl border-2 border-eco-500/40 shadow-[0_20px_60px_rgba(0,0,0,0.85)] p-5 text-slate-100 overflow-hidden">
        {/* Glow accent */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-eco-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

        {/* Top Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/[0.08] mb-4">
          <div className="flex items-center gap-3">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-eco-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-eco-500"></span>
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-sm tracking-wide text-white">
                  JUDGE HACKATHON DEMO WALKTHROUGH
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-eco-500/20 text-eco-300 font-semibold">
                  PRD §23 Verification Mode
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Step {currentStep + 1} of {demoSteps.length}: {current.subtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono border transition-all ${
                isAutoPlaying
                  ? 'bg-eco-500/20 border-eco-500/40 text-eco-300'
                  : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
              }`}
            >
              {isAutoPlaying ? (
                <>
                  <Pause className="w-3 h-3 fill-current" />
                  <span>Pause Auto</span>
                </>
              ) : (
                <>
                  <Play className="w-3 h-3 fill-current" />
                  <span>Auto-Play</span>
                </>
              )}
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Step Progress Pill Bar */}
        <div className="grid grid-cols-7 gap-1.5 mb-4">
          {demoSteps.map((s, idx) => {
            const isCompleted = idx < currentStep;
            const isCurrent = idx === currentStep;
            return (
              <button
                key={idx}
                onClick={() => goToStep(idx)}
                className={`h-2 rounded-full transition-all duration-300 relative group ${
                  isCurrent
                    ? 'bg-eco-400 shadow-glow-emerald'
                    : isCompleted
                    ? 'bg-eco-700/80'
                    : 'bg-white/10 hover:bg-white/20'
                }`}
                title={`Step ${idx + 1}: ${s.subtitle}`}
              >
                <span className="absolute -top-7 left-1/2 -translate-x-1/2 hidden group-hover:block bg-obsidian-950 text-[10px] font-mono px-2 py-0.5 rounded border border-white/10 whitespace-nowrap text-eco-300 z-20">
                  {idx + 1}. {s.subtitle}
                </span>
              </button>
            );
          })}
        </div>

        {/* Content Box */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <div className="md:col-span-2 space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-eco-400 bg-eco-950/70 border border-eco-500/30 px-2 py-0.5 rounded">
                {current.title}
              </span>
              <span className="text-[11px] font-mono text-slate-400">
                {current.highlightPill}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
              {current.description}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-2 justify-end">
            <button
              onClick={current.executeAction}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-eco-500 hover:bg-eco-400 text-obsidian-950 font-bold text-xs shadow-glow-emerald transition-all active:scale-[0.98]"
            >
              <span>{current.actionLabel}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <div className="flex items-center justify-between gap-2">
              <button
                disabled={currentStep === 0}
                onClick={() => goToStep(currentStep - 1)}
                className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none text-xs font-mono border border-white/5 transition-all text-slate-300"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Prev</span>
              </button>

              <button
                disabled={currentStep === demoSteps.length - 1}
                onClick={() => goToStep(currentStep + 1)}
                className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 disabled:opacity-30 disabled:pointer-events-none text-xs font-mono border border-white/10 transition-all text-eco-300 font-semibold"
              >
                <span>Next</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
