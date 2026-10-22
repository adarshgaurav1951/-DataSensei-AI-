import React, { useState, useEffect } from 'react';
import { Activity, Cpu, Database, Zap, ShieldCheck, TrendingUp, Sparkles } from 'lucide-react';

export default function LiveTelemetryBar({ onOpenAgent }) {
  const [tokensPerSec, setTokensPerSec] = useState(148200);
  const [gpuLoad, setGpuLoad] = useState(84.2);
  const [latency, setLatency] = useState(11.8);
  const [driftIndex, setDriftIndex] = useState(0.041);

  // Live fluctuating telemetry simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setTokensPerSec(prev => Math.floor(prev + (Math.random() - 0.48) * 850));
      setGpuLoad(prev => +(prev + (Math.random() - 0.5) * 0.4).toFixed(1));
      setLatency(prev => +(11.2 + Math.random() * 1.4).toFixed(1));
      setDriftIndex(prev => +(0.038 + Math.random() * 0.008).toFixed(3));
    }, 2200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      background: 'rgba(8, 11, 20, 0.95)',
      borderBottom: '1px solid rgba(0, 240, 255, 0.15)',
      padding: '8px 0',
      fontSize: '0.78rem',
      fontFamily: 'var(--font-mono)',
      color: '#94A3B8',
      position: 'relative',
      zIndex: 40
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '14px'
      }}>
        {/* Left: Global System Status */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span className="status-dot-active" />
          <span style={{ color: '#E2E8F0', fontWeight: 600 }}>SYSTEM:</span>
          <span style={{ color: 'var(--neon-cyan)' }}>NEURAL COGNITION ENGINE ONLINE</span>
        </div>

        {/* Center: Live Streaming Telemetry */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Activity size={13} color="var(--neon-emerald)" />
            <span>Throughput:</span>
            <strong style={{ color: '#FFFFFF' }}>{tokensPerSec.toLocaleString()} evt/s</strong>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Cpu size={13} color="var(--neon-violet)" />
            <span>Cluster Load:</span>
            <strong style={{ color: '#FFFFFF' }}>{gpuLoad}% VRAM</strong>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Zap size={13} color="var(--neon-amber)" />
            <span>Latency:</span>
            <strong style={{ color: 'var(--neon-cyan)' }}>{latency}ms</strong>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <ShieldCheck size={13} color="var(--neon-emerald)" />
            <span>Drift Index (PSI):</span>
            <strong style={{ color: 'var(--neon-emerald)' }}>{driftIndex} [STABLE]</strong>
          </div>
        </div>

        {/* Right: Quick Launch Voice Agent */}
        <div>
          <button
            onClick={onOpenAgent}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--neon-cyan)',
              cursor: 'pointer',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              fontSize: '0.78rem'
            }}
          >
            <Sparkles size={12} />
            <span>Engage Voice Agent →</span>
          </button>
        </div>
      </div>
    </div>
  );
}
