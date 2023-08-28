## 1. Price Elasticity of Demand

Price elasticity of demand (**PED**) is a measure representing the quantity demanded to the change in the price of a product or service. To simplify, it is the ratio of percentage change in quantity demanded of a product in response to the percent change in its price.

<div>
<img src="{{ site.baseurl }}/assets/elasticity_formula.png" width="500"/>
</div>


```python
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import statsmodels.api as sm

import warnings
warnings.filterwarnings("ignore")
```


```python
df = pd.read_parquet("data/df.parquet")
```


```python
df["year"]
```




    0          2017
    1          2017
    2          2017
    3          2018
    4          2018
               ... 
    1329764    2020
    1329765    2020
    1329766    2020
    1329767    2020
    1329768    2020
    Name: year, Length: 1329080, dtype: int64



Following data preprocessing selected is for the 2017, 2018, 2019 and 2020 years, on a weekly basis.

Mean price and number of purchases count per week


```python
df["year_week"] = df["year"].astype(str) + "_" + df["week"].astype(str)
```


```python
df.head()
```




<div class="p-Widget jp-RenderedHTMLCommon jp-RenderedHTML jp-mod-trusted jp-OutputArea-output" data-mime-type="text/html">
<style scoped="">
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table class="dataframe" border="1">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>item_key</th>
      <th>date</th>
      <th>shop_key</th>
      <th>sales_count</th>
      <th>item_price_final</th>
      <th>item_price_regular</th>
      <th>item_price_special</th>
      <th>main_category</th>
      <th>sub_category</th>
      <th>brnd</th>
      <th>item_page_views</th>
      <th>week</th>
      <th>month</th>
      <th>year</th>
      <th>dayofweek</th>
      <th>is_sale</th>
      <th>discount</th>
      <th>pct_bracket</th>
      <th>year_week</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>160069753483773</td>
      <td>2017-11-17</td>
      <td>4</td>
      <td>1</td>
      <td>370.993</td>
      <td>370.993</td>
      <td>NaN</td>
      <td>im7</td>
      <td>sc33</td>
      <td>b24</td>
      <td>NaN</td>
      <td>46</td>
      <td>11</td>
      <td>2017</td>
      <td>4</td>
      <td>0</td>
      <td>0.0</td>
      <td>No discount</td>
      <td>2017_46</td>
    </tr>
    <tr>
      <th>1</th>
      <td>160069753483773</td>
      <td>2017-11-21</td>
      <td>4</td>
      <td>1</td>
      <td>370.993</td>
      <td>370.993</td>
      <td>NaN</td>
      <td>im7</td>
      <td>sc33</td>
      <td>b24</td>
      <td>NaN</td>
      <td>47</td>
      <td>11</td>
      <td>2017</td>
      <td>1</td>
      <td>0</td>
      <td>0.0</td>
      <td>No discount</td>
      <td>2017_47</td>
    </tr>
    <tr>
      <th>2</th>
      <td>160069753483773</td>
      <td>2017-12-31</td>
      <td>4</td>
      <td>1</td>
      <td>370.993</td>
      <td>370.993</td>
      <td>NaN</td>
      <td>im7</td>
      <td>sc33</td>
      <td>b24</td>
      <td>NaN</td>
      <td>52</td>
      <td>12</td>
      <td>2017</td>
      <td>6</td>
      <td>0</td>
      <td>0.0</td>
      <td>No discount</td>
      <td>2017_52</td>
    </tr>
    <tr>
      <th>3</th>
      <td>160069753483773</td>
      <td>2018-04-19</td>
      <td>1</td>
      <td>1</td>
      <td>349.993</td>
      <td>349.993</td>
      <td>NaN</td>
      <td>im7</td>
      <td>sc33</td>
      <td>b24</td>
      <td>NaN</td>
      <td>16</td>
      <td>4</td>
      <td>2018</td>
      <td>3</td>
      <td>0</td>
      <td>0.0</td>
      <td>No discount</td>
      <td>2018_16</td>
    </tr>
    <tr>
      <th>4</th>
      <td>160069753483773</td>
      <td>2018-04-22</td>
      <td>1</td>
      <td>1</td>
      <td>349.993</td>
      <td>349.993</td>
      <td>NaN</td>
      <td>im7</td>
      <td>sc33</td>
      <td>b24</td>
      <td>43.0</td>
      <td>16</td>
      <td>4</td>
      <td>2018</td>
      <td>6</td>
      <td>0</td>
      <td>0.0</td>
      <td>No discount</td>
      <td>2018_16</td>
    </tr>
  </tbody>
</table>
</div>




```python
df.date.nunique()
```




    1126




```python
df.year_week.nunique()
```




    162




```python
df_cat = df.groupby(['year_week','main_category']).agg({'item_price_final':'mean','sales_count': 'sum'}).reset_index()
```


```python
df_cat
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>year_week</th>
      <th>main_category</th>
      <th>item_price_final</th>
      <th>sales_count</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>2017_46</td>
      <td>im11</td>
      <td>12.895700</td>
      <td>2</td>
    </tr>
    <tr>
      <th>1</th>
      <td>2017_46</td>
      <td>im14</td>
      <td>65.563429</td>
      <td>21</td>
    </tr>
    <tr>
      <th>2</th>
      <td>2017_46</td>
      <td>im15</td>
      <td>387.493150</td>
      <td>2</td>
    </tr>
    <tr>
      <th>3</th>
      <td>2017_46</td>
      <td>im16</td>
      <td>444.705429</td>
      <td>9</td>
    </tr>
    <tr>
      <th>4</th>
      <td>2017_46</td>
      <td>im17</td>
      <td>124.858556</td>
      <td>14</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>2716</th>
      <td>2020_9</td>
      <td>im5</td>
      <td>181.290086</td>
      <td>762</td>
    </tr>
    <tr>
      <th>2717</th>
      <td>2020_9</td>
      <td>im6</td>
      <td>132.698101</td>
      <td>4020</td>
    </tr>
    <tr>
      <th>2718</th>
      <td>2020_9</td>
      <td>im7</td>
      <td>292.742769</td>
      <td>586</td>
    </tr>
    <tr>
      <th>2719</th>
      <td>2020_9</td>
      <td>im8</td>
      <td>174.088768</td>
      <td>707</td>
    </tr>
    <tr>
      <th>2720</th>
      <td>2020_9</td>
      <td>im9</td>
      <td>135.355210</td>
      <td>366</td>
    </tr>
  </tbody>
</table>
<p>2721 rows × 4 columns</p>
</div>




```python
x_pivot = df_cat.pivot(index= 'year_week' , columns='main_category' ,values='item_price_final')

x_values = pd.DataFrame(x_pivot.to_records())
x_values.head()
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>year_week</th>
      <th>im1</th>
      <th>im11</th>
      <th>im12</th>
      <th>im14</th>
      <th>im15</th>
      <th>im16</th>
      <th>im17</th>
      <th>im19</th>
      <th>im2</th>
      <th>im20</th>
      <th>im3</th>
      <th>im4</th>
      <th>im5</th>
      <th>im6</th>
      <th>im7</th>
      <th>im8</th>
      <th>im9</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>2017_46</td>
      <td>NaN</td>
      <td>12.895700</td>
      <td>NaN</td>
      <td>65.563429</td>
      <td>387.493150</td>
      <td>444.705429</td>
      <td>124.858556</td>
      <td>114.292600</td>
      <td>41.994400</td>
      <td>279.448730</td>
      <td>254.791950</td>
      <td>20.205300</td>
      <td>220.292150</td>
      <td>147.710450</td>
      <td>264.158833</td>
      <td>217.322867</td>
      <td>37.938500</td>
    </tr>
    <tr>
      <th>1</th>
      <td>2017_47</td>
      <td>NaN</td>
      <td>29.483815</td>
      <td>36.242467</td>
      <td>82.672339</td>
      <td>185.613747</td>
      <td>452.798523</td>
      <td>139.256736</td>
      <td>78.801337</td>
      <td>113.615133</td>
      <td>254.049619</td>
      <td>348.182441</td>
      <td>50.231590</td>
      <td>221.444342</td>
      <td>130.160353</td>
      <td>329.576460</td>
      <td>185.033268</td>
      <td>95.276425</td>
    </tr>
    <tr>
      <th>2</th>
      <td>2017_48</td>
      <td>NaN</td>
      <td>10.575400</td>
      <td>57.287433</td>
      <td>63.346145</td>
      <td>131.001900</td>
      <td>351.911208</td>
      <td>179.514095</td>
      <td>60.921029</td>
      <td>48.226800</td>
      <td>239.591730</td>
      <td>461.031890</td>
      <td>54.216700</td>
      <td>216.623733</td>
      <td>131.865289</td>
      <td>277.708589</td>
      <td>153.512782</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>3</th>
      <td>2017_49</td>
      <td>NaN</td>
      <td>31.820467</td>
      <td>70.767625</td>
      <td>62.416561</td>
      <td>186.482420</td>
      <td>443.548910</td>
      <td>156.420906</td>
      <td>75.328762</td>
      <td>67.426533</td>
      <td>179.199160</td>
      <td>290.689660</td>
      <td>49.621020</td>
      <td>239.445667</td>
      <td>143.338127</td>
      <td>298.263124</td>
      <td>191.491115</td>
      <td>76.093750</td>
    </tr>
    <tr>
      <th>4</th>
      <td>2017_50</td>
      <td>475.9881</td>
      <td>62.193350</td>
      <td>56.005957</td>
      <td>71.241510</td>
      <td>147.933470</td>
      <td>545.073050</td>
      <td>177.024411</td>
      <td>87.172740</td>
      <td>79.736590</td>
      <td>217.996142</td>
      <td>584.719729</td>
      <td>33.219567</td>
      <td>167.396483</td>
      <td>133.690453</td>
      <td>315.865742</td>
      <td>226.459100</td>
      <td>44.991350</td>
    </tr>
  </tbody>
</table>
</div>




```python
y_pivot = df_cat.pivot( index = 'year_week',columns='main_category', values='sales_count')
y_values = pd.DataFrame(y_pivot.to_records())
y_values.head()
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>year_week</th>
      <th>im1</th>
      <th>im11</th>
      <th>im12</th>
      <th>im14</th>
      <th>im15</th>
      <th>im16</th>
      <th>im17</th>
      <th>im19</th>
      <th>im2</th>
      <th>im20</th>
      <th>im3</th>
      <th>im4</th>
      <th>im5</th>
      <th>im6</th>
      <th>im7</th>
      <th>im8</th>
      <th>im9</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>2017_46</td>
      <td>NaN</td>
      <td>2.0</td>
      <td>NaN</td>
      <td>21.0</td>
      <td>2.0</td>
      <td>9.0</td>
      <td>14.0</td>
      <td>2.0</td>
      <td>2.0</td>
      <td>25.0</td>
      <td>4.0</td>
      <td>1.0</td>
      <td>2.0</td>
      <td>22.0</td>
      <td>10.0</td>
      <td>3.0</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>1</th>
      <td>2017_47</td>
      <td>NaN</td>
      <td>33.0</td>
      <td>10.0</td>
      <td>217.0</td>
      <td>18.0</td>
      <td>69.0</td>
      <td>51.0</td>
      <td>22.0</td>
      <td>16.0</td>
      <td>127.0</td>
      <td>25.0</td>
      <td>13.0</td>
      <td>37.0</td>
      <td>336.0</td>
      <td>54.0</td>
      <td>35.0</td>
      <td>4.0</td>
    </tr>
    <tr>
      <th>2</th>
      <td>2017_48</td>
      <td>NaN</td>
      <td>1.0</td>
      <td>14.0</td>
      <td>62.0</td>
      <td>16.0</td>
      <td>29.0</td>
      <td>29.0</td>
      <td>7.0</td>
      <td>3.0</td>
      <td>77.0</td>
      <td>10.0</td>
      <td>3.0</td>
      <td>22.0</td>
      <td>130.0</td>
      <td>19.0</td>
      <td>26.0</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>3</th>
      <td>2017_49</td>
      <td>NaN</td>
      <td>6.0</td>
      <td>5.0</td>
      <td>111.0</td>
      <td>12.0</td>
      <td>21.0</td>
      <td>22.0</td>
      <td>11.0</td>
      <td>7.0</td>
      <td>70.0</td>
      <td>5.0</td>
      <td>8.0</td>
      <td>21.0</td>
      <td>177.0</td>
      <td>26.0</td>
      <td>22.0</td>
      <td>2.0</td>
    </tr>
    <tr>
      <th>4</th>
      <td>2017_50</td>
      <td>1.0</td>
      <td>4.0</td>
      <td>7.0</td>
      <td>101.0</td>
      <td>13.0</td>
      <td>24.0</td>
      <td>12.0</td>
      <td>6.0</td>
      <td>10.0</td>
      <td>68.0</td>
      <td>7.0</td>
      <td>3.0</td>
      <td>24.0</td>
      <td>179.0</td>
      <td>12.0</td>
      <td>8.0</td>
      <td>2.0</td>
    </tr>
  </tbody>
</table>
</div>



### 1.1 Linear Regression Model


```python
points = []
results_values = {
    "main_category": [],
    "price_elasticity": [],
    "price_mean": [],
    "quantity_mean": [],
    "intercept": [],
    "t_score":[],
    "slope": [],
    "coefficient_pvalue" : [],
    "rsquared_value" : [],
}
#Append x_values with y_values per same main_category
for column in x_values.columns[1:]:
    
    print(f"\nCategory - {column}\n")
    column_points = []
    for i in range(len(x_values[column])):
        if not np.isnan(x_values[column][i]) and not np.isnan(y_values[column][i]):
            column_points.append((x_values[column][i], y_values[column][i]))
    df_col = pd.DataFrame(list(column_points), columns= ['x_value', 'y_value'])

    
    #Linear Regression Model
    x_value = df_col['x_value']
    y_value = df_col['y_value']
    X = sm.add_constant(x_value)
    model = sm.OLS(y_value, X)
    result = model.fit()    
    
    #(Null Hypothesis test) Coefficient with a p value less than 0.05
    if result.f_pvalue < 0.05:

        rsquared = result.rsquared
        coefficient_pvalue = result.f_pvalue
        intercept, slope = result.params
        mean_price = np.mean(x_value)
        mean_quantity = np.mean(y_value)
        tintercept, t_score = result.tvalues
        
        print(result.summary())

        #Price elasticity Formula
        price_elasticity = (slope)*(mean_price/mean_quantity)    

        #Append results into dictionary for dataframe
        results_values["main_category"].append(column)
        results_values["price_elasticity"].append(price_elasticity)
        results_values["price_mean"].append(mean_price)
        results_values["quantity_mean"].append(mean_quantity)
        results_values["intercept"].append(intercept)
        results_values['t_score'].append(t_score)
        results_values["slope"].append(slope)
        results_values["coefficient_pvalue"].append(coefficient_pvalue)
        results_values["rsquared_value"].append(rsquared)
        
    else:
        print("Accept Null Hypothesis test")

final_df = pd.DataFrame.from_dict(results_values)
df_elasticity = final_df[['main_category','price_elasticity',
                          't_score','coefficient_pvalue',
                          'slope','price_mean','quantity_mean',
                          'intercept','rsquared_value']]
```

    
    Category - im1
    
                                OLS Regression Results                            
    ==============================================================================
    Dep. Variable:                y_value   R-squared:                       0.057
    Model:                            OLS   Adj. R-squared:                  0.050
    Method:                 Least Squares   F-statistic:                     8.456
    Date:                Sun, 29 Jan 2023   Prob (F-statistic):            0.00423
    Time:                        18:40:49   Log-Likelihood:                -541.29
    No. Observations:                 142   AIC:                             1087.
    Df Residuals:                     140   BIC:                             1092.
    Df Model:                           1                                         
    Covariance Type:            nonrobust                                         
    ==============================================================================
                     coef    std err          t      P>|t|      [0.025      0.975]
    ------------------------------------------------------------------------------
    const         28.5879      4.699      6.083      0.000      19.297      37.879
    x_value       -0.0651      0.022     -2.908      0.004      -0.109      -0.021
    ==============================================================================
    Omnibus:                       61.746   Durbin-Watson:                   0.833
    Prob(Omnibus):                  0.000   Jarque-Bera (JB):              157.687
    Skew:                           1.819   Prob(JB):                     5.74e-35
    Kurtosis:                       6.662   Cond. No.                     1.07e+03
    ==============================================================================
    
    Notes:
    [1] Standard Errors assume that the covariance matrix of the errors is correctly specified.
    [2] The condition number is large, 1.07e+03. This might indicate that there are
    strong multicollinearity or other numerical problems.
    
    Category - im11
    
    Accept Null Hypothesis test
    
    Category - im12
    
                                OLS Regression Results                            
    ==============================================================================
    Dep. Variable:                y_value   R-squared:                       0.353
    Model:                            OLS   Adj. R-squared:                  0.349
    Method:                 Least Squares   F-statistic:                     82.86
    Date:                Sun, 29 Jan 2023   Prob (F-statistic):           4.67e-16
    Time:                        18:40:49   Log-Likelihood:                -842.62
    No. Observations:                 154   AIC:                             1689.
    Df Residuals:                     152   BIC:                             1695.
    Df Model:                           1                                         
    Covariance Type:            nonrobust                                         
    ==============================================================================
                     coef    std err          t      P>|t|      [0.025      0.975]
    ------------------------------------------------------------------------------
    const        197.4172     13.660     14.452      0.000     170.428     224.406
    x_value       -0.7749      0.085     -9.103      0.000      -0.943      -0.607
    ==============================================================================
    Omnibus:                       42.199   Durbin-Watson:                   0.861
    Prob(Omnibus):                  0.000   Jarque-Bera (JB):              142.662
    Skew:                           0.996   Prob(JB):                     1.05e-31
    Kurtosis:                       7.274   Cond. No.                         470.
    ==============================================================================
    
    Notes:
    [1] Standard Errors assume that the covariance matrix of the errors is correctly specified.
    
    Category - im14
    
                                OLS Regression Results                            
    ==============================================================================
    Dep. Variable:                y_value   R-squared:                       0.484
    Model:                            OLS   Adj. R-squared:                  0.481
    Method:                 Least Squares   F-statistic:                     150.1
    Date:                Sun, 29 Jan 2023   Prob (F-statistic):           9.31e-25
    Time:                        18:40:49   Log-Likelihood:                -1398.9
    No. Observations:                 162   AIC:                             2802.
    Df Residuals:                     160   BIC:                             2808.
    Df Model:                           1                                         
    Covariance Type:            nonrobust                                         
    ==============================================================================
                     coef    std err          t      P>|t|      [0.025      0.975]
    ------------------------------------------------------------------------------
    const       1.333e+04    879.878     15.148      0.000    1.16e+04    1.51e+04
    x_value     -167.7021     13.690    -12.250      0.000    -194.739    -140.665
    ==============================================================================
    Omnibus:                       59.740   Durbin-Watson:                   1.090
    Prob(Omnibus):                  0.000   Jarque-Bera (JB):              186.448
    Skew:                           1.451   Prob(JB):                     3.26e-41
    Kurtosis:                       7.381   Cond. No.                         525.
    ==============================================================================
    
    Notes:
    [1] Standard Errors assume that the covariance matrix of the errors is correctly specified.
    
    Category - im15
    
                                OLS Regression Results                            
    ==============================================================================
    Dep. Variable:                y_value   R-squared:                       0.123
    Model:                            OLS   Adj. R-squared:                  0.118
    Method:                 Least Squares   F-statistic:                     22.46
    Date:                Sun, 29 Jan 2023   Prob (F-statistic):           4.72e-06
    Time:                        18:40:49   Log-Likelihood:                -1214.3
    No. Observations:                 162   AIC:                             2433.
    Df Residuals:                     160   BIC:                             2439.
    Df Model:                           1                                         
    Covariance Type:            nonrobust                                         
    ==============================================================================
                     coef    std err          t      P>|t|      [0.025      0.975]
    ------------------------------------------------------------------------------
    const       1137.1831    111.719     10.179      0.000     916.550    1357.816
    x_value       -3.8839      0.820     -4.739      0.000      -5.502      -2.265
    ==============================================================================
    Omnibus:                       21.917   Durbin-Watson:                   0.387
    Prob(Omnibus):                  0.000   Jarque-Bera (JB):               26.253
    Skew:                           0.909   Prob(JB):                     1.99e-06
    Kurtosis:                       3.765   Cond. No.                         442.
    ==============================================================================
    
    Notes:
    [1] Standard Errors assume that the covariance matrix of the errors is correctly specified.
    
    Category - im16
    
                                OLS Regression Results                            
    ==============================================================================
    Dep. Variable:                y_value   R-squared:                       0.139
    Model:                            OLS   Adj. R-squared:                  0.134
    Method:                 Least Squares   F-statistic:                     25.92
    Date:                Sun, 29 Jan 2023   Prob (F-statistic):           9.91e-07
    Time:                        18:40:49   Log-Likelihood:                -1261.5
    No. Observations:                 162   AIC:                             2527.
    Df Residuals:                     160   BIC:                             2533.
    Df Model:                           1                                         
    Covariance Type:            nonrobust                                         
    ==============================================================================
                     coef    std err          t      P>|t|      [0.025      0.975]
    ------------------------------------------------------------------------------
    const      -1864.5547    556.442     -3.351      0.001   -2963.474    -765.636
    x_value        6.7818      1.332      5.091      0.000       4.151       9.413
    ==============================================================================
    Omnibus:                       78.913   Durbin-Watson:                   0.772
    Prob(Omnibus):                  0.000   Jarque-Bera (JB):              493.160
    Skew:                           1.658   Prob(JB):                    8.16e-108
    Kurtosis:                      10.878   Cond. No.                     5.04e+03
    ==============================================================================
    
    Notes:
    [1] Standard Errors assume that the covariance matrix of the errors is correctly specified.
    [2] The condition number is large, 5.04e+03. This might indicate that there are
    strong multicollinearity or other numerical problems.
    
    Category - im17
    
    Accept Null Hypothesis test
    
    Category - im19
    
    Accept Null Hypothesis test
    
    Category - im2
    
    Accept Null Hypothesis test
    
    Category - im20
    
                                OLS Regression Results                            
    ==============================================================================
    Dep. Variable:                y_value   R-squared:                       0.025
    Model:                            OLS   Adj. R-squared:                  0.018
    Method:                 Least Squares   F-statistic:                     4.031
    Date:                Sun, 29 Jan 2023   Prob (F-statistic):             0.0464
    Time:                        18:40:49   Log-Likelihood:                -1383.6
    No. Observations:                 162   AIC:                             2771.
    Df Residuals:                     160   BIC:                             2777.
    Df Model:                           1                                         
    Covariance Type:            nonrobust                                         
    ==============================================================================
                     coef    std err          t      P>|t|      [0.025      0.975]
    ------------------------------------------------------------------------------
    const       5051.4752   1569.065      3.219      0.002    1952.726    8150.224
    x_value      -13.2465      6.598     -2.008      0.046     -26.277      -0.216
    ==============================================================================
    Omnibus:                       74.700   Durbin-Watson:                   0.704
    Prob(Omnibus):                  0.000   Jarque-Bera (JB):              348.276
    Skew:                           1.673   Prob(JB):                     2.36e-76
    Kurtosis:                       9.356   Cond. No.                     3.81e+03
    ==============================================================================
    
    Notes:
    [1] Standard Errors assume that the covariance matrix of the errors is correctly specified.
    [2] The condition number is large, 3.81e+03. This might indicate that there are
    strong multicollinearity or other numerical problems.
    
    Category - im3
    
                                OLS Regression Results                            
    ==============================================================================
    Dep. Variable:                y_value   R-squared:                       0.028
    Model:                            OLS   Adj. R-squared:                  0.022
    Method:                 Least Squares   F-statistic:                     4.674
    Date:                Sun, 29 Jan 2023   Prob (F-statistic):             0.0321
    Time:                        18:40:49   Log-Likelihood:                -1129.9
    No. Observations:                 162   AIC:                             2264.
    Df Residuals:                     160   BIC:                             2270.
    Df Model:                           1                                         
    Covariance Type:            nonrobust                                         
    ==============================================================================
                     coef    std err          t      P>|t|      [0.025      0.975]
    ------------------------------------------------------------------------------
    const        812.9345    187.693      4.331      0.000     442.259    1183.610
    x_value       -1.1310      0.523     -2.162      0.032      -2.164      -0.098
    ==============================================================================
    Omnibus:                       23.657   Durbin-Watson:                   0.568
    Prob(Omnibus):                  0.000   Jarque-Bera (JB):               33.774
    Skew:                           0.816   Prob(JB):                     4.63e-08
    Kurtosis:                       4.531   Cond. No.                     3.29e+03
    ==============================================================================
    
    Notes:
    [1] Standard Errors assume that the covariance matrix of the errors is correctly specified.
    [2] The condition number is large, 3.29e+03. This might indicate that there are
    strong multicollinearity or other numerical problems.
    
    Category - im4
    
                                OLS Regression Results                            
    ==============================================================================
    Dep. Variable:                y_value   R-squared:                       0.084
    Model:                            OLS   Adj. R-squared:                  0.078
    Method:                 Least Squares   F-statistic:                     14.59
    Date:                Sun, 29 Jan 2023   Prob (F-statistic):           0.000191
    Time:                        18:40:49   Log-Likelihood:                -989.84
    No. Observations:                 161   AIC:                             1984.
    Df Residuals:                     159   BIC:                             1990.
    Df Model:                           1                                         
    Covariance Type:            nonrobust                                         
    ==============================================================================
                     coef    std err          t      P>|t|      [0.025      0.975]
    ------------------------------------------------------------------------------
    const        313.3503     41.590      7.534      0.000     231.211     395.490
    x_value       -2.8286      0.740     -3.820      0.000      -4.291      -1.366
    ==============================================================================
    Omnibus:                       38.937   Durbin-Watson:                   0.394
    Prob(Omnibus):                  0.000   Jarque-Bera (JB):               68.289
    Skew:                           1.172   Prob(JB):                     1.48e-15
    Kurtosis:                       5.165   Cond. No.                         260.
    ==============================================================================
    
    Notes:
    [1] Standard Errors assume that the covariance matrix of the errors is correctly specified.
    
    Category - im5
    
                                OLS Regression Results                            
    ==============================================================================
    Dep. Variable:                y_value   R-squared:                       0.096
    Model:                            OLS   Adj. R-squared:                  0.091
    Method:                 Least Squares   F-statistic:                     17.04
    Date:                Sun, 29 Jan 2023   Prob (F-statistic):           5.88e-05
    Time:                        18:40:49   Log-Likelihood:                -1233.3
    No. Observations:                 162   AIC:                             2471.
    Df Residuals:                     160   BIC:                             2477.
    Df Model:                           1                                         
    Covariance Type:            nonrobust                                         
    ==============================================================================
                     coef    std err          t      P>|t|      [0.025      0.975]
    ------------------------------------------------------------------------------
    const       2214.9881    361.338      6.130      0.000    1501.382    2928.594
    x_value       -8.1136      1.966     -4.128      0.000     -11.995      -4.232
    ==============================================================================
    Omnibus:                       37.001   Durbin-Watson:                   0.473
    Prob(Omnibus):                  0.000   Jarque-Bera (JB):               60.711
    Skew:                           1.151   Prob(JB):                     6.56e-14
    Kurtosis:                       4.923   Cond. No.                     1.72e+03
    ==============================================================================
    
    Notes:
    [1] Standard Errors assume that the covariance matrix of the errors is correctly specified.
    [2] The condition number is large, 1.72e+03. This might indicate that there are
    strong multicollinearity or other numerical problems.
    
    Category - im6
    
                                OLS Regression Results                            
    ==============================================================================
    Dep. Variable:                y_value   R-squared:                       0.128
    Model:                            OLS   Adj. R-squared:                  0.122
    Method:                 Least Squares   F-statistic:                     23.47
    Date:                Sun, 29 Jan 2023   Prob (F-statistic):           2.97e-06
    Time:                        18:40:49   Log-Likelihood:                -1481.6
    No. Observations:                 162   AIC:                             2967.
    Df Residuals:                     160   BIC:                             2973.
    Df Model:                           1                                         
    Covariance Type:            nonrobust                                         
    ==============================================================================
                     coef    std err          t      P>|t|      [0.025      0.975]
    ------------------------------------------------------------------------------
    const       1.913e+04   3199.104      5.981      0.000    1.28e+04    2.55e+04
    x_value     -121.6131     25.102     -4.845      0.000    -171.187     -72.040
    ==============================================================================
    Omnibus:                       63.033   Durbin-Watson:                   0.618
    Prob(Omnibus):                  0.000   Jarque-Bera (JB):              186.887
    Skew:                           1.570   Prob(JB):                     2.62e-41
    Kurtosis:                       7.223   Cond. No.                     2.27e+03
    ==============================================================================
    
    Notes:
    [1] Standard Errors assume that the covariance matrix of the errors is correctly specified.
    [2] The condition number is large, 2.27e+03. This might indicate that there are
    strong multicollinearity or other numerical problems.
    
    Category - im7
    
                                OLS Regression Results                            
    ==============================================================================
    Dep. Variable:                y_value   R-squared:                       0.035
    Model:                            OLS   Adj. R-squared:                  0.029
    Method:                 Least Squares   F-statistic:                     5.737
    Date:                Sun, 29 Jan 2023   Prob (F-statistic):             0.0178
    Time:                        18:40:49   Log-Likelihood:                -1128.7
    No. Observations:                 162   AIC:                             2261.
    Df Residuals:                     160   BIC:                             2268.
    Df Model:                           1                                         
    Covariance Type:            nonrobust                                         
    ==============================================================================
                     coef    std err          t      P>|t|      [0.025      0.975]
    ------------------------------------------------------------------------------
    const       -282.4401    307.107     -0.920      0.359    -888.946     324.066
    x_value        2.4849      1.037      2.395      0.018       0.436       4.534
    ==============================================================================
    Omnibus:                       29.822   Durbin-Watson:                   0.634
    Prob(Omnibus):                  0.000   Jarque-Bera (JB):               73.265
    Skew:                           0.755   Prob(JB):                     1.23e-16
    Kurtosis:                       5.928   Cond. No.                     4.48e+03
    ==============================================================================
    
    Notes:
    [1] Standard Errors assume that the covariance matrix of the errors is correctly specified.
    [2] The condition number is large, 4.48e+03. This might indicate that there are
    strong multicollinearity or other numerical problems.
    
    Category - im8
    
    Accept Null Hypothesis test
    
    Category - im9
    
                                OLS Regression Results                            
    ==============================================================================
    Dep. Variable:                y_value   R-squared:                       0.083
    Model:                            OLS   Adj. R-squared:                  0.077
    Method:                 Least Squares   F-statistic:                     14.09
    Date:                Sun, 29 Jan 2023   Prob (F-statistic):           0.000246
    Time:                        18:40:49   Log-Likelihood:                -1258.6
    No. Observations:                 158   AIC:                             2521.
    Df Residuals:                     156   BIC:                             2527.
    Df Model:                           1                                         
    Covariance Type:            nonrobust                                         
    ==============================================================================
                     coef    std err          t      P>|t|      [0.025      0.975]
    ------------------------------------------------------------------------------
    const       -425.4011    258.730     -1.644      0.102    -936.468      85.666
    x_value        8.6980      2.318      3.753      0.000       4.120      13.276
    ==============================================================================
    Omnibus:                      111.443   Durbin-Watson:                   0.354
    Prob(Omnibus):                  0.000   Jarque-Bera (JB):              924.025
    Skew:                           2.533   Prob(JB):                    2.24e-201
    Kurtosis:                      13.710   Cond. No.                         518.
    ==============================================================================
    
    Notes:
    [1] Standard Errors assume that the covariance matrix of the errors is correctly specified.



```python
df_elasticity
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>main_category</th>
      <th>price_elasticity</th>
      <th>t_score</th>
      <th>coefficient_pvalue</th>
      <th>slope</th>
      <th>price_mean</th>
      <th>quantity_mean</th>
      <th>intercept</th>
      <th>rsquared_value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>im1</td>
      <td>-0.882002</td>
      <td>-2.907892</td>
      <td>4.232714e-03</td>
      <td>-0.065143</td>
      <td>205.666165</td>
      <td>15.190141</td>
      <td>28.587869</td>
      <td>0.056959</td>
    </tr>
    <tr>
      <th>1</th>
      <td>im12</td>
      <td>-1.450806</td>
      <td>-9.102902</td>
      <td>4.674423e-16</td>
      <td>-0.774865</td>
      <td>150.820196</td>
      <td>80.551948</td>
      <td>197.417201</td>
      <td>0.352814</td>
    </tr>
    <tr>
      <th>2</th>
      <td>im14</td>
      <td>-4.065139</td>
      <td>-12.249568</td>
      <td>9.307408e-25</td>
      <td>-167.702091</td>
      <td>63.786543</td>
      <td>2631.432099</td>
      <td>13328.568729</td>
      <td>0.483957</td>
    </tr>
    <tr>
      <th>3</th>
      <td>im15</td>
      <td>-0.794975</td>
      <td>-4.738822</td>
      <td>4.716312e-06</td>
      <td>-3.883860</td>
      <td>129.676680</td>
      <td>633.537037</td>
      <td>1137.183093</td>
      <td>0.123078</td>
    </tr>
    <tr>
      <th>4</th>
      <td>im16</td>
      <td>2.945384</td>
      <td>5.090797</td>
      <td>9.909834e-07</td>
      <td>6.781831</td>
      <td>416.260022</td>
      <td>958.450617</td>
      <td>-1864.554669</td>
      <td>0.139397</td>
    </tr>
    <tr>
      <th>5</th>
      <td>im20</td>
      <td>-1.648286</td>
      <td>-2.007668</td>
      <td>4.636171e-02</td>
      <td>-13.246468</td>
      <td>237.348146</td>
      <td>1907.450617</td>
      <td>5051.475156</td>
      <td>0.024573</td>
    </tr>
    <tr>
      <th>6</th>
      <td>im3</td>
      <td>-0.984859</td>
      <td>-2.161950</td>
      <td>3.210802e-02</td>
      <td>-1.131035</td>
      <td>356.634817</td>
      <td>409.567901</td>
      <td>812.934461</td>
      <td>0.028384</td>
    </tr>
    <tr>
      <th>7</th>
      <td>im4</td>
      <td>-0.980505</td>
      <td>-3.820125</td>
      <td>1.909113e-04</td>
      <td>-2.828552</td>
      <td>54.845327</td>
      <td>158.217391</td>
      <td>313.350275</td>
      <td>0.084066</td>
    </tr>
    <tr>
      <th>8</th>
      <td>im5</td>
      <td>-2.025965</td>
      <td>-4.127940</td>
      <td>5.876291e-05</td>
      <td>-8.113608</td>
      <td>182.778643</td>
      <td>731.993827</td>
      <td>2214.988055</td>
      <td>0.096249</td>
    </tr>
    <tr>
      <th>9</th>
      <td>im6</td>
      <td>-4.229187</td>
      <td>-4.844803</td>
      <td>2.971827e-06</td>
      <td>-121.613061</td>
      <td>127.245149</td>
      <td>3659.018519</td>
      <td>19133.690516</td>
      <td>0.127933</td>
    </tr>
    <tr>
      <th>10</th>
      <td>im7</td>
      <td>1.625525</td>
      <td>2.395172</td>
      <td>1.776818e-02</td>
      <td>2.484907</td>
      <td>295.369181</td>
      <td>451.524691</td>
      <td>-282.440136</td>
      <td>0.034614</td>
    </tr>
    <tr>
      <th>11</th>
      <td>im9</td>
      <td>1.813731</td>
      <td>3.753044</td>
      <td>2.459916e-04</td>
      <td>8.697987</td>
      <td>109.011388</td>
      <td>522.778481</td>
      <td>-425.401096</td>
      <td>0.082813</td>
    </tr>
  </tbody>
</table>
</div>




```python
df_elasticity.main_category.unique()
```




    array(['im1', 'im12', 'im14', 'im15', 'im16', 'im20', 'im3', 'im4', 'im5',
           'im6', 'im7', 'im9'], dtype=object)




```python
list(set(df_cat.main_category.unique()) - set(df_elasticity.main_category.unique()))
```




    ['im11', 'im19', 'im17', 'im8', 'im2']



### 1.2 Price Elasticity Null Hypothesis Testing

#### **Null hypothesis: Does price change not affect demand?**

We reject the null hypothesis by only calculating the price elasticity of demand slope that counts with a p-value of less than 0.05
Following null hypothesis was rejected. Therefore, we can proceed with the results that is statistically significant proved the relation of impression demand with price changes

For the categories - `im2`,`im8`, `im11`, `im17`, `im19` we accept the Null Hypothesis


```python
print("Null Hypothesis Rejected:", len(df_elasticity), "out of", len(set(df_cat['main_category'])) )
```

    Null Hypothesis Rejected: 12 out of 17


### 1.3 Price Elasticity Results

In the dataframe below, we can check that our t-score is above 1.96 or below -1.96, in addition to the p-value of less than 0.05. As a result, we can validate our alternative hypothesis which is

Are price changes influencing our demand?


```python
def divergent_plot(df, values_column, ylabel, xlabel):

    #Divergent plot
    df['ranking'] = df[values_column].rank( ascending = True).astype(int)
    df.sort_values(values_column, ascending =True, inplace = True)
    plt.figure(figsize = (12,5), dpi = 80)
    plt.hlines(y = df['main_category'] , xmin = 0, xmax = df[values_column], alpha = 0.5, linewidth = 3)
    
    #Add elasticity labels
    for x, y, tex in zip(df[values_column], df['main_category'] , df[values_column]):
        plt.text(x, y, round(tex, 2), horizontalalignment='right' if x < 0 else 'left', 
                 verticalalignment='center', fontdict={'color':'red' if x < 0 else 'green', 'size':10})
        
    # Axis and title
    plt.gca().set(ylabel= ylabel, xlabel= xlabel)
    plt.yticks(df['main_category'])
    plt.title(values_column , fontdict={'size':13})
    plt.grid(linestyle='--', alpha=0.5)
    plt.show()
            
    
    #Adjust Ranking column and print dataframe
    pd.set_option('display.width', 4000)
    cols = list(df.columns)
    cols = [cols[-1]] + cols[:-1]
    df = df[cols]
    
    df = df.iloc[:,:3]
    df.set_index('main_category', inplace=True)
    display(df)
```


```python
pe_plot = divergent_plot(df_elasticity, 'price_elasticity', 'Category', 'Price Elasticity')
```


    
&nbsp;
<img src="{{ site.baseurl }}/assets/price-elasticity-1.png">
&nbsp;
    



<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>ranking</th>
      <th>price_elasticity</th>
    </tr>
    <tr>
      <th>main_category</th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>im6</th>
      <td>1</td>
      <td>-4.229187</td>
    </tr>
    <tr>
      <th>im14</th>
      <td>2</td>
      <td>-4.065139</td>
    </tr>
    <tr>
      <th>im5</th>
      <td>3</td>
      <td>-2.025965</td>
    </tr>
    <tr>
      <th>im20</th>
      <td>4</td>
      <td>-1.648286</td>
    </tr>
    <tr>
      <th>im12</th>
      <td>5</td>
      <td>-1.450806</td>
    </tr>
    <tr>
      <th>im3</th>
      <td>6</td>
      <td>-0.984859</td>
    </tr>
    <tr>
      <th>im4</th>
      <td>7</td>
      <td>-0.980505</td>
    </tr>
    <tr>
      <th>im1</th>
      <td>8</td>
      <td>-0.882002</td>
    </tr>
    <tr>
      <th>im15</th>
      <td>9</td>
      <td>-0.794975</td>
    </tr>
    <tr>
      <th>im7</th>
      <td>10</td>
      <td>1.625525</td>
    </tr>
    <tr>
      <th>im9</th>
      <td>11</td>
      <td>1.813731</td>
    </tr>
    <tr>
      <th>im16</th>
      <td>12</td>
      <td>2.945384</td>
    </tr>
  </tbody>
</table>
</div>


### 1.3.1 Price Elasticity Conclusion

Demand is said to be elastic when demand has a higher proportionate response to a smaller change in price. On the other hand, demand is inelastic when there is little movement in demand with a significant difference in price.

We can analyze in the results that the largest price elasticies are:

- `im6`: PED of -4.23. In other words: a 10% price increase in `im6`, it decreases demand by **42.3%**
      
- `im16`: PED of 2.95. In other words: a 10% price increase in `im16`, it increases demand by **29.5%**
    
**Additional Information to take into consideration:**

In the growth phase of the product life cycle, the product will tend to be fairly inelastic. This is because of the nature of the demand. People buying at this stage will tend to be 'innovators' and they are prepared to take risks with new products and are willing to pay a high price to have the latest technology.

However, as the product moves towards maturity, the elasticity will increase. The amount of competition will increase and the increasing number of substitutes will make consumers more price sensitive. The nature of the consumers will also change and they are likely to be more motivated to buy by factors like price, functionality and reliability.

## 2. Cross - Price Elasticity

Cross-price elasticity help the marketer to know the naturality of main competitors related to price, which it help to analyze the sensitivity of one price against other competitors prices. As for instance, does our product impression demand increase, if our direct competitor Y increases their prices on the same or similar electronic products within a certain timeframe?

<div>
<img src="{{ site.baseurl }}/assets/cross_price.jpg" width="500"/>
</div>

### 2.1 Cross - Price Elasticity Matrix Function (Multi Linear Regression)
In following function:

Multiple dataframes with x values features of the entire sample of category within their prices of 2017, 2018, 2019 and 2020 and a dependent variable that reflect the demand of each respective category for the analysis were iterrated for coefficient matrix.

Coefficient (slope) values that reflect the change in competitors price divided by the change in respective product quantity and obtained a p-value of less than .05 were labelled as no effect due that the null hypothesis cannot be rejected


```python
def crossprice_(df_x, df_y, column_name):
    import statsmodels.api as sm
    
    #grab all X_values
    new_df = df_x.copy()
    #grab y_value with same column name
    new_df['y_value-' + column_name] = df_y[column_name]
    
    multi_xvalues = new_df.loc[:, new_df.columns[1:-1]]
    multi_yvalue = new_df.loc[:, new_df.columns[-1]]
    
    #get price mean values per product
    mean_xvalues = np.mean(multi_xvalues)
    #get mean quantity for y value
    mean_yvalue = np.mean(multi_yvalue)
    
    # Multilinear regression
    X = sm.add_constant(multi_xvalues)
    model = sm.OLS(multi_yvalue, X, missing='drop')
    result = model.fit()
    
    #get results
    results_summary = result.summary()
    #get pvalues of each coefficient
    pvalue = result.pvalues
    
    #transform summary result to a table
    results_as_html = results_summary.tables[1].as_html()
    new_dataframe = pd.read_html(results_as_html, header=0, index_col=0)[0]
    
    #add p value to the table
    new_dataframe['p_value']= pvalue
    
    #set product namain_categoryme as index
    new_dataframe.index.name = 'main_category'
    new_dataframe.reset_index()
    
    #get each product name price mean
    new_dataframe['mean'] = mean_xvalues
    # execute cross-price formula
    new_dataframe['price_elasticity'] = (new_dataframe.coef) * (new_dataframe['mean'] / mean_yvalue)

    new_dataframe = new_dataframe.reset_index()
    pvalue_significant = new_dataframe['p_value']
    
    #Chech null hypothesis for coefficient or slope value per product
    new_dataframe[column_name+'_CPE'] = np.where((pvalue_significant > .05), 'No effect', new_dataframe['price_elasticity'])
    new_dataframe = new_dataframe.dropna()
    
    return new_dataframe[['main_category', column_name + '_CPE']]
```


```python
x_values.columns[1:]
```




    Index(['im1', 'im11', 'im12', 'im14', 'im15', 'im16', 'im17', 'im19', 'im2', 'im20', 'im3', 'im4', 'im5', 'im6', 'im7', 'im8', 'im9'], dtype='object')




```python
result_df = pd.DataFrame()
for column in x_values.columns[1:]:
    result_df[['main_category', column + '_CPE']] = crossprice_(x_values, y_values, column)
    result_df = result_df.dropna()
    result_df[column+'_CPE'] = pd.to_numeric(result_df[column+'_CPE'], errors='coerce').fillna(0)
```


```python
result_df = result_df.set_index('main_category')
```


```python
result_df.head()
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>im1_CPE</th>
      <th>im11_CPE</th>
      <th>im12_CPE</th>
      <th>im14_CPE</th>
      <th>im15_CPE</th>
      <th>im16_CPE</th>
      <th>im17_CPE</th>
      <th>im19_CPE</th>
      <th>im2_CPE</th>
      <th>im20_CPE</th>
      <th>im3_CPE</th>
      <th>im4_CPE</th>
      <th>im5_CPE</th>
      <th>im6_CPE</th>
      <th>im7_CPE</th>
      <th>im8_CPE</th>
      <th>im9_CPE</th>
    </tr>
    <tr>
      <th>main_category</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>im1</th>
      <td>-0.871941</td>
      <td>-0.761570</td>
      <td>-0.849709</td>
      <td>-0.730116</td>
      <td>-0.455718</td>
      <td>-0.573213</td>
      <td>-0.572681</td>
      <td>-0.693460</td>
      <td>-0.783620</td>
      <td>-0.596852</td>
      <td>-0.540368</td>
      <td>-0.621090</td>
      <td>-0.591913</td>
      <td>-0.594411</td>
      <td>-0.468474</td>
      <td>-0.738144</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>im11</th>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>im12</th>
      <td>-0.768491</td>
      <td>-0.801435</td>
      <td>-1.476149</td>
      <td>-0.547116</td>
      <td>-0.474836</td>
      <td>-0.438573</td>
      <td>-0.429513</td>
      <td>-0.755072</td>
      <td>-0.442096</td>
      <td>-0.534293</td>
      <td>0.000000</td>
      <td>-0.920646</td>
      <td>-0.523837</td>
      <td>-0.568147</td>
      <td>-0.479859</td>
      <td>0.000000</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>im14</th>
      <td>-3.499619</td>
      <td>-2.363110</td>
      <td>-4.095781</td>
      <td>-4.775800</td>
      <td>-4.976650</td>
      <td>-3.293312</td>
      <td>-4.390304</td>
      <td>-2.383576</td>
      <td>-3.736959</td>
      <td>-3.469630</td>
      <td>-3.270500</td>
      <td>-3.616888</td>
      <td>-4.488972</td>
      <td>-3.047850</td>
      <td>-2.285778</td>
      <td>-2.965870</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>im15</th>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.0</td>
    </tr>
  </tbody>
</table>
</div>



### 2.2 Cross - Price Elasticity `im16` Case
As an example, we analyze cross-price elasticity for `im16` category, which it would provide following conclusions:

- if other categories change their prices, what it would happen to category `im16` demand?


```python
x_values.columns[1:]
```




    Index(['im1', 'im11', 'im12', 'im14', 'im15', 'im16', 'im17', 'im19', 'im2', 'im20', 'im3', 'im4', 'im5', 'im6', 'im7', 'im8', 'im9'], dtype='object')




```python
result_df.nlargest(3,result_df.columns[5])
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>im1_CPE</th>
      <th>im11_CPE</th>
      <th>im12_CPE</th>
      <th>im14_CPE</th>
      <th>im15_CPE</th>
      <th>im16_CPE</th>
      <th>im17_CPE</th>
      <th>im19_CPE</th>
      <th>im2_CPE</th>
      <th>im20_CPE</th>
      <th>im3_CPE</th>
      <th>im4_CPE</th>
      <th>im5_CPE</th>
      <th>im6_CPE</th>
      <th>im7_CPE</th>
      <th>im8_CPE</th>
      <th>im9_CPE</th>
    </tr>
    <tr>
      <th>main_category</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>im7</th>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>1.674811</td>
      <td>2.006703</td>
      <td>1.829216</td>
      <td>1.895336</td>
      <td>1.778045</td>
      <td>0.000000</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.000000</td>
      <td>0.0</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>im2</th>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.000000</td>
      <td>1.816383</td>
      <td>1.529003</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>1.694816</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>1.765244</td>
      <td>0.0</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>im11</th>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.000000</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.000000</td>
      <td>0.0</td>
      <td>0.0</td>
    </tr>
  </tbody>
</table>
</div>




```python
test_largest = result_df.nlargest(3,result_df.columns[5])[[result_df.columns[5]]]
test_smallest = result_df.nsmallest(3,result_df.columns[5])[[result_df.columns[5]]]
frames = [test_smallest, test_largest]

result = pd.concat(frames).reset_index()
```


```python
result
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>main_category</th>
      <th>im16_CPE</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>im6</td>
      <td>-5.250935</td>
    </tr>
    <tr>
      <th>1</th>
      <td>im14</td>
      <td>-3.293312</td>
    </tr>
    <tr>
      <th>2</th>
      <td>im1</td>
      <td>-0.573213</td>
    </tr>
    <tr>
      <th>3</th>
      <td>im7</td>
      <td>2.006703</td>
    </tr>
    <tr>
      <th>4</th>
      <td>im2</td>
      <td>1.816383</td>
    </tr>
    <tr>
      <th>5</th>
      <td>im11</td>
      <td>0.000000</td>
    </tr>
  </tbody>
</table>
</div>




```python
im2 = divergent_plot(result, result.columns[1], 'Category', 'Cross-Price Elasticity' )
```


    
&nbsp;
<img src="{{ site.baseurl }}/assets/price-elasticity-2.png">
&nbsp;
    



<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>ranking</th>
      <th>im16_CPE</th>
    </tr>
    <tr>
      <th>main_category</th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>im6</th>
      <td>1</td>
      <td>-5.250935</td>
    </tr>
    <tr>
      <th>im14</th>
      <td>2</td>
      <td>-3.293312</td>
    </tr>
    <tr>
      <th>im1</th>
      <td>3</td>
      <td>-0.573213</td>
    </tr>
    <tr>
      <th>im11</th>
      <td>4</td>
      <td>0.000000</td>
    </tr>
    <tr>
      <th>im2</th>
      <td>5</td>
      <td>1.816383</td>
    </tr>
    <tr>
      <th>im7</th>
      <td>6</td>
      <td>2.006703</td>
    </tr>
  </tbody>
</table>
</div>


### 2.2.1 Cross - Price Elasticity `im16` Conclusion
Regarding negative cross-price elasticities, it means that these categories are complements not substitutes. In other words from our sample data, we can analyze that when prices of categories `im6`, `im14`, `im1` goes up that means that our demand in `im16` decreases.

- As for instance an increase of 10% in `im6` price, it will decreases our demand by **52.51%**

Regarding positive cross-price elasticities, it means that these categories are substitutes (main competitors). In other words from our sample data, we can analyze that the main competitors of the category `im16` are `im7` and `im2`.

- As for instance, if `im7` increases their price by 10%, our demand would tend to increase up to **20%**

As a conclusion, cross-price elasticities would help the marketer to measure price sensitivity in comparison with other categories and will help to know the naturality of competition(substitutes) and the naturality of complementation regarding pricing strategies

Having a base price we can optimize the price for next days/weeks using the following formula:


```python
def calculate_revenue(price, elasticity):
    return price * (1 - elasticity * price)
```
