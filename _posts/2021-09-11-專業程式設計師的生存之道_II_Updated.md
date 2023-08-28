---
layout: post
title:   "專業程式設計師的生存之道 II (Updated)"
date:    2021-09-11
tags:    [Programming,Reading]
---

“In The Clean Coder: A Code of Conduct for Professional Programmers, legendary software expert Robert C. Martin introduces the disciplines, techniques, tools, and practices of true software craftsmanship. This book is packed with practical advice–about everything from estimating and coding to refactoring and testing. It covers much more than technique: It is about attitude. Martin shows how to approach software development with honor, self-respect, and pride; work well and work clean; communicate and estimate faithfully; face difficult decisions with clarity and honesty; and understand that deep knowledge comes with a responsibility to act.”

## 紀錄與心得
延續上一篇[文章][文章]，接續整理[Clean Coder, The: A Code of Conduct for Professional Programmers][cleancode]這本書的筆記與心得。

##  章節概要 ##
<h4><a name="TableContent"></a> <a name="章節">章節</a> </h4>
<h6><ol>
    <li><a href="#測試驅動開發">測試驅動開發（TDD）</a></li>
    <li><a href="#練習">練習</a></li>
    <li><a href="#驗收測試">驗收測試</a></li>
    <li><a href="#測試策略">測試策略</a></li>
    <li><a href="#時間管理">時間管理</a></li>
    <li><a href="#預估">預估</a></li>
    <li><a href="#壓力">壓力</a></li>
    <li><a href="#協作">協作</a></li>
    <li><a href="#團隊與專案">團隊與專案</a></li>
    <li><a href="#學徒期">輔導、學徒期與工藝典範</a></li>
</ol></h6>

### <a name="測試驅動開發">測試驅動開發（TDD）</a> ###
TDD是專業人士的選擇， 其流程遵循先寫好一個單元測試的一小部分程式碼，必須搭配撰寫產品程式碼，讓這些測試能夠編譯成功。當產品程式夠用即可，然後再回頭接著寫單元測試程式碼，這個循環不斷重複。擁有一套值得信賴的測試，便可完全打消修改程式碼的全部恐懼。此外，事後寫的測試只是一種防守，並且會受制於已存在的程式碼；然而先行撰寫的測試則是進攻，會迫使去思考什麼才是最好的設計以及促使做出耦合的設計。

TDD的三大法則：
* 撰寫單元測試前，不可撰寫任何產品程式
* 只撰寫剛好無法通過的單元測試，不能編譯也算無法通過
* 只撰寫剛好能通過當前測試失敗的產品程式

當遵循三大法則的單元測試就是文件，它清晰描述物件的各種建立方法以及函式的各種有意義的呼叫方式，並且形式規整可以執行。

### <a name="練習"> 練習</a> ###
任何事情要想做得快，都離不開練習。盡可能加快重複編碼/測試的過程，會要求迅速做出決定。這還要能辨識各種各樣的環境和問題，並且懂得應付。另外，現在的程式設計師不應該等待建置（Build），如今建置時間應該用秒來衡量。

老闆的職責不包括避免員工的技術落伍以及替員工打造一份好看的履歷。身為專業程式設計師必須用自己的時間來練習，關心自己能做到怎樣的最好結果並且保持自己的技能不落伍。雖然練習是賺不到錢的，但是練習之後，你將會獲得回報。

### <a name="驗收測試">驗收測試</a> ###
驗收測試總是應當自動化進行。在軟體發展的週期中，確實有時候需要手動測試，但是驗收測試不應當手工進行，原因很簡單：要考慮時間與金錢的成本。專業開發人員認為，實現驗收測試的自動化是自己的責任，
可以避免開發誤入歧途，也可以確認自己是否已經完工。

通常業務分析師測試正確路徑，以證明功能的業務價值；QA則測試錯誤路徑、邊界條件、異常、例外情況，因為QA的職責是考慮哪些部分可能會有問題。然而在敏捷專案中，通常是功能實作完成的前幾天，才開始編寫測試。
至於開發人員則有責任把驗收測試與系統聯繫起來，並且與撰寫測試的人協商並改進測試，然後讓這些測試可以通過，協助團隊開發出最棒的軟體。

測試協商的案例：
<pre>
開發人員Paula：Tom，這個測試不對勁 “Ensure that the post operation finishes in 2 seconds.”
測試的人Tom：我覺得沒問題。我們的需求是，用戶等待的時間不應該超過2秒。這有什麼問題呢？
開發人員Paula：問題是，我們只能從統計數字上保證不超過2秒。但是，我們可以保證在99.5%的情況下能按時完成。
測試的人Tom：OK，那測試要怎麼寫？在一般情況下Post操作在2秒內完成，我無法這樣寫測試
開發人員Paula：你可以根據統計數字來寫
測試的人Tom：你的意思是，你要我做1000操作，確保時間超過2秒的次數小於5？這不現實吧
開發人員Paula：是不現實，這樣最少也要花1小時，下面這辦法如何？“Ensure 15 post transactions and accumulate times. Ensure odds are 99.5% that time will be less than 2 seconds”
測試的人Tom：好，這樣好懂些了。但是，這背後的數學原理靠得住嗎？
開發人員Paula：我保證會秀出測試結果的中間計算過程，如果你有疑問，可以仔細檢查
測試的人Tom：好，我覺得這樣沒問題
</pre>

單元測試是程式設計師寫給程式設計師的，屬於正式的設計文件，將深入系統內部進行。驗收測試是業務方寫給業務方，屬於正式的需求文件，僅在系統外部進行，而業務方和程式設計師都關心驗收測試的結果。
這兩項測試首重的是文件如實描述系統設計、結構以及行為，然後才是測試。

Note: 寫GUI測試時，不應該根據按鈕的座標來點擊，而應該根據名稱來點擊，或是給每一個按鈕加上一個唯一的ID。但是應當盡可能減少GUI測試，因為GUI很容易變化，每當一次變化之後，都會有成千上百個測試無法通過。

### <a name="測試策略">測試策略</a> ###
QA和開發人員應該緊密協助，攜手保障系統的品質。QA在團隊中要扮演的是需求規約定義者(Specifier)和特性描述者(Characterizer)。QA身為規約定義者的任務是和業務人員一起建立自動化驗收測試，以作為系統真正的需求規約文件。
QA身為特性描述者的任務則是遵循探索式測試的原則，將之回報給開發人員和業務人員，但不翻譯需求。

自動化測試金字塔：
* 人工探索式測試 ～5% - 此測試既非自動化的測試，亦非腳本化的測試，意圖在於再驗證預期行為時，探索系統預期以外的行為
* 系統測試 GUI ～10% - 由系統架構師和技術負責人（technical leads）來編寫，一般使用和UI整合測試相樣的語言和環境。目的是要確保正確的系統構造（construction）
* 整合測試 API ～20% - 一般由系統架構師或首席設計師（lead designers）來編寫，大多使用與元件測試相同的語言和環境來編寫。這種æ¸¬試將元件裝配成組，測試它們彼此之間是否正常通訊
* 元件測試 API ～50% - 由QA和業務人員編寫，開發人員提供輔助。此測試需使用合適的模擬物件（Mocking）或測試替身（test-doubling）技術，解開與系統的其他元件的耦合
* 單元測試 XUnit～100% - 由程式設計師使用系統開發時的同一種語言所撰寫的程式碼規約，即先寫測試，在寫產品程式碼。後續將作為持續整合（Continuous Integration, CI）的一部分來執行

### <a name="時間管理">時間管理</a> ###
程式設計是需要持續投入精力和專注力的智力運動。而專注力是稀有的資源，所以開發人員需學習安排時間，妥善使用自己的專注力點數。定期訓練肌肉專注力，有助於改善心智專注力以及提升心智專注力的上限。

### <a name="預估">預估</a> ###
承諾是必須做到的，意味著必須每天工作12小時，放棄週末的休假，也不得不如此。然而，預估是一種猜測，因為不知道到底要花多時間，所以預估的結果是一種機率分佈。專業開發人員不隨便承諾，除非確切知道可以完成，要能清楚區分預估和承諾。若被要求承諾做自己不確定的事情，那麼就應當堅決拒絕，也不要違背自己的意願，免強去承諾。此外，也要避免給出暗示性的承諾，盡可能清楚地說明預估的機率分佈，這樣主管就可以做出合適的計畫。不過預估是非常容易出錯的，可透過大數定律將大任務分成許多小任務，分開預估再加總，結果會比獨評大任務要準確很多。

[PERT][pert]（Program Evaluation and Review Technique）計畫評審技術的三元分析法：
* 樂觀預估（Optimistic estimate）- 如果一切都異常順利，樂觀預估時間的發生機率應當小於1%
* 常規預估（Nominal estimate）- 常規預估時間的發生機率為最高
* 悲觀預估（Pessimistic estimate）- 考慮到各種意外，悲觀預估時間的發生機率應該小於1%

三元分析法的範例：
<font size="3" face="Courier New">
<table>
 <tr>
  <th>Task</th>
  <th>樂觀預估（Ｏ）</th>
  <th>常規預估（Ｎ）</th>
  <th>悲觀預估（Ｐ）</th>
  <th>期望值(O+4N+P)/6</th>
  <th>標準差(P-O)/6</th>
 </tr>
 <tr>
  <td>Alpha</td>
  <td>1</td>
  <td>3</td>
  <td>12</td>
  <td>4.2</td>
  <td>1.8</td>
 </tr>
 <tr>
  <td>Beta</td>
  <td>1</td>
  <td>1.5</td>
  <td>14</td>
  <td>3.5</td>
  <td>2.2</td>
 </tr>
 <tr>
  <td>Gamma</td>
  <td>3</td>
  <td>6.25</td>
  <td>11</td>
  <td>6.5</td>
  <td>1.3</td>
 </tr>
</table>
</font>
對於全部任務完成預估時間約（4.2+3.5+6.5）= 14.2 天，全部的標準差為各項任務的標準差平方和的平方根＝～3.13天。因此可推論全部任務大該需要14天，但也可能需要17天，甚至20天。

Note:
<ul>
 <li>函式多型（Polymorphically ）: a concept of object-oriented programming that allows us to perform a single action in different forms.</li> 
 Here is the C++ example:
 <li>PERT: the statistical tool used in project management, which was designed to analyze and represent the tasks involved in completing a given project.</li>
</ul>

Here is the C++ example of polymorphically: [Dynamic polymorphism is done in C++ through inheritance and virtual member functions.][polymorphism].

And here is the wiki example to describe how the PERT project scheduling tool works: [PERT example with seven tasks, labeled A through G][pertexample].

### <a name="壓力">壓力</a> ###
專業開發人員即便面臨到由最後期限和承諾所帶來的壓力，仍然會冷靜果斷並且堅守所受的訓練和紀律。在壓力下保持冷靜的最好方式，便是規避會導致壓力的環境，而且不要改變行為，需要遵守自己的紀律原則以及依靠自己切實有效的方式。例如：若遵守TDD，此時就寫的測試甚至要比平常還要多；若篤信無情重構，此時就要進行更多重構；若相信要保持函式盡量地小，此時就要讓函示變得更小。另外，專業開發人員也要讓系統、程式碼或設計盡可能整潔乾淨，因為混亂會降低速度，導致工期延誤，承諾失守。若尋求結對程式（pair program）的夥伴協助，也可以幫助堅守原則紀律，讓缺陷更少，防止混亂。

&lt;NOTE&gt;
如果能一週工作80小時，就會被奉為英雄。如果能把一團亂整理成給客戶做展示的材料，也會被奉為英雄。如果拼命工作，可能會獲得晉升。如果得過且過，你可能會被炒魷魚。

### <a name="協作">協作</a> ###
大多數軟體都是由團隊開發出來，所以專業程式設計師首要職責是滿足雇主的需求。這意味著要和經理們、業務分析師們、測試工程師們和其他團隊成員進行良好的協作（collabrating），深刻理解業務目標。最糟糕的表現是把自己封閉起來，只顧一頭將自己埋在技術堆裡，甚至對於公司業務不聞不問。此外，專業程式設計師並不會僅憑一己之力從零開始建立知識，而是透過互相結對來學習系統的不同部份和業務，以及分享知識。

### <a name="團隊與專案">團隊與專案</a> ###
團隊比專案更難建置，因此形成團隊首先需要建立關係，以及需要學習如何互相協作，需要瞭解彼此的癖好、強項、弱項，最終才能凝聚成團隊，而形成真正有凝聚力的團隊，可能需要6個月，甚至1年。有凝聚力的團隊通常大約有12名成員，應該配有程式設計師、測試人員和分析師，同時有一名專案經理。（人員比例分配較好的組合：程式設計師：測試人員和分析師＝2:1 ）。讓團隊在一個又一個專案中整體移動、共同工作有助於穩健及形成凝聚力，一直共同工作，成為不斷交付專案的強大引擎。

### <a name="學徒期">輔導、學徒期與工藝典範</a> ###
專業主義價值觀和技術敏銳度需要進行不斷的傳授、培育、滋長和文火慢燉，直到深植文化當中。但是倘若傳承無力，主要可能是因爲向新人傳授技藝的這個環節缺少了資深人士輔導。

工藝（craftsmanship）是工匠所秉持精神狀態，包含著價值觀、原則、技術、態度和答案，而這文化基因（meme）大多經由口口相傳和親手相承而來，需要由資深人士向年輕學徒殷勤傳授，然後再由學徒之間相互傳播。資深人士會觀察年輕學徒的學習過程，然後不斷反思和改進傳授之道。對於軟體學徒期大致上可歸類以下三個時期（理想化的學徒制方案）：

<ul>
 <li>大師 - 一般來說大師擁有10年以上的從業經驗，曾在多個不同類型的系統、語言和作業系統上工作。懂得如何領導和協調多個團隊，也是熟練的設計師和架構師，能夠遊刃有餘地進行程式設計。大師會透過閱讀、研究、練習、實踐和教學來維持自身的技術水準，就像是Scotty 中校。</li>
 <li>熟練工 - 一般來說熟練工平均經驗水準大約在5年左右，還處在受訓期當中，不過已經能勝任工作，而且持續學習如何在團隊中卓越工作和成為團隊的領導者，而且精力充沛。熟練工對當下的技術十分瞭解，但是對其他許多系統尚缺乏經驗，一般只瞭解一種語言、一個系統、一個平台，但是也正在不斷學習的過程中。很少會讓資歷尚淺的熟練工獨立工作，往往都需要在大師或其他資深熟練工的嚴厲督導下進行工作並且程式碼會被人仔細地覆查。隨著經驗不斷累積，自主能力也會不斷增長。</li>
 <li>學徒/實習生 - 學徒沒有自治權，需要在熟練工的緊密督導下工作，確保學徒們能瞭解設計原則（design principles）、設計模式（design patterns）、各種紀律（disciplines）和固定的操作環節，至少持續一年。一開始不會單獨承接任何任務，只能作為助手、作為熟練工的小幫手，而且應該要十分密集地進行結對程式設計。這階段是學習紀律並強化各項實踐的階段，而各項價值觀的基礎也都是在這個階段塑造成型。</li>
</ul>

<a href="#章節"> To 章節</a>

## 總結
個人認為這本書闡述實際開發軟件中獲得的生存之道，並且也舉出不少案例。這些許多實用的建議和知識，都是值得學習以及內化吸收。

## Reference ##
[1] [Clean Coder, The: A Code of Conduct for Professional Programmers](https://www.amazon.com/Clean-Coder-Conduct-Professional-Programmers-ebook/dp/B0050JLC9Y)

[2] [Wiki: Program evaluation and review technique](https://en.wikipedia.org/wiki/Program_evaluation_and_review_technique)

[polymorphism]:http://cplusplus.com/forum/beginner/252618/#msg1111720 "http://cplusplus.com/forum/beginner/252618/#msg1111720"

[cleancode]:https://www.amazon.com/Clean-Coder-Conduct-Professional-Programmers-ebook/dp/B0050JLC9Y "https://www.amazon.com/Clean-Coder-Conduct-Professional-Programmers-ebook/dp/B0050JLC9Y"

[pert]:https://en.wikipedia.org/wiki/Program_evaluation_and_review_technique "https://en.wikipedia.org/wiki/Program_evaluation_and_review_technique"

[pertexample]:https://en.wikipedia.org/wiki/Program_evaluation_and_review_technique#Example

[文章]:https://s311354.github.io/Louis.github.io//2021/06/21/專業程式設計師的生存之道_I/ "https://s311354.github.io/Louis.github.io//2021/06/21/專業程式設計師的生存之道_I/"

<p>Feel free to leave the comments below or <a href="mailto:qazqazqaz850@gmail.com">email</a> to me. Any other pieces of advice are always welcome. :)
