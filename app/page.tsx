'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Linkedin, Github, Home, Briefcase, ChevronLeft, ChevronRight, FileText, BookOpen, Search, Moon, Sun, ArrowUp, GraduationCap } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

type Project = {
  id: string
  title: string
  impact: string
  objective: string
  methodology: string[]
  githubUrl: string
  notebookUrl: string
  tags: string[]
}

const projects: Project[] = [
  {
    id: "prioritize-lockers",
    title: "Prioritize Lockers",
    impact: "Reduced operational costs by optimizing daily locker selection using linear programming.",
    objective: "Optimize the daily selection of parcel lockers to visit, balancing delivery speed with operational costs.",
    methodology: [
      "Formulated a linear programming model using PuLP to minimize costs while meeting delivery speed requirements.",
      "Incorporated factors such as locker demand, geographical locations, and vehicle capacities.",
      "Utilized constraint programming and sensitivity analysis to enhance the model's robustness."
    ],
    githubUrl: "https://github.com/inesleite/prioritize-lockers",
    notebookUrl: "https://nbviewer.org/github/inesleite/prioritize-lockers/blob/main/solution.ipynb",
    tags: ["optimization", "linear programming", "logistics"]
  },
  {
    id: "mta-ridership-forecast",
    title: "MTA Ridership Forecast",
    impact: "Enabled smarter staff allocation across NYC subway stations through accurate ridership forecasts.",
    objective: "Forecast subway ridership to optimize staff allocation at various NYC subway stations.",
    methodology: [
      "Employed advanced models like LightGBM and Prophet to capture seasonality and external factors.",
      "Used MAPE and RMSE for performance assessment, with cross-validation for robustness."
    ],
    githubUrl: "https://github.com/inesleite/mta-ridership",
    notebookUrl: "https://nbviewer.org/github/inesleite/mta-ridership/blob/main/solution.ipynb",
    tags: ["forecasting", "time series", "transportation"]
  },
  {
    id: "rossmann-uplift-model",
    title: "Rossmann Uplift Model",
    impact: "Improved promotion targeting by estimating the true incremental effect on sales using uplift modeling.",
    objective: "Optimize sales through targeted promotions using uplift modeling.",
    methodology: [
      "Employed a two-model approach (treatment and control) using scikit-learn classifiers to estimate the incremental impact of promotions.",
      "Analyzed historical sales data, promotions, and store information to identify key factors influencing uplift.",
      "Used uplift scores to assess model performance.",
      "Applied SHAP to interpret the model's predictions and visualize feature importance."
    ],
    githubUrl: "https://github.com/inesleite/rossmann-uplift",
    notebookUrl: "https://nbviewer.org/github/inesleite/rossmann-uplift/blob/main/solution.ipynb",
    tags: ["uplift modeling", "retail", "promotions"]
  },
  {
    id: "pricing-optimization",
    title: "Pricing Optimization",
    impact: "Balanced supply and demand in a ride-hailing marketplace through a reinforcement learning pricing agent.",
    objective: "Implement dynamic pricing in a ride-hailing marketplace to balance supply and demand.",
    methodology: [
      "Trained machine learning models to predict the probability of passenger and driver acceptance.",
      "Developed a pricing agent using Deep Q-Networks (DQN) with TensorFlow.",
      "Created a custom simulation to model marketplace dynamics and test pricing strategies.",
      "Applied advanced algorithms like Boltzmann Q Policy for continuous action spaces."
    ],
    githubUrl: "https://github.com/inesleite/pricing-optimization",
    notebookUrl: "https://nbviewer.org/github/inesleite/pricing-optimization/tree/main/",
    tags: ["pricing", "reinforcement learning", "marketplace"]
  },
  {
    id: "customer-segmentation",
    title: "Customer Segmentation",
    impact: "Identified high-value customer segments to power targeted reactivation and retention campaigns.",
    objective: "Segment users to enhance targeted marketing and reactivation strategies.",
    methodology: [
      "Applied K-Means clustering to group users based on behavioral patterns derived from RFM analysis.",
      "Utilized RFM analysis and additional behavioral metrics to define segmentation variables.",
      "Implemented the Cox Proportional Hazards model to assess how various covariates affect the risk of customer churn.",
      "Applied SHAP to interpret the model's predictions and visualize feature importance."
    ],
    githubUrl: "https://github.com/inesleite/segmentation",
    notebookUrl: "https://nbviewer.org/github/inesleite/segmentation/blob/main/solution.ipynb",
    tags: ["customer segmentation", "clustering", "churn analysis"]
  },
  {
    id: "offer-optimization",
    title: "Offer Optimization",
    impact: "Maximized ROI on weekly offers by combining causal inference with churn prediction to target the right users.",
    objective: "Maximize user engagement by optimizing weekly content offers.",
    methodology: [
      "Employed a Difference-in-Means Estimator to compute the Average Treatment Effect (ATE) of different offers on churn.",
      "Built a LightGBM model to predict churn probabilities, tuned with Optuna to optimize hyperparameters.",
      "Assessed the impact of offers on profits for high-revenue customers.",
      "Applied SHAP to interpret the model's predictions and visualize feature importance."
    ],
    githubUrl: "https://github.com/inesleite/offer-optimization",
    notebookUrl: "https://nbviewer.org/github/inesleite/offer-optimization/blob/main/solution.ipynb",
    tags: ["offer optimization", "churn prediction", "causal inference"]
  },
  {
    id: "customer-lifetime-value",
    title: "Customer Lifetime Value",
    impact: "Improved revenue forecasting for an insurance company by predicting 12-month LTV with survival analysis.",
    objective: "Predict the 12-month customer lifetime value (LTV) for a subscription-based insurance company.",
    methodology: [
      "Built regression models using LightGBM and survival analysis techniques.",
      "Integrated churn probability into LTV predictions.",
      "Captured customer behavior over time.",
      "Estimated the business impact by targeting the top 20% of customers with the highest predicted LTV."
    ],
    githubUrl: "https://github.com/inesleite/ltv-prediction",
    notebookUrl: "https://nbviewer.org/github/inesleite/ltv-prediction/blob/main/soution.ipynb",
    tags: ["customer lifetime value", "regression", "insurance"]
  },
  {
    id: "churn-predictions",
    title: "Churn Predictions",
    impact: "Enabled proactive retention for a social network by identifying at-risk users before they disengaged.",
    objective: "Identify users at risk of churning from a social network platform to enable proactive retention strategies.",
    methodology: [
      "Implemented LightGBM classifiers to predict churn.",
      "Utilized Grid Search for hyperparameter tuning to optimize the performance of the models.",
      "Developed features based on user engagement metrics and social connections to capture user behavior and interaction patterns."
    ],
    githubUrl: "https://github.com/inesleite/churn-prediction",
    notebookUrl: "https://nbviewer.org/github/inesleite/churn-prediction/blob/main/solution.ipynb",
    tags: ["churn prediction", "social media", "classification"]
  },
  {
    id: "price-elasticity",
    title: "Price Elasticity of Demand",
    impact: "Delivered actionable pricing strategies by quantifying demand sensitivity across product categories.",
    objective: "Calculate price elasticity to inform pricing strategies.",
    methodology: [
      "Applied linear regression models to estimate price elasticity for various product categories.",
      "Used multi-linear regression to calculate cross-price elasticity across different product categories.",
      "Tested the null hypothesis that price changes do not affect demand.",
      "Generated divergent plots to visualize the elasticity of various product categories.",
      "Provided insights for informed pricing strategies based on elasticity and cross-elasticity analysis."
    ],
    githubUrl: "https://github.com/inesleite/price-elasticity",
    notebookUrl: "https://nbviewer.org/github/inesleite/price-elasticity/blob/main/elasticity.ipynb",
    tags: ["price elasticity", "regression", "pricing strategy"]
  },
  {
    id: "credit-decision-model",
    title: "Credit Decision Model",
    impact: "Reduced default risk exposure by building a robust credit scoring model on imbalanced loan data.",
    objective: "Build a credit risk model to predict loan defaults.",
    methodology: [
      "Implemented RandomForestClassifier to predict the probability of loan defaults, with the model trained to handle imbalanced data.",
      "Developed meaningful features from the loan data, including payment history, loan amount, and customer demographics."
    ],
    githubUrl: "https://github.com/inesleite/credit-decision-model",
    notebookUrl: "https://nbviewer.org/github/inesleite/credit-decision-model/blob/main/solution.ipynb",
    tags: ["credit risk", "classification", "finance"]
  },
  {
    id: "keystroke-dynamics",
    title: "Keystroke Dynamics",
    impact: "Achieved high-accuracy user authentication using behavioral biometrics derived from typing patterns.",
    objective: "Identify users based on typing patterns for enhanced security.",
    methodology: [
      "Used KNeighborsClassifier with cross-validation to predict user identities based on typing patterns.",
      "Applied SHAP to interpret the model's predictions and understand the impact of individual features.",
      "Evaluated models using accuracy scores, with the best configuration achieving high accuracy through fine-tuning of hyperparameters."
    ],
    githubUrl: "https://github.com/inesleite/keystroke-dynamics",
    notebookUrl: "https://nbviewer.org/github/inesleite/keystroke-dynamics/blob/main/exploration.ipynb",
    tags: ["biometrics", "security", "classification"]
  },
  {
    id: "device-activations",
    title: "Device Activations Challenge",
    impact: "Improved resource planning accuracy by forecasting hourly device activations with lag-based features.",
    objective: "Predict hourly device activations for resource planning.",
    methodology: [
      "Trained a Logistic Regression model to predict device activations, utilizing standardized features and temporal train-test splits for time series forecasting.",
      "Computed lag features for different time intervals (24, 48, 72 hours) to capture historical trends and improve model accuracy.",
      "Applied SHAP to interpret the model's predictions and visualize feature importance.",
      "Assessed model performance using classification reports and plotted standardized coefficients to understand feature contributions."
    ],
    githubUrl: "https://github.com/inesleite/device-activations",
    notebookUrl: "https://nbviewer.org/github/inesleite/device-activations/blob/main/solution.ipynb",
    tags: ["time series", "forecasting", "resource planning"]
  },
  {
    id: "conversion-improvements",
    title: "Conversion Improvements",
    impact: "Uncovered the key behavioral drivers of conversion to guide funnel optimization and reduce acquisition costs.",
    objective: "Optimize the conversion funnel by analyzing user behavior.",
    methodology: [
      "Used SQL queries to calculate key metrics such as conversion rate and user device preferences based on session data.",
      "Aggregated session data to extract key features like time of day, user device type, and geographic location for deeper analysis of conversion patterns.",
      "Trained a Random Forest Classifier to predict conversions and applied SHAP to interpret model predictions and identify the most important factors driving conversions."
    ],
    githubUrl: "https://github.com/inesleite/conversion-improvements",
    notebookUrl: "https://nbviewer.org/github/inesleite/conversion-improvements/tree/main/",
    tags: ["conversion optimization", "user behavior", "classification"]
  }
]

const skillCategories = [
  {
    label: "Languages & Querying",
    skills: ["Python", "SQL"]
  },
  {
    label: "ML & Modeling",
    skills: ["Machine Learning", "Statistical Modeling", "Time Series Analysis", "Natural Language Processing", "LLMs", "Scikit-learn", "TensorFlow", "PyTorch"]
  },
  {
    label: "Data Engineering & Cloud",
    skills: ["dbt", "Snowflake", "AWS", "GCP", "Big Data Technologies"]
  },
  {
    label: "Analytics & Visualization",
    skills: ["Data Analysis", "Data Visualization", "Plotly", "Looker"]
  }
]

const accentColor = "#d63384"

export default function Component() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [currentPage, setCurrentPage] = useState('home')
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [showScrollTop, setShowScrollTop] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    if (pathname === '/') {
      setCurrentPage('home')
    } else if (pathname === '/projects') {
      setCurrentPage('projects')
    }
  }, [pathname])

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.pageYOffset > 300)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleSidebar = () => setIsCollapsed(!isCollapsed)
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode)

  const navigateTo = (page: string) => {
    setCurrentPage(page)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const allTags = Array.from(new Set(projects.flatMap(project => project.tags)))

  return (
    <div className={`flex min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'} font-[var(--font-montserrat),var(--font-geist-sans),sans-serif]`}>
      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full ${isDarkMode ? 'bg-gray-800' : 'bg-white'} transition-all duration-300 ease-in-out ${isCollapsed ? 'w-20' : 'w-64'} flex flex-col items-center py-8`}>
        <div className="flex flex-col items-center w-full space-y-6">
          {/* Navigation buttons */}
          <nav className="flex flex-col items-center space-y-2 w-full">
            <Button 
              variant="ghost" 
              className={`w-full justify-center ${isCollapsed ? 'px-0' : ''} transition-colors duration-300`}
              onClick={() => navigateTo('home')}
              style={currentPage === 'home' ? { backgroundColor: accentColor, color: 'white' } : {}}
            >
              <Home className={`h-5 w-5 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-700'}`} />
              {!isCollapsed && <span className={`ml-2 transition-none transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>Home</span>}
            </Button>
            <Button
              variant="ghost"
              className={`w-full justify-center ${isCollapsed ? 'px-0' : ''} transition-colors duration-300`}
              onClick={() => navigateTo('projects')}
              style={currentPage === 'projects' ? { backgroundColor: accentColor, color: 'white' } : {}}
            >
              <Briefcase className={`h-5 w-5 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-700'}`} />
              {!isCollapsed && <span className={`ml-2 transition-none transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>Projects</span>}
            </Button>
            <Button
              variant="ghost"
              className={`w-full justify-center ${isCollapsed ? 'px-0' : ''} transition-colors duration-300`}
              onClick={() => navigateTo('cv')}
              style={currentPage === 'cv' ? { backgroundColor: accentColor, color: 'white' } : {}}
            >
              <FileText className={`h-5 w-5 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-700'}`} />
              {!isCollapsed && <span className={`ml-2 transition-none transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>CV</span>}
            </Button>
          </nav>
        </div>

        {/* Controls at the bottom */}
        <div className="mt-auto flex flex-col items-center space-y-4">
          {/* Dark mode toggle */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div 
                  className={`flex items-center justify-between w-16 h-8 rounded-full p-1 cursor-pointer transition-colors duration-300 ${
                    isDarkMode ? 'bg-gray-600' : 'bg-gray-300'
                  }`}
                  onClick={toggleDarkMode}
                >
                  <motion.div
                    className={`flex items-center justify-center w-6 h-6 rounded-full ${
                      isDarkMode ? 'bg-gray-800' : 'bg-white'
                    }`}
                    animate={{ x: isDarkMode ? 32 : 0 }}
                    transition={{ type: "spring", stiffness: 700, damping: 30 }}
                  >
                    {isDarkMode ? (
                      <Moon className="h-4 w-4 text-yellow-300" />
                    ) : (
                      <Sun className="h-4 w-4 text-yellow-500" />
                    )}
                  </motion.div>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Toggle dark mode</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* Collapse/Expand button */}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleSidebar}
            className={`mt-2 transition-colors duration-300 ${isDarkMode ? 'text-white hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-200'}`}
          >
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <main className={`flex-1 p-8 overflow-auto ${isCollapsed ? 'ml-20' : 'ml-64'}`}>
        <AnimatePresence mode="wait">
          {currentPage === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <HomePage isDarkMode={isDarkMode} skillCategories={skillCategories} navigateTo={navigateTo} accentColor={accentColor} />
            </motion.div>
          )}
          {currentPage === 'projects' && (
            <motion.div
              key="projects"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ProjectsPage
                projects={projects.filter(project =>
                  project.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
                  (selectedTags.length === 0 || selectedTags.some(tag => project.tags.includes(tag)))
                )}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                selectedTags={selectedTags}
                setSelectedTags={setSelectedTags}
                allTags={Array.from(new Set(projects.flatMap(project => project.tags)))}
                isDarkMode={isDarkMode}
                accentColor={accentColor}
              />
            </motion.div>
          )}
          {currentPage === 'cv' && (
            <motion.div
              key="cv"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <CVPage isDarkMode={isDarkMode} accentColor={accentColor} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Scroll to top button */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
              className="fixed bottom-4 right-4"
            >
              <Button
                className="rounded-full p-2"
                onClick={scrollToTop}
                style={{ backgroundColor: accentColor}}
              >
                <ArrowUp className="h-6 w-6" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}

function HomePage({ isDarkMode, skillCategories, navigateTo, accentColor }: { isDarkMode: boolean, skillCategories: { label: string, skills: string[] }[], navigateTo: (page: string) => void, accentColor: string }) {
  const [typedText, setTypedText] = useState("")
  const fullText = "Turning messy data into decisions that move the needle."
  const typingSpeed = 50

  useEffect(() => {
    if (typedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(fullText.slice(0, typedText.length + 1))
      }, typingSpeed)
      return () => clearTimeout(timeout)
    }
  }, [typedText])

  return (
    <div className="space-y-12 max-w-4xl mx-auto">
      <section className="text-center">
        <motion.h1
          className="text-5xl font-bold mb-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ color: accentColor }}
        >
          Inês Leite
        </motion.h1>
        <motion.p
          className="text-2xl mb-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Data Scientist
        </motion.p>
        <motion.p
          className="text-sm tracking-widest uppercase mb-8 opacity-60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          ML · Causal Inference · Optimization · NLP
        </motion.p>
        <p className="text-lg mb-8 h-8">
          {typedText}
        </p>
        <Button style={{ backgroundColor: accentColor }} className="hover:opacity-90 text-white" onClick={() => navigateTo('projects')}>
          View My Projects
        </Button>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-4" style={{ color: accentColor }}>About</h2>
        <p className="text-lg leading-relaxed">
          I build data products and ML systems that help organizations make better decisions — from dynamic pricing and churn prediction to causal inference and demand forecasting. My work spans retail, logistics, finance, and marketplaces, with a focus on models that are interpretable, production-ready, and grounded in business outcomes.
        </p>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-6" style={{ color: accentColor }}>Skills</h2>
        <div className="space-y-5">
          {skillCategories.map((category, catIndex) => (
            <div key={catIndex}>
              <p className={`text-xs font-semibold uppercase tracking-widest mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {category.label}
              </p>
              <motion.div
                className="flex flex-wrap gap-2"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { delayChildren: catIndex * 0.1, staggerChildren: 0.05 }
                  }
                }}
              >
                {category.skills.map((skill, index) => (
                  <motion.div
                    key={index}
                    variants={{ hidden: { y: 10, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
                  >
                    <Badge
                      variant="secondary"
                      className={`text-sm px-3 py-1 ${isDarkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
                    >
                      {skill}
                    </Badge>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-4" style={{ color: accentColor }}>Contact</h2>
        <div className="flex flex-wrap justify-center gap-4">
          <motion.a
            href="https://www.linkedin.com/in/ileite/"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md ${isDarkMode ? 'text-gray-900 bg-gray-100 hover:bg-gray-200' : 'text-white hover:opacity-90'} focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200`}
            style={{ backgroundColor: accentColor }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Linkedin className="mr-2 h-4 w-4" />
            LinkedIn
          </motion.a>
          <motion.a
            href="https://github.com/inesleite"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md ${isDarkMode ? 'text-gray-900 bg-gray-100 hover:bg-gray-200' : 'text-white hover:opacity-90'} focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200`}
            style={{ backgroundColor: accentColor }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Github className="mr-2 h-4 w-4" />
            GitHub
          </motion.a>
        </div>
      </section>

    </div>
  )
}

function ProjectsPage({ 
  projects, 
  searchTerm, 
  setSearchTerm, 
  selectedTags, 
  setSelectedTags, 
  allTags,
  isDarkMode,
  accentColor
}: { 
  projects: Project[], 
  searchTerm: string, 
  setSearchTerm: (term: string) => void,
  selectedTags: string[],
  setSelectedTags: (tags: string[]) => void,
  allTags: string[],
  isDarkMode: boolean,
  accentColor: string
}) {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8" style={{ color: accentColor }}>My Projects</h1>
      <div className="mb-6 relative">
        <Input
          type="text"
          placeholder="Search projects..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`w-full pl-10 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>
      <ScrollArea className="h-20 mb-6">
        <div className="flex flex-wrap gap-2">
          {allTags.map(tag => (
            <Badge
              key={tag}
              variant={selectedTags.includes(tag) ? "default" : "outline"}
              className={`cursor-pointer ${isDarkMode ? 'hover:bg-gray-700 bg-gray-800 text-white' : 'hover:bg-gray-200'}`}
              style={selectedTags.includes(tag) ? { backgroundColor: accentColor } : {}}
              onClick={() => {
                if (selectedTags.includes(tag)) {
                  setSelectedTags(selectedTags.filter(t => t !== tag))
                } else {
                  setSelectedTags([...selectedTags, tag])
                }
              }}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </ScrollArea>
      <div className="space-y-8">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            onHoverStart={() => setHoveredProject(project.id)}
            onHoverEnd={() => setHoveredProject(null)}
          >
            <Card 
              className={`transition-all duration-300 hover:shadow-lg ${
                hoveredProject === project.id ? 'border-2' : ''
              } ${isDarkMode ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-white hover:bg-gray-50'}`}
              style={hoveredProject === project.id ? { borderColor: accentColor } : {}}
            >
              <CardContent className="p-6">
                <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="hover:no-underline">
                      <div className="text-left">
                        <h2 className="text-2xl font-semibold" style={{ color: accentColor }}>
                          {project.title}
                        </h2>
                        <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                          {project.impact}
                        </p>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="mt-4 space-y-4">
                        <div>
                          <h3 className="font-semibold mb-2">Objective:</h3>
                          <p>{project.objective}</p>
                        </div>
                        <div>
                          <h3 className="font-semibold mb-2">Methodology:</h3>
                          <ul className="list-disc pl-5">
                            {project.methodology.map((step, stepIndex) => (
                              <li key={stepIndex}>{step}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-4">
                          {project.tags.map(tag => (
                            <Badge key={tag} variant="secondary" className={isDarkMode ? 'bg-gray-700 text-white' : ''}>{tag}</Badge>
                          ))}
                        </div>
                        <div className="flex justify-center gap-4 mt-4">
                          <motion.a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md ${isDarkMode ? 'text-gray-900 bg-gray-100 hover:bg-gray-200' : 'text-white hover:opacity-90'} focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200`}
                            style={{ backgroundColor: accentColor }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Github className="mr-2 h-4 w-4" />
                            GitHub
                          </motion.a>
                          <motion.a
                            href={project.notebookUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md ${isDarkMode ? 'text-gray-900 bg-gray-100 hover:bg-gray-200' : 'text-white hover:opacity-90'} focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200`}
                            style={{ backgroundColor: accentColor }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <BookOpen className="mr-2 h-4 w-4" />
                            Notebook
                          </motion.a>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

type ExperienceEntry = {
  company: string
  location: string
  roles: { title: string; period: string; bullets: string[] }[]
}

const experience: ExperienceEntry[] = [
  {
    company: "FlixBus",
    location: "Munich, DE",
    roles: [
      {
        title: "Senior Data Scientist",
        period: "Sep 2025 – Present",
        bullets: [
          "Built the incrementality measurement framework for geo-based marketing experiments across the US, Canada, Europe, and LATAM, evaluating 18 geo testing opportunities and supporting ~€15M in media investment.",
          "Led integration of incrementality test results into attribution systems as a calibration factor, contributing to ~€400k in monthly optimization impact."
        ]
      },
      {
        title: "Data Scientist",
        period: "Dec 2023 – Sep 2025",
        bullets: [
          "Developed CRM and customer analytics solutions, including an email volume optimization model that improved booking rates by 2.7% while managing unsubscribe risk.",
          "Implemented a LLM workflow using LangChain to inform product decisions from user feedback (app review data)."
        ]
      }
    ]
  },
  {
    company: "Onfido",
    location: "Remote",
    roles: [
      {
        title: "Data Scientist",
        period: "Sep 2022 – Nov 2023",
        bullets: [
          "Reduced false-positive rates by 3% through an NLP-based outlier detection system.",
          "Automated data analysis for business rule extraction, increasing true-positive rates by 2.7% and improving operational efficiency."
        ]
      }
    ]
  },
  {
    company: "Farfetch",
    location: "Remote",
    roles: [
      {
        title: "Data Scientist",
        period: "Jun 2021 – Aug 2022",
        bullets: [
          "Developed a forecasting framework across multiple business KPIs supporting decisions related to LTV, churn, and GMV.",
          "Applied NLP to customer reviews to create reusable features for machine learning and targeted marketing."
        ]
      },
      {
        title: "Junior Data Scientist",
        period: "Apr 2020 – Jun 2021",
        bullets: [
          "Developed and deployed a predictive model for product categorization, reducing manual classification errors and improving profitability.",
          "Optimized payment provider selection across global markets, improving conversion and customer retention."
        ]
      },
      {
        title: "Data Scientist (Intern)",
        period: "Sep 2019 – Apr 2020",
        bullets: [
          "Engineered NLP features for delivery date estimation and supported deployment of the EDD system on GCP."
        ]
      }
    ]
  }
]

function CVPage({ isDarkMode, accentColor }: { isDarkMode: boolean; accentColor: string }) {
  return (
    <div className="max-w-3xl mx-auto space-y-12">
      <section>
        <h1 className="text-4xl font-bold mb-1" style={{ color: accentColor }}>Experience</h1>
        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Munich, Germany</p>
      </section>

      <section className="space-y-10">
        {experience.map((entry, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
          >
            <div className="flex items-baseline justify-between mb-3">
              <h2 className="text-xl font-bold">{entry.company}</h2>
              <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{entry.location}</span>
            </div>
            <div className="space-y-5 pl-4 border-l-2" style={{ borderColor: accentColor }}>
              {entry.roles.map((role, j) => (
                <div key={j}>
                  <div className="flex items-baseline justify-between mb-2">
                    <span className="font-semibold">{role.title}</span>
                    <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{role.period}</span>
                  </div>
                  <ul className="space-y-1">
                    {role.bullets.map((bullet, k) => (
                      <li key={k} className={`text-sm leading-relaxed pl-3 relative before:content-['–'] before:absolute before:left-0 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4" style={{ color: accentColor }}>Education</h2>
        <div className="flex items-start gap-3">
          <GraduationCap className="h-5 w-5 mt-1 flex-shrink-0" style={{ color: accentColor }} />
          <div>
            <p className="font-semibold">MSc in Computer Science — Machine Learning & Robotics</p>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Instituto Superior Técnico, University of Lisbon · GPA 17/20 · 2017</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4" style={{ color: accentColor }}>Publications</h2>
        <ul className="space-y-2">
          <li className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            <span className="font-medium">Context-sensitive modeling of public transport data</span> — Transport Research Arena (TRA2020)
          </li>
          <li className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            <span className="font-medium">LM2F: a life-cycle model maintenance framework for co-evolving enterprise architecture models</span> — European Conference on Information Systems, AIS (2019)
          </li>
        </ul>
      </section>
    </div>
  )
}
