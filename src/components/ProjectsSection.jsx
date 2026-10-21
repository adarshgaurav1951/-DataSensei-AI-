import React, { useState } from 'react';
import { PROJECTS_12 } from '../data/projectsData';

export default function ProjectsSection({ onOpenProject, activeFilter, onClearFilter }) {
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
    <section id="real-world-projects" style={{ padding: '60px 0' }}>
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h2 className="section-title">
              Real-world projects
            </h2>
            <p className="section-subtitle">
              Each uses a public dataset. Tap a card for the full walkthrough.
            </p>
          </div>

          {activeFilter && activeFilter !== 'All' && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '0.85rem', color: '#6B6258' }}>Filter:</span>
              <span className="pill-tag" style={{ background: '#FBECE7', color: '#D9532F', borderColor: '#D9532F' }}>
                {activeFilter}
              </span>
              <button
                onClick={onClearFilter}
                style={{ background: 'none', border: 'none', color: '#D9532F', fontSize: '0.82rem', cursor: 'pointer', textDecoration: 'underline' }}
              >
                Clear
              </button>
            </div>
          )}
        </div>

        {/* Filter Input matching Image 3 */}
        <div style={{ marginBottom: '28px', maxWidth: '420px' }}>
          <input
            type="text"
            className="clean-input"
            placeholder="Filter: churn, fraud, NLP, SQL..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            style={{ width: '100%', borderRadius: '12px', padding: '12px 16px' }}
          />
        </div>

        {/* 3-Column Projects Grid matching Image 3 */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: '20px'
        }}>
          {displayProjects.map((p) => (
            <div
              key={p.id}
              className="editorial-card"
              onClick={() => onOpenProject(p)}
              style={{
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                {/* Title */}
                <h3 style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.24rem',
                  fontWeight: 700,
                  color: '#1B1714',
                  marginBottom: '6px'
                }}>
                  {p.title.replace(' Engine', '').replace(' Scoring', '')}
                </h3>

                {/* Subtitle / Domain context */}
                <div style={{ fontSize: '0.86rem', color: '#6B6258', marginBottom: '12px' }}>
                  {p.domain === 'Predictive Modeling' ? 'Telecom, SaaS, banking' : 
                   p.domain === 'Forecasting' ? 'Retail, supply chain' :
                   p.domain === 'NLP' ? 'E-commerce, media' :
                   p.domain === 'Computer Vision' ? 'Healthcare, manufacturing' :
                   p.domain === 'BI & Analytics' ? 'Enterprise, executive reporting' :
                   p.domain === 'Experimentation' ? 'Product, growth analytics' : 'Industry core'}
                </div>

                {/* Data: */}
                <div style={{ fontSize: '0.84rem', color: '#1B1714', marginBottom: '6px' }}>
                  <strong>Data:</strong> {p.datasetName} ({p.datasetSize.split('•')[0].trim()})
                </div>

                {/* Frequency: */}
                <div style={{ fontSize: '0.84rem', color: '#6B6258', marginBottom: '18px' }}>
                  <strong>Frequency:</strong> {p.industryFreq.split(' ')[0]}
                </div>
              </div>

              {/* Tags at bottom */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {p.tools.slice(0, 4).map((tool) => (
                  <span key={tool} className="pill-tag">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {displayProjects.length === 0 && (
          <div className="editorial-card" style={{ textAlign: 'center', padding: '40px' }}>
            <p style={{ color: '#6B6258', marginBottom: '12px' }}>No projects match your filter.</p>
            <button onClick={() => { setFilterText(''); onClearFilter(); }} className="btn-terracotta">
              Show All Projects
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
