import React from 'react';

export default function IndustryWorkSection({ onSelectDomain }) {
  const tracks = [
    {
      title: 'Business analytics & BI',
      desc: 'Dashboards, KPIs, ad-hoc SQL. Done daily.',
      tags: ['SQL', 'Power BI', 'pandas'],
      domainFilter: 'BI & Analytics'
    },
    {
      title: 'Predictive modeling',
      desc: 'Churn, fraud, pricing. Weekly retrains.',
      tags: ['scikit-learn', 'XGBoost'],
      domainFilter: 'Predictive Modeling'
    },
    {
      title: 'Experimentation',
      desc: 'A/B tests and causal analysis. Per feature launch.',
      tags: ['SciPy', 'statsmodels'],
      domainFilter: 'Experimentation'
    },
    {
      title: 'NLP',
      desc: 'Sentiment, search, chat. Growing fast.',
      tags: ['spaCy', 'NLTK', 'Hugging Face'],
      domainFilter: 'NLP'
    },
    {
      title: 'Computer vision',
      desc: 'Quality inspection, medical imaging.',
      tags: ['PyTorch', 'TensorFlow', 'Keras'],
      domainFilter: 'Computer Vision'
    },
    {
      title: 'Forecasting',
      desc: 'Demand, revenue, traffic. Monthly cycles.',
      tags: ['pandas', 'XGBoost'],
      domainFilter: 'Forecasting'
    },
    {
      title: 'Data engineering',
      desc: 'Pipelines, warehousing, orchestration, RLS data security.',
      tags: ['SQL', 'Python', 'PostgreSQL'],
      domainFilter: 'Data Engineering'
    },
    {
      title: 'MLOps',
      desc: 'Model registry, continuous monitoring, and drift alerts.',
      tags: ['Docker', 'FastAPI', 'MLflow'],
      domainFilter: 'MLOps'
    }
  ];

  return (
    <section id="industry-work" style={{ padding: '60px 0' }}>
      <div className="container">
        <h2 className="section-title">
          What data scientists do in industry
        </h2>
        <p className="section-subtitle">
          Typical shares of working time. These are indicative averages from industry surveys, not exact.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: '20px'
        }}>
          {tracks.map((track) => (
            <div
              key={track.title}
              className="editorial-card"
              onClick={() => onSelectDomain && onSelectDomain(track.domainFilter)}
              style={{
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '150px'
              }}
            >
              <div>
                <h3 style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.24rem',
                  fontWeight: 700,
                  color: '#1B1714',
                  marginBottom: '8px'
                }}>
                  {track.title}
                </h3>
                <p style={{ fontSize: '0.88rem', color: '#6B6258', marginBottom: '18px' }}>
                  {track.desc}
                </p>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {track.tags.map((tag) => (
                  <span key={tag} className="pill-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
