---
layout: post
title: Tensilica Xtensa Hardward Verification and EDA
tags: [Tensilica, Processor]
---

## Purpose

In Fortemedia inc., the company utilizes Tensilica Xtensa HW verification and EDA tool to develop SOC design. The Tensilica was a company based in Sillicon Valley in the semiconductor intellectual property core business. It is now a part of Cadence Design Systems. The Xtensa processor architecture is a configurable, extensible, and synthesizable 32-bits RISC processor, emphasising on software single-clock.

Tensillica's Xtensa technology provides SOC (system-on-chip) designers with the world's first configurable and extensible processor cores fully supported by automatic hardward and software generation. The Xtensa product line is the first processor and DSP core family designed specifically to meet the wide range of performance requirements in today's SOC designs.

By using Tensilicas Xtensa dataplane processing units (DPUs), design teams can signifficantly reduce the development and verification time required by hand-coding RTL blocks in Verilog or VHDL. As these DPUs provide programability into the dataplane, changes can be made in firmware after sillicon production that extend the life of the product as standards develop and merket needs change.

Two essential features of all Xtensa customizable processors:
<ul style="list-style-type:disc">
  <li> Configurability </li>
   designers are offered a menu if checkbox and drop-down menu options so they can pick just the features they need.
  <li> Extensibility</li>
  designers can add their own instructions, registers, register lists, and much more using the Tensilica Instruction Extension (TIE) methodology - specifing the functional behavior of the new data path elements in the TIE language (Verilog-like) and then the RTL and whole tool chain is automatically generated.
</ul>

## Xtensa Hardware Verification

### Verification Flows
Tensilica provides three methods to verify HW design, ISS simulation, XTSC simulation and FPGA emulation. The both of ISS and XTSC simulations are system level verification. In addition, Tensilica verification scripts (e.g. soc_go) invoke CAD tool directly. For the diagnostic support, Tensilica provides a set diagnostic tests - Architectural Verification Programs (AVP) for all baisc-ISA opcodes, Micro-architecture Verification Programs (MVP) for checking interface, and Platform for runing programs and application in simulation (ISS simulation).

## Reference

[1] [Tensilica Xtensa Hardware Verification and EDA](https://www.cadence.com/content/cadence-www/global/en_US/home/training/all-courses/86065.html)

[2] [Xtensa Processors Wiki](https://www.semiwiki.com/forum/showwiki.php?title=Tensilica:Xtensa-Processors-Wiki)

## Note
<p>If you have any constructive criticism or advises, leave the comments below or feel free to email me @qazqazqaz850@gmail.com.
Hope this post will help! :)
</p>
