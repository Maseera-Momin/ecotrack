import React, { useState, useRef, useEffect } from 'react';
import { 
  Camera, 
  Upload, 
  RefreshCw, 
  CheckCircle2, 
  AlertTriangle, 
  MapPin, 
  Sparkles, 
  Mouse,
  Smartphone,
  Apple,
  Box,
  BatteryMedium,
  Check,
  ArrowRight,
  Key,
  X,
  Zap,
  Trash2,
  Cpu
} from 'lucide-react';
import { DEMO_WASTE_SAMPLES, DemoSampleItem } from '../data/initialData';
import { ClassificationResult, WasteCategory } from '../types';
import { classifyWasteCanvas, getOrLoadMobileNet } from '../utils/aiClassifier';
import { getStoredOpenAIKey, setStoredOpenAIKey } from '../utils/chatgptVision';

interface ClassifyModuleProps {
  onDisposalSubmitted: (item: ClassificationResult) => void;
  selectedSampleId?: string;
  isDemoMode: boolean;
}

export const ClassifyModule: React.FC<ClassifyModuleProps> = ({
  onDisposalSubmitted,
  selectedSampleId,
  isDemoMode,
}) => {
  const [activeTab, setActiveTab] = useState<'camera' | 'upload' | 'samples'>('camera');
  const [cameraActive, setCameraActive] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [classification, setClassification] = useState<ClassificationResult | null>(null);
  const [submissionSuccess, setSubmissionSuccess] = useState<boolean>(false);

  // ChatGPT API Key state
  const [openAiKey, setOpenAiKey] = useState<string>('');
  const [isKeyModalOpen, setIsKeyModalOpen] = useState<boolean>(false);
  const [tempKeyInput, setTempKeyInput] = useState<string>('');

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Load existing key from localStorage & pre-warm neural model
  useEffect(() => {
    const existing = getStoredOpenAIKey();
    setOpenAiKey(existing);
    setTempKeyInput(existing);
    getOrLoadMobileNet();
  }, []);

  // Initialize camera automatically when on camera tab
  useEffect(() => {
    if (activeTab === 'camera') {
      startCameraStream();
    } else {
      stopCameraStream();
    }
    return () => {
      stopCameraStream();
    };
  }, [activeTab]);

  // Handle external sample selection
  useEffect(() => {
    if (selectedSampleId) {
      const sample = DEMO_WASTE_SAMPLES.find((s) => s.id === selectedSampleId);
      if (sample) {
        handleSelectSample(sample);
      }
    }
  }, [selectedSampleId]);

  // Front camera streaming - stays alive across captures
  const startCameraStream = async () => {
    setCameraError(null);
    try {
      if (streamRef.current && streamRef.current.active) {
        if (videoRef.current) {
          videoRef.current.srcObject = streamRef.current;
          await videoRef.current.play().catch(() => {});
        }
        setCameraActive(true);
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'user', // FRONT CAMERA
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      });

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play().catch(() => {});
      }
      setCameraActive(true);
    } catch (err: any) {
      console.warn('Camera stream error:', err);
      try {
        const fallback = await navigator.mediaDevices.getUserMedia({ video: true });
        streamRef.current = fallback;
        if (videoRef.current) {
          videoRef.current.srcObject = fallback;
          await videoRef.current.play().catch(() => {});
        }
        setCameraActive(true);
      } catch (fallbackErr) {
        setCameraError('Front camera access unavailable. You can upload any photo or select quick samples below.');
        setCameraActive(false);
      }
    }
  };

  const stopCameraStream = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  };

  // Taking photo: freezes the frame WITHOUT killing the stream
  const capturePhoto = async () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      // Mirror horizontally to match the front-facing camera preview
      ctx.save();
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      ctx.restore();

      const dataUrl = canvas.toDataURL('image/jpeg', 0.88);
      setCapturedImage(dataUrl);

      // Run computer vision inference (via ChatGPT or expanded local neural net)
      setIsAnalyzing(true);
      setSubmissionSuccess(false);
      setClassification(null);

      try {
        const result = await classifyWasteCanvas(canvas, dataUrl);
        setClassification(result);
      } catch (err) {
        console.error('Capture inference error:', err);
      } finally {
        setIsAnalyzing(false);
      }
    }
  };

  // Retake photo: instantly unhides the live video (stream is already running!)
  const retakePhoto = () => {
    setCapturedImage(null);
    setClassification(null);
    setIsAnalyzing(false);
    if (videoRef.current) {
      if (streamRef.current && streamRef.current.active) {
        videoRef.current.srcObject = streamRef.current;
      }
      videoRef.current.play().catch(() => {});
    }
  };

  // Upload handler: uses dedicated in-memory canvas so it NEVER fails if DOM canvas is absent
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsAnalyzing(true);
      setSubmissionSuccess(false);
      setClassification(null);

      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        setCapturedImage(dataUrl);

        const img = new Image();
        img.onload = async () => {
          try {
            const canvas = document.createElement('canvas');
            canvas.width = img.naturalWidth || img.width || 640;
            canvas.height = img.naturalHeight || img.height || 480;
            const ctx = canvas.getContext('2d');
            if (ctx) {
              ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
              const result = await classifyWasteCanvas(canvas, dataUrl);
              setClassification(result);
            }
          } catch (err) {
            console.error('File classification error:', err);
          } finally {
            setIsAnalyzing(false);
          }
        };
        img.onerror = () => {
          setIsAnalyzing(false);
        };
        img.src = dataUrl;
      };
      reader.readAsDataURL(file);
      e.target.value = '';
    }
  };

  const handleSelectSample = (sample: DemoSampleItem) => {
    setIsAnalyzing(true);
    setSubmissionSuccess(false);

    setTimeout(() => {
      setClassification({
        id: `scan-${Date.now()}`,
        item: sample.name,
        category: sample.category,
        confidence: sample.confidence,
        recommendedAction: sample.recommendedAction,
        environmentalImpact: sample.environmentalImpact,
        disposalLocation: sample.disposalLocation,
        greenCredits: sample.greenCredits,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        imageUrl: capturedImage || undefined,
      });
      setIsAnalyzing(false);
    }, 150);
  };

  const handleSaveKey = () => {
    setStoredOpenAIKey(tempKeyInput);
    setOpenAiKey(tempKeyInput.trim());
    setIsKeyModalOpen(false);
  };

  const handleSubmitDisposal = () => {
    if (!classification) return;
    onDisposalSubmitted(classification);
    setSubmissionSuccess(true);
    setTimeout(() => {
      setSubmissionSuccess(false);
    }, 4000);
  };

  const getCategoryTheme = (cat: WasteCategory) => {
    switch (cat) {
      case 'Hazardous / E-Waste':
        return {
          pill: 'bg-rose-500/15 text-rose-400 border border-rose-500/30',
          dot: 'bg-rose-400',
        };
      case 'Dry Recyclable':
        return {
          pill: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
          dot: 'bg-emerald-400',
        };
      case 'Biodegradable':
        return {
          pill: 'bg-amber-500/15 text-amber-400 border border-amber-500/30',
          dot: 'bg-amber-400',
        };
    }
  };

  return (
    <div className="py-8 px-4 max-w-5xl mx-auto space-y-8 animate-fade-in font-sans">
      {/* Human-Crafted Header with ChatGPT Toggle */}
      <div className="text-center max-w-xl mx-auto space-y-3">
        <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
          Smart Waste Scanner
        </h2>
        <p className="text-sm text-slate-300 font-normal">
          Hold any item up to your front camera or upload a photo. The AI identifies electronics, bottles, phones, and compostable waste in real time.
        </p>

        {/* ChatGPT Connection Pill */}
        <div className="flex items-center justify-center gap-2 pt-1">
          <button
            onClick={() => setIsKeyModalOpen(true)}
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all ${
              openAiKey
                ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/20'
                : 'bg-white/[0.04] border-white/10 text-slate-300 hover:text-white hover:bg-white/10 shadow-sm'
            }`}
          >
            <Key className="w-3.5 h-3.5 text-emerald-400" />
            <span>{openAiKey ? 'ChatGPT Vision (GPT-4o-mini) Connected' : 'Connect ChatGPT (OpenAI Vision)'}</span>
            {openAiKey ? (
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            ) : (
              <span className="text-[10px] text-emerald-400 font-semibold uppercase tracking-wider bg-emerald-500/10 px-1.5 py-0.5 rounded">Optional</span>
            )}
          </button>
        </div>
      </div>

      {/* Mode Navigation */}
      <div className="flex justify-center">
        <div className="inline-flex items-center gap-1 p-1 rounded-2xl bg-white/[0.04] border border-white/[0.08]">
          <button
            onClick={() => {
              setActiveTab('camera');
              retakePhoto();
            }}
            className={`flex items-center gap-2 py-2 px-5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'camera'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Camera className="w-4 h-4" />
            <span>Front Camera</span>
          </button>

          <button
            onClick={() => setActiveTab('upload')}
            className={`flex items-center gap-2 py-2 px-5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'upload'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Upload className="w-4 h-4" />
            <span>Upload Photo</span>
          </button>

          <button
            onClick={() => setActiveTab('samples')}
            className={`flex items-center gap-2 py-2 px-5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'samples'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Quick Samples</span>
          </button>
        </div>
      </div>

      {/* Main 2-Column Interface */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left Side: Camera or Upload Viewfinder (6 Cols) */}
        <div className="md:col-span-6 space-y-4">
          <div className="rounded-3xl bg-slate-900/80 border border-white/[0.08] p-4 shadow-xl">
            {activeTab === 'camera' && (
              <div className="space-y-4">
                {/* Viewfinder: Video element remains ALWAYS mounted in DOM */}
                <div className="relative aspect-[4/3] rounded-2xl bg-slate-950 overflow-hidden flex items-center justify-center border border-white/10">
                  {/* Live video with front-camera mirroring */}
                  <video
                    ref={videoRef}
                    playsInline
                    muted
                    className={`w-full h-full object-cover transform -scale-x-100 ${
                      capturedImage ? 'hidden' : 'block'
                    }`}
                  />

                  {/* Frozen captured photo */}
                  {capturedImage && (
                    <img
                      src={capturedImage}
                      alt="Captured object"
                      className="w-full h-full object-cover block"
                    />
                  )}

                  {/* Subtle target guidelines */}
                  {!capturedImage && cameraActive && (
                    <div className="absolute inset-8 border border-white/20 rounded-2xl pointer-events-none flex items-center justify-center">
                      <div className="w-12 h-12 border border-emerald-400/50 rounded-full animate-ping opacity-30"></div>
                      <div className="absolute top-2 left-2 text-[11px] font-medium bg-slate-950/70 text-emerald-400 px-2 py-0.5 rounded-md backdrop-blur">
                        Front Camera Active
                      </div>
                    </div>
                  )}
                </div>

                {cameraError && (
                  <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                    <span>{cameraError}</span>
                  </div>
                )}

                {/* Tactile Shutter Controls */}
                <div className="pt-1 flex items-center justify-center">
                  {!capturedImage ? (
                    <button
                      onClick={capturePhoto}
                      className="group flex items-center gap-3 px-8 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-lg hover:shadow-emerald-500/25 active:scale-95 transition-all"
                    >
                      <span className="w-5 h-5 rounded-full border-2 border-slate-950 flex items-center justify-center">
                        <span className="w-2.5 h-2.5 rounded-full bg-slate-950"></span>
                      </span>
                      <span>Take Photo & Identify</span>
                    </button>
                  ) : (
                    <button
                      onClick={retakePhoto}
                      className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/15 text-white font-semibold text-xs border border-white/10 transition-all active:scale-95"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Scan Next Item</span>
                    </button>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'upload' && (
              <div className="space-y-4">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />

                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="relative aspect-[4/3] rounded-2xl bg-slate-950 border border-dashed border-white/15 hover:border-emerald-500/50 transition-colors cursor-pointer flex flex-col items-center justify-center p-6 text-center group overflow-hidden"
                >
                  {capturedImage ? (
                    <div className="relative w-full h-full flex items-center justify-center">
                      <img
                        src={capturedImage}
                        alt="Uploaded preview"
                        className="max-h-full max-w-full object-contain rounded-xl"
                      />
                      <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="px-4 py-2 rounded-xl bg-slate-900/90 text-white text-xs font-semibold border border-white/20">
                          Click to Choose Different Photo
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mx-auto text-slate-400 group-hover:text-emerald-400 transition-colors">
                        <Upload className="w-6 h-6" />
                      </div>
                      <div className="text-sm font-semibold text-white">
                        Upload an image of any waste
                      </div>
                      <div className="text-xs text-slate-400">
                        PNG, JPG, or WEBP photo (trash can, phone, mouse, bottle, food)
                      </div>
                    </div>
                  )}
                </div>

                {capturedImage && (
                  <div className="flex justify-center">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/15 text-white font-semibold text-xs border border-white/10 transition-all active:scale-95"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload Another Photo</span>
                    </button>
                  </div>
                )}

                {/* Instant Clicker Presets */}
                <div className="pt-2 border-t border-white/5 space-y-2">
                  <div className="text-xs font-medium text-slate-400">
                    Or test with campus photo samples:
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'sample-trashcan', label: '🗑️ Trash Can & Bottles' },
                      { id: 'sample-smartphone', label: '📱 Smartphone' },
                      { id: 'sample-mouse', label: '🖱️ Computer Mouse' },
                      { id: 'sample-bottle', label: '🧴 Steel Flask' },
                      { id: 'sample-plastic-bottle', label: '🥤 Plastic Bottle' },
                      { id: 'sample-organic', label: '🍎 Fruit Peel' },
                    ].map((btn) => (
                      <button
                        key={btn.id}
                        onClick={() => {
                          const s = DEMO_WASTE_SAMPLES.find((item) => item.id === btn.id);
                          if (s) handleSelectSample(s);
                        }}
                        className="p-2.5 rounded-xl bg-slate-950/70 hover:bg-white/10 border border-white/5 text-xs text-slate-300 hover:text-white text-left font-medium transition-all"
                      >
                        {btn.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'samples' && (
              <div className="space-y-2.5 py-1">
                <div className="text-xs font-medium text-slate-400 pb-1">
                  Tap to test any item instantly:
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {DEMO_WASTE_SAMPLES.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => handleSelectSample(s)}
                      className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all ${
                        classification?.item === s.name
                          ? 'bg-emerald-500/20 border-emerald-500 text-white font-bold'
                          : 'bg-slate-950/80 border-white/5 text-slate-300 hover:bg-white/5'
                      }`}
                    >
                      <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-emerald-400 flex-shrink-0">
                        {s.id === 'sample-mouse' && <Mouse className="w-4 h-4" />}
                        {s.id === 'sample-bottle' && <Box className="w-4 h-4" />}
                        {s.id === 'sample-plastic-bottle' && <Box className="w-4 h-4" />}
                        {s.id === 'sample-smartphone' && <Smartphone className="w-4 h-4" />}
                        {s.id === 'sample-battery' && <BatteryMedium className="w-4 h-4" />}
                        {s.id === 'sample-organic' && <Apple className="w-4 h-4" />}
                        {s.id === 'sample-cardboard' && <Box className="w-4 h-4" />}
                        {s.id === 'sample-pcb' && <Cpu className="w-4 h-4" />}
                        {s.id === 'sample-trashcan' && <Trash2 className="w-4 h-4" />}
                      </div>
                      <span className="text-xs truncate">{s.name.split('/')[0]}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Clean Human-Designed Output (6 Cols) */}
        <div className="md:col-span-6 space-y-4">
          <div className="rounded-3xl bg-slate-900/80 border border-white/[0.08] p-6 shadow-xl space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Classification Result
              </span>
              <span className="text-xs text-emerald-400 font-medium flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>{openAiKey ? 'ChatGPT Vision' : 'Neural Vision'}</span>
              </span>
            </div>

            {isAnalyzing ? (
              <div className="py-16 text-center space-y-4 animate-fade-in">
                <div className="w-12 h-12 rounded-full border-2 border-emerald-500/20 border-t-emerald-400 animate-spin mx-auto"></div>
                <div className="space-y-1">
                  <div className="text-sm font-semibold text-white">
                    {openAiKey ? 'ChatGPT 4o Vision Analyzing...' : 'Neural Vision Processing Object...'}
                  </div>
                  <p className="text-xs text-slate-400">
                    Extracting material contours, color variance & category signatures
                  </p>
                </div>
              </div>
            ) : classification ? (
              <div className="space-y-6 animate-fade-in">
                {/* Result Card */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                        getCategoryTheme(classification.category).pill
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${
                          getCategoryTheme(classification.category).dot
                        }`}
                      />
                      <span>{classification.category}</span>
                    </span>

                    <span className="text-xs text-slate-400 font-medium">
                      {classification.confidence}% Match
                    </span>
                  </div>

                  <h3 className="text-2xl font-display font-bold text-white leading-tight">
                    {classification.item}
                  </h3>
                </div>

                {/* Disposal Instructions */}
                <div className="space-y-3 text-sm">
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1">
                    <div className="text-xs font-semibold text-slate-400">
                      Disposal Instruction
                    </div>
                    <p className="text-slate-200 leading-relaxed font-normal">
                      {classification.recommendedAction}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1">
                    <div className="text-xs font-semibold text-slate-400 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Campus Location</span>
                    </div>
                    <p className="text-emerald-300 font-medium">
                      {classification.disposalLocation}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1">
                    <div className="text-xs font-semibold text-slate-400">
                      Environmental Impact
                    </div>
                    <p className="text-slate-300 text-xs leading-relaxed">
                      {classification.environmentalImpact}
                    </p>
                  </div>
                </div>

                {/* Human One-Tap Correction Bar */}
                <div className="pt-1 space-y-2">
                  <div className="text-xs font-medium text-slate-400">
                    Holding something else? Tap to switch:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { id: 'sample-trashcan', label: '🗑️ Waste Bin / Recyclables' },
                      { id: 'sample-smartphone', label: '📱 Phone' },
                      { id: 'sample-mouse', label: '🖱️ Mouse' },
                      { id: 'sample-bottle', label: '🧴 Steel Flask' },
                      { id: 'sample-plastic-bottle', label: '🥤 Plastic Bottle' },
                      { id: 'sample-battery', label: '🔋 Battery' },
                      { id: 'sample-organic', label: '🍎 Food' },
                      { id: 'sample-cardboard', label: '📦 Box' },
                    ].map((btn) => (
                      <button
                        key={btn.id}
                        onClick={() => {
                          const s = DEMO_WASTE_SAMPLES.find((item) => item.id === btn.id);
                          if (s) handleSelectSample(s);
                        }}
                        className={`px-3 py-1.5 rounded-xl border text-xs font-medium transition-all active:scale-95 ${
                          classification.item === DEMO_WASTE_SAMPLES.find((item) => item.id === btn.id)?.name
                            ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-semibold'
                            : 'bg-white/[0.04] hover:bg-white/[0.08] border-white/[0.06] text-slate-300 hover:text-white'
                        }`}
                      >
                        {btn.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Confirm Action Button */}
                <button
                  onClick={handleSubmitDisposal}
                  disabled={submissionSuccess}
                  className="w-full py-4 px-6 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-lg hover:shadow-emerald-500/25 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  {submissionSuccess ? (
                    <>
                      <Check className="w-5 h-5 stroke-[2.5]" />
                      <span>Recorded! +{classification.greenCredits} Credits Claimed</span>
                    </>
                  ) : (
                    <>
                      <span>Deposit Item & Claim +{classification.greenCredits} Credits</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            ) : (
              <div className="py-20 text-center space-y-2 text-slate-400">
                <p className="text-sm font-medium text-slate-300">No object in view</p>
                <p className="text-xs">Hold an item up to your front camera and click Take Photo, or select an image to upload.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ChatGPT API Key Modal */}
      {isKeyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md rounded-3xl bg-slate-900 border border-white/10 p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <div className="flex items-center gap-2 text-white font-display font-bold text-lg">
                <Key className="w-5 h-5 text-emerald-400" />
                <span>Connect ChatGPT (GPT-4o Vision)</span>
              </div>
              <button
                onClick={() => setIsKeyModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Connect your OpenAI API Key to enable <strong>ChatGPT 4o-mini Vision</strong> for 100% exact recognition of any item you hold in front of your camera or upload.
            </p>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">
                OpenAI API Key (starts with sk-...)
              </label>
              <input
                type="password"
                value={tempKeyInput}
                onChange={(e) => setTempKeyInput(e.target.value)}
                placeholder="sk-proj-..."
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white text-xs font-mono placeholder:text-slate-600 focus:outline-none focus:border-emerald-500"
              />
              <p className="text-[11px] text-slate-500">
                Your key is stored only locally in your browser’s localStorage.
              </p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              {openAiKey && (
                <button
                  onClick={() => {
                    setStoredOpenAIKey('');
                    setOpenAiKey('');
                    setTempKeyInput('');
                    setIsKeyModalOpen(false);
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-500/10"
                >
                  Disconnect
                </button>
              )}
              <button
                onClick={handleSaveKey}
                className="px-5 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition-colors"
              >
                Save & Connect
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
