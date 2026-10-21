import React, { useState } from 'react';
import { SKILLS_16, PROJECTS_12 } from '../data/projectsData';

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
      snippet: '# Clean sorted visual\ndf.groupby("category")["sales"].mean().sort_values().plot(kind="barh", color="#D9532F")'
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
      snippet: 'sns.displot(data=df, x="total_charges", hue="churn", kind="kde", fill=True, palette=["#3A322B", "#D9532F"])'
    },
    {
      problem: 'Declaring a product change "better" based on a 1% conversion bump that is purely random chance noise.',
      how: 'Perform two-tailed Z-tests and Student t-tests, verify p-values against significance threshold ($\alpha = 0.05$), and check statistical power.',
      snippet: 'from scipy.stats import proportions_ztest\nstat, pval = proportions_ztest(count=[120, 155], nobs=[1000, 1000])\nprint(f"P-value: {pval:.4f} -> {\'Significant\' if pval < 0.05 else \'Not Significant\'}")'
    },
    {
      problem: 'Ignoring Bayes theorem and class priors results in the "base rate fallacy" in medical diagnosis and fraud detection.',
      how: 'Model conditional probabilities $P(Fraud|Alert)$, evaluate Precision-Recall curves, and set classification thresholds accordingly.',
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
    <section id="skill-path" style={{ padding: '60px 0' }}>
      <div className="container">
        <h2 className="section-title">
          Skill path
        </h2>
        <p className="section-subtitle">
          The 16 skills from your roadmap. Tap one to see what problem it solves and how.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.1fr 1.3fr',
          gap: '36px',
          alignItems: 'start'
        }}>
          {/* Left: Vertical Dotted Line Timeline matching Image 4 */}
          <div style={{
            position: 'relative',
            paddingLeft: '32px'
          }}>
            {/* The Vertical Dotted Line */}
            <div style={{
              position: 'absolute',
              left: '7px',
              top: '12px',
              bottom: '12px',
              width: '2px',
              borderLeft: '2px dashed #D9532F'
            }} />

            {/* List of 16 Skills */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
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
                      alignItems: 'center'
                    }}
                  >
                    {/* The Node Dot */}
                    <div style={{
                      position: 'absolute',
                      left: '-32px',
                      width: '16px',
                      height: '16px',
                      borderRadius: '50%',
                      background: '#D9532F',
                      border: isSelected ? '3px solid #FAF6F0' : '2px solid #FAF6F0',
                      boxShadow: isSelected ? '0 0 0 3px #D9532F' : 'none',
                      transition: 'all 0.2s ease'
                    }} />

                    {/* Skill Text */}
                    <span style={{
                      fontSize: '0.98rem',
                      fontWeight: isSelected ? 700 : 500,
                      color: isSelected ? '#D9532F' : '#1B1714',
                      transition: 'color 0.15s ease'
                    }}>
                      {skill.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Detailed "What problem it solves and how" Card */}
          <div className="editorial-card" style={{ padding: '28px', position: 'sticky', top: '80px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span className="pill-tag" style={{ background: '#FBECE7', color: '#D9532F', borderColor: '#D9532F', fontWeight: 600 }}>
                Skill #{selectedSkillIndex + 1} • {currentSkill.category}
              </span>
              <span style={{ fontSize: '0.78rem', color: '#8A7E72' }}>
                Tap list to inspect another
              </span>
            </div>

            <h3 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.45rem',
              fontWeight: 700,
              color: '#1B1714',
              marginBottom: '18px'
            }}>
              {currentSkill.name}
            </h3>

            {/* Problem Section */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: '#D9532F', marginBottom: '4px' }}>
                What Problem It Solves:
              </div>
              <p style={{ fontSize: '0.9rem', color: '#3B332B', lineHeight: '1.55' }}>
                {currentGuide.problem}
              </p>
            </div>

            {/* How It Works */}
            <div style={{ marginBottom: '18px' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: '#1B1714', marginBottom: '4px' }}>
                How It Works in Production:
              </div>
              <p style={{ fontSize: '0.9rem', color: '#5A524A', lineHeight: '1.55' }}>
                {currentGuide.how}
              </p>
            </div>

            {/* Code Snippet */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: '#8A7E72', marginBottom: '6px' }}>
                Production Pattern:
              </div>
              <pre style={{
                background: '#F5EEE6',
                border: '1px solid #E5DCD2',
                borderRadius: '8px',
                padding: '12px 14px',
                fontSize: '0.82rem',
                color: '#1B1714',
                fontFamily: 'var(--font-mono)',
                overflowX: 'auto'
              }}>
                <code>{currentGuide.snippet}</code>
              </pre>
            </div>

            {/* Connected Projects */}
            {connectedProjects.length > 0 && (
              <div style={{ borderTop: '1px solid #ECE4DC', paddingTop: '16px' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#1B1714', marginBottom: '8px' }}>
                  Applied in Projects:
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {connectedProjects.map(p => (
                    <button
                      key={p.id}
                      onClick={() => onOpenProject(p)}
                      className="pill-tag"
                      style={{ cursor: 'pointer', background: '#FFFFFF', borderColor: '#D9532F', color: '#D9532F' }}
                    >
                      {p.title.split(' ')[0]} {p.title.split(' ')[1]} →
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
