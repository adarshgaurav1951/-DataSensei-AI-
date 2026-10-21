import React from 'react';
import { 
  Bot, 
  Terminal, 
  Compass, 
  Layers, 
  Database, 
  Rocket, 
  Sparkles,
  ExternalLink
} from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, onOpenAgent, onOpenDeploy }) {
  const navItems = [
    { id: 'projects', label: '12 Flagship Projects', icon: Layers },
    { id: 'agent-studio', label: 'AI Teaching Agent', icon: Bot, highlight: true },
    { id: 'skill-graph', label: '16 Skills & 15 Tools', icon: Compass },
    { id: 'datasets', label: 'Dataset Explorer', icon: Database },
  ];

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 40,
      background: 'rgba(6, 9, 17, 0.85)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '74px'
      }}>
        {/* Brand */}
        <div 
          onClick={() => setActiveTab('projects')}
          style={{ display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer' }}
        >
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #00f5d4 0%, #8b5cf6 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 20px rgba(0, 245, 212, 0.35)',
            color: '#050811'
          }}>
            <Terminal size={24} strokeWidth={2.6} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '1.28rem', fontWeight: 800, letterSpacing: '-0.02em', color: '#fff' }}>
                DataForge
              </span>
              <span className="badge badge-cyan" style={{ fontSize: '0.68rem', padding: '2px 8px' }}>
                AI MENTOR
              </span>
            </div>
            <div style={{ fontSize: '0.74rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: '#10b981',
                boxShadow: '0 0 8px #10b981',
                display: 'inline-block'
              }} />
              <span>Teaching Agent v1.0 • Ready to Guide</span>
            </div>
          </div>
        </div>

        {/* Center Tabs */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '9px 16px',
                  borderRadius: '10px',
                  fontSize: '0.88rem',
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? '#00f5d4' : '#cbd5e1',
                  background: isActive ? 'rgba(0, 245, 212, 0.08)' : 'transparent',
                  border: isActive ? '1px solid rgba(0, 245, 212, 0.25)' : '1px solid transparent',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  position: 'relative'
                }}
              >
                <Icon size={17} color={isActive ? '#00f5d4' : (item.highlight ? '#a78bfa' : '#94a3b8')} />
                <span>{item.label}</span>
                {item.highlight && !isActive && (
                  <span style={{
                    position: 'absolute',
                    top: '-3px',
                    right: '-3px',
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: '#8b5cf6',
                    boxShadow: '0 0 8px #8b5cf6'
                  }} />
                )}
              </button>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={onOpenAgent}
            className="btn-primary"
            style={{ padding: '8px 16px', fontSize: '0.85rem' }}
          >
            <Sparkles size={16} />
            <span>Ask Teaching Agent</span>
          </button>

          <button
            onClick={onOpenDeploy}
            className="btn-secondary"
            style={{ padding: '8px 14px', fontSize: '0.85rem' }}
            title="Deploy DataForge & View PRD"
          >
            <Rocket size={16} color="#00f5d4" />
            <span>Deploy</span>
          </button>
        </div>
      </div>
    </header>
  );
}
