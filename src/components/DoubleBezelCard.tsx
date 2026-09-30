import React from 'react';

interface DoubleBezelCardProps {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  glow?: 'emerald' | 'cyan' | 'amber' | 'rose' | 'none';
  onClick?: () => void;
}

export const DoubleBezelCard: React.FC<DoubleBezelCardProps> = ({
  children,
  className = '',
  innerClassName = '',
  glow = 'none',
  onClick,
}) => {
  const glowClasses = {
    emerald: 'hover:shadow-glow-emerald border-eco-500/20',
    cyan: 'hover:shadow-glow-cyan border-cyan-500/20',
    amber: 'hover:shadow-glow-amber border-amber-500/20',
    rose: 'hover:shadow-glow-rose border-rose-500/20',
    none: 'border-white/[0.07]',
  };

  return (
    <div
      onClick={onClick}
      className={`relative rounded-[1.75rem] p-1.5 bg-gradient-to-b from-white/[0.06] to-white/[0.01] border transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${glowClasses[glow]} ${className}`}
    >
      <div
        className={`relative w-full h-full rounded-[calc(1.75rem-0.375rem)] bg-obsidian-900/90 backdrop-blur-xl border border-white/[0.05] shadow-inner-bezel p-6 ${innerClassName}`}
      >
        {children}
      </div>
    </div>
  );
};
