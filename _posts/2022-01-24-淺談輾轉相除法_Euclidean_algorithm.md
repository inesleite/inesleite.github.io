---
layout: post
title:   "淺談輾轉相除法 - Euclidean Algorithm"
date:    2022-01-25
tags:    [Algorithms, Mathematics]
---

"In mathematics, the Euclidean algorithm, or Euclid's algorithm, is an efficient method for computing the greatest common divisor (GCD) of two integers (numbers), the largest number that divides them both without a remainder. It is named after the ancient Greek mathematician Euclid, who first described it in his Elements (c. 300 BC). It is an example of an algorithm, a step-by-step procedure for performing a calculation according to well-defined rules, and is one of the oldest algorithms in common use. It can be used to reduce fractions to their simplest form, and is a part of many other number-theoretic and cryptographic calculations."

## 簡介 ##
輾轉相除法是基本數學運算之一，用於求兩數最大公因數(GCD)。原理採用Divide-and-Conquer Method，簡單可以說是兩個數字互相相減，最後剩下構成兩個數字的共通單位，就是最大公因數。以下就簡略的練習如何計算:

## 簡易實作 ##
運算可分為三種方式：
<ul>
 <li>直覺運算法</li>
 <li>交換法</li>
 <li>遞迴法</li>
</ul>

### 直覺運算法 ###
- 保持用最大數除以較小的數，直到整除為止

<div class="language-shell highlighter-rouge"><pre class="highlight"><code class="hljs ruby"><span class="nb" style="font-size: 60%">int gcd(int a, int b) {
    while( a!=0 and b!=0 )
    {
        if( a >= b ) { a = a%b; }
        else if( b > a ) { b = b%a; }
    }
    return (a >= b) ? a : b;
}</span></code></pre></div>

### 交換法 ###
- 讓a保持被除數、b保持除數，相除之後互換
- 當除數為 0，即被除數為最大公因數

<div class="language-shell highlighter-rouge"><pre class="highlight"><code class="hljs ruby"><span class="nb" style="font-size: 60%">int gcd(int a, int b) {
    while (b!= 0) {
        int r = a % b;
        a = b;
        b = r;
    }
    return a;
}</span></code></pre></div>

### 遞迴法 ###
- 利用遞迴讓被除數a與除數b互換

<div class="language-shell highlighter-rouge"><pre class="highlight"><code class="hljs ruby"><span class="nb" style="font-size: 60%">if f (int a, int b) {
    if (b == 0) return a;
    return f(b, a%b);
}</span></code></pre></div>

## Reference ##

[1] [輾轉相除法(Euclidean algorithm)](https://www.csie.ntu.edu.tw/~b98902112/cpp_and_algo/cpp02/euclidean_algorithm.html)

[2] [Wiki: 輾轉相除法](https://zh.wikipedia.org/wiki/輾轉相除法)

[3] [Divisor](http://web.ntnu.edu.tw/~algo/Divisor.html)
