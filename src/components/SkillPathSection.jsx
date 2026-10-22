import React, { useState } from 'react';
import { SKILLS_16, PROJECTS_12 } from '../data/projectsData';
import { Sparkles, Terminal, CheckCircle2, ArrowRight, Layers } from 'lucide-react';

export default function SkillPathSection({ onOpenProject }) {
  const [selectedSkillIndex, setSelectedSkillIndex] = useState(0);

  const skillDetailedGuide = [
    {
      problem: 'Beginners start coding before framing the business question, resulting in models that solve the wrong metric.',
      how: 'Structure problems via hypothesis-driven framing: define the business cost matrix, primary metric (AUC vs RMSE), and benchmark baseline.',
      snippet: '# Framing Baseline\nbaseline_accuracy = y_train.value_counts(normalize=True).max()\nprint(f"Majority Baseline: {baseline_accuracy:.2%}")'
    },
    {
      problem: 'Real enterprise data has nulls represented as "N/A", -999, spaces, or silent corruptions that break estimators.',
      how: 'Audit missing patterns (MCAR, MAR, MNAR). Apply SimpleImputer for median/mode, or IterativeImputer for multivariate correlation.',
      snippet: 'from sklearn.impute import SimpleImputer\nimputer = SimpleImputer(strategy="median")\nX_clean = imputer.fit_transform(X_train)'
    },
    {
      problem: 'Raw production feeds arrive as nested JSON, ISO timestamps, and dirty strings requiring normalization.',
      how: 'Build reproducible ColumnTransformer pipelines to encode high-cardinality categories and scale skewed numericals without leakage.',
      snippet: 'from sklearn.compose import ColumnTransformer\npreprocessor = ColumnTransformer(transformers=[\n    ("num", StandardScaler(), numeric_cols),\n    ("cat", OneHotEncoder(handle_unknown="ignore"), cat_cols)\n])'
    },
    {
      problem: 'Failing to inspect single-feature distributions and pairwise correlations hides multicollinearity and extreme outliers.',
      how: 'Compute skewness, boxplots for IQR outliers, and Pearson/Spearman correlation matrices before modeling.',
      snippet: 'sns.heatmap(df.corr(numeric_only=True), annot=True, cmap="coolwarm")\nplt.title("Bivariate Correlation Matrix")'
    },
    {
      problem: 'Default chart designs with 10+ clashing colors and cluttered axes fail to convey insight to stakeholders.',
      how: 'Use minimal visual encodings: declutter gridlines, order bar categories by magnitude, and highlight key takeaways in terracotta.',
      snippet: '# Clean sorted visual\ndf.groupby("category")["sales"].mean().sort_values().plot(kind="barh", color="#00F0FF")'
    },
    {
      problem: 'Data scientists often deliver raw accuracy numbers without answering: "How much revenue or time did we save?"',
      how: 'Frame findings into an Executive Briefing Memo: Problem -> Quantified Impact -> Proposed Intervention -> Projected ROI.',
      snippet: '# Translating Churn Lift into Dollars\nprevented_churners = 420\navg_ltv = 1200\nsavings = prevented_churners * avg_ltv * 0.35 # 35% retention uplift\nprint(f"Projected Annual Savings: ${savings:,.0f}")'
    },
    {
      problem: 'CSV files collapse when working with millions of rows; companies store relational tables in PostgreSQL/Snowflake.',
      how: 'Master relational schema modeling: Primary Keys, Foreign Keys, indexing on query filters, and normalized tables.',
      snippet: 'SELECT customer_id, COUNT(order_id) as total_orders, SUM(amount) as ltv\nFROM orders\nWHERE order_date >= NOW() - INTERVAL \'90 days\'\nGROUP BY customer_id\nHAVING COUNT(order_id) > 3;'
    },
    {
      problem: 'Unintended Cartesian products (cross joins) or incorrect NULL handling in outer joins produce duplicate or corrupted totals.',
      how: 'Validate join cardinalities (1:1, 1:Many) and enforce non-null constraints before aggregating.',
      snippet: 'SELECT u.email, o.order_id, o.amount\nFROM users u\nLEFT JOIN orders o ON u.id = o.user_id\nWHERE o.order_id IS NULL; -- Detect cold users'
    },
    {
      problem: 'Traditional GROUP BY collapses rows, making it impossible to compute running moving averages or customer cohort ranks.',
      how: 'Leverage window functions: ROW_NUMBER(), DENSE_RANK(), LAG(), and SUM() OVER (PARTITION BY ... ORDER BY ...).',
      snippet: 'SELECT user_id, order_date, amount,\n       AVG(amount) OVER (PARTITION BY user_id ORDER BY order_date ROWS BETWEEN 2 PRECEDING AND CURRENT ROW) as rolling_3_orders\nFROM orders;'
    },
    {
      problem: 'Writing clumsy nested loops that take hours to run and fail with TypeError due to weak typing awareness.',
      how: 'Write idiomatic Python: list comprehensions, generator expressions, custom functions with type hints, and exception handling.',
      snippet: 'def parse_numeric(val: str) -> float | None:\n    try:\n        return float(val.replace("$", "").replace(",", ""))\n    except (ValueError, AttributeError):\n        return None'
    },
    {
      problem: 'Iterating row-by-row with `.iterrows()` is hundreds of times slower than vectorized C-compiled operations.',
      how: 'Vectorize operations with Pandas & NumPy: broadcasting, boolean masks, and `.transform()` for grouped calculations.',
      snippet: '# Fast vectorized calculation\ndf["churn_risk_score"] = np.where(df["tenure"] < 6, df["monthly_charges"] * 1.5, df["monthly_charges"] * 0.8)'
    },
    {
      problem: 'Default matplotlib graphs require dozens of boilerplate lines and lack modern publication-ready styles.',
      how: 'Combine Seaborn facet grids with Matplotlib figure axes for customized distribution overlays (KDE + histogram).',
      snippet: 'sns.displot(data=df, x="total_charges", hue="churn", kind="kde", fill=True, palette=["#101626", "#00F0FF"])'
    },
    {
      problem: 'Declaring a product change "better" based on a 1% conversion bump that is purely random chance noise.',
      how: 'Perform two-tailed Z-tests and Student t-tests, verify p-values against significance threshold (α = 0.05), and check statistical power.',
      snippet: 'from scipy.stats import proportions_ztest\nstat, pval = proportions_ztest(count=[120, 155], nobs=[1000, 1000])\nprint(f"P-value: {pval:.4f} -> {\'Significant\' if pval < 0.05 else \'Not Significant\'}")'
    },
    {
      problem: 'Ignoring Bayes theorem and class priors results in the "base rate fallacy" in medical diagnosis and fraud detection.',
      how: 'Model conditional probabilities P(Fraud|Alert), evaluate Precision-Recall curves, and set classification thresholds accordingly.',
      snippet: 'from sklearn.metrics import precision_recall_curve\nprec, rec, thresholds = precision_recall_curve(y_true, y_probs)\n# Choose threshold that maximizes F-beta score'
    },
    {
      problem: 'Ad-hoc data dumps become obsolete within a week; business stakeholders need self-serve metrics.',
      how: 'Design automated KPI dashboards tracking MRR, CAC payback, retention cohorts, and funnel drop-offs.',
      snippet: '# Monthly Recurring Revenue (MRR) Cohort Matrix\ncohort_matrix = df.pivot_table(index="cohort_month", columns="period_num", values="retained", aggfunc="mean")'
    },
    {
      problem: 'In multi-tenant SaaS, accidentally leaking one tenant\'s financial records to another causes massive legal liability.',
      how: 'Implement PostgreSQL Row Level Security (RLS) policies enforcing `auth.uid() = tenant_id` at the database engine level.',
      snippet: 'ALTER TABLE customer_invoices ENABLE ROW LEVEL SECURITY;\n\nCREATE POLICY tenant_isolation_policy ON customer_invoices\nFOR ALL USING (tenant_id = current_setting(\'app.current_tenant\'));'
    }
  ];

  const currentSkill = SKILLS_16[selectedSkillIndex] || SKILLS_16[0];
  const currentGuide = skillDetailedGuide[selectedSkillIndex] || skillDetailedGuide[0];

  const connectedProjects = PROJECTS_12.filter(p => p.skills.includes(currentSkill.name));

  return (
    <section id="skill-path" style={{ padding: '80px 0 60px', position: 'relative' }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ marginBottom: '36px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span className="pill-tag" style={{ background: 'rgba(0, 245, 160, 0.12)', borderColor: 'var(--neon-emerald)', color: 'var(--neon-emerald)' }}>
              <Layers size={13} />
              <span>16 CURATED COMPETENCY MODULES</span>
            </span>
          </div>

          <h2 className="section-title">
            Industry Skill Mastery Graph
          </h2>
          <p className="section-subtitle">
            Inspect the 16 core competencies. Tap each skill node to view real-world failure modes, production solutions, and implementation code.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.1fr 1.35fr',
          gap: '36px',
          alignItems: 'start'
        }}>
          {/* Left: Vertical Timeline */}
          <div style={{
            position: 'relative',
            paddingLeft: '32px'
          }}>
            {/* The Vertical Glowing Line */}
            <div style={{
              position: 'absolute',
              left: '7px',
              top: '12px',
              bottom: '12px',
              width: '2px',
              background: 'linear-gradient(to bottom, var(--neon-cyan), var(--neon-violet), var(--neon-emerald))',
              boxShadow: '0 0 10px rgba(0, 240, 255, 0.4)'
            }} />

            {/* List of 16 Skills */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {SKILLS_16.map((skill, idx) => {
                const isSelected = idx === selectedSkillIndex;
                return (
                  <div
                    key={skill.id}
                    onClick={() => setSelectedSkillIndex(idx)}
                    style={{
                      position: 'relative',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      padding: '4px 0'
                    }}
                  >
                    {/* The Node Dot */}
                    <div style={{
                      position: 'absolute',
                      left: '-32px',
                      width: '16px',
                      height: '16px',
                      borderRadius: '50%',
                      background: isSelected ? 'var(--neon-cyan)' : '#1E293B',
                      border: isSelected ? '3px solid #06080F' : '2px solid rgba(255, 255, 255, 0.2)',
                      boxShadow: isSelected ? '0 0 15px var(--neon-cyan)' : 'none',
                      transition: 'all 0.25s ease'
                    }} />

                    {/* Skill Text */}
                    <span style={{
                      fontSize: '0.96rem',
                      fontWeight: isSelected ? 700 : 500,
                      color: isSelected ? 'var(--neon-cyan)' : '#94A3B8',
                      transition: 'color 0.2s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}>
                      <span>{skill.name}</span>
                      {isSelected && (
                        <span style={{ fontSize: '0.7rem', color: 'var(--neon-emerald)', fontFamily: 'var(--font-mono)' }}>
                          [INSPECTING]
                        </span>
                      )}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Detailed "What problem it solves and how" Card */}
          <div className="cyber-card" style={{ padding: '28px', position: 'sticky', top: '90px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <span className="pill-tag" style={{ background: 'rgba(0, 240, 255, 0.12)', color: 'var(--neon-cyan)', borderColor: 'var(--neon-cyan)', fontWeight: 600 }}>
                Skill #{selectedSkillIndex + 1} • {currentSkill.category}
              </span>
              <span style={{ fontSize: '0.78rem', color: '#64748B', fontFamily: 'var(--font-mono)' }}>
                SELECT ANY NODE
              </span>
            </div>

            <h3 style={{
              fontSize: '1.45rem',
              fontWeight: 800,
              color: '#FFFFFF',
              marginBottom: '18px'
            }}>
              {currentSkill.name}
            </h3>

            {/* Problem Section */}
            <div style={{ marginBottom: '18px' }}>
              <div style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--neon-coral)', marginBottom: '6px', fontFamily: 'var(--font-mono)' }}>
                CRITICAL FAILURE MODE SOLVED:
              </div>
              <p style={{ fontSize: '0.9rem', color: '#CBD5E1', lineHeight: '1.6', background: 'rgba(255, 94, 126, 0.05)', padding: '12px 14px', borderRadius: '10px', borderLeft: '3px solid var(--neon-coral)' }}>
                {currentGuide.problem}
              </p>
            </div>

            {/* How It Works */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--neon-emerald)', marginBottom: '6px', fontFamily: 'var(--font-mono)' }}>
                PRODUCTION METHODOLOGY:
              </div>
              <p style={{ fontSize: '0.9rem', color: '#B8C7DE', lineHeight: '1.6' }}>
                {currentGuide.how}
              </p>
            </div>

            {/* Code Snippet */}
            <div style={{ marginBottom: '22px' }}>
              <div style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--neon-cyan)', marginBottom: '6px', fontFamily: 'var(--font-mono)' }}>
                PRODUCTION CODE IMPLEMENTATION:
              </div>
              <div className="code-block-container">
                <pre style={{ margin: 0 }}>
                  <code>{currentGuide.snippet}</code>
                </pre>
              </div>
            </div>

            {/* Connected Projects */}
            {connectedProjects.length > 0 && (
              <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '18px' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '10px' }}>
                  Applied in Benchmark Projects:
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {connectedProjects.map(p => (
                    <button
                      key={p.id}
                      onClick={() => onOpenProject(p)}
                      className="pill-tag"
                      style={{ cursor: 'pointer', background: 'rgba(0, 240, 255, 0.08)', borderColor: 'var(--neon-cyan)', color: 'var(--neon-cyan)' }}
                    >
                      <span>{p.title}</span>
                      <ArrowRight size={12} />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
