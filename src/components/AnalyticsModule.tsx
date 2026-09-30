import React, { useState } from 'react';
import { 
  BarChart3, 
  PieChart, 
  MapPin, 
  AlertTriangle, 
  TrendingDown, 
  CheckCircle2, 
  Trash2,
  Navigation
} from 'lucide-react';
import { INITIAL_ANALYTICS, INITIAL_SMART_BINS } from '../data/initialData';
import { CampusAnalytics, SmartBin } from '../types';

export const AnalyticsModule: React.FC = () => {
  const [analytics] = useState<CampusAnalytics>(INITIAL_ANALYTICS);
  const [bins] = useState<SmartBin[]>(INITIAL_SMART_BINS);
  const [selectedMapBin, setSelectedMapBin] = useState<SmartBin | null>(INITIAL_SMART_BINS[0]);

  return (
    <div className="py-8 px-4 max-w-6xl mx-auto space-y-8 animate-fade-in font-sans">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold mb-2">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Campus Sustainability Metrics</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Waste Segregation & Impact Overview
          </h2>
          <p className="text-sm text-slate-300 mt-1">
            Real-time campus waste processing rates, contamination hotspots, and interactive collection stations.
          </p>
        </div>

        <div className="text-xs text-slate-400 font-medium">
          Reporting Period: <strong className="text-white">Current Academic Term</strong>
        </div>
      </div>

      {/* Top KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 space-y-1">
          <div className="text-xs text-slate-400 font-medium">Total Waste</div>
          <div className="text-xl font-bold text-white">
            {analytics.totalWasteProcessedKg.toLocaleString()} kg
          </div>
          <div className="text-xs text-emerald-400">+6.4% YoY</div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 space-y-1">
          <div className="text-xs text-slate-400 font-medium">Segregation</div>
          <div className="text-xl font-bold text-emerald-400">
            {analytics.segregationAccuracy}%
          </div>
          <div className="text-xs text-emerald-400">Target: 90%</div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 space-y-1">
          <div className="text-xs text-slate-400 font-medium">Contamination</div>
          <div className="text-xl font-bold text-amber-400">
            {analytics.contaminationRate}%
          </div>
          <div className="text-xs text-emerald-400 flex items-center gap-0.5">
            <TrendingDown className="w-3 h-3" />
            <span>-2.4% vs Last Mo</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 space-y-1">
          <div className="text-xs text-slate-400 font-medium">Recycling Rate</div>
          <div className="text-xl font-bold text-cyan-400">
            {analytics.recyclingRate}%
          </div>
          <div className="text-xs text-cyan-400">Zero Landfill Goal</div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 space-y-1">
          <div className="text-xs text-slate-400 font-medium">E-Waste Audited</div>
          <div className="text-xl font-bold text-white">
            {analytics.assetsRecycledCertified} Items
          </div>
          <div className="text-xs text-emerald-400">100% Certified</div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 space-y-1">
          <div className="text-xs text-slate-400 font-medium">Critical Bins</div>
          <div className="text-xl font-bold text-rose-400">
            {analytics.criticalCollectionAlerts} Alerts
          </div>
          <div className="text-xs text-rose-400">Scheduled for pickup</div>
        </div>
      </div>

      {/* Segregation Breakdown & Contamination Deep-Dive */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Segregation Breakdown Bar Visuals (6 Cols) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="rounded-3xl bg-slate-900/80 border border-white/10 p-6 space-y-6 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <PieChart className="w-4 h-4 text-emerald-400" />
                <h3 className="font-bold text-base text-white">
                  Campus Waste Segregation Breakdown
                </h3>
              </div>
              <span className="text-xs text-slate-400 font-medium">
                Annual Campus Audit
              </span>
            </div>

            {/* Three Pillar Fractions */}
            <div className="space-y-4">
              {/* Biodegradable 42% */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-emerald-400 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                    <span>Biodegradable Waste</span>
                  </span>
                  <span className="text-white">42% (11,950 kg)</span>
                </div>
                <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full w-[42%]"></div>
                </div>
                <p className="text-xs text-slate-400">
                  Digested into university clean biogas and botanical compost.
                </p>
              </div>

              {/* Dry Recyclable 38% */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-cyan-400 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
                    <span>Dry Recyclables</span>
                  </span>
                  <span className="text-white">38% (10,810 kg)</span>
                </div>
                <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full bg-cyan-500 rounded-full w-[38%]"></div>
                </div>
                <p className="text-xs text-slate-400">
                  Paper, PET plastic bottles, clean cardboard, and beverage cans.
                </p>
              </div>

              {/* Hazardous / E-Waste 20% */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-rose-400 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-400"></span>
                    <span>Hazardous / E-Waste</span>
                  </span>
                  <span className="text-white">20% (5,690 kg)</span>
                </div>
                <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full bg-rose-500 rounded-full w-[20%]"></div>
                </div>
                <p className="text-xs text-slate-400">
                  Lab electronics, old laptops, lithium batteries, and tech peripherals.
                </p>
              </div>
            </div>

            {/* Micro Metrics Grid */}
            <div className="grid grid-cols-3 gap-3 pt-3 border-t border-white/5 text-center">
              <div className="p-3 rounded-xl bg-slate-950/70 border border-white/5">
                <div className="text-xs text-slate-400 font-medium">Segregation</div>
                <div className="text-base font-bold text-emerald-400 mt-0.5">87%</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/70 border border-white/5">
                <div className="text-xs text-slate-400 font-medium">Contamination</div>
                <div className="text-base font-bold text-amber-400 mt-0.5">13%</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/70 border border-white/5">
                <div className="text-xs text-slate-400 font-medium">Recycling</div>
                <div className="text-base font-bold text-cyan-400 mt-0.5">72%</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Contamination Monitoring Hotspot & Source Analysis (6 Cols) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="rounded-3xl bg-slate-900/80 border border-amber-500/20 p-6 space-y-6 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <h3 className="font-bold text-base text-white">
                  Contamination Hotspot Monitoring
                </h3>
              </div>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-semibold">
                Action Required
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-amber-300 uppercase tracking-wide">
                  Top Campus Contamination Area
                </span>
                <span className="text-xs font-bold text-rose-400">
                  {analytics.highestContaminationRate}% Contamination
                </span>
              </div>
              <div className="text-lg font-bold text-white">
                {analytics.highestContaminationLocation}
              </div>
              <p className="text-xs text-slate-300">
                Most affected waste stream:{' '}
                <strong className="text-amber-300">{analytics.mostAffectedWasteType}</strong>. Food oils and unwashed drink cups discarded into dry paper recycling bins.
              </p>
            </div>

            {/* Contamination by Zone Comparison */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                Contamination By Campus Zone
              </span>

              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-xl bg-slate-950/70 border border-white/5 flex items-center justify-between">
                  <span className="text-white font-medium">Cafeteria Block Main</span>
                  <span className="text-rose-400 font-bold">18% (Critical)</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/70 border border-white/5 flex items-center justify-between">
                  <span className="text-white font-medium">Student Center Plaza</span>
                  <span className="text-amber-400 font-bold">14% (Warning)</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/70 border border-white/5 flex items-center justify-between">
                  <span className="text-white font-medium">Engineering Quad</span>
                  <span className="text-emerald-400 font-bold">9% (Good)</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/70 border border-white/5 flex items-center justify-between">
                  <span className="text-white font-medium">Library Quiet Wing</span>
                  <span className="text-emerald-400 font-bold">4% (Optimal)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Campus Waste Interactive Map */}
      <div className="rounded-3xl bg-slate-900/80 border border-white/10 p-6 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Navigation className="w-4 h-4 text-emerald-400" />
              <h3 className="font-bold text-lg text-white">
                Campus Smart Waste Collection Stations
              </h3>
            </div>
            <p className="text-xs text-slate-400">
              Live fill levels and status for all student and faculty disposal bins across campus.
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs font-medium">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>Normal (&lt;80%)</span>
            </span>
            <span className="flex items-center gap-1.5 text-amber-400">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              <span>Warning (80-89%)</span>
            </span>
            <span className="flex items-center gap-1.5 text-rose-400">
              <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse"></span>
              <span>Critical (≥90%)</span>
            </span>
          </div>
        </div>

        {/* Spatial Map Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8 relative aspect-[16/9] rounded-2xl bg-slate-950 border border-white/10 overflow-hidden p-4 flex items-center justify-center">
            {/* Campus Building Polygons */}
            <div className="absolute top-[20%] left-[25%] w-[26%] h-[28%] rounded-xl border border-white/10 bg-white/[0.02] flex items-center justify-center pointer-events-none">
              <span className="text-xs text-slate-400 font-semibold">
                CSE & Tech Labs
              </span>
            </div>

            <div className="absolute top-[35%] right-[20%] w-[22%] h-[32%] rounded-xl border border-white/10 bg-white/[0.02] flex items-center justify-center pointer-events-none">
              <span className="text-xs text-slate-400 font-semibold">
                Library Annex
              </span>
            </div>

            <div className="absolute bottom-[15%] left-[15%] w-[28%] h-[24%] rounded-xl border border-white/10 bg-white/[0.02] flex items-center justify-center pointer-events-none">
              <span className="text-xs text-slate-400 font-semibold">
                Mech Engineering
              </span>
            </div>

            <div className="absolute bottom-[20%] right-[12%] w-[24%] h-[22%] rounded-xl border border-white/10 bg-white/[0.02] flex items-center justify-center pointer-events-none">
              <span className="text-xs text-slate-400 font-semibold">
                Cafeteria Plaza
              </span>
            </div>

            {/* Smart Bin Pins on Map */}
            {bins.map((bin) => {
              const isSelected = selectedMapBin?.id === bin.id;
              const isCrit = bin.status === 'Critical';
              const isWarn = bin.status === 'Warning';
              return (
                <button
                  key={bin.id}
                  onClick={() => setSelectedMapBin(bin)}
                  style={{ top: `${bin.coordinates.y}%`, left: `${bin.coordinates.x}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 transition-transform hover:scale-125 focus:outline-none ${
                    isSelected ? 'scale-125 z-30' : ''
                  }`}
                >
                  <div className="relative group">
                    {isCrit && (
                      <span className="absolute -inset-1 rounded-full bg-rose-500 animate-ping opacity-75"></span>
                    )}
                    <div
                      className={`relative w-8 h-8 rounded-full border-2 flex items-center justify-center shadow-lg ${
                        isCrit
                          ? 'bg-rose-950 border-rose-500 text-rose-300'
                          : isWarn
                          ? 'bg-amber-950 border-amber-500 text-amber-300'
                          : 'bg-emerald-950 border-emerald-500 text-emerald-300'
                      }`}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </div>

                    <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap bg-slate-950 text-[10px] font-semibold px-2 py-0.5 rounded-md border border-white/15 text-slate-200 shadow">
                      {bin.location.split('—')[0].trim()} ({bin.currentFill}%)
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Selected Bin Inspector Details */}
          <div className="lg:col-span-4 p-5 rounded-2xl bg-slate-950/80 border border-white/10 space-y-4">
            {selectedMapBin ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <span className="text-sm font-bold text-emerald-400">
                    {selectedMapBin.location.split('—')[0].trim()}
                  </span>
                  <span
                    className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${
                      selectedMapBin.status === 'Critical'
                        ? 'bg-rose-500/20 text-rose-400'
                        : selectedMapBin.status === 'Warning'
                        ? 'bg-amber-500/20 text-amber-400'
                        : 'bg-emerald-500/20 text-emerald-400'
                    }`}
                  >
                    {selectedMapBin.status} ({selectedMapBin.currentFill}%)
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="text-xs font-bold text-white">
                    {selectedMapBin.location}
                  </div>
                  <div className="text-xs text-slate-400">
                    Zone: {selectedMapBin.zone} · Type: {selectedMapBin.wasteType}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-white/5 space-y-2 text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>Fill Rate:</span>
                    <span className="text-white font-medium">+{selectedMapBin.recentFillRate}%/hr</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Estimated Overflow:</span>
                    <span className="text-rose-400 font-bold">{selectedMapBin.estimatedOverflow}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Collection Priority:</span>
                    <span className="text-amber-400 font-medium">{selectedMapBin.collectionPriority.split('—')[0]}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-300">
                  {selectedMapBin.recommendation}
                </p>
              </div>
            ) : (
              <div className="text-center py-10 text-xs text-slate-400">
                Click any smart-bin pin on the map to inspect details.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
