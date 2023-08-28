---
layout: post
title: "略讀 - Linux Kernnel 設計的藝術"
date: 2022-05-13
tags: [Linux, Reading]
---
"Linux was originally developed for personal computers based on the Intel x86 architecture, but has since been ported to more platforms than any other operating system. Because of the dominance of the Linux-based Android on smartphones, Linux also has the largest installed base of all general-purpose operating systems."

## 書單 ##
[Linux Kernel設計的藝術: 圖解Linux操作系統架構設計與實現原理][linux]書籍在博客來中擁有4.5顆星，關於此書:

"以操作系統的真實運行過程為主線，結合真實的內核源代碼、349幅精確的內核運行時序圖和具有點楮之妙的文字說明，對操作系統從開機加電到系統完全準備就緒的整個過程進行了系統而完整地分析，深刻地揭示了其間每一個動作的設計意圖和實現原理，完美地再現了操作系統設計者的設計思路。"

## 紀錄與心得 ##

作業系統是底層系統程式，對應用程式行之有效的偵錯和追蹤等方式，對作業系統的原始程式碼而言，幾乎無效。就算把每一行原始程式碼都看懂，但仍然不知道整個程式究竟在做什麼，以及起什麼作用，更不知道設計者的原意。對於學習了解Linux作業系統原始程式碼，可以透過把作業系統在記憶體中的執行時狀態畫出圖的方式進行，並且分析真實作業系統實際執行的過程以及精準地理解執行的結構和狀態。

### 開機 ###

Linux 開機接上電源到作業系統啟動完成並進入怠速狀態(BIOS 載入作業系統程式、對於主機的初始化，開啟保護程式和分頁，呼叫main函數，建立Thread 0, 1, 2, ... 以及執行shell執行續)。過程中，CPU硬體邏輯設計為接上電源瞬間，強制將CS的值置為0xFFFF，IP的值置為0x0000，由CS:IP 0xFFFF0位址開始執行並啟動BIOS（BIOS程式被固定在電腦主機板上的ROM晶片裡），將作業系統程式載入到RAM記憶體中。隨著BIOS程式的執行，螢幕上會顯示顯示卡的資訊、記憶體的資訊...等，在檢測顯示卡這段期間，BIOS會在記憶體中建立中斷向量表和中斷服務程式，對啟動(boot)作業系統至關重要。BIOS程式量並不大，卻非常精深，需要對電腦的整個硬體體系結構非常熟悉才能明白。

真正執行boot操作，即把軟碟中的作業系統程式載入至記憶體，對於Linux 0.11作業系統而言，電腦將分三批逐次載入作業系統的核心程式。第一批由BIOS中斷int 0x19h把第一開機磁區bootsect的內容載入到記憶體，並且與電腦硬體體系結構的設計聯手操作，會讓CPU接收到int 19h 中斷，CPU接收到這中斷後，會立即在中斷向量中找到int 19h中斷向量。至此，已經將第一批程式bootsect從軟碟載入到電腦的記憶體了。下面的工作就是執行boostsect把軟碟的第二批和第三批程式載入記憶體。


&lt;NOTE&gt;
+ RAM（Random Access Memory）: 隨機存取記憶體，特點為接上電源狀態下可任意讀、寫，斷電後資訊消失
+ IP (Instruction Pointer）: 指令指標暫存器，存在於CPU中，紀錄將要執行的指令在程式碼部分的偏移位址，與CS組合即為將要執行的指令的記憶體位址。
+ CS （Code Segment Register）：程式碼部分暫存器，存在於CPU中，指向CPU目前執行程式在記憶體中所在的區域
記憶體計算方式：256 byte 是 0x00100；4X256 byte = 1KB 是  0x00400，但 1KB byte 的高位位址是0x00400-1 = 0x003FF

=========== To be continued…. ==========

## Reference ##
+ [Wiki: Linux](https://en.wikipedia.org/wiki/Linux)

[linux]:https://www.eslite.com/product/1001299212391129 "https://www.eslite.com/product/1001299212391129"
