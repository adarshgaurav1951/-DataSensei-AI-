import React, { useState } from 'react';
import { TOOLS_15, PROJECTS_12 } from '../data/projectsData';

export default function ToolsSection({ onOpenProject }) {
  const [selectedTool, setSelectedTool] = useState(null);

  const toolsList = [
    { name: 'Python', role: 'Core language' },
    { name: 'Jupyter', role: 'Interactive notebooks' },
    { name: 'Google Colab', role: 'Free cloud GPU notebooks' },
    { name: 'pandas', role: 'Tables and cleaning' },
    { name: 'NumPy', role: 'Fast arrays and math' },
    { name: 'SciPy', role: 'Statistics and science' },
    { name: 'Seaborn', role: 'Statistical charts' },
    { name: 'scikit-learn', role: 'Classic ML' },
    { name: 'XGBoost', role: 'Boosted trees for tabular data' },
    { name: 'TensorFlow', role: 'Deep learning' },
    { name: 'Keras', role: 'Easy neural-net API' },
    { name: 'PyTorch', role: 'Research-grade deep learning' },
    { name: 'NLTK', role: 'Text basics' },
    { name: 'spaCy', role: 'Industrial NLP' },
    { name: 'Hugging Face', role: 'Pretrained transformers' },
  ];

  return (
    <section id="tools-platforms" style={{ padding: '60px 0' }}>
      <div className="container">
        <h2 className="section-title">
          Tools and platforms
        </h2>
        <p className="section-subtitle">
          The 15 industry-standard tools and platforms featured in project walkthroughs.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
          gap: '16px',
          marginBottom: selectedTool ? '24px' : '0'
        }}>
          {toolsList.map((t) => {
            const isSelected = selectedTool === t.name;
            return (
              <div
                key={t.name}
                onClick={() => setSelectedTool(isSelected ? null : t.name)}
                className="editorial-card"
                style={{
                  cursor: 'pointer',
                  padding: '18px 20px',
                  border: isSelected ? '1px solid #D9532F' : '1px solid #ECE4DC',
                  background: isSelected ? '#FBECE7' : '#FFFFFF'
                }}
              >
                <div style={{
                  fontSize: '1.05rem',
                  fontWeight: 700,
                  color: '#D9532F',
                  marginBottom: '4px'
                }}>
                  {t.name}
                </div>
                <div style={{ fontSize: '0.84rem', color: '#6B6258' }}>
                  {t.role}
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Tool Detail Drawer */}
        {selectedTool && (
          <div className="editorial-card" style={{ padding: '20px 24px', background: '#FAF6F0', border: '1px solid #D9532F', marginTop: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <strong style={{ fontSize: '1rem', color: '#D9532F' }}>
                Projects using {selectedTool}:
              </strong>
              <button
                onClick={() => setSelectedTool(null)}
                style={{ background: 'none', border: 'none', color: '#6B6258', cursor: 'pointer', fontSize: '0.82rem' }}
              >
                Close ✕
              </button>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {PROJECTS_12.filter(p => p.tools.includes(selectedTool)).map(p => (
                <button
                  key={p.id}
                  onClick={() => onOpenProject(p)}
                  className="pill-tag"
                  style={{ cursor: 'pointer', background: '#FFFFFF', borderColor: '#D9532F', color: '#1B1714' }}
                >
                  {p.title} →
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
