import React from 'react';
import { Bot, Sparkles, Terminal, Mic, Cpu, FlaskConical } from 'lucide-react';

export default function Navbar({ onOpenAgent, isSpeaking, isListening }) {
  const navLinks = [
    { label: 'Data Lab', href: '#data-lab' },
    { label: 'Live Pipeline', href: '#live-pipeline' },
    { label: 'Industry Tracks', href: '#industry-work' },
    { label: 'Projects', href: '#real-world-projects' },
    { label: 'Skill Path', href: '#skill-path' },
    { label: 'Tools', href: '#tools-platforms' },
    { label: 'AI in Dev', href: '#ai-in-dev' },
  ];

  const scrollTo = (e, id) => {
    e.preventDefault();
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      background: 'rgba(7, 10, 18, 0.88)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(0, 240, 255, 0.15)'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '68px'
      }}>
        {/* Brand / Logo */}
        <a 
          href="#"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            textDecoration: 'none',
            color: 'inherit'
          }}
        >
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #00F0FF 0%, #9D4EDD 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#040814',
            boxShadow: '0 0 20px rgba(0, 240, 255, 0.5)'
          }}>
            <Cpu size={20} strokeWidth={2.4} />
          </div>
          <div>
            <span style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.32rem',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              color: '#FFFFFF'
            }}>
              DataSensei<span style={{ color: 'var(--neon-cyan)' }}>.ai</span>
            </span>
            <span style={{
              display: 'block',
              fontSize: '0.66rem',
              color: 'var(--neon-emerald)',
              fontFamily: 'var(--font-mono)',
              letterSpacing: '0.08em',
              marginTop: '-2px'
            }}>
              DATA SCIENCE AGENT
            </span>
          </div>
        </a>

        {/* Navigation Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => scrollTo(e, item.href)}
              style={{
                fontSize: '0.90rem',
                color: '#94A3B8',
                fontWeight: 500,
                textDecoration: 'none',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--neon-cyan)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#94A3B8';
              }}
            >
              {item.label === 'Data Lab' && <FlaskConical size={14} color="var(--neon-cyan)" />}
              <span>{item.label}</span>
            </a>
          ))}

          {/* Voice Assistant Launch Button */}
          <button
            onClick={onOpenAgent}
            className="btn-neon-cyan"
            style={{
              padding: '9px 18px',
              borderRadius: '10px',
              fontSize: '0.86rem',
              boxShadow: (isSpeaking || isListening) ? '0 0 25px rgba(0, 240, 255, 0.6)' : 'none'
            }}
          >
            <Mic size={16} className={(isSpeaking || isListening) ? 'agent-aura-pulse' : ''} />
            <span>Voice Agent</span>
          </button>
        </nav>
      </div>
    </header>
  );
}
