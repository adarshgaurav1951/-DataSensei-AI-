import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Network3DCanvas from './components/Network3DCanvas';
import ProjectCard from './components/ProjectCard';
import ProjectModal from './components/ProjectModal';
import AiAgentDrawer from './components/AiAgentDrawer';
import SkillGraphView from './components/SkillGraphView';
import DatasetExplorer from './components/DatasetExplorer';
import DeploymentModal from './components/DeploymentModal';
import { 
  PROJECTS_12, 
  INDUSTRY_TRACKS, 
  SKILLS_16, 
  TOOLS_15,
  AGENT_ROLES 
} from './data/projectsData';
import { 
  Search, 
  Sparkles, 
  Layers, 
  Bot, 
  Compass, 
  CheckCircle2, 
  Flame, 
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Cpu
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('projects'); // 'projects' | 'agent-studio' | 'skill-graph' | 'datasets'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTrack, setSelectedTrack] = useState('All Tracks');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  
  // Modals & Drawers
  const [selectedProject, setSelectedProject] = useState(null);
  const [isAgentDrawerOpen, setIsAgentDrawerOpen] = useState(false);
  const [isDeployModalOpen, setIsDeployModalOpen] = useState(false);
  
  // Completed Steps Tracker (persisted in local storage or state)
  const [completedSteps, setCompletedSteps] = useState([
    'churn-prediction-step-0',
    'churn-prediction-step-1'
  ]);

  const toggleStep = (stepId) => {
    setCompletedSteps(prev => 
      prev.includes(stepId) ? prev.filter(id => id !== stepId) : [...prev, stepId]
    );
  };

  // Filter projects
  const filteredProjects = PROJECTS_12.filter(p => {
    const matchesSearch = 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.domain.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.datasetName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      p.tools.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesTrack = selectedTrack === 'All Tracks' || p.domain === selectedTrack;
    const matchesDifficulty = selectedDifficulty === 'All' || p.difficulty === selectedDifficulty;

    return matchesSearch && matchesTrack && matchesDifficulty;
  });

  const handleLaunchAgentForProject = (project) => {
    setSelectedProject(project);
    setIsAgentDrawerOpen(true);
  };

  return (
    <div style={{ minHeight: '100vh', position: 'relative', display: 'flex', flexDirection: 'column' }}>
      {/* 3D Constellation Canvas Network */}
      <Network3DCanvas />

      {/* Navigation */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onOpenAgent={() => setIsAgentDrawerOpen(true)}
        onOpenDeploy={() => setIsDeployModalOpen(true)}
      />

      {/* Main Content Area */}
      <main style={{ flex: 1, position: 'relative', zIndex: 10 }}>
        
        {/* TAB 1: PROJECTS & CATALOG */}
        {activeTab === 'projects' && (
          <div>
            {/* Hero Section */}
            <section style={{ padding: '64px 0 44px', textAlign: 'center' }}>
              <div className="container">
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                  <span className="badge badge-cyan" style={{ fontSize: '0.82rem', padding: '6px 14px' }}>
                    <Sparkles size={14} /> PROBLEM-FIRST DATA SCIENCE
                  </span>
                  <span className="badge badge-purple" style={{ fontSize: '0.82rem', padding: '6px 14px' }}>
                    SOCRATIC AI AGENT
                  </span>
                </div>

                <h1 style={{ 
                  fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', 
                  fontWeight: 800, 
                  letterSpacing: '-0.03em', 
                  lineHeight: '1.15',
                  marginBottom: '20px',
                  color: '#ffffff'
                }}>
                  Pick a Real-World Problem.<br />
                  <span className="gradient-cyan-purple">Master 16 Skills & 15 Tools</span> with AI.
                </h1>

                <p style={{ 
                  fontSize: '1.15rem', 
                  color: '#94a3b8', 
                  maxWidth: '820px', 
                  margin: '0 auto 32px',
                  lineHeight: '1.6'
                }}>
                  Tired of passive tutorials? Select an enterprise dataset (Churn, Fraud, Demand Forecasting, Supabase RLS), follow industry steps, and work with a Socratic AI mentor that crafts custom roadmaps and catches code leaks.
                </p>

                {/* Hero Action Buttons */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', flexWrap: 'wrap', marginBottom: '48px' }}>
                  <button 
                    onClick={() => {
                      const el = document.getElementById('catalog-section');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="btn-primary"
                    style={{ padding: '12px 24px', fontSize: '0.98rem' }}
                  >
                    <Layers size={18} />
                    <span>Browse 12 Flagship Projects</span>
                  </button>

                  <button 
                    onClick={() => setIsAgentDrawerOpen(true)}
                    className="btn-purple btn-primary"
                    style={{ padding: '12px 22px', fontSize: '0.98rem' }}
                  >
                    <Bot size={18} />
                    <span>Ask Teaching Agent for Custom Plan</span>
                  </button>

                  <button 
                    onClick={() => setActiveTab('skill-graph')}
                    className="btn-secondary"
                    style={{ padding: '12px 20px', fontSize: '0.98rem' }}
                  >
                    <Compass size={18} color="#00f5d4" />
                    <span>View 16-Skill Matrix</span>
                  </button>
                </div>

                {/* Metric Strip */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '16px',
                  maxWidth: '1080px',
                  margin: '0 auto'
                }}>
                  {[
                    { label: 'Flagship Projects', val: '12 Projects', sub: 'Across 8 Industry Tracks', color: '#00f5d4' },
                    { label: 'Curated Competencies', val: '16 Core Skills', sub: 'From Cleaning to RLS & SQL', color: '#8b5cf6' },
                    { label: 'Industry Tools', val: '15 Toolsets', sub: 'Python, PyTorch, XGBoost, HF', color: '#38bdf8' },
                    { label: 'Socratic Mentorship', val: '6 AI Roles', sub: 'Anti-Leakage & 3-Tier Hints', color: '#10b981' }
                  ].map((stat, i) => (
                    <div key={i} className="glass-panel" style={{ padding: '18px 20px', textAlign: 'left' }}>
                      <div style={{ fontSize: '0.78rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 600 }}>
                        {stat.label}
                      </div>
                      <div style={{ fontSize: '1.5rem', fontWeight: 800, color: stat.color, margin: '4px 0' }}>
                        {stat.val}
                      </div>
                      <div style={{ fontSize: '0.76rem', color: '#64748b' }}>
                        {stat.sub}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Catalog Section */}
            <section id="catalog-section" style={{ padding: '30px 0 80px' }}>
              <div className="container">
                {/* Search & Filter Toolbar */}
                <div className="glass-panel" style={{ padding: '20px 24px', marginBottom: '32px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    
                    {/* Search & Difficulty row */}
                    <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center' }}>
                      <div style={{
                        flex: 1,
                        minWidth: '280px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        background: 'rgba(5, 8, 16, 0.6)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '8px',
                        padding: '10px 14px'
                      }}>
                        <Search size={18} color="#00f5d4" />
                        <input
                          type="text"
                          placeholder="Search by problem, skill, tool, or dataset (e.g. churn, xgboost, sql, pytorch)..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          style={{
                            background: 'transparent',
                            border: 'none',
                            color: '#fff',
                            fontSize: '0.9rem',
                            outline: 'none',
                            width: '100%'
                          }}
                        />
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontSize: '0.84rem', color: '#94a3b8' }}>Difficulty:</span>
                        <select
                          value={selectedDifficulty}
                          onChange={(e) => setSelectedDifficulty(e.target.value)}
                          style={{
                            padding: '10px 14px',
                            borderRadius: '8px',
                            background: '#0a0f1e',
                            color: '#fff',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            fontSize: '0.84rem',
                            cursor: 'pointer'
                          }}
                        >
                          <option value="All">All Difficulties</option>
                          <option value="Beginner">Beginner</option>
                          <option value="Intermediate">Intermediate</option>
                          <option value="Advanced">Advanced</option>
                        </select>
                      </div>
                    </div>

                    {/* Industry Track Pills */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', borderTop: '1px solid rgba(255, 255, 255, 0.06)', paddingTop: '14px' }}>
                      {INDUSTRY_TRACKS.map((track) => {
                        const isSelected = selectedTrack === track;
                        return (
                          <button
                            key={track}
                            onClick={() => setSelectedTrack(track)}
                            style={{
                              padding: '6px 14px',
                              borderRadius: '999px',
                              fontSize: '0.78rem',
                              fontWeight: isSelected ? 700 : 500,
                              background: isSelected ? 'linear-gradient(135deg, #00f5d4, #0ea5e9)' : 'rgba(255, 255, 255, 0.04)',
                              color: isSelected ? '#050811' : '#cbd5e1',
                              border: isSelected ? 'none' : '1px solid rgba(255, 255, 255, 0.08)',
                              cursor: 'pointer',
                              transition: 'all 0.2s ease'
                            }}
                          >
                            {track}
                          </button>
                        );
                      })}
                    </div>

                  </div>
                </div>

                {/* Projects Grid */}
                <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ fontSize: '0.9rem', color: '#94a3b8' }}>
                    Showing <strong>{filteredProjects.length}</strong> of {PROJECTS_12.length} Flagship Projects
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#00f5d4' }}>
                    ● Real Datasets & Step Scaffolding Active
                  </div>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
                  gap: '24px'
                }}>
                  {filteredProjects.map((project) => {
                    const isAllStepsDone = project.steps.every((_, idx) => 
                      completedSteps.includes(`${project.id}-step-${idx}`)
                    );
                    return (
                      <ProjectCard
                        key={project.id}
                        project={project}
                        isCompleted={isAllStepsDone}
                        onSelect={(p) => setSelectedProject(p)}
                        onAskAgent={(p) => handleLaunchAgentForProject(p)}
                      />
                    );
                  })}
                </div>

                {filteredProjects.length === 0 && (
                  <div className="glass-panel" style={{ padding: '60px 20px', textAlign: 'center' }}>
                    <p style={{ fontSize: '1.1rem', color: '#cbd5e1', marginBottom: '12px' }}>
                      No projects matched your search criteria.
                    </p>
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedTrack('All Tracks');
                        setSelectedDifficulty('All');
                      }}
                      className="btn-primary"
                    >
                      Reset All Filters
                    </button>
                  </div>
                )}
              </div>
            </section>
          </div>
        )}

        {/* TAB 2: AI TEACHING AGENT STUDIO */}
        {activeTab === 'agent-studio' && (
          <div className="container" style={{ padding: '40px 24px 80px' }}>
            <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 36px' }}>
              <span className="badge badge-cyan" style={{ marginBottom: '12px' }}>
                Pedagogical AI Engine
              </span>
              <h2 style={{ fontSize: '2.4rem', fontWeight: 800, color: '#fff', marginBottom: '12px' }}>
                The Socratic AI Teaching Agent
              </h2>
              <p style={{ fontSize: '0.98rem', color: '#94a3b8', lineHeight: '1.6' }}>
                DataForge’s agent acts as your 1-on-1 mentor across 6 specialized roles. It constructs customized schedules, guides you with 3-tier hints rather than giving answers away, and scans your code for data leakage.
              </p>
            </div>

            {/* The 6 Roles Showcase Cards */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '20px',
              marginBottom: '40px'
            }}>
              {AGENT_ROLES.map((role) => (
                <div key={role.id} className="glass-panel" style={{ padding: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      background: `${role.color}18`,
                      color: role.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: `1px solid ${role.color}44`
                    }}>
                      <Bot size={20} />
                    </div>
                    <span 
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        color: role.color,
                        background: `${role.color}15`,
                        padding: '3px 10px',
                        borderRadius: '999px',
                        border: `1px solid ${role.color}33`
                      }}
                    >
                      {role.badge}
                    </span>
                  </div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>
                    {role.title}
                  </h3>
                  <p style={{ fontSize: '0.84rem', color: '#94a3b8', lineHeight: '1.5', marginBottom: '18px' }}>
                    {role.description}
                  </p>
                  <button
                    onClick={() => {
                      setIsAgentDrawerOpen(true);
                    }}
                    className="btn-secondary"
                    style={{ width: '100%', fontSize: '0.82rem', padding: '8px 12px' }}
                  >
                    <span>Launch {role.title}</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              ))}
            </div>

            {/* Central CTA Banner */}
            <div className="glass-panel" style={{
              padding: '36px',
              background: 'linear-gradient(135deg, rgba(0, 245, 212, 0.08) 0%, rgba(139, 92, 246, 0.12) 100%)',
              border: '1px solid rgba(0, 245, 212, 0.3)',
              textAlign: 'center',
              borderRadius: '16px'
            }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', marginBottom: '12px' }}>
                Ready to Experience 1-on-1 Socratic Mentorship?
              </h3>
              <p style={{ fontSize: '0.92rem', color: '#cbd5e1', maxWidth: '640px', margin: '0 auto 24px' }}>
                Open the interactive drawer to generate your personalized 4-week roadmap or run a real-time data leakage inspection on your model pipeline.
              </p>
              <button
                onClick={() => setIsAgentDrawerOpen(true)}
                className="btn-primary"
                style={{ padding: '12px 28px', fontSize: '0.98rem' }}
              >
                <Sparkles size={18} />
                <span>Open AI Teaching Agent Studio</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 3: 16 SKILLS & 15 TOOLS GRAPH */}
        {activeTab === 'skill-graph' && (
          <div className="container" style={{ padding: '40px 24px 80px' }}>
            <SkillGraphView onSelectProject={(p) => {
              setSelectedProject(p);
            }} />
          </div>
        )}

        {/* TAB 4: DATASET EXPLORER */}
        {activeTab === 'datasets' && (
          <div className="container" style={{ padding: '40px 24px 80px' }}>
            <DatasetExplorer onOpenProject={(p) => {
              setSelectedProject(p);
            }} />
          </div>
        )}

      </main>

      {/* Deep Project Workspace Modal */}
      <ProjectModal
        project={selectedProject}
        completedSteps={completedSteps}
        onToggleStep={toggleStep}
        onClose={() => setSelectedProject(null)}
        onLaunchAgent={(proj) => {
          setSelectedProject(proj);
          setIsAgentDrawerOpen(true);
        }}
      />

      {/* AI Teaching Agent Drawer */}
      <AiAgentDrawer
        isOpen={isAgentDrawerOpen}
        onClose={() => setIsAgentDrawerOpen(false)}
        selectedProject={selectedProject}
      />

      {/* Deployment & PRD Modal */}
      <DeploymentModal
        isOpen={isDeployModalOpen}
        onClose={() => setIsDeployModalOpen(false)}
      />

      {/* Footer */}
      <footer style={{
        position: 'relative',
        zIndex: 20,
        background: 'rgba(5, 8, 15, 0.9)',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '32px 0 24px'
      }}>
        <div className="container" style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          fontSize: '0.84rem',
          color: '#64748b'
        }}>
          <div>
            <strong style={{ color: '#fff' }}>DataForge</strong> — AI Teaching Agent & Data Science Learning Platform
          </div>

          <div style={{ display: 'flex', gap: '20px' }}>
            <span style={{ color: '#00f5d4' }}>● 12 Projects Live</span>
            <span style={{ color: '#8b5cf6' }}>● 16 Skills Mapped</span>
            <span style={{ color: '#38bdf8' }}>● 15 Tools Integrated</span>
          </div>

          <div>
            <button 
              onClick={() => setIsDeployModalOpen(true)}
              style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', textDecoration: 'underline' }}
            >
              Deployment Center & PRD Specs
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
