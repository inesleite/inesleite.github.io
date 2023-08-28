---
layout: post
title:   "What are the Differences between Recursion and Iteration"
date:    2022-02-27
tags:    [Programming, C_C_plus_plus]
---
[2022/06/16]

## Brief ##
Iteration and recursion are key computer science technique using in developing algorithm and programming. In simple terms, an iterative function is one that loops to repeat some part of the code, and a recursive function is one that calls itself again to repeat the code. Both of two terms repeatedly execute the set of instructions. In this post, I would like to record a few pieces of information for avoiding to forget bit and pieces and also hope to be helpful.

## The Basic Concept of Recrusion and Iteration ##

#### Recrusion  ####
The distinctive feature of a recursive function is that, when called, it may result in more calls to itself. For a simple example, here is the calculation of factorial function by recrusion:

<div class="language-shell highlighter-rouge"><pre class="highlight"><code class="hljs ruby"><span class="nb" style="font-size: 80%">double Factorial(int n)
{
    double factorial;
    if (n == 0) factorial = 1;
    else factorial = n * Factorial(n -1);
}</span></code></pre></div>

Each time factorial function is called recursively, a new level of recursion is created. To be specific, whenever you call a function, including recursively. the return address and often the arguments are pushed onto the [call stack][callstack]. 

However, the stack is finite, so if the recursion is too deep you'll eventually run out of stack space and see an error message saying something like "Function call stack overflow".

Note that:
- The command "ulimit -s" could display the size of the stack is configurble on Unix.
- Given that the function is [tail-call recursion][tail], some compilers might be able to optimize the recursive call away by turning it into a jump.

#### Iteration ####
Iteration is when the same procedure is repeated multiple times. There are two types of iterative loops: for-loop and while-loop. For a simple example, here the the calculation of factorial function by for-loop interation:

<div class="language-shell highlighter-rouge"><pre class="highlight"><code class="hljs ruby"><span class="nb" style="font-size: 80%">int main(int argc, char *argv[])
{
    auto start = chrono::steady_clock::now();

    double factorial = 1;

    for (int i = 0; i < 10000; ++i) {
        factorial = factorial * i;
    }
}</span></code></pre></div>

Iteration use repetition structure and does not use the stack so it's faster than recursion and the memory allocation is less than that of an recursion function.

#### Analysis of Runtime between Recrusion and Iteration ####

<div class="language-shell highlighter-rouge"><pre class="highlight"><code class="hljs ruby"><span class="nb" style="font-size: 80%">$ ./factorial
Iteration: Elapsed time in nanoseconds: 34325 ns
Recursion: Elapsed time in nanoseconds: 370471 ns</span></code></pre></div>

#### Simple Example:  pow(x, n) ####
Implement pow(x, n), which calculates x raised to the power n (i.e., x^n).

Iteration:
<details markdown=block>
<summary markdown=span>*iteration_power.cc*</summary>
<div class="language-shell highlighter-rouge"><pre class="highlight"><code class="hljs ruby"><span class="nb" style="font-size: 80%">double myPow(double x, int n) {
    int flag = 0;
    double res = 1;
    if( n < 0 )
    {
        flag = 1;
        n = abs(n);
    }
    while( n > 0 )
    {
        if( n & 1 )
            res = res*x;
        x = x*x;
        n >>= 1;
    }
    if(flag)
        res = 1/res;
    return res;
}</span></code></pre></div></details>

Recrusion:
<details markdown=block>
<summary markdown=span>*recrusion_power.cc*</summary>
<div class="language-shell highlighter-rouge"><pre class="highlight"><code class="hljs ruby"><span class="nb" style="font-size: 60%">double myPow(double x, int n) {
    if (n == 0) return 1;
    if (n<0) return 1/x * myPow(1/x, -(n+1));
    if (n%2 == 0) return myPow(x*x, n/2);
    else return x*myPow(x*x, n/2);
}</span></code></pre></div></details>


Now, as you can see, the recursion approach is executed much slowerly than iteration approach.

=========== To be continued…. ==========

## Reference ##
[1] [Iteration & Recursion](https://www.advanced-ict.info/programming/recursion.html)

[2] Stackoverflow: [Recursion or Iteration?](https://stackoverflow.com/questions/72209/recursion-or-iteration/72694#72694), [Stack overflow caused by recursive function](https://stackoverflow.com/questions/15976333/stack-overflow-caused-by-recursive-function)

[3] [Is recursion ever faster than looping?](https://stackoverflow.com/questions/2651112/is-recursion-ever-faster-than-looping/2651200#2651200)

[4] [When To Use Recursion/When To Use Iteration](https://www.csie.ntu.edu.tw/~course/10420/Resources/lp/node37.html)

[5] [Programming Iterative Loops](https://web.stanford.edu/group/sisl/k12/optimization/MO-unit1-pdfs/1.8iterativeloops.pdf)

[tail]:https://en.wikipedia.org/wiki/Tail_call "https://en.wikipedia.org/wiki/Tail_call"

[callstack]:https://en.wikipedia.org/wiki/Call_stack "https://en.wikipedia.org/wiki/Call_stack"
