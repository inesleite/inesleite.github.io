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

**GitHub**: [Repository Link](https://github.com/inesleite/prioritize-lockers)  
**Notebook**: [View on nbviewer](https://nbviewer.org/github/inesleite/prioritize-lockers/blob/main/solution.ipynb)

#### Project Overview

- **Objective**: Optimize the daily selection of parcel lockers to visit, balancing delivery speed with operational costs.
- **Context**: Managing a network of parcel lockers used for shipping items requires making strategic decisions that impact customer satisfaction and efficiency.
  
#### Methodology

- **Data Handling**: Cleaned and processed shipment and locker data to ensure accuracy.
- **Optimization Model**: Formulated a linear programming model to minimize costs while meeting delivery speed requirements.
- **Constraints**: Considered factors like locker demand, geographical locations, and capacity limitations.

---

### MTA Ridership Forecast

**GitHub**: [Repository Link](https://github.com/inesleite/mta-ridership)  
**Notebook**: [View on nbviewer](https://nbviewer.org/github/inesleite/mta-ridership/blob/main/solution.ipynb)

#### Project Overview

- **Objective**: Forecast subway ridership to optimize staff allocation at various NYC subway stations.
- **Context**: The Metropolitan Transit Authority (MTA) needs accurate predictions to improve operational efficiency and passenger experience.

#### Methodology

- **Data Handling**: Merged historical ridership data with external variables such as weather conditions and public events.
- **Modeling Techniques**: Employed ARIMA, SARIMAX, and Prophet models for time series forecasting.
- **Feature Engineering**: Created lag variables and moving averages to capture trends and seasonality.

---

## Rossmann Uplift Model

[Github](https://github.com/inesleite/rossmann-uplift)
[nbviewer](https://nbviewer.org/github/inesleite/rossmann-uplift/blob/main/solution.ipynb)

Uplift model approach using 2 different models - My hypothesis is Sales can be optimized (maximized) if certain promotions in certain segments of products (Assortments) are launched in specific days and holidays. The ultimate goal would be to automate promotions and eventually stocks.

Rossmann Store Sales Challenge - Forecast sales using store, promotion, and competitor data - [link](https://www.kaggle.com/c/rossmann-store-sales)

Rossmann is challenging you to predict 6 weeks of daily sales for 1,115 stores located across Germany. Reliable sales forecasts enable store managers to create effective staff schedules that increase productivity and motivation. By helping Rossmann create a robust prediction model, you will help store managers stay focused on what’s most important to them: their customers and their teams! 

---

## Pricing Optimization

[Github](https://github.com/inesleite/pricing-optimization)
[nbviewer](https://nbviewer.org/github/inesleite/pricing-optimization/tree/main/)


Two-sided ride-hailing marketplace, meaning that we need to balance the needs and demands of both drivers and passengers.

- On one side of the marketplace, we have passengers who rely on the platform to quickly and conveniently find rides. They expect a seamless experience, with minimal waiting times and reasonable prices.
- On the other side, we have drivers, who use the platform to find passengers and generate income. Their needs include a steady stream of ride requests with fair compensation.

Dynamic pricing plays a critical role in maintaining this balance. By adjusting prices in real-time based on supply and demand, we can incentivise drivers to be available on the platform during high-demand periods, ensuring that passengers can find rides quickly even when the need is greatest. 
Moreover, dynamic pricing helps manage demand by moderating the number of ride requests. When demand is exceptionally high, slightly higher prices can prevent the system from becoming overloaded with requests, thus maintaining service quality and availability. Conversely, during low-demand periods, lower prices can attract more passengers, ensuring that drivers still have enough ride requests to remain active and profitable.

---

## Customer Segmentation

[Github](https://github.com/inesleite/segmentation)
[nbviewer](https://nbviewer.org/github/inesleite/segmentation/blob/main/solution.ipynb)

Every row of the dataset represents one customer who has registered to use the service during September 2020 and either has or hasn’t made orders during the time from then and October 2021.

- **EDA:** Imagine that you are asked to present customer’s insights for the newly created Consumer Product team for a service. What can you find in the dataset that will be interesting for them to know?
- **Segmentation:** Provide a user segmentation that could be used by a marketing team to reactivate different kinds of users. Add recommendations on how to use the segmentation for this purpose. Remember to justify your segmentation approach so that we understand why the way you did it is better than an arbitrary solution by a non-data scientist who can do some slicing-and-dicing with the data.

---

## Offer Optimization

[Github](https://github.com/inesleite/offer-optimization)
[nbviewer](https://nbviewer.org/github/inesleite/offer-optimization/blob/main/solution.ipynb)

Content optimisation: We currently have a very large library of voices and sounds. Sounds are grouped in “Theme packs” (Like Xmas, Video Games, movie titles etc). Each week each user gets one pack for free. You are told to maximize the usage of the weekly packs. What would you do? What data would you need?

Churn reduction: Subscription business model where optimizing churn is a key factor. Using telco client churn sample data. The analysis is focus on different offers and the impact of selecting these offers. In this challenge I used the [econml library](https://econml.azurewebsites.net/_autosummary/econml.dr.DRLearner.html).

Telco Customer Churn Challenge - Focused customer retention programs - [link](https://www.kaggle.com/datasets/blastchar/telco-customer-churn)

---

## Customer Lifetime Value

[Github](https://github.com/inesleite/ltv-prediction)
[nbviewer](https://nbviewer.org/github/inesleite/ltv-prediction/blob/main/soution.ipynb)

The business model is subscription based. They have different insurance products and we have a wide variety of features available per user, some of which can change over time.

The task is to create a model that predicts the customer lifetime value (aka **LTV**) of a customer for the next 12 months. This metric is the sum of the monthly commission we collect from a customer during the first 12 months since they join us, plus the one time commission from additional products they might purchase (cross sell). The customers can cancel their subscription at any time.

---

## Churn predictions

[Github](https://github.com/inesleite/ltv-prediction)
[nbviewer](https://nbviewer.org/github/inesleite/churn-prediction/blob/main/solution.ipynb)

As a social network platform, one of our major concerns is user churn. The ability to identify potential user churn and proactively respond to retain those users is a valuable asset.

- Design a solution to identify users at risk of churning. This solution should include your approach to data analysis, choice of model(s), feature selection, and strategies for user retention.
- Implement a proof of concept of your solution design. This includes data preprocessing, a basic prediction model for user churn, and evaluation of the model's performance.

---

## Price Elasticity of Demand

[Github](https://github.com/inesleite/price-elasticity)
[nbviewer](https://nbviewer.org/github/inesleite/price-elasticity/blob/main/elasticity.ipynb)

Price elasticity of demand (**PED**) is a measure representing the quantity demanded to the change in the price of a product or service. To simplify, it is the ratio of percentage change in quantity demanded of a product in response to the percent change in its price.

---

## Credit Decision Model

[Github](https://github.com/inesleite/credit-decision-model)
[nbviewer](https://nbviewer.org/github/inesleite/credit-decision-model/blob/main/solution.ipynb)

Build a credit model to predict future unpayments.

The training dataset contains the history of loan requests (orders) of a set of customers, as well as when they paid. The test dataset, contains the details of the last transaction requested by some of these users. The goal is to estimate the likelihood of the customers not paying it. 

---

## Keystroke Dynamics

[Github](https://github.com/inesleite/keystroke-dynamics)
[nbviewer](https://nbviewer.org/github/inesleite/keystroke-dynamics/blob/main/exploration.ipynb)

[Kaggle challenge](https://www.kaggle.com/competitions/keystroke-dynamics-challenge-1/overview) - Identify users based on the way they type

- `press_1` - timestamp when the 1st key was pressed
- `release_1` - timestamp when the 1st key was released

---- 

## Device Activations Challenge

[Github](https://github.com/inesleite/device-activations)
[nbviewer](https://nbviewer.org/github/inesleite/device-activations/blob/main/solution.ipynb)

Kaggle challenge

The data consists on timestamps, device and device_activated, the number of times each device was activated.
The objective of the challenge is to predict the next 24 hours individually, a predictions for 9:00 AM, 10:00 AM, and so on until 23:00PM the last timestamp of each day.

---- 

## Conversion Improvements

[Github](https://github.com/inesleite/conversion-improvements)
[nbviewer](https://nbviewer.org/github/inesleite/conversion-improvements/tree/main/)

The goal is to optimise conversion funnel by applying your data science skills to uncover user behaviour patterns in the data. The deliverable of this problem is to provide one or more recommendations on how we can improve conversion.

---- 
