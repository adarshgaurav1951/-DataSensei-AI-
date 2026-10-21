import React, { useState, useEffect } from 'react';

export default function LivePipeline() {
  const [rows, setRows] = useState(320087);
  const [batches, setBatches] = useState(4561);
  const [valLoss, setValLoss] = useState(68.2);
  const [latency, setLatency] = useState(229);

  // Subtle real-time live pulse to make it feel alive!
  useEffect(() => {
    const interval = setInterval(() => {
      setRows(prev => prev + Math.floor(Math.random() * 24) + 1);
      if (Math.random() > 0.4) {
        setBatches(prev => prev + 1);
      }
      setValLoss(prev => +(prev + (Math.random() - 0.5) * 0.1).toFixed(1));
      setLatency(prev => Math.floor(220 + Math.random() * 18));
    }, 1800);

    return () => clearInterval(interval);
  }, []);

  const timeBreakdown = [
    { label: 'Cleaning & prep', pct: 40 },
    { label: 'Data collection/SQL', pct: 20 },
    { label: 'Analysis & visualization', pct: 15 },
    { label: 'Modeling (ML)', pct: 12 },
    { label: 'Reporting/storytelling', pct: 8 },
    { label: 'Deployment/MLOps', pct: 5 },
  ];

  return (
    <section id="live-pipeline" style={{ padding: '70px 0 60px' }}>
      <div className="container">
        {/* Title */}
        <h2 className="section-title">
          Live pipeline
        </h2>
        <p className="section-subtitle">
          A simulated stream that behaves like a real training job, so you can watch the numbers move.
        </p>

        {/* 4 Top Metric Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '16px',
          marginBottom: '24px'
        }}>
          {[
            { label: 'Rows processed', val: rows.toLocaleString() },
            { label: 'Batches trained', val: batches.toLocaleString() },
            { label: 'Validation loss index', val: valLoss },
            { label: 'Inference latency', val: `${latency} ms` },
          ].map((item, idx) => (
            <div 
              key={idx}
              className="editorial-card"
              style={{ padding: '20px', borderRadius: '16px' }}
            >
              <div style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(1.8rem, 2.8vw, 2.3rem)',
                fontWeight: 800,
                color: '#1B1714',
                lineHeight: '1.1',
                marginBottom: '6px'
              }}>
                {item.val}
              </div>
              <div style={{ fontSize: '0.82rem', color: '#7D7368', fontWeight: 500 }}>
                {item.label}
              </div>
            </div>
          ))}
        </div>

        {/* Chart + Where Time Goes Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.4fr 1fr',
          gap: '20px'
        }}>
          {/* Left: Loss Curve Chart Card */}
          <div className="editorial-card" style={{ padding: '26px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#3A322B' }}>
                  Model Convergence Monitor
                </span>
                <span style={{
                  fontSize: '0.74rem',
                  padding: '3px 8px',
                  borderRadius: '999px',
                  background: '#FBECE7',
                  color: '#D9532F',
                  fontWeight: 600
                }}>
                  ● Live Training Stream
                </span>
              </div>

              {/* Loss Curve SVG */}
              <div style={{ width: '100%', height: '180px', position: 'relative' }}>
                <svg width="100%" height="100%" viewBox="0 0 500 160" preserveAspectRatio="none">
                  {/* Subtle Grid lines */}
                  <line x1="0" y1="40" x2="500" y2="40" stroke="#F0E8DF" strokeDasharray="4 4" />
                  <line x1="0" y1="80" x2="500" y2="80" stroke="#F0E8DF" strokeDasharray="4 4" />
                  <line x1="0" y1="120" x2="500" y2="120" stroke="#F0E8DF" strokeDasharray="4 4" />

                  {/* Validation Loss curve (upper line, slight plateau) */}
                  <path
                    d="M 0 55 Q 80 50, 160 58 T 320 62 T 500 50"
                    fill="none"
                    stroke="#9E7665"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />

                  {/* Training Loss curve (lower line, converging downwards) */}
                  <path
                    d="M 0 125 Q 90 120, 180 124 T 340 122 T 500 126"
                    fill="none"
                    stroke="#D9532F"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>

                {/* Overfitting Gap Highlight Label */}
                <div style={{
                  position: 'absolute',
                  right: '20px',
                  top: '48%',
                  transform: 'translateY(-50%)',
                  background: '#FFFFFF',
                  border: '1px solid #E5DCD2',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  fontSize: '0.72rem',
                  color: '#8A4F3B',
                  fontWeight: 600,
                  boxShadow: '0 2px 6px rgba(0,0,0,0.04)'
                }}>
                  Overfitting gap Δ
                </div>
              </div>
            </div>

            <p style={{ fontSize: '0.86rem', color: '#7D7368', marginTop: '16px', borderTop: '1px solid #F0E8DF', paddingTop: '14px' }}>
              Training vs validation loss. Watch for the gap, that is overfitting.
            </p>
          </div>

          {/* Right: Where time goes */}
          <div className="editorial-card" style={{ padding: '26px' }}>
            <h3 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.35rem',
              fontWeight: 700,
              color: '#1B1714',
              marginBottom: '20px'
            }}>
              Where time goes
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {timeBreakdown.map((item) => (
                <div key={item.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
                  <span style={{ fontSize: '0.86rem', color: '#3A322B', fontWeight: 500, minWidth: '150px' }}>
                    {item.label}
                  </span>
                  <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                      height: '10px',
                      background: '#F0E8DE',
                      borderRadius: '999px',
                      flex: 1,
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        height: '100%',
                        width: `${item.pct * 2.5}%`,
                        maxWidth: '100%',
                        background: '#D9532F',
                        borderRadius: '999px',
                        transition: 'width 0.8s ease'
                      }} />
                    </div>
                    <span style={{ fontSize: '0.85rem', color: '#1B1714', fontWeight: 700, minWidth: '34px', textAlign: 'right' }}>
                      {item.pct}%
                    </span>
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
