import React, { useState } from 'react';
import { 
  Layers, 
  Cpu, 
  Database, 
  Server, 
  Activity, 
  QrCode, 
  ShieldCheck, 
  Code, 
  ArrowRight, 
  CheckCircle2, 
  Terminal,
  Sparkles
} from 'lucide-react';
import { DoubleBezelCard } from './DoubleBezelCard';

export const ArchitectureModule: React.FC = () => {
  const [activePipeline, setActivePipeline] = useState<'ai' | 'ewaste' | 'smartbin'>('ai');

  return (
    <div className="py-8 px-4 max-w-7xl mx-auto space-y-8 animate-fade-in">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-white/[0.08]">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-2">
            <Layers className="w-3.5 h-3.5" />
            <span>SYSTEM SPECIFICATIONS & DESIGN SPEC</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
            Technical Architecture & Modular Pipelines
          </h2>
          <p className="text-sm text-slate-400 max-w-2xl mt-1">
            Enterprise decoupled infrastructure ready for edge computer vision, IoT microcontrollers, and university ERP database synchronization.
          </p>
        </div>

        {/* Pipeline Selector */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-obsidian-900 border border-white/10 text-xs font-mono">
          <button
            onClick={() => setActivePipeline('ai')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activePipeline === 'ai'
                ? 'bg-eco-500 text-obsidian-950 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            AI Vision Pipeline
          </button>
          <button
            onClick={() => setActivePipeline('ewaste')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activePipeline === 'ewaste'
                ? 'bg-cyan-500 text-obsidian-950 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            E-Waste Custody
          </button>
          <button
            onClick={() => setActivePipeline('smartbin')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activePipeline === 'smartbin'
                ? 'bg-amber-500 text-obsidian-950 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Smart-Bin Telemetry
          </button>
        </div>
      </div>

      {/* THREE MAJOR TECHNICAL PIPELINES (PRD Section 20) */}
      <DoubleBezelCard innerClassName="p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
          <h3 className="font-display font-bold text-lg text-white">
            {activePipeline === 'ai' && '1. Computer Vision & Waste Classification Pipeline'}
            {activePipeline === 'ewaste' && '2. Institutional E-Waste Custody & Recycling Pipeline'}
            {activePipeline === 'smartbin' && '3. Smart-Bin IoT Telemetry & Overflow Prediction Pipeline'}
          </h3>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-400">
            PRD §20 Architecture
          </span>
        </div>

        {/* PIPELINE 1: AI Vision */}
        {activePipeline === 'ai' && (
          <div className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-2 md:grid-cols-6 gap-2 text-center text-xs font-mono">
              <div className="p-3 rounded-xl bg-obsidian-950 border border-eco-500/30 text-eco-400 space-y-1">
                <div className="font-bold text-[10px] text-slate-500">STAGE 1</div>
                <div className="font-semibold text-white">Camera / Image</div>
                <div className="text-[9px] text-slate-400">WebRTC / Canvas</div>
              </div>
              <div className="p-3 rounded-xl bg-obsidian-950 border border-eco-500/30 text-eco-400 space-y-1">
                <div className="font-bold text-[10px] text-slate-500">STAGE 2</div>
                <div className="font-semibold text-white">YOLOv8 / TFLite</div>
                <div className="text-[9px] text-slate-400">OpenCV Preprocess</div>
              </div>
              <div className="p-3 rounded-xl bg-obsidian-950 border border-eco-500/30 text-eco-400 space-y-1">
                <div className="font-bold text-[10px] text-slate-500">STAGE 3</div>
                <div className="font-semibold text-white">Classification</div>
                <div className="text-[9px] text-slate-400">Bio / Dry / E-Waste</div>
              </div>
              <div className="p-3 rounded-xl bg-obsidian-950 border border-eco-500/30 text-eco-400 space-y-1">
                <div className="font-bold text-[10px] text-slate-500">STAGE 4</div>
                <div className="font-semibold text-white">Action Protocol</div>
                <div className="text-[9px] text-slate-400">Disposal Location</div>
              </div>
              <div className="p-3 rounded-xl bg-obsidian-950 border border-eco-500/30 text-eco-400 space-y-1">
                <div className="font-bold text-[10px] text-slate-500">STAGE 5</div>
                <div className="font-semibold text-white">Verification</div>
                <div className="text-[9px] text-slate-400">Anti-Fraud Check</div>
              </div>
              <div className="p-3 rounded-xl bg-obsidian-950 border border-eco-500/30 text-eco-400 space-y-1">
                <div className="font-bold text-[10px] text-slate-500">STAGE 6</div>
                <div className="font-semibold text-white">Green Credits</div>
                <div className="text-[9px] text-slate-400">Rewarded +GC</div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-obsidian-950 border border-white/5 space-y-2 text-xs">
              <span className="font-mono text-eco-400 font-bold">FastAPI Classification Endpoint Interface:</span>
              <pre className="p-3 rounded-lg bg-obsidian-900 text-slate-300 font-mono text-[11px] overflow-x-auto">
{`POST /api/v1/classify-waste
Content-Type: multipart/form-data
Response:
{
  "category": "Dry Recyclable",
  "item": "PET Plastic Bottle",
  "confidence": 0.9412,
  "action": "Place in Dry Recyclable Bin #4",
  "location": "CSE North Atrium Bin (BIN-CSE-07)",
  "green_credits_potential": 10,
  "environmental_savings_kg_co2": 0.052
}`}
              </pre>
            </div>
          </div>
        )}

        {/* PIPELINE 2: E-Waste */}
        {activePipeline === 'ewaste' && (
          <div className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-2 md:grid-cols-7 gap-2 text-center text-xs font-mono">
              <div className="p-3 rounded-xl bg-obsidian-950 border border-cyan-500/30 space-y-1">
                <div className="font-bold text-[10px] text-slate-500">1. ASSET</div>
                <div className="font-semibold text-white">Decommission</div>
                <div className="text-[9px] text-slate-400">Lab CSE 204</div>
              </div>
              <div className="p-3 rounded-xl bg-obsidian-950 border border-cyan-500/30 space-y-1">
                <div className="font-bold text-[10px] text-slate-500">2. TAGGING</div>
                <div className="font-semibold text-white">QR + Barcode</div>
                <div className="text-[9px] text-slate-400">EW-2026-001</div>
              </div>
              <div className="p-3 rounded-xl bg-obsidian-950 border border-cyan-500/30 space-y-1">
                <div className="font-bold text-[10px] text-slate-500">3. COLLECT</div>
                <div className="font-semibold text-white">Campus Dock</div>
                <div className="text-[9px] text-slate-400">Scanned at Bay B</div>
              </div>
              <div className="p-3 rounded-xl bg-obsidian-950 border border-cyan-500/30 space-y-1">
                <div className="font-bold text-[10px] text-slate-500">4. AUDIT</div>
                <div className="font-semibold text-white">HazMat Check</div>
                <div className="text-[9px] text-slate-400">Battery Integrity</div>
              </div>
              <div className="p-3 rounded-xl bg-obsidian-950 border border-cyan-500/30 space-y-1">
                <div className="font-bold text-[10px] text-slate-500">5. RECYCLER</div>
                <div className="font-semibold text-white">GreenCycle</div>
                <div className="text-[9px] text-slate-400">CERT-2026-018</div>
              </div>
              <div className="p-3 rounded-xl bg-obsidian-950 border border-cyan-500/30 space-y-1">
                <div className="font-bold text-[10px] text-slate-500">6. PROCESS</div>
                <div className="font-semibold text-white">Smelting / PCB</div>
                <div className="text-[9px] text-slate-400">Gold/Copper Extr.</div>
              </div>
              <div className="p-3 rounded-xl bg-obsidian-950 border border-cyan-500/30 space-y-1">
                <div className="font-bold text-[10px] text-slate-500">7. ARCHIVE</div>
                <div className="font-semibold text-white">Digital Pass</div>
                <div className="text-[9px] text-slate-400">Zero-Landfill</div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-obsidian-950 border border-white/5 space-y-2 text-xs">
              <span className="font-mono text-cyan-400 font-bold">PostgreSQL Institutional Schema Definition:</span>
              <pre className="p-3 rounded-lg bg-obsidian-900 text-slate-300 font-mono text-[11px] overflow-x-auto">
{`CREATE TABLE institutional_ewaste_assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  asset_id VARCHAR(50) UNIQUE NOT NULL,      -- e.g. LAB-CSE-042
  ewaste_id VARCHAR(50) UNIQUE NOT NULL,     -- e.g. EW-2026-001
  device_name VARCHAR(150) NOT NULL,
  serial_number VARCHAR(100) NOT NULL,
  department VARCHAR(100) NOT NULL,
  current_status VARCHAR(50) NOT NULL,       -- Certified E-Recycler
  recycler_name VARCHAR(100) NOT NULL,       -- GreenCycle E-Waste
  recycler_cert_id VARCHAR(50) NOT NULL,     -- CERT-DEMO-2026-018
  chain_of_custody JSONB NOT NULL DEFAULT '[]'::jsonb
);`}
              </pre>
            </div>
          </div>
        )}

        {/* PIPELINE 3: Smart-Bin Telemetry */}
        {activePipeline === 'smartbin' && (
          <div className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-2 md:grid-cols-6 gap-2 text-center text-xs font-mono">
              <div className="p-3 rounded-xl bg-obsidian-950 border border-amber-500/30 space-y-1">
                <div className="font-bold text-[10px] text-slate-500">1. SENSOR</div>
                <div className="font-semibold text-white">Ultrasonic / IR</div>
                <div className="text-[9px] text-slate-400">ESP32 / LoRaWAN</div>
              </div>
              <div className="p-3 rounded-xl bg-obsidian-950 border border-amber-500/30 space-y-1">
                <div className="font-bold text-[10px] text-slate-500">2. INGEST</div>
                <div className="font-semibold text-white">MQTT / REST</div>
                <div className="text-[9px] text-slate-400">2-min interval</div>
              </div>
              <div className="p-3 rounded-xl bg-obsidian-950 border border-amber-500/30 space-y-1">
                <div className="font-bold text-[10px] text-slate-500">3. TIME-SERIES</div>
                <div className="font-semibold text-white">History Stream</div>
                <div className="text-[9px] text-slate-400">42% → 94%</div>
              </div>
              <div className="p-3 rounded-xl bg-obsidian-950 border border-amber-500/30 space-y-1">
                <div className="font-bold text-[10px] text-slate-500">4. PREDICT</div>
                <div className="font-semibold text-white">Linear Slope AI</div>
                <div className="text-[9px] text-slate-400">+8.5% / hour</div>
              </div>
              <div className="p-3 rounded-xl bg-obsidian-950 border border-amber-500/30 space-y-1">
                <div className="font-bold text-[10px] text-slate-500">5. THRESHOLD</div>
                <div className="font-semibold text-white">Critical Alert</div>
                <div className="text-[9px] text-slate-400">Overflow 1h 18m</div>
              </div>
              <div className="p-3 rounded-xl bg-obsidian-950 border border-amber-500/30 space-y-1">
                <div className="font-bold text-[10px] text-slate-500">6. DISPATCH</div>
                <div className="font-semibold text-white">Team Routing</div>
                <div className="text-[9px] text-slate-400">Priority Route #1</div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-obsidian-950 border border-white/5 space-y-2 text-xs">
              <span className="font-mono text-amber-400 font-bold">Predictive Overflow Calculation Formula:</span>
              <pre className="p-3 rounded-lg bg-obsidian-900 text-slate-300 font-mono text-[11px] overflow-x-auto">
{`// Time to Overflow calculation formula (PRD Section 12)
fill_rate = (fill_current - fill_t_minus_2h) / 2.0;       // +8.5% / hr
remaining_capacity = 100.0 - fill_current;                 // 100 - 94 = 6%
hours_to_overflow = remaining_capacity / fill_rate;         // 6 / 8.5 = 0.705 hrs
overflow_countdown = "1h 18m";
alert_level = fill_current >= 90 ? "Critical" : fill_current >= 80 ? "Warning" : "Normal";`}
              </pre>
            </div>
          </div>
        )}
      </DoubleBezelCard>

      {/* Full Stack Technology Matrix (PRD Section 21) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DoubleBezelCard innerClassName="p-5 space-y-3">
          <div className="flex items-center gap-2">
            <Code className="w-4 h-4 text-eco-400" />
            <h4 className="font-bold text-white text-sm">Frontend Engineering</h4>
          </div>
          <ul className="space-y-1 text-xs text-slate-300 font-mono">
            <li>• React 19 + TypeScript</li>
            <li>• Tailwind CSS Design System</li>
            <li>• Double-Bezel Hardware Framing</li>
            <li>• High-performance SVG Vectors</li>
            <li>• WebRTC Camera Stream</li>
          </ul>
        </DoubleBezelCard>

        <DoubleBezelCard innerClassName="p-5 space-y-3">
          <div className="flex items-center gap-2">
            <Server className="w-4 h-4 text-cyan-400" />
            <h4 className="font-bold text-white text-sm">Backend & CV Abstraction</h4>
          </div>
          <ul className="space-y-1 text-xs text-slate-300 font-mono">
            <li>• Python FastAPI Async Microservice</li>
            <li>• YOLOv8 Tensor Object Detection</li>
            <li>• TensorFlow Lite Edge Inferences</li>
            <li>• OpenCV Optical Segmentation</li>
            <li>• Pluggable Live / Demo Mock Drivers</li>
          </ul>
        </DoubleBezelCard>

        <DoubleBezelCard innerClassName="p-5 space-y-3">
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-amber-400" />
            <h4 className="font-bold text-white text-sm">Database & Identification</h4>
          </div>
          <ul className="space-y-1 text-xs text-slate-300 font-mono">
            <li>• PostgreSQL / Supabase Ledger</li>
            <li>• ISO/IEC 18004 QR Standard</li>
            <li>• GS1 Code128 Barcode Protocol</li>
            <li>• Audit Chain-of-Custody Hashing</li>
            <li>• Time-Series Telemetry Table</li>
          </ul>
        </DoubleBezelCard>
      </div>
    </div>
  );
};
