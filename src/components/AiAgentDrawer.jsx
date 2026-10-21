import React, { useState } from 'react';
import { 
  X, 
  Bot, 
  Sparkles, 
  Send, 
  Compass, 
  Target, 
  HelpCircle, 
  CheckSquare, 
  Zap, 
  Layers, 
  TrendingUp, 
  Code, 
  AlertTriangle,
  CheckCircle,
  ChevronRight,
  RefreshCw
} from 'lucide-react';
import { AGENT_ROLES, SAMPLE_SOCRATIC_PROMPTS } from '../data/projectsData';

export default function AiAgentDrawer({ isOpen, onClose, selectedProject }) {
  const [activeRole, setActiveRole] = useState('plan-architect');
  
  // Custom Plan State
  const [studentLevel, setStudentLevel] = useState('intermediate');
  const [weeklyHours, setWeeklyHours] = useState('6-10');
  const [careerGoal, setCareerGoal] = useState('portfolio');
  const [generatedPlan, setGeneratedPlan] = useState(null);
  const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);

  // Socratic Debugger State
  const [selectedPromptIdx, setSelectedPromptIdx] = useState(0);
  const [revealedHintLevel, setRevealedHintLevel] = useState(1); // 1, 2, or 3

  // Code Review State
  const [codeToReview, setCodeToReview] = useState(`import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier

# Load data
df = pd.read_csv("customers.csv")

# Scaling all features first
scaler = StandardScaler()
X_scaled = scaler.fit_transform(df.drop("churn", axis=1))

# Split afterwards
from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X_scaled, df["churn"], test_size=0.2)

# Training loop
for index, row in df.iterrows():
    pass # doing custom processing row-by-row
`);
  const [reviewResult, setReviewResult] = useState(null);
  const [isReviewing, setIsReviewing] = useState(false);

  // General Chat state
  const [messages, setMessages] = useState([
    {
      role: 'agent',
      text: `Hello! I am your Socratic Data Science Mentor. I'm here to guide you through ${selectedProject ? `"${selectedProject.title}"` : 'industry projects'}. I won't just dump code—I will help you reason through algorithms, clean messy data, and write production-grade code. What are you working on today?`
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  if (!isOpen) return null;

  const handleGeneratePlan = () => {
    setIsGeneratingPlan(true);
    setTimeout(() => {
      const proj = selectedProject || {
        title: 'Customer Churn Prediction Engine',
        domain: 'Predictive Modeling',
        estHours: '14 hrs'
      };
      
      setGeneratedPlan({
        project: proj.title,
        timeline: studentLevel === 'beginner' ? '4 Weeks (Paced)' : studentLevel === 'intermediate' ? '3 Weeks (Recommended)' : '10 Days (Fast-Track)',
        phases: [
          {
            phase: 'Phase 1: Problem Framing & Exploratory Data Analysis (EDA)',
            hours: '3-4 hrs',
            deliverable: 'Audited dataset, correlation matrix, missing value treatment',
            skills: ['Data Cleaning', 'Univariate & Bivariate Analysis'],
            tips: 'Focus on business metrics. In churn, false negatives cost 5x more than false positives.'
          },
          {
            phase: 'Phase 2: Feature Engineering & Anti-Leakage Pipelines',
            hours: '4-5 hrs',
            deliverable: 'ColumnTransformer pipeline with OneHotEncoder & RobustScaler',
            skills: ['Data Extraction & Transformation', 'Pandas & NumPy'],
            tips: 'Always wrap preprocessors in sklearn Pipeline to avoid test data contamination.'
          },
          {
            phase: 'Phase 3: Model Benchmarking & Statistical Evaluation',
            hours: '4-5 hrs',
            deliverable: 'Baseline Logistic Regression vs tuned XGBoost classifier',
            skills: ['Predictive Modeling', 'Statistical Hypothesis Testing'],
            tips: 'Optimize for PR-AUC rather than default accuracy due to class imbalance.'
          },
          {
            phase: 'Phase 4: Executive Storytelling & Portfolio Deck',
            hours: '2 hrs',
            deliverable: 'Interactive dashboard & executive summary memo',
            skills: ['Data Storytelling', 'BI Reporting'],
            tips: 'Translate model lift into projected annualized dollar savings for leadership.'
          }
        ]
      });
      setIsGeneratingPlan(false);
    }, 600);
  };

  const handleRunCodeReview = () => {
    setIsReviewing(true);
    setTimeout(() => {
      setReviewResult({
        score: '62/100 (Needs Improvement)',
        issues: [
          {
            severity: 'CRITICAL',
            title: 'Data Leakage Detected (StandardScaler fitted prior to train_test_split)',
            detail: 'You called `scaler.fit_transform()` on the full dataset before `train_test_split()`. The mean and variance of the test set have leaked into your training features! Fit scaler only on X_train.'
          },
          {
            severity: 'WARNING',
            title: 'Unvectorized Loop (.iterrows() performance anti-pattern)',
            detail: 'Using `for index, row in df.iterrows():` is 100x to 1000x slower in Pandas. Use vectorized operations or `.apply()` with Cython/NumPy backend.'
          },
          {
            severity: 'SUGGESTION',
            title: 'Missing Random Seed / Reproducibility',
            detail: 'Always pass `random_state=42` to `train_test_split()` and estimators so experiments can be verified.'
          }
        ],
        fixedSnippet: `from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier

# 1. Split FIRST before any transformations
X = df.drop("churn", axis=1)
y = df["churn"]
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 2. Encapsulate in Pipeline to eliminate data leakage
pipeline = Pipeline([
    ('scaler', StandardScaler()),
    ('rf', RandomForestClassifier(random_state=42))
])

pipeline.fit(X_train, y_train)
print(f"Test Score: {pipeline.score(X_test, y_test):.3f}")`
      });
      setIsReviewing(false);
    }, 700);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userText = inputMessage;
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setInputMessage('');

    // Pedagogical Socratic response simulation
    setTimeout(() => {
      let agentReply = '';
      const lower = userText.toLowerCase();

      if (lower.includes('code') && (lower.includes('give me') || lower.includes('write'))) {
        agentReply = `I see you're looking for the complete code, but as your Teaching Agent, my job is to make sure you master the concept. Let's break it down: What is the very first step in your data pipeline? Are your features numerical or categorical?`;
      } else if (lower.includes('churn') || lower.includes('metric')) {
        agentReply = `Great question on churn metrics! Remember: In customer churn, is it worse to predict someone will churn when they won't (false alarm), or miss someone who actually cancels (lost revenue)? Which metric—Precision or Recall—directly measures that?`;
      } else if (lower.includes('sql') || lower.includes('rls')) {
        agentReply = `For SQL and Row Level Security, think about tenant boundaries: In Supabase/PostgreSQL, we use \`CREATE POLICY tenant_isolation ON table FOR ALL USING (tenant_id = auth.jwt()->>'tenant_id')\`. What happens if this policy is bypassed in serverless functions?`;
      } else {
        agentReply = `That is an interesting challenge. Let's reason through the mathematical and data mechanics first. What does the distribution of this feature look like before we apply the transformation?`;
      }

      setMessages(prev => [...prev, { role: 'agent', text: agentReply }]);
    }, 500);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      right: 0,
      bottom: 0,
      width: '100%',
      maxWidth: '620px',
      zIndex: 60,
      background: 'rgba(8, 12, 22, 0.96)',
      backdropFilter: 'blur(20px)',
      borderLeft: '1px solid rgba(0, 245, 212, 0.25)',
      boxShadow: '-10px 0 50px rgba(0, 0, 0, 0.8)',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Drawer Header */}
      <div style={{
        padding: '20px 24px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'rgba(12, 17, 34, 0.8)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #00f5d4 0%, #8b5cf6 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#050711'
          }}>
            <Bot size={22} strokeWidth={2.4} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff' }}>
                Teaching AI Agent
              </span>
              <span className="badge badge-cyan" style={{ fontSize: '0.65rem', padding: '1px 6px' }}>
                SOCRATIC MODE
              </span>
            </div>
            <div style={{ fontSize: '0.74rem', color: '#94a3b8' }}>
              {selectedProject ? `Context: ${selectedProject.title}` : 'Universal Data Science Mentor'}
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '8px',
            padding: '6px',
            color: '#94a3b8',
            cursor: 'pointer'
          }}
        >
          <X size={18} />
        </button>
      </div>

      {/* Role Selector Tabs (The 6 Roles) */}
      <div style={{
        display: 'flex',
        overflowX: 'auto',
        gap: '6px',
        padding: '10px 16px',
        background: 'rgba(6, 9, 18, 0.8)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.06)'
      }}>
        {AGENT_ROLES.map((r) => {
          const isActive = activeRole === r.id;
          return (
            <button
              key={r.id}
              onClick={() => setActiveRole(r.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                borderRadius: '8px',
                fontSize: '0.76rem',
                fontWeight: isActive ? 700 : 500,
                whiteSpace: 'nowrap',
                background: isActive ? 'rgba(0, 245, 212, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                color: isActive ? '#00f5d4' : '#94a3b8',
                border: isActive ? '1px solid rgba(0, 245, 212, 0.3)' : '1px solid rgba(255, 255, 255, 0.05)',
                cursor: 'pointer'
              }}
            >
              <span>{r.title}</span>
            </button>
          );
        })}
      </div>

      {/* Main Drawer Body */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px' }}>
        
        {/* ROLE 1: Plan Architect */}
        {activeRole === 'plan-architect' && (
          <div>
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <Target size={18} color="#00f5d4" />
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff' }}>
                  Custom Learning Plan Generator
                </h3>
              </div>
              <p style={{ fontSize: '0.82rem', color: '#94a3b8' }}>
                Tell the agent your background and schedule to get a personalized milestone curriculum.
              </p>
            </div>

            <div className="glass-panel" style={{ padding: '16px', marginBottom: '18px' }}>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ fontSize: '0.78rem', color: '#cbd5e1', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                  Your Current Experience Level:
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
                  {['beginner', 'intermediate', 'advanced'].map((lvl) => (
                    <button
                      key={lvl}
                      onClick={() => setStudentLevel(lvl)}
                      style={{
                        padding: '8px',
                        borderRadius: '6px',
                        fontSize: '0.78rem',
                        textTransform: 'capitalize',
                        fontWeight: studentLevel === lvl ? 700 : 500,
                        background: studentLevel === lvl ? 'rgba(0, 245, 212, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                        color: studentLevel === lvl ? '#00f5d4' : '#94a3b8',
                        border: studentLevel === lvl ? '1px solid #00f5d4' : '1px solid rgba(255, 255, 255, 0.08)',
                        cursor: 'pointer'
                      }}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: '12px' }}>
                <label style={{ fontSize: '0.78rem', color: '#cbd5e1', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                  Weekly Commitment:
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
                  {['3-5 hrs', '6-10 hrs', '15+ hrs'].map((hrs) => (
                    <button
                      key={hrs}
                      onClick={() => setWeeklyHours(hrs)}
                      style={{
                        padding: '8px',
                        borderRadius: '6px',
                        fontSize: '0.78rem',
                        fontWeight: weeklyHours === hrs ? 700 : 500,
                        background: weeklyHours === hrs ? 'rgba(139, 92, 246, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                        color: weeklyHours === hrs ? '#c084fc' : '#94a3b8',
                        border: weeklyHours === hrs ? '1px solid #8b5cf6' : '1px solid rgba(255, 255, 255, 0.08)',
                        cursor: 'pointer'
                      }}
                    >
                      {hrs}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ fontSize: '0.78rem', color: '#cbd5e1', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                  Primary Objective:
                </label>
                <select
                  value={careerGoal}
                  onChange={(e) => setCareerGoal(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    background: '#0d1322',
                    color: '#fff',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    fontSize: '0.82rem'
                  }}
                >
                  <option value="portfolio">Production Portfolio Project for Hiring Managers</option>
                  <option value="upskilling">Bridge specific SQL & MLOps gaps from Analyst role</option>
                  <option value="academic">STEM Academic Project & Statistical Rigor</option>
                </select>
              </div>

              <button
                onClick={handleGeneratePlan}
                disabled={isGeneratingPlan}
                className="btn-primary"
                style={{ width: '100%', padding: '10px', fontSize: '0.85rem' }}
              >
                {isGeneratingPlan ? <RefreshCw className="animate-spin" size={16} /> : <Sparkles size={16} />}
                <span>{isGeneratingPlan ? 'Synthesizing Custom Plan...' : 'Generate AI Learning Roadmap'}</span>
              </button>
            </div>

            {/* Generated Plan Output */}
            {generatedPlan && (
              <div style={{ animation: 'fadeIn 0.3s ease' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#00f5d4' }}>
                    Custom Roadmap: {generatedPlan.project}
                  </h4>
                  <span className="badge badge-purple">{generatedPlan.timeline}</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {generatedPlan.phases.map((p, idx) => (
                    <div key={idx} className="glass-panel" style={{ padding: '12px 14px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <strong style={{ fontSize: '0.82rem', color: '#e2e8f0' }}>{p.phase}</strong>
                        <span style={{ fontSize: '0.74rem', color: '#38bdf8' }}>{p.hours}</span>
                      </div>
                      <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginBottom: '6px' }}>
                        <strong>Deliverable:</strong> {p.deliverable}
                      </div>
                      <div style={{ fontSize: '0.74rem', color: '#fbbf24', background: 'rgba(245, 158, 11, 0.1)', padding: '4px 8px', borderRadius: '4px' }}>
                        💡 <em>Mentor Note:</em> {p.tips}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ROLE 2: Socratic Debugger */}
        {activeRole === 'socratic-debugger' && (
          <div>
            <div style={{ marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <HelpCircle size={18} color="#8b5cf6" />
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff' }}>
                  Socratic Progressive Hints
                </h3>
              </div>
              <p style={{ fontSize: '0.82rem', color: '#94a3b8' }}>
                Instead of giving the direct answer, reveal hints progressively to build problem-solving muscle.
              </p>
            </div>

            {/* Prompt Selector */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
              {SAMPLE_SOCRATIC_PROMPTS.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedPromptIdx(idx);
                    setRevealedHintLevel(1);
                  }}
                  style={{
                    padding: '10px 14px',
                    borderRadius: '8px',
                    textAlign: 'left',
                    background: selectedPromptIdx === idx ? 'rgba(139, 92, 246, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                    border: selectedPromptIdx === idx ? '1px solid #8b5cf6' : '1px solid rgba(255, 255, 255, 0.06)',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ fontSize: '0.72rem', color: '#a78bfa', fontWeight: 600 }}>{prompt.category}</div>
                  <div style={{ fontSize: '0.82rem', color: '#e2e8f0', fontWeight: 600 }}>{prompt.title}</div>
                </button>
              ))}
            </div>

            {/* Active Question Box */}
            <div className="glass-panel" style={{ padding: '16px', marginBottom: '16px' }}>
              <div style={{ fontSize: '0.76rem', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '4px' }}>
                Student Challenge:
              </div>
              <div style={{ fontSize: '0.88rem', color: '#fff', fontWeight: 600, marginBottom: '14px' }}>
                "{SAMPLE_SOCRATIC_PROMPTS[selectedPromptIdx].question}"
              </div>

              {/* Progressive Hint Buttons */}
              <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                {[1, 2, 3].map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setRevealedHintLevel(lvl)}
                    style={{
                      flex: 1,
                      padding: '8px',
                      borderRadius: '6px',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      background: revealedHintLevel >= lvl ? 'rgba(0, 245, 212, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                      color: revealedHintLevel >= lvl ? '#00f5d4' : '#64748b',
                      border: revealedHintLevel >= lvl ? '1px solid rgba(0, 245, 212, 0.4)' : '1px solid rgba(255, 255, 255, 0.08)',
                      cursor: 'pointer'
                    }}
                  >
                    Level {lvl} {lvl === 1 ? 'Concept' : lvl === 2 ? 'Strategy' : 'Code Fix'}
                  </button>
                ))}
              </div>

              {/* Hints Stack */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {SAMPLE_SOCRATIC_PROMPTS[selectedPromptIdx].hints.slice(0, revealedHintLevel).map((h, i) => (
                  <div key={i} style={{
                    background: 'rgba(11, 16, 32, 0.7)',
                    border: '1px solid rgba(0, 245, 212, 0.2)',
                    padding: '12px 14px',
                    borderRadius: '8px'
                  }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#00f5d4', marginBottom: '4px' }}>
                      {h.level}
                    </div>
                    {i === 2 ? (
                      <pre className="code-snippet" style={{ margin: 0, fontSize: '0.8rem' }}>
                        <code>{h.content}</code>
                      </pre>
                    ) : (
                      <p style={{ fontSize: '0.82rem', color: '#cbd5e1', lineHeight: '1.5' }}>
                        {h.content}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ROLE 3: Code Review & Quality Coach */}
        {activeRole === 'code-reviewer' && (
          <div>
            <div style={{ marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <CheckSquare size={18} color="#10b981" />
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff' }}>
                  Code Review & Leakage Coach
                </h3>
              </div>
              <p style={{ fontSize: '0.82rem', color: '#94a3b8' }}>
                Scans your pipeline for data leakage, unvectorized iterrows, and ML anti-patterns.
              </p>
            </div>

            <div style={{ marginBottom: '12px' }}>
              <label style={{ fontSize: '0.78rem', color: '#cbd5e1', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                Paste Your Pipeline Code:
              </label>
              <textarea
                value={codeToReview}
                onChange={(e) => setCodeToReview(e.target.value)}
                rows={9}
                style={{
                  width: '100%',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8rem',
                  padding: '12px',
                  borderRadius: '8px',
                  background: '#070b16',
                  color: '#38bdf8',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  outline: 'none',
                  resize: 'vertical'
                }}
              />
            </div>

            <button
              onClick={handleRunCodeReview}
              disabled={isReviewing}
              className="btn-primary"
              style={{ width: '100%', padding: '10px', fontSize: '0.85rem', marginBottom: '18px' }}
            >
              {isReviewing ? <RefreshCw className="animate-spin" size={16} /> : <CheckCircle size={16} />}
              <span>{isReviewing ? 'Analyzing Architecture & Leakage...' : 'Review My Code Quality'}</span>
            </button>

            {reviewResult && (
              <div className="glass-panel" style={{ padding: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fff' }}>Code Health Score:</span>
                  <span className="badge badge-amber">{reviewResult.score}</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
                  {reviewResult.issues.map((iss, idx) => (
                    <div key={idx} style={{
                      background: iss.severity === 'CRITICAL' ? 'rgba(244, 63, 94, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                      border: iss.severity === 'CRITICAL' ? '1px solid rgba(244, 63, 94, 0.3)' : '1px solid rgba(245, 158, 11, 0.3)',
                      padding: '10px 12px',
                      borderRadius: '8px'
                    }}>
                      <div style={{
                        fontSize: '0.74rem',
                        fontWeight: 700,
                        color: iss.severity === 'CRITICAL' ? '#f43f5e' : '#fbbf24',
                        marginBottom: '2px'
                      }}>
                        [{iss.severity}] {iss.title}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: '#cbd5e1' }}>
                        {iss.detail}
                      </div>
                    </div>
                  ))}
                </div>

                <div>
                  <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#10b981', marginBottom: '6px' }}>
                    Mentor's Production-Ready Refactor:
                  </div>
                  <pre className="code-snippet" style={{ fontSize: '0.78rem', margin: 0 }}>
                    <code>{reviewResult.fixedSnippet}</code>
                  </pre>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ROLES 4, 5, 6: Interactive Guides */}
        {(activeRole === 'repetitive-helper' || activeRole === 'feature-integrator' || activeRole === 'continuous-tracker') && (
          <div className="glass-panel" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <Zap size={22} color="#f59e0b" />
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff' }}>
                {AGENT_ROLES.find(r => r.id === activeRole)?.title}
              </h3>
            </div>
            <p style={{ fontSize: '0.86rem', color: '#cbd5e1', marginBottom: '16px', lineHeight: '1.6' }}>
              {AGENT_ROLES.find(r => r.id === activeRole)?.description}
            </p>

            <div style={{ background: 'rgba(0, 0, 0, 0.4)', padding: '14px', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
              <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#38bdf8', marginBottom: '8px' }}>
                Interactive Scenarios Available:
              </div>
              <ul style={{ fontSize: '0.82rem', color: '#94a3b8', paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <li>Auto-generate regex validators for telephone & email cleaning</li>
                <li>One-click Supabase Row Level Security policy templates</li>
                <li>Hugging Face DistilBERT fine-tuning hyperparameter grids</li>
                <li>Personalized skill gap analysis mapped to the 16 core competencies</li>
              </ul>
            </div>
          </div>
        )}

        {/* Live Pedagogical Chat Stream */}
        <div style={{ marginTop: '24px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '18px' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#94a3b8', marginBottom: '10px' }}>
            Live Socratic Mentorship Stream:
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '14px' }}>
            {messages.map((m, idx) => (
              <div
                key={idx}
                style={{
                  alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '88%',
                  padding: '10px 14px',
                  borderRadius: '12px',
                  fontSize: '0.82rem',
                  background: m.role === 'user' ? 'linear-gradient(135deg, #8b5cf6, #6366f1)' : 'rgba(16, 23, 41, 0.85)',
                  color: m.role === 'user' ? '#fff' : '#e2e8f0',
                  border: m.role === 'user' ? 'none' : '1px solid rgba(0, 245, 212, 0.2)'
                }}
              >
                {m.text}
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <form onSubmit={handleSendMessage} style={{ display: 'flex', gap: '8px' }}>
            <input
              type="text"
              placeholder="Ask the AI mentor a question about your project..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              style={{
                flex: 1,
                padding: '10px 14px',
                borderRadius: '8px',
                background: '#0d1322',
                color: '#fff',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                fontSize: '0.82rem',
                outline: 'none'
              }}
            />
            <button type="submit" className="btn-primary" style={{ padding: '0 16px' }}>
              <Send size={15} />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
