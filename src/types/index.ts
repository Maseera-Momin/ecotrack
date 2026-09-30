export type WasteCategory = 'Biodegradable' | 'Dry Recyclable' | 'Hazardous / E-Waste';

export interface ClassificationResult {
  id: string;
  item: string;
  category: WasteCategory;
  confidence: number;
  recommendedAction: string;
  environmentalImpact: string;
  disposalLocation: string;
  greenCredits: number;
  timestamp: string;
  imageUrl?: string;
}

export type LifecycleStage =
  | 'Lab Decommissioned'
  | 'Collection Requested'
  | 'Collected'
  | 'Verification'
  | 'Certified E-Recycler'
  | 'Recycling / Processing'
  | 'Recycling Completed'
  | 'Audit Completed';

export interface AuditEvent {
  stage: LifecycleStage;
  date: string;
  time: string;
  location: string;
  verifiedBy: string;
  verifiedStatus: 'Verified' | 'Completed' | 'Pending';
  notes: string;
}

export interface EWasteAsset {
  id: string;
  assetId: string;
  eWasteId: string;
  deviceName: string;
  deviceType: string;
  brand: string;
  model: string;
  serialNumber: string;
  department: string;
  assignedUser: string;
  location: string;
  decommissionDate: string;
  currentStatus: LifecycleStage;
  recycler: {
    name: string;
    certificationStatus: 'Verified' | 'Pending';
    certificationId: string;
    contact: string;
    pickupDate: string;
    receivedDate: string;
    processingDate: string;
    completionDate: string;
  };
  auditTrail: AuditEvent[];
}

export type SmartBinAlertLevel = 'Normal' | 'Warning' | 'Critical' | 'Overflow';

export type CollectionPriorityLevel =
  | 'Critical — Collect within 1 hour'
  | 'High — Collect within 3 hours'
  | 'Medium — Collect today'
  | 'Normal — Routine collection';

export interface TelemetryPoint {
  time: string;
  fillLevel: number;
}

export interface SmartBin {
  id: string;
  binId: string;
  location: string;
  zone: string;
  wasteType: WasteCategory;
  currentFill: number;
  temperature: number;
  lastUpdated: string;
  status: SmartBinAlertLevel;
  recentFillRate: number; // % per hour
  estimatedOverflow: string;
  recommendation: string;
  collectionPriority: CollectionPriorityLevel;
  historicalTelemetry: TelemetryPoint[];
  coordinates: { x: number; y: number }; // percentage on map
}

export type GreenCreditStatus = 'Pending Verification' | 'Verified' | 'Rejected' | 'Rewarded';

export interface GreenCreditContribution {
  id: string;
  contributionId: string;
  user: string;
  wasteType: string;
  category: WasteCategory;
  disposalLocation: string;
  submissionDate: string;
  verificationDate?: string;
  verificationSource: string;
  pointsAwarded: number;
  status: GreenCreditStatus;
  duplicateHash?: string;
}

export interface CampusAnalytics {
  totalWasteProcessedKg: number;
  biodegradableKg: number;
  dryRecyclablesKg: number;
  hazardousEWasteKg: number;
  segregationAccuracy: number;
  contaminationRate: number;
  previousContaminationRate: number;
  recyclingRate: number;
  activeEWasteAssets: number;
  assetsRecycledCertified: number;
  smartBinsOnline: number;
  criticalCollectionAlerts: number;
  verifiedGreenCreditsIssued: number;
  highestContaminationLocation: string;
  highestContaminationRate: number;
  mostAffectedWasteType: string;
}
