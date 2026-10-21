import React from 'react';
import { Bot, Sparkles, Terminal } from 'lucide-react';

export default function Navbar({ onOpenAgent }) {
  const navLinks = [
    { label: 'Live data', href: '#live-pipeline' },
    { label: 'Industry work', href: '#industry-work' },
    { label: 'Projects', href: '#real-world-projects' },
    { label: 'Skill path', href: '#skill-path' },
    { label: 'Tools', href: '#tools-platforms' },
    { label: 'AI in dev', href: '#ai-in-dev' },
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
      background: 'rgba(250, 246, 240, 0.94)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid #ECE4DC'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '64px'
      }}>
        {/* Brand / Logo */}
        <a 
          href="#"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            textDecoration: 'none',
            color: 'inherit'
          }}
        >
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            background: '#D9532F',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF'
          }}>
            <Terminal size={18} strokeWidth={2.4} />
          </div>
          <span style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.28rem',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            color: '#1B1714'
          }}>
            DataSensei<span style={{ color: '#D9532F' }}>.ai</span>
          </span>
        </a>

        {/* Navigation Links matching the screenshot */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '22px' }}>
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => scrollTo(e, item.href)}
              style={{
                fontSize: '0.92rem',
                color: '#3B332B',
                fontWeight: 500,
                textDecoration: 'none',
                transition: 'color 0.15s ease'
              }}
              onMouseEnter={(e) => (e.target.style.color = '#D9532F')}
              onMouseLeave={(e) => (e.target.style.color = '#3B332B')}
            >
              {item.label}
            </a>
          ))}

          {/* Ask the agent link */}
          <button
            onClick={onOpenAgent}
            style={{
              background: 'none',
              border: 'none',
              color: '#D9532F',
              fontSize: '0.92rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: '6px',
              backgroundColor: '#FBECE7'
            }}
          >
            <Sparkles size={15} />
            <span>Ask the agent</span>
          </button>
        </nav>
      </div>
    </header>
  );
}
