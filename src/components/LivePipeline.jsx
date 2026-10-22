import React, { useState, useEffect } from 'react';
import { Activity, AlertTriangle, CheckCircle2, Cpu, Database, Flame, RefreshCw, Zap } from 'lucide-react';

export default function LivePipeline() {
  const [rows, setRows] = useState(384290);
  const [batches, setBatches] = useState(6120);
  const [valLoss, setValLoss] = useState(0.082);
  const [latency, setLatency] = useState(8.4);
  const [pipelineStatus, setPipelineStatus] = useState('NOMINAL');
  const [activeStep, setActiveStep] = useState(2);

  // Dynamic live stream simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setRows(prev => prev + Math.floor(Math.random() * 38) + 12);
      if (Math.random() > 0.4) {
        setBatches(prev => prev + 1);
      }
      setValLoss(prev => +(prev + (Math.random() - 0.5) * 0.004).toFixed(3));
      setLatency(prev => +(7.8 + Math.random() * 1.8).toFixed(1));
    }, 1600);

    return () => clearInterval(interval);
  }, []);

  const pipelineStages = [
    { name: '1. Ingestion & RLS Isolation', speed: '42,000 evt/s', status: 'Optimal', tag: 'Kafka/Postgres' },
    { name: '2. Leakage-Proof Preprocessing', speed: '12ms / batch', status: 'Active', tag: 'ColumnTransformer' },
    { name: '3. Multi-Model Tournament', speed: 'XGBoost & PyTorch', status: 'Running', tag: 'Optuna Tuning' },
    { name: '4. Statistical Drift Sentry', speed: 'PSI = 0.038', status: 'Guarded', tag: 'Evidently AI' },
    { name: '5. Low-Latency API Deployment', speed: '8.4ms p99', status: 'Live', tag: 'FastAPI / ONNX' }
  ];

  const handleSimulateDrift = () => {
    setPipelineStatus('DRIFT DETECTED - AUTO RETRAINING');
    setValLoss(0.245);
    setTimeout(() => {
      setValLoss(0.086);
      setPipelineStatus('NOMINAL (RECOVERED BY AGENT)');
    }, 3200);
  };

  const timeBreakdown = [
    { label: 'Data Cleaning & Preprocessing', pct: 40, tech: 'Pandas, NumPy, ColumnTransformer' },
    { label: 'Data Ingestion & SQL Modeling', pct: 20, tech: 'PostgreSQL, CTEs, Window Functions' },
    { label: 'Feature Engineering & EDA', pct: 15, tech: 'Seaborn, Matplotlib, SciPy' },
    { label: 'Model Architecture & Tuning', pct: 12, tech: 'XGBoost, PyTorch, Scikit-Learn' },
    { label: 'Executive Storytelling & BI', pct: 8, tech: 'Tableau, Metric Translation' },
    { label: 'MLOps & Inference Serving', pct: 5, tech: 'Docker, FastAPI, MLflow' },
  ];

  return (
    <section id="live-pipeline" style={{ padding: '80px 0 60px', position: 'relative' }}>
      <div className="container">
        
        {/* Title and Controls */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '32px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span className="pill-tag" style={{ background: 'rgba(0, 245, 160, 0.12)', borderColor: 'var(--neon-emerald)', color: 'var(--neon-emerald)' }}>
                <Activity size={13} />
                <span>STREAMING ARCHITECTURE</span>
              </span>
              <span className="status-dot-active" />
              <span style={{ fontSize: '0.78rem', color: '#94A3B8', fontFamily: 'var(--font-mono)' }}>
                {pipelineStatus}
              </span>
            </div>

            <h2 className="section-title">
              Real-Time AI Pipeline Telemetry
            </h2>
            <p className="section-subtitle" style={{ marginBottom: 0 }}>
              Live production stream telemetry. Watch distributed batches process, loss converge, and drift alerts trigger in real time.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={handleSimulateDrift}
              className="btn-cyber-outline"
              style={{ fontSize: '0.82rem', borderColor: 'rgba(255, 94, 126, 0.4)', color: 'var(--neon-coral)' }}
            >
              <AlertTriangle size={15} />
              <span>Simulate Data Drift</span>
            </button>
          </div>
        </div>

        {/* 4 Top Metric Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '16px',
          marginBottom: '28px'
        }}>
          {[
            { label: 'Rows Ingested & Cleaned', val: rows.toLocaleString(), color: 'var(--neon-cyan)' },
            { label: 'Neural Batches Optimized', val: batches.toLocaleString(), color: 'var(--neon-emerald)' },
            { label: 'Cross-Entropy Loss Index', val: valLoss, color: valLoss > 0.15 ? 'var(--neon-coral)' : '#FFFFFF' },
            { label: 'p99 Inference Latency', val: `${latency} ms`, color: 'var(--neon-violet)' },
          ].map((item, idx) => (
            <div 
              key={idx}
              className="cyber-card"
              style={{ padding: '22px' }}
            >
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.8rem, 2.8vw, 2.4rem)',
                fontWeight: 800,
                color: item.color,
                lineHeight: '1.1',
                marginBottom: '6px'
              }}>
                {item.val}
              </div>
              <div style={{ fontSize: '0.82rem', color: '#94A3B8', fontWeight: 500 }}>
                {item.label}
              </div>
            </div>
          ))}
        </div>

        {/* Pipeline Stages Flow Strip */}
        <div className="cyber-card" style={{ padding: '20px', marginBottom: '28px' }}>
          <div style={{ fontSize: '0.82rem', color: '#94A3B8', marginBottom: '14px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Zap size={14} color="var(--neon-cyan)" />
            <span>ACTIVE 5-STAGE END-TO-END DATA SCIENCE PIPELINE:</span>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '12px'
          }}>
            {pipelineStages.map((stage, idx) => (
              <div
                key={idx}
                style={{
                  padding: '12px 14px',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(0, 240, 255, 0.15)',
                  position: 'relative'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#FFFFFF' }}>{stage.name}</span>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--neon-emerald)' }} />
                </div>
                <div style={{ fontSize: '0.74rem', color: 'var(--neon-cyan)', fontFamily: 'var(--font-mono)' }}>
                  {stage.speed}
                </div>
                <div style={{ fontSize: '0.72rem', color: '#64748B', marginTop: '4px' }}>
                  {stage.tag}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chart + Where Time Goes Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.4fr 1fr',
          gap: '24px'
        }}>
          {/* Left: Model Convergence Monitor */}
          <div className="cyber-card" style={{ padding: '26px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <span style={{ fontSize: '1rem', fontWeight: 700, color: '#FFFFFF' }}>
                  Model Loss Convergence Monitor
                </span>
                <span className="pill-tag" style={{ background: 'rgba(0, 240, 255, 0.1)', borderColor: 'var(--neon-cyan)', color: 'var(--neon-cyan)' }}>
                  ● Streaming GPU Telemetry
                </span>
              </div>

              {/* Loss Curve SVG */}
              <div style={{ width: '100%', height: '180px', position: 'relative' }}>
                <svg width="100%" height="100%" viewBox="0 0 500 160" preserveAspectRatio="none">
                  {/* Grid lines */}
                  <line x1="0" y1="40" x2="500" y2="40" stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />
                  <line x1="0" y1="80" x2="500" y2="80" stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />
                  <line x1="0" y1="120" x2="500" y2="120" stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />

                  {/* Validation Loss curve (upper line) */}
                  <path
                    d="M 0 50 Q 100 45, 200 52 T 350 48 T 500 42"
                    fill="none"
                    stroke="var(--neon-coral)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeDasharray="4 2"
                  />

                  {/* Training Loss curve (converging downwards) */}
                  <path
                    d="M 0 120 Q 90 95, 200 68 T 350 52 T 500 46"
                    fill="none"
                    stroke="var(--neon-cyan)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>

                {/* Overfitting Gap Highlight Label */}
                <div style={{
                  position: 'absolute',
                  right: '20px',
                  top: '38%',
                  transform: 'translateY(-50%)',
                  background: 'rgba(10, 14, 26, 0.9)',
                  border: '1px solid rgba(0, 240, 255, 0.3)',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  fontSize: '0.74rem',
                  color: 'var(--neon-cyan)',
                  fontWeight: 600,
                  boxShadow: '0 0 15px rgba(0, 240, 255, 0.2)'
                }}>
                  Generalization Gap Δ 0.038
                </div>
              </div>
            </div>

            <p style={{ fontSize: '0.86rem', color: '#94A3B8', marginTop: '16px', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '14px' }}>
              Training (Cyan) vs Validation (Coral) loss. Notice how decoupled weight decay prevents late-stage validation divergence.
            </p>
          </div>

          {/* Right: Where Data Scientists Spend Time */}
          <div className="cyber-card" style={{ padding: '26px' }}>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: 700,
              color: '#FFFFFF',
              marginBottom: '18px'
            }}>
              Where Working Time Goes
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {timeBreakdown.map((item) => (
                <div key={item.label} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem' }}>
                    <span style={{ color: '#E2E8F0', fontWeight: 600 }}>{item.label}</span>
                    <span style={{ color: 'var(--neon-cyan)', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                      {item.pct}%
                    </span>
                  </div>

                  <div style={{
                    height: '8px',
                    background: 'rgba(255, 255, 255, 0.06)',
                    borderRadius: '999px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      height: '100%',
                      width: `${item.pct * 2.5}%`,
                      maxWidth: '100%',
                      background: 'linear-gradient(90deg, var(--neon-cyan), var(--neon-violet))',
                      borderRadius: '999px',
                      transition: 'width 0.8s ease'
                    }} />
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#64748B' }}>
                    {item.tech}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
