import React, { useState } from 'react';
import { 
  SKILLS_16, 
  TOOLS_15, 
  PROJECTS_12 
} from '../data/projectsData';
import { 
  Compass, 
  Layers, 
  CheckCircle, 
  ArrowRight, 
  Sparkles,
  BookOpen,
  Filter,
  RefreshCw,
  BarChart2,
  PieChart,
  MessageSquare,
  Database,
  Cpu,
  Terminal,
  Grid,
  TrendingUp,
  Activity,
  CheckCircle2,
  Layout,
  ShieldCheck
} from 'lucide-react';

const ICON_MAP = {
  BookOpen, Filter, RefreshCw, BarChart2, PieChart, MessageSquare,
  Database, Layers, Cpu, Terminal, Grid, TrendingUp, Activity,
  CheckCircle2, Layout, ShieldCheck
};

export default function SkillGraphView({ onSelectProject }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedSkill, setSelectedSkill] = useState(SKILLS_16[0]);
  const [selectedTool, setSelectedTool] = useState(TOOLS_15[0]);
  const [viewMode, setViewMode] = useState('skills'); // 'skills' | 'tools'

  const categories = ['All', 'Foundations', 'Wrangling', 'Visualization', 'SQL & DB', 'Statistics', 'BI', 'Security'];

  const filteredSkills = activeCategory === 'All' 
    ? SKILLS_16 
    : SKILLS_16.filter(s => s.category === activeCategory);

  // Find projects that use this skill
  const relevantProjects = PROJECTS_12.filter(p => 
    viewMode === 'skills' 
      ? p.skills.includes(selectedSkill.name)
      : p.tools.includes(selectedTool.name)
  );

  return (
    <div style={{ paddingBottom: '60px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 36px' }}>
        <span className="badge badge-purple" style={{ marginBottom: '12px' }}>
          Industry Knowledge Matrix
        </span>
        <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#fff', marginBottom: '12px' }}>
          16 Skills & 15 Tools Network
        </h2>
        <p style={{ fontSize: '0.96rem', color: '#94a3b8' }}>
          Explore the exact skills and enterprise tools required across the 12 flagship projects. Click any skill or tool to see how it applies to real production data problems.
        </p>
      </div>

      {/* Switcher & Category Filters */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px', marginBottom: '28px' }}>
        <div style={{ display: 'flex', gap: '8px', background: 'rgba(15, 23, 42, 0.6)', padding: '4px', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <button
            onClick={() => setViewMode('skills')}
            style={{
              padding: '8px 18px',
              borderRadius: '8px',
              fontSize: '0.86rem',
              fontWeight: viewMode === 'skills' ? 700 : 500,
              background: viewMode === 'skills' ? 'linear-gradient(135deg, #00f5d4, #0ea5e9)' : 'transparent',
              color: viewMode === 'skills' ? '#040812' : '#94a3b8',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            The 16 Core Skills
          </button>
          <button
            onClick={() => setViewMode('tools')}
            style={{
              padding: '8px 18px',
              borderRadius: '8px',
              fontSize: '0.86rem',
              fontWeight: viewMode === 'tools' ? 700 : 500,
              background: viewMode === 'tools' ? 'linear-gradient(135deg, #8b5cf6, #6366f1)' : 'transparent',
              color: viewMode === 'tools' ? '#fff' : '#94a3b8',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            The 15 Industry Tools
          </button>
        </div>

        {viewMode === 'skills' && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '6px',
                  fontSize: '0.78rem',
                  fontWeight: activeCategory === cat ? 700 : 500,
                  background: activeCategory === cat ? 'rgba(0, 245, 212, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                  color: activeCategory === cat ? '#00f5d4' : '#94a3b8',
                  border: activeCategory === cat ? '1px solid #00f5d4' : '1px solid rgba(255, 255, 255, 0.06)',
                  cursor: 'pointer'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main Grid: Left Selector, Right Connected Projects */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '24px' }}>
        
        {/* Left: Cards List */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '14px' }}>
          {viewMode === 'skills' ? (
            filteredSkills.map(skill => {
              const IconComp = ICON_MAP[skill.icon] || BookOpen;
              const isSelected = selectedSkill.id === skill.id;
              return (
                <div
                  key={skill.id}
                  onClick={() => setSelectedSkill(skill)}
                  className="glass-panel"
                  style={{
                    padding: '16px',
                    cursor: 'pointer',
                    border: isSelected ? '1px solid #00f5d4' : '1px solid rgba(255, 255, 255, 0.08)',
                    background: isSelected ? 'rgba(0, 245, 212, 0.08)' : 'rgba(16, 23, 41, 0.7)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      background: isSelected ? 'rgba(0, 245, 212, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: isSelected ? '#00f5d4' : '#94a3b8'
                    }}>
                      <IconComp size={16} />
                    </div>
                    <span className="badge badge-purple" style={{ fontSize: '0.68rem', padding: '1px 6px' }}>
                      {skill.category}
                    </span>
                  </div>
                  <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#fff', marginBottom: '4px' }}>
                    {skill.name}
                  </h4>
                  <p style={{ fontSize: '0.76rem', color: '#94a3b8', lineHeight: '1.4' }}>
                    {skill.desc}
                  </p>
                </div>
              );
            })
          ) : (
            TOOLS_15.map(tool => {
              const isSelected = selectedTool.name === tool.name;
              return (
                <div
                  key={tool.name}
                  onClick={() => setSelectedTool(tool)}
                  className="glass-panel"
                  style={{
                    padding: '16px',
                    cursor: 'pointer',
                    border: isSelected ? '1px solid #8b5cf6' : '1px solid rgba(255, 255, 255, 0.08)',
                    background: isSelected ? 'rgba(139, 92, 246, 0.1)' : 'rgba(16, 23, 41, 0.7)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontSize: '1.05rem', fontWeight: 800, color: '#fff' }}>
                      {tool.name}
                    </span>
                    <span 
                      style={{ 
                        fontSize: '0.7rem', 
                        padding: '2px 8px', 
                        borderRadius: '999px',
                        background: `${tool.badge}22`,
                        color: tool.badge,
                        border: `1px solid ${tool.badge}55`,
                        fontWeight: 600
                      }}
                    >
                      {tool.tag}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                    Standard in production data pipelines & modeling stacks.
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Right: Connected Projects Panel */}
        <div className="glass-panel" style={{ padding: '24px', alignSelf: 'start' }}>
          <div style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '16px', marginBottom: '18px' }}>
            <span className="badge badge-cyan" style={{ marginBottom: '8px' }}>
              Connected Learning Modules
            </span>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff', marginBottom: '6px' }}>
              {viewMode === 'skills' ? selectedSkill.name : selectedTool.name}
            </h3>
            <p style={{ fontSize: '0.84rem', color: '#94a3b8' }}>
              {viewMode === 'skills' ? selectedSkill.desc : `Industry-standard tool for ${selectedTool.tag}.`}
            </p>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#e2e8f0', marginBottom: '10px' }}>
              Projects Applying This ({relevantProjects.length}):
            </div>

            {relevantProjects.length === 0 ? (
              <div style={{ fontSize: '0.82rem', color: '#64748b', fontStyle: 'italic', padding: '16px', textAlign: 'center' }}>
                Used in cross-cutting data foundational exercises.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {relevantProjects.map(proj => (
                  <div
                    key={proj.id}
                    onClick={() => onSelectProject(proj)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px 14px',
                      borderRadius: '8px',
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.06)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '0.86rem', fontWeight: 700, color: '#fff' }}>
                        {proj.title}
                      </div>
                      <div style={{ fontSize: '0.74rem', color: '#38bdf8' }}>
                        {proj.domain} • {proj.difficulty}
                      </div>
                    </div>
                    <ArrowRight size={16} color="#00f5d4" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
