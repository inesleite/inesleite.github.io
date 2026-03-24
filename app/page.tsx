'use client'

import { useState } from 'react'
import type { ReactNode } from 'react'
import { Moon, Sun, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

// ─── Types ────────────────────────────────────────────────────────────────────

type Role = {
  id: string
  title: string
  company: string
  period: string
  bullets: string[]
  stack: string[]
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

// ─── Data ─────────────────────────────────────────────────────────────────────

const roles: Role[] = [
  {
    id: 'flix-sr',
    title: 'Senior Data Scientist',
    company: 'FlixBus',
    period: 'Sep 2025 – Present',
    bullets: [
      'Designed Flix\'s geo-based incrementality measurement framework — running causal experiments across US, Canada, Europe, and LATAM to separate true media-driven growth from organic demand.',
      'Integrated experiment results into attribution systems as calibration signals, making media mix decisions more grounded in evidence than modeled assumptions.',
    ],
    stack: ['Python', 'Causal Inference', 'Geo Experiments', 'Attribution', 'MMM'],
  },
  {
    id: 'flix-ds',
    title: 'Data Scientist',
    company: 'FlixBus',
    period: 'Dec 2023 – Sep 2025',
    bullets: [
      'Built CRM models and customer analytics systems — including an email volume optimizer that balanced engagement uplift against unsubscribe risk.',
      'Designed a LLM pipeline using LangChain to surface structured insights from app review data, feeding directly into product planning.',
    ],
    stack: ['Python', 'LightGBM', 'LangChain', 'CRM', 'NLP', 'SQL'],
  },
  {
    id: 'onfido-ds',
    title: 'Data Scientist',
    company: 'Onfido',
    period: 'Sep 2022 – Nov 2023',
    bullets: [
      'Built an NLP-based anomaly detection system to flag unusual patterns in identity verification data, reducing false positives in production.',
      'Automated rule extraction from historical data, turning manual analyst workflows into reproducible pipelines with measurable accuracy gains.',
    ],
    stack: ['Python', 'NLP', 'Anomaly Detection', 'Scikit-learn', 'SQL'],
  },
  {
    id: 'farfetch-ds',
    title: 'Data Scientist',
    company: 'Farfetch',
    period: 'Jun 2021 – Aug 2022',
    bullets: [
      'Developed a multi-horizon forecasting framework covering LTV, churn, and GMV — used across teams to align planning with modeled demand.',
      'Turned raw customer review text into reusable NLP features, shared across marketing and ML use cases.',
    ],
    stack: ['Python', 'LightGBM', 'Time Series', 'NLP', 'SQL'],
  },
  {
    id: 'farfetch-jr',
    title: 'Junior Data Scientist',
    company: 'Farfetch',
    period: 'Apr 2020 – Jun 2021',
    bullets: [
      'Trained and deployed a product categorization model based on global customs codes, replacing a largely manual classification process.',
      'Modeled payment provider performance across markets to optimize routing decisions for conversion and order value.',
    ],
    stack: ['Python', 'Scikit-learn', 'SQL', 'GCP'],
  },
  {
    id: 'farfetch-int',
    title: 'Data Scientist, Intern',
    company: 'Farfetch',
    period: 'Sep 2019 – Apr 2020',
    bullets: [
      'Engineered NLP and numerical features for a delivery date estimation system, and supported its rollout on GCP including training and inference pipelines.',
    ],
    stack: ['Python', 'NLP', 'GCP'],
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
      'Formulated as a linear program using PuLP, with constraints on vehicle capacity and delivery speed requirements.',
      'Incorporated locker demand signals and geographic data to weight selection priority.',
      'Used sensitivity analysis to understand how the solution shifts under capacity changes.',
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
      'LightGBM for feature-rich gradient boosting; Prophet for interpretable seasonality decomposition.',
      'Evaluated with MAPE and RMSE using temporal cross-validation to avoid data leakage.',
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
      'Two-model (T-learner) approach using Scikit-learn classifiers to estimate individual treatment effects.',
      'SHAP to interpret feature contributions and understand what drives treatment sensitivity.',
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
      'Deep Q-Network (DQN) implemented in TensorFlow with a custom simulation environment.',
      'Explored reward shaping to balance the competing objectives of supply and demand.',
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
      'RFM analysis to engineer meaningful behavioral variables, then K-Means for segmentation.',
      'Cox Proportional Hazards model layered on top to rank segments by churn risk.',
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
      'Difference-in-Means Estimator to measure the average treatment effect of offers on churn.',
      'LightGBM churn model tuned with Optuna; SHAP for understanding model decisions.',
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
      'LightGBM regression for revenue prediction; survival analysis to integrate churn probability into LTV.',
      'Evaluated business impact by comparing acquisition ROI across predicted LTV tiers.',
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
      'LightGBM classifier with Grid Search hyperparameter tuning.',
      'Features built from user activity patterns and social connection depth.',
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
      'Linear and multi-linear regression to estimate own-price and cross-price elasticity coefficients.',
      'Divergent bar charts to visualize elasticity distribution across product categories.',
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
      'Random Forest classifier with engineered payment history features.',
      'Addressed class imbalance with resampling; evaluated on precision-recall to focus on the minority class.',
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
      'KNN classifier trained on timing features (dwell time, flight time) extracted from keystroke sequences.',
      'SHAP for feature interpretation; cross-validation to assess generalization across users.',
    ],
    githubUrl: 'https://github.com/inesleite/keystroke-dynamics',
    notebookUrl: 'https://nbviewer.org/github/inesleite/keystroke-dynamics/blob/main/exploration.ipynb',
  },
  {
    id: 'device-activations',
    domain: 'Forecasting',
    title: 'Device Activations',
    method: 'Time Series',
    description: 'Hourly device activation forecasting for infrastructure capacity planning. Recent activation history feeds as 24/48/72-hour lag features into a Logistic Regression model, with careful temporal splits to prevent leakage in time-ordered data.',
    methodology: [
      'Logistic Regression with 24/48/72-hour lag features.',
      'Careful temporal train-test splits to prevent leakage in time-ordered data.',
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
      'SQL-based feature engineering on session-level data.',
      'Random Forest classifier with SHAP for feature importance and partial dependence analysis.',
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

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Portfolio() {
  const [isDark, setIsDark] = useState(false)
  const [expandedRole, setExpandedRole] = useState<string | null>(null)
  const [expandedProject, setExpandedProject] = useState<string | null>(null)
  const [activeFilter, setActiveFilter] = useState('All')

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
        <header className="mb-24">
          <div className="flex items-start justify-between mb-10">
            <div>
              <h1
                className="font-light tracking-tight mb-4"
                style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', letterSpacing: '-0.025em', lineHeight: 1 }}
              >
                Inês Leite
              </h1>
              <p className="text-lg mb-1.5">Senior Data Scientist</p>
              <p className="text-xs tracking-widest uppercase" style={{ color: c.muted }}>
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
        </header>

        {/* ── Experience ── */}
        <section className="mb-24">
          <Label text="Experience" color={c.muted} border={c.border} />
          {roles.map(role => (
            <ExpandableRow
              key={role.id}
              isExpanded={expandedRole === role.id}
              onToggle={() => setExpandedRole(expandedRole === role.id ? null : role.id)}
              colors={c}
              summary={
                <div className="grid gap-4 w-full" style={{ gridTemplateColumns: '3fr 2fr 2fr auto' }}>
                  <span className="text-sm">{role.title}</span>
                  <span className="text-sm font-medium">{role.company}</span>
                  <span className="text-sm text-right" style={{ color: c.muted }}>{role.period}</span>
                  <ChevronIcon expanded={expandedRole === role.id} color={c.muted} />
                </div>
              }
              detail={
                <div className="grid gap-4" style={{ gridTemplateColumns: '3fr 7fr' }}>
                  <div />
                  <div className="pb-1">
                    <div className="space-y-3 mb-5">
                      {role.bullets.map((b, i) => (
                        <p key={i} className="text-sm leading-relaxed" style={{ color: c.muted }}>
                          <span style={{ color: c.accent, marginRight: '0.5rem', opacity: 0.7 }}>—</span>{b}
                        </p>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {role.stack.map((s, i) => (
                        <span
                          key={i}
                          className="text-xs px-2 py-0.5"
                          style={{ border: `1px solid ${c.border}`, color: c.muted, borderRadius: '2px' }}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              }
            />
          ))}
        </section>

        {/* ── Projects ── */}
        <section className="mb-24">
          <Label
            text="Projects"
            color={c.muted}
            border={c.border}
            aside={
              <span className="text-xs" style={{ color: c.muted }}>
                {filtered.length} / {projects.length}
              </span>
            }
          />

          {/* Domain filter */}
          <div className="flex flex-wrap gap-x-5 gap-y-2 mb-6">
            {domains.map(d => (
              <button
                key={d}
                onClick={() => setActiveFilter(d)}
                className="text-xs uppercase tracking-widest transition-all pb-0.5"
                style={{
                  color: activeFilter === d ? c.text : c.muted,
                  borderBottom: activeFilter === d ? `1px solid ${c.text}` : '1px solid transparent',
                }}
              >
                {d}
              </button>
            ))}
          </div>

          {/* Column headers */}
          <div
            className="grid gap-4 pb-2 mb-0"
            style={{ gridTemplateColumns: '2rem 1.5fr 4fr 2fr auto', borderBottom: `1px solid ${c.border}` }}
          >
            {['', 'Domain', 'Project', 'Method', ''].map((h, i) => (
              <span key={i} className="text-xs uppercase tracking-widest" style={{ color: c.muted }}>
                {h}
              </span>
            ))}
          </div>

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
                  summary={
                    <div className="grid gap-4 w-full" style={{ gridTemplateColumns: '2rem 1.5fr 4fr 2fr auto' }}>
                      <span
                        className="text-xs tabular-nums self-center"
                        style={{ color: project.featured ? c.accent : c.muted }}
                      >
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <span className="text-sm" style={{ color: c.muted }}>{project.domain}</span>
                      <span
                        className="text-sm"
                        style={{ fontWeight: project.featured ? 500 : 400 }}
                      >
                        {project.title}
                      </span>
                      <span className="text-sm" style={{ color: c.muted }}>{project.method}</span>
                      <ChevronIcon expanded={expandedProject === project.id} color={c.muted} />
                    </div>
                  }
                  detail={
                    <div className="grid gap-4" style={{ gridTemplateColumns: '2rem 1.5fr 6fr' }}>
                      <div />
                      <div />
                      <div className="space-y-3 pb-1">
                        <p className="text-sm leading-relaxed" style={{ color: c.muted }}>{project.description}</p>
                        <ul className="space-y-1 pt-1">
                          {project.methodology.map((m, i) => (
                            <li key={i} className="text-sm leading-relaxed" style={{ color: c.muted }}>
                              — {m}
                            </li>
                          ))}
                        </ul>
                        <div className="flex gap-5 pt-1">
                          {project.githubUrl && (
                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                              className="text-xs hover:opacity-70 transition-opacity" style={{ color: c.accent }}>
                              GitHub ↗
                            </a>
                          )}
                          {project.notebookUrl && (
                            <a href={project.notebookUrl} target="_blank" rel="noopener noreferrer"
                              className="text-xs hover:opacity-70 transition-opacity" style={{ color: c.accent }}>
                              Notebook ↗
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
        </section>

        {/* ── Skills ── */}
        <section className="mb-24">
          <Label text="Skills" color={c.muted} border={c.border} />
          {skillRows.map((row, i) => (
            <div
              key={i}
              className="grid gap-4 py-3.5"
              style={{ gridTemplateColumns: '2fr 5fr', borderBottom: `1px solid ${c.border}` }}
            >
              <span className="text-sm" style={{ color: c.muted }}>{row.label}</span>
              <span className="text-sm">{row.value}</span>
            </div>
          ))}
        </section>

        {/* ── Education ── */}
        <section className="mb-24">
          <Label text="Education" color={c.muted} border={c.border} />
          <div
            className="grid gap-4 py-4"
            style={{ gridTemplateColumns: '3fr 3fr 1fr', borderBottom: `1px solid ${c.border}` }}
          >
            <span className="text-sm">MSc Computer Science</span>
            <span className="text-sm">Instituto Superior Técnico, Lisbon</span>
            <span className="text-sm text-right" style={{ color: c.muted }}>2017</span>
          </div>
          <div
            className="grid gap-4 py-3"
            style={{ gridTemplateColumns: '3fr 3fr 1fr', borderBottom: `1px solid ${c.border}` }}
          >
            <span className="text-sm" style={{ color: c.muted }}>Machine Learning & Robotics</span>
            <span />
            <span />
          </div>
        </section>

        {/* ── Publications ── */}
        <section className="mb-24">
          <Label text="Publications" color={c.muted} border={c.border} />
          {publications.map((pub, i) => (
            <div
              key={i}
              className="grid gap-4 py-4"
              style={{ gridTemplateColumns: '4fr 3fr', borderBottom: `1px solid ${c.border}` }}
            >
              <span className="text-sm">
                <a
                  href={pub.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-70 transition-opacity"
                  style={{ color: c.text }}
                >
                  {pub.title} ↗
                </a>
              </span>
              <span className="text-sm text-right" style={{ color: c.muted }}>{pub.venue}</span>
            </div>
          ))}
        </section>

        {/* ── Contact ── */}
        <footer>
          <Label text="Contact" color={c.muted} border={c.border} />
          <div className="py-6 space-y-1.5">
            <div>
              <a href="https://www.linkedin.com/in/ileite/" target="_blank" rel="noopener noreferrer"
                className="text-sm hover:opacity-70 transition-opacity" style={{ color: c.accent }}>
                linkedin.com/in/ileite ↗
              </a>
            </div>
            <div>
              <a href="https://github.com/inesleite" target="_blank" rel="noopener noreferrer"
                className="text-sm hover:opacity-70 transition-opacity" style={{ color: c.accent }}>
                github.com/inesleite ↗
              </a>
            </div>
          </div>
        </footer>

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
        <span className="text-xs uppercase tracking-widest" style={{ color }}>{text}</span>
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
  summary: ReactNode
  detail: ReactNode
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <div style={{ borderBottom: `1px solid ${colors.border}` }}>
      <button
        onClick={onToggle}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="w-full text-left py-4 flex items-center gap-4 transition-colors duration-100"
        style={{ backgroundColor: isExpanded ? colors.expandedBg : hovered ? colors.rowHover : 'transparent' }}
      >
        {summary}
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
