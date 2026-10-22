import React from 'react';
import { DollarSign, TrendingUp, Briefcase, ChevronRight, Zap } from 'lucide-react';

export default function IndustryWorkSection({ onSelectDomain }) {
  const tracks = [
    {
      title: 'Predictive Modeling & AutoML',
      desc: 'Customer churn, credit risk, pricing elasticity, lifetime value forecasting.',
      salary: '$162,000',
      growth: '+34% YoY',
      companies: 'Stripe, Uber, Airbnb',
      tags: ['scikit-learn', 'XGBoost', 'LightGBM', 'Optuna'],
      domainFilter: 'Predictive Modeling'
    },
    {
      title: 'Large Language Models & GenAI',
      desc: 'Retrieval Augmented Generation (RAG), fine-tuning with LoRA/QLoRA, agent tool calling.',
      salary: '$195,000',
      growth: '+68% YoY',
      companies: 'OpenAI, Anthropic, Scale AI',
      tags: ['PyTorch', 'Hugging Face', 'LangChain', 'vLLM'],
      domainFilter: 'NLP'
    },
    {
      title: 'Business Analytics & Decision Intelligence',
      desc: 'Executive KPIs, cohort retention tables, ad-hoc SQL modeling, and unit economics.',
      salary: '$138,000',
      growth: '+22% YoY',
      companies: 'Meta, DoorDash, Snowflake',
      tags: ['PostgreSQL', 'CTEs', 'Window Functions', 'Power BI'],
      domainFilter: 'BI & Analytics'
    },
    {
      title: 'Causal Inference & A/B Experimentation',
      desc: 'Frequentist & Bayesian hypothesis testing, variance reduction (CUPED), sample ratio mismatch.',
      salary: '$168,000',
      growth: '+28% YoY',
      companies: 'Netflix, Spotify, Amazon',
      tags: ['SciPy', 'statsmodels', 'CausalML', 'Bayes'],
      domainFilter: 'Experimentation'
    },
    {
      title: 'Computer Vision & Multimodal AI',
      desc: 'Quality control automation, autonomous perception, medical imaging diagnostics.',
      salary: '$178,000',
      growth: '+31% YoY',
      companies: 'Tesla, Waymo, Siemens Health',
      tags: ['PyTorch', 'TorchVision', 'YOLOv11', 'OpenCV'],
      domainFilter: 'Computer Vision'
    },
    {
      title: 'MLOps & Real-Time Production Serving',
      desc: 'Feature stores, low-latency ONNX compilation, continuous drift detection and CI/CD.',
      salary: '$182,000',
      growth: '+52% YoY',
      companies: 'Databricks, Palantir, Citadel',
      tags: ['Docker', 'FastAPI', 'MLflow', 'Triton'],
      domainFilter: 'MLOps'
    }
  ];

  return (
    <section id="industry-work" style={{ padding: '80px 0 60px', position: 'relative' }}>
      <div className="container">
        
        {/* Title */}
        <div style={{ marginBottom: '36px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span className="pill-tag" style={{ background: 'rgba(157, 78, 221, 0.15)', borderColor: 'var(--neon-violet)', color: '#D8B4FE' }}>
              <Briefcase size={13} />
              <span>MARKET REALITY & CAREER ARCHITECTURE</span>
            </span>
          </div>

          <h2 className="section-title">
            What Data Scientists Actually Do in Industry
          </h2>
          <p className="section-subtitle">
            Current enterprise market demands, median US base salaries, and actual tech stacks employed by Tier-1 tech firms.
          </p>
        </div>

        {/* 6-Card Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
          gap: '24px'
        }}>
          {tracks.map((track) => (
            <div
              key={track.title}
              className="cyber-card"
              onClick={() => onSelectDomain && onSelectDomain(track.domainFilter)}
              style={{
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '230px'
              }}
            >
              <div>
                {/* Header: Title + Salary Tag */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', marginBottom: '10px' }}>
                  <h3 style={{
                    fontSize: '1.22rem',
                    fontWeight: 700,
                    color: '#FFFFFF',
                    lineHeight: '1.3'
                  }}>
                    {track.title}
                  </h3>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    background: 'rgba(0, 245, 160, 0.12)',
                    border: '1px solid rgba(0, 245, 160, 0.25)',
                    borderRadius: '8px',
                    padding: '3px 8px',
                    fontSize: '0.74rem',
                    color: 'var(--neon-emerald)',
                    fontFamily: 'var(--font-mono)',
                    whiteSpace: 'nowrap'
                  }}>
                    <TrendingUp size={11} />
                    <span>{track.growth}</span>
                  </div>
                </div>

                <p style={{ fontSize: '0.88rem', color: '#94A3B8', marginBottom: '16px', lineHeight: '1.5' }}>
                  {track.desc}
                </p>

                {/* Salary & Hiring Companies */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.78rem', color: '#64748B', marginBottom: '16px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '10px' }}>
                  <span>Median Base: <strong style={{ color: '#FFFFFF' }}>{track.salary}</strong></span>
                  <span>Hiring: <strong style={{ color: '#E2E8F0' }}>{track.companies}</strong></span>
                </div>
              </div>

              {/* Tags + Action */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {track.tags.map((tag) => (
                    <span key={tag} className="pill-tag">
                      {tag}
                    </span>
                  ))}
                </div>

                <span style={{ fontSize: '0.8rem', color: 'var(--neon-cyan)', display: 'flex', alignItems: 'center', gap: '2px', fontWeight: 600 }}>
                  <span>Inspect</span>
                  <ChevronRight size={14} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
