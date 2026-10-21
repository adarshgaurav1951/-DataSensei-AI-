import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Send, 
  Target, 
  HelpCircle, 
  CheckSquare, 
  Zap, 
  CheckCircle,
  RefreshCw
} from 'lucide-react';
import { AGENT_ROLES, SAMPLE_SOCRATIC_PROMPTS } from '../data/projectsData';

export default function AiAgentDrawer({ isOpen, onClose, selectedProject, initialGoalPrompt }) {
  const [activeRole, setActiveRole] = useState('plan-architect');
  
  // Custom Plan State
  const [studentLevel, setStudentLevel] = useState('intermediate');
  const [weeklyHours, setWeeklyHours] = useState('6-10');
  const [careerGoal, setCareerGoal] = useState(initialGoalPrompt || 'predict which customers will leave');
  const [generatedPlan, setGeneratedPlan] = useState(null);
  const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);

  // Socratic Debugger State
  const [selectedPromptIdx, setSelectedPromptIdx] = useState(0);
  const [revealedHintLevel, setRevealedHintLevel] = useState(1);

  // Code Review State
  const [codeToReview, setCodeToReview] = useState(`import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split

df = pd.read_csv("data.csv")

# Scaling BEFORE splitting (data leakage!)
scaler = StandardScaler()
X_scaled = scaler.fit_transform(df.drop("target", axis=1))

X_train, X_test, y_train, y_test = train_test_split(X_scaled, df["target"], test_size=0.2)

# Unvectorized loop
for index, row in df.iterrows():
    pass
`);
  const [reviewResult, setReviewResult] = useState(null);
  const [isReviewing, setIsReviewing] = useState(false);

  // Chat state
  const [messages, setMessages] = useState([
    {
      role: 'agent',
      text: `Hello! I am your Socratic Data Science Mentor. Rather than dumping full code, I help you reason through statistics, clean datasets, avoid data leakage, and write production-grade models. What are you building today?`
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  if (!isOpen) return null;

  const handleGeneratePlan = () => {
    setIsGeneratingPlan(true);
    setTimeout(() => {
      setGeneratedPlan({
        project: careerGoal || selectedProject?.title || 'Customer Churn & Retention',
        timeline: studentLevel === 'beginner' ? '4 Weeks (Foundational)' : '3 Weeks (Targeted)',
        phases: [
          {
            phase: 'Phase 1: Exploratory Data Analysis & Clean Baseline',
            hours: '3-4 hrs',
            deliverable: 'Missing value audit, skewness report, majority-class baseline',
            tip: 'Avoid accuracy as the target metric when data is imbalanced.'
          },
          {
            phase: 'Phase 2: Leakage-Proof Feature Pipeline',
            hours: '4-5 hrs',
            deliverable: 'ColumnTransformer with OneHotEncoder + StandardScaler inside Pipeline',
            tip: 'Always call .fit() solely on X_train to prevent test data leakage.'
          },
          {
            phase: 'Phase 3: Model Tuning & Evaluation',
            hours: '4-5 hrs',
            deliverable: 'Benchmark Logistic Regression vs XGBoost with PR-AUC scoring',
            tip: 'Calculate the cost of False Negatives vs False Positives.'
          },
          {
            phase: 'Phase 4: Storytelling & Business Deck',
            hours: '2 hrs',
            deliverable: 'Executive memo quantifying estimated cost savings',
            tip: 'Translate model lift into projected annualized dollar savings.'
          }
        ]
      });
      setIsGeneratingPlan(false);
    }, 500);
  };

  const handleRunCodeReview = () => {
    setIsReviewing(true);
    setTimeout(() => {
      setReviewResult({
        score: '64/100 (Needs Improvement)',
        issues: [
          {
            severity: 'CRITICAL',
            title: 'Data Leakage Detected (Scaler fit on full dataset before train_test_split)',
            detail: 'You called fit_transform() on df before splitting! Test distribution contaminated training features.'
          },
          {
            severity: 'WARNING',
            title: 'Unvectorized Loop (.iterrows())',
            detail: 'Iterating row-by-row in Pandas is 100x slower. Use vectorized numpy/pandas operations.'
          }
        ],
        fixedSnippet: `# Leakage-Free Pipeline
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier

X = df.drop("target", axis=1)
y = df["target"]
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

pipeline = Pipeline([
    ('scaler', StandardScaler()),
    ('model', RandomForestClassifier(random_state=42))
])

pipeline.fit(X_train, y_train)`
      });
      setIsReviewing(false);
    }, 600);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userText = inputMessage;
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setInputMessage('');

    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          role: 'agent',
          text: `Great question. As your Socratic Mentor, let's think about this: What does the distribution of this feature look like before applying the model? Is it heavily skewed or imbalanced?`
        }
      ]);
    }, 450);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      right: 0,
      bottom: 0,
      width: '100%',
      maxWidth: '560px',
      zIndex: 70,
      background: '#FAF6F0',
      borderLeft: '1px solid #D6C8BA',
      boxShadow: '-10px 0 30px rgba(27, 23, 20, 0.15)',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Drawer Header */}
      <div style={{
        padding: '18px 24px',
        borderBottom: '1px solid #ECE4DC',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: '#FFFFFF'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            background: '#D9532F',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Sparkles size={17} />
          </div>
          <div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.18rem', color: '#1B1714' }}>
              Socratic Teaching Agent
            </h3>
            <span style={{ fontSize: '0.74rem', color: '#7D7368' }}>
              Pedagogical Mentor • No direct spoilers
            </span>
          </div>
        </div>

        <button
          onClick={onClose}
          style={{
            background: '#F4ECE1',
            border: 'none',
            borderRadius: '6px',
            padding: '6px',
            cursor: 'pointer',
            color: '#3B332B'
          }}
        >
          <X size={18} />
        </button>
      </div>

      {/* Role Tabs */}
      <div style={{
        display: 'flex',
        overflowX: 'auto',
        gap: '6px',
        padding: '10px 16px',
        background: '#F4ECE1',
        borderBottom: '1px solid #ECE4DC'
      }}>
        {[
          { id: 'plan-architect', label: 'Make My Plan' },
          { id: 'socratic-debugger', label: 'Socratic Hints' },
          { id: 'code-reviewer', label: 'Code Review' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveRole(tab.id)}
            style={{
              padding: '6px 14px',
              borderRadius: '6px',
              fontSize: '0.82rem',
              fontWeight: activeRole === tab.id ? 700 : 500,
              background: activeRole === tab.id ? '#FFFFFF' : 'transparent',
              color: activeRole === tab.id ? '#D9532F' : '#6B6258',
              border: activeRole === tab.id ? '1px solid #D6C8BA' : '1px solid transparent',
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Drawer Body */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '22px' }}>
        
        {/* ROLE 1: Plan Architect */}
        {activeRole === 'plan-architect' && (
          <div>
            <div className="editorial-card" style={{ padding: '18px', marginBottom: '18px' }}>
              <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#1B1714', display: 'block', marginBottom: '6px' }}>
                Describe your problem or learning goal:
              </label>
              <input
                type="text"
                className="clean-input"
                value={careerGoal}
                onChange={(e) => setCareerGoal(e.target.value)}
                placeholder="e.g. predict which customers will leave"
                style={{ width: '100%', marginBottom: '14px' }}
              />

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '14px' }}>
                <div>
                  <label style={{ fontSize: '0.78rem', color: '#6B6258', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
                    Level:
                  </label>
                  <select
                    value={studentLevel}
                    onChange={(e) => setStudentLevel(e.target.value)}
                    style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #D6C8BA', background: '#FFFFFF', fontSize: '0.82rem' }}
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.78rem', color: '#6B6258', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
                    Hours / week:
                  </label>
                  <select
                    value={weeklyHours}
                    onChange={(e) => setWeeklyHours(e.target.value)}
                    style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #D6C8BA', background: '#FFFFFF', fontSize: '0.82rem' }}
                  >
                    <option value="3-5">3 - 5 hours</option>
                    <option value="6-10">6 - 10 hours</option>
                    <option value="15+">15+ hours</option>
                  </select>
                </div>
              </div>

              <button
                onClick={handleGeneratePlan}
                disabled={isGeneratingPlan}
                className="btn-terracotta"
                style={{ width: '100%', padding: '10px', fontSize: '0.9rem' }}
              >
                {isGeneratingPlan ? 'Building Custom Plan...' : 'Generate My Learning Plan'}
              </button>
            </div>

            {/* Generated Plan */}
            {generatedPlan && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: '#1B1714' }}>
                    Your Custom Plan
                  </h4>
                  <span className="pill-tag" style={{ background: '#FBECE7', color: '#D9532F', borderColor: '#D9532F' }}>
                    {generatedPlan.timeline}
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {generatedPlan.phases.map((p, i) => (
                    <div key={i} className="editorial-card" style={{ padding: '14px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <strong style={{ fontSize: '0.86rem', color: '#1B1714' }}>{p.phase}</strong>
                        <span style={{ fontSize: '0.76rem', color: '#7D7368' }}>{p.hours}</span>
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#5A524A', marginBottom: '6px' }}>
                        Deliverable: {p.deliverable}
                      </div>
                      <div style={{ fontSize: '0.76rem', color: '#D9532F' }}>
                        💡 <em>Tip:</em> {p.tip}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ROLE 2: Socratic Hints */}
        {activeRole === 'socratic-debugger' && (
          <div>
            <div style={{ marginBottom: '14px' }}>
              <div style={{ fontSize: '0.84rem', fontWeight: 600, color: '#1B1714', marginBottom: '8px' }}>
                Select a real-world dilemma:
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {SAMPLE_SOCRATIC_PROMPTS.map((p, i) => (
                  <button
                    key={i}
                    onClick={() => { setSelectedPromptIdx(i); setRevealedHintLevel(1); }}
                    style={{
                      padding: '10px 14px',
                      borderRadius: '8px',
                      textAlign: 'left',
                      background: selectedPromptIdx === i ? '#FFFFFF' : '#F4ECE1',
                      border: selectedPromptIdx === i ? '1px solid #D9532F' : '1px solid transparent',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ fontSize: '0.74rem', color: '#D9532F', fontWeight: 700 }}>{p.category}</div>
                    <div style={{ fontSize: '0.84rem', color: '#1B1714', fontWeight: 600 }}>{p.title}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="editorial-card" style={{ padding: '16px', marginBottom: '14px' }}>
              <div style={{ fontSize: '0.86rem', color: '#1B1714', fontWeight: 600, marginBottom: '12px' }}>
                "{SAMPLE_SOCRATIC_PROMPTS[selectedPromptIdx].question}"
              </div>

              <div style={{ display: 'flex', gap: '6px', marginBottom: '12px' }}>
                {[1, 2, 3].map(lvl => (
                  <button
                    key={lvl}
                    onClick={() => setRevealedHintLevel(lvl)}
                    style={{
                      flex: 1,
                      padding: '6px',
                      borderRadius: '6px',
                      fontSize: '0.76rem',
                      fontWeight: 600,
                      background: revealedHintLevel >= lvl ? '#D9532F' : '#ECE4DC',
                      color: revealedHintLevel >= lvl ? '#FFFFFF' : '#6B6258',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    Level {lvl} {lvl === 1 ? 'Concept' : lvl === 2 ? 'Strategy' : 'Fix'}
                  </button>
                ))}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {SAMPLE_SOCRATIC_PROMPTS[selectedPromptIdx].hints.slice(0, revealedHintLevel).map((h, i) => (
                  <div key={i} style={{ background: '#FAF6F0', padding: '10px 12px', borderRadius: '6px', border: '1px solid #E5DCD2' }}>
                    <div style={{ fontSize: '0.74rem', fontWeight: 700, color: '#D9532F', marginBottom: '4px' }}>
                      {h.level}
                    </div>
                    <div style={{ fontSize: '0.82rem', color: '#3B332B', lineHeight: '1.5' }}>
                      {h.content}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ROLE 3: Code Review */}
        {activeRole === 'code-reviewer' && (
          <div>
            <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#1B1714', display: 'block', marginBottom: '6px' }}>
              Paste your model pipeline code:
            </label>
            <textarea
              rows={8}
              value={codeToReview}
              onChange={(e) => setCodeToReview(e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #D6C8BA',
                background: '#FFFFFF',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.78rem',
                color: '#1B1714',
                marginBottom: '10px'
              }}
            />
            <button onClick={handleRunCodeReview} disabled={isReviewing} className="btn-terracotta" style={{ width: '100%', padding: '10px', fontSize: '0.85rem', marginBottom: '14px' }}>
              {isReviewing ? 'Scanning for data leakage...' : 'Inspect Code Quality & Leakage'}
            </button>

            {reviewResult && (
              <div className="editorial-card" style={{ padding: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <strong>Health Score:</strong>
                  <span style={{ color: '#D9532F', fontWeight: 700 }}>{reviewResult.score}</span>
                </div>
                {reviewResult.issues.map((iss, idx) => (
                  <div key={idx} style={{ background: '#FBECE7', padding: '8px 10px', borderRadius: '6px', marginBottom: '8px', fontSize: '0.78rem' }}>
                    <strong style={{ color: '#D9532F' }}>[{iss.severity}] {iss.title}</strong>
                    <div style={{ color: '#5A524A' }}>{iss.detail}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Live Chat Stream */}
        <div style={{ borderTop: '1px solid #ECE4DC', paddingTop: '16px', marginTop: '16px' }}>
          <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#7D7368', marginBottom: '8px' }}>
            Live Socratic Dialogue:
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '12px' }}>
            {messages.map((m, i) => (
              <div
                key={i}
                style={{
                  alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '88%',
                  padding: '8px 12px',
                  borderRadius: '10px',
                  fontSize: '0.82rem',
                  background: m.role === 'user' ? '#D9532F' : '#FFFFFF',
                  color: m.role === 'user' ? '#FFFFFF' : '#1B1714',
                  border: m.role === 'user' ? 'none' : '1px solid #ECE4DC'
                }}
              >
                {m.text}
              </div>
            ))}
          </div>

          <form onSubmit={handleSendMessage} style={{ display: 'flex', gap: '8px' }}>
            <input
              type="text"
              placeholder="Ask mentor a question..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="clean-input"
              style={{ flex: 1, padding: '8px 12px', fontSize: '0.82rem' }}
            />
            <button type="submit" className="btn-terracotta" style={{ padding: '0 14px' }}>
              <Send size={14} />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
