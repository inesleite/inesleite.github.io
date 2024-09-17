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

---

## Projects

### Prioritize Lockers

[GitHub Repository](https://github.com/inesleite/prioritize-lockers) | [Notebook on nbviewer](https://nbviewer.org/github/inesleite/prioritize-lockers/blob/main/solution.ipynb)

#### Project Overview

- **Objective**: Optimize the daily selection of parcel lockers to visit, balancing delivery speed with operational costs.
- **Context**: Managing a network of parcel lockers requires strategic decisions that impact customer satisfaction and efficiency.

#### Methodology

- **Optimization Model**: Formulated a linear programming model using **PuLP** to minimize costs while meeting delivery speed requirements.
- **Constraints and Variables**: Incorporated factors such as locker demand, geographical locations, and vehicle capacities.
- **Advanced Techniques**: Utilized constraint programming and sensitivity analysis to enhance the model's robustness.

---

### MTA Ridership Forecast

[GitHub Repository](https://github.com/inesleite/mta-ridership) | [Notebook on nbviewer](https://nbviewer.org/github/inesleite/mta-ridership/blob/main/solution.ipynb)

#### Project Overview

- **Objective**: Forecast subway ridership to optimize staff allocation at various NYC subway stations.
- **Context**: The MTA needs accurate predictions to improve operational efficiency and passenger experience.

#### Methodology

- **Time Series Modeling**: Employed advanced models like **LightGBM** and **Prophet** to capture seasonality and external factors.
- **Model Evaluation**: Used **MAPE** and **RMSE** for performance assessment, with cross-validation for robustness.

---

### Rossmann Uplift Model

[GitHub Repository](https://github.com/inesleite/rossmann-uplift) | [Notebook on nbviewer](https://nbviewer.org/github/inesleite/rossmann-uplift/blob/main/solution.ipynb)

#### Project Overview

- **Objective**: Optimize sales through targeted promotions using uplift modeling.
- **Context**: Rossmann seeks to automate promotions and inventory management across its extensive retail network.

#### Methodology

- **Uplift Modeling**: Employed a two-model approach (treatment and control) using **scikit-learn** classifiers to estimate the incremental impact of promotions.
- **Data Analysis**: Analyzed historical sales data, promotions, and store information to identify key factors influencing uplift.
- **Evaluation Metrics**: Used **uplift scores** to assess model performance.
- **Model Explainability**: Applied **SHAP** (SHapley Additive exPlanations) to interpret the model's predictions and visualize feature importance.

---

### Pricing Optimization

[GitHub Repository](https://github.com/inesleite/pricing-optimization) | [Notebook on nbviewer](https://nbviewer.org/github/inesleite/pricing-optimization/tree/main/)

#### Project Overview

- **Objective**: Implement dynamic pricing in a ride-hailing marketplace to balance supply and demand.
- **Context**: Ensuring passenger satisfaction with minimal wait times while maximizing driver earnings.

#### Methodology

- **Behavior Modeling**: Trained machine learning models to predict the **probability of passenger acceptance** of a price quote and the **probability of driver acceptance** of a ride offer. Used labeled datasets to explore and evaluate these models.
- **Model Explainability**: Applied **SHAP** (SHapley Additive exPlanations) to interpret the model's predictions and visualize feature importance.
- **Reinforcement Learning**: Developed a pricing agent using **Deep Q-Networks (DQN)** with **TensorFlow**.
- **Simulation Environment**: Created a custom simulation to model marketplace dynamics and test pricing strategies.
- **Optimization Techniques**: Applied advanced algorithms like **Proximal Policy Optimization (PPO)** for continuous action spaces.


---

### Customer Segmentation

[GitHub Repository](https://github.com/inesleite/segmentation) | [Notebook on nbviewer](https://nbviewer.org/github/inesleite/segmentation/blob/main/solution.ipynb)

#### Project Overview

- **Objective**: Segment users to enhance targeted marketing and reactivation strategies.
- **Context**: Understanding customer behavior to reduce churn and increase engagement.

#### Methodology

- **Clustering Techniques**: Applied **K-Means** clustering to group users based on behavioral patterns derived from Recency, Frequency, and Monetary (RFM) analysis.
- **Feature Engineering**: Utilized RFM analysis and additional behavioral metrics (e.g., purchase timing) to define segmentation variables.
- **Survival Analysis**: Implemented the **Cox Proportional Hazards** model to assess how various covariates affect the risk of customer churn.
- **Model Explainability**: Applied **SHAP** (SHapley Additive exPlanations) to interpret the model's predictions and visualize feature importance.


---

### Offer Optimization

[GitHub Repository](https://github.com/inesleite/offer-optimization) | [Notebook on nbviewer](https://nbviewer.org/github/inesleite/offer-optimization/blob/main/solution.ipynb)

#### Project Overview

- **Objective**: Maximize user engagement by optimizing weekly content offers.
- **Context**: Providing users with free theme packs to increase app usage and reduce churn.

#### Methodology

- **Causal Inference**: Employed a **Difference-in-Means Estimator** to compute the **Average Treatment Effect (ATE)** of different offers on churn, improving the efficiency of the estimator with additional covariates.
- **Machine Learning**: Built a **LightGBM** model to predict churn probabilities, tuned with **Optuna** to optimize hyperparameters.
- **Policy Evaluation**: Assessed the impact of offers on profits for high-revenue customers by comparing profits for treated and untreated individuals, and evaluated policies for targeting high-revenue customers to reduce churn.
- **Model Explainability**: Applied **SHAP** (SHapley Additive exPlanations) to interpret the model's predictions and visualize feature importance.


---

### Customer Lifetime Value

[GitHub Repository](https://github.com/inesleite/ltv-prediction) | [Notebook on nbviewer](https://nbviewer.org/github/inesleite/ltv-prediction/blob/main/soution.ipynb)

#### Project Overview

- **Objective**: Predict the 12-month customer lifetime value (LTV) for a subscription-based insurance company.
- **Context**: Enhancing revenue forecasting and informing customer acquisition strategies.

#### Methodology

- **Predictive Modeling**: Built regression models using **LightGBM** and survival analysis techniques.
- **Churn Modeling**: Integrated churn probability into LTV predictions.
- **Feature Engineering**: Captured customer behavior over time.
- **Business Impact**: Estimated the business impact by targeting the top 20% of customers with the highest predicted LTV. This approach allows for calculating the number of retained customers, comparing the new churn rate with the baseline, and estimating the potential increase in revenue due to improved retention.

---

### Churn Predictions

[GitHub Repository](https://github.com/inesleite/churn-prediction) | [Notebook on nbviewer](https://nbviewer.org/github/inesleite/churn-prediction/blob/main/solution.ipynb)

#### Project Overview

- **Objective**: Identify users at risk of churning from a social network platform to enable proactive retention strategies.
- **Context**: User retention is critical for growth and revenue in social media applications.

#### Methodology

- **Machine Learning Models**: Implemented **LightGBM** classifiers to predict churn.
- **Hyperparameter Tuning**: Utilized **Grid Search** for hyperparameter tuning to optimize the performance of the models.
- **Feature Engineering**: Developed features based on user engagement metrics and social connections to capture user behavior and interaction patterns.

---

### Price Elasticity of Demand

[GitHub Repository](https://github.com/inesleite/price-elasticity) | [Notebook on nbviewer](https://nbviewer.org/github/inesleite/price-elasticity/blob/main/elasticity.ipynb)

#### Project Overview

- **Objective**: Calculate price elasticity to inform pricing strategies.
- **Context**: Essential for revenue optimization through pricing adjustments.

#### Methodology

- **Linear Regression and Price Elasticity Estimation**: Applied linear regression models to estimate price elasticity for various product categories. Calculated price elasticity using the formula `(slope) * (mean_price / mean_quantity)` and performed null hypothesis testing to validate statistically significant results.
- **Cross-Price Elasticity**: Used multi-linear regression to calculate cross-price elasticity across different product categories. This included modeling the impact of competitor pricing on the demand of other products, using a significance threshold to reject the null hypothesis for categories with significant relationships.
- **Hypothesis Testing**: Tested the null hypothesis that price changes do not affect demand. Rejected the hypothesis for categories where price elasticity and cross-price elasticity coefficients were significant.
- **Visualization**: Generated divergent plots to visualize the elasticity of various product categories, indicating which products are elastic or inelastic with respect to price changes.
- **Business Insights**: The elasticity and cross-elasticity insights allow for informed pricing strategies. Products with negative price elasticity were found to be more sensitive to price changes, guiding decisions on which products can bear price increases without reducing demand.

---

### Credit Decision Model

[GitHub Repository](https://github.com/inesleite/credit-decision-model) | [Notebook on nbviewer](https://nbviewer.org/github/inesleite/credit-decision-model/blob/main/solution.ipynb)

#### Project Overview

- **Objective**: Build a credit risk model to predict loan defaults.
- **Context**: Minimize financial risk and comply with regulatory standards.

#### Methodology

- **Machine Learning Models**: Implemented **RandomForestClassifier** to predict the probability of loan defaults, with the model trained to handle imbalanced data. Model performance was evaluated using **ROC curves**, **precision-recall curves**, and **classification reports**.
- **Feature Engineering**: Developed meaningful features from the loan data, including payment history, loan amount, and customer demographics. These features were refined and tested to optimize model performance.

---

### Keystroke Dynamics

[GitHub Repository](https://github.com/inesleite/keystroke-dynamics) | [Notebook on nbviewer](https://nbviewer.org/github/inesleite/keystroke-dynamics/blob/main/exploration.ipynb)

#### Project Overview

- **Objective**: Identify users based on typing patterns for enhanced security.
- **Context**: Behavioral biometrics for user authentication.

#### Methodology

- **Machine Learning Models**: Used **KNeighborsClassifier** with cross-validation to predict user identities based on typing patterns. Also employed **XGBoost** with **Grid Search** to optimize hyperparameters for improved classification performance.
- **Model Explainability**: Applied **SHAP** (SHapley Additive exPlanations) to interpret the model’s predictions and understand the impact of individual features.
- **Model Evaluation**: Evaluated models using accuracy scores, with the best configuration achieving high accuracy through fine-tuning of hyperparameters.

---

### Device Activations Challenge

[GitHub Repository](https://github.com/inesleite/device-activations) | [Notebook on nbviewer](https://nbviewer.org/github/inesleite/device-activations/blob/main/solution.ipynb)

#### Project Overview

- **Objective**: Predict hourly device activations for resource planning.
- **Context**: Helps in scaling server capacity and staffing.

#### Methodology

- **Logistic Regression**: Trained a **Logistic Regression** model to predict device activations, utilizing standardized features and temporal train-test splits for time series forecasting.
- **Feature Engineering**: Computed lag features for different time intervals (24, 48, 72 hours) to capture historical trends and improve model accuracy.
- **Model Explainability**: Applied **SHAP** (SHapley Additive exPlanations) to interpret the model's predictions and visualize feature importance.
- **Model Evaluation**: Assessed model performance using **classification reports** and plotted standardized coefficients to understand feature contributions.

---

### Conversion Improvements

[GitHub Repository](https://github.com/inesleite/conversion-improvements) | [Notebook on nbviewer](https://nbviewer.org/github/inesleite/conversion-improvements/tree/main/)

#### Project Overview

- **Objective**: Optimize the conversion funnel by analyzing user behavior.
- **Context**: Direct impact on revenue and customer acquisition costs.

#### Methodology

- **Data Exploration**: Used **SQL** queries to calculate key metrics such as conversion rate and user device preferences based on session data.
- **Feature Aggregation**: Aggregated session data to extract key features like time of day, user device type, and geographic location for deeper analysis of conversion patterns.
- **Machine Learning**: Trained a **Random Forest Classifier** to predict conversions and applied **SHAP** (SHapley Additive exPlanations) to interpret model predictions and identify the most important factors driving conversions.
---

## Contact Information

Feel free to reach out if you'd like to discuss any of these projects or explore potential collaborations.

- **Email**: [inesmarreirosleite@gmail.com](mailto:inesmarreirosleite@gmail.com)
- **LinkedIn**: [linkedin.com/in/inesleite](https://www.linkedin.com/in/inesleite)
- **GitHub**: [github.com/inesleite](https://github.com/inesleite)

---

Thank you for visiting my portfolio!
