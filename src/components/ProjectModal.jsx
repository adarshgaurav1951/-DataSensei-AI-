import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  CheckCircle2, 
  Circle, 
  Database, 
  FileCode, 
  Copy, 
  Check, 
  ExternalLink,
  BookOpen,
  Cpu
} from 'lucide-react';
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
        particleCount: 40,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#00f5d4', '#8b5cf6', '#38bdf8']
      });
    }
  };

  const starterPythonCode = `# DataSensei AI Project: ${project.title}
# Domain: ${project.domain} | Difficulty: ${project.difficulty}

import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline

print("Loading dataset: ${project.datasetName} (${project.datasetSize})...")

# 1. Step 1: Ingest & Inspect
# df = pd.read_csv("data/${project.id}.csv")
# print(df.info())
# print(df.describe())

# 2. Step 2: Exploratory Data Analysis & Handling Nulls
# Step 3: Feature Engineering Pipeline
# Step 4: Model Training & Cross-Validation
# Step 5: Deliverable & Business Evaluation

print("Ready to develop with DataSensei AI Teaching Agent guidance!")
`;

  const copyCodeToClipboard = () => {
    navigator.clipboard.writeText(starterPythonCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 50,
      background: 'rgba(3, 6, 12, 0.85)',
      backdropFilter: 'blur(12px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px'
    }}>
      <div 
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '920px',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          background: '#090e1c',
          border: '1px solid rgba(0, 245, 212, 0.25)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)'
        }}
      >
        {/* Modal Header */}
        <div style={{
          padding: '22px 28px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          background: 'rgba(11, 16, 32, 0.8)'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <span className="badge badge-cyan">{project.domain}</span>
              <span className="badge badge-purple">{project.difficulty}</span>
              <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                Est. Completion: <strong>{project.estHours}</strong>
              </span>
            </div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff' }}>
              {project.title}
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

        {/* Progress Bar */}
        <div style={{ background: 'rgba(15, 23, 42, 0.9)', padding: '12px 28px', borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '6px' }}>
            <span style={{ color: '#94a3b8' }}>Project Milestone Progress</span>
            <span style={{ color: '#00f5d4', fontWeight: 700 }}>{progressPercent}% Complete ({doneCount}/{project.steps.length} steps)</span>
          </div>
          <div style={{ height: '6px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '999px', overflow: 'hidden' }}>
            <div style={{
              height: '100%',
              width: `${progressPercent}%`,
              background: 'linear-gradient(90deg, #00f5d4, #8b5cf6)',
              transition: 'width 0.4s ease'
            }} />
          </div>
        </div>

        {/* Sub-Navigation Tabs */}
        <div style={{
          display: 'flex',
          gap: '12px',
          padding: '12px 28px',
          background: 'rgba(6, 9, 18, 0.6)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)'
        }}>
          <button
            onClick={() => setActiveTab('steps')}
            style={{
              background: activeTab === 'steps' ? 'rgba(0, 245, 212, 0.15)' : 'transparent',
              color: activeTab === 'steps' ? '#00f5d4' : '#94a3b8',
              border: activeTab === 'steps' ? '1px solid rgba(0, 245, 212, 0.3)' : '1px solid transparent',
              padding: '6px 14px',
              borderRadius: '6px',
              fontSize: '0.84rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Milestone Checklist ({project.steps.length})
          </button>

          <button
            onClick={() => setActiveTab('dataset')}
            style={{
              background: activeTab === 'dataset' ? 'rgba(0, 245, 212, 0.15)' : 'transparent',
              color: activeTab === 'dataset' ? '#00f5d4' : '#94a3b8',
              border: activeTab === 'dataset' ? '1px solid rgba(0, 245, 212, 0.3)' : '1px solid transparent',
              padding: '6px 14px',
              borderRadius: '6px',
              fontSize: '0.84rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Database size={14} /> Dataset Preview & Schema
          </button>

          <button
            onClick={() => setActiveTab('starter-code')}
            style={{
              background: activeTab === 'starter-code' ? 'rgba(0, 245, 212, 0.15)' : 'transparent',
              color: activeTab === 'starter-code' ? '#00f5d4' : '#94a3b8',
              border: activeTab === 'starter-code' ? '1px solid rgba(0, 245, 212, 0.3)' : '1px solid transparent',
              padding: '6px 14px',
              borderRadius: '6px',
              fontSize: '0.84rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <FileCode size={14} /> Starter Python Code
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '24px 28px', overflowY: 'auto', flex: 1 }}>
          {activeTab === 'steps' && (
            <div>
              <div style={{ marginBottom: '20px' }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#e2e8f0', marginBottom: '6px' }}>
                  Business Problem & Overview
                </h4>
                <p style={{ fontSize: '0.88rem', color: '#94a3b8', lineHeight: '1.6' }}>
                  {project.summary}
                </p>
              </div>

              {/* Skills and Tools applied */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '14px', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#38bdf8', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <BookOpen size={14} /> Core 16 Skills In Play:
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {project.skills.map(s => (
                      <span key={s} style={{ fontSize: '0.74rem', background: 'rgba(56, 189, 248, 0.1)', color: '#7dd3fc', padding: '3px 8px', borderRadius: '6px' }}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '14px', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#a78bfa', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Cpu size={14} /> 15 Industry Tools In Play:
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {project.tools.map(t => (
                      <span key={t} style={{ fontSize: '0.74rem', background: 'rgba(167, 139, 250, 0.1)', color: '#c084fc', padding: '3px 8px', borderRadius: '6px' }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Steps list */}
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#e2e8f0', marginBottom: '12px' }}>
                Implementation Steps (Click to complete):
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {project.steps.map((step, index) => {
                  const stepId = `${project.id}-step-${index}`;
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
                        borderRadius: '10px',
                        background: isDone ? 'rgba(16, 185, 129, 0.08)' : 'rgba(15, 23, 42, 0.5)',
                        border: isDone ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(255, 255, 255, 0.06)',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <div style={{ marginTop: '2px', color: isDone ? '#10b981' : '#64748b' }}>
                        {isDone ? <CheckCircle2 size={18} /> : <Circle size={18} />}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '0.82rem', fontWeight: 700, color: isDone ? '#34d399' : '#00f5d4', marginBottom: '2px' }}>
                          Step {index + 1}
                        </div>
                        <div style={{ fontSize: '0.88rem', color: isDone ? '#94a3b8' : '#e2e8f0', textDecoration: isDone ? 'line-through' : 'none' }}>
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
                <div>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff' }}>
                    {project.datasetName}
                  </h4>
                  <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                    {project.datasetSize}
                  </div>
                </div>

                <div className="badge badge-emerald">
                  <span>Simulated Live Stream • Cleaned</span>
                </div>
              </div>

              {/* Sample Table */}
              <div style={{ overflowX: 'auto', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.08)', marginBottom: '20px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ background: 'rgba(15, 23, 42, 0.9)', color: '#38bdf8' }}>
                      {Object.keys(project.sampleData[0] || {}).map(key => (
                        <th key={key} style={{ padding: '10px 14px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
                          {key}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {project.sampleData.map((row, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.04)', background: idx % 2 === 0 ? 'transparent' : 'rgba(255, 255, 255, 0.01)' }}>
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

              {/* Stats badges */}
              <h5 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#e2e8f0', marginBottom: '8px' }}>
                Dataset Industry Metrics:
              </h5>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                {Object.entries(project.stats || {}).map(([k, v]) => (
                  <div key={k} style={{ background: 'rgba(255, 255, 255, 0.04)', padding: '8px 14px', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                    <span style={{ fontSize: '0.74rem', color: '#94a3b8', textTransform: 'capitalize' }}>{k.replace(/([A-Z])/g, ' $1')}: </span>
                    <strong style={{ fontSize: '0.85rem', color: '#00f5d4' }}>{v}</strong>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'starter-code' && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                  Use this boilerplate code to kick off your local Jupyter Notebook or Google Colab session:
                </p>
                <button
                  onClick={copyCodeToClipboard}
                  className="btn-secondary"
                  style={{ fontSize: '0.8rem', padding: '6px 12px' }}
                >
                  {copiedCode ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
                  <span>{copiedCode ? 'Copied!' : 'Copy Code'}</span>
                </button>
              </div>

              <pre className="code-snippet" style={{ maxHeight: '320px', overflowY: 'auto' }}>
                <code>{starterPythonCode}</code>
              </pre>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div style={{
          padding: '16px 28px',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(11, 16, 32, 0.8)'
        }}>
          <button onClick={onClose} className="btn-secondary">
            Close Lab
          </button>

          <button
            onClick={() => {
              onClose();
              onLaunchAgent(project);
            }}
            className="btn-primary"
          >
            <Sparkles size={16} />
            <span>Launch AI Teaching Agent for this Project</span>
          </button>
        </div>
      </div>
    </div>
  );
}
