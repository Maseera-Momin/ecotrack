import React, { useState } from 'react';
import { 
  Award, 
  Coffee, 
  BookOpen, 
  Printer, 
  Sparkles, 
  Check, 
  ShoppingBag, 
  TreePine, 
  Calendar,
  Leaf,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { GreenCreditContribution } from '../types';

interface CampusRewardsModuleProps {
  userCredits: number;
  contributions: GreenCreditContribution[];
  onRedeemReward?: (cost: number, title: string) => void;
}

interface RewardItem {
  id: string;
  title: string;
  category: string;
  credits: number;
  description: string;
  icon: any;
  popular?: boolean;
}

export const CampusRewardsModule: React.FC<CampusRewardsModuleProps> = ({
  userCredits,
  contributions,
  onRedeemReward,
}) => {
  const [claimedRewardId, setClaimedRewardId] = useState<string | null>(null);

  const rewards: RewardItem[] = [
    {
      id: 'reward-coffee',
      title: 'Free Campus Barista Coffee',
      category: 'Food & Beverage',
      credits: 150,
      description: 'Any hot or iced specialty coffee at the Central Student Cafeteria.',
      icon: Coffee,
      popular: true,
    },
    {
      id: 'reward-print',
      title: '100-Page Library Print Quota',
      category: 'Academic Services',
      credits: 100,
      description: 'Instant credit applied to your campus student card ID for campus printers.',
      icon: Printer,
    },
    {
      id: 'reward-bookstore',
      title: 'Campus Bookstore 15% Voucher',
      category: 'Retail & Supplies',
      credits: 300,
      description: 'Valid for textbooks, stationery, and institutional tech supplies.',
      icon: BookOpen,
      popular: true,
    },
    {
      id: 'reward-bottle',
      title: 'EcoTrack Reusable Steel Bottle',
      category: 'Merchandise',
      credits: 500,
      description: 'Double-walled insulated campus flask with laser-engraved student ID.',
      icon: ShoppingBag,
    },
    {
      id: 'reward-tree',
      title: 'Dedicate a Campus Tree',
      category: 'Environmental Impact',
      credits: 1000,
      description: 'A native sapling planted in the Campus Botanical Garden in your honor.',
      icon: TreePine,
    },
  ];

  const handleClaim = (item: RewardItem) => {
    if (userCredits < item.credits) return;
    setClaimedRewardId(item.id);
    if (onRedeemReward) {
      onRedeemReward(item.credits, item.title);
    }
    setTimeout(() => {
      setClaimedRewardId(null);
    }, 3000);
  };

  return (
    <div className="py-8 px-4 max-w-6xl mx-auto space-y-10 animate-fade-in font-sans">
      {/* Header Banner */}
      <div className="text-center max-w-xl mx-auto space-y-3">
        <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Campus Green Rewards
        </h2>
        <p className="text-sm text-slate-300">
          Turn your recycling efforts into tangible campus perks, discounts, and sustainability honors.
        </p>

        {/* User Balance Card */}
        <div className="pt-2 inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-semibold text-base shadow-sm">
          <Leaf className="w-5 h-5 text-emerald-400" />
          <span>Available Balance: {userCredits.toLocaleString()} Credits</span>
        </div>
      </div>

      {/* Rewards Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-white">Redeem Perks</h3>
          <span className="text-xs text-slate-400">Instant barcode delivered to student email</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {rewards.map((item) => {
            const Icon = item.icon;
            const canAfford = userCredits >= item.credits;
            const isClaimed = claimedRewardId === item.id;

            return (
              <div
                key={item.id}
                className="relative rounded-2xl bg-slate-900/80 border border-white/10 p-6 flex flex-col justify-between space-y-5 hover:border-emerald-500/40 transition-all shadow-md group"
              >
                {item.popular && (
                  <span className="absolute -top-2.5 right-4 px-2.5 py-0.5 rounded-full bg-emerald-500 text-slate-950 font-bold text-[10px] uppercase tracking-wide">
                    Popular
                  </span>
                )}

                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold text-emerald-400/90 uppercase tracking-wide">
                      {item.category}
                    </span>
                    <h4 className="text-lg font-bold text-white mt-0.5">
                      {item.title}
                    </h4>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-white/[0.06]">
                  <div className="text-sm font-bold text-white">
                    {item.credits} <span className="text-xs text-emerald-400 font-medium">Credits</span>
                  </div>

                  <button
                    onClick={() => handleClaim(item)}
                    disabled={!canAfford || isClaimed}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      isClaimed
                        ? 'bg-emerald-500 text-slate-950 font-bold'
                        : canAfford
                        ? 'bg-emerald-500/20 hover:bg-emerald-500 text-emerald-300 hover:text-slate-950 border border-emerald-500/30'
                        : 'bg-white/5 text-slate-500 cursor-not-allowed'
                    }`}
                  >
                    {isClaimed ? (
                      <>
                        <Check className="w-4 h-4 stroke-[3]" />
                        <span>Redeemed!</span>
                      </>
                    ) : (
                      <span>{canAfford ? 'Redeem Perk' : 'Need More Credits'}</span>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Clean Recent Student Activity */}
      <div className="space-y-4 pt-4">
        <h3 className="text-xl font-bold text-white">Recent Verified Deposits</h3>

        <div className="rounded-2xl bg-slate-900/80 border border-white/10 overflow-hidden divide-y divide-white/5">
          {contributions.slice(0, 6).map((c) => (
            <div key={c.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-sm">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-white">{c.wasteType}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                    {c.category}
                  </span>
                </div>
                <div className="text-xs text-slate-400 flex items-center gap-3">
                  <span>{c.user.split('(')[0].trim()}</span>
                  <span>•</span>
                  <span>{c.disposalLocation}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-center">
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{c.submissionDate}</span>
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-emerald-500/15 text-emerald-300 font-bold text-xs">
                  +{c.pointsAwarded} Credits
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
