---
layout: post
title: Memory Section Size
tags: [Processor] 
---

## Purpose
In order to analyze the code size when implementing C program, we need to understand the meaning of memory section calculated by IDE tool. The memory size can be roughly classified into five sections. 

In this post, I made a copy about the memory section size from xtensa C application programmer's help and recorded the relevant information to quickly look up. 

## Memory Section Size

<h5><ol>
    <li>The .text section contains instruction code.</li>  
    <li>The .data section contains initialized global variables.</li>
    <li>The .bss section contains un-initialized global variables.</li>
    <li>The .rodata section contains read-only global variables, constants, jump tables, etc.</li>
    <li>The .literal section contains literals (32-bit contstants) used in the code. (These sections are specific to the Xtensa architecture)</li>
</ol></h5>

Additionally, the **.text** section is assigned to IRAM, while **.data** section is assigned to DRAM. For the memory map, indicating how memory is laid out, code (.text) is in local instruction memory, while data (.data, .bss) is in system memory.

Example:
<figure>
<a><img src="{{ site.baseurl }}/picture/memory_section.PNG"></a>
</figure>

#### Jump tables
The jump tables are an efficient way of handing similar events in C/C++ program because they offer a unique blend of compactness and execution speed, particularly on microprocessors that support indexed addressing. We can look at the use of arrays of function pointers as jump tables.

Example 1. Simple pseudo code: 
<div class="language-shell highlighter-rouge"><pre class="highlight" style="font-size:12px" ><code class="hljs ruby"><span class="nb">void test(uint8_t const idx) {
  static void (*pf[])(void) = {func_a, func_b, func_c, ..., func_z};
  if (idx < sizeof(pf) / sizeof(*pf)) {
      /* Call the function specified by idx */
      pf[idx]();
  }
}</span></code></pre></div>

In this example, by declaring the static array within the function, no one else can access the jump table.

Example 2. Pseudo code for timed task:
<div class="language-shell highlighter-rouge"><pre class="highlight" style="font-size:12px"><code class="hljs ruby"><span class="nb">#define INTERVAL_16_MSEC 16
#define INTERVAL_50_MSEC 50

void fnA();
void fnB();

typedef struct {
   char interval;          /* How often to call the task */
   void (*proc)(void);     /* pointer to function returning void */
} TIMED_TASK;

static const TIMED_TASK timed_task[] = {
  { INTERVAL_16_MSEC,  fnA},
  { INTERVAL_50_MSEC,  fnB},
  { 0, NULL }
};

int main(void) {
  const TIMED_TASK *ptr;

  for (ptr = timed_task; ptr->interval != 0; ptr++)
  {
      /* Time to call the function */
      (ptr->proc)();
  }
  return 0;
}

void fnA(){}
void fnB(){}</span></code></pre></div>

## Memory map
A memory map is a sequence of memory description and optional parameter assignments.

Each memory description has the following format:

<div class="language-shell highlighter-rouge"><pre class="highlight" style="font-size:12px"><code class="hljs ruby"><span class="nb">BEGIN < name >
< addr > [,< paddr >] : < mem-type > : < mem-name > : < size > [,< psize >]: [writable] [,executable] [,device] ;
< segment >*
END < name ></span></code></pre></div>

Example:
<div class="language-shell highlighter-rouge"><pre class="highlight" style="font-size:12px"><code class="hljs ruby"><span class="nb">BEGIN iram0
0x40000000: instRam : iram0 : 0x20000 : executable, writable ;
 iram0_0 : C : 0x40000000 - 0x4000000f : .DebugExceptionVector.literal;
 iram0_1 : F : 0x40000010 - 0x4000001b : .DebugExceptionVector.text;
 iram0_2 : C : 0x4000001c - 0x4000001f : .NMIExceptionVector.literal;
 iram0_3 : F : 0x40000020 - 0x4000002b : .NMIExceptionVector.text;
 iram0_4 : C : 0x4000002c - 0x4000002f : .KernelExceptionVector.literal;
 iram0_5 : F : 0x40000030 - 0x4000004b : .KernelExceptionVector.text;
 iram0_6 : C : 0x4000004c - 0x4000004f : .UserExceptionVector.literal;
 iram0_7 : F : 0x40000050 - 0x4000006b : .UserExceptionVector.text;
 iram0_8 : C : 0x4000006c - 0x4000006f : .DoubleExceptionVector.literal;
 iram0_9 : F : 0x40000070 - 0x4000007f : .DoubleExceptionVector.text;
 iram0_10 : C : 0x40000080 - 0x4001ffff : .iram0.literal .iram0.text;
END iram0</span></code></pre></div>

=========== To be continued.... ==========

## Reference
[1] Xtensa C Application Programmer's Help

[2] [How to Create Jump Tables via Function Pointer Arrays in C and C++](https://barrgroup.com/Embedded-Systems/How-To/C-Function-Pointers)

[3] [Memory map](https://en.wikipedia.org/wiki/Memory_map)

## Note
<p>If you have any constructive criticism or advises, leave the comments below or feel free to email me qazqazqaz850@gmail.com.

Hope this post will help! :)
</p>
