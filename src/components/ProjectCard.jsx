import React from 'react';
import { 
  Clock, 
  TrendingUp, 
  Database, 
  ArrowRight, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';

export default function ProjectCard({ project, onSelect, onAskAgent, isCompleted }) {
  const getDifficultyBadge = (level) => {
    switch (level) {
      case 'Beginner': return 'badge-emerald';
      case 'Intermediate': return 'badge-cyan';
      case 'Advanced': return 'badge-purple';
      default: return 'badge-blue';
    }
  };

  const getDomainColor = (domain) => {
    switch (domain) {
      case 'Predictive Modeling': return '#00f5d4';
      case 'BI & Analytics': return '#38bdf8';
      case 'Forecasting': return '#f59e0b';
      case 'NLP': return '#c084fc';
      case 'Computer Vision': return '#f43f5e';
      case 'Data Engineering': return '#10b981';
      case 'Experimentation': return '#6366f1';
      case 'MLOps': return '#ec4899';
      default: return '#94a3b8';
    }
  };

  return (
    <div 
      className="glass-panel"
      style={{
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden',
        border: isCompleted ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid rgba(255, 255, 255, 0.08)'
      }}
    >
      {/* Top accent glow line */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '3px',
        background: `linear-gradient(90deg, ${getDomainColor(project.domain)}, transparent)`
      }} />

      <div>
        {/* Header meta */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <span 
            style={{ 
              fontSize: '0.74rem', 
              fontWeight: 700, 
              textTransform: 'uppercase', 
              letterSpacing: '0.05em',
              color: getDomainColor(project.domain)
            }}
          >
            {project.domain}
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {isCompleted && (
              <span className="badge badge-emerald" style={{ padding: '2px 8px' }}>
                <CheckCircle2 size={12} /> Complete
              </span>
            )}
            <span className={`badge ${getDifficultyBadge(project.difficulty)}`}>
              {project.difficulty}
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 style={{ 
          fontSize: '1.22rem', 
          fontWeight: 700, 
          color: '#ffffff', 
          marginBottom: '10px',
          lineHeight: '1.35'
        }}>
          {project.title}
        </h3>

        {/* Summary */}
        <p style={{ 
          fontSize: '0.88rem', 
          color: '#94a3b8', 
          marginBottom: '18px',
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          {project.summary}
        </p>

        {/* Meta badges: time, frequency, dataset */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: '8px', 
          marginBottom: '18px',
          background: 'rgba(5, 8, 16, 0.4)',
          padding: '10px 12px',
          borderRadius: '10px',
          fontSize: '0.78rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#cbd5e1' }}>
            <Clock size={14} color="#38bdf8" />
            <span>Est: <strong>{project.estHours}</strong></span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#cbd5e1' }}>
            <TrendingUp size={14} color="#10b981" />
            <span>Industry: <strong>{project.industryFreq.split(' ')[0]}</strong></span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#cbd5e1', gridColumn: 'span 2' }}>
            <Database size={14} color="#c084fc" />
            <span style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
              Data: <strong>{project.datasetName}</strong> ({project.datasetSize.split('•')[0]})
            </span>
          </div>
        </div>

        {/* Tools badges */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
          {project.tools.slice(0, 4).map((tool) => (
            <span 
              key={tool} 
              style={{
                fontSize: '0.72rem',
                fontWeight: 600,
                color: '#93c5fd',
                background: 'rgba(59, 130, 246, 0.1)',
                border: '1px solid rgba(59, 130, 246, 0.2)',
                padding: '2px 8px',
                borderRadius: '6px'
              }}
            >
              {tool}
            </span>
          ))}
          {project.tools.length > 4 && (
            <span style={{ fontSize: '0.72rem', color: '#64748b', alignSelf: 'center' }}>
              +{project.tools.length - 4} more
            </span>
          )}
        </div>
      </div>

      {/* Action buttons */}
      <div style={{ display: 'flex', gap: '10px', borderTop: '1px solid rgba(255, 255, 255, 0.06)', paddingTop: '16px' }}>
        <button
          onClick={() => onSelect(project)}
          className="btn-secondary"
          style={{ flex: 1, fontSize: '0.82rem', padding: '9px 12px' }}
        >
          <span>Open Lab & Steps</span>
          <ArrowRight size={14} />
        </button>

        <button
          onClick={() => onAskAgent(project)}
          className="btn-primary"
          style={{ padding: '9px 14px', fontSize: '0.82rem' }}
          title="Ask Teaching Agent for Custom Roadmap"
        >
          <Sparkles size={14} />
          <span>AI Plan</span>
        </button>
      </div>
    </div>
  );
}
