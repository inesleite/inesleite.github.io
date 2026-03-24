'use client'

import { useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import { Moon, Sun, ChevronDown, Mail, Linkedin, Github, BookOpen, ExternalLink } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

// ─── Types ────────────────────────────────────────────────────────────────────

type RoleEntry = {
  title: string
  period: string
  bullets: string[]
  stack: string[]
}

type Company = {
  id: string
  name: string
  period: string
  roles: RoleEntry[]
}

type Project = {
  id: string
  domain: string
  title: string
  method: string
  description: string
  methodology: string[]
  featured?: boolean
  githubUrl?: string
  notebookUrl?: string
}

type Colors = {
  bg: string
  text: string
  muted: string
  border: string
  rowHover: string
  expandedBg: string
  accent: string
}

type SummaryProp = ReactNode | ((hovered: boolean) => ReactNode)

// ─── Data ─────────────────────────────────────────────────────────────────────

const companies: Company[] = [
  {
    id: 'flixbus',
    name: 'FlixBus',
    period: 'Dec 2023 – Present',
    roles: [
      {
        title: 'Senior Data Scientist',
        period: 'Sep 2025 – Present',
        bullets: [
          'Designed Flix\'s geo-based incrementality measurement framework — running causal experiments across US, Canada, Europe, and LATAM to separate true media-driven growth from organic demand.',
          'Integrated experiment results into attribution systems as calibration signals, making media mix decisions more grounded in evidence than modeled assumptions.',
        ],
        stack: ['Python', 'Causal Inference', 'Geo Experiments', 'Attribution', 'MMM'],
      },
      {
        title: 'Data Scientist',
        period: 'Dec 2023 – Sep 2025',
        bullets: [
          'Built CRM models and customer analytics systems — including an email volume optimizer that balanced engagement uplift against unsubscribe risk.',
          'Designed a LLM pipeline using LangChain to surface structured insights from app review data, feeding directly into product planning.',
        ],
        stack: ['Python', 'LightGBM', 'LangChain', 'CRM', 'NLP', 'SQL'],
      },
    ],
  },
  {
    id: 'onfido',
    name: 'Onfido',
    period: 'Sep 2022 – Nov 2023',
    roles: [
      {
        title: 'Data Scientist',
        period: 'Sep 2022 – Nov 2023',
        bullets: [
          'Built an NLP-based anomaly detection system to flag unusual patterns in identity verification data, reducing false positives in production.',
          'Automated rule extraction from historical data, turning manual analyst workflows into reproducible pipelines with measurable accuracy gains.',
        ],
        stack: ['Python', 'NLP', 'Anomaly Detection', 'Scikit-learn', 'SQL'],
      },
    ],
  },
  {
    id: 'farfetch',
    name: 'Farfetch',
    period: 'Sep 2019 – Aug 2022',
    roles: [
      {
        title: 'Data Scientist',
        period: 'Jun 2021 – Aug 2022',
        bullets: [
          'Developed a multi-horizon forecasting framework covering LTV, churn, and GMV — used across teams to align planning with modeled demand.',
          'Turned raw customer review text into reusable NLP features, shared across marketing and ML use cases.',
        ],
        stack: ['Python', 'LightGBM', 'Time Series', 'NLP', 'SQL'],
      },
      {
        title: 'Junior Data Scientist',
        period: 'Apr 2020 – Jun 2021',
        bullets: [
          'Trained and deployed a product categorization model based on global customs codes, replacing a largely manual classification process.',
          'Modeled payment provider performance across markets to optimize routing decisions for conversion and order value.',
        ],
        stack: ['Python', 'Scikit-learn', 'SQL', 'GCP'],
      },
      {
        title: 'Data Scientist, Intern',
        period: 'Sep 2019 – Apr 2020',
        bullets: [
          'Engineered NLP and numerical features for a delivery date estimation system, and supported its rollout on GCP including training and inference pipelines.',
        ],
        stack: ['Python', 'NLP', 'GCP'],
      },
    ],
  },
]

const projects: Project[] = [
  {
    id: 'prioritize-lockers',
    domain: 'Optimization',
    title: 'Prioritize Lockers',
    method: 'Linear Programming',
    featured: true,
    description: 'Which lockers are actually worth visiting today? Given locker demand, vehicle capacity, and delivery SLAs, a linear program selects the optimal subset each day — making the decision systematically rather than by gut.',
    methodology: [
      'Formulated as a linear program using PuLP, with hard constraints on vehicle capacity and delivery speed SLAs.',
      'Locker demand signals and geographic distance weights inform the objective function.',
      'Sensitivity analysis on capacity bounds to quantify trade-offs between cost and service level.',
    ],
    githubUrl: 'https://github.com/inesleite/prioritize-lockers',
    notebookUrl: 'https://nbviewer.org/github/inesleite/prioritize-lockers/blob/main/solution.ipynb',
  },
  {
    id: 'mta-ridership',
    domain: 'Forecasting',
    title: 'MTA Ridership Forecast',
    method: 'Time Series',
    featured: true,
    description: 'Predicting how many people will be at a subway station and when — so the MTA can staff it right. A time series challenge using NYC subway data, forecasting ridership at hourly resolution across stations while accounting for seasonality, events, and day-of-week patterns.',
    methodology: [
      'LightGBM with lag and rolling features; Prophet for interpretable seasonal decomposition.',
      'Temporal cross-validation with walk-forward splits to reflect real deployment constraints.',
      'MAPE and RMSE as primary metrics; residual analysis per station to diagnose systematic bias.',
    ],
    githubUrl: 'https://github.com/inesleite/mta-ridership',
    notebookUrl: 'https://nbviewer.org/github/inesleite/mta-ridership/blob/main/solution.ipynb',
  },
  {
    id: 'rossmann-uplift',
    domain: 'Causal',
    title: 'Rossmann Uplift Model',
    method: 'Causal Inference',
    featured: true,
    description: 'Not just "do promotions work?" but "for which stores do they actually work?" Rossmann runs thousands of retail locations — the challenge is finding which ones see genuine lift from a promotion versus those that would have performed the same regardless.',
    methodology: [
      'T-learner (two-model) approach: separate classifiers for treatment and control groups using Scikit-learn.',
      'Individual treatment effect (ITE) estimation to rank stores by expected uplift.',
      'SHAP for decomposing which store features drive promotion sensitivity.',
    ],
    githubUrl: 'https://github.com/inesleite/rossmann-uplift',
    notebookUrl: 'https://nbviewer.org/github/inesleite/rossmann-uplift/blob/main/solution.ipynb',
  },
  {
    id: 'pricing-optimization',
    domain: 'Optimization',
    title: 'Pricing Optimization',
    method: 'Reinforcement Learning',
    description: 'Teaching an agent to price rides dynamically in a simulated ride-hailing marketplace. The agent learns a policy through interaction with a custom environment, rewarded for reducing rider wait times and maximizing driver earnings — a reinforcement learning approach to the surge pricing problem.',
    methodology: [
      'Deep Q-Network (DQN) in TensorFlow; experience replay and target network for training stability.',
      'Custom Gym-compatible environment simulating supply/demand shocks and driver availability.',
      'Reward shaping experiments to explore the Pareto frontier between wait time and earnings.',
    ],
    githubUrl: 'https://github.com/inesleite/pricing-optimization',
    notebookUrl: 'https://nbviewer.org/github/inesleite/pricing-optimization/tree/main/',
  },
  {
    id: 'customer-segmentation',
    domain: 'CRM',
    title: 'Customer Segmentation',
    method: 'Clustering',
    description: 'Grouping customers by behavior to find who deserves a reactivation offer — and who is already engaged. An RFM-based clustering exercise on transactional data, building segments that are useful for CRM targeting rather than just analytically neat.',
    methodology: [
      'K-Means (k=5, elbow method) over standardized RFM variables; silhouette score for cluster validation.',
      'Cox Proportional Hazards layered on top to rank segments by predicted churn risk.',
    ],
    githubUrl: 'https://github.com/inesleite/segmentation',
    notebookUrl: 'https://nbviewer.org/github/inesleite/segmentation/blob/main/solution.ipynb',
  },
  {
    id: 'offer-optimization',
    domain: 'Causal',
    title: 'Offer Optimization',
    method: 'Causal Inference',
    featured: true,
    description: "The question isn't whether an offer works on average — it's whether it works on this particular user. By combining causal estimation with a tuned churn model, only genuinely responsive users are targeted, skipping those who'd engage (or churn) regardless.",
    methodology: [
      'Difference-in-Means Estimator for ATE; propensity score weighting for covariate balance checks.',
      'LightGBM churn model tuned with Optuna; uplift score used to rank users by treatment responsiveness.',
      'SHAP to surface which user features predict responsiveness to offers.',
    ],
    githubUrl: 'https://github.com/inesleite/offer-optimization',
    notebookUrl: 'https://nbviewer.org/github/inesleite/offer-optimization/blob/main/solution.ipynb',
  },
  {
    id: 'ltv',
    domain: 'Finance',
    title: 'Customer Lifetime Value',
    method: 'Regression',
    description: 'Predicting 12-month customer lifetime value for an insurance subscription business, with churn risk baked into the estimate. The goal: help the acquisition team decide which customers are worth acquiring at what cost, combining LightGBM revenue prediction with survival analysis.',
    methodology: [
      'LightGBM regression for expected revenue; Kaplan-Meier and Weibull survival models for churn probability.',
      'LTV = E[revenue | active] × P(still active at 12m); evaluated across acquisition cohorts.',
    ],
    githubUrl: 'https://github.com/inesleite/ltv-prediction',
    notebookUrl: 'https://nbviewer.org/github/inesleite/ltv-prediction/blob/main/soution.ipynb',
  },
  {
    id: 'churn',
    domain: 'CRM',
    title: 'Churn Predictions',
    method: 'Classification',
    description: 'Flagging users before they leave — so retention efforts land when they still matter. Using engagement signals and social graph features to predict churn in a social network, identifying at-risk users before they\'ve disengaged rather than after.',
    methodology: [
      'LightGBM classifier; hyperparameter search with Grid Search CV, evaluated on F1 and ROC-AUC.',
      'Engineered recency/frequency engagement ratios and graph features (degree centrality, clustering coefficient).',
    ],
    githubUrl: 'https://github.com/inesleite/churn-prediction',
    notebookUrl: 'https://nbviewer.org/github/inesleite/churn-prediction/blob/main/solution.ipynb',
  },
  {
    id: 'elasticity',
    domain: 'Finance',
    title: 'Price Elasticity of Demand',
    method: 'Regression',
    description: 'Quantifying how sensitive demand is to price changes — product by product. Estimating own-price and cross-price elasticity using regression, then visualizing the distribution across categories to surface where pricing decisions can have the most impact.',
    methodology: [
      'Log-log OLS for own-price elasticity; multi-linear models for cross-price effects across substitutes.',
      'Divergent bar charts to visualize elasticity distribution; confidence intervals on key estimates.',
    ],
    githubUrl: 'https://github.com/inesleite/price-elasticity',
    notebookUrl: 'https://nbviewer.org/github/inesleite/price-elasticity/blob/main/elasticity.ipynb',
  },
  {
    id: 'credit',
    domain: 'Finance',
    title: 'Credit Decision Model',
    method: 'Classification',
    description: 'Building a credit scoring model on highly imbalanced data, where defaults are rare but costly to miss. Payment history and financial behavior features feed a Random Forest model, with evaluation focused on the minority class to avoid optimizing for the wrong metric.',
    methodology: [
      'Random Forest with SMOTE oversampling to address ~5% default rate in training data.',
      'Threshold optimization on the precision-recall curve; AUC-PR as the primary evaluation metric.',
    ],
    githubUrl: 'https://github.com/inesleite/credit-decision-model',
    notebookUrl: 'https://nbviewer.org/github/inesleite/credit-decision-model/blob/main/solution.ipynb',
  },
  {
    id: 'keystroke',
    domain: 'Security',
    title: 'Keystroke Dynamics',
    method: 'Classification',
    description: 'You can identify someone by how they type — timing between keystrokes carries a behavioral fingerprint. A biometrics challenge: authenticate users from typing patterns (dwell time, flight time) without passwords, using KNN classification.',
    methodology: [
      'KNN classifier on dwell time and flight time features extracted from fixed-text typing sequences.',
      'Leave-one-subject-out cross-validation; SHAP to identify which timing intervals are most discriminative.',
    ],
    githubUrl: 'https://github.com/inesleite/keystroke-dynamics',
    notebookUrl: 'https://nbviewer.org/github/inesleite/keystroke-dynamics/blob/main/exploration.ipynb',
  },
  {
    id: 'device-activations',
    domain: 'Forecasting',
    title: 'Device Activations',
    method: 'Time Series',
    description: 'Hourly device activation forecasting for infrastructure capacity planning. Recent activation history feeds as lag features into a classifier, with careful temporal splits to prevent leakage in time-ordered data.',
    methodology: [
      'Lag features at 24h, 48h, and 72h windows over rolling activation counts; Logistic Regression as the estimator.',
      'Strict temporal train-test cutoffs — no future data in feature construction at any time step.',
    ],
    githubUrl: 'https://github.com/inesleite/device-activations',
    notebookUrl: 'https://nbviewer.org/github/inesleite/device-activations/blob/main/solution.ipynb',
  },
  {
    id: 'conversion',
    domain: 'Analytics',
    title: 'Conversion Improvements',
    method: 'Classification',
    description: 'Understanding why users drop off in a conversion funnel — by looking at who they are and when they arrive. SQL-engineered features (time of day, device, geography) feed a Random Forest model, with SHAP surfacing the behavioral drivers of drop-off.',
    methodology: [
      'Session-level features engineered in SQL: time-of-day buckets, device type, geo tier, entry page.',
      'Random Forest with SHAP global and local explanations to identify high-impact funnel friction points.',
    ],
    githubUrl: 'https://github.com/inesleite/conversion-improvements',
    notebookUrl: 'https://nbviewer.org/github/inesleite/conversion-improvements/tree/main/',
  },
]

const skillRows = [
  { label: 'Programming', value: 'Python · SQL' },
  { label: 'ML & Modeling', value: 'Machine Learning · Statistical Modeling · Causal Inference · A/B Testing · Experimentation · Attribution · Marketing Measurement · Time Series · NLP · LLMs' },
  { label: 'Libraries', value: 'Scikit-learn · LightGBM · TensorFlow · PyTorch · StatsModels · Optuna · LangChain' },
  { label: 'Data & Cloud', value: 'dbt · Snowflake · BigQuery · AWS · GCP · Databricks' },
  { label: 'Visualization', value: 'Plotly · Looker · Tableau' },
]

const publications = [
  {
    title: 'Context-sensitive modeling of public transport data',
    venue: 'Transport Research Arena (TRA2020)',
    url: 'https://www.semanticscholar.org/paper/Context-sensitive-modeling-of-public-transport-data-Leite-Finamore/9a3a9182d19178c8e98242e6f49d15e621af5fec',
  },
  {
    title: 'LM2F: a life-cycle model maintenance framework for co-evolving enterprise architecture models',
    venue: 'European Conference on Information Systems, AIS (2019)',
    url: 'https://aisel.aisnet.org/ecis2019_rp/6/',
  },
]

const domains = ['All', ...Array.from(new Set(projects.map(p => p.domain)))]

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < breakpoint)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [breakpoint])
  return isMobile
}

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Portfolio() {
  const [isDark, setIsDark] = useState(false)
  const [expandedCompany, setExpandedCompany] = useState<string | null>(null)
  const [expandedProject, setExpandedProject] = useState<string | null>(null)
  const [activeFilter, setActiveFilter] = useState('All')
  const isMobile = useIsMobile()

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setExpandedCompany(null)
        setExpandedProject(null)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const c: Colors = isDark
    ? {
        bg: '#111110',
        text: '#e8e5df',
        muted: '#6b6864',
        border: '#252321',
        rowHover: '#191817',
        expandedBg: '#161514',
        accent: '#9abfb2',
      }
    : {
        bg: '#f5f4f0',
        text: '#1a1918',
        muted: '#8a8784',
        border: '#e2dfd9',
        rowHover: '#edecea',
        expandedBg: '#e8e5e0',
        accent: '#2d4a3e',
      }

  const filtered = activeFilter === 'All' ? projects : projects.filter(p => p.domain === activeFilter)

  return (
    <div style={{ backgroundColor: c.bg, color: c.text }} className="min-h-screen transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-6 md:px-12 py-20 md:py-28">

        {/* ── Header ── */}
        <motion.header
          className="mb-24"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <div className="flex items-start justify-between mb-10">
            <div>
              <h1
                className="font-light tracking-tight mb-4"
                style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', letterSpacing: '-0.025em', lineHeight: 1 }}
              >
                Inês Leite
              </h1>
              <p className="text-lg mb-1.5">
                Senior Data Scientist
                <motion.span
                  className="ml-1"
                  style={{ color: c.accent }}
                  animate={{ opacity: [1, 1, 0, 0] }}
                  transition={{ duration: 1.1, repeat: Infinity, ease: 'linear', times: [0, 0.45, 0.5, 0.95] }}
                >_</motion.span>
              </p>
              <p className="font-mono text-xs tracking-widest uppercase" style={{ color: c.muted }}>
                ML · Causal Inference · Optimization · NLP · Munich
              </p>
            </div>
            <button
              onClick={() => setIsDark(!isDark)}
              style={{ color: c.muted }}
              className="mt-1 transition-opacity hover:opacity-100 opacity-50"
              aria-label="Toggle dark mode"
            >
              {isDark ? <Sun size={14} /> : <Moon size={14} />}
            </button>
          </div>
          <div style={{ borderTop: `1px solid ${c.border}` }} />
        </motion.header>

        {/* ── Experience ── */}
        <motion.section
          className="mb-24"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          <Label text="Experience" color={c.muted} border={c.border} />
          {companies.map(company => (
            <ExpandableRow
              key={company.id}
              isExpanded={expandedCompany === company.id}
              onToggle={() => setExpandedCompany(expandedCompany === company.id ? null : company.id)}
              colors={c}
              summary={
                isMobile ? (
                  <div className="flex items-center justify-between w-full gap-3">
                    <div>
                      <span className="text-sm font-medium">{company.name}</span>
                      <span className="font-mono text-xs block mt-0.5" style={{ color: c.muted }}>
                        {company.roles[0].title} · {company.period}
                      </span>
                    </div>
                    <ChevronIcon expanded={expandedCompany === company.id} color={c.muted} />
                  </div>
                ) : (
                  <div className="grid gap-4 w-full" style={{ gridTemplateColumns: '3fr 2fr 2fr auto' }}>
                    <span className="text-sm font-medium">{company.name}</span>
                    <span className="text-sm" style={{ color: c.muted }}>
                      {company.roles[0].title}
                    </span>
                    <span className="font-mono text-xs text-right" style={{ color: c.muted }}>{company.period}</span>
                    <ChevronIcon expanded={expandedCompany === company.id} color={c.muted} />
                  </div>
                )
              }
              detail={
                <div className={isMobile ? '' : 'grid gap-4'} style={isMobile ? {} : { gridTemplateColumns: '3fr 7fr' }}>
                  {!isMobile && <div />}
                  <div className="pb-1">
                    {company.roles.map((role, i) => (
                      <div
                        key={i}
                        className={i > 0 ? 'mt-7 pt-7' : ''}
                        style={i > 0 ? { borderTop: `1px solid ${c.border}` } : {}}
                      >
                        <div className="flex items-baseline justify-between mb-3">
                          <span className="text-sm font-medium" style={{ color: c.text }}>{role.title}</span>
                          <span className="font-mono text-xs" style={{ color: c.muted }}>{role.period}</span>
                        </div>
                        <div className="space-y-2.5 mb-4">
                          {role.bullets.map((b, j) => (
                            <p key={j} className="text-sm leading-relaxed" style={{ color: c.muted }}>{b}</p>
                          ))}
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {role.stack.map((s, j) => (
                            <span
                              key={j}
                              className="font-mono text-xs px-2 py-0.5"
                              style={{ border: `1px solid ${c.border}`, color: c.muted, borderRadius: '2px' }}
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              }
            />
          ))}
        </motion.section>

        {/* ── Projects ── */}
        <motion.section
          className="mb-24"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          <Label
            text="Projects"
            color={c.muted}
            border={c.border}
            aside={
              activeFilter !== 'All' ? (
                <span className="font-mono text-xs" style={{ color: c.muted }}>
                  {filtered.length} / {projects.length}
                </span>
              ) : undefined
            }
          />

          {/* Domain filter */}
          <div className="flex flex-wrap gap-x-5 gap-y-2 mb-6">
            {domains.map(d => {
              const count = d === 'All' ? null : projects.filter(p => p.domain === d).length
              return (
                <button
                  key={d}
                  onClick={() => setActiveFilter(d)}
                  className="font-mono text-xs uppercase tracking-widest transition-all pb-0.5"
                  style={{
                    color: activeFilter === d ? c.text : c.muted,
                    borderBottom: activeFilter === d ? `1px solid ${c.text}` : '1px solid transparent',
                  }}
                >
                  {d}
                  {count !== null && (
                    <span className="ml-1" style={{ opacity: 0.45 }}>({count})</span>
                  )}
                </button>
              )
            })}
          </div>

          {/* Column headers — hidden on mobile */}
          {!isMobile && (
            <div
              className="grid gap-4 pb-2 mb-0"
              style={{ gridTemplateColumns: '2rem 1.5fr 4fr 2fr auto', borderBottom: `1px solid ${c.border}` }}
            >
              {['', 'Domain', 'Project', 'Method', ''].map((h, i) => (
                <span key={i} className="font-mono text-xs uppercase tracking-widest" style={{ color: c.muted }}>
                  {h}
                </span>
              ))}
            </div>
          )}

          <AnimatePresence mode="popLayout" initial={false}>
            {filtered.map((project, idx) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <ExpandableRow
                  isExpanded={expandedProject === project.id}
                  onToggle={() => setExpandedProject(expandedProject === project.id ? null : project.id)}
                  colors={c}
                  summary={(hovered) => isMobile ? (
                    <div className="flex items-center justify-between w-full gap-3">
                      <div>
                        <span className="text-sm" style={{ fontWeight: project.featured ? 500 : 400 }}>
                          {project.title}
                        </span>
                        <span className="font-mono text-xs block mt-0.5" style={{ color: c.muted }}>
                          {project.domain} · {project.method}
                        </span>
                      </div>
                      <ChevronIcon expanded={expandedProject === project.id} color={c.muted} />
                    </div>
                  ) : (
                    <div className="grid gap-4 w-full" style={{ gridTemplateColumns: '2rem 1.5fr 4fr 2fr auto' }}>
                      <span
                        className="font-mono text-xs tabular-nums self-center"
                        style={{
                          color: (hovered || project.featured) ? c.accent : c.muted,
                          transition: 'color 0.15s',
                        }}
                      >
                        {hovered ? '→' : String(idx + 1).padStart(2, '0')}
                      </span>
                      <span className="font-mono text-xs self-center" style={{ color: c.muted }}>{project.domain}</span>
                      <span className="text-sm" style={{ fontWeight: project.featured ? 500 : 400 }}>
                        {project.title}
                      </span>
                      <span className="font-mono text-xs self-center" style={{ color: c.muted }}>{project.method}</span>
                      <ChevronIcon expanded={expandedProject === project.id} color={c.muted} />
                    </div>
                  )}
                  detail={
                    <div className={isMobile ? '' : 'grid gap-4'} style={isMobile ? {} : { gridTemplateColumns: '2rem 1.5fr 6fr' }}>
                      {!isMobile && <><div /><div /></>}
                      <div className="space-y-3 pb-1">
                        <p className="text-sm leading-relaxed" style={{ color: c.text, opacity: 0.8 }}>
                          {project.description}
                        </p>
                        <ul className="space-y-1.5 pt-1">
                          {project.methodology.map((m, i) => (
                            <li key={i} className="text-sm leading-relaxed" style={{ color: c.muted }}>
                              — {m}
                            </li>
                          ))}
                        </ul>
                        <div className="flex gap-5 pt-1">
                          {project.githubUrl && (
                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                              className="font-mono text-xs flex items-center gap-1.5 hover:opacity-70 transition-opacity" style={{ color: c.accent }}>
                              <Github size={11} strokeWidth={1.5} />
                              GitHub
                            </a>
                          )}
                          {project.notebookUrl && (
                            <a href={project.notebookUrl} target="_blank" rel="noopener noreferrer"
                              className="font-mono text-xs flex items-center gap-1.5 hover:opacity-70 transition-opacity" style={{ color: c.accent }}>
                              <BookOpen size={11} strokeWidth={1.5} />
                              Notebook
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  }
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.section>

        {/* ── Skills ── */}
        <motion.section
          className="mb-24"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          <Label text="Skills" color={c.muted} border={c.border} />
          {skillRows.map((row, i) => (
            <div
              key={i}
              className={isMobile ? 'py-3.5' : 'grid gap-4 py-3.5'}
              style={isMobile
                ? { borderBottom: `1px solid ${c.border}` }
                : { gridTemplateColumns: '2fr 5fr', borderBottom: `1px solid ${c.border}` }
              }
            >
              <span className="font-mono text-xs uppercase tracking-widest self-center mb-1" style={{ color: c.muted }}>{row.label}</span>
              <span className="font-mono text-xs leading-relaxed">{row.value}</span>
            </div>
          ))}
        </motion.section>

        {/* ── Education ── */}
        <motion.section
          className="mb-24"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          <Label text="Education" color={c.muted} border={c.border} />
          {isMobile ? (
            <div style={{ borderBottom: `1px solid ${c.border}` }} className="py-4">
              <div className="flex items-baseline justify-between">
                <span className="text-sm">MSc Computer Science</span>
                <span className="font-mono text-xs" style={{ color: c.muted }}>2017</span>
              </div>
              <span className="font-mono text-xs block mt-1" style={{ color: c.muted }}>
                Instituto Superior Técnico, Lisbon · Machine Learning & Robotics
              </span>
            </div>
          ) : (
            <>
              <div
                className="grid gap-4 py-4"
                style={{ gridTemplateColumns: '3fr 3fr 1fr', borderBottom: `1px solid ${c.border}` }}
              >
                <span className="text-sm">MSc Computer Science</span>
                <span className="text-sm" style={{ color: c.muted }}>Instituto Superior Técnico, Lisbon</span>
                <span className="font-mono text-xs text-right self-center" style={{ color: c.muted }}>2017</span>
              </div>
              <div
                className="grid gap-4 py-3"
                style={{ gridTemplateColumns: '3fr 3fr 1fr', borderBottom: `1px solid ${c.border}` }}
              >
                <span className="font-mono text-xs" style={{ color: c.muted }}>Machine Learning & Robotics</span>
                <span />
                <span />
              </div>
            </>
          )}
        </motion.section>

        {/* ── Publications ── */}
        <motion.section
          className="mb-24"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          <Label text="Publications" color={c.muted} border={c.border} />
          {publications.map((pub, i) => (
            <div
              key={i}
              className={isMobile ? 'py-4' : 'grid gap-4 py-4'}
              style={isMobile
                ? { borderBottom: `1px solid ${c.border}` }
                : { gridTemplateColumns: '4fr 3fr', borderBottom: `1px solid ${c.border}` }
              }
            >
              <span className="text-sm">
                <a
                  href={pub.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-70 transition-opacity inline-flex items-baseline gap-1.5"
                  style={{ color: c.text }}
                >
                  {pub.title}
                  <ExternalLink size={11} strokeWidth={1.5} className="self-center flex-shrink-0" style={{ color: c.muted }} />
                </a>
              </span>
              <span className={`font-mono text-xs self-center ${isMobile ? 'mt-1.5 block' : 'text-right'}`} style={{ color: c.muted }}>
                {pub.venue}
              </span>
            </div>
          ))}
        </motion.section>

        {/* ── Contact ── */}
        <motion.footer
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          <Label text="Contact" color={c.muted} border={c.border} />
          <div className="py-6 space-y-3">
            {[
              { Icon: Mail, label: 'inesmarreirosleite@gmail.com', href: 'mailto:inesmarreirosleite@gmail.com' },
              { Icon: Linkedin, label: 'linkedin.com/in/ileite', href: 'https://www.linkedin.com/in/ileite/' },
              { Icon: Github, label: 'github.com/inesleite', href: 'https://github.com/inesleite' },
            ].map(({ Icon, label, href }) => (
              <div key={href}>
                <a
                  href={href}
                  target={href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className="font-mono text-xs flex items-center gap-2.5 hover:opacity-70 transition-opacity"
                  style={{ color: c.accent }}
                >
                  <Icon size={12} strokeWidth={1.5} />
                  {label}
                </a>
              </div>
            ))}
          </div>
        </motion.footer>

      </div>
    </div>
  )
}

// ─── Reusable Components ──────────────────────────────────────────────────────

function Label({
  text,
  color,
  border,
  aside,
}: {
  text: string
  color: string
  border: string
  aside?: ReactNode
}) {
  return (
    <div className="mb-5">
      <div className="flex items-baseline justify-between mb-2.5">
        <span className="font-mono text-xs uppercase tracking-widest" style={{ color }}>{text}</span>
        {aside}
      </div>
      <div style={{ borderTop: `1px solid ${border}` }} />
    </div>
  )
}

function ChevronIcon({ expanded, color }: { expanded: boolean; color: string }) {
  return (
    <ChevronDown
      size={13}
      style={{ color, flexShrink: 0, transition: 'transform 0.2s', transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
    />
  )
}

function ExpandableRow({
  isExpanded,
  onToggle,
  colors,
  summary,
  detail,
}: {
  isExpanded: boolean
  onToggle: () => void
  colors: Colors
  summary: SummaryProp
  detail: ReactNode
}) {
  const [hovered, setHovered] = useState(false)
  const summaryNode = typeof summary === 'function' ? summary(hovered) : summary

  return (
    <div style={{ borderBottom: `1px solid ${colors.border}` }}>
      <button
        onClick={onToggle}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="w-full text-left py-4 flex items-center gap-4 transition-colors duration-100"
        style={{ backgroundColor: isExpanded ? colors.expandedBg : hovered ? colors.rowHover : 'transparent' }}
      >
        {summaryNode}
      </button>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="overflow-hidden"
            style={{ backgroundColor: colors.expandedBg }}
          >
            <div className="px-0 pt-2 pb-5">
              {detail}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
