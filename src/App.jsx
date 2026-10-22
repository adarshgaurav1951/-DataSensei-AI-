import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import LiveTelemetryBar from './components/LiveTelemetryBar';
import Network3DCanvas from './components/Network3DCanvas';
import DataLabSection from './components/DataLabSection';
import LivePipeline from './components/LivePipeline';
import IndustryWorkSection from './components/IndustryWorkSection';
import ProjectsSection from './components/ProjectsSection';
import SkillPathSection from './components/SkillPathSection';
import ToolsSection from './components/ToolsSection';
import AiInDevSection from './components/AiInDevSection';
import ProjectModal from './components/ProjectModal';
import VoiceAssistantModal from './components/VoiceAssistantModal';
import { voiceService } from './services/voiceAssistant';
import { 
  Sparkles, 
  Mic, 
  MicOff, 
  ArrowRight, 
  Cpu, 
  Activity, 
  Database, 
  Layers, 
  Volume2, 
  Zap,
  Terminal,
  Play
} from 'lucide-react';

export default function App() {
  const [heroPrompt, setHeroPrompt] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [voiceInitialQuery, setVoiceInitialQuery] = useState('');
  const [activeProjectFilter, setActiveProjectFilter] = useState('All');
  const [dataLabPreset, setDataLabPreset] = useState(null);

  // Voice engine reactivity state (passed into 3D Canvas and UI)
  const [isAgentSpeaking, setIsAgentSpeaking] = useState(false);
  const [isAgentListening, setIsAgentListening] = useState(false);

  // Track completed steps across projects
  const [completedSteps, setCompletedSteps] = useState([
    'churn-prediction-step-0',
    'churn-prediction-step-1'
  ]);

  // Floating background tensor glyphs
  const tensorGlyphs = [
    { text: '∇_θ J(θ)', top: '15%', left: '8%', delay: '0s' },
    { text: 'ŷ = σ(W·x + b)', top: '45%', left: '4%', delay: '3s' },
    { text: 'Attention(Q,K,V)', top: '75%', left: '12%', delay: '6s' },
    { text: 'AUC = 0.942', top: '25%', right: '6%', delay: '2s' },
    { text: 'PR-AUC Lift +28%', top: '60%', right: '10%', delay: '5s' },
    { text: 'L_BCE = -[y log p + (1-y) log(1-p)]', top: '85%', right: '4%', delay: '8s' },
    { text: 'p < 0.001 (Significant)', top: '35%', left: '32%', delay: '4s' },
    { text: 'PSI = 0.038 [Healthy]', top: '90%', left: '25%', delay: '7s' }
  ];

  const toggleStep = (stepId) => {
    setCompletedSteps(prev =>
      prev.includes(stepId) ? prev.filter(id => id !== stepId) : [...prev, stepId]
    );
  };

  const handleHeroSubmit = (e) => {
    e.preventDefault();
    setVoiceInitialQuery(heroPrompt || 'How do I predict customer churn with imbalanced data?');
    setIsVoiceModalOpen(true);
  };

  const handleQuickChallenge = (query) => {
    setVoiceInitialQuery(query);
    setIsVoiceModalOpen(true);
  };

  const handleSelectDomain = (domain) => {
    setActiveProjectFilter(domain);
    const el = document.getElementById('real-world-projects');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendToDataLab = (solution) => {
    setDataLabPreset(solution);
    const el = document.getElementById('data-lab');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleLaunchVoiceWithProject = (project) => {
    setVoiceInitialQuery(`How do I architect and solve the ${project.title} project with dataset ${project.datasetName}?`);
    setIsVoiceModalOpen(true);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-void)', color: 'var(--text-primary)', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      
      {/* 1. Dynamic Video-Like Cinematic Background Auroras */}
      <div className="cinematic-bg">
        <div className="aurora-orb orb-cyan" />
        <div className="aurora-orb orb-purple" />
        <div className="aurora-orb orb-emerald" />
      </div>

      {/* 2. Cyber Grid & Floating Tensor Expressions */}
      <div className="cyber-grid-overlay">
        {tensorGlyphs.map((glyph, idx) => (
          <div
            key={idx}
            className="tensor-glyph"
            style={{
              top: glyph.top,
              left: glyph.left,
              right: glyph.right,
              animationDelay: glyph.delay
            }}
          >
            {glyph.text}
          </div>
        ))}
      </div>

      {/* 3. Top Navbar */}
      <Navbar 
        onOpenAgent={() => {
          setVoiceInitialQuery('');
          setIsVoiceModalOpen(true);
        }}
        isSpeaking={isAgentSpeaking}
        isListening={isAgentListening}
      />

      {/* 4. Live Telemetry HUD Bar */}
      <LiveTelemetryBar 
        onOpenAgent={() => {
          setVoiceInitialQuery('');
          setIsVoiceModalOpen(true);
        }}
      />

      <main style={{ flex: 1, position: 'relative', zIndex: 2 }}>
        
        {/* HERO SECTION: 3D Holographic Brain & Voice Intelligence Agent */}
        <section style={{ padding: '80px 0 60px', position: 'relative' }}>
          <div className="container">
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1.25fr 1fr',
              gap: '40px',
              alignItems: 'center'
            }}>
              
              {/* Left Column: Heading, Voice Input & Quick Triggers */}
              <div>
                {/* Agent Status Badge */}
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '18px' }}>
                  <span className="pill-tag" style={{ background: 'rgba(0, 240, 255, 0.12)', borderColor: 'var(--neon-cyan)', color: 'var(--neon-cyan)', fontWeight: 600 }}>
                    <Sparkles size={13} />
                    <span>AUTONOMOUS DATA SCIENCE AGENT 3.8</span>
                  </span>
                  <span className="status-dot-active" />
                  <span style={{ fontSize: '0.76rem', color: '#94A3B8', fontFamily: 'var(--font-mono)' }}>
                    VOICE ENGINE ENGAGED
                  </span>
                </div>

                {/* Main Headline */}
                <h1 style={{
                  fontSize: 'clamp(2.6rem, 4.8vw, 4.2rem)',
                  lineHeight: '1.1',
                  fontWeight: 900,
                  letterSpacing: '-0.03em',
                  marginBottom: '22px'
                }}>
                  Master Data Science by Solving Real Problems with <span className="gradient-text-rainbow">Autonomous AI</span>
                </h1>

                {/* Subtitle */}
                <p style={{
                  fontSize: '1.12rem',
                  color: 'var(--text-secondary)',
                  lineHeight: '1.6',
                  maxWidth: '580px',
                  marginBottom: '32px'
                }}>
                  An AI agent trained on complete mathematical foundations, machine learning algorithms, deep learning transformers, and MLOps. Talk hands-free via voice or execute live code in our interactive Data Lab.
                </p>

                {/* Input + Voice Mic + Submit */}
                <form 
                  onSubmit={handleHeroSubmit}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    maxWidth: '580px',
                    marginBottom: '20px',
                    background: 'rgba(12, 16, 28, 0.85)',
                    border: '1px solid rgba(0, 240, 255, 0.25)',
                    borderRadius: '16px',
                    padding: '6px 8px 6px 14px',
                    boxShadow: '0 0 30px rgba(0, 240, 255, 0.12)'
                  }}
                >
                  <input
                    type="text"
                    className="clean-input"
                    placeholder="e.g. solve 95:5 class imbalance in churn prediction"
                    value={heroPrompt}
                    onChange={(e) => setHeroPrompt(e.target.value)}
                    style={{
                      flex: 1,
                      background: 'transparent',
                      border: 'none',
                      boxShadow: 'none',
                      padding: '10px 0',
                      fontSize: '0.96rem'
                    }}
                  />

                  {/* Mic Button */}
                  <button
                    type="button"
                    onClick={() => {
                      setVoiceInitialQuery(heroPrompt || '');
                      setIsVoiceModalOpen(true);
                    }}
                    style={{
                      background: 'rgba(0, 240, 255, 0.12)',
                      border: '1px solid rgba(0, 240, 255, 0.3)',
                      color: 'var(--neon-cyan)',
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer'
                    }}
                    title="Speak to Agent"
                  >
                    <Mic size={18} />
                  </button>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="btn-neon-cyan"
                    style={{
                      padding: '12px 22px',
                      borderRadius: '12px',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    <span>Solve With AI</span>
                    <ArrowRight size={16} />
                  </button>
                </form>

                {/* Quick Challenge Prompt Chips */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.78rem', color: '#64748B', fontFamily: 'var(--font-mono)' }}>TRY:</span>
                  {[
                    { label: '95:5 Imbalance Paradox', query: 'How do I solve the accuracy paradox with 95:5 imbalanced customer churn?' },
                    { label: 'PyTorch Overfitting', query: 'My PyTorch training loss is 0.05 but val loss is 0.42. How do I fix overfitting?' },
                    { label: 'A/B Test Significance', query: 'How do I calculate if a 3.2% vs 3.7% conversion lift is statistically significant?' }
                  ].map((chip) => (
                    <button
                      key={chip.label}
                      type="button"
                      onClick={() => handleQuickChallenge(chip.query)}
                      className="pill-tag"
                      style={{ cursor: 'pointer', background: 'rgba(255, 255, 255, 0.04)', borderColor: 'rgba(255, 255, 255, 0.1)' }}
                    >
                      <Zap size={11} color="var(--neon-cyan)" />
                      <span>{chip.label}</span>
                    </button>
                  ))}
                </div>

                {/* Tech Ecosystem Pills */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '28px', fontSize: '0.8rem', color: '#94A3B8' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--neon-cyan)' }} />
                    <span>XGBoost & PyTorch</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--neon-emerald)' }} />
                    <span>Voice Synthesizer Active</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--neon-violet)' }} />
                    <span>Live Loss Visualizer</span>
                  </div>
                </div>

              </div>

              {/* Right Column: 3D Holographic Quantum Neural Core Canvas */}
              <div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
                <Network3DCanvas 
                  isSpeaking={isAgentSpeaking}
                  isListening={isAgentListening}
                  onTriggerVoice={() => {
                    setVoiceInitialQuery('');
                    setIsVoiceModalOpen(true);
                  }}
                />
              </div>

            </div>
          </div>
        </section>

        {/* SECTION 2: Interactive Data Lab & Live Model Playground */}
        <DataLabSection 
          externalPreset={dataLabPreset}
          onOpenAgent={() => {
            setVoiceInitialQuery('');
            setIsVoiceModalOpen(true);
          }}
        />

        {/* SECTION 3: Live Pipeline Telemetry & Drift Simulation */}
        <LivePipeline />

        {/* SECTION 4: What Data Scientists Do in Industry (Market Reality & Salaries) */}
        <IndustryWorkSection onSelectDomain={handleSelectDomain} />

        {/* SECTION 5: Real-World 12 Portfolio Projects */}
        <ProjectsSection 
          onOpenProject={(p) => setSelectedProject(p)}
          activeFilter={activeProjectFilter}
          onClearFilter={() => setActiveProjectFilter('All')}
          onLaunchVoiceWithProject={handleLaunchVoiceWithProject}
        />

        {/* SECTION 6: 16-Skill Mastery Graph */}
        <SkillPathSection onOpenProject={(p) => setSelectedProject(p)} />

        {/* SECTION 7: 15 Industry Tools & Platforms */}
        <ToolsSection onOpenProject={(p) => setSelectedProject(p)} />

        {/* SECTION 8: How AI Autonomous Agents Augment Developers */}
        <AiInDevSection onOpenAgent={() => {
          setVoiceInitialQuery('');
          setIsVoiceModalOpen(true);
        }} />

      </main>

      {/* Deep Project Milestone & Code Modal */}
      <ProjectModal
        project={selectedProject}
        completedSteps={completedSteps}
        onToggleStep={toggleStep}
        onClose={() => setSelectedProject(null)}
        onLaunchAgent={(p) => {
          setSelectedProject(null);
          handleLaunchVoiceWithProject(p);
        }}
      />

      {/* Autonomous Voice Assistant Modal */}
      <VoiceAssistantModal
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
        initialQuery={voiceInitialQuery}
        onSendToLab={handleSendToDataLab}
        onSpeakingStateChange={setIsAgentSpeaking}
        onListeningStateChange={setIsAgentListening}
      />

      {/* Floating Bottom-Right Quick Voice Trigger Button */}
      <div style={{ position: 'fixed', bottom: '28px', right: '28px', zIndex: 60 }}>
        <button
          onClick={() => {
            setVoiceInitialQuery('');
            setIsVoiceModalOpen(true);
          }}
          style={{
            width: '58px',
            height: '58px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #00F0FF 0%, #9D4EDD 100%)',
            border: '2px solid rgba(255, 255, 255, 0.4)',
            color: '#040814',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 0 35px rgba(0, 240, 255, 0.6)',
            transition: 'transform 0.25s ease'
          }}
          className="agent-aura-pulse"
          title="Engage Data Science Voice Agent"
        >
          {isAgentSpeaking ? (
            <Volume2 size={24} />
          ) : isAgentListening ? (
            <Mic size={24} />
          ) : (
            <Sparkles size={24} />
          )}
        </button>
      </div>

      {/* Futuristic Cyber Footer */}
      <footer style={{
        background: '#070A14',
        borderTop: '1px solid rgba(0, 240, 255, 0.15)',
        padding: '45px 0 35px',
        position: 'relative',
        zIndex: 2
      }}>
        <div className="container" style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '20px',
          fontSize: '0.88rem',
          color: '#94A3B8'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <Cpu size={16} color="var(--neon-cyan)" />
              <strong style={{ color: '#FFFFFF', fontFamily: 'var(--font-display)', fontSize: '1.15rem' }}>
                DataSensei AI
              </strong>
            </div>
            <div style={{ fontSize: '0.78rem', color: '#64748B' }}>
              Autonomous Data Science Agent & Quantum 3D Intelligence Lab
            </div>
          </div>

          <div style={{ display: 'flex', gap: '22px', fontFamily: 'var(--font-mono)', fontSize: '0.82rem' }}>
            <span>12 Flagship Benchmarks</span>
            <span>•</span>
            <span>16 Production Skills</span>
            <span>•</span>
            <span>15 Modern AI Tools</span>
          </div>

          <div>
            <button
              onClick={() => {
                setVoiceInitialQuery('');
                setIsVoiceModalOpen(true);
              }}
              style={{
                background: 'rgba(0, 240, 255, 0.12)',
                border: '1px solid var(--neon-cyan)',
                color: 'var(--neon-cyan)',
                borderRadius: '8px',
                padding: '8px 16px',
                cursor: 'pointer',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Mic size={14} />
              <span>Engage Voice Agent →</span>
            </button>
          </div>
        </div>

        <div className="container" style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.04)', display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#475569' }}>
          <span>© 2026 DataSensei AI. Powered by WebGL Three.js, PyTorch & Web Speech API.</span>
          <span>Latency: 8.4ms | Models Deployed: 1,420+ | Drift Guard: Active</span>
        </div>
      </footer>

    </div>
  );
}
