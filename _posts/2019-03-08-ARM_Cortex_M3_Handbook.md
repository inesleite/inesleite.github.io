---                                                                                                                                                                                      
layout: post
title: ARM Cortex M3 Handbook
tags: [Processor]
---

## Purpose

  The internet of things (IoT) is the one of the fastest growing and highest profile trends in technology. Conforming to this trend, the ARM launched Cortex-M3 processor. This processor has been central to many of these innovations in the IoT space, such as Fitbit, smart light bulb and wifi router. Previous generations of embedded products extensively used 8-bit and 16-bit processors, limiting functionality to only controlling low-level operations. The Cortex-M3 changed this by making 32-bit processors easily usable for these lower-level functional areas, at the same time supporting new features that have provided increased sophistication both for general embedded applications and sensor devices.

  Additionally, the ARM has extended its product portfolio by diversifying its CPU development, which resulted in the new processor family name "Cortex.". The M profile is designed for deeply embedded microcontroller-type systems targeting smaller scale applications such as mixed signal design, where criteria like low cost, low power, energy efficiency, and low interrupt latency are important. At the same time, the processor design has to be easy to use and able to provide deterministic behavior as required in many real-time control systems. Thus, Fortemedia plans to adopt this new processor in their next hardware design.

## Handbook of project tasks

### Simulation Procedure task

#### The build configuration

In the .../logical/testbench/execution_tb directory, the build configuration supports three C compiler tool (ds5,gcc,keil) and three simulator tools (mti/vcs/ius). The developer can manually modifies these options. In my developing environment, default setting adopts "gcc-arm-none-eabi-5_4-2016q2" C compiler tool and "Verdi3_K-2015.09-SP2"vcs simulator tools. ( reference [3] is gcc-arm tool download link) The developer can check more detail of build configuration in Makefile and Makefile.CXDT files.

In the .../logical/testbench/execution_tb directory, the build configuration supports three C compiler tool (ds5,gcc,keil) and three simulator tools (mti/vcs/ius). The developer can manually modifies these options. In my developing environment, default setting adopts "gcc-arm-none-eabi-5_4-2016q2" C compiler tool and "Verdi3_K-2015.09-SP2"vcs simulator tools. ( reference [3] is gcc-arm tool download link) The developer can check more detail of build configuration in Makefile and Makefile.CXDT files.

#### The SOP for simulating all testcases

<ol>
<li> Remove all compiled test code</li>
<div class="language-shell highlighter-rouge"><pre class="highlight"><code class="hljs ruby"><span class="nb">$ make clean_tests
</span></code></pre></div>

<li> Compile all tests</li>
<div class="language-shell highlighter-rouge"><pre class="highlight"><code class="hljs ruby"><span class="nb">$ make tests
</span></code></pre></div>

<li> Simulate all tests</li>
<div class="language-shell highlighter-rouge"><pre class="highlight"><code class="hljs ruby"><span class="nb">$ make all
</span></code></pre></div>

</ol>

The simulation report shows as below:
<div class="language-shell highlighter-rouge"><pre class="highlight"><code class="hljs ruby"><span class="nb">$            V C S   S i m u l a t i o n   R e p o r t~
Time: 374520000 ps
CPU Time:      1.680 seconds;       Data structure size:   5.5Mb
Fri Mar  8 19:46:32 2019
make[1]: Leaving directory .../logical/testbench/execution_tb
---------------- SUMMARY OF RESULTS ------------------
    apb_mux_tests PASSED
    default_slaves_tests PASSED
    dhry PASSED
    dualtimer_demo PASSED
    gpio_driver_tests PASSED
    gpio_tests PASSED
    interrupt_demo PASSED
    memory_tests PASSED
    self_reset_demo PASSED
    sleep_demo PASSED
    timer_driver_tests PASSED
    timer_tests PASSED
    uart_driver_tests PASSED
    uart_tests PASSED
    watchdog_demo PASSED
    debug_trace_tests PASSED
    rtx_demo PASSED
    cxdt PASSED
    hello PASSED
    hello_world PASSED
</span></code></pre></div>

Remind: The Makefile also supports the specified test, please type "make help" and this would shows extra information.

### The Bus Interface

  The Cortex-M3 processor supports multi-layer (AHB)-Lite bus protocol. The AHB-Lite bus protocol has not to support request and grant, or retry and split transcations. The multi-layer AHB interconnection scheme enables parallel access paths between multiple masters and slaves in a system and allows all masters access to the same slave at the same time. In other words, each master on the interconnect has a direct link to each slave, The link is not shared with other masters. Contention only occurs in a multi-layer interconnect at a payload destination, typically the slave. This multi-layer AHB system has low resource consumption and latency and also be able to achieve high bandwidth.

  Moreover, in the .../cmsdk/logical/cmsdk_ahb_busmatrix/bin directory, ARM-Cortex supports BuildBusMatrix.pl perl script to automatically build an AHB Bus Matrix component with a given number of input ports, a given number of output ports, a particular arbitration scheme and ARM processor interface. The developer can manually modify the XML file to configure the number of input ports, number of output ports and particular arbitration scheme. (refer to [7]) The README.txt file describes more detail.

=========== To be continued.... ==========

## Reference

[1] [Arm Cortex-M3 processor, the core of the Internet of Things](https://community.arm.com/processors/b/blog/posts/arm-cortex-m3-processor-the-core-of-the-iot?_ga=2.36344800.1335263062.1549937343-1623124150.1549417690)

[2] [ARM Compiler armar User Guide Version 5.04](https://developer.arm.com/products/software-development-tools/compilers/arm-compiler-5/docs/dui0476/j)

[3] [GNU Arm Embedded Toolchain - Version 5-2016-q2-update](https://developer.arm.com/open-source/gnu-toolchain/gnu-rm/downloads/5-2016-q2-update)

[4] The Definitive Guide to ARM Cortex-M3 and Cortex-M4 Processors, Joseph Yiu

[5] [Multi-layer AHB Overview](http://infocenter.arm.com/help/index.jsp?topic=/com.arm.doc.dvi0045b/index.html)

[6] [ARM Keil - MDK5 Software Packs](http://www.keil.com/dd2/pack/)

[7] [Cmsdk_ahb_busmatrix Repo](https://github.com/s311354/cmsdk_ahb_busmatrix.git)

## Note                                                                                                                                                                                  
<p>If you have any constructive criticism or advises, leave the comments below or feel free to email me @qazqazqaz850@gmail.com.
Hope this post will help! :)
</p>
