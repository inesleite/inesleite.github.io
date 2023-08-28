---
layout: post
title: “閱讀心得-人月神話 I The Mythical Man Month"
date: 2022-06-22
tags: [Reading]
---

"Few books on software project management have been as influential and timeless as The Mythical Man-Month. With a blend of software engineering facts and thought-provoking opinions, Fred Brooks offers insight for anyone managing complex projects. These essays draw from his experience as project manager for the IBM System/360 computer family and then for OS/360, its massive software system. Now, 20 years after the initial publication of his book, Brooks has revisited his original ideas and added new thoughts and advice, both for readers already familiar with his work and for readers discovering it for the first time."

## 書單 ##
[Mythical Man-Month, The: Essays on Software Engineering, Anniversary Edition][mythical]這本書在Amazon 4.5 顆星。作者[Fred Brooks][fred]在本書不談技術，只談人的問題以及團隊的管理學。從[System/360][360]硬體以及[OS/360][0s360]軟體之間的開發管理，將實務上的大型專案管理經驗，隨筆性撰寫這本書。

"The classic book on the human elements of software engineering. Software tools and development environments may have changed in the 21 years since the first edition of this book, but the peculiarly nonlinear economies of scale in collaborative work and the nature of individuals and groups has not changed an epsilon. If you write code or depend upon those who do, get this book as soon as possible" ... Amazon Review

## 紀錄與心得 ##
這陣子因緣巧合翻閱人月神話這本軟體管理的相關書籍，深受吸引。由工作中所累積的經驗或經歷加以驗證書中的論點時，算是能認同書中所闡述的部分觀念，例如：要用漸進式開發模型，而非瀑布模型;在系統設計時，保有概念整體性(conceptual integrity)是重要的原則... 等。而這些觀念可能在當時是新穎的，現在已被視為常識，如同作者在<<人月神話二十年>>自我調侃：

```
飛往LaGuardia機場的班機以一種低沉的嗡嗡聲響劃過天際，美麗的景色都被雲霧和黑暗所籠罩，我翻閱著平淡無趣的文章資料，但我並不感到無聊，因為坐在我旁邊的那位陌生人正在看<<人月神話>>，而我一直在等，等看看他會不會有什麼反應，也許是一番話或某些表示。最後，飛機終於降落滑向了登機門，我不能再等了:
「這本書如何？你喜歡嗎？」
「哦！這裡頭講的都是我老早就知道的東西。」
我決定不作自我介紹了。
```

至於書中的觀念是20年前所寫的，講的是30年前軟體開發方面的經驗，為何能歷久不衰？作者認為相較於軟體開發或硬體開發等技術，關於人和團隊的事情往往過時的會比較慢，而且軟體專案管理跟其他方面的管理有很多類似之處。以下就整理書中的論點。

### 章節概要 ###

<h6><ol>
    <li><a href="#焦油坑">焦油坑</a></li>
    <li><a href="#人月神話">人月神話</a></li>
    <li><a href="#外科手術團隊">外科手術團隊</a></li>
    <li><a href="#系統設計">專制、民主與系統設計</a></li>
    <li><a href="#第二系統效應">第二系統效應</a></li>
</ol></h6>

#### <a name="焦油坑">焦油坑</a> ####

+ "大型系統的軟體開發工作就像是掉進了焦油坑裡，許多很大、很厲害的猛獸都在裡面劇烈翻滾，也許這些系統大多到最後都可以運作"
+ "軟體系統產品的演進可分為：程式(progam)、軟體產品(programming product)、軟體系統(programming system)、軟體系統產品(programming system product)"
+ "程式(progam):"
    + "寫程式的人可以在開發系統上執行它"
    + "用來評估個別程式設計師生產力的東西"
+ "程式產品(programming product):"
    + "可以讓任何人執行、測試、修改和擴充的程式，並且適用於多種操作環境，以及不同情況的資料"
    + "必須以通用的風格來編寫，特別是輸入資料的範圍與形式，要做到能讓一般基本演算法都能合理接受的程度"
    + "必須經過測底的測試，以確保它是可靠的，例如啟動一個豐富的測試案例(test case)資料庫，以便探究並記錄輸入資料的範圍與各個邊界值(boundary)的執行情況"
    + "還必須要有完整的文件，以指引別人使用、修改或擴充它"
    + "完成一項軟體產品的成本至少是寫一個程式的三倍"
+ "軟體系統(programming system):"
    + "彼此交互運作的一組程式集合，組合起來可以完成某項複雜工作的一套完整設施"
    + "做出軟體系統，程式之間必須定義出明確的介面(interface)，而每個程式的輸出入都要符合介面所規定的語法(syntax)和語意(semantic)"
    + "每個程式也都必須經過設計，以滿足整體規劃出來的資源限制，例如：記憶體大小、輸出入裝置、執行速度"
    + "隨著越來越多的組合情況，測試的涵蓋面也必須越來越廣，麻煩的是兜在一起仍有可能引發意料之外的交互作用，將會耗費更多的時間"
    + "完成軟體系統中的一個組件的成本至少是寫一個程式的三倍，系統中的組件數量越多，成本就可能更高"
+ "軟體系統產品(programming system product)"
    + "大部分軟體工程企圖要做出來的東西，它的花費要九倍"
+ "我們所依賴的技術基礎是不斷在進步，當設計完成的那一剎那，從該設計所代表的概念來看，它就已經落伍了。"
+ "軟體工程的任務和挑戰就是以現有的資源並有時效之內，找到實際的方法去解決現實的問題"
+ "任何創作活動的背後都免不了附帶枯燥、沉悶、耗時的辛勤工作，寫程式也不例外"

#### <a name="人月神話">人月神話</a> ####

+ "軟體專案進行不順利的原因或許很多，但絕大部分都是肇因於缺乏良好的時程規劃所致”
+ "只有當工作可被切分(partition)，而且投入工作的人彼此不用構通(communication)，人力和工時的互換才算成立"
+ "程式設計是一份具有連續性的限制，而不可切分的工作，就算投入再多的人力，也不會對時程有所影響"
```
生小孩就是需要九個月，你叫多少個媽一起生都一樣，軟體工程就是像這樣的工作，因為它必須除錯，而除錯就是具有連續性的本質
```
+ "當工作可以切分，但是每個子工作之間需要溝通時，為這些溝通所付出的代價必須納入對工作量的計算之中"
+ "由於軟體的創作在本質上是屬於系統性的工作，一種處理複雜交互關係的活動，所以溝通的成本是很高的，這項成本一下子就蓋過了因工作切分而省下的時間，其結果是增加越多的人力，而時間仍不會縮短"
+ "經驗法則來安排軟體專案的時程："
```
1/3 規劃
1/6 寫程式
1/4 組件測試和早期系統測試
1/4 系統測試，完成所有的組件
```
+ "軟體專案會耗費多少時間是看它有多少連續性的限制，該投入多少人力是看它可以切分成多少獨立的子工作"
```
Brooks定律 在一個時程已經落後的軟體專案中增加人手，只會讓它更加落後
```
+ "參與合作的人數會影響投入的成本，而這項成本最主要的部分就是溝通，以及導正因傳達不清楚所造成的不良影響(系統除錯)"

#### <a name="外科手術團隊">外科手術團隊</a> ####

+ "大系統中的每個小部分都分別交由一個團隊來負責，而各個團隊則被組織成外科手術(surgical team)，而非屠夫團隊(hog-butchering)"
+ "並非每個成員都輕自下去拿手術刀解決問題，取而代之，是由一個人操刀，而其他人則負責扮演支援性的角色，增進那個操刀者的效率與生產力"
+ "外科手術團隊的10人良好劃分，個別扮演不同的專業角色運作情況："
```
"外科醫生(surgeon): 首席程式設計師(chief programmer)，負責定義功能上和效能上的規格、程式設計、編寫程式、測試程式，並撰寫文件"
"副手(copilot): 能做外科醫生做的事，只是經驗較為缺乏，對程式也都很熟悉，並研究其他不同的設計方法"
"行政助理(administrator): 幫忙處理財務、人事、場地、裝備，以及對外的一切行政事務，不需要全職"
"文書編輯(editor): 盡最大的可能把文件寫清楚，無論內部或對外文件，並監督整個製作文健的過程"
"兩位秘書(secretary): 負責處理專案的協調事宜，以及產品無關的文件"
"程式助理(program clerk): 負責維護團隊在軟體產品程式庫(programming-product library)中所有技術上的紀錄，分擔程式設計師的一些例行性工作，並保證在一定的效率之下，很有條理地處理一些容易忽略的瑣事，並強化工作產品"
"工具專家(toolsmith): 檔案編輯、文書編輯，以及交談式除錯(interactive debugging)，並且保證有充分的基礎服務設施，並建立、維護、更新特殊工具(多半是交談式工具)，建造專有的工具程式"
"測試員(tester): 根據規格來設計測試案例(test case)，以用來測試外科醫生所寫的程式片段，為日復一日的除錯工作來設計測試資料。也建立供組件測試之用的鷹架(scaffolding)"
"語言專家(language lawyer): 團隊中總會有ㄧ、兩個人特別樂於在那裡鑽研程式語言的奧妙，他們的天份和外科醫生不同，外科醫生專攻系統設計，著重於系統的外在呈現方式(representation)，而語言專家則可以找出語言方面最簡捷有效的方式，以解決棘手、模糊、技巧性的問題"
```
+ "外科手術團隊中，不允許不同喜好，完全統一由外科醫生一個人做決策，使外科手術團隊是同心一致，整個系統必須具備概念整合性"

#### <a name="系統設計">專制、民主與系統設計</a> ####

+ "軟體工程是把設計這件工作切割好幾個部分，然後分配給一群人去做，但在系統設計時，仍保有概念整體性(conceptual integrity)"
+ "要達成概念整體性，意味設計必須出自一個人的想法，或是極少數人的ㄧ致決定"
+ "系統的架構，是使用者介面完整而詳細的規格，也可稱為程式設計手冊或是功能操作手冊"
+ "架構設計師把架構的外部規格制訂出來，事實上反而會增進實作小組的創意風格，他們可以立即專注於真正尚未處理的問題，創意的發揮也隨之開始"
+ "架構旨在說明做什麼，而實作則是說明如何做"
+ "時程和開發階段先後順序，最簡單的做法是先不要成立實作小組，直到規格已經完成之後再找人，蓋房子也都是這樣做的"
+ "實作人員可以從開始設計資料流、控制流程，以及初略的概念呈現手冊是不是有矛盾的地方、技術上的構想是否明確、成本效益的目標是否定義清楚。也可以從設計或熟悉的工具開始著手，特別是紀錄保存系統(record-keeping system, git or perforce)和設計自動化系統(design automation system)"
+ "在架構設計師將外部規格完成之前，實作人員就有一堆事情可做，例如："
    + "先對外部規格即將制定的系統功能粗估計"
    + "必須好好定義一下空間和時間的目標，也必須弄清楚產品運作時所必須設定的系統組態(configuration)，然後可以開始設計模組介面、資料結構、編譯流程、演算法，以及各種工具"
    + "有時候還必須花些時間和架構設計師溝通"
+ "垂直分工將大幅減輕水平分工所產生的負擔，其結果也將大幅簡化溝通，並且增強概念整體性"

#### <a name="第二系統效應">第二系統效應</a> ####

+ "架構設計師的責任是制定功能規格，實作的責任是建造出更快、更便宜的產品"
+ "架構設計師擁有一項優勢，亦即在早期從事設計的任何時候，他都可以從承包商那裡得到報價，幾乎只要問，就能得到答案"
+ "越早進行持續性的溝通，可以使架構設計師具有良好的成本概念，而實作人員也會對設計師較有信心，不會模糊個自的責任分工"
+ "當預估的成本太高，架構設計師有兩種選擇：刪減設計，或提出更便宜的實作方法來質疑實作人員，就後者而言，基本上是容易引起情緒性爭議"
+ "如果要與實作人員溝通成功，架構設計師必須："
    + "只能建議，不能命令"
    + "建議時，永遠只提出一個能夠符合規格的實作方法，同時接受其他能夠達成目標的方案"
    + "默默地，私底下提出建議"
    + "準備為提出的建議付出喪失信任的代價"
+ "一般來說，實作人員會持反對意見，並提出修改架構的建議，而這往往是對的"
+ "第二系統都傾向於過度設計，那些第一設計時小心地擱在一旁的花俏點子統統被納進來，是最危險的系統"
+ "堅持採用具有至少兩個以上系統設計經驗的架構設計老手，對一些特別的誘惑保持清醒，也可以藉由詢問自己一些適當的問題，來確保正確的概念與目標已貫徹到設計的細節中"

## 總結 ##

個人認爲這本書闡述的經驗與見解，對大型軟體開發的管理或是團隊的協調都是十分寶貴，也具有參考的價值。是一本適合程式設計師、經理人閱讀的隨性書籍，以培養正確的心態。

=========== To be continued…. ==========

## Reference ##

+ [Mythical Man-Month, The: Essays on Software Engineering](https://www.amazon.com/-/zh_TW/Frederick-Brooks-Jr/dp/0201835959/ref=sr_1_1?adgrpid=84278570802&gclid=CjwKCAjw-8qVBhANEiwAfjXLrnZFLqQhSArV6mXUhzQRXeJfruD4Bvufibg7_dSbIPsCBsqLBwdU1RoCi6oQAvD_BwE&hvadid=585412618948&hvdev=c&hvlocphy=1012810&hvnetw=g&hvqmt=b&hvrand=2504481897720455931&hvtargid=kwd-18481627&hydadcr=22365_13333077&keywords=the+mythical+man+month&qid=1655961136&sr=8-1)


[fred]:https://en.wikipedia.org/wiki/Fred_Brooks "https://en.wikipedia.org/wiki/Fred_Brooks"

[mythical]:https://www.amazon.com/Mythical-Man-Month-Software-Engineering-Anniversary/dp/0201835959 "https://www.amazon.com/Mythical-Man-Month-Software-Engineering-Anniversary/dp/0201835959"



[0s360]:https://en.wikipedia.org/wiki/OS/360_and_successors "https://en.wikipedia.org/wiki/OS/360_and_successors"

[360]:https://en.wikipedia.org/wiki/IBM_System/360 "https://en.wikipedia.org/wiki/IBM_System/360"
