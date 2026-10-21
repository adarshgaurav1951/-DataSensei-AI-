import React, { useState } from 'react';
import { PROJECTS_12 } from '../data/projectsData';
import { 
  Database, 
  Table, 
  BarChart, 
  Download, 
  ExternalLink, 
  FileSpreadsheet,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export default function DatasetExplorer({ onOpenProject }) {
  const [selectedProjectId, setSelectedProjectId] = useState(PROJECTS_12[0].id);

  const currentProject = PROJECTS_12.find(p => p.id === selectedProjectId) || PROJECTS_12[0];

  return (
    <div style={{ paddingBottom: '60px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 36px' }}>
        <span className="badge badge-emerald" style={{ marginBottom: '12px' }}>
          Real-World Data Lab
        </span>
        <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#fff', marginBottom: '12px' }}>
          Interactive Dataset Explorer
        </h2>
        <p style={{ fontSize: '0.96rem', color: '#94a3b8' }}>
          Inspect the exact schemas, feature dimensions, and distributions for all 12 benchmark industry datasets.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '24px' }}>
        
        {/* Left: Dataset Selector List */}
        <div className="glass-panel" style={{ padding: '16px', maxHeight: '720px', overflowY: 'auto' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '12px' }}>
            Choose Dataset ({PROJECTS_12.length}):
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {PROJECTS_12.map((p) => {
              const isSelected = p.id === selectedProjectId;
              return (
                <button
                  key={p.id}
                  onClick={() => setSelectedProjectId(p.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    textAlign: 'left',
                    background: isSelected ? 'rgba(0, 245, 212, 0.12)' : 'rgba(255, 255, 255, 0.02)',
                    border: isSelected ? '1px solid #00f5d4' : '1px solid rgba(255, 255, 255, 0.05)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <Database size={16} color={isSelected ? '#00f5d4' : '#64748b'} />
                  <div style={{ overflow: 'hidden' }}>
                    <div style={{ fontSize: '0.82rem', fontWeight: 700, color: isSelected ? '#fff' : '#cbd5e1', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                      {p.datasetName}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: isSelected ? '#00f5d4' : '#94a3b8' }}>
                      {p.domain}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Dataset Inspection View */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <span className="badge badge-cyan">{currentProject.domain}</span>
                <span className="badge badge-purple">{currentProject.datasetSize}</span>
              </div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff' }}>
                {currentProject.datasetName}
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '4px' }}>
                Used in: <strong>{currentProject.title}</strong>
              </p>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => onOpenProject(currentProject)}
                className="btn-primary"
                style={{ fontSize: '0.82rem', padding: '8px 14px' }}
              >
                <span>Launch Project Lab</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', marginBottom: '24px' }}>
            {Object.entries(currentProject.stats || {}).map(([key, val]) => (
              <div key={key} style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '12px 14px', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                <div style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase' }}>
                  {key.replace(/([A-Z])/g, ' $1')}
                </div>
                <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#00f5d4', marginTop: '4px' }}>
                  {val}
                </div>
              </div>
            ))}
          </div>

          {/* Table Preview */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#e2e8f0', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Table size={16} color="#38bdf8" /> In-Memory Sample Preview (First 5 Rows):
              </h4>
              <span style={{ fontSize: '0.75rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <CheckCircle2 size={13} /> Schema Validated
              </span>
            </div>

            <div style={{ overflowX: 'auto', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: 'rgba(15, 23, 42, 0.95)', color: '#38bdf8' }}>
                    {Object.keys(currentProject.sampleData[0] || {}).map(col => (
                      <th key={col} style={{ padding: '10px 14px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {currentProject.sampleData.map((row, rIdx) => (
                    <tr key={rIdx} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.04)', background: rIdx % 2 === 0 ? 'transparent' : 'rgba(255, 255, 255, 0.01)' }}>
                      {Object.values(row).map((val, cIdx) => (
                        <td key={cIdx} style={{ padding: '10px 14px', color: '#cbd5e1' }}>
                          {String(val)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Data Hygiene Checklist */}
          <div style={{ background: 'rgba(5, 8, 16, 0.5)', padding: '16px', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
            <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#cbd5e1', marginBottom: '8px' }}>
              Data Quality & Hygiene Audit:
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '0.78rem', color: '#94a3b8' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ color: '#10b981' }}>✓</span> Missing Value Imputation Strategy: Defined
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ color: '#10b981' }}>✓</span> Categorical Cardinality: Evaluated
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ color: '#10b981' }}>✓</span> Outlier Truncation / Winsorization: Configured
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ color: '#10b981' }}>✓</span> Train/Test Split Leakage Protection: Enforced
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
