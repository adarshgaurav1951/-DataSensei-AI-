import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Network3DCanvas from './components/Network3DCanvas';
import LivePipeline from './components/LivePipeline';
import IndustryWorkSection from './components/IndustryWorkSection';
import ProjectsSection from './components/ProjectsSection';
import SkillPathSection from './components/SkillPathSection';
import ToolsSection from './components/ToolsSection';
import AiInDevSection from './components/AiInDevSection';
import ProjectModal from './components/ProjectModal';
import AiAgentDrawer from './components/AiAgentDrawer';

export default function App() {
  const [heroPrompt, setHeroPrompt] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isAgentDrawerOpen, setIsAgentDrawerOpen] = useState(false);
  const [activeProjectFilter, setActiveProjectFilter] = useState('All');

  // Track completed steps across projects
  const [completedSteps, setCompletedSteps] = useState([
    'churn-prediction-step-0',
    'churn-prediction-step-1'
  ]);

  const toggleStep = (stepId) => {
    setCompletedSteps(prev =>
      prev.includes(stepId) ? prev.filter(id => id !== stepId) : [...prev, stepId]
    );
  };

  const handleHeroSubmit = (e) => {
    e.preventDefault();
    setIsAgentDrawerOpen(true);
  };

  const handleSelectDomain = (domain) => {
    setActiveProjectFilter(domain);
    const el = document.getElementById('real-world-projects');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-main)', color: 'var(--text-main)', display: 'flex', flexDirection: 'column' }}>
      
      {/* Top Minimal Navbar matching Image 1 */}
      <Navbar onOpenAgent={() => setIsAgentDrawerOpen(true)} />

      <main style={{ flex: 1 }}>
        {/* HERO SECTION matching Image 1 exactly */}
        <section style={{ padding: '70px 0 50px' }}>
          <div className="container">
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1.2fr 1fr',
              gap: '40px',
              alignItems: 'center'
            }}>
              {/* Left Column: Heading, Subtitle, Input + Make my plan */}
              <div>
                <h1 style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(2.8rem, 5.2vw, 4.4rem)',
                  lineHeight: '1.08',
                  fontWeight: 800,
                  letterSpacing: '-0.025em',
                  color: '#1B1714',
                  marginBottom: '24px'
                }}>
                  Learn data science by solving real problems
                </h1>

                <p style={{
                  fontSize: '1.12rem',
                  color: '#6B6258',
                  lineHeight: '1.6',
                  maxWidth: '560px',
                  marginBottom: '32px'
                }}>
                  Pick a real-world problem, see the dataset, the tools, and the steps. Or describe your problem and the agent builds you a learning plan.
                </p>

                {/* Input + Make My Plan Button */}
                <form 
                  onSubmit={handleHeroSubmit}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    maxWidth: '540px'
                  }}
                >
                  <input
                    type="text"
                    className="clean-input"
                    placeholder="e.g. predict which customers will leave"
                    value={heroPrompt}
                    onChange={(e) => setHeroPrompt(e.target.value)}
                    style={{
                      flex: 1,
                      borderRadius: '10px',
                      padding: '14px 18px',
                      border: '1px solid #D6C8BA'
                    }}
                  />
                  <button
                    type="submit"
                    className="btn-terracotta"
                    style={{
                      padding: '14px 24px',
                      borderRadius: '10px',
                      fontWeight: 700,
                      whiteSpace: 'nowrap'
                    }}
                  >
                    Make my plan
                  </button>
                </form>
              </div>

              {/* Right Column: 3D Terracotta Wireframe Sphere */}
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Network3DCanvas />
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Live Pipeline (Image 1 bottom) */}
        <LivePipeline />

        {/* SECTION 3: What data scientists do in industry (Image 2) */}
        <IndustryWorkSection onSelectDomain={handleSelectDomain} />

        {/* SECTION 4: Real-world projects (Image 3) */}
        <ProjectsSection 
          onOpenProject={(p) => setSelectedProject(p)}
          activeFilter={activeProjectFilter}
          onClearFilter={() => setActiveProjectFilter('All')}
        />

        {/* SECTION 5: Skill path (Image 4) */}
        <SkillPathSection onOpenProject={(p) => setSelectedProject(p)} />

        {/* SECTION 6: Tools and platforms (Image 5 top) */}
        <ToolsSection onOpenProject={(p) => setSelectedProject(p)} />

        {/* SECTION 7: How AI helps developers (Image 5 bottom) */}
        <AiInDevSection onOpenAgent={() => setIsAgentDrawerOpen(true)} />
      </main>

      {/* Deep Project Walkthrough Modal */}
      <ProjectModal
        project={selectedProject}
        completedSteps={completedSteps}
        onToggleStep={toggleStep}
        onClose={() => setSelectedProject(null)}
        onLaunchAgent={(p) => {
          setSelectedProject(p);
          setIsAgentDrawerOpen(true);
        }}
      />

      {/* Socratic AI Teaching Agent Drawer */}
      <AiAgentDrawer
        isOpen={isAgentDrawerOpen}
        onClose={() => setIsAgentDrawerOpen(false)}
        selectedProject={selectedProject}
        initialGoalPrompt={heroPrompt}
      />

      {/* Minimal Editorial Footer */}
      <footer style={{
        background: '#F4ECE1',
        borderTop: '1px solid #ECE4DC',
        padding: '36px 0'
      }}>
        <div className="container" style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          fontSize: '0.88rem',
          color: '#6B6258'
        }}>
          <div>
            <strong style={{ color: '#1B1714', fontFamily: 'var(--font-serif)', fontSize: '1.05rem' }}>
              DataSensei AI
            </strong> — Adaptive Data Science Teaching Agent Platform
          </div>

          <div style={{ display: 'flex', gap: '20px' }}>
            <span>12 Flagship Projects</span>
            <span>•</span>
            <span>16 Curated Skills</span>
            <span>•</span>
            <span>15 Industry Tools</span>
          </div>

          <div>
            <button
              onClick={() => setIsAgentDrawerOpen(true)}
              style={{
                background: 'none',
                border: 'none',
                color: '#D9532F',
                cursor: 'pointer',
                fontWeight: 600
              }}
            >
              Ask the Agent →
            </button>
          </div>
        </div>
      </footer>

    </div>
  );
}
