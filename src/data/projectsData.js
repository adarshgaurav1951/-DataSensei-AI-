export const SKILLS_16 = [
  { id: 'ds-fund', name: 'Data Science Fundamentals', category: 'Foundations', icon: 'BookOpen', desc: 'Core principles of data analysis, scientific methods, and problem framing.' },
  { id: 'data-clean', name: 'Data Cleaning & Missing Values', category: 'Wrangling', icon: 'Filter', desc: 'Imputation strategies, outlier detection, data integrity verification.' },
  { id: 'data-extract', name: 'Data Extraction & Transformation', category: 'Wrangling', icon: 'RefreshCw', desc: 'ETL pipelines, schema parsing, normalization, feature scaling.' },
  { id: 'uni-bivariate', name: 'Univariate & Bivariate Analysis', category: 'Analysis', icon: 'BarChart2', desc: 'Distributions, correlation heatmaps, contingency tables, boxplots.' },
  { id: 'data-viz-tech', name: 'Data Visualization Techniques', category: 'Visualization', icon: 'PieChart', desc: 'Information hierarchy, chart selection, perceptual color palettes.' },
  { id: 'storytelling', name: 'Data Storytelling', category: 'Visualization', icon: 'MessageSquare', desc: 'Narrative synthesis, executive briefing memos, actionable insights.' },
  { id: 'sql-querying', name: 'Database Management & SQL', category: 'SQL & DB', icon: 'Database', desc: 'Relational design, DDL, DML, indexing, primary/foreign keys.' },
  { id: 'sql-joins', name: 'SQL Joins, Constraints, Modeling', category: 'SQL & DB', icon: 'Layers', desc: 'Inner/outer joins, entity relationship modeling, check constraints.' },
  { id: 'adv-sql', name: 'Advanced SQL (Window, CTEs)', category: 'SQL & DB', icon: 'Cpu', desc: 'ROW_NUMBER(), RANK(), cumulative sums, recursive CTEs.' },
  { id: 'python-basics', name: 'Python Basics', category: 'Foundations', icon: 'Terminal', desc: 'Control flow, OOP, functions, data structures, list comprehensions.' },
  { id: 'pandas-numpy', name: 'Data Manipulation (Pandas, NumPy)', category: 'Wrangling', icon: 'Grid', desc: 'Vectorized arrays, groupby aggregates, merging, pivot tables.' },
  { id: 'viz-libraries', name: 'Visualization (Matplotlib, Seaborn)', category: 'Visualization', icon: 'TrendingUp', desc: 'Custom plotting, subplots, distribution curves, pairplots.' },
  { id: 'stats-testing', name: 'Statistical Analysis & Hypothesis', category: 'Statistics', icon: 'Activity', desc: 'Null hypothesis, t-tests, ANOVA, Chi-square, significance.' },
  { id: 'prob-stats', name: 'Probability & Statistical Tests', category: 'Statistics', icon: 'CheckCircle2', desc: 'Bayes theorem, normal distributions, p-values, confidence intervals.' },
  { id: 'bi-reporting', name: 'Business Intelligence Reporting', category: 'BI', icon: 'Layout', desc: 'Interactive dashboards, KPI drill-downs, automated cohort trackers.' },
  { id: 'data-security', name: 'Data Security (Row Level Security)', category: 'Security', icon: 'ShieldCheck', desc: 'PostgreSQL RLS policies, multi-tenant isolation, role permissions.' }
];

export const TOOLS_15 = [
  { name: 'Python', tag: 'Core Language', badge: '#3776ab', icon: 'Code' },
  { name: 'Jupyter', tag: 'Notebook Environment', badge: '#f37626', icon: 'FileCode' },
  { name: 'TensorFlow', tag: 'Deep Learning', badge: '#ff6f00', icon: 'Box' },
  { name: 'Keras', tag: 'Neural Net API', badge: '#d00000', icon: 'Layers' },
  { name: 'NLTK', tag: 'NLP Toolset', badge: '#15803d', icon: 'Type' },
  { name: 'SciPy', tag: 'Scientific Algorithms', badge: '#0054a6', icon: 'Compass' },
  { name: 'Hugging Face', tag: 'Transformers & LLMs', badge: '#ffbd59', icon: 'Cpu' },
  { name: 'scikit-learn', tag: 'Machine Learning', badge: '#f89939', icon: 'Zap' },
  { name: 'Google Colab', tag: 'Cloud GPU Notebooks', badge: '#f9ab00', icon: 'Cloud' },
  { name: 'spaCy', tag: 'Production NLP', badge: '#09a3d5', icon: 'Sliders' },
  { name: 'XGBoost', tag: 'Gradient Boosting', badge: '#10b981', icon: 'FastForward' },
  { name: 'Seaborn', tag: 'Statistical Plots', badge: '#4c72b0', icon: 'BarChart' },
  { name: 'NumPy', tag: 'Vector Computations', badge: '#013243', icon: 'Hash' },
  { name: 'pandas', tag: 'Tabular Wrangling', badge: '#150458', icon: 'Table' },
  { name: 'PyTorch', tag: 'Deep Learning', badge: '#ee4c2c', icon: 'Flame' }
];

export const INDUSTRY_TRACKS = [
  'All Tracks',
  'Predictive Modeling',
  'BI & Analytics',
  'Forecasting',
  'NLP',
  'Computer Vision',
  'Data Engineering',
  'Experimentation',
  'MLOps'
];

export const PROJECTS_12 = [
  {
    id: 'churn-prediction',
    title: 'Customer Churn Prediction Engine',
    domain: 'Predictive Modeling',
    difficulty: 'Intermediate',
    estHours: '14 hrs',
    industryFreq: '89% (High)',
    datasetName: 'Telco Customer Churn',
    datasetSize: '7,043 rows • 21 features',
    summary: 'Predict which enterprise telecommunications customers will cancel their contracts within 30 days and calculate customer lifetime loss prevention.',
    skills: ['Data Cleaning & Missing Values', 'Univariate & Bivariate Analysis', 'Data Manipulation (Pandas, NumPy)', 'Visualization (Matplotlib, Seaborn)', 'Statistical Analysis & Hypothesis'],
    tools: ['Python', 'pandas', 'scikit-learn', 'XGBoost', 'Seaborn'],
    steps: [
      'Ingest & clean Telco dataset, imputing TotalCharges whitespace anomalies.',
      'Conduct EDA: contract length vs monthly charges correlation with churn rate.',
      'Build ColumnTransformer for one-hot encoding categorical & standardizing numeric columns.',
      'Train baseline Logistic Regression, Random Forest, and tuned XGBoost classifier.',
      'Evaluate with Precision-Recall AUC and calculate business ROI cost matrix.'
    ],
    sampleData: [
      { customerID: '7590-VHVEG', tenure: 1, Contract: 'Month-to-month', MonthlyCharges: 29.85, TotalCharges: 29.85, Churn: 'No' },
      { customerID: '5575-GNVDE', tenure: 34, Contract: 'One year', MonthlyCharges: 56.95, TotalCharges: 1889.50, Churn: 'No' },
      { customerID: '3668-QPYBK', tenure: 2, Contract: 'Month-to-month', MonthlyCharges: 53.85, TotalCharges: 108.15, Churn: 'Yes' },
      { customerID: '7795-CFOCW', tenure: 45, Contract: 'One year', MonthlyCharges: 42.30, TotalCharges: 1840.75, Churn: 'No' },
      { customerID: '9237-HQITU', tenure: 2, Contract: 'Month-to-month', MonthlyCharges: 70.70, TotalCharges: 151.65, Churn: 'Yes' }
    ],
    stats: { avgCharges: '$64.76', churnRate: '26.5%', topPredictor: 'Contract Type (Month-to-month)' }
  },
  {
    id: 'fraud-detection',
    title: 'Real-Time Credit Card Fraud Scoring',
    domain: 'Predictive Modeling',
    difficulty: 'Advanced',
    estHours: '18 hrs',
    industryFreq: '94% (Critical)',
    datasetName: 'Kaggle European Cardholders',
    datasetSize: '284,807 transactions • 31 features',
    summary: 'Handle extreme class imbalance (0.17% fraud rate) to detect fraudulent financial transactions using SMOTE, precision-recall optimization, and anomaly thresholds.',
    skills: ['Probability & Statistical Tests', 'Data Cleaning & Missing Values', 'Data Manipulation (Pandas, NumPy)', 'Statistical Analysis & Hypothesis'],
    tools: ['Python', 'pandas', 'NumPy', 'scikit-learn', 'XGBoost', 'SciPy'],
    steps: [
      'Load anonymized PCA features (V1-V28) and assess severe skew (492 frauds in 284k).',
      'Implement StratifiedKFold cross-validation to prevent optimistic data leaks.',
      'Apply SMOTE / class weighting inside pipeline to balance minority instances.',
      'Fine-tune XGBoost threshold to minimize false negatives without drowning support ops.',
      'Deploy inference scoring function simulating 50ms transaction latency.'
    ],
    sampleData: [
      { Time: 0.0, V1: -1.359, V2: -0.072, Amount: 149.62, Class: 0 },
      { Time: 0.0, V1: 1.191, V2: 0.266, Amount: 2.69, Class: 0 },
      { Time: 541.0, V1: -2.312, V2: 1.951, Amount: 0.00, Class: 1 },
      { Time: 623.0, V1: -3.043, V2: -3.157, Amount: 529.00, Class: 1 },
      { Time: 780.0, V1: 1.229, V2: 0.141, Amount: 4.99, Class: 0 }
    ],
    stats: { fraudRatio: '0.172%', targetMetric: 'PR-AUC (0.86+)', latencyTarget: '< 45ms' }
  },
  {
    id: 'sales-forecasting',
    title: 'Retail Demand & Inventory Forecasting',
    domain: 'Forecasting',
    difficulty: 'Intermediate',
    estHours: '15 hrs',
    industryFreq: '82% (High)',
    datasetName: 'Walmart Store Sales Historical',
    datasetSize: '143,570 weekly records • 45 stores',
    summary: 'Predict weekly department sales across retail chains taking into account seasonal holidays, fuel prices, CPI inflation, and markdowns.',
    skills: ['Advanced SQL (Window, CTEs)', 'Univariate & Bivariate Analysis', 'Data Manipulation (Pandas, NumPy)', 'Data Storytelling'],
    tools: ['Python', 'pandas', 'Matplotlib', 'SciPy', 'Jupyter'],
    steps: [
      'Perform time-series decomposition into Trend, Seasonality, and Residual components.',
      'Engineer lag features (t-1, t-4, t-52 weeks) and rolling moving averages.',
      'Account for holiday spikes using promotional event indicators.',
      'Train ARIMA / SARIMAX and evaluate against baseline Naive forecast (WMAE).',
      'Generate 12-week forward safety stock recommendations for warehouse managers.'
    ],
    sampleData: [
      { Store: 1, Dept: 1, Date: '2010-02-05', Weekly_Sales: 24924.50, IsHoliday: false },
      { Store: 1, Dept: 1, Date: '2010-02-12', Weekly_Sales: 46039.49, IsHoliday: true },
      { Store: 1, Dept: 1, Date: '2010-02-19', Weekly_Sales: 41595.55, IsHoliday: false },
      { Store: 1, Dept: 2, Date: '2010-02-05', Weekly_Sales: 50605.27, IsHoliday: false },
      { Store: 2, Dept: 1, Date: '2010-02-05', Weekly_Sales: 35034.06, IsHoliday: false }
    ],
    stats: { totalStores: 45, holidayUplift: '+42.8%', forecastMetric: 'WMAE < $1,400' }
  },
  {
    id: 'sentiment-analysis',
    title: 'Customer Review Sentiment & Aspect Extractor',
    domain: 'NLP',
    difficulty: 'Intermediate',
    estHours: '12 hrs',
    industryFreq: '78% (Growing)',
    datasetName: 'Amazon E-Commerce Reviews',
    datasetSize: '50,000 balanced reviews',
    summary: 'Extract customer sentiments and key topic aspects from e-commerce product feedback using tokenization, spaCy lemmas, and Hugging Face pre-trained transformers.',
    skills: ['Python Basics', 'Data Extraction & Transformation', 'Visualization (Matplotlib, Seaborn)', 'Data Storytelling'],
    tools: ['Python', 'NLTK', 'spaCy', 'Hugging Face', 'PyTorch'],
    steps: [
      'Clean raw text: strip HTML, lowercase, handle negation words ("not good" != "good").',
      'Perform Part-of-Speech (POS) tagging with spaCy to isolate product feature nouns.',
      'Generate TF-IDF embeddings and train benchmark Multinomial Naive Bayes model.',
      'Fine-tune DistilBERT sequence classification model using Hugging Face Trainer.',
      'Produce an interactive dashboard summarizing brand sentiment drivers.'
    ],
    sampleData: [
      { review_id: 'R100', rating: 5, aspect: 'Battery Life', text: 'Battery lasts over two full days of heavy usage, absolutely blown away!', sentiment: 'Positive' },
      { review_id: 'R101', rating: 1, aspect: 'Build Quality', text: 'Hinge broke after three days. Cheap plastic feel for a premium price tag.', sentiment: 'Negative' },
      { review_id: 'R102', rating: 3, aspect: 'Sound', text: 'Bass is punchy but vocals sound slightly muffled. Decent for podcasts.', sentiment: 'Neutral' },
      { review_id: 'R103', rating: 5, aspect: 'Ergonomics', text: 'Fits comfortably in my ears even during long marathon running sessions.', sentiment: 'Positive' }
    ],
    stats: { posRatio: '68%', neutralRatio: '14%', negRatio: '18%', transformerAcc: '93.4%' }
  },
  {
    id: 'medical-imaging',
    title: 'Chest X-Ray Pneumonia CNN Classifier',
    domain: 'Computer Vision',
    difficulty: 'Advanced',
    estHours: '20 hrs',
    industryFreq: '65% (High Barrier)',
    datasetName: 'Kaggle Pediatric Chest X-Ray',
    datasetSize: '5,863 JPEG Images • 2 Classes',
    summary: 'Build a deep convolutional neural network with transfer learning to diagnose bacterial vs viral pneumonia in radiograph scans, incorporating Grad-CAM explainability.',
    skills: ['Data Science Fundamentals', 'Probability & Statistical Tests', 'Data Visualization Techniques'],
    tools: ['Python', 'PyTorch', 'TensorFlow', 'Keras', 'Google Colab'],
    steps: [
      'Apply image normalization, resizing to 224x224, and data augmentation (random rotation/flips).',
      'Implement ResNet-50 / DenseNet-121 backbone with frozen feature extractors.',
      'Address class balance via focal loss or positive-weight binary cross-entropy.',
      'Train head layers with Adam optimizer and ReduceLROnPlateau learning scheduler.',
      'Overlay Grad-CAM heatmaps showing the lung regions driving model confidence.'
    ],
    sampleData: [
      { image_id: 'NORMAL-28503', category: 'Normal', confidence_target: 0.98, opacity_index: 'None' },
      { image_id: 'BACTERIA-1029', category: 'Pneumonia (Bacterial)', confidence_target: 0.95, opacity_index: 'Consolidation' },
      { image_id: 'VIRUS-48201', category: 'Pneumonia (Viral)', confidence_target: 0.89, opacity_index: 'Interstitial' }
    ],
    stats: { sensitivity: '95.2%', specificity: '91.8%', architecture: 'DenseNet-121' }
  },
  {
    id: 'hybrid-recsys',
    title: 'E-Commerce Hybrid Recommendation System',
    domain: 'Predictive Modeling',
    difficulty: 'Intermediate',
    estHours: '16 hrs',
    industryFreq: '85% (Ubiquitous)',
    datasetName: 'MovieLens & Clickstream Ratings',
    datasetSize: '100,000 explicit ratings • 9,000 items',
    summary: 'Design a personalized hybrid recommendation engine blending Collaborative Filtering (SVD matrix factorization) with Content-Based metadata filtering.',
    skills: ['Data Manipulation (Pandas, NumPy)', 'Probability & Statistical Tests', 'Data Extraction & Transformation'],
    tools: ['Python', 'NumPy', 'pandas', 'scikit-learn', 'SciPy'],
    steps: [
      'Build user-item interaction matrix and compute sparsity index (> 98%).',
      'Compute Cosine similarity between item metadata vectors (genres, tags, descriptions).',
      'Implement SVD (Singular Value Decomposition) to extract latent preference dimensions.',
      'Formulate weighted hybrid ranker addressing cold-start user issues.',
      'Evaluate with Top-K precision, recall, and NDCG (Normalized Discounted Cumulative Gain).'
    ],
    sampleData: [
      { userId: 1, movieId: 296, title: 'Pulp Fiction', rating: 5.0, genre: 'Crime|Drama' },
      { userId: 1, movieId: 356, title: 'Forrest Gump', rating: 4.5, genre: 'Comedy|Drama|Romance' },
      { userId: 2, movieId: 296, title: 'Pulp Fiction', rating: 4.0, genre: 'Crime|Drama' },
      { userId: 3, movieId: 593, title: 'Silence of the Lambs', rating: 5.0, genre: 'Crime|Horror|Thriller' }
    ],
    stats: { matrixSparsity: '98.3%', ndcgScore: '0.871', avgLatency: '< 15ms' }
  },
  {
    id: 'house-prices',
    title: 'Real Estate Price Valuation & Feature Eng',
    domain: 'Predictive Modeling',
    difficulty: 'Beginner',
    estHours: '10 hrs',
    industryFreq: '75% (Foundational)',
    datasetName: 'Ames Housing Dataset',
    datasetSize: '2,919 residential properties • 79 features',
    summary: 'Master end-to-end regression modeling: detect multicollinearity using VIF, transform skewed targets with Box-Cox, and apply regularized Ridge and Lasso estimators.',
    skills: ['Data Cleaning & Missing Values', 'Univariate & Bivariate Analysis', 'Data Manipulation (Pandas, NumPy)', 'Visualization (Matplotlib, Seaborn)'],
    tools: ['Python', 'pandas', 'NumPy', 'scikit-learn', 'Seaborn'],
    steps: [
      'Identify target skewness and apply log1p transformation on SalePrice.',
      'Detect multicollinear variables using Variance Inflation Factor (VIF > 5).',
      'Handle 19 columns with missing values using domain-informed imputers.',
      'Train ElasticNet, Lasso, and Ridge models with cross-validated alpha search.',
      'Interpret feature coefficients to explain neighborhood value drivers.'
    ],
    sampleData: [
      { Id: 1, MSSubClass: 60, LotArea: 8450, OverallQual: 7, YearBuilt: 2003, GrLivArea: 1710, SalePrice: 208500 },
      { Id: 2, MSSubClass: 20, LotArea: 9600, OverallQual: 6, YearBuilt: 1976, GrLivArea: 1262, SalePrice: 181500 },
      { Id: 3, MSSubClass: 60, LotArea: 11250, OverallQual: 7, YearBuilt: 2001, GrLivArea: 1786, SalePrice: 223500 }
    ],
    stats: { r2Score: '0.914', rmseLog: '0.118', topFeature: 'Overall Quality (1-10)' }
  },
  {
    id: 'ab-test-conversion',
    title: 'E-Commerce A/B Test & Conversion Analytics',
    domain: 'Experimentation',
    difficulty: 'Intermediate',
    estHours: '11 hrs',
    industryFreq: '90% (Industry Standard)',
    datasetName: 'New Landing Page Experiment',
    datasetSize: '45,200 unique visitors • 2 variants',
    summary: 'Conduct a rigorous statistical experiment: calculate sample size power, check for novelty bias, test hypothesis with two-proportion Z-test, and draft an executive recommendation.',
    skills: ['Statistical Analysis & Hypothesis', 'Probability & Statistical Tests', 'Data Storytelling', 'Data Manipulation (Pandas, NumPy)'],
    tools: ['Python', 'SciPy', 'pandas', 'Seaborn', 'Jupyter'],
    steps: [
      'Audit visitor logs for data anomalies: multiple group assignments, Simpson paradox.',
      'Verify minimum detectable effect (MDE) and power calculation ($\beta = 0.20, \alpha = 0.05$).',
      'Compute pooled conversion rates and standard error between Control and Treatment.',
      'Calculate Z-statistic and two-tailed p-value; determine if lift is statistically significant.',
      'Synthesize an executive decision memo outlining projected revenue increase.'
    ],
    sampleData: [
      { user_id: 851104, timestamp: '2026-03-01 18:02:15', group: 'control', landing_page: 'old_page', converted: 0 },
      { user_id: 804228, timestamp: '2026-03-01 20:15:42', group: 'control', landing_page: 'old_page', converted: 0 },
      { user_id: 661590, timestamp: '2026-03-01 03:19:33', group: 'treatment', landing_page: 'new_page', converted: 1 },
      { user_id: 853541, timestamp: '2026-03-01 02:44:20', group: 'treatment', landing_page: 'new_page', converted: 1 }
    ],
    stats: { controlConv: '11.95%', treatmentConv: '13.12%', lift: '+9.79%', pValue: '0.018 (< 0.05)' }
  },
  {
    id: 'bi-dashboard-rls',
    title: 'Executive BI Dashboard with Supabase RLS',
    domain: 'BI & Analytics',
    difficulty: 'Intermediate',
    estHours: '14 hrs',
    industryFreq: '88% (Enterprise Core)',
    datasetName: 'Multi-Tenant SaaS Metrics',
    datasetSize: '50,000 subscription events',
    summary: 'Build a multi-tenant business intelligence dashboard using advanced PostgreSQL window functions, CTEs, and Row Level Security (RLS) policies guaranteeing tenant privacy.',
    skills: ['Database Management & SQL', 'SQL Joins, Constraints, Modeling', 'Advanced SQL (Window, CTEs)', 'Data Security (Row Level Security)', 'Business Intelligence Reporting'],
    tools: ['Python', 'pandas', 'Jupyter'],
    steps: [
      'Write recursive CTEs to calculate monthly recurring revenue (MRR) and churn rate.',
      'Apply window functions (SUM OVER, LAG) to measure customer cohort expansion.',
      'Design PostgreSQL Row Level Security (RLS) policies enforcing `auth.uid() = tenant_id`.',
      'Expose secure RESTful view endpoints to frontend analytics charts.',
      'Implement role-based access for Executives, Regional Managers, and Account Execs.'
    ],
    sampleData: [
      { tenant_id: 'org_acme', month: '2026-01', new_mrr: 12400, expansion_mrr: 1800, churn_mrr: 600, net_mrr: 13600 },
      { tenant_id: 'org_acme', month: '2026-02', new_mrr: 15200, expansion_mrr: 2100, churn_mrr: 450, net_mrr: 16850 },
      { tenant_id: 'org_beta', month: '2026-01', new_mrr: 8900, expansion_mrr: 600, churn_mrr: 900, net_mrr: 8600 }
    ],
    stats: { mrrGrowth: '+23.8% MoM', rlsStatus: 'Strict Active', tenantIsolation: '100% Guaranteed' }
  },
  {
    id: 'data-cleaning-pipeline',
    title: 'Automated Hospital Records Cleaning Pipeline',
    domain: 'Data Engineering',
    difficulty: 'Beginner',
    estHours: '9 hrs',
    industryFreq: '95% (Everyday Skill)',
    datasetName: 'Raw Dirty Public Healthcare Records',
    datasetSize: '15,000 dirty records',
    summary: 'Write a robust, modular Python pipeline that parses messy dates, fixes typos with fuzzy string matching, validates schemas, and flags medical billing anomalies.',
    skills: ['Data Cleaning & Missing Values', 'Data Extraction & Transformation', 'Python Basics', 'Data Manipulation (Pandas, NumPy)'],
    tools: ['Python', 'pandas', 'NumPy', 'Jupyter'],
    steps: [
      'Ingest unstandardized CSV files with mismatched encodings and date formats.',
      'Develop regex and schema validators to check for valid medical diagnostic codes (ICD-10).',
      'Detect and correct spelling variations using Levenshtein distance matching.',
      'Generate an automated JSON data quality health report with error distributions.',
      'Package cleaning routines into modular, testable Python classes.'
    ],
    sampleData: [
      { record_id: 101, patient_dob: '12/04/1984', admission_dt: '2026-01-15', icd_code: 'E11.9', bill_amt: '$1,420.50' },
      { record_id: 102, patient_dob: '1975-09-22', admission_dt: '15-Jan-2026', icd_code: 'I10', bill_amt: '2800' },
      { record_id: 103, patient_dob: 'N/A', admission_dt: '2026-01-18', icd_code: 'UNKNOWN', bill_amt: '$-50.00' }
    ],
    stats: { dirtyRecords: '34.2%', fixedAutomatically: '98.5%', schemaValidation: 'Passed' }
  },
  {
    id: 'predictive-maintenance',
    title: 'IoT Sensor Predictive Maintenance Engine',
    domain: 'MLOps',
    difficulty: 'Advanced',
    estHours: '19 hrs',
    industryFreq: '72% (High Value)',
    datasetName: 'NASA Turbofan Jet Engine Degradation',
    datasetSize: '20,631 engine cycles • 21 sensors',
    summary: 'Estimate the Remaining Useful Life (RUL) of aircraft jet engines using multivariate sensor telemetry, rolling window statistics, and gradient boosted survival regressors.',
    skills: ['Data Extraction & Transformation', 'Univariate & Bivariate Analysis', 'Data Manipulation (Pandas, NumPy)', 'Statistical Analysis & Hypothesis'],
    tools: ['Python', 'pandas', 'NumPy', 'XGBoost', 'scikit-learn', 'Matplotlib'],
    steps: [
      'Calculate Remaining Useful Life (RUL) target based on operational cycle termination.',
      'Compute rolling sensor aggregations (mean, standard deviation over 10-cycle windows).',
      'Filter out non-informative flatline sensor channels using variance thresholds.',
      'Train XGBoost Regressor optimizing for asymmetric loss (penalize late predictions heavier).',
      'Simulate an alert dashboard for airline maintenance ground crews.'
    ],
    sampleData: [
      { unit: 1, cycle: 1, sensor2: 641.82, sensor3: 1589.70, sensor4: 1400.60, RUL_target: 191 },
      { unit: 1, cycle: 100, sensor2: 642.45, sensor3: 1592.10, sensor4: 1408.20, RUL_target: 92 },
      { unit: 1, cycle: 192, sensor2: 643.90, sensor3: 1604.50, sensor4: 1422.80, RUL_target: 0 }
    ],
    stats: { rmseScore: '14.2 cycles', earlyDetection: '96.4%', costSavedSim: '$4.2M' }
  },
  {
    id: 'customer-segmentation',
    title: 'Customer Segmentation via RFM & K-Means',
    domain: 'BI & Analytics',
    difficulty: 'Beginner',
    estHours: '10 hrs',
    industryFreq: '88% (High Demand)',
    datasetName: 'Online Retail II Global Transactions',
    datasetSize: '541,909 transactions • 4,372 customers',
    summary: 'Segment enterprise customer bases by Recency, Frequency, and Monetary (RFM) value using K-Means clustering, silhouette optimization, and interactive persona profiling.',
    skills: ['Data Science Fundamentals', 'Univariate & Bivariate Analysis', 'Data Visualization Techniques', 'Data Storytelling'],
    tools: ['Python', 'pandas', 'scikit-learn', 'Seaborn', 'Matplotlib'],
    steps: [
      'Filter out cancellations and compute Recency (days since last purchase), Frequency, and Monetary spend.',
      'Log-transform skewed RFM metrics and scale using StandardScaler.',
      'Determine optimal cluster count (K) using Elbow Method and Silhouette Analysis.',
      'Profile cluster personas: "Champions", "At-Risk", "Potential Loyalists", "Dormant".',
      'Create executive marketing presentation with targeted retention campaigns per cluster.'
    ],
    sampleData: [
      { CustomerID: 17850, Recency_Days: 1, Frequency_Orders: 310, Monetary_Total: 5391.21, Segment: 'Champions' },
      { CustomerID: 13047, Recency_Days: 31, Frequency_Orders: 196, Monetary_Total: 3232.50, Segment: 'Potential Loyalists' },
      { CustomerID: 12583, Recency_Days: 120, Frequency_Orders: 12, Monetary_Total: 180.20, Segment: 'At-Risk' },
      { CustomerID: 15100, Recency_Days: 330, Frequency_Orders: 3, Monetary_Total: 45.00, Segment: 'Dormant' }
    ],
    stats: { optimalK: 4, silhouetteScore: '0.64', championsShare: '28% of Revenue' }
  }
];

export const AGENT_ROLES = [
  {
    id: 'plan-architect',
    title: 'Plan Architect',
    icon: 'Target',
    color: '#00f5d4',
    badge: 'Curriculum & Roadmap',
    description: 'Customizes step-by-step learning roadmaps matched to your exact experience level, weekly hours, and target career outcome.'
  },
  {
    id: 'socratic-debugger',
    title: 'Socratic Debugger',
    icon: 'HelpCircle',
    color: '#8b5cf6',
    badge: 'Progressive Hints',
    description: 'Refuses to spoon-feed answers. Guides you through 3 levels of hints (Concept -> Signature -> Targeted Code) so you truly learn.'
  },
  {
    id: 'code-reviewer',
    title: 'Code Review & Quality Coach',
    icon: 'CheckSquare',
    color: '#10b981',
    badge: 'Anti-Leakage & PEP8',
    description: 'Scans your pipeline for data leakage, unvectorized iterrows loops, improper random seeds, and production coding anti-patterns.'
  },
  {
    id: 'repetitive-helper',
    title: 'Repetitive Task Helper',
    icon: 'Zap',
    color: '#f59e0b',
    badge: 'Boilerplate & Schemas',
    description: 'Generates regex patterns, synthetic test rows, and starter SQL schemas so you stay focused on high-order data thinking.'
  },
  {
    id: 'feature-integrator',
    title: 'Feature & Tool Integrator',
    icon: 'Layers',
    color: '#38bdf8',
    badge: 'API & Environment',
    description: 'Explains how to hook up datasets, configure Colab/Jupyter runtimes, and integrate modern libraries like Hugging Face and XGBoost.'
  },
  {
    id: 'continuous-tracker',
    title: 'Continuous Learner & Tracker',
    icon: 'TrendingUp',
    color: '#ec4899',
    badge: 'Skill Mastery Radar',
    description: 'Tracks your completed project milestones, identifies skill gaps, and suggests reinforcement exercises.'
  }
];

export const SAMPLE_SOCRATIC_PROMPTS = [
  {
    title: 'High Accuracy but Low Recall in Churn',
    category: 'Predictive Modeling',
    question: 'My XGBoost churn model gets 98% accuracy on the test set, but recall is only 0.14. Why is this happening and how should I fix it?',
    hints: [
      {
        level: 'Level 1: The Conceptual Insight',
        content: 'Check the class distribution of your target variable. If 98% of customers do not churn, a dummy model predicting "No Churn" for 100% of cases will still boast 98% accuracy! Accuracy is misleading on imbalanced datasets.'
      },
      {
        level: 'Level 2: Library & Diagnostic Strategy',
        content: 'Compute `sklearn.metrics.classification_report(y_true, y_pred)` and examine Precision vs Recall. Look into `scale_pos_weight` in XGBoost, or evaluate using PR-AUC (Precision-Recall Curve) instead of ROC-AUC.'
      },
      {
        level: 'Level 3: Code Implementation',
        content: `pos_weight = (len(y_train) - sum(y_train)) / sum(y_train)
model = XGBClassifier(scale_pos_weight=pos_weight, eval_metric='aucpr')
model.fit(X_train, y_train)
# Tune threshold using precision_recall_curve`
      }
    ]
  },
  {
    title: 'Pandas SettingWithCopyWarning',
    category: 'Data Wrangling',
    question: 'When I do df[df["Age"] > 30]["Salary"] = 90000, Python throws a SettingWithCopyWarning. Why?',
    hints: [
      {
        level: 'Level 1: The Conceptual Insight',
        content: 'Pandas chained indexing `df[...] [...]` produces ambiguity: are you modifying a view (reference) or an independent copy in memory? Pandas warns you that the assignment might not persist.'
      },
      {
        level: 'Level 2: The Canonical Method',
        content: 'Always use `.loc[row_indexer, column_indexer]` for single-step label-based assignment, or explicitly call `.copy()` if you intend to create a new dataframe.'
      },
      {
        level: 'Level 3: Code Implementation',
        content: `# Correct single-step modification:
df.loc[df["Age"] > 30, "Salary"] = 90000

# Or if creating a subset:
over_30 = df[df["Age"] > 30].copy()
over_30["Salary"] = 90000`
      }
    ]
  },
  {
    title: 'Data Leakage in StandardScaler',
    category: 'ML Best Practices',
    question: 'Can I do scaler.fit_transform(df[features]) on the entire dataset before running train_test_split?',
    hints: [
      {
        level: 'Level 1: The Conceptual Insight',
        content: 'No! If you fit on the entire dataset, the test set mean and standard deviation contaminate your training phase. In production, unseen test data is unknown.'
      },
      {
        level: 'Level 2: Pipeline Solution',
        content: 'Split first using `train_test_split()`, then call `scaler.fit_transform(X_train)` and ONLY `scaler.transform(X_test)`. Even better: encapsulate inside an `sklearn.pipeline.Pipeline`.'
      },
      {
        level: 'Level 3: Code Implementation',
        content: `from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression

# Leakage-proof pipeline:
pipeline = make_pipeline(StandardScaler(), LogisticRegression())
pipeline.fit(X_train, y_train)
predictions = pipeline.predict(X_test)`
      }
    ]
  }
];
