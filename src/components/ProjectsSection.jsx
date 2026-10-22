import React, { useState } from 'react';
import { PROJECTS_12 } from '../data/projectsData';
import { Sparkles, ArrowRight, Database, Clock, TrendingUp, CheckCircle2, Search, Filter } from 'lucide-react';

export default function ProjectsSection({ onOpenProject, activeFilter, onClearFilter, onLaunchVoiceWithProject }) {
  const [filterText, setFilterText] = useState('');

  const displayProjects = PROJECTS_12.filter((p) => {
    const textMatch = 
      p.title.toLowerCase().includes(filterText.toLowerCase()) ||
      p.domain.toLowerCase().includes(filterText.toLowerCase()) ||
      p.datasetName.toLowerCase().includes(filterText.toLowerCase()) ||
      p.tools.some(t => t.toLowerCase().includes(filterText.toLowerCase()));

    const domainMatch = !activeFilter || activeFilter === 'All' || p.domain === activeFilter;

    return textMatch && domainMatch;
  });

  return (
    <section id="real-world-projects" style={{ padding: '80px 0 60px', position: 'relative' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '28px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span className="pill-tag" style={{ background: 'rgba(0, 240, 255, 0.12)', borderColor: 'var(--neon-cyan)', color: 'var(--neon-cyan)' }}>
                <Database size={13} />
                <span>12 PRODUCTION PORTFOLIO BENCHMARKS</span>
              </span>
            </div>

            <h2 className="section-title">
              Real-World Data Science Projects
            </h2>
            <p className="section-subtitle" style={{ marginBottom: 0 }}>
              Production datasets with complete Python code, leakage-free feature pipelines, and interactive agent walkthroughs.
            </p>
          </div>

          {activeFilter && activeFilter !== 'All' && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '0.82rem', color: '#94A3B8' }}>Active Filter:</span>
              <span className="pill-tag" style={{ background: 'rgba(0, 240, 255, 0.15)', color: 'var(--neon-cyan)', borderColor: 'var(--neon-cyan)' }}>
                {activeFilter}
              </span>
              <button
                onClick={onClearFilter}
                style={{ background: 'none', border: 'none', color: '#94A3B8', fontSize: '0.8rem', cursor: 'pointer', textDecoration: 'underline' }}
              >
                Clear Filter
              </button>
            </div>
          )}
        </div>

        {/* Filter Input */}
        <div style={{ marginBottom: '32px', maxWidth: '460px', position: 'relative' }}>
          <Search size={16} color="#64748B" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            className="clean-input"
            placeholder="Search projects: churn, fraud, NLP, PyTorch, SQL..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            style={{ width: '100%', paddingLeft: '44px', borderRadius: '12px' }}
          />
        </div>

        {/* 3-Column Projects Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
          gap: '24px'
        }}>
          {displayProjects.map((p) => (
            <div
              key={p.id}
              className="cyber-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                cursor: 'pointer'
              }}
              onClick={() => onOpenProject(p)}
            >
              <div>
                {/* Domain & Difficulty */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span style={{ fontSize: '0.74rem', color: 'var(--neon-cyan)', fontWeight: 700, textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
                    {p.domain}
                  </span>
                  <span className="pill-tag" style={{ fontSize: '0.72rem', padding: '2px 8px' }}>
                    {p.difficulty}
                  </span>
                </div>

                {/* Title */}
                <h3 style={{
                  fontSize: '1.24rem',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  marginBottom: '8px',
                  lineHeight: '1.3'
                }}>
                  {p.title}
                </h3>

                {/* Summary */}
                <p style={{ fontSize: '0.86rem', color: '#94A3B8', marginBottom: '16px', lineHeight: '1.5' }}>
                  {p.summary}
                </p>

                {/* Dataset & Frequency Meta */}
                <div style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  borderRadius: '10px',
                  padding: '10px 14px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                  fontSize: '0.8rem',
                  marginBottom: '18px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#E2E8F0' }}>
                    <Database size={13} color="var(--neon-cyan)" />
                    <span>Data: <strong>{p.datasetName}</strong> ({p.datasetSize.split('•')[0].trim()})</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#94A3B8' }}>
                    <TrendingUp size={13} color="var(--neon-emerald)" />
                    <span>Industry Frequency: <strong>{p.industryFreq.split(' ')[0]}</strong></span>
                  </div>
                </div>
              </div>

              {/* Bottom: Tools + Actions */}
              <div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
                  {p.tools.slice(0, 4).map((tool) => (
                    <span key={tool} className="pill-tag" style={{ fontSize: '0.74rem' }}>
                      {tool}
                    </span>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: '10px', borderTop: '1px solid rgba(255, 255, 255, 0.06)', paddingTop: '14px' }}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenProject(p);
                    }}
                    className="btn-cyber-outline"
                    style={{ flex: 1, padding: '8px 12px', fontSize: '0.82rem' }}
                  >
                    <span>View Pipeline</span>
                    <ArrowRight size={13} />
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onLaunchVoiceWithProject) onLaunchVoiceWithProject(p);
                    }}
                    className="btn-neon-cyan"
                    style={{ padding: '8px 14px', fontSize: '0.82rem' }}
                    title="Ask AI Agent to solve this project"
                  >
                    <Sparkles size={13} />
                    <span>Solve With AI</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {displayProjects.length === 0 && (
          <div className="cyber-card" style={{ textAlign: 'center', padding: '48px' }}>
            <p style={{ color: '#94A3B8', marginBottom: '14px' }}>No projects match your current query.</p>
            <button onClick={() => { setFilterText(''); onClearFilter(); }} className="btn-neon-cyan">
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
