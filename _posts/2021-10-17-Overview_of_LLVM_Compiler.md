---
layout: post
title:   "Overview of the LLVM Compiler"
date:    2021-10-17
tags:    [Programming, Compiler]
---
<figure><center><img src="{{ site.baseurl }}/picture/llvm.png" width="60%"></center></figure>

"The LLVM logo is a stylized wyvern (a kind of dragon). Dragons have connotations of power, speed and intelligence, and can also be sleek, elegant, and modular (err, maybe not)." - The LLVM Compiler Infrastructure

## 簡介 ##
最近心血來潮，由於前一陣子查詢[Lexical analysis][lexicalanalysis]的相關文章以及實作[CSS Parser][cssparser]（此程式代碼repo: [lite css parser python][cssparserrepo]），無意間發現只聞其聲、不見其型的LLVM編譯器，就開始試著自學編譯器相關的知識。

LLVM 最初由[Chris Lattner][chris] 於研究助理期間實作的計畫項目，後續Apple聘用並持續將此計畫開發成產品，並且組織一個部門專門開發此技術。LLVM可視為是一個模組化的工具集合，其中包含assemblers, compilers, debuggers, ...等，這些元件皆與Unix系統中的工具兼容。而典型的編譯器架構，主要由三項元件構成：Frontend（Parser）, Optimizer and Backend（Code Generator）。

<figure><center><img src="{{ site.baseurl }}/picture/CompilerDesign.png" width="100%"></center></figure>

Frontend負責處理抓取原始碼，檢查其錯誤，以及解析成語法樹（Abstract Syntax Tree）;Optimizer負責做各式各樣的程式邏輯轉換，以嘗試改善代碼的運行時間，例如：簡化及優化邏輯運算;Backend接續將代碼映射到目標指令集，例如：X86. ARM, PowerPC，並且利用支持架構的特殊功能，來建構好的代碼。但一般編譯器即使架構遵循Frontend、Optimizer、Backend分工，三者之間通常會做得密不可分。

<figure><center><img src="{{ site.baseurl }}/picture/retargetabity.png" width="100%"></center></figure>

而LLVM 編譯器最重要的設計是支援多個程式代碼，但此編譯器支援一項新的程式語言就需實做一個新的Frontend，而Optimizer以及Backend 仍可共用。此編譯器設計具有許多優點，其中一項是可服務多個編譯器設計者。從開放源項目角度來看，這意味著有廣大社群貢獻者強化以及改善此編譯器。而這三項元件的編譯器架構最終贏得勝利來自於Frontend實作的技巧，而非Optimizer以及Backend。

對於此編譯器架構實際的實作項目中有幾個成功的故事。其中一項故事也許是最不幸，但卻是廣受使用的編譯器技術：將輸入資料轉譯成Ｃcode或是其他程式語言，並且將其傳送至Ｃcompilers，這樣允許共用Optimizer以及程式產生器，而且具有靈活的特性以及可控制其運行時間，並且對於前端設計者容易理解、實作以及維護。而最成功的實作模型是GCC，GCC支援許多Frontend以及Backend，並且也已經激活廣大的貢獻者社群。

## LLVM Intermediate Representation ##
LLVM編譯器最重要的設計部分是中介表示法（intermediate representation, IR），此格式用於表示編譯器中的代碼，屬於 low-level RISC-like的虛擬指令集。並且用於編譯器中的Optimizer部分，主導中間層的分析與轉換。而中介表示法也具備有許多特定的目的，包含支援輕量運行時間的優化和跨功能函數/內部程式的優化, ...等。下面是透過clang將Ｃ代碼轉換成.ll LLVM IR檔案的簡單範例：
<div class="language-shell highlighter-rouge"><pre class="highlight">memoryleakage.c<code class="hljs ruby"><span class="nb">#include&lt;stdlib.h&gt;
#include&lt;stdio.h&gt;
#include&lt;time.h&gt;
const int ARR_SIZE = 1000; 
int main() {
    int *intArray = malloc(sizeof(int) * ARR_SIZE);
    for (int i=0; i < ARR_SIZE; i++) {
        intArray[i] = i; 
    } 

    srand(time(NULL));
    int randNum = rand() % ARR_SIZE; 
    printf("intArray[%d]: %d\n", randNum, intArray[randNum]); 

    return 0;
}</span></code></pre></div>
然後下指令：
<div class="language-shell highlighter-rouge"><pre class="highlight"><code class="hljs ruby"><span class="nb">$ clang -S -emit-llvm memoryleakage.ll</span></code></pre></div>
即可產生memoryleakage.ll LLVM IR的檔案格式：
<div class="language-shell highlighter-rouge"><pre class="highlight">memoryleakage.ll<code class="hljs ruby"><span class="nb">; ModuleID = 'memoryleakage.c'
source_filename = "memoryleakage.c"
target datalayout = "e-m:o-p270:32:32-p271:32:32-p272:64:64-i64:64-f80:128-n8:16:32:64-S128"
target triple = "x86_64-apple-macosx11.0.0"

@ARR_SIZE = constant i32 1000, align 4
@.str = private unnamed_addr constant [18 x i8] c"intArray[%d]: %d\0A\00", align 1

; Function Attrs: noinline nounwind optnone ssp uwtable
define i32 @main() #0 {
  %1 = alloca i32, align 4    
  %2 = alloca i32*, align 8    
  %3 = alloca i32, align 4    
  %4 = alloca i32, align 4    
  store i32 0, i32* %1, align 4    
  %5 = call i8* @malloc(i64 4000) #3    
  %6 = bitcast i8* %5 to i32*    
  store i32* %6, i32** %2, align 8    
  store i32 0, i32* %3, align 4    
  br label %7           
                        
7:                                                ; preds = %16, %0    
  %8 = load i32, i32* %3, align 4    
  %9 = icmp slt i32 %8, 1000    
  br i1 %9, label %10, label %19  
...
declare i64 @time(i64*) #2

declare i32 @rand() #2

declare i32 @printf(i8*, ...) #2
...
attributes #2 = { "correctly-rounded-divide-sqrt-fp-math"="false" "darwin-stkchk-strong-link" "disable-tail-calls"="false" "frame-pointer"="all" "less-precise-fpmad"="false" "no-infs-fp-math"="false" "no-nans-fp-math"="false" "no-signed-zeros-fp-math"="false" "no-trapping-math"="true" "probe-stack"="___chkstk_darwin" "stack-protector-buffer-size"="8" "target-cpu"="penryn" "target-features"="+cx16,+cx8,+fxsr,+mmx,+sahf,+sse,+sse2,+sse3,+sse4.1,+ssse3,+x87" "unsafe-fp-math"="false" "use-soft-float"="false" }
attributes #3 = { allocsize(0) }

!llvm.module.flags = !{!0, !1, !2}
!llvm.ident = !{!3}

!0 = !{i32 2, !"SDK Version", [2 x i32] [i32 11, i32 3]}
!1 = !{i32 1, !"wchar_size", i32 4}
!2 = !{i32 7, !"PIC Level", i32 2}
!3 = !{!"Apple clang version 12.0.5 (clang-1205.0.22.9)"}</span></code></pre></div>

Note: 基本指令集
<ul> 
 <li>i32: 32-bit integer</li>
 <li>i32*: a pointer to 32-bit integer</li>
 <li>i32**: a pointer to pointer to 32-bit integer</li>
 <li>alloca: register allocation</li>
 <li>br: branch</li>
 <li>icmp: compare</li>
 <li>slt: signed less than</li>
 <li>%8: register</li>
</ul>

## 總結 ## 
實作lite css parser python 程式碼(將抓取的CSS語言格式轉換成XML語法的經驗)，稍微能理解[Chris Lattner][chris]大師當時開發LLVM Compiler的知識與設計的理念架構，雖然僅接觸到一些基本知識，但後續將會持續閱讀相關的知識以及技術，並試著理解加深LLVM Compiler的技術知識。

=========== To be continued…. ==========

## Reference ##
[1] [編譯器 LLVM 淺淺玩](https://medium.com/@zetavg/編譯器-llvm-淺淺玩-42a58c7a7309)

[2] [LLVM - Chris Lattner](http://www.aosabook.org/en/llvm.html)

[3] [LLVM Language Reference Manual](https://llvm.org/docs/LangRef.html)

[cssparserrepo]:https://github.com/s311354/css_parser_python "https://github.com/s311354/css_parser_python"

[lexicalanalysis]:https://en.wikipedia.org/wiki/Lexical_analysis "https://en.wikipedia.org/wiki/Lexical_analysis"

[cssparser]:https://s311354.github.io/Louis.github.io/2021/08/11/Intorduce_CSS_Basics_and_Simple_Python_based_CSSParser/ "https://s311354.github.io/Louis.github.io/2021/08/11/Intorduce_CSS_Basics_and_Simple_Python_based_CSSParser/"

[chris]:https://en.wikipedia.org/wiki/Chris_Lattner "https://en.wikipedia.org/wiki/Chris_Lattner"

<p>Feel free to leave the comments below or <a href="mailto:qazqazqaz850@gmail.com">email</a> to me. Any pieces of advice are always welcome. :)
