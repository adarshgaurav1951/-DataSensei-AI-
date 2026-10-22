import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Send, 
  Sparkles, 
  Copy, 
  Check, 
  Play, 
  Cpu, 
  Database, 
  Layers, 
  Activity, 
  Zap, 
  CheckCircle2,
  Terminal,
  ArrowRight
} from 'lucide-react';
import { voiceService } from '../services/voiceAssistant';
import { solveDataScienceProblem, PRESET_CHALLENGES } from '../services/dataScienceBrain';

export default function VoiceAssistantModal({ 
  isOpen, 
  onClose, 
  initialQuery = '', 
  onSendToLab,
  onSpeakingStateChange,
  onListeningStateChange
}) {
  const [query, setQuery] = useState(initialQuery);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [autoSpeak, setAutoSpeak] = useState(true);
  const [activeSolution, setActiveSolution] = useState(null);
  const [audioBars, setAudioBars] = useState([4, 4, 4, 4, 4, 4]);
  const [copiedCode, setCopiedCode] = useState(false);
  const [isExecutingPython, setIsExecutingPython] = useState(false);
  const [pythonExecResult, setPythonExecResult] = useState(null);
  const [chatHistory, setChatHistory] = useState([
    {
      role: 'agent',
      text: 'Neural Data Science Agent initialized. I do not just chat; I solve real statistical distributions, engineer leakage-free pipelines, debug neural loss divergence, and deploy models. Speak your problem or type a challenge below.'
    }
  ]);

  const chatEndRef = useRef(null);

  // Sync initial query if passed
  useEffect(() => {
    if (initialQuery && isOpen) {
      setQuery(initialQuery);
      handleSolve(initialQuery);
    }
  }, [initialQuery, isOpen]);

  // Hook into voiceService events
  useEffect(() => {
    voiceService.onListeningChange = (listening) => {
      setIsListening(listening);
      if (onListeningStateChange) onListeningStateChange(listening);
    };

    voiceService.onSpeakingChange = (speaking) => {
      setIsSpeaking(speaking);
      if (onSpeakingStateChange) onSpeakingStateChange(speaking);
    };

    voiceService.onAudioPulse = (bars) => {
      setAudioBars(bars);
    };

    return () => {
      voiceService.stopSpeaking();
      voiceService.stopListening();
    };
  }, [onSpeakingStateChange, onListeningStateChange]);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory, activeSolution]);

  if (!isOpen) return null;

  const handleVoiceToggle = () => {
    if (isListening) {
      voiceService.stopListening();
    } else {
      voiceService.stopSpeaking();
      voiceService.startListening(({ text, isFinal }) => {
        setQuery(text);
        if (isFinal && text.trim().length > 3) {
          handleSolve(text);
        }
      });
    }
  };

  const handleSolve = (problemText) => {
    const textToSolve = problemText || query;
    if (!textToSolve.trim()) return;

    // Add user message to conversation
    const userMsg = { role: 'user', text: textToSolve };
    setChatHistory(prev => [...prev, userMsg]);

    // Agent solves problem
    const solution = solveDataScienceProblem(textToSolve);
    setActiveSolution(solution);

    // Add agent summary message
    const agentMsg = {
      role: 'agent',
      text: solution.spokenSummary,
      solution
    };
    setChatHistory(prev => [...prev, agentMsg]);
    setQuery('');

    // Speak response if autoSpeak is enabled
    if (autoSpeak) {
      voiceService.speak(solution.spokenSummary);
    }
  };

  const handleSpeakAgain = (text) => {
    if (isSpeaking) {
      voiceService.stopSpeaking();
    } else {
      voiceService.speak(text);
    }
  };

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleSendToDataLab = () => {
    if (activeSolution && onSendToLab) {
      onSendToLab(activeSolution);
      onClose();
    }
  };

  const handleRunInPython = async (code) => {
    setIsExecutingPython(true);
    setPythonExecResult(null);
    try {
      let res;
      try {
        res = await fetch('/api/python/execute', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code })
        });
      } catch (e) {
        res = await fetch('http://127.0.0.1:8000/api/python/execute', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code })
        });
      }
      const data = await res.json();
      setPythonExecResult(data);
    } catch (err) {
      setPythonExecResult({
        success: false,
        stderr: 'Python backend is currently connecting...',
        stdout: ''
      });
    } finally {
      setIsExecutingPython(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 100,
      background: 'rgba(4, 6, 12, 0.88)',
      backdropFilter: 'blur(20px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      {/* Modal Dialog Container */}
      <div style={{
        width: '100%',
        maxWidth: '1100px',
        height: '90vh',
        background: '#0B0E1B',
        border: '1px solid rgba(0, 240, 255, 0.25)',
        borderRadius: '24px',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8), 0 0 50px rgba(0, 240, 255, 0.15)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        position: 'relative'
      }}>

        {/* Modal Header */}
        <div style={{
          padding: '18px 26px',
          background: 'rgba(14, 18, 34, 0.95)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #00F0FF 0%, #9D4EDD 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 20px rgba(0, 240, 255, 0.4)'
            }}>
              <Cpu size={22} color="#040814" />
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FFFFFF' }}>
                  Data Science Neural Agent
                </h3>
                <span className="status-dot-active" />
                <span style={{ fontSize: '0.75rem', color: 'var(--neon-emerald)', fontFamily: 'var(--font-mono)' }}>
                  VOICE COGNITION READY
                </span>
              </div>
              <p style={{ fontSize: '0.82rem', color: '#94A3B8' }}>
                Full-domain data science problem solver: ML, Deep Learning, Statistics, Preprocessing & MLOps
              </p>
            </div>
          </div>

          {/* Right Controls: Auto-voice toggle & Close */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Audio Wave Visualizer when speaking */}
            {isSpeaking && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '3px',
                padding: '6px 14px',
                borderRadius: '999px',
                background: 'rgba(0, 240, 255, 0.12)',
                border: '1px solid rgba(0, 240, 255, 0.3)'
              }}>
                <Volume2 size={15} color="var(--neon-cyan)" />
                <div style={{ display: 'flex', alignItems: 'center', gap: '2px', height: '18px' }}>
                  {audioBars.map((h, i) => (
                    <div 
                      key={i} 
                      style={{
                        width: '3px',
                        height: `${h}px`,
                        background: 'var(--neon-cyan)',
                        borderRadius: '2px',
                        transition: 'height 0.1s ease'
                      }} 
                    />
                  ))}
                </div>
                <span style={{ fontSize: '0.74rem', color: 'var(--neon-cyan)', fontWeight: 600, fontFamily: 'var(--font-mono)' }}>
                  SPEAKING
                </span>
              </div>
            )}

            {/* Auto-Speak Toggle */}
            <button
              onClick={() => {
                if (isSpeaking) voiceService.stopSpeaking();
                setAutoSpeak(!autoSpeak);
              }}
              style={{
                background: autoSpeak ? 'rgba(0, 240, 255, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                border: `1px solid ${autoSpeak ? 'var(--neon-cyan)' : 'rgba(255, 255, 255, 0.1)'}`,
                color: autoSpeak ? 'var(--neon-cyan)' : '#64748B',
                borderRadius: '8px',
                padding: '8px 12px',
                fontSize: '0.8rem',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer'
              }}
            >
              {autoSpeak ? <Volume2 size={15} /> : <VolumeX size={15} />}
              <span>{autoSpeak ? 'Voice On' : 'Voice Muted'}</span>
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              style={{
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#94A3B8',
                borderRadius: '8px',
                padding: '8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Modal Body: Split 2-Column Interface (Conversation on Left, Dynamic Problem Solver Output on Right) */}
        <div style={{
          flex: 1,
          display: 'grid',
          gridTemplateColumns: activeSolution ? '1fr 1.35fr' : '1fr',
          overflow: 'hidden'
        }}>

          {/* Left Column: Chat Conversation + Voice Input */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            borderRight: activeSolution ? '1px solid rgba(255, 255, 255, 0.08)' : 'none',
            background: 'rgba(9, 12, 22, 0.6)'
          }}>

            {/* Instant Challenge Presets */}
            <div style={{
              padding: '14px 20px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
              background: 'rgba(15, 20, 36, 0.4)'
            }}>
              <div style={{ fontSize: '0.78rem', color: '#94A3B8', marginBottom: '8px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Sparkles size={13} color="var(--neon-cyan)" />
                <span>TRY A REAL-WORLD PROBLEM (VOICE OR TAP):</span>
              </div>
              <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
                {PRESET_CHALLENGES.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => {
                      setQuery(preset.query);
                      handleSolve(preset.query);
                    }}
                    style={{
                      whiteSpace: 'nowrap',
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(0, 240, 255, 0.15)',
                      borderRadius: '8px',
                      padding: '6px 12px',
                      fontSize: '0.76rem',
                      color: '#E2E8F0',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--neon-cyan)';
                      e.currentTarget.style.background = 'rgba(0, 240, 255, 0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(0, 240, 255, 0.15)';
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
                    }}
                  >
                    <Zap size={11} color="var(--neon-cyan)" />
                    <span>{preset.title}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Messages List */}
            <div style={{
              flex: 1,
              overflowY: 'auto',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}>
              {chatHistory.map((msg, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start',
                    maxWidth: '90%',
                    alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start'
                  }}
                >
                  <div style={{
                    padding: '12px 16px',
                    borderRadius: '16px',
                    background: msg.role === 'user' 
                      ? 'linear-gradient(135deg, rgba(0, 240, 255, 0.2) 0%, rgba(157, 78, 221, 0.25) 100%)' 
                      : 'rgba(20, 26, 44, 0.85)',
                    border: `1px solid ${msg.role === 'user' ? 'rgba(0, 240, 255, 0.4)' : 'rgba(255, 255, 255, 0.08)'}`,
                    color: '#F1F5F9',
                    fontSize: '0.92rem',
                    lineHeight: '1.5'
                  }}>
                    {msg.text}
                  </div>

                  {msg.role === 'agent' && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px' }}>
                      <button
                        onClick={() => handleSpeakAgain(msg.text)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#94A3B8',
                          fontSize: '0.75rem',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        <Volume2 size={13} color="var(--neon-cyan)" />
                        <span>{isSpeaking ? 'Pause Voice' : 'Listen again'}</span>
                      </button>
                    </div>
                  )}
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* Input Bar with Voice Mic & Submit */}
            <div style={{
              padding: '16px 20px',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              background: 'rgba(12, 16, 28, 0.95)',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              {/* Pulsing Voice Mic Button */}
              <button
                type="button"
                onClick={handleVoiceToggle}
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '12px',
                  background: isListening 
                    ? 'linear-gradient(135deg, #00F5A0 0%, #0099FF 100%)' 
                    : 'rgba(0, 240, 255, 0.12)',
                  border: `1px solid ${isListening ? 'var(--neon-emerald)' : 'rgba(0, 240, 255, 0.3)'}`,
                  color: isListening ? '#040814' : 'var(--neon-cyan)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: isListening ? '0 0 25px rgba(0, 245, 160, 0.7)' : 'none',
                  transition: 'all 0.25s ease'
                }}
                title={isListening ? 'Stop listening' : 'Start voice recognition'}
              >
                {isListening ? (
                  <Mic size={22} className="agent-aura-pulse" />
                ) : (
                  <Mic size={22} />
                )}
              </button>

              {/* Text Input */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSolve();
                }}
                style={{ flex: 1, display: 'flex', gap: '8px' }}
              >
                <input
                  type="text"
                  className="clean-input"
                  placeholder={isListening ? "Listening to your voice..." : "Ask any data science problem, e.g. fix class imbalance, optimize XGBoost..."}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  style={{ flex: 1, borderRadius: '12px', padding: '12px 16px' }}
                />
                <button
                  type="submit"
                  className="btn-neon-cyan"
                  style={{ padding: '12px 20px', borderRadius: '12px', minWidth: '80px' }}
                >
                  <Send size={16} />
                </button>
              </form>
            </div>

          </div>

          {/* Right Column: Full Technical Problem Solution & Code Execution */}
          {activeSolution && (
            <div style={{
              overflowY: 'auto',
              padding: '24px',
              background: '#070A14',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px'
            }}>
              {/* Category & Title */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span className="pill-tag" style={{ background: 'rgba(157, 78, 221, 0.15)', borderColor: 'var(--neon-violet)', color: '#D8B4FE' }}>
                    {activeSolution.category}
                  </span>
                  <span style={{ fontSize: '0.78rem', color: '#94A3B8', fontFamily: 'var(--font-mono)' }}>
                    AGENT COGNITION: VERIFIED
                  </span>
                </div>
                <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '10px' }}>
                  {activeSolution.title}
                </h2>
                <p style={{ fontSize: '0.9rem', color: '#B8C7DE', lineHeight: '1.6', background: 'rgba(255,255,255,0.03)', padding: '12px 16px', borderRadius: '12px', borderLeft: '3px solid var(--neon-cyan)' }}>
                  <strong>Diagnostic:</strong> {activeSolution.diagnosis}
                </p>
              </div>

              {/* Step-by-Step Strategic Plan */}
              <div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Layers size={16} color="var(--neon-emerald)" />
                  <span>Architectural Solution Steps</span>
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {activeSolution.strategy.map((step, idx) => (
                    <div 
                      key={idx}
                      style={{
                        padding: '10px 14px',
                        background: 'rgba(16, 22, 38, 0.7)',
                        border: '1px solid rgba(255, 255, 255, 0.06)',
                        borderRadius: '10px',
                        fontSize: '0.86rem',
                        color: '#E2E8F0',
                        lineHeight: '1.4'
                      }}
                    >
                      {step}
                    </div>
                  ))}
                </div>
              </div>

              {/* Projected Real-World Metrics Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '12px'
              }}>
                <div style={{ padding: '12px', background: 'rgba(20, 28, 48, 0.6)', borderRadius: '12px', border: '1px solid rgba(0, 240, 255, 0.15)' }}>
                  <div style={{ fontSize: '0.74rem', color: '#94A3B8' }}>{activeSolution.metrics.metric1Name}</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--neon-cyan)' }}>
                    {activeSolution.metrics.metric1Value}
                  </div>
                </div>
                <div style={{ padding: '12px', background: 'rgba(20, 28, 48, 0.6)', borderRadius: '12px', border: '1px solid rgba(0, 245, 160, 0.15)' }}>
                  <div style={{ fontSize: '0.74rem', color: '#94A3B8' }}>{activeSolution.metrics.metric2Name}</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--neon-emerald)' }}>
                    {activeSolution.metrics.metric2Value}
                  </div>
                </div>
                <div style={{ padding: '12px', background: 'rgba(20, 28, 48, 0.6)', borderRadius: '12px', border: '1px solid rgba(157, 78, 221, 0.15)' }}>
                  <div style={{ fontSize: '0.74rem', color: '#94A3B8' }}>{activeSolution.metrics.metric3Name}</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#D8B4FE' }}>
                    {activeSolution.metrics.metric3Value}
                  </div>
                </div>
              </div>

              {/* Code Implementation */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#FFFFFF', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Terminal size={16} color="var(--neon-cyan)" />
                    <span>Production Implementation Code</span>
                  </h4>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => handleRunInPython(activeSolution.code)}
                      disabled={isExecutingPython}
                      style={{
                        background: 'rgba(0, 245, 160, 0.12)',
                        border: '1px solid var(--neon-emerald)',
                        color: 'var(--neon-emerald)',
                        borderRadius: '6px',
                        padding: '4px 10px',
                        fontSize: '0.75rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        cursor: 'pointer'
                      }}
                    >
                      <Play size={12} />
                      <span>{isExecutingPython ? 'Running Python...' : 'Run in Python'}</span>
                    </button>

                    <button
                      onClick={() => handleCopyCode(activeSolution.code)}
                      style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        color: '#E2E8F0',
                        borderRadius: '6px',
                        padding: '4px 10px',
                        fontSize: '0.75rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        cursor: 'pointer'
                      }}
                    >
                      {copiedCode ? <Check size={13} color="var(--neon-emerald)" /> : <Copy size={13} />}
                      <span>{copiedCode ? 'Copied!' : 'Copy Code'}</span>
                    </button>
                  </div>
                </div>

                <div className="code-block-container" style={{ maxHeight: '280px' }}>
                  <pre style={{ margin: 0 }}>
                    <code>{activeSolution.code}</code>
                  </pre>
                </div>

                {/* Real Python Terminal Execution Output */}
                {pythonExecResult && (
                  <div style={{
                    marginTop: '10px',
                    background: '#03060E',
                    border: `1px solid ${pythonExecResult.success ? 'rgba(0, 245, 160, 0.35)' : 'rgba(255, 94, 126, 0.35)'}`,
                    borderRadius: '10px',
                    padding: '12px 14px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.8rem',
                    color: pythonExecResult.success ? '#E2E8F0' : 'var(--neon-coral)'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontSize: '0.72rem', color: '#64748B' }}>
                      <span>REAL CPYTHON EXECUTION OUTPUT:</span>
                      {pythonExecResult.execution_time_ms && (
                        <span>{pythonExecResult.execution_time_ms}ms</span>
                      )}
                    </div>
                    <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
                      {pythonExecResult.stdout || pythonExecResult.stderr || 'Code evaluated successfully with no stdout output.'}
                    </pre>
                  </div>
                )}
              </div>

              {/* Action: Send to Live Data Lab */}
              <div style={{
                background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.08) 0%, rgba(157, 78, 221, 0.12) 100%)',
                border: '1px solid rgba(0, 240, 255, 0.25)',
                borderRadius: '16px',
                padding: '16px 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '12px'
              }}>
                <div>
                  <div style={{ fontWeight: 700, color: '#FFFFFF', fontSize: '0.95rem', marginBottom: '3px' }}>
                    Execute Live in Interactive Sandbox
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#94A3B8' }}>
                    Sends {activeSolution.recommendedParams?.modelType} configuration to the Data Lab with {activeSolution.sandboxDataset} dataset.
                  </div>
                </div>

                <button
                  onClick={handleSendToDataLab}
                  className="btn-neon-cyan"
                  style={{ padding: '10px 18px', fontSize: '0.88rem' }}
                >
                  <span>Launch In Data Lab</span>
                  <ArrowRight size={15} />
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
