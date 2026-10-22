# DataSensei AI // Autonomous Data Science Agent & 3D Intelligence Lab

> An immersive, cybernetic AI Agent platform engineered to master data science through problem-first execution. Features a 3D WebGL Quantum Neural Core, hands-free Voice Assistant, live model training sandbox, and real-time streaming telemetry.

---

## 🚀 Live Features & Architectural Overview

### 1. 🌌 Futuristic 3D Quantum Neural Core & Cinematic Design
- **Interactive Three.js Core** (`src/components/Network3DCanvas.jsx`):
  - Fibonacci distribution of 140+ neural nodes with gradient spectral glow.
  - Three gyroscopic orbital rings with independent angular momentum.
  - Moving data packets traveling along synaptic lines.
  - **Audio Reactivity**: Connected directly to the Voice Assistant — pulses dynamically to voice frequencies during speech and listening modes.
  - Interactive mouse tracking with smooth inertia damping.
- **Cinematic Visual Motion**:
  - Deep space obsidian palette (`#06080F`, `#0B0E1A`) with electric cyan (`#00F0FF`), quantum violet (`#9D4EDD`), and matrix emerald (`#00F5A0`) accents.
  - Ambient floating tensor expressions ($\nabla_\theta J$, $\hat{y} = \sigma(Wx+b)$, $\text{Attention}(Q,K,V)$, $L_{\text{BCE}}$) drifting continuously like a high-tech video feed.
  - Glassmorphic panels with frosted backdrop filters and neon edge glows.

### 2. 🎙️ Full Autonomous Voice Assistant & Data Science Problem Solver
- **Dual Voice Engine** (`src/services/voiceAssistant.js`):
  - **Speech-to-Text (STT)**: Web Speech Recognition API with pulsating visual microphone cues and real-time interim speech transcription.
  - **Text-to-Speech (TTS)**: Web SpeechSynthesis API with clean voice delivery, speech speed modulation, audio muting, and 6-band real-time audio waveform animation.
- **Data Science Brain Engine** (`src/services/dataScienceBrain.js`):
  - Trained across Machine Learning, Transformers, Applied Statistics, Feature Engineering, and MLOps.
  - **Agentic Protocol**: Deconstructs the problem -> Diagnoses failure modes (e.g. 95:5 accuracy paradox, data leakage) -> Formulates step-by-step strategy -> Generates production Python code -> Projects validation metrics -> Speaks concise audio briefing.
  - **"Launch In Data Lab"**: One-click action injects model architectures and hyperparameters directly into the interactive sandbox!

### 3. 🧪 Interactive Live Data Lab & Model Training Sandbox
- **Dataset Selection** (`src/components/DataLabSection.jsx`):
  - Telco Customer Churn (7,043 rows)
  - Credit Card Fraud Detection (284,807 rows, extreme 0.17% imbalance)
  - California Housing Real Estate (20,640 rows)
  - Healthcare Readmission (10,000 rows)
- **Hyperparameter Tuning**:
  - Model family: XGBoost, Deep Neural Network (MLP), Random Forest, Logistic Regression.
  - Learning rate ($\eta$), Estimators / Max Epochs, Regularization penalty ($\lambda$), and Class Weighting (None vs Balanced vs Focal Loss).
- **Live Training Execution**:
  - Real-time epoch iterations with dynamic SVG Loss Convergence Curves (Training vs Validation loss).
  - Interactive **Confusion Matrix Heatmap** (TP, FP, FN, TN).
  - Feature Importance horizontal bar chart.
- **Agent Auto-Optimize**:
  - The Voice Agent speaks an executive diagnosis aloud, updates hyperparameters to resolve weaknesses, and re-trains the model.

### 4. 📊 Real-Time Pipeline Telemetry HUD
- **Live Stream Monitor** (`src/components/LivePipeline.jsx` & `src/components/LiveTelemetryBar.jsx`):
  - Continuous rows ingested, neural batches trained, cross-entropy loss, and p99 inference latency.
  - Five-stage pipeline: Ingestion -> Preprocessing -> Multi-Model Tournament -> Drift Sentry -> FastAPI Deployment.
  - Interactive "Simulate Data Drift" button demonstrating automated agent recovery.

### 5. 🐍 Real CPython 3.12 Backend Engine
- **FastAPI Backend Server** (`backend/server.py`):
  - Runs real Python 3.12 with `scikit-learn` (v1.9.1), `numpy` (v2.5.3), `pandas` (v3.0.6), and `scipy` (v1.18.1).
  - Trains real models on demand via `/api/python/train`.
  - Executes real Python code via `/api/python/execute` with stdout / stderr capture.
  - Seamlessly integrated with both the **Data Lab** and the **Voice Assistant Modal** with "Run in Python" buttons.

### 6. 💼 Industry Tracks & Career Architecture
- US base salary benchmarks (e.g., $195k for LLM Engineers, $162k for Predictive Modeling) with YoY growth trends and top hiring tech companies (`src/components/IndustryWorkSection.jsx`).

---

## 🛠️ Quickstart & Local Development

### 1. Start the Real Python Backend (Terminal 1)
```bash
python3 backend/server.py
# Backend API runs at http://127.0.0.1:8000
```

### 2. Start the Frontend Dev Server (Terminal 2)
```bash
npm install
npm run dev
# Frontend runs at http://localhost:5174
```

### 3. Build Production Bundle
```bash
npm run build
```
