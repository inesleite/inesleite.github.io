<head>
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="assets/style.css">
</head>

# Data Science Portfolio

Welcome to my data science portfolio! Here you'll find a collection of my projects that showcase my expertise in data analysis, machine learning, optimization, and more. Each project addresses a real-world business problem, and I provide detailed explanations of my approach, methodologies, and the impact of my work.

You can view my resume [here](https://drive.google.com/file/d/1lrVJkKgnXtQWhRNQxV2yxp9Igp7ASEfK/view?usp=sharing).

---

## Table of Contents

- [About Me](#about-me)
- [Projects](#projects)
  - [Prioritize Lockers](#prioritize-lockers)
  - [MTA Ridership Forecast](#mta-ridership-forecast)
  - [Rossmann Uplift Model](#rossmann-uplift-model)
  - [Pricing Optimization](#pricing-optimization)
  - [Customer Segmentation](#customer-segmentation)
  - [Offer Optimization](#offer-optimization)
  - [Customer Lifetime Value Prediction](#customer-lifetime-value-prediction)
  - [Churn Prediction](#churn-prediction)
  - [Price Elasticity of Demand](#price-elasticity-of-demand)
  - [Credit Decision Model](#credit-decision-model)
  - [Keystroke Dynamics](#keystroke-dynamics)
  - [Device Activations Challenge](#device-activations-challenge)
  - [Conversion Improvements](#conversion-improvements)
- [Contact Information](#contact-information)

---
## About Me

I am data scientist with a passion for turning data into actionable insights. With extensive experience in machine learning, statistical modeling, and data-driven decision-making, I have helped organizations solve complex problems and optimize their operations. My expertise spans various industries, including retail, transportation, finance, and technology.

## Projects

<div class="project" id="prioritize-lockers">
  <h3>Prioritize Lockers</h3>
  <p><b>Objective</b>: Optimize the daily selection of parcel lockers to visit, balancing delivery speed with operational costs.</p>
  <p><b>Context</b>: Managing a network of parcel lockers requires strategic decisions that impact customer satisfaction and efficiency.</p>
  
  <p><b>Methodology</b>:</p>
  <ul>
    <li><b>Optimization Model</b>: Formulated a linear programming model using <i>PuLP</i> to minimize costs while meeting delivery speed requirements.</li>
    <li><b>Constraints and Variables</b>: Incorporated factors such as locker demand, geographical locations, and vehicle capacities.</li>
    <li><b>Advanced Techniques</b>: Utilized constraint programming and sensitivity analysis to enhance the model's robustness.</li>
  </ul>

  <div class="project-icons">
    <a href="https://github.com/inesleite/prioritize-lockers">
      <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="GitHub" width="30" height="30">
    </a>
    <a href="https://nbviewer.org/github/inesleite/prioritize-lockers/blob/main/solution.ipynb">
      <img src="https://upload.wikimedia.org/wikipedia/commons/3/38/Jupyter_logo.svg" alt="nbviewer" width="30" height="30">
    </a>
  </div>
</div>

<div class="project" id="mta-ridership-forecast">
  <h3>MTA Ridership Forecast</h3>
  <p><b>Objective</b>: Forecast subway ridership to optimize staff allocation at various NYC subway stations.</p>
  <p><b>Context</b>: The MTA needs accurate predictions to improve operational efficiency and passenger experience.</p>
  
  <p><b>Methodology</b>:</p>
  <ul>
    <li><b>Time Series Modeling</b>: Employed advanced models like <i>LightGBM</i> and <i>Prophet</i> to capture seasonality and external factors..</li>
    <li><b>Model Evaluation</b>: Used <i>MAPE</i> and <i>RMSE</i> for performance assessment, with cross-validation for robustness.</li>
  </ul>

  <div class="project-icons">
    <a href="https://github.com/inesleite/mta-ridership">
      <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="GitHub" width="30" height="30">
    </a>
    <a href="https://nbviewer.org/github/inesleite/mta-ridership/blob/main/solution.ipynb">
      <img src="https://upload.wikimedia.org/wikipedia/commons/3/38/Jupyter_logo.svg" alt="nbviewer" width="30" height="30">
    </a>
  </div>
</div>

<div class="project" id="rossmann-uplift-model">
  <h3>Rossmann Uplift Model</h3>
  <p><b>Objective</b>: Optimize sales through targeted promotions using uplift modeling.</p>
  <p><b>Context</b>: Rossmann seeks to automate promotions and inventory management across its extensive retail network.</p>
  
  <p><b>Methodology</b>:</p>
  <ul>
    <li><b>Uplift Modeling</b>: Employed a two-model approach (treatment and control) using <i>scikit-learn</i> classifiers to estimate the incremental impact of promotions.</li>
    <li><b>Data Analysis</b>: Analyzed historical sales data, promotions, and store information to identify key factors influencing uplift.</li>
    <li><b>Evaluation Metrics</b>: Used <i>uplift scores</i> to assess model performance.</li>
    <li><b>Model Explainability</b>: Applied <i>SHAP</i> (SHapley Additive exPlanations) to interpret the model's predictions and visualize feature importance.</li>
  </ul>

  <div class="project-icons">
    <a href="https://github.com/inesleite/rossmann-uplift">
      <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="GitHub" width="30" height="30">
    </a>
    <a href="https://nbviewer.org/github/inesleite/rossmann-uplift/blob/main/solution.ipynb">
      <img src="https://upload.wikimedia.org/wikipedia/commons/3/38/Jupyter_logo.svg" alt="nbviewer" width="30" height="30">
    </a>
  </div>
</div>

<div class="project" id="pricing-optimization">
  <h3>Pricing Optimization</h3>
  <p><b>Objective</b>: Implement dynamic pricing in a ride-hailing marketplace to balance supply and demand.</p>
  <p><b>Context</b>: Ensuring passenger satisfaction with minimal wait times while maximizing driver earnings.</p>
  
  <p><b>Methodology</b>:</p>
  <ul>
    <li><b>Behavior Modeling</b>: Trained machine learning models to predict the <i>probability of passenger acceptance</i> of a price quote and the <i>probability of driver acceptance</i> of a ride offer. Used labeled datasets to explore and evaluate these models.</li>
    <li><b>Model Explainability</b>: Applied <i>SHAP</i> (SHapley Additive exPlanations) to interpret the model's predictions and visualize feature importance.</li>
    <li><b>Reinforcement Learning</b>: Developed a pricing agent using <i>Deep Q-Networks (DQN)</i>  with <i>TensorFlowP</i>.</li>
    <li><b>Simulation Environment</b>: Created a custom simulation to model marketplace dynamics and test pricing strategies.</li>
    <li><b>Optimization Techniques</b>: Applied advanced algorithms like <i>Boltzmann Q Policy</i> for continuous action spaces.</li>
  </ul>

  <div class="project-icons">
    <a href="https://github.com/inesleite/pricing-optimization">
      <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="GitHub" width="30" height="30">
    </a>
    <a href="https://nbviewer.org/github/inesleite/pricing-optimization/tree/main/">
      <img src="https://upload.wikimedia.org/wikipedia/commons/3/38/Jupyter_logo.svg" alt="nbviewer" width="30" height="30">
    </a>
  </div>
</div>

<div class="project" id="customer-segmentation">
  <h3>Customer Segmentation</h3>
  <p><b>Objective</b>: Segment users to enhance targeted marketing and reactivation strategies.</p>
  <p><b>Context</b>: Understanding customer behavior to reduce churn and increase engagement.</p>
  
  <p><b>Methodology</b>:</p>
  <ul>
    <li><b>Clustering Techniques</b>: Applied <i>K-Means</i> clustering to group users based on behavioral patterns derived from Recency, Frequency, and Monetary (RFM) analysis.</li>
    <li><b>Feature Engineering</b>: Utilized RFM analysis and additional behavioral metrics (e.g., purchase timing) to define segmentation variables.</li>
    <li><b>Survival Analysis</b>: Implemented the <i>Cox Proportional Hazards</i> model to assess how various covariates affect the risk of customer churn.</li>
    <li><b>Model Explainability</b>: Applied <i>SHAP</i> (SHapley Additive exPlanations) to interpret the model's predictions and visualize feature importance.</li>
  </ul>

  <div class="project-icons">
    <a href="https://github.com/inesleite/segmentation">
      <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="GitHub" width="30" height="30">
    </a>
    <a href="https://nbviewer.org/github/inesleite/segmentation/blob/main/solution.ipynb">
      <img src="https://upload.wikimedia.org/wikipedia/commons/3/38/Jupyter_logo.svg" alt="nbviewer" width="30" height="30">
    </a>
  </div>
</div>

<div class="project" id="offer-optimization">
  <h3>Offer Optimization</h3>
  <p><b>Objective</b>: Maximize user engagement by optimizing weekly content offers.</p>
  <p><b>Context</b>: Providing users with free theme packs to increase app usage and reduce churn.</p>
  
  <p><b>Methodology</b>:</p>
  <ul>
    <li><b>Causal Inference</b>: Employed a <i>Difference-in-Means Estimator</i> to compute the <i>Average Treatment Effect (ATE)</i> of different offers on churn, improving the efficiency of the estimator with additional covariates.</li>
    <li><b>Machine Learning</b>: Built a <i>LightGBM</i> model to predict churn probabilities, tuned with <i>Optuna</i> to optimize hyperparameters.</li>
    <li><b>Policy Evaluation</b>: Assessed the impact of offers on profits for high-revenue customers by comparing profits for treated and untreated individuals, and evaluated policies for targeting high-revenue customers to reduce churn.</li>
    <li><b>Model Explainability</b>: Applied <i>SHAP</i> (SHapley Additive exPlanations) to interpret the model's predictions and visualize feature importance.</li>
  </ul>

  <div class="project-icons">
    <a href="https://github.com/inesleite/offer-optimization">
      <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="GitHub" width="30" height="30">
    </a>
    <a href="https://nbviewer.org/github/inesleite/offer-optimization/blob/main/solution.ipynb">
      <img src="https://upload.wikimedia.org/wikipedia/commons/3/38/Jupyter_logo.svg" alt="nbviewer" width="30" height="30">
    </a>
  </div>
</div>


<div class="project" id="customer-lifetime-value">
  <h3>Customer Lifetime Value</h3>
  <p><b>Objective</b>: Predict the 12-month customer lifetime value (LTV) for a subscription-based insurance company.</p>
  <p><b>Context</b>: Enhancing revenue forecasting and informing customer acquisition strategies.</p>
  
  <p><b>Methodology</b>:</p>
  <ul>
    <li><b>Predictive Modeling</b>: Built regression models using <i>LightGBM</i> and survival analysis techniques.</li>
    <li><b>Churn Modeling</b>: Integrated churn probability into LTV predictions.</li>
    <li><b>Feature Engineering</b>: Captured customer behavior over time.</li>
    <li><b>Business Impact</b>: Estimated the business impact by targeting the top 20% of customers with the highest predicted LTV. This approach allows for calculating the number of retained customers, comparing the new churn rate with the baseline, and estimating the potential increase in revenue due to improved retention.</li>
  </ul>

  <div class="project-icons">
    <a href="https://github.com/inesleite/ltv-prediction">
      <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="GitHub" width="30" height="30">
    </a>
    <a href="https://nbviewer.org/github/inesleite/ltv-prediction/blob/main/soution.ipynb">
      <img src="https://upload.wikimedia.org/wikipedia/commons/3/38/Jupyter_logo.svg" alt="nbviewer" width="30" height="30">
    </a>
  </div>
</div>

<div class="project" id="churn-predictions">
  <h3>Churn Predictions</h3>
  <p><b>Objective</b>: Identify users at risk of churning from a social network platform to enable proactive retention strategies.</p>
  <p><b>Context</b>: User retention is critical for growth and revenue in social media applications.</p>
  
  <p><b>Methodology</b>:</p>
  <ul>
    <li><b>Machine Learning Models</b>: Implemented <i>LightGBM</i> classifiers to predict churn.</li>
    <li><b>Hyperparameter Tuning</b>: Utilized <i>Grid Search</i> for hyperparameter tuning to optimize the performance of the models.</li>
    <li><b>Feature Engineering</b>: Developed features based on user engagement metrics and social connections to capture user behavior and interaction patterns.</li>
  </ul>

  <div class="project-icons">
    <a href="https://github.com/inesleite/churn-prediction">
      <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="GitHub" width="30" height="30">
    </a>
    <a href="https://nbviewer.org/github/inesleite/churn-prediction/blob/main/solution.ipynb">
      <img src="https://upload.wikimedia.org/wikipedia/commons/3/38/Jupyter_logo.svg" alt="nbviewer" width="30" height="30">
    </a>
  </div>
</div>

<div class="project" id="price-elasticity">
  <h3>Price Elasticity of Demand</h3>
  <p><b>Objective</b>: Calculate price elasticity to inform pricing strategies.</p>
  <p><b>Context</b>: Essential for revenue optimization through pricing adjustments.</p>
  
  <p><b>Methodology</b>:</p>
  <ul>
    <li><b>Linear Regression and Price Elasticity Estimation</b>: Applied linear regression models to estimate price elasticity for various product categories. Calculated price elasticity using the formula <code>(slope) * (mean_price / mean_quantity)</code> and performed null hypothesis testing to validate statistically significant results.</li>
    <li><b>Cross-Price Elasticity</b>: Used multi-linear regression to calculate cross-price elasticity across different product categories. This included modeling the impact of competitor pricing on the demand of other products, using a significance threshold to reject the null hypothesis for categories with significant relationships.</li>
    <li><b>Hypothesis Testing</b>: Tested the null hypothesis that price changes do not affect demand. Rejected the hypothesis for categories where price elasticity and cross-price elasticity coefficients were significant.</li>
    <li><b>Visualization</b>: Generated divergent plots to visualize the elasticity of various product categories, indicating which products are elastic or inelastic with respect to price changes.</li>
    <li><b>Business Insights</b>: The elasticity and cross-elasticity insights allow for informed pricing strategies. Products with negative price elasticity were found to be more sensitive to price changes, guiding decisions on which products can bear price increases without reducing demand.</li>
  </ul>

  <div class="project-icons">
    <a href="https://github.com/inesleite/price-elasticity">
      <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="GitHub" width="30" height="30">
    </a>
    <a href="https://nbviewer.org/github/inesleite/price-elasticity/blob/main/elasticity.ipynb">
      <img src="https://upload.wikimedia.org/wikipedia/commons/3/38/Jupyter_logo.svg" alt="nbviewer" width="30" height="30">
    </a>
  </div>
</div>


<div class="project" id="credit-decision-model">
  <h3>Credit Decision Model</h3>
  <p><b>Objective</b>: Build a credit risk model to predict loan defaults.</p>
  <p><b>Context</b>: Minimize financial risk and comply with regulatory standards.</p>
  
  <p><b>Methodology</b>:</p>
  <ul>
    <li><b>Machine Learning Models</b>: Implemented <i>RandomForestClassifier</i> to predict the probability of loan defaults, with the model trained to handle imbalanced data. Model performance was evaluated using <i>ROC curves</i>, <i>precision-recall curves</i>, and <i>classification reports</i>.</li>
    <li><b>Feature Engineering</b>: Developed meaningful features from the loan data, including payment history, loan amount, and customer demographics. These features were refined and tested to optimize model performance.</li>
  </ul>

  <div class="project-icons">
    <a href="https://github.com/inesleite/credit-decision-model">
      <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="GitHub" width="30" height="30">
    </a>
    <a href="https://nbviewer.org/github/inesleite/credit-decision-model/blob/main/solution.ipynb">
      <img src="https://upload.wikimedia.org/wikipedia/commons/3/38/Jupyter_logo.svg" alt="nbviewer" width="30" height="30">
    </a>
  </div>
</div>


<div class="project" id="keystroke-dynamics">
  <h3>Keystroke Dynamics</h3>
  <p><b>Objective</b>: Identify users based on typing patterns for enhanced security.</p>
  <p><b>Context</b>: Behavioral biometrics for user authentication.</p>
  
  <p><b>Methodology</b>:</p>
  <ul>
    <li><b>Machine Learning Models</b>: Used <i>KNeighborsClassifier</i> with cross-validation to predict user identities based on typing patterns. Also employed <i>XGBoost</i> with <i>Grid Search</i> to optimize hyperparameters for improved classification performance.</li>
    <li><b>Model Explainability</b>: Applied <i>SHAP</i> (SHapley Additive exPlanations) to interpret the model's predictions and understand the impact of individual features.</li>
    <li><b>Model Evaluation</b>: Evaluated models using accuracy scores, with the best configuration achieving high accuracy through fine-tuning of hyperparameters.</li>
  </ul>

  <div class="project-icons">
    <a href="https://github.com/inesleite/keystroke-dynamics">
      <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="GitHub" width="30" height="30">
    </a>
    <a href="https://nbviewer.org/github/inesleite/keystroke-dynamics/blob/main/exploration.ipynb">
      <img src="https://upload.wikimedia.org/wikipedia/commons/3/38/Jupyter_logo.svg" alt="nbviewer" width="30" height="30">
    </a>
  </div>
</div>


<div class="project" id="device-activations">
  <h3>Device Activations Challenge</h3>
  <p><b>Objective</b>: Predict hourly device activations for resource planning.</p>
  <p><b>Context</b>: Helps in scaling server capacity and staffing.</p>
  
  <p><b>Methodology</b>:</p>
  <ul>
    <li><b>Logistic Regression</b>: Trained a <i>Logistic Regression</i> model to predict device activations, utilizing standardized features and temporal train-test splits for time series forecasting.</li>
    <li><b>Feature Engineering</b>: Computed lag features for different time intervals (24, 48, 72 hours) to capture historical trends and improve model accuracy.</li>
    <li><b>Model Explainability</b>: Applied <i>SHAP</i> (SHapley Additive exPlanations) to interpret the model's predictions and visualize feature importance.</li>
    <li><b>Model Evaluation</b>: Assessed model performance using <i>classification reports</i> and plotted standardized coefficients to understand feature contributions.</li>
  </ul>

  <div class="project-icons">
    <a href="https://github.com/inesleite/device-activations">
      <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="GitHub" width="30" height="30">
    </a>
    <a href="https://nbviewer.org/github/inesleite/device-activations/blob/main/solution.ipynb">
      <img src="https://upload.wikimedia.org/wikipedia/commons/3/38/Jupyter_logo.svg" alt="nbviewer" width="30" height="30">
    </a>
  </div>
</div>

<div class="project" id="conversion-improvements">
  <h3>Conversion Improvements</h3>
  <p><b>Objective</b>: Optimize the conversion funnel by analyzing user behavior.</p>
  <p><b>Context</b>: Direct impact on revenue and customer acquisition costs.</p>
  
  <p><b>Methodology</b>:</p>
  <ul>
    <li><b>Data Exploration</b>: Used <i>SQL</i> queries to calculate key metrics such as conversion rate and user device preferences based on session data.</li>
    <li><b>Feature Aggregation</b>: Aggregated session data to extract key features like time of day, user device type, and geographic location for deeper analysis of conversion patterns.</li>
    <li><b>Machine Learning</b>: Trained a <i>Random Forest Classifier</i> to predict conversions and applied <i>SHAP</i> to interpret model predictions and identify the most important factors driving conversions.</li>
  </ul>

  <div class="project-icons">
    <a href="https://github.com/inesleite/conversion-improvements">
      <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="GitHub" width="30" height="30">
    </a>
    <a href="https://nbviewer.org/github/inesleite/conversion-improvements/tree/main/">
      <img src="https://upload.wikimedia.org/wikipedia/commons/3/38/Jupyter_logo.svg" alt="nbviewer" width="30" height="30">
    </a>
  </div>
</div>

  
## Contact Information

<div class="contact-info">
  <p>Feel free to reach out if you'd like to discuss any of these projects or explore potential collaborations.</p>
  <p>
    <a href="mailto:inesmarreirosleite@gmail.com">
      <img src="https://img.icons8.com/ios-filled/50/0078D4/email.png" alt="Email" width="20" height="20"> Email
    </a>
    |
    <a href="https://www.linkedin.com/in/inesleite">
      <img src="https://img.icons8.com/ios-filled/50/0078D4/linkedin.png" alt="LinkedIn" width="20" height="20"> LinkedIn
    </a>
    |
    <a href="https://github.com/inesleite">
      <img src="https://img.icons8.com/ios-filled/50/0078D4/github.png" alt="GitHub" width="20" height="20"> GitHub
    </a>
  </p>
</div>
