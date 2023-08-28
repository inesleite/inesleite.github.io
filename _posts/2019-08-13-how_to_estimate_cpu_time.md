---
layout: post
title: How to estimate CPU time
tags: [Processor] 
---

## Purpose

To analyze the c programming performance, the CPU time is one of the good indications of how to measure user CPU time, system CPU time, and wall clock time.

For avoiding to forget bit and pieces of how to measure CPU time in C programming, I found some relevant information and recorded in this post. 

## C library function - clock()

### Description 

   The C lib function clock_t clock(void) returns the number of clock ticks elapsed. To get the number of seconds used by the CPU, you will need to divide by CLOCKS_PER_SEC. Generally, on a 32-bit system, the CLOCKS_PER_SEC equals 1000000.

#### Example
<div class="language-shell highlighter-rouge"><pre class="highlight"><code class="hljs ruby"><span class="nb">#include < stdio.h >
#include < stdlib.h >
#include < sys/times.h >
#include < time.h >

int
main(int argc,char **argv) {

  //To find MIPS
  clock_t start_t, end_t;
  int i;

  // In the initialization portion of the code:
  start_t = clock();

  // Code to be profiled
  /****** Code to be profiled ******/
  printf("Starting of the program, start_t = %ld\n", start_t);
  for (i = 0; i < 10000000; i++) {
  }
  /*****************************/

  end_t = clock();

  // Print the information about the CPU time
  printf("End of the big loop, end_t = %ld\n", end_t);
  printf("Total time taken by CPU= %5.3f seconds\n",
      (((double) (end_t - start_t)) / CLOCKS_PER_SEC));
  return 0;
}</span></code></pre></div>

#### Result
<div class="language-shell highlighter-rouge"><pre class="highlight"><code class="hljs ruby"><span class="nb">Starting of the program, start_t = 631
End of the big loop, end_t = 13142
Total time taken by CPU= 0.013 seconds</span></code></pre></div>

=========== To be continued.... ==========

## Reference
[1] [Linux Programmer's ManualC library function - clock()](https://www.tutorialspoint.com/c_standard_library/c_function_clock)

[2] [程式/程序執行時間分析（user cpu time, system cpu time, elpapsed time）](https://www.itread01.com/content/1544395890.html)


## Note
<p>If you have any constructive criticism or advises, leave the comments below or feel free to email me @qazqazqaz850@gmail.com.

Hope this post will help! :)
</p>
