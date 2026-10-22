import React, { useState } from 'react';
import { X, Copy, Check, CheckCircle2, Circle, Database, FileCode, Sparkles, Cpu, Layers } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ProjectModal({ project, onClose, onLaunchAgent, completedSteps, onToggleStep }) {
  const [copiedCode, setCopiedCode] = useState(false);
  const [activeTab, setActiveTab] = useState('steps'); // 'steps' | 'dataset' | 'starter-code'

  if (!project) return null;

  const projectStepIds = project.steps.map((_, i) => `${project.id}-step-${i}`);
  const doneCount = projectStepIds.filter(id => completedSteps.includes(id)).length;
  const progressPercent = Math.round((doneCount / project.steps.length) * 100);

  const handleStepClick = (stepId) => {
    onToggleStep(stepId);
    if (!completedSteps.includes(stepId)) {
      confetti({
        particleCount: 35,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#00F0FF', '#9D4EDD', '#00F5A0']
      });
    }
  };

  const starterPythonCode = `# DataSensei AI Benchmark: ${project.title}
# Domain: ${project.domain} | Difficulty: ${project.difficulty}

import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import StratifiedKFold
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import RobustScaler, OneHotEncoder
from xgboost import XGBClassifier

print("Ingesting dataset: ${project.datasetName} (${project.datasetSize})...")

# Step 1: Ingest & Check Schema
# df = pd.read_csv("data/${project.id}.csv")
# print(df.info())

# Step 2: Clean Missing Values & Audit Leakage
# Step 3: Feature Pipeline (ColumnTransformer)
# Step 4: Model Training & PR-AUC Evaluation
# Step 5: Executive Business Lift Delivery

print("Ready to develop with DataSensei Voice Agent guidance!")
`;

  const copyCode = () => {
    navigator.clipboard.writeText(starterPythonCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 80,
      background: 'rgba(5, 8, 16, 0.88)',
      backdropFilter: 'blur(18px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div 
        className="cyber-card"
        style={{
          width: '100%',
          maxWidth: '880px',
          maxHeight: '88vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          padding: 0,
          background: '#0B0E1B',
          border: '1px solid rgba(0, 240, 255, 0.25)'
        }}
      >
        {/* Header */}
        <div style={{
          padding: '22px 28px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          background: 'rgba(14, 18, 34, 0.95)'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span className="pill-tag" style={{ background: 'rgba(0, 240, 255, 0.12)', color: 'var(--neon-cyan)', borderColor: 'var(--neon-cyan)', fontWeight: 600 }}>
                {project.domain}
              </span>
              <span className="pill-tag">
                {project.difficulty}
              </span>
              <span style={{ fontSize: '0.8rem', color: '#94A3B8', fontFamily: 'var(--font-mono)' }}>
                EST: {project.estHours}
              </span>
            </div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#FFFFFF' }}>
              {project.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              padding: '8px',
              color: '#94A3B8',
              cursor: 'pointer'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Progress Bar */}
        <div style={{ background: 'rgba(10, 14, 26, 0.8)', padding: '12px 28px', borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '6px' }}>
            <span style={{ color: '#94A3B8' }}>Milestones Verified:</span>
            <span style={{ color: 'var(--neon-cyan)', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
              {progressPercent}% ({doneCount}/{project.steps.length})
            </span>
          </div>
          <div style={{ height: '6px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '999px', overflow: 'hidden' }}>
            <div style={{
              height: '100%',
              width: `${progressPercent}%`,
              background: 'linear-gradient(90deg, var(--neon-cyan), var(--neon-emerald))',
              boxShadow: '0 0 10px var(--neon-cyan)',
              transition: 'width 0.4s ease'
            }} />
          </div>
        </div>

        {/* Tab Buttons */}
        <div style={{ display: 'flex', gap: '8px', padding: '12px 28px', background: 'rgba(14, 18, 32, 0.6)', borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
          {['steps', 'dataset', 'starter-code'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '7px 16px',
                borderRadius: '8px',
                fontSize: '0.84rem',
                fontWeight: activeTab === tab ? 700 : 500,
                background: activeTab === tab ? 'rgba(0, 240, 255, 0.15)' : 'transparent',
                color: activeTab === tab ? 'var(--neon-cyan)' : '#94A3B8',
                border: activeTab === tab ? '1px solid var(--neon-cyan)' : '1px solid transparent',
                cursor: 'pointer'
              }}
            >
              {tab === 'steps' ? 'Milestone Steps' : tab === 'dataset' ? 'Dataset Preview' : 'Python Starter Code'}
            </button>
          ))}
        </div>

        {/* Body */}
        <div style={{ padding: '24px 28px', overflowY: 'auto', flex: 1 }}>
          {activeTab === 'steps' && (
            <div>
              <p style={{ fontSize: '0.92rem', color: '#CBD5E1', marginBottom: '20px', lineHeight: '1.6' }}>
                {project.summary}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {project.steps.map((step, idx) => {
                  const stepId = `${project.id}-step-${idx}`;
                  const isDone = completedSteps.includes(stepId);
                  return (
                    <div
                      key={stepId}
                      onClick={() => handleStepClick(stepId)}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '12px',
                        padding: '14px 16px',
                        borderRadius: '12px',
                        background: isDone ? 'rgba(0, 245, 160, 0.08)' : 'rgba(255, 255, 255, 0.03)',
                        border: isDone ? '1px solid var(--neon-emerald)' : '1px solid rgba(255, 255, 255, 0.08)',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <div style={{ marginTop: '2px', color: isDone ? 'var(--neon-emerald)' : '#64748B' }}>
                        {isDone ? <CheckCircle2 size={18} /> : <Circle size={18} />}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '0.8rem', fontWeight: 700, color: isDone ? 'var(--neon-emerald)' : '#FFFFFF', marginBottom: '2px' }}>
                          Milestone {idx + 1}
                        </div>
                        <div style={{ fontSize: '0.88rem', color: isDone ? '#94A3B8' : '#E2E8F0', textDecoration: isDone ? 'line-through' : 'none' }}>
                          {step}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'dataset' && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                <div style={{ fontSize: '0.92rem', color: '#FFFFFF', fontWeight: 600 }}>
                  Raw Dataset Feed: {project.datasetName}
                </div>
                <span className="pill-tag" style={{ color: 'var(--neon-cyan)', borderColor: 'var(--neon-cyan)' }}>
                  {project.datasetSize}
                </span>
              </div>

              {project.sampleData && project.sampleData.length > 0 ? (
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem', fontFamily: 'var(--font-mono)' }}>
                    <thead>
                      <tr style={{ background: 'rgba(255, 255, 255, 0.05)', color: 'var(--neon-cyan)', textAlign: 'left' }}>
                        {Object.keys(project.sampleData[0]).map((col) => (
                          <th key={col} style={{ padding: '10px 12px', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {project.sampleData.map((row, idx) => (
                        <tr key={idx} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.04)', color: '#CBD5E1' }}>
                          {Object.values(row).map((val, cIdx) => (
                            <td key={cIdx} style={{ padding: '8px 12px' }}>
                              {String(val)}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p style={{ color: '#94A3B8' }}>Sample data schema available in live repository.</p>
              )}
            </div>
          )}

          {activeTab === 'starter-code' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{ fontSize: '0.84rem', color: '#94A3B8' }}>
                  Production boilerplate with scikit-learn & XGBoost:
                </span>
                <button
                  onClick={copyCode}
                  style={{
                    background: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    color: '#FFFFFF',
                    borderRadius: '6px',
                    padding: '4px 10px',
                    fontSize: '0.76rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px'
                  }}
                >
                  {copiedCode ? <Check size={13} color="var(--neon-emerald)" /> : <Copy size={13} />}
                  <span>{copiedCode ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              <div className="code-block-container" style={{ maxHeight: '340px' }}>
                <pre style={{ margin: 0 }}>
                  <code>{starterPythonCode}</code>
                </pre>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div style={{
          padding: '18px 28px',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          background: 'rgba(12, 16, 28, 0.95)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <button onClick={onClose} className="btn-cyber-outline">
            Close
          </button>

          <button
            onClick={() => onLaunchAgent(project)}
            className="btn-neon-cyan"
            style={{ padding: '11px 22px' }}
          >
            <Sparkles size={16} />
            <span>Launch with AI Voice Agent</span>
          </button>
        </div>
      </div>
    </div>
  );
}
