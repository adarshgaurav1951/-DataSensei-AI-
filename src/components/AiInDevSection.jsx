import React, { useState } from 'react';

export default function AiInDevSection({ onOpenAgent }) {
  const [activeRoleModal, setActiveRoleModal] = useState(null);

  const roles = [
    {
      title: 'Helping developers integrate powerful features seamlessly',
      example: 'Load a pretrained Hugging Face model in 3 lines.',
      code: `from transformers import pipeline

classifier = pipeline("sentiment-analysis", model="distilbert-base-uncased-finetuned-sst-2-english")
result = classifier("The churn rate dropped 14% after the email campaign!")
# [{'label': 'POSITIVE', 'score': 0.999}]`
    },
    {
      title: 'Learning from data to improve over time',
      example: 'Retrain churn models weekly as new customers arrive.',
      code: `# Continuous Retraining Cron Trigger
new_customers = fetch_delta_events(since="7_days_ago")
if detect_concept_drift(new_customers, baseline_distribution):
    retrain_pipeline(new_customers)
    deploy_canary_model()`
    },
    {
      title: 'Automating repetitive tasks',
      example: 'Auto-profile every new dataset for nulls and types.',
      code: `def auto_profile(df):
    return {
        "null_percentages": (df.isnull().sum() / len(df) * 100).to_dict(),
        "cardinality": df.nunique().to_dict(),
        "skewness": df.skew(numeric_only=True).to_dict()
    }`
    },
    {
      title: 'Generating quick suggestions for fixes',
      example: 'Suggest imputation for a column with 30% missing.',
      code: `# Mentor Suggestion: 30% missing is too high for dropping rows.
# Use IterativeImputer (MICE) to preserve multivariate relationships:
from sklearn.experimental import enable_iterative_imputer
from sklearn.impute import IterativeImputer

imputer = IterativeImputer(max_iter=10, random_state=42)
df_clean = imputer.fit_transform(df[numerical_features])`
    },
    {
      title: 'Providing insights into code quality',
      example: 'Flag data leakage and slow loops in your notebook.',
      code: `# Quality Coach Alert:
# ⚠️ High Severity: df[features].apply(lambda x: scaler.fit_transform(x)) leaks test data!
# Fix: Fit scaler solely on training partition:
X_train, X_test = train_test_split(df, test_size=0.2)
X_train_scaled = scaler.fit_transform(X_train)`
    },
    {
      title: 'Assisting in code review and testing',
      example: 'Generate tests for a cleaning function.',
      code: `import pytest

def test_clean_currency():
    assert clean_currency("$1,250.00") == 1250.00
    assert clean_currency(" -$45.50 ") == -45.50
    assert clean_currency(None) is None`
    }
  ];

  return (
    <section id="ai-in-dev" style={{ padding: '60px 0 80px' }}>
      <div className="container">
        <h2 className="section-title">
          How AI helps developers
        </h2>
        <p className="section-subtitle">
          The six roles from your first image, with a data science example each.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: '20px'
        }}>
          {roles.map((r, i) => (
            <div
              key={i}
              className="ai-dev-card"
              onClick={() => setActiveRoleModal(r)}
              style={{
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '160px'
              }}
            >
              <div>
                <h4>{r.title}</h4>
                <p>{r.example}</p>
              </div>

              <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.78rem', color: '#F7D6CB', textDecoration: 'underline' }}>
                  Tap to view code demo →
                </span>
                <span style={{ fontSize: '0.72rem', background: 'rgba(255,255,255,0.15)', padding: '2px 8px', borderRadius: '4px' }}>
                  Role {i + 1}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for Code Demo */}
        {activeRoleModal && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(27, 23, 20, 0.65)',
            backdropFilter: 'blur(6px)',
            zIndex: 80,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}>
            <div className="editorial-card" style={{ maxWidth: '600px', width: '100%', padding: '28px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: '#1B1714' }}>
                  {activeRoleModal.title}
                </h3>
                <button
                  onClick={() => setActiveRoleModal(null)}
                  style={{ background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer', color: '#6B6258' }}
                >
                  ✕
                </button>
              </div>

              <p style={{ fontSize: '0.88rem', color: '#6B6258', marginBottom: '14px' }}>
                <strong>Data Science Context:</strong> {activeRoleModal.example}
              </p>

              <pre style={{
                background: '#FAF6F0',
                border: '1px solid #E5DCD2',
                borderRadius: '8px',
                padding: '14px',
                fontSize: '0.82rem',
                color: '#1B1714',
                fontFamily: 'var(--font-mono)',
                overflowX: 'auto',
                marginBottom: '20px'
              }}>
                <code>{activeRoleModal.code}</code>
              </pre>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button onClick={() => setActiveRoleModal(null)} className="btn-outline">
                  Close
                </button>
                <button onClick={() => { setActiveRoleModal(null); onOpenAgent(); }} className="btn-terracotta">
                  Try with AI Teaching Agent
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
