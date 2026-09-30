import React, { useState } from 'react';
import { 
  Award, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  AlertOctagon, 
  Sparkles, 
  Coffee, 
  BookOpen, 
  Printer, 
  ChevronRight, 
  Filter, 
  ArrowUpRight,
  TrendingUp,
  UserCheck
} from 'lucide-react';
import { INITIAL_GREEN_CREDITS } from '../data/initialData';
import { GreenCreditContribution, GreenCreditStatus } from '../types';
import { DoubleBezelCard } from './DoubleBezelCard';

interface RewardModuleProps {
  contributions: GreenCreditContribution[];
  onVerifyContribution: (id: string) => void;
  onRejectContribution: (id: string) => void;
  userCredits: number;
}

export const RewardModule: React.FC<RewardModuleProps> = ({
  contributions,
  onVerifyContribution,
  onRejectContribution,
  userCredits,
}) => {
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [duplicateTestAlert, setDuplicateTestAlert] = useState<string | null>(null);

  const filtered = contributions.filter(
    (c) => filterStatus === 'All' || c.status === filterStatus
  );

  const getStatusBadge = (status: GreenCreditStatus) => {
    switch (status) {
      case 'Rewarded':
        return 'bg-eco-500/20 text-eco-300 border-eco-500/40 shadow-glow-emerald';
      case 'Verified':
        return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40';
      case 'Pending Verification':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'Rejected':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/40';
    }
  };

  const handleTestDuplicateFraud = () => {
    setDuplicateTestAlert('ANTI-FRAUD SYSTEM FLAG: Duplicate submission detected for #GC-1042 hash [HASH_PET_CSE_20260930_1124]. Item has already been verified and rewarded. Second attempt rejected.');
    setTimeout(() => {
      setDuplicateTestAlert(null);
    }, 5000);
  };

  return (
    <div className="py-8 px-4 max-w-7xl mx-auto space-y-8 animate-fade-in">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-white/[0.08]">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-eco-950/60 border border-eco-500/30 text-eco-400 text-xs font-mono mb-2">
            <Award className="w-3.5 h-3.5" />
            <span>MODULE 04 — GREEN CREDITS VERIFICATION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
            Verified Green Credits & Anti-Fraud Ledger
          </h2>
          <p className="text-sm text-slate-400 max-w-2xl mt-1">
            Tamper-evident verification workflow ensuring points are only awarded upon validated sensor and weight physical disposal.
          </p>
        </div>

        {/* Anti-Fraud Test Action */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleTestDuplicateFraud}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 font-mono text-xs transition-all"
          >
            <AlertOctagon className="w-4 h-4 text-rose-400" />
            <span>Simulate Duplicate Fraud Attempt</span>
          </button>
        </div>
      </div>

      {/* Duplicate Fraud Alert Banner */}
      {duplicateTestAlert && (
        <div className="p-4 rounded-2xl bg-rose-500/15 border-2 border-rose-500/40 text-rose-200 font-mono text-xs flex items-center justify-between gap-3 shadow-glow-rose animate-fade-in">
          <div className="flex items-center gap-2">
            <AlertOctagon className="w-5 h-5 text-rose-400 flex-shrink-0 animate-pulse" />
            <span>{duplicateTestAlert}</span>
          </div>
          <button
            onClick={() => setDuplicateTestAlert(null)}
            className="text-xs text-rose-400 font-bold hover:underline"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Top Workflow Explanation Bar (PRD Section 8: SUBMITTED -> VERIFIED -> REWARDED) */}
      <div className="p-4 rounded-2xl bg-obsidian-900 border border-white/[0.08] shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <span className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
            Mandatory Verification Lifecycle:
          </span>
          <div className="flex items-center gap-2 sm:gap-4 font-mono text-xs">
            <span className="px-3 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 font-bold">
              1. SUBMITTED
            </span>
            <span className="text-slate-600">→</span>
            <span className="px-3 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-bold">
              2. VERIFIED
            </span>
            <span className="text-slate-600">→</span>
            <span className="px-3 py-1 rounded-lg bg-eco-500/20 border border-eco-500/40 text-eco-300 font-bold shadow-glow-emerald">
              3. REWARDED (+GC)
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid: Verification Ledger vs Student Wallet & Rewards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Verification Ledger (8 Cols) */}
        <div className="lg:col-span-8 space-y-4">
          <DoubleBezelCard innerClassName="p-5 sm:p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/[0.08]">
              <div>
                <h3 className="text-base font-display font-bold text-white">
                  Institutional Verification Ledger
                </h3>
                <p className="text-xs text-slate-400">
                  Every user submission with timestamp, optical hash, and smart-bin audit source.
                </p>
              </div>

              {/* Status Filters */}
              <div className="flex items-center gap-1 overflow-x-auto text-[11px] font-mono scrollbar-none">
                {['All', 'Pending Verification', 'Verified', 'Rewarded', 'Rejected'].map(
                  (st) => (
                    <button
                      key={st}
                      onClick={() => setFilterStatus(st)}
                      className={`px-2.5 py-1 rounded-lg flex-shrink-0 transition-all ${
                        filterStatus === st
                          ? 'bg-eco-500/20 text-eco-300 border border-eco-500/30 font-bold'
                          : 'text-slate-400 hover:text-white bg-white/[0.02]'
                      }`}
                    >
                      {st}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Contributions Table / Cards */}
            <div className="space-y-3">
              {filtered.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-xl bg-obsidian-950/70 border border-white/5 hover:border-white/15 transition-all space-y-2.5"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-eco-400 bg-eco-950/70 border border-eco-500/30 px-2 py-0.5 rounded">
                        #{item.contributionId}
                      </span>
                      <span className="text-xs font-bold text-white">
                        {item.wasteType}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">
                        ({item.category})
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full border font-bold ${getStatusBadge(
                          item.status
                        )}`}
                      >
                        {item.status}
                      </span>
                      <span className="text-xs font-mono font-bold text-eco-400">
                        +{item.pointsAwarded} GC
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300 font-mono">
                    <div>
                      <span className="text-slate-500">Student: </span>
                      <span className="text-slate-200">{item.user}</span>
                    </div>
                    <div>
                      <span className="text-slate-500">Location: </span>
                      <span className="text-slate-200">{item.disposalLocation}</span>
                    </div>
                    <div>
                      <span className="text-slate-500">Submitted: </span>
                      <span className="text-slate-400">{item.submissionDate}</span>
                    </div>
                    <div>
                      <span className="text-slate-500">Verified: </span>
                      <span className="text-eco-400/90">{item.verificationDate || 'Pending review'}</span>
                    </div>
                  </div>

                  <div className="pt-1 text-[11px] font-mono text-slate-400 flex items-center justify-between border-t border-white/5">
                    <span>Source: {item.verificationSource}</span>
                    {item.status === 'Pending Verification' && (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onVerifyContribution(item.id)}
                          className="px-2.5 py-1 rounded bg-eco-500/20 hover:bg-eco-500/30 border border-eco-500/40 text-eco-300 text-[10px] font-bold"
                        >
                          Admin Verify (+GC)
                        </button>
                        <button
                          onClick={() => onRejectContribution(item.id)}
                          className="px-2.5 py-1 rounded bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-rose-300 text-[10px] font-bold"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </DoubleBezelCard>
        </div>

        {/* Right Side: Student Green Credit Wallet & Rewards (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* User Balance Wallet Card */}
          <DoubleBezelCard glow="emerald" innerClassName="p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-eco-400" />
                <h4 className="font-display font-bold text-white text-base">
                  Campus Eco-Wallet
                </h4>
              </div>
              <span className="text-[10px] font-mono text-eco-400 px-2 py-0.5 rounded bg-eco-500/10 border border-eco-500/20 font-bold">
                Level 4 Ranger
              </span>
            </div>

            <div className="text-center py-2 space-y-1">
              <div className="text-4xl font-mono font-extrabold text-white tracking-tight">
                {userCredits.toLocaleString()}
              </div>
              <div className="text-xs font-mono text-eco-400 font-semibold uppercase tracking-wider">
                Total Verified Green Credits
              </div>
              <p className="text-[11px] text-slate-400 pt-1">
                Equivalent to <strong>24.2 kg CO₂e offset</strong> this semester
              </p>
            </div>

            {/* Campus Leaderboard Snippet */}
            <div className="p-3.5 rounded-xl bg-obsidian-950/80 border border-white/5 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <span>Campus Leaderboard</span>
                <span className="text-eco-400 font-bold">Rank #1 (Alex Chen)</span>
              </div>
              <div className="space-y-1 text-xs font-mono">
                <div className="flex justify-between text-white font-bold">
                  <span>1. Alex Chen (CSE)</span>
                  <span>1,420 GC</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>2. Priya Sharma (Env)</span>
                  <span>1,190 GC</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>3. Tariq Al-Mansoor (ME)</span>
                  <span>980 GC</span>
                </div>
              </div>
            </div>

            {/* Campus Redemption Catalog */}
            <div className="space-y-2 pt-1">
              <span className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider block">
                Green Credit Redemptions
              </span>

              <div className="space-y-2">
                <div className="p-3 rounded-xl bg-obsidian-950/60 border border-white/5 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <Coffee className="w-4 h-4 text-amber-400" />
                    <div>
                      <div className="font-semibold text-white">Campus Cafe Pass</div>
                      <div className="text-[10px] text-slate-400">Organic brew & snack</div>
                    </div>
                  </div>
                  <span className="font-mono text-xs text-eco-400 font-bold">150 GC</span>
                </div>

                <div className="p-3 rounded-xl bg-obsidian-950/60 border border-white/5 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <BookOpen className="w-4 h-4 text-cyan-400" />
                    <div>
                      <div className="font-semibold text-white">University Bookstore</div>
                      <div className="text-[10px] text-slate-400">15% sustainable supplies</div>
                    </div>
                  </div>
                  <span className="font-mono text-xs text-eco-400 font-bold">300 GC</span>
                </div>

                <div className="p-3 rounded-xl bg-obsidian-950/60 border border-white/5 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <Printer className="w-4 h-4 text-eco-400" />
                    <div>
                      <div className="font-semibold text-white">3D Maker Lab Hours</div>
                      <div className="text-[10px] text-slate-400">Recycled PLA filament print</div>
                    </div>
                  </div>
                  <span className="font-mono text-xs text-eco-400 font-bold">450 GC</span>
                </div>
              </div>
            </div>
          </DoubleBezelCard>
        </div>
      </div>
    </div>
  );
};
