---
layout: post
title: Introduce Tensilica Instruction Extension Language
tags: [Tensilica, Processor]
---

## Purpose

Tensilica Instruction Extension (TIE) refers to the proprietary language that is used to add assembly/instruction extensions to customize Xtensa processor core architecture for a specific application or design purpose. Optimizing Candence Tensilica Xtensa processors with new instructions and additional bandwidth using the TIE language enables you to compute and move data tens or hundreds of times faster than conventional processors, resulting in an SoC that is smaller, cheaper, faster, and consumes less energy.

## What is TIE, TIE intrinsic and TIE ctypes?

### TIE and TIE intrinsic

TIE is used to describe assembly/instruction extensions at a high level of abstraction. This syntax is a mixture of Verilog and C that describes how the instruction extensions are used by software.

TIE developers can define operations on user-defined TIE data types to use standard C operators, allowing C programmers to use a more natural programming style. without intrinsics. On the other hand, with intrinsics, the developers enable use TIE instructions in C or C++ programs. There are three senarios invoking a TIE Intrinsic in C/C++ Code:

<ol>
<li> Scenario 1: Intrinsic with one output argument </li>
<div class="language-shell highlighter-rouge"><pre class="highlight"><code class="hljs ruby"><span class="nb">extern unsigned _TIE_test_AVG(unsigned y, unsigned x);

#define AVG _TIE_test_AVG
c = AVG (a, b);
</span></code></pre></div>

<li> Scenario 2: Intrinsic with no output, or more than on output arguments </li>
<<div class="language-shell highlighter-rouge"><pre class="highlight"><code class="hljs ruby"><span class="nb">extern unsigned _TIE_test_SPLI(short hi /*output*/, short lo /*output*/, unsigned inp);

#define AVG _TIE_test_SPLI
_TIE_test_SPLI(hi, lo, a);
</span></code></pre></div>

<li> Scenario 3: Intrinsic with inout arguments </li>
<div class="language-shell highlighter-rouge"><pre class="highlight"><code class="hljs ruby"><span class="nb">extern unsigned _TIE_test_MAC(unsigned y, unsigned x, unsigned acc /*inout*/);

#define AVG _TIE_test_MAC
_TIE_test_MAC(a, b, accum);
</span></code></pre></div>

</ol>

### TIE ctypes

The developers also can depoly the user data types, known as TIE ctypes in TIE intrinsics. The TIE ctypes entend to ANSI C type system and make it possible to use data of arbitrary width in intrinsics, not restricted to using char, short, int, etc. The XCC treats TIE ctypes and ANSI C data types exactly the same. However. TIC ctypes often have their own register files. 

<div class="language-shell highlighter-rouge"><pre class="highlight"><code class="hljs ruby"><span class="nb">extern void _TIE_xt_hifi2_AE_MULA(ae_q56s d, ae_p24x2s d0, ae_p24x2s d1);

#define AE_MULA _TIE_xt_hifi2_AE_MULA
</span></code></pre></div>

When using variables of TIE ctypes, there are several rules to remember:

<ol>
<li> Ctype variables can be arguments to a C/C++ function. </li>
<li> C/C++ function can return values for a ctype variable. </li>
<li> Developers cannot print value of a TIE ctype variable using printf().</li>
<li> Ctype variables can be viewed in the Debugger View of Xplorer, default display format is hex. </li>
<li> Developers need to "instruct" XCC to load a value into a TIE ctype variable by: </li>

<div class="language-shell highlighter-rouge"><pre class="highlight"><code class="hljs ruby"><span class="nb">// Step 1: initialize an C data type array in memory
unsigned int temp[4] __attribute__((aligned(16))) = 
{ 0x11111111, 0x22222222, 0x33333333, 0x44444444  };

// Step 2: cast vec pointer to array
vec *vp = (vec*) temp;

// Step 3: load value in to vec variable
vec va = *vp;
</span></code></pre></div>

</ol>

## Reference

[1] Tensilica Instruction Extension Language User's Guide

[2] [TIE Language - The fast path to high-performance embedded SoC processing](https://ip.cadence.com/uploads/980/TIP_WP_TIE_FINAL-pdf)

## Note
<p>If you have any constructive criticism or advises, leave the comments below or feel free to email me @qazqazqaz850@gmail.com.
Hope this post will help! :)
</p>
