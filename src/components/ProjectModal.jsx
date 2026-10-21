import React, { useState } from 'react';
import { X, Copy, Check, CheckCircle2, Circle, Database, FileCode, Sparkles } from 'lucide-react';
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
        colors: ['#D9532F', '#E8795A', '#1B1714']
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

# Step 1: Ingest & Check Schema
# df = pd.read_csv("data/${project.id}.csv")
# print(df.info())

# Step 2: Clean Missing Values & Outliers
# Step 3: Feature Pipeline (ColumnTransformer)
# Step 4: Model Training & PR-AUC Evaluation
# Step 5: Deliverable & Business Report

print("Ready to develop with DataSensei AI Teaching Agent guidance!")
`;

  const copyCode = () => {
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
      zIndex: 60,
      background: 'rgba(27, 23, 20, 0.65)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div 
        className="editorial-card"
        style={{
          width: '100%',
          maxWidth: '860px',
          maxHeight: '88vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          padding: 0,
          background: '#FAF6F0',
          border: '1px solid #D6C8BA'
        }}
      >
        {/* Header */}
        <div style={{
          padding: '24px 28px',
          borderBottom: '1px solid #ECE4DC',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          background: '#FFFFFF'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span className="pill-tag" style={{ background: '#FBECE7', color: '#D9532F', borderColor: '#D9532F', fontWeight: 600 }}>
                {project.domain}
              </span>
              <span className="pill-tag">
                {project.difficulty}
              </span>
              <span style={{ fontSize: '0.8rem', color: '#7D7368' }}>
                Est: {project.estHours}
              </span>
            </div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: '#1B1714' }}>
              {project.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            style={{
              background: '#F4ECE1',
              border: 'none',
              borderRadius: '8px',
              padding: '8px',
              color: '#3B332B',
              cursor: 'pointer'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Progress Bar */}
        <div style={{ background: '#FFFFFF', padding: '10px 28px', borderBottom: '1px solid #ECE4DC' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '6px' }}>
            <span style={{ color: '#7D7368' }}>Steps Completed</span>
            <span style={{ color: '#D9532F', fontWeight: 700 }}>{progressPercent}% ({doneCount}/{project.steps.length})</span>
          </div>
          <div style={{ height: '6px', background: '#F0E8DF', borderRadius: '999px', overflow: 'hidden' }}>
            <div style={{
              height: '100%',
              width: `${progressPercent}%`,
              background: '#D9532F',
              transition: 'width 0.4s ease'
            }} />
          </div>
        </div>

        {/* Tab Buttons */}
        <div style={{ display: 'flex', gap: '8px', padding: '12px 28px', background: '#F4ECE1', borderBottom: '1px solid #ECE4DC' }}>
          {['steps', 'dataset', 'starter-code'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '6px 14px',
                borderRadius: '6px',
                fontSize: '0.84rem',
                fontWeight: activeTab === tab ? 700 : 500,
                background: activeTab === tab ? '#FFFFFF' : 'transparent',
                color: activeTab === tab ? '#D9532F' : '#6B6258',
                border: activeTab === tab ? '1px solid #D9CEBF' : '1px solid transparent',
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
              <p style={{ fontSize: '0.92rem', color: '#4A4137', marginBottom: '20px', lineHeight: '1.6' }}>
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
                        borderRadius: '10px',
                        background: isDone ? '#FDFBF7' : '#FFFFFF',
                        border: isDone ? '1px solid #D9532F' : '1px solid #ECE4DC',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <div style={{ marginTop: '2px', color: isDone ? '#D9532F' : '#A3978B' }}>
                        {isDone ? <CheckCircle2 size={18} /> : <Circle size={18} />}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '0.8rem', fontWeight: 700, color: isDone ? '#D9532F' : '#1B1714', marginBottom: '2px' }}>
                          Step {idx + 1}
                        </div>
                        <div style={{ fontSize: '0.88rem', color: isDone ? '#7D7368' : '#2A231C', textDecoration: isDone ? 'line-through' : 'none' }}>
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
              <div style={{ marginBottom: '14px' }}>
                <strong style={{ fontSize: '1rem', color: '#1B1714' }}>{project.datasetName}</strong>
                <span style={{ fontSize: '0.84rem', color: '#7D7368', marginLeft: '8px' }}>({project.datasetSize})</span>
              </div>

              <div style={{ overflowX: 'auto', borderRadius: '8px', border: '1px solid #ECE4DC', background: '#FFFFFF' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ background: '#F4ECE1', color: '#1B1714' }}>
                      {Object.keys(project.sampleData[0] || {}).map(k => (
                        <th key={k} style={{ padding: '10px 12px', borderBottom: '1px solid #ECE4DC' }}>{k}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {project.sampleData.map((row, rIdx) => (
                      <tr key={rIdx} style={{ borderBottom: '1px solid #F0E8DF' }}>
                        {Object.values(row).map((v, cIdx) => (
                          <td key={cIdx} style={{ padding: '10px 12px', color: '#4A4137' }}>{String(v)}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'starter-code' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
                <button onClick={copyCode} className="btn-outline" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
                  {copiedCode ? <Check size={14} color="#D9532F" /> : <Copy size={14} />}
                  <span>{copiedCode ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <pre style={{
                background: '#1B1714',
                color: '#FAF6F0',
                padding: '16px',
                borderRadius: '8px',
                fontSize: '0.82rem',
                fontFamily: 'var(--font-mono)',
                overflowX: 'auto'
              }}>
                <code>{starterPythonCode}</code>
              </pre>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{
          padding: '16px 28px',
          borderTop: '1px solid #ECE4DC',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: '#FFFFFF'
        }}>
          <button onClick={onClose} className="btn-outline">
            Close
          </button>
          <button
            onClick={() => {
              onClose();
              onLaunchAgent(project);
            }}
            className="btn-terracotta"
          >
            <Sparkles size={16} />
            <span>Ask Teaching Agent for Custom Plan</span>
          </button>
        </div>
      </div>
    </div>
  );
}
