import React, { useState } from 'react';
import { 
  X, 
  Rocket, 
  CheckCircle, 
  Terminal, 
  Copy, 
  Check, 
  ExternalLink,
  Shield,
  Server,
  Cloud
} from 'lucide-react';

export default function DeploymentModal({ isOpen, onClose }) {
  const [copiedCmd, setCopiedCmd] = useState('');

  if (!isOpen) return null;

  const copyText = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedCmd(key);
    setTimeout(() => setCopiedCmd(''), 2000);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 70,
      background: 'rgba(3, 6, 12, 0.88)',
      backdropFilter: 'blur(14px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px'
    }}>
      <div 
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '780px',
          maxHeight: '90vh',
          overflowY: 'auto',
          background: '#0a0f20',
          border: '1px solid rgba(0, 245, 212, 0.3)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8)',
          padding: '28px'
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span className="badge badge-cyan">
                <Rocket size={13} /> DEPLOYMENT CENTER
              </span>
              <span className="badge badge-emerald">
                v1.0 Production Ready
              </span>
            </div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff' }}>
              Deploy DataForge AI Learning Platform
            </h2>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              padding: '6px',
              color: '#94a3b8',
              cursor: 'pointer'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Live Local Status */}
        <div style={{
          background: 'rgba(16, 185, 129, 0.08)',
          border: '1px solid rgba(16, 185, 129, 0.25)',
          borderRadius: '10px',
          padding: '16px',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: '#10b981',
              boxShadow: '0 0 10px #10b981'
            }} />
            <div>
              <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#fff' }}>
                Local Development & Preview Server: Active
              </div>
              <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                Running with Vite on <strong>http://localhost:5174</strong> (All 12 projects, 16 skills, 15 tools loaded)
              </div>
            </div>
          </div>
          <span className="badge badge-emerald">200 OK</span>
        </div>

        {/* Deployment Options */}
        <div style={{ marginBottom: '24px' }}>
          <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#e2e8f0', marginBottom: '12px' }}>
            Production Cloud Deployment Steps:
          </h4>

          {/* Vercel */}
          <div className="glass-panel" style={{ padding: '16px', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#fff', fontWeight: 700, fontSize: '0.9rem' }}>
                <Cloud size={16} color="#00f5d4" />
                <span>Deploy to Vercel (Recommended)</span>
              </div>
              <button
                onClick={() => copyText('npx vercel --prod', 'vercel')}
                className="btn-secondary"
                style={{ padding: '4px 10px', fontSize: '0.74rem' }}
              >
                {copiedCmd === 'vercel' ? <Check size={12} color="#10b981" /> : <Copy size={12} />}
                <span>{copiedCmd === 'vercel' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '8px' }}>
              Deploys the static optimized build and edge routes instantly to Vercel's global CDN:
            </p>
            <pre className="code-snippet" style={{ fontSize: '0.78rem', padding: '10px' }}>
              <code>npm run build && npx vercel --prod</code>
            </pre>
          </div>

          {/* GitHub / Netlify */}
          <div className="glass-panel" style={{ padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#fff', fontWeight: 700, fontSize: '0.9rem' }}>
                <Server size={16} color="#8b5cf6" />
                <span>Standard Production Bundle (Dist)</span>
              </div>
              <button
                onClick={() => copyText('npm run build', 'build')}
                className="btn-secondary"
                style={{ padding: '4px 10px', fontSize: '0.74rem' }}
              >
                {copiedCmd === 'build' ? <Check size={12} color="#10b981" /> : <Copy size={12} />}
                <span>{copiedCmd === 'build' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '8px' }}>
              Generates production-optimized HTML, CSS, and JS in the <code>dist/</code> folder:
            </p>
            <pre className="code-snippet" style={{ fontSize: '0.78rem', padding: '10px' }}>
              <code>npm run build</code>
            </pre>
          </div>
        </div>

        {/* Environment Keys (v2 Prep) */}
        <div style={{ background: 'rgba(5, 8, 16, 0.5)', padding: '16px', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#fbbf24', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>
            <Shield size={16} />
            <span>Required Environment Variables for v2 Live Claude Agent:</span>
          </div>
          <div style={{ fontSize: '0.8rem', color: '#94a3b8', lineHeight: '1.6' }}>
            When connecting live streaming API keys in v2, create a <code>.env.local</code> file:
          </div>
          <pre className="code-snippet" style={{ fontSize: '0.76rem', marginTop: '8px', color: '#a78bfa' }}>
            <code>{`ANTHROPIC_API_KEY=sk-ant-api03-...
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOi...`}</code>
          </pre>
        </div>

        <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end' }}>
          <button onClick={onClose} className="btn-primary" style={{ padding: '9px 20px' }}>
            <span>Done</span>
          </button>
        </div>
      </div>
    </div>
  );
}
