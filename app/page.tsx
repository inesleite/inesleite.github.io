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
import { Mail, Linkedin, Github, Home, Briefcase, ChevronLeft, ChevronRight, FileText, BookOpen, Search, Moon, Sun, ArrowUp, Palette } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

type Project = {
  id: string
  title: string
  objective: string
  context: string
  methodology: string[]
  githubUrl: string
  notebookUrl: string
  tags: string[]
}

const projects: Project[] = [
  {
    id: "prioritize-lockers",
    title: "Prioritize Lockers",
    objective: "Optimize the daily selection of parcel lockers to visit, balancing delivery speed with operational costs.",
    context: "Managing a network of parcel lockers requires strategic decisions that impact customer satisfaction and efficiency.",
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
    objective: "Forecast subway ridership to optimize staff allocation at various NYC subway stations.",
    context: "The MTA needs accurate predictions to improve operational efficiency and passenger experience.",
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
    objective: "Optimize sales through targeted promotions using uplift modeling.",
    context: "Rossmann seeks to automate promotions and inventory management across its extensive retail network.",
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
    objective: "Implement dynamic pricing in a ride-hailing marketplace to balance supply and demand.",
    context: "Ensuring passenger satisfaction with minimal wait times while maximizing driver earnings.",
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
    objective: "Segment users to enhance targeted marketing and reactivation strategies.",
    context: "Understanding customer behavior to reduce churn and increase engagement.",
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
    objective: "Maximize user engagement by optimizing weekly content offers.",
    context: "Providing users with free theme packs to increase app usage and reduce churn.",
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
    objective: "Predict the 12-month customer lifetime value (LTV) for a subscription-based insurance company.",
    context: "Enhancing revenue forecasting and informing customer acquisition strategies.",
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
    objective: "Identify users at risk of churning from a social network platform to enable proactive retention strategies.",
    context: "User retention is critical for growth and revenue in social media applications.",
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
    objective: "Calculate price elasticity to inform pricing strategies.",
    context: "Essential for revenue optimization through pricing adjustments.",
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
    objective: "Build a credit risk model to predict loan defaults.",
    context: "Minimize financial risk and comply with regulatory standards.",
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
    objective: "Identify users based on typing patterns for enhanced security.",
    context: "Behavioral biometrics for user authentication.",
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
    objective: "Predict hourly device activations for resource planning.",
    context: "Helps in scaling server capacity and staffing.",
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
    objective: "Optimize the conversion funnel by analyzing user behavior.",
    context: "Direct impact on revenue and customer acquisition costs.",
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

const skills = [
  "Machine Learning", "Statistical Modeling", "Data Analysis", "Python",
  "SQL", "TensorFlow", "PyTorch", "Scikit-learn", "Time Series Analysis", "Plotly", 
  "Looker","AWS","GCP", "dbt", "Snowflake", "Natural Language Processing", 
  "Big Data Technologies", "Data Visualization", "LLMs"
]

const colorOptions = [
  { name: "pink", value: "#d63384" },
  { name: "blue", value: "#0d6efd" },
  { name: "green", value: "#198754" },
  { name: "purple", value: "#6f42c1" },
  { name: "red", value: "#dc3545" }
]

export default function Component() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [currentPage, setCurrentPage] = useState('home')
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [accentColor, setAccentColor] = useState(colorOptions[0])
  const [showColorPalette, setShowColorPalette] = useState(false)
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
  const toggleColorPalette = () => setShowColorPalette(!showColorPalette)
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
              style={currentPage === 'home' ? { backgroundColor: accentColor.value, color: 'white' } : {}}
            >
              <Home className={`h-5 w-5 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-700'}`} />
              {!isCollapsed && <span className={`ml-2 transition-none transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>Home</span>}
            </Button>
            <Button 
              variant="ghost" 
              className={`w-full justify-center ${isCollapsed ? 'px-0' : ''} transition-colors duration-300`}
              onClick={() => navigateTo('projects')}
              style={currentPage === 'projects' ? { backgroundColor: accentColor.value, color: 'white' } : {}}
            >
              <Briefcase className={`h-5 w-5 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-700'}`} />
              {!isCollapsed && <span className={`ml-2 transition-none transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>Projects</span>}
            </Button>
          </nav>
        </div>

        {/* Controls at the bottom */}
        <div className="mt-auto flex flex-col items-center space-y-4">
          {/* Color palette button and palette */}
          <div className="relative flex flex-col items-center">
            <AnimatePresence>
              {showColorPalette && (
                <motion.div
                  className="absolute bottom-full mb-2 bg-white dark:bg-gray-800 p-2 rounded-lg shadow-lg"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex flex-col space-y-2">
                    {colorOptions.map((color) => (
                      <motion.button
                        key={color.name}
                        className="w-8 h-8 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
                        style={{ backgroundColor: color.value }}
                        onClick={() => {
                          setAccentColor(color)
                          setShowColorPalette(false)
                        }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="w-12 h-12 rounded-xl"
                    onClick={toggleColorPalette}
                    style={{ backgroundColor: accentColor.value }}
                  >
                    <Palette className="h-6 w-6 text-white" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Change accent color</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

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
              <HomePage isDarkMode={isDarkMode} skills={skills} navigateTo={navigateTo} accentColor={accentColor.value} />
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
                accentColor={accentColor.value}
              />
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
                style={{ backgroundColor: accentColor.value}}
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

function HomePage({ isDarkMode, skills, navigateTo, accentColor }: { isDarkMode: boolean, skills: string[], navigateTo: (page: string) => void, accentColor: string }) {
  const [typedText, setTypedText] = useState("")
  const fullText = "Transforming complex data into actionable insights and innovative solutions."
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
          className="text-5xl font-bold mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ color: accentColor }}
        >
          Inês Leite
        </motion.h1>
        <motion.p 
          className="text-2xl mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Data Scientist
        </motion.p>
        <p className="text-lg mb-8 h-20">
          {typedText}
        </p>
        <Button style={{ backgroundColor: accentColor }} className="hover:opacity-90 text-white" onClick={() => navigateTo('projects')}>
          View My Projects
        </Button>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-4" style={{ color: accentColor }}>About Me</h2>
        <p className="text-lg">
          I am a passionate data scientist with extensive experience in machine learning, statistical modeling, and data-driven decision-making. I have helped organizations solve complex problems and optimize their operations across various industries, including retail, transportation, and finance.
        </p>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-4" style={{ color: accentColor }}>Skills</h2>
        <motion.div 
          className="flex flex-wrap gap-2"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                delayChildren: 0.3,
                staggerChildren: 0.1
              }
            }
          }}
        >
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { y: 20, opacity: 0 },
                visible: { y: 0, opacity: 1 }
              }}
            >
              <Badge 
                variant="secondary" 
                className={`text-base px-3 py-1 ${isDarkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
              >
                {skill}
              </Badge>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-4" style={{ color: accentColor }}>Contact Info</h2>
        <div className="flex flex-wrap justify-center gap-4">
          <motion.a
            href="mailto:inesmarreirosleite@gmail.com"
            className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md ${isDarkMode ? 'text-gray-900 bg-gray-100 hover:bg-gray-200' : 'text-white hover:opacity-90'} focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200`}
            style={{ backgroundColor: accentColor }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Mail className="mr-2 h-4 w-4" />
            Email
          </motion.a>
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

      <section>
        <h2 className="text-3xl font-bold mb-4" style={{ color: accentColor }}>CV</h2>
        <div className="flex justify-center">
          <motion.a
            href="https://drive.google.com/file/d/1lrVJkKgnXtQWhRNQxV2yxp9Igp7ASEfK/view"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md ${isDarkMode ? 'text-gray-900 bg-gray-100 hover:bg-gray-200' : 'text-white hover:opacity-90'} focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200`}
            style={{ backgroundColor: accentColor }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FileText className="mr-2 h-4 w-4" />
            View CV
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
                      <h2 className="text-2xl font-semibold text-left" style={{ color: accentColor }}>
                        {project.title}
                      </h2>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="mt-4 space-y-4">
                        <div>
                          <h3 className="font-semibold mb-2">Objective:</h3>
                          <p>{project.objective}</p>
                        </div>
                        <div>
                          <h3 className="font-semibold mb-2">Context:</h3>
                          <p>{project.context}</p>
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