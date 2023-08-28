---
layout: post
title: Basic Matrix Calculus for Machine Learning 
tags: [Mathematics]
---

## Purpose 

In response to the demand of AI technique in the market and its application covers many fields, such as  voice and audio analysis, speech recognition and AI-optimized Hardware, etc., more and more companies gradually imported machine learning or deep learning algorithm into their system or architecture.

Recently, due to the assigned task, I start to research the machine learning for speech recognition. So, I sort out the basic machine learning theorem from the internet in this post.   
## Gradient descent

The gradient descent algorithm aims to minimise some cost function based on the function's gradient. Successive iterations are employed to progressively approach either a local or global minimum of the cost function.

### Stochastic gradient descent

Stochastic gradient descent is an iterative algorithm for minimizing a differentiable convex function through evaluating the cost function after each sample and then updating the weight parameters. The machine learning uses this algorithm to consider the problem of minimizing an objective function (loss function) that has the form of a sum 

$$ f(w) = \frac{1}{n}\sum_{i=1}^{n}f_i(w) $$

where the parameter $$w$$ that minimizes $$f(w)$$ is to be estimated, also named as weights. Each summand function $$f_i(w)$$ is typically associated with the i-th observation in the data set (used for training), and also be represented as $$f(w, x_i, y_i)$$ refer to each training sample, where the $$x_i$$ is the i-th observation and $$y_i$$ is the i-th target sample. The sum-minimization problem also arises for empirical risk minimization, In this case, $$f_i(w)$$ is the value of the i-th example, and $$f(w)$$ is the empirical risk.

#### Iterative method

In stochastic gradient descent, the true gradient of $$ f(w) $$ is approximated by a gradient at a single example (single step):

$$ w = w - \eta \nabla{f_i(w)}  $$

where the parameter $$ \eta $$ is the  learning rate. As the algorithm sweeps through the training set, it performs the above update for each training example. In pseudocode, the stochastic gradient descent can be presented as follows:

<ol>
<li>Choose an initial vector of parameters w and learning rate η.</li>
<li>Repeat finite iterations to obtain an approximate minimum (local minimum): (Randomly move examples in the training set)
</li>
For i = 1,2, ..., n, do: 
$$w = w - η ∇{f_i(w)}$$ (Randomly shuffle an examplea in the training set.)
</ol>

#### Example

Suppose that we want to fit a straight line $$ y = w_2\,x + w_1 $$ to a training set with observations $$(x_1, x_2, x_3, \ldots, x_n)$$ and corresponding estimated responses $$(\widehat{y}_1, \widehat{y}_2, \widehat{y}_3, \ldots, \widehat{y}_n)$$ using least squares. The objective function (loss function) to be minimized is

$$f_i(\mathbf{w}) =  ||\hat{y}_i - y_i ||^2 = ||\mathbf{x}_i^* \mathbf{w} - y_i ||^2 $$

, where $$ \mathbf{w} = \left[ \begin{array}{c} w_1 \\ w_2 \end{array} \right]  $$ and $$ \mathbf{x}_i = \left[ \begin{array}{c} 0 \\ x_i \end{array} \right]  $$

Then, reperting finite iterations to obtain an approximate minimum (local minimum):

For i = 1,2, ..., n, do:                                                   
$$\mathbf{w} = \mathbf{w} - η ∇{f_i(\mathbf{w})}$$


## Matrix derivatives

### Types and notational conventions

There are six common kinds of derivatives that can be most neatly organized in matrix form are collected in the following table

<table style="width:100%" border-collapse: separate>
  <tr>
    <th>Types</th>
    <th>Scalar</th>
    <th>Vector</th>
    <th>Matrix</th>
  </tr>
  <tr>
    <th>Scalar</th>
    <th> $$\frac{\partial{y}}{\partial{x}}$$ </th>
    <th> $$\frac{\partial{\mathbf{y}}}{\partial{x}}$$ </th>
    <th> $$\frac{\partial{\mathbf{Y}}}{\partial{x}}$$ </th>
  </tr>
  <tr>
    <th>Vector</th>
    <th> $$\frac{\partial{y}}{\partial{\mathbf{x}}}$$ </th>
    <th> $$\frac{\partial{\mathbf{y}}}{\partial{\mathbf{x}}}$$ </th>
  </tr>
  <tr>
    <th>Matrix</th>
    <th> $$\frac{\partial{y}}{\partial{\mathbf{X}}}$$ </th>
  </tr>
</table>

Also, there are two competing notational conventions, numerator-layout and denominator-layout notation. In this post, I only focus on the numerator-layout notation, as shown below.

$$ 
\frac{\partial{\mathbf{y}}}{\partial{x}} = 
  \left[ \begin{array}{c} 
    \frac{\partial{y_1}}{\partial{x}} \\ 
    \frac{\partial{y_2}}{\partial{x}} \\
    \vdots \\
    \frac{\partial{y_m}}{\partial{x}} 
  \end{array} \right], 
\frac{\partial{y}}{\partial{\mathbf{x}}} =
  \left[ \begin{array}{c} \frac{\partial{y}}{\partial{x_1}}, \frac{\partial{y}}{\partial{x_2}}, \ldots, \frac{\partial{y}}{\partial{x_n}} 
  \end{array} \right], \\
$$

### Derivatives of Matrices, Vectors and Scalar Forms

Referring to the Matrix Cookbook, I sorted out several commonly used derivatives:   

#### First Order

<table style="width:40%">
  <tr> <th> Expression </th> </tr>
  <tr>
    <th> $$\frac{\partial{a}}{\partial{\mathbf{x}}} = \mathbf{0}$$ </th>
  </tr>
  <tr>
    <th> $$\frac{\partial{f(\mathbf{x})g(\mathbf{x})}}{\partial{\mathbf{x}}} = f(\mathbf{x})\frac{g(\mathbf{x})}{\partial{\mathbf{x}}} + g(\mathbf{x})\frac{f(\mathbf{x})}{\partial{\mathbf{x}}}$$ </th>
  </tr>
  <tr>
    <th> $$\frac{\partial{\mathbf{y}^T\mathbf{x}}}{\partial{\mathbf{x}}} = \frac{\partial{\mathbf{x}^T\mathbf{y}}}{\partial{\mathbf{x}}} = \mathbf{y}^T$$ </th>
  </tr>
  <tr>
    <th> $$\frac{\partial{\mathbf{y}^T\mathbf{x}\mathbf{x}^T}\mathbf{z}}{\partial{\mathbf{x}}} = \mathbf{x}^T (\mathbf{y}\mathbf{z}^T + \mathbf{z}\mathbf{y}^T)$$ </th>
  </tr>
</table>


#### Derive the gradient of basic objective function (martix representation)
Derive that the gradient of $$f(\mathbf{W}) = ||\mathbf{W}\mathbf{x} - \mathbf{\hat{y}}||^2$$ (Numerator-layout notation):

Assuming that the specific matrix $$\mathbf{I}_{ij}$$ is as shown below,

$$
\begin{align*}
\mathbf{I}_{ij} = \left\{ \begin{array}{rcl} 
1 & \mbox{for} & \mbox{i-th row and j-th column} \\
0 & \mbox{for} & \mbox{otherwise}  
\end{array}\right.
\end{align*}
$$

According to the definition of derivative and gradient

$$
  \frac{\partial{f(\mathbf{W})}}{\partial{w_{ij}}} = \lim_{\epsilon\to 0} \frac{f(\mathbf{W} +\epsilon \mathbf{I}_{ij}) - f(\mathbf{W})}{\epsilon}, 
 \nabla{f(\mathbf{W})} = 
\left[ \begin{array}{lcr} 
  \frac{\partial{f(\mathbf{W})}}{\partial{w_{11}}} & \ldots &\frac{\partial{f(\mathbf{W})}}{\partial{w_{1m}}} \\ 
  \vdots & \ddots & \vdots \\
  \frac{\partial{f(\mathbf{W})}}{\partial{w_{n1}}} & \ldots &\frac{\partial{f(\mathbf{W})}}{\partial{w_{nm}}}
\end{array} \right] 
$$

First step, the result of derivative of $$w_{11}$$ is
$$
  \frac{\partial{f(\mathbf{W})}}{\partial{w_{11}}} = 2\mathbf{x}^T\mathbf{W}^T\mathbf{I}_{11}\mathbf{x} - 2\mathbf{\hat{y}}^T\mathbf{I}_{11}\mathbf{x}
$$

And in a similar way, it is easy to show that 
$$
\begin{align*}
 \nabla{f(\mathbf{W})} &= 
2 \left[ \begin{array}{lcr} 
\mathbf{x}^T\mathbf{W}^T\mathbf{I}_{11}\mathbf{x} & \ldots & \mathbf{x}^T\mathbf{W}^T\mathbf{I}_{1m}\mathbf{x} \\
\vdots & \ddots & \vdots \\
\mathbf{x}^T\mathbf{W}^T\mathbf{I}_{n1}\mathbf{x} & \ldots & \mathbf{x}^T\mathbf{W}^T\mathbf{I}_{nm}\mathbf{x}
\end{array} \right] -
2 \left[ \begin{array}{lcr} 
\mathbf{\hat{y}}^T\mathbf{I}_{11}\mathbf{x} & \ldots & \mathbf{\hat{y}}^T\mathbf{I}_{1m}\mathbf{x} \\
\vdots & \ddots & \vdots \\
\mathbf{\hat{y}}^T\mathbf{I}_{n1}\mathbf{x} & \ldots & \mathbf{\hat{y}}^T\mathbf{I}_{nm}\mathbf{x}
\end{array} \right] \\
\end{align*}
$$


Let's disassembling the specific identity matrixes and using the linear algebra properties to simplify above formulation,
$$
\begin{align*}
\mathbf{I}_{ij} = \mathbf{I}_{i} \mathbf{I}_{j}^*
\end{align*}
$$

where, $$\mathbf{I}_{i}$$ is a vector and as shown below
$$
\begin{align*}
\mathbf{I}_{i} = \left\{ \begin{array}{rcl} 
1 & \mbox{for} & \mbox{i-th row} \\
0 & \mbox{for} & \mbox{otherwise}  
\end{array}\right.
\end{align*}
$$

Then, the last term of $$ \nabla{f(\mathbf{W})} $$ can be transferred into below representation by linear transformation

$$
\begin{align*}
\left[ \begin{array}{cc} 
\mathbf{\hat{y}}^T\mathbf{I}_{11}\mathbf{x} &
\mathbf{\hat{y}}^T\mathbf{I}_{1m}\mathbf{x} \\
\mathbf{\hat{y}}^T\mathbf{I}_{n1}\mathbf{x} &
\mathbf{\hat{y}}^T\mathbf{I}_{nm}\mathbf{x}
\end{array} \right] = 
\left[ \begin{array}{cc}
\mathbf{I}_{1}^* \mathbf{\hat{y}}\mathbf{x}^T \mathbf{I}_{1} &
\mathbf{I}_{1}^* \mathbf{\hat{y}}\mathbf{x}^T \mathbf{I}_{m} \\
\mathbf{I}_{n}^* \mathbf{\hat{y}}\mathbf{x}^T \mathbf{I}_{1} &
\mathbf{I}_{n}^* \mathbf{\hat{y}}\mathbf{x}^T \mathbf{I}_{m} \\
\end{array} \right]  =\mathbf{\hat{y}}\mathbf{x}^T
\end{align*}
$$

Thus, in a similar way, we can get the final representation of gradient of $$f(\mathbf{W})$$, as shown below,

$$  \nabla{f(\mathbf{W})} = 2\mathbf{W}\mathbf{x}\mathbf{x}^T - 2\mathbf{\hat{y}}\mathbf{x}^T $$

## Reference

[1] [Wiki - Matrix_calculus](https://en.wikipedia.org/wiki/Matrix_calculus) 

[2] [The Matrix Cookbook](https://www.math.uwaterloo.ca/~hwolkowi/matrixcookbook.pdf)

[3] [Stochastic gradient descent](https://en.wikipedia.org/wiki/Stochastic_gradient_descent)

[4] [Stochastic Gradient Descent – Mini-batch and more](https://adventuresinmachinelearning.com/stochastic-gradient-descent/)

## Note
<p>If you have any constructive criticism or advises, leave the comments below or feel free to email me @qazqazqaz850@gmail.com.
Hope this post will help! :)
</p>


