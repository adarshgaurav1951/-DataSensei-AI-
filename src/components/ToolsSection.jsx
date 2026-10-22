import React, { useState } from 'react';
import { TOOLS_15, PROJECTS_12 } from '../data/projectsData';
import { Cpu, Terminal, ArrowRight, Wrench, X, Sparkles } from 'lucide-react';

export default function ToolsSection({ onOpenProject }) {
  const [selectedTool, setSelectedTool] = useState(null);

  const toolsList = [
    { name: 'Python', role: 'Primary Language', version: 'v3.12', badge: 'Core' },
    { name: 'PyTorch', role: 'Deep Learning & Neural Graphs', version: 'v2.5', badge: 'Neural' },
    { name: 'scikit-learn', role: 'Classical Estimators & Pipelines', version: 'v1.5', badge: 'ML' },
    { name: 'XGBoost', role: 'Extreme Gradient Boosted Trees', version: 'v2.1', badge: 'SOTA' },
    { name: 'pandas', role: 'High-Performance Dataframes', version: 'v2.2', badge: 'Wrangling' },
    { name: 'NumPy', role: 'Vectorized C-Array Operations', version: 'v2.0', badge: 'Vector' },
    { name: 'Hugging Face', role: 'Pretrained Transformer Ecosystem', version: 'v4.45', badge: 'GenAI' },
    { name: 'Jupyter', role: 'Interactive Reproducible Notebooks', version: 'v7.2', badge: 'IDE' },
    { name: 'Google Colab', role: 'Free Cloud T4/A100 GPU Pods', version: 'Cloud', badge: 'GPU' },
    { name: 'SciPy', role: 'Hypothesis Tests & Causal Stats', version: 'v1.14', badge: 'Stats' },
    { name: 'Seaborn', role: 'Statistical Multi-Facet Charts', version: 'v0.13', badge: 'Viz' },
    { name: 'spaCy', role: 'Industrial Production NLP Engine', version: 'v3.7', badge: 'NLP' },
    { name: 'TensorFlow', role: 'Enterprise Model Deployment', version: 'v2.17', badge: 'Serving' },
    { name: 'Keras', role: 'Multi-Backend Neural Interface', version: 'v3.5', badge: 'API' },
    { name: 'NLTK', role: 'Linguistic Tokenization & Lexicons', version: 'v3.9', badge: 'NLP' }
  ];

  return (
    <section id="tools-platforms" style={{ padding: '80px 0 60px', position: 'relative' }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ marginBottom: '36px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span className="pill-tag" style={{ background: 'rgba(0, 240, 255, 0.12)', borderColor: 'var(--neon-cyan)', color: 'var(--neon-cyan)' }}>
              <Wrench size={13} />
              <span>THE MODERN AI & DATA TOOLCHAIN</span>
            </span>
          </div>

          <h2 className="section-title">
            Industry Tools & Frameworks
          </h2>
          <p className="section-subtitle">
            The 15 industry-standard frameworks powering top ML teams. Tap any tool to reveal its integrated projects.
          </p>
        </div>

        {/* 15-Tool Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: '16px',
          marginBottom: selectedTool ? '24px' : '0'
        }}>
          {toolsList.map((t) => {
            const isSelected = selectedTool === t.name;
            return (
              <div
                key={t.name}
                onClick={() => setSelectedTool(isSelected ? null : t.name)}
                className="cyber-card"
                style={{
                  cursor: 'pointer',
                  padding: '18px 20px',
                  border: isSelected ? '1px solid var(--neon-cyan)' : '1px solid rgba(255, 255, 255, 0.08)',
                  background: isSelected ? 'rgba(0, 240, 255, 0.14)' : 'rgba(14, 18, 30, 0.72)',
                  boxShadow: isSelected ? '0 0 25px rgba(0, 240, 255, 0.25)' : 'none'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <div style={{
                    fontSize: '1.1rem',
                    fontWeight: 800,
                    color: isSelected ? 'var(--neon-cyan)' : '#FFFFFF'
                  }}>
                    {t.name}
                  </div>
                  <span style={{
                    fontSize: '0.68rem',
                    background: 'rgba(255, 255, 255, 0.06)',
                    color: '#94A3B8',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    fontFamily: 'var(--font-mono)'
                  }}>
                    {t.badge}
                  </span>
                </div>

                <div style={{ fontSize: '0.82rem', color: '#94A3B8', lineHeight: '1.4' }}>
                  {t.role}
                </div>

                <div style={{ fontSize: '0.72rem', color: 'var(--neon-cyan)', marginTop: '8px', fontFamily: 'var(--font-mono)' }}>
                  {t.version}
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Tool Project Drawer */}
        {selectedTool && (
          <div className="cyber-card" style={{ padding: '24px', borderColor: 'var(--neon-cyan)', marginTop: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={16} color="var(--neon-cyan)" />
                <strong style={{ fontSize: '1.05rem', color: '#FFFFFF' }}>
                  Flagship Projects utilizing {selectedTool}:
                </strong>
              </div>
              <button
                onClick={() => setSelectedTool(null)}
                style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.84rem' }}
              >
                <span>Close</span>
                <X size={15} />
              </button>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {PROJECTS_12.filter(p => p.tools.includes(selectedTool)).map(p => (
                <button
                  key={p.id}
                  onClick={() => onOpenProject(p)}
                  className="pill-tag"
                  style={{
                    cursor: 'pointer',
                    background: 'rgba(0, 240, 255, 0.08)',
                    borderColor: 'var(--neon-cyan)',
                    color: '#FFFFFF',
                    padding: '8px 14px',
                    fontSize: '0.84rem'
                  }}
                >
                  <span>{p.title}</span>
                  <ArrowRight size={13} color="var(--neon-cyan)" />
                </button>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
