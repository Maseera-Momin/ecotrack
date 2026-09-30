import React, { useState } from 'react';
import { 
  Activity, 
  TrendingUp, 
  AlertTriangle, 
  Truck, 
  Clock, 
  Thermometer, 
  ShieldAlert, 
  CheckCircle2, 
  Sparkles, 
  Sliders, 
  Radio, 
  RefreshCw,
  MapPin,
  Flame,
  ArrowRight
} from 'lucide-react';
import { INITIAL_SMART_BINS } from '../data/initialData';
import { SmartBin, SmartBinAlertLevel } from '../types';
import { DoubleBezelCard } from './DoubleBezelCard';

export const PredictModule: React.FC = () => {
  const [bins, setBins] = useState<SmartBin[]>(INITIAL_SMART_BINS);
  const [selectedBin, setSelectedBin] = useState<SmartBin>(INITIAL_SMART_BINS[0]);
  const [isSimulatingLiveTick, setIsSimulatingLiveTick] = useState<boolean>(true);
  const [dispatchAlertToast, setDispatchAlertToast] = useState<string | null>(null);
  const [sensorMode, setSensorMode] = useState<'demo' | 'iot'>('demo');

  const getAlertBadge = (status: SmartBinAlertLevel) => {
    switch (status) {
      case 'Critical':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/40 shadow-glow-rose';
      case 'Warning':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-glow-amber';
      case 'Normal':
        return 'bg-eco-500/20 text-eco-300 border-eco-500/40';
      case 'Overflow':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/40 animate-pulse';
    }
  };

  const handleDispatch = (bin: SmartBin) => {
    setDispatchAlertToast(`Collection team dispatched for ${bin.binId} (${bin.location}). Estimated arrival: 14 mins.`);
    setTimeout(() => {
      setDispatchAlertToast(null);
    }, 4500);
  };

  // SVG Chart Dimensions
  const chartWidth = 580;
  const chartHeight = 220;
  const padding = { top: 20, right: 30, bottom: 40, left: 45 };

  const graphWidth = chartWidth - padding.left - padding.right;
  const graphHeight = chartHeight - padding.top - padding.bottom;

  // Build SVG path points for selectedBin historicalTelemetry
  const telemetry = selectedBin.historicalTelemetry;
  const points = telemetry.map((pt, idx) => {
    const x = padding.left + (idx / (telemetry.length - 1)) * graphWidth;
    const y = padding.top + graphHeight - (pt.fillLevel / 100) * graphHeight;
    return { x, y, ...pt };
  });

  const pathD = points.reduce((acc, p, idx) => {
    return `${acc} ${idx === 0 ? 'M' : 'L'} ${p.x} ${p.y}`;
  }, '');

  const areaD = `${pathD} L ${points[points.length - 1].x} ${padding.top + graphHeight} L ${points[0].x} ${padding.top + graphHeight} Z`;

  return (
    <div className="py-8 px-4 max-w-7xl mx-auto space-y-8 animate-fade-in">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-white/[0.08]">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/60 border border-amber-500/30 text-amber-400 text-xs font-mono mb-2">
            <Activity className="w-3.5 h-3.5" />
            <span>MODULE 03 — SMART BIN TELEMETRY & PREDICTIVE AI</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
            Predictive Smart-Bin Overflow Engine
          </h2>
          <p className="text-sm text-slate-400 max-w-2xl mt-1">
            Real-time ultrasonic fill monitoring, historical trend analysis, and dynamic collection dispatch forecasting.
          </p>
        </div>

        {/* Telemetry Mode Toggle (PRD Section 15) */}
        <div className="flex items-center gap-2 p-1.5 rounded-xl bg-obsidian-900 border border-white/10 text-xs font-mono">
          <button
            onClick={() => setSensorMode('demo')}
            className={`px-3 py-1 rounded-lg transition-all ${
              sensorMode === 'demo'
                ? 'bg-amber-500 text-obsidian-950 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Demo Telemetry
          </button>
          <button
            onClick={() => setSensorMode('iot')}
            className={`px-3 py-1 rounded-lg transition-all ${
              sensorMode === 'iot'
                ? 'bg-eco-500 text-obsidian-950 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            IoT Sensor Stream
          </button>
        </div>
      </div>

      {/* Dispatch Notification Toast */}
      {dispatchAlertToast && (
        <div className="p-4 rounded-2xl bg-amber-500/20 border-2 border-amber-500/40 text-amber-200 font-mono text-xs flex items-center justify-between gap-3 shadow-glow-amber animate-fade-in">
          <div className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-amber-400 flex-shrink-0 animate-bounce" />
            <span>{dispatchAlertToast}</span>
          </div>
          <button
            onClick={() => setDispatchAlertToast(null)}
            className="text-xs text-amber-400 font-bold hover:underline"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Main Grid: Smart Bin Grid vs Detailed Telemetry */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Campus Bins Grid (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <DoubleBezelCard innerClassName="p-4 sm:p-5 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                Monitored Smart Bins ({bins.length})
              </span>
              <span className="text-[10px] font-mono text-eco-400 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-eco-400 animate-pulse"></span>
                <span>Telemetry Live</span>
              </span>
            </div>

            <div className="space-y-2.5 max-h-[580px] overflow-y-auto pr-1">
              {bins.map((bin) => {
                const isSelected = selectedBin.id === bin.id;
                return (
                  <button
                    key={bin.id}
                    onClick={() => setSelectedBin(bin)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all duration-200 space-y-2 ${
                      isSelected
                        ? 'bg-amber-500/10 border-amber-500/50 shadow-glow-amber text-white'
                        : 'bg-obsidian-950/70 border-white/5 text-slate-300 hover:bg-white/5 hover:border-white/10'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-amber-400">
                        {bin.binId}
                      </span>
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded-full border font-semibold ${getAlertBadge(
                          bin.status
                        )}`}
                      >
                        {bin.status} ({bin.currentFill}%)
                      </span>
                    </div>

                    <div className="text-xs font-semibold text-white truncate">
                      {bin.location}
                    </div>

                    {/* Progress Fill Bar */}
                    <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          bin.currentFill >= 90
                            ? 'bg-rose-500'
                            : bin.currentFill >= 80
                            ? 'bg-amber-500'
                            : 'bg-eco-500'
                        }`}
                        style={{ width: `${bin.currentFill}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-0.5">
                      <span>Rate: +{bin.recentFillRate}%/hr</span>
                      <span className={bin.currentFill >= 90 ? 'text-rose-400 font-bold' : 'text-slate-300'}>
                        Overflow: {bin.estimatedOverflow}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </DoubleBezelCard>
        </div>

        {/* Right Side: Deep Telemetry & Predictive Line Chart (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          <DoubleBezelCard glow={selectedBin.status === 'Critical' ? 'rose' : 'amber'} innerClassName="p-6 space-y-6">
            {/* Bin Identity Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono font-bold text-amber-400 bg-amber-950/70 border border-amber-500/30 px-2.5 py-0.5 rounded">
                    {selectedBin.binId}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    Zone: {selectedBin.zone}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-display font-extrabold text-white">
                  {selectedBin.location}
                </h3>
                <p className="text-xs text-slate-400">
                  Category: <span className="text-eco-400 font-semibold">{selectedBin.wasteType}</span> · Updated: {selectedBin.lastUpdated}
                </p>
              </div>

              {/* Status Pill & Dispatch CTA */}
              <div className="flex flex-col items-end gap-2">
                <span
                  className={`text-xs font-mono px-3 py-1 rounded-full border font-bold ${getAlertBadge(
                    selectedBin.status
                  )}`}
                >
                  {selectedBin.status} Level ({selectedBin.currentFill}%)
                </span>
                <button
                  onClick={() => handleDispatch(selectedBin)}
                  className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-obsidian-950 font-bold text-xs shadow-glow-amber transition-all flex items-center gap-1.5 active:scale-95"
                >
                  <Truck className="w-3.5 h-3.5" />
                  <span>Dispatch Team</span>
                </button>
              </div>
            </div>

            {/* PREDICTIVE AI ENGINE CALLOUT (PRD Section 12) */}
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-mono font-bold text-amber-300 uppercase tracking-wider">
                    Predictive Overflow Model — Simulation Mode
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold">
                  PRD §12 Trend Analysis
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-2.5 rounded-xl bg-obsidian-950/70 border border-white/5">
                  <div className="text-[10px] font-mono text-slate-400 uppercase">Current Level</div>
                  <div className="text-lg font-mono font-bold text-white mt-0.5">
                    {selectedBin.currentFill}%
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-obsidian-950/70 border border-white/5">
                  <div className="text-[10px] font-mono text-slate-400 uppercase">Fill Velocity</div>
                  <div className="text-lg font-mono font-bold text-amber-400 mt-0.5">
                    +{selectedBin.recentFillRate}% / hr
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-obsidian-950/70 border border-white/5">
                  <div className="text-[10px] font-mono text-slate-400 uppercase">Est. Overflow</div>
                  <div className="text-lg font-mono font-bold text-rose-400 mt-0.5 flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{selectedBin.estimatedOverflow}</span>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-obsidian-950/70 border border-white/5">
                  <div className="text-[10px] font-mono text-slate-400 uppercase">Temperature</div>
                  <div className="text-lg font-mono font-bold text-cyan-400 mt-0.5 flex items-center gap-1">
                    <Thermometer className="w-4 h-4" />
                    <span>{selectedBin.temperature}°C</span>
                  </div>
                </div>
              </div>

              <div className="text-xs text-slate-300 flex items-center gap-2 pt-1 font-mono">
                <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>
                  <strong className="text-amber-300">Recommendation:</strong> {selectedBin.recommendation}
                </span>
              </div>
            </div>

            {/* TIME-SERIES TELEMETRY GRAPH (PRD Section 11: 42% -> 51% -> 63% -> 76% -> 88% -> 94%) */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-amber-400" />
                    <span>Historical Fill-Level Progression (Time-Series)</span>
                  </h4>
                  <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                    Telemetry: 42% → 51% → 63% → 76% → 88% → 94%
                  </p>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-400">
                  Every 2 Hours
                </span>
              </div>

              {/* Responsive SVG Line Chart */}
              <div className="w-full bg-obsidian-950/90 rounded-2xl border border-white/10 p-3 overflow-hidden shadow-inner">
                <svg
                  viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                  className="w-full h-auto max-h-56"
                >
                  <defs>
                    <linearGradient id="telemetryGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Threshold Lines */}
                  {/* Warning 80% */}
                  <line
                    x1={padding.left}
                    y1={padding.top + graphHeight * 0.2}
                    x2={chartWidth - padding.right}
                    y2={padding.top + graphHeight * 0.2}
                    stroke="#F59E0B"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                    opacity="0.5"
                  />
                  <text
                    x={chartWidth - padding.right}
                    y={padding.top + graphHeight * 0.2 - 4}
                    fill="#F59E0B"
                    fontSize="9"
                    fontFamily="monospace"
                    textAnchor="end"
                  >
                    80% WARNING
                  </text>

                  {/* Critical 90% */}
                  <line
                    x1={padding.left}
                    y1={padding.top + graphHeight * 0.1}
                    x2={chartWidth - padding.right}
                    y2={padding.top + graphHeight * 0.1}
                    stroke="#F43F5E"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                    opacity="0.6"
                  />
                  <text
                    x={chartWidth - padding.right}
                    y={padding.top + graphHeight * 0.1 - 4}
                    fill="#F43F5E"
                    fontSize="9"
                    fontFamily="monospace"
                    textAnchor="end"
                  >
                    90% CRITICAL
                  </text>

                  {/* Y Axis Grid Labels */}
                  {[0, 25, 50, 75, 100].map((val) => {
                    const y = padding.top + graphHeight - (val / 100) * graphHeight;
                    return (
                      <g key={val}>
                        <line
                          x1={padding.left}
                          y1={y}
                          x2={chartWidth - padding.right}
                          y2={y}
                          stroke="rgba(255,255,255,0.05)"
                          strokeWidth="1"
                        />
                        <text
                          x={padding.left - 8}
                          y={y + 3}
                          fill="#64748B"
                          fontSize="9"
                          fontFamily="monospace"
                          textAnchor="end"
                        >
                          {val}%
                        </text>
                      </g>
                    );
                  })}

                  {/* Fill Area Gradient */}
                  <path d={areaD} fill="url(#telemetryGrad)" />

                  {/* Main Line */}
                  <path
                    d={pathD}
                    fill="none"
                    stroke="#F59E0B"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Data Points & Time Labels */}
                  {points.map((pt, idx) => (
                    <g key={idx}>
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r="4"
                        fill="#0B121A"
                        stroke="#F59E0B"
                        strokeWidth="2"
                      />
                      <text
                        x={pt.x}
                        y={pt.y - 8}
                        fill="#FFFFFF"
                        fontSize="10"
                        fontFamily="monospace"
                        fontWeight="bold"
                        textAnchor="middle"
                      >
                        {pt.fillLevel}%
                      </text>
                      <text
                        x={pt.x}
                        y={chartHeight - 12}
                        fill="#94A3B8"
                        fontSize="10"
                        fontFamily="monospace"
                        textAnchor="middle"
                      >
                        {pt.time}
                      </text>
                    </g>
                  ))}
                </svg>
              </div>
            </div>

            {/* Collection Priority Routing (PRD Section 14) */}
            <div className="p-3.5 rounded-xl bg-obsidian-950/70 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase">
                  Automated Routing Assignment
                </span>
                <div className="font-semibold text-white mt-0.5">
                  {selectedBin.collectionPriority}
                </div>
              </div>

              <div className="flex items-center gap-2 font-mono text-[11px] text-slate-400">
                <span>Route Zone: {selectedBin.zone}</span>
                <span>•</span>
                <span className="text-amber-400 font-bold">Priority #1</span>
              </div>
            </div>
          </DoubleBezelCard>
        </div>
      </div>
    </div>
  );
};
