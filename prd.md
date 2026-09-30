# ECO-TRACK â€” COMPETITION REQUIREMENT ADDITIONS

## 1. CORE COMPETITION PILLARS

The website must make these **four technical pillars** immediately visible throughout the product:

### CLASSIFY

AI-powered camera/image waste classification.

### TRACK

Institutional e-waste lifecycle auditing using QR + Barcode asset tagging.

### PREDICT

Smart-bin telemetry with fill-level trends and predictive collection/overflow alerts.

### REWARD

Verified student/community Green Credits based on verified disposal and recycling contributions.

The UI should communicate this product flow clearly:

**CLASSIFY â†’ TRACK â†’ PREDICT â†’ REWARD**

Do not hide these capabilities deep inside the dashboard. Judges should understand the four pillars within the first few seconds of opening the website.

---

# 2. HOMEPAGE HERO â€” UPDATE EXISTING HERO

Replace the simple hero concept with a more technical product demonstration.

## Main Hero Message

Use a strong headline such as:

**â€œFrom Waste Classification to Verified Recycling.â€**

Supporting text:

â€œAI-powered waste classification, institutional e-waste auditing, predictive smart-bin collection, and verified Green Credits â€” all in one sustainable campus ecosystem.â€

## Hero Product Visual

The main visual beside/below the hero text must show four connected modules:

### 01 â€” CLASSIFY

Camera / waste image
â†“
AI Classification
â†“
**Dry Recyclable â€” 94% Confidence**

### 02 â€” TRACK

E-Waste Asset
â†“
QR / Barcode
â†“
**Dell Laptop â€” EW-2026-001**

### 03 â€” PREDICT

Smart Bin
â†“
**94% Full**
â†“
**Overflow in 1h 18m**

### 04 â€” REWARD

Verified Contribution
â†“
**Submitted â†’ Verified â†’ Rewarded**
â†“
**+10 Green Credits**

Connect these four modules visually with a subtle flow line or directional animation.

The hero should visually communicate:

**CLASSIFY â†’ TRACK â†’ PREDICT â†’ REWARD**

This should become one of the strongest visual identities of EcoTrack.

---

# 3. CAMERA-BASED AI WASTE CLASSIFICATION

The waste-identification feature must support TWO input methods.

## Input Options

Display two primary actions:

**[ Use Camera ] [ Upload Image ]**

### Use Camera

Allow the user to:

* Open device camera
* Show camera preview
* Capture waste image
* Retake image
* Confirm image
* Analyze image

The UI should work responsively on mobile and desktop.

For desktop devices without camera access, gracefully fall back to image upload.

## Camera Flow

**Open Camera**
â†’ Camera Preview
â†’ Capture
â†’ Preview
â†’ Analyze Waste
â†’ Classification Result

## Classification Categories

Use exactly these major categories:

* Biodegradable
* Dry Recyclable
* Hazardous / E-Waste

## Result

Show:

* Waste item
* Category
* Confidence percentage
* Recommended disposal method
* Environmental information
* Green Credits
* Disposal location

Example:

**Plastic Bottle**

Category:
**Dry Recyclable**

Confidence:
**94%**

Recommended Action:
**Place in Dry Recyclable Bin**

Potential Reward:
**+10 Green Credits**

## AI Architecture

The application architecture should be designed so the AI provider can later use:

* YOLOv8
* TensorFlow Lite
* OpenCV

Backend/API abstraction should make the AI model replaceable.

The frontend must NOT falsely claim that a real AI model is running if the hackathon demo is using simulated classification.

Clearly label demo behavior as:

**Demo AI Mode**

or

**Connected AI Mode**

when an actual model/API is connected.

---

# 4. QR + BARCODE E-WASTE ASSET TAGGING

The E-Waste Tracker must support BOTH:

**QR Code + Barcode**

Do not make QR the only asset identification mechanism.

## Asset Registration

Each institutional e-waste asset should have:

* Asset ID
* E-Waste ID
* Device Name
* Device Type
* Brand
* Model
* Serial Number
* Department / Lab
* Assigned User / Department
* Location
* Decommission Date
* Current Status
* Recycler
* Recycler Certification
* Last Updated

Example:

**Dell Latitude 5420**

E-Waste ID:
**EW-2026-001**

Asset ID:
**LAB-CSE-042**

Tag:
**QR + Barcode**

Status:
**Awaiting Collection**

## QR / Barcode Actions

Provide:

**Generate QR**

**Generate Barcode**

**Scan QR**

**Scan Barcode**

**Search Asset ID**

The scanner should open an asset's complete lifecycle record.

---

# 5. CERTIFIED E-RECYCLER LIFECYCLE

The e-waste journey MUST NOT visually stop at simply:

â€œRecycled.â€

The complete institutional lifecycle must be:

**LAB DECOMMISSIONED**
â†“
**COLLECTION REQUESTED**
â†“
**COLLECTED**
â†“
**VERIFICATION**
â†“
**CERTIFIED E-RECYCLER**
â†“
**RECYCLING / PROCESSING**
â†“
**RECYCLING COMPLETED**
â†“
**AUDIT COMPLETED**

## Certified Recycler Information

Display:

* Recycler Name
* Certification Status
* Certification ID
* Contact Information
* Pickup Date
* Received Date
* Processing Date
* Recycling Completion Date

Use realistic demo data where required and clearly mark it as demo data.

Example:

**GreenCycle E-Waste Solutions**

Certification:
**Verified**

Certification ID:
**CERT-DEMO-2026-018**

Status:
**Material Received**

---

# 6. INSTITUTIONAL E-WASTE AUDIT TRAIL

The E-Waste Tracker should feel like a genuine **audit system**, not just a tracking table.

Every lifecycle event must contain:

* Status
* Date
* Time
* Location
* Responsible person/team
* Verification status
* Notes

Example:

### Lab Decommissioned

**12 Sep 2026 Â· 10:32 AM**

Location:
CSE Lab 204

Verified by:
Lab Administrator

Status:
**Verified**

â†“

### Collection Completed

**13 Sep 2026 Â· 02:15 PM**

Location:
Campus Collection Center

Verified by:
Waste Management Team

Status:
**Verified**

â†“

### Recycler Received

**15 Sep 2026 Â· 11:05 AM**

Location:
Certified E-Recycling Facility

Verified by:
Recycler

Status:
**Verified**

â†“

### Recycling Completed

**18 Sep 2026 Â· 04:40 PM**

Status:
**Completed**

---

# 7. CHAIN-OF-CUSTODY VISUALIZATION

Add a dedicated visual chain-of-custody component.

Display:

**LAB**
â†’
**COLLECTION**
â†’
**VERIFICATION**
â†’
**COLLECTION CENTER**
â†’
**CERTIFIED E-RECYCLER**
â†’
**RECYCLING**
â†’
**AUDIT COMPLETE**

Each stage should have:

* Icon
* Date/time
* Location
* Verification badge
* Status

Use a timeline rather than a simple list.

The completed stages should visually differ from pending stages.

---

# 8. VERIFIED GREEN CREDITS

Do NOT simply award points immediately when the user clicks a disposal button.

Green Credits must follow a verification workflow:

**SUBMITTED**
â†“
**VERIFIED**
â†“
**REWARDED**

## Example

User submits:

**Plastic Bottle Disposal**

Status:
**Submitted**

â†“

Campus verification:

**Verified**

â†“

Reward:

**+10 Green Credits**

Status:
**Rewarded**

## Green Credit States

Support:

* Pending Verification
* Verified
* Rejected
* Rewarded

## Verification Information

Show:

* Contribution ID
* Student/User
* Waste Type
* Disposal Location
* Submission Date
* Verification Date
* Verification Source
* Points Awarded

Example:

**Contribution #GC-1042**

Plastic Bottle
Dry Recyclable

Submitted:
30 Sep 2026 Â· 11:24 AM

Verified:
30 Sep 2026 Â· 11:31 AM

Reward:
**+10 Green Credits**

Status:
**Verified & Rewarded**

---

# 9. GREEN CREDIT ANTI-FRAUD / DUPLICATE PREVENTION

Add basic demo-level verification logic.

Prevent the same contribution from being rewarded multiple times.

Show states such as:

**Already Verified**

**Pending Verification**

**Rewarded**

**Rejected**

For the hackathon demo, this can use application/database logic rather than a complex production fraud system.

---

# 10. SMART-BIN TELEMETRY

The Smart Bin feature must demonstrate actual telemetry rather than showing only a static percentage.

Each bin should display:

* Bin ID
* Location
* Waste Type
* Current Fill Level
* Temperature if available
* Last Updated
* Collection Status
* Overflow Risk
* Prediction

Example:

**BIN-CSE-07**

Dry Recyclable

Current Fill:
**94%**

Status:
**Critical**

Last Updated:
**2 minutes ago**

---

# 11. SMART-BIN TIME-SERIES GRAPH

Add a compact telemetry graph showing historical fill levels.

Example data:

**42% â†’ 51% â†’ 63% â†’ 76% â†’ 88% â†’ 94%**

Display it as a time-series line chart.

Example:

| Time  | Fill Level |
| ----- | ---------: |
| 08:00 |        42% |
| 10:00 |        51% |
| 12:00 |        63% |
| 14:00 |        76% |
| 16:00 |        88% |
| 18:00 |        94% |

The graph should communicate that the bin is filling over time.

---

# 12. PREDICTIVE COLLECTION ENGINE

Do not only display:

**Bin = 94%**

Calculate/display a demo prediction using the recent fill-rate trend.

Example:

Current:

**94% Full**

Prediction:

**Estimated Overflow: 1h 18m**

Recommendation:

**Collection Recommended**

Use a clearly labeled demo prediction if this is simulated.

Example label:

**Demo Prediction**

or

**Predictive Model â€” Demo**

## Prediction Information

Show:

* Current fill level
* Recent fill rate
* Estimated overflow time
* Collection recommendation
* Risk level

Example:

**94% Full**

Fill Rate:
**+8.5% / hour**

Estimated Overflow:
**1h 18m**

Recommendation:
**Dispatch Collection**

Risk:
**Critical**

---

# 13. SMART-BIN ALERT LEVELS

Use:

### Normal

Bin below normal operating threshold.

### Warning

Bin approaching capacity.

### Critical

Collection should be prioritized.

### Overflow

Bin has reached/exceeded capacity.

Use demo thresholds:

**80% â†’ Warning**

**90% â†’ Critical**

**100% â†’ Overflow**

---

# 14. COLLECTION PRIORITY

The system should automatically assign collection priority based on:

* Current fill level
* Fill rate
* Estimated overflow time
* Location
* Waste type

Example:

**Critical â€” Collect within 1 hour**

**High â€” Collect within 3 hours**

**Medium â€” Collect today**

**Normal â€” Routine collection**

Show the priority prominently in the Admin Dashboard.

---

# 15. OPTIONAL IoT + DEMO TELEMETRY MODES

The Smart Bin system should support two conceptual modes.

## Demo Mode

Uses simulated telemetry data.

Example:

42% â†’ 51% â†’ 63% â†’ 76% â†’ 88% â†’ 94%

This allows the hackathon demonstration to work without physical hardware.

## IoT Mode

Architecture should be prepared for future sensor integration.

Potential data source:

**IoT Sensor**
â†’
**Backend/API**
â†’
**Database**
â†’
**Smart Bin Dashboard**
â†’
**Prediction**
â†’
**Collection Alert**

Do not claim that physical IoT hardware is connected unless it actually is.

---

# 16. CAMPUS WASTE SEGREGATION ANALYTICS

Add a dedicated campus waste segregation section to the Admin Dashboard.

Show:

### Biodegradable

Example:
**42%**

### Dry Recyclable

Example:
**38%**

### Hazardous / E-Waste

Example:
**20%**

Also display:

### Segregation Accuracy

**87%**

### Contamination Rate

**13%**

### Recycling Rate

**72%**

These should be represented using clear charts and KPI indicators.

---

# 17. CONTAMINATION MONITORING

Add a dedicated contamination metric.

Show:

**Contamination Rate**

Example:

**13%**

Also show:

* Previous period
* Current period
* Trend
* Most affected waste category
* Campus location with highest contamination

Example:

**Cafeteria Block â€” 18% contamination**

This directly connects the platform to improving **waste segregation at source**.

---

# 18. CAMPUS WASTE MAP

Add a campus waste map/list showing:

* Smart bin locations
* Fill level
* Waste type
* Collection status
* Overflow risk
* Collection priority

Example:

**CSE Building**
Dry Recyclable Bin
94%
Critical

**Library**
Biodegradable Bin
62%
Normal

**Mechanical Lab**
Hazardous/E-Waste
71%
High

The map may use a visual campus representation or a clean interactive location list if a real map integration is unnecessary.

---

# 19. INSTITUTIONAL OVERVIEW

Admin Dashboard should show the complete campus sustainability picture.

Top-level metrics:

* Total Waste Processed
* Biodegradable Waste
* Dry Recyclables
* Hazardous/E-Waste
* Segregation Accuracy
* Contamination Rate
* Recycling Rate
* Active E-Waste Assets
* Assets Sent to Certified Recyclers
* Smart Bins Online
* Critical Collection Alerts
* Verified Green Credits

---

# 20. TECHNICAL ARCHITECTURE VISUAL

Add an optional **System Architecture** section/page.

Show three major technical pipelines.

## AI WASTE PIPELINE

**Camera / Image**
â†’
**OpenCV / YOLOv8 / TensorFlow Lite**
â†’
**Waste Classification**
â†’
**Disposal Recommendation**
â†’
**Verification**
â†’
**Green Credits**

## E-WASTE PIPELINE

**Institutional Asset**
â†’
**QR / Barcode**
â†’
**Decommission**
â†’
**Collection**
â†’
**Verification**
â†’
**Certified E-Recycler**
â†’
**Recycling**
â†’
**Audit Complete**

## SMART-BIN PIPELINE

**Smart Bin / Simulated Telemetry**
â†’
**Fill-Level Data**
â†’
**Time-Series Analysis**
â†’
**Overflow Prediction**
â†’
**Collection Alert**
â†’
**Collection Team**

Make this visually impressive but easy for judges to understand.

---

# 21. BACKEND / TECHNOLOGY ARCHITECTURE

Keep the architecture compatible with:

### Frontend

Next.js / React
TypeScript
Tailwind CSS

### Backend

Python FastAPI

### AI / Computer Vision

YOLOv8
TensorFlow Lite
OpenCV

### Database

PostgreSQL / Supabase

### Asset Identification

QR Code
Barcode

### Analytics

Recharts or equivalent charting library

The architecture should remain modular so real AI, IoT, and verification services can be connected later.

---

# 22. JUDGE DEMO MODE

Create a dedicated **Demo Mode** so the entire project can be demonstrated without external hardware or unavailable APIs.

Demo Mode must provide realistic simulated data for:

* Camera classification
* Waste classification confidence
* Green Credit verification
* E-Waste lifecycle
* QR / Barcode
* Certified recycler
* Smart-bin telemetry
* Overflow prediction
* Collection alerts
* Campus analytics

Clearly label simulated components as:

**Demo Data**

or

**Simulation**

Never falsely present simulated hardware/AI as live connected hardware/AI.

---

# 23. COMPLETE HACKATHON DEMO FLOW

The website should support this complete judge demonstration:

### STEP 1 â€” CLASSIFY

Open **Identify Waste**

â†’ Click **Use Camera**

â†’ Capture a plastic bottle

â†’ Analyze

Result:

**Plastic Bottle**

**Dry Recyclable**

**94% Confidence**

---

### STEP 2 â€” DISPOSE

Show recommended disposal location.

User submits disposal contribution.

Status:

**Submitted**

---

### STEP 3 â€” VERIFY + REWARD

Contribution becomes:

**Verified**

Then:

**+10 Green Credits**

Status:

**Rewarded**

---

### STEP 4 â€” TRACK E-WASTE

Open:

**E-Waste Tracker**

Show:

**Dell Latitude 5420**

E-Waste ID:

**EW-2026-001**

Scan:

**QR / Barcode**

---

### STEP 5 â€” SHOW AUDIT TRAIL

Display:

**Lab Decommissioned**
â†’
**Collected**
â†’
**Verified**
â†’
**Certified E-Recycler**
â†’
**Recycling Completed**

Show date/time/location/verification at every stage.

---

### STEP 6 â€” PREDICT

Open:

**Smart Bin**

Show:

**42 â†’ 51 â†’ 63 â†’ 76 â†’ 88 â†’ 94%**

Then display:

**94% Full**

**Estimated Overflow: 1h 18m**

**Collection Recommended**

---

### STEP 7 â€” ADMIN IMPACT

Open:

**Admin Dashboard**

Show:

* Waste segregation
* Contamination rate
* Recycling rate
* E-waste lifecycle
* Certified recycler records
* Smart-bin telemetry
* Predictive alerts
* Green Credit verification
* Campus impact

---

# 24. MOST IMPORTANT DESIGN RULE

The final website must NOT look like only a beautiful sustainability dashboard.

It must visually communicate that EcoTrack is a **technical solution** with four connected systems:

**CLASSIFY**
AI / Computer Vision

**TRACK**
QR + Barcode / E-Waste Audit

**PREDICT**
Smart-Bin Telemetry / Prediction

**REWARD**
Verified Green Credits

The homepage, navigation, dashboard and demo flow should repeatedly reinforce these four pillars.

The judge should be able to understand:

**â€œThis platform classifies waste, tracks institutional e-waste to certified recyclers, predicts smart-bin overflow, and rewards verified sustainable actions.â€**

Do not remove the existing EcoTrack features. These requirements are additions and refinements to the existing PRD.

Preserve the existing visual direction:

* Premium environmental technology
* Professional
* Human-designed
* Clean
* Modern
* Responsive
* Minimal but visually impressive
* GitHub-inspired information architecture
* GSAP animations
* ReactBits components where appropriate
* Subtle interactions
* Strong data visualization
* No excessive glassmorphism
* No excessive gradients
* No generic AI-dashboard appearance
* No fake claims about AI/IoT connections

Final product flow:

**CLASSIFY â†’ DISPOSE â†’ VERIFY â†’ REWARD â†’ TRACK â†’ RECYCLE â†’ PREDICT â†’ IMPROVE**
