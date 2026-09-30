import React, { useState } from 'react';
import { 
  QrCode, 
  Barcode as BarcodeIcon, 
  Search, 
  ShieldCheck, 
  Calendar, 
  Building2, 
  MapPin, 
  User, 
  CheckCircle2, 
  Clock, 
  FileCheck, 
  Download, 
  Filter, 
  ExternalLink,
  ChevronRight,
  Sparkles,
  ArrowRight,
  Maximize2
} from 'lucide-react';
import { INITIAL_EWASTE_ASSETS } from '../data/initialData';
import { EWasteAsset, LifecycleStage } from '../types';
import { DoubleBezelCard } from './DoubleBezelCard';
import { BarcodeSvg, QrCodeSvg } from '../utils/codeGenerators';

export const TrackModule: React.FC = () => {
  const [assets, setAssets] = useState<EWasteAsset[]>(INITIAL_EWASTE_ASSETS);
  const [selectedAsset, setSelectedAsset] = useState<EWasteAsset>(INITIAL_EWASTE_ASSETS[0]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [activeTagView, setActiveTagView] = useState<'both' | 'qr' | 'barcode'>('both');
  const [isScannerOpen, setIsScannerOpen] = useState<boolean>(false);
  const [scannedFeedback, setScannedFeedback] = useState<string | null>(null);

  const filteredAssets = assets.filter((asset) => {
    const matchesSearch =
      asset.deviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.eWasteId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.assetId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.serialNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = statusFilter === 'All' || asset.currentStatus === statusFilter;
    return matchesSearch && matchesFilter;
  });

  const allStages: LifecycleStage[] = [
    'Lab Decommissioned',
    'Collection Requested',
    'Collected',
    'Verification',
    'Certified E-Recycler',
    'Recycling / Processing',
    'Recycling Completed',
    'Audit Completed',
  ];

  const getStageIndex = (stage: LifecycleStage) => {
    return allStages.indexOf(stage);
  };

  const simulateScan = (eWasteId: string) => {
    const found = assets.find((a) => a.eWasteId === eWasteId);
    if (found) {
      setSelectedAsset(found);
      setScannedFeedback(`Successfully scanned tag ${eWasteId}: ${found.deviceName}`);
      setTimeout(() => {
        setScannedFeedback(null);
        setIsScannerOpen(false);
      }, 1500);
    }
  };

  return (
    <div className="py-8 px-4 max-w-7xl mx-auto space-y-8 animate-fade-in">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-white/[0.08]">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-2">
            <QrCode className="w-3.5 h-3.5" />
            <span>MODULE 02 — INSTITUTIONAL AUDITING</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
            E-Waste Tracker & Chain-of-Custody
          </h2>
          <p className="text-sm text-slate-400 max-w-2xl mt-1">
            Dual-tagging lifecycle verification with certified e-recycler audit trail from lab decommissioning to smelting recovery.
          </p>
        </div>

        {/* Scanner Action Trigger */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsScannerOpen(!isScannerOpen)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-obsidian-950 font-bold text-xs shadow-glow-cyan transition-all"
          >
            <Maximize2 className="w-4 h-4" />
            <span>Interactive QR / Barcode Scanner</span>
          </button>
        </div>
      </div>

      {/* Simulated Scanner Drawer if open */}
      {isScannerOpen && (
        <div className="p-5 rounded-2xl bg-obsidian-900 border-2 border-cyan-500/40 shadow-glow-cyan space-y-4 animate-fade-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping"></span>
              <span className="font-mono text-xs font-bold text-cyan-400 uppercase tracking-wider">
                Optical Tag Scanner Active
              </span>
            </div>
            <button
              onClick={() => setIsScannerOpen(false)}
              className="text-xs font-mono text-slate-400 hover:text-white"
            >
              Close
            </button>
          </div>

          <p className="text-xs text-slate-300">
            Click on any institutional tag below to simulate immediate optical scan and decode:
          </p>

          <div className="flex flex-wrap gap-2">
            {assets.map((a) => (
              <button
                key={a.id}
                onClick={() => simulateScan(a.eWasteId)}
                className="px-3 py-1.5 rounded-lg bg-obsidian-950 border border-cyan-500/30 text-xs font-mono text-cyan-300 hover:bg-cyan-500/20 hover:border-cyan-400 transition-all flex items-center gap-1.5"
              >
                <BarcodeIcon className="w-3.5 h-3.5" />
                <span>{a.eWasteId} ({a.deviceName})</span>
              </button>
            ))}
          </div>

          {scannedFeedback && (
            <div className="p-3 rounded-xl bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 font-mono text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
              <span>{scannedFeedback}</span>
            </div>
          )}
        </div>
      )}

      {/* Asset Explorer & Selected View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Asset Registry List & Search (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <DoubleBezelCard innerClassName="p-4 sm:p-5 space-y-4">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Asset ID, EW-ID, Serial, Model..."
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-obsidian-950 border border-white/10 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
              />
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1 overflow-x-auto pb-1 text-[11px] font-mono scrollbar-none">
              {['All', 'Certified E-Recycler', 'Verification', 'Collection Requested', 'Audit Completed'].map(
                (status) => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`px-2.5 py-1 rounded-lg flex-shrink-0 transition-colors ${
                      statusFilter === status
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                        : 'text-slate-400 hover:text-white bg-white/[0.02]'
                    }`}
                  >
                    {status}
                  </button>
                )
              )}
            </div>

            {/* Asset List */}
            <div className="space-y-2.5 max-h-[560px] overflow-y-auto pr-1">
              {filteredAssets.map((asset) => {
                const isSelected = selectedAsset.id === asset.id;
                return (
                  <button
                    key={asset.id}
                    onClick={() => setSelectedAsset(asset)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all duration-200 flex flex-col gap-1.5 ${
                      isSelected
                        ? 'bg-cyan-500/10 border-cyan-500/50 shadow-glow-cyan text-white'
                        : 'bg-obsidian-950/70 border-white/5 text-slate-300 hover:bg-white/5 hover:border-white/10'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-cyan-400">
                        {asset.eWasteId}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-400">
                        {asset.assetId}
                      </span>
                    </div>

                    <div className="font-semibold text-xs text-white">
                      {asset.deviceName}
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span>{asset.department.split(' ')[0]}</span>
                      <span
                        className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-semibold ${
                          asset.currentStatus === 'Audit Completed'
                            ? 'bg-eco-500/20 text-eco-400'
                            : asset.currentStatus === 'Certified E-Recycler'
                            ? 'bg-cyan-500/20 text-cyan-300'
                            : 'bg-amber-500/20 text-amber-300'
                        }`}
                      >
                        {asset.currentStatus}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </DoubleBezelCard>
        </div>

        {/* Right Side: Selected Asset Details & Chain of Custody (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Asset Identity Card with Live Dual QR + Barcode Tags */}
          <DoubleBezelCard glow="cyan" innerClassName="p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950/70 border border-cyan-500/30 px-2.5 py-0.5 rounded">
                    {selectedAsset.eWasteId}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    Asset ID: {selectedAsset.assetId}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-display font-extrabold text-white">
                  {selectedAsset.deviceName}
                </h3>
                <p className="text-xs text-slate-400">
                  {selectedAsset.model} · Serial: <span className="font-mono text-slate-300">{selectedAsset.serialNumber}</span>
                </p>
              </div>

              {/* Tag View Switcher (PRD Section 4: Dual QR + Barcode) */}
              <div className="flex items-center gap-1 p-1 bg-obsidian-950 rounded-lg border border-white/10 text-xs font-mono">
                <button
                  onClick={() => setActiveTagView('both')}
                  className={`px-2 py-1 rounded ${activeTagView === 'both' ? 'bg-cyan-500 text-obsidian-950 font-bold' : 'text-slate-400'}`}
                >
                  Both
                </button>
                <button
                  onClick={() => setActiveTagView('qr')}
                  className={`px-2 py-1 rounded ${activeTagView === 'qr' ? 'bg-cyan-500 text-obsidian-950 font-bold' : 'text-slate-400'}`}
                >
                  QR Only
                </button>
                <button
                  onClick={() => setActiveTagView('barcode')}
                  className={`px-2 py-1 rounded ${activeTagView === 'barcode' ? 'bg-cyan-500 text-obsidian-950 font-bold' : 'text-slate-400'}`}
                >
                  Barcode
                </button>
              </div>
            </div>

            {/* Generated Physical Tags Display */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-obsidian-950/80 border border-white/5">
              {(activeTagView === 'both' || activeTagView === 'qr') && (
                <div className="flex flex-col items-center justify-center p-2 text-center">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-2">
                    Verified SVG QR Tag
                  </span>
                  <QrCodeSvg value={`https://ecotrack.campus.demo/asset/${selectedAsset.eWasteId}`} size={130} />
                </div>
              )}

              {(activeTagView === 'both' || activeTagView === 'barcode') && (
                <div className="flex flex-col items-center justify-center p-2 text-center">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-2">
                    Code128 Standard Barcode Tag
                  </span>
                  <div className="w-full">
                    <BarcodeSvg value={selectedAsset.eWasteId} />
                  </div>
                </div>
              )}
            </div>

            {/* Institutional Metadata Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-obsidian-950/60 border border-white/5">
                <div className="text-[10px] font-mono text-slate-400 uppercase">Department</div>
                <div className="font-semibold text-slate-200 mt-0.5 truncate">
                  {selectedAsset.department}
                </div>
              </div>
              <div className="p-3 rounded-xl bg-obsidian-950/60 border border-white/5">
                <div className="text-[10px] font-mono text-slate-400 uppercase">Assigned Custodian</div>
                <div className="font-semibold text-slate-200 mt-0.5 truncate">
                  {selectedAsset.assignedUser}
                </div>
              </div>
              <div className="p-3 rounded-xl bg-obsidian-950/60 border border-white/5">
                <div className="text-[10px] font-mono text-slate-400 uppercase">Decommission Date</div>
                <div className="font-semibold text-slate-200 mt-0.5 font-mono">
                  {selectedAsset.decommissionDate}
                </div>
              </div>
            </div>

            {/* Certified Recycler Section (PRD Section 5) */}
            <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-500/20 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-wide">
                    Certified E-Recycler Partner
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-bold">
                  {selectedAsset.recycler.certificationStatus}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <div className="text-white font-bold">{selectedAsset.recycler.name}</div>
                  <div className="text-[11px] font-mono text-slate-400 mt-0.5">
                    Cert ID: <span className="text-cyan-300 font-semibold">{selectedAsset.recycler.certificationId}</span>
                  </div>
                  <div className="text-[11px] text-slate-400">{selectedAsset.recycler.contact}</div>
                </div>

                <div className="space-y-1 font-mono text-[11px] text-slate-300">
                  <div>Pickup: {selectedAsset.recycler.pickupDate}</div>
                  <div>Received: {selectedAsset.recycler.receivedDate}</div>
                  <div>Completed: {selectedAsset.recycler.completionDate}</div>
                </div>
              </div>
            </div>

            {/* 8-Stage Chain of Custody Timeline (PRD Section 6 & 7) */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  <span>8-Stage Chain-of-Custody Audit Trail</span>
                </h4>
                <span className="text-[10px] font-mono text-slate-400">
                  {selectedAsset.auditTrail.length} Logged Events
                </span>
              </div>

              {/* Visual Pipeline Horizontal Bar */}
              <div className="flex items-center justify-between gap-1 overflow-x-auto py-2 scrollbar-none">
                {allStages.map((stage, idx) => {
                  const currentIdx = getStageIndex(selectedAsset.currentStatus);
                  const isDone = idx <= currentIdx;
                  const isCurrent = idx === currentIdx;
                  return (
                    <div key={stage} className="flex-1 min-w-[70px] text-center space-y-1">
                      <div
                        className={`h-1.5 rounded-full transition-all ${
                          isCurrent
                            ? 'bg-cyan-400 shadow-glow-cyan'
                            : isDone
                            ? 'bg-eco-500'
                            : 'bg-white/10'
                        }`}
                      />
                      <span className={`text-[9px] font-mono block leading-tight ${isCurrent ? 'text-cyan-300 font-bold' : isDone ? 'text-slate-300' : 'text-slate-600'}`}>
                        {stage.split(' ')[0]}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Detailed Event Nodes */}
              <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-white/10">
                {selectedAsset.auditTrail.map((event, idx) => (
                  <div key={idx} className="relative group">
                    {/* Node Dot */}
                    <div className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-cyan-400 ring-4 ring-obsidian-900 border border-white/20"></div>

                    <div className="p-3.5 rounded-xl bg-obsidian-950/70 border border-white/5 space-y-1.5 group-hover:border-cyan-500/30 transition-colors">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="text-xs font-bold text-white">
                          {event.stage}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">
                          {event.date} · {event.time}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-slate-400 font-mono">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-cyan-400" />
                          <span>{event.location}</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3 text-eco-400" />
                          <span>Verified by: {event.verifiedBy}</span>
                        </span>
                      </div>

                      <p className="text-xs text-slate-300 pt-1 leading-relaxed">
                        {event.notes}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </DoubleBezelCard>
        </div>
      </div>
    </div>
  );
};
