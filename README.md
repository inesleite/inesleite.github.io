# Data science portfolio by Inês Leite

This portfolio is a compilation of notebooks which I created for data analysis or for exploration of machine learning algorithms. You can find my resume [here](https://drive.google.com/file/d/15VQ4gAFr1AjVtJkus3zB9PzAaYqyF7DZ/view?usp=sharing).


---

## Customer Lifetime Value

[Github](https://github.com/inesleite/ltv-prediction)
[nbviewer](https://nbviewer.org/github/inesleite/ltv-prediction/blob/main/soution.ipynb)

The business model is subscription based. They have different insurance products and we have a wide variety of features available per user, some of which can change over time.

The task is to create a model that predicts the customer lifetime value (aka LTV) of a customer for the next 12 months. This metric is the sum of the monthly commission we collect from a customer during the first 12 months since they join us, plus the one time commission from additional products they might purchase (cross sell). The customers can cancel their subscription at any time.

---

## Churn predictions

[Github](https://github.com/inesleite/ltv-prediction)
[nbviewer](https://nbviewer.org/github/inesleite/churn-prediction/blob/main/solution.ipynb)

As a social network platform, one of our major concerns is user churn. The ability to identify potential user churn and proactively respond to retain those users is a valuable asset.

Design a solution to identify users at risk of churning. This solution should include your approach to data analysis, choice of model(s), feature selection, and strategies for user retention.

Implement a proof of concept of your solution design. This includes data preprocessing, a basic prediction model for user churn, and evaluation of the model's performance.

---

## Price Elasticity of Demand

[Github](https://github.com/inesleite/price-elasticity)
[nbviewer](https://nbviewer.org/github/inesleite/price-elasticity/blob/main/elasticity.ipynb)

Price elasticity of demand (PED) is a measure representing the quantity demanded to the change in the price of a product or service. To simplify, it is the ratio of percentage change in quantity demanded of a product in response to the percent change in its price.

---

## Credit Decision Model

[Github](https://github.com/inesleite/credit-decision-model)
[nbviewer](https://nbviewer.org/github/inesleite/credit-decision-model/blob/main/solution.ipynb)

Build a credit model to predict future unpayments.

The training dataset contains the history of loan requests (orders) of a set of customers, as well as when they paid. The test dataset, contains the details of the last transaction requested by some of these users. The goal is to estimate the likelihood of the customers not paying it. 

---