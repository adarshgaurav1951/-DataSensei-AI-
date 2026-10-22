import React, { useState } from 'react';
import { Bot, Sparkles, Terminal, Code2, ArrowRight, X, Cpu } from 'lucide-react';

export default function AiInDevSection({ onOpenAgent }) {
  const [activeRoleModal, setActiveRoleModal] = useState(null);

  const roles = [
    {
      title: 'Integrating SOTA Models in Seconds',
      example: 'Load pretrained Hugging Face transformers or PyTorch weights in 3 lines.',
      tag: 'GenAI & LLMs',
      code: `from transformers import pipeline

classifier = pipeline("sentiment-analysis", model="distilbert-base-uncased-finetuned-sst-2-english")
result = classifier("The churn rate dropped 14% after the targeted incentive campaign!")
# [{'label': 'POSITIVE', 'score': 0.999}]`
    },
    {
      title: 'Continuous Autonomous Retraining Loops',
      example: 'Retrain churn and fraud models automatically as concept drift triggers.',
      tag: 'MLOps Pipeline',
      code: `# Continuous Retraining Cron Trigger
new_customers = fetch_delta_events(since="7_days_ago")
if detect_concept_drift(new_customers, baseline_distribution):
    retrain_pipeline(new_customers)
    deploy_canary_model()`
    },
    {
      title: 'Automating EDA & Statistical Profiling',
      example: 'Auto-profile incoming data streams for skewness, nulls, and outliers.',
      tag: 'Data Engineering',
      code: `def auto_profile(df):
    return {
        "null_percentages": (df.isnull().sum() / len(df) * 100).to_dict(),
        "cardinality": df.nunique().to_dict(),
        "skewness": df.skew(numeric_only=True).to_dict()
    }`
    },
    {
      title: 'Precision Imputation & Feature Recovery',
      example: 'Apply Multivariate MICE to preserve underlying joint distributions.',
      tag: 'Preprocessing',
      code: `# Use IterativeImputer (MICE) to preserve multivariate relationships:
from sklearn.experimental import enable_iterative_imputer
from sklearn.impute import IterativeImputer

imputer = IterativeImputer(max_iter=10, random_state=42)
df_clean = imputer.fit_transform(df[numerical_features])`
    },
    {
      title: 'Data Leakage & Anti-Pattern Sentinel',
      example: 'Detect data leakage before shipping flawed models to production.',
      tag: 'Code Quality',
      code: `# Sentinel Alert:
# ⚠️ High Severity: df[features].apply(lambda x: scaler.fit_transform(x)) leaks test data!
# Fix: Fit scaler solely on training partition:
X_train, X_test = train_test_split(df, test_size=0.2)
X_train_scaled = scaler.fit_transform(X_train)`
    },
    {
      title: 'Automated Unit Tests & Schema Contracts',
      example: 'Generate automated assertions and schema integrity contracts.',
      tag: 'Testing & QA',
      code: `import pytest

def test_clean_currency():
    assert clean_currency("$1,250.00") == 1250.00
    assert clean_currency(" -$45.50 ") == -45.50
    assert clean_currency(None) is None`
    }
  ];

  return (
    <section id="ai-in-dev" style={{ padding: '80px 0 90px', position: 'relative' }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ marginBottom: '36px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span className="pill-tag" style={{ background: 'rgba(157, 78, 221, 0.15)', borderColor: 'var(--neon-violet)', color: '#D8B4FE' }}>
              <Bot size={13} />
              <span>AGENTIC AUGMENTATION</span>
            </span>
          </div>

          <h2 className="section-title">
            How Autonomous AI Agents Augment Developers
          </h2>
          <p className="section-subtitle">
            Autonomous agents handle boilerplate profiling, prevent catastrophic data leakage, and write production test suites.
          </p>
        </div>

        {/* 6-Card Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
          gap: '24px'
        }}>
          {roles.map((r, i) => (
            <div
              key={i}
              className="cyber-card"
              onClick={() => setActiveRoleModal(r)}
              style={{
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '190px'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span className="pill-tag" style={{ fontSize: '0.74rem' }}>
                    {r.tag}
                  </span>
                  <span style={{ fontSize: '0.72rem', color: '#64748B', fontFamily: 'var(--font-mono)' }}>
                    ROLE #{i + 1}
                  </span>
                </div>

                <h4 style={{ fontSize: '1.18rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '8px', lineHeight: '1.3' }}>
                  {r.title}
                </h4>
                <p style={{ fontSize: '0.86rem', color: '#94A3B8', lineHeight: '1.5' }}>
                  {r.example}
                </p>
              </div>

              <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '12px' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--neon-cyan)', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
                  <span>Inspect Code Solution</span>
                  <ArrowRight size={13} />
                </span>
                <Code2 size={15} color="#64748B" />
              </div>
            </div>
          ))}
        </div>

        {/* Modal for Code Demo */}
        {activeRoleModal && (
          <div style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(5, 8, 16, 0.85)',
            backdropFilter: 'blur(16px)',
            zIndex: 90,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}>
            <div className="cyber-card" style={{ maxWidth: '640px', width: '100%', padding: '28px', border: '1px solid var(--neon-cyan)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div>
                  <span className="pill-tag" style={{ marginBottom: '8px' }}>{activeRoleModal.tag}</span>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#FFFFFF' }}>
                    {activeRoleModal.title}
                  </h3>
                </div>
                <button
                  onClick={() => setActiveRoleModal(null)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8' }}
                >
                  <X size={18} />
                </button>
              </div>

              <p style={{ fontSize: '0.88rem', color: '#94A3B8', marginBottom: '16px' }}>
                <strong>Production Context:</strong> {activeRoleModal.example}
              </p>

              <div className="code-block-container" style={{ marginBottom: '22px' }}>
                <pre style={{ margin: 0 }}>
                  <code>{activeRoleModal.code}</code>
                </pre>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <button onClick={() => setActiveRoleModal(null)} className="btn-cyber-outline">
                  Close
                </button>
                <button 
                  onClick={() => { 
                    setActiveRoleModal(null); 
                    onOpenAgent(); 
                  }} 
                  className="btn-neon-cyan"
                >
                  <Sparkles size={15} />
                  <span>Execute with Voice Agent</span>
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
