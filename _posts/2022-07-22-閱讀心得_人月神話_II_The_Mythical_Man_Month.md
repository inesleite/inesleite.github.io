---
layout: post
title: "閱讀心得 人月神話 The Mythical Man Month II"
date: 2022-07-22
tags: [Reading]
---

“Few books on software project management have been as influential and timeless as The Mythical Man-Month. With a blend of software engineering facts and thought-provoking opinions, Fred Brooks offers insight for anyone managing complex projects. These essays draw from his experience as project manager for the IBM System/360 computer family and then for OS/360, its massive software system. Now, 20 years after the initial publication of his book, Brooks has revisited his original ideas and added new thoughts and advice, both for readers already familiar with his work and for readers discovering it for the first time.”

## 紀錄與心得
延續上一篇[文章][文章]，接續整理[Mythical Man-Month, The: Essays on Software Engineering, Anniversary Edition][mythical]這本書的筆記與心得。

### 章節概要 ###

<h6><ol>
    <li><a href="#意念">意念的傳遞</a></li>
    <li><a href="#巴別塔">巴別塔為什麼失敗</a></li>
    <li><a href="#預估">預估</a></li>
    <li><a href="#物盡其用">地盡其利，物盡其用</a></li>
    <li><a href="#文件">文件假說</a></li>
    <li><a href="#成功之母">失敗為成功之母</a></li>
</ol></h6>

#### <a name="意念">意念的傳遞</a> ####

+ "手冊或書面規格是不可或缺的工具，其載明的是產品的外部(external)規格，用來描述並制定出使用者從外觀上將會看到的所有細節。而撰寫手冊便是架構師的主要工作"
+ "手冊不僅要描述使用者將會看到的所有細節，這其中包括了所有的介面，同時也要避免描述使用者看不到的技術細節，這些是實作人員的事，屬於他們的設計自由，就不應該對它做任何限制，但是架構師都必須隨時準備好提出一種實作方式工人參考，而非企圖硬性規定採用特定的實作方式"
+ "對於軟體系統的架構設計師而言，建立一些用來描述內部模組介面的語法(syntax)有助於強化定義和傳達意念。這種技術就是去設計傳遞參數或公用儲存空間的宣告方式(declaration)，並要求實作時得透過某個編譯時期(complie-time)的操作把宣告含入(也許是透過Preprocessor: #if, #else, #elif, #ifdef, #ifndef, #elifdef, #elifndef)"
+ "開會絕對是必要的，而開會將會獲得豐碩的成果，這是源於以下幾個因素："
    + "這同一個小組(架構設計師、使用者、實作人員)持續地每週開會，所以不用再花時間教那些搞不清楚狀況的人"
    + "這是一支充滿活力、足智多謀、在任何議題上都能夠進入狀況的小組，大家都跟結果息息相關，沒有人是顧問的角色，每個人都必須做出切身的承諾"
    + "當問題浮上檯面，將同時由內外正反不同的觀點來尋求解決方案"
+ "專案經理最好的朋友，就是每天都跟他唱反調的、獨立的產品測試(product test)小組，這小組的工作是檢查軟硬體是否符合規格，以確保設計的決策是否被正確了解或準確實作出來，並且必須在早期就跟設計的工作一起同時進行"

#### <a name="巴別塔">巴別塔為什麼失敗</a> ####

+ "巴別塔(tower of Babel)工程為何失敗呢？主要有兩項因素：溝通(communication)以及隨之而來的組織(organization)。人與人不能彼此交談，就無法合作，當合作失敗，工作就陷入停頓，而且缺乏溝通將導致爭執、誤解、集體猜忌，很快地整個團隊就會分崩瓦解，各自為政，最後連吵也不想吵，選擇孤立"
+ "在專案進行的過程中，有些小組會逐漸對他們自己所負責的程式進行功能、大小、速度的更動，於是，程式之間原來輸入與輸出的關係所依據的假設，也在有形或無形之中改變。事實上是一規格上的重大變更，這項變更有必要讓所有的開發人員知曉，並且從系統的角度來思考"
+ "每個小組之間盡可能地運用所有的方式進行溝通："
    + "非正式方式(informally): 良好的電話聯繫制度並明確定義出團隊之間的從屬關係，將可鼓勵電話的大量使用，從而使書面文件的到共同的理解"
    + "會議(meeting): 例行的專案會議是非常棒的方式，一個個小組上台做技術簡報，許多瑣碎的誤解可以透過這種方式消除掉"
    + "工作手冊(workbook): 專案一開始，皆應該準備好一份正式的專案工作手冊，並視為獨立的個別文件，文件包含：計畫目標、外部規格、介面規格、技術標準、內部規格、管理備忘錄"
+ "抱持著有今日的紀曆才能造就明日高品質的文件，定義出良好的文件組織結構是相當重要的"

#### <a name="預估">預估</a> ####

+ "寫一個獨立的小程式(program)所花的時間不能拿來做為預估整個軟體系統產品(programming systems product)的開發時程之用"
+ "根據經驗的小組評核，小組成員在上班時間只有50%是真正在寫程式或是除錯，至於剩餘的一半時間大多被機械壞掉、臨時交辦的緊急事務、開會、寫報告、行政庶務、生病、個人私事...等所佔用"

#### <a name="物盡其用">地盡其利，物盡其用</a> ####

+ "空間就是金錢，撇開執行速度的考量，程式執行時所耗用的空間基本上是要付出代價的，尤其是版權私有軟體(proprietary software)"
+ "由於軟體系統的大小對使用者的成本負擔影響非常大，軟體開發人員必須設定空間大小的目標(size target)，進而控制程式大小、發展節省空間的技術，這跟硬體開發人員設定元件數量的目標、控制元件數量、發展減少元件數量的技術是一樣的道理"
+ "聰明的管理者通常會為自己預留一些空間大小的彈性，以在工作進行的過程中式情況再做調配"
+ "重疊(overlay)是一種以時間換空間的技術，只把某一時間所需要的指令和資料放入記憶體，當需要載入其他指令時，就將新指令重疊、覆蓋，在已不再需要的舊指令位址上，這樣做將使程式執行時所佔用的記憶體比程式本身小"
+ "認知到寫程是有它專業的技術。每個專案都應該有個手冊專門蒐錄關於序列(queuing)、搜尋(searchinh)、雜湊(hashing)、排序(sorting)的一些很棒的副程式或巨集。蒐錄的每一個函式都應該至少包含兩套程式碼，一套是執行速度最快的，一套是使用空間最少的"
+ "當程式設計是為了空間不足的問題而顯得黔驢技窮之際，通常最好的做法，就是從程式碼中跳脫，回過頭去重新思考一下所使用的資料。資料的呈現方式式程式設計的本質(Representation is the essence of programming)"

#### <a name="文件">文件假說</a> ####

+ "管理者大部分的管理工作總是由成堆文件中的一小部分具體呈現出來，準備這一部分文件是為了讓思考集中，並且使討論言之有物，而非淪為漫無目的的空談。在衛護這類文件的時候，其實相當於在運作他的監督和預警機制。然而對於技術階級出身、首次擔任管理者的人而言，規劃作業似乎是繁瑣、無趣的麻煩事"
+ "軟體專案一開始管理者可立即從最關鍵的管理文件開始著手，以初步建立他的管理資料庫，而這最關鍵的管理文件，經證實與其他領域的管理者所規劃的文件並無不同"

#### <a name="成功之母">失敗為成功之母</a> ####

+ "無論是一個系統的新概念或新技術，都不可能一開始就百分之百完全掌握，計畫做得再完美還是會百密一疏，所以必須有丟掉重做的準備。所以，無論如何，把必然的一次失敗納入正式計畫之中(plan to throw one away; you will, anyhow)"
+ "設計一個系統，好讓它利於改變的方式包含：小心地模組化、善用副程式、為內部模組之間定義出明確而完整的介面，並且出完整的文件。也必須盡可能使用標準的呼叫程式(calling sequence)和表格驅動技術(table-driven)。更重要的是運用高階語言和自我說明技術(self-documenting)，以減少因改變而造成的錯誤。透過編譯時期的操作，將標準宣告融入程式的做法也非常有助於因應變化"
+ "表格驅動(table-driven)就是把程式執行時所用到的參數或設定值存放在一個表格檔案，而不是寫死在程式裡，當有需要改變時，就只要更改表格的內容即可，不必修改程式"
+ "設計人員不願意寫設計文件的原因不僅僅是由於懶惰或時程太趕的緣故，而是因為設計人員心裡明白有些程式決策是暫時的，所以不願意把它寫出來，然後還要為這些文件解釋老半天或是遭受眾人不必要的質疑，而必須對所承擔的任何東西都能夠自圓其說"
+ "軟體的變更並不會因為軟體已經交付給客戶之後就停止，軟體交付之後的變動叫做軟體維護(program maintenance)。維護的變動主要來自於修正設計錯誤，更多的情況則是為了增加新功能，而維護廣為使用的軟體必須付出相當於開發成本的40%，軟體的使用者越多，維護成本就越高，這是因為使用者越多，所發現到的錯誤也就越多的緣故"
+ "一般在解決錯誤的時候，都傾向於盡可能花最小的代價，並只專注在局部或明顯之處，所以，除非軟體的架構非常單純，或是文件寫得非常好，否則往往只是治標而沒有真正的治本。而負責修改錯誤的人通常不是程式原作者，而是菜鳥或新手"
+ "如果能在設計軟體的時候善用一些方法，以減少或至少留下文件說明那些變動將造成某些副作用，對於節省軟體維護的成本將有很大的助益。實作時，用較少的人、較少的介面，錯誤也會比較少"
+ "若說軟體開發是一個簡單化而逐漸趨於穩定的過程，那麼軟體維護則是複雜化且逐漸趨於混亂的過程，即使有很好的技巧，頂多也只能減緩這種趨勢，軟體終究會走到落伍，再也無法修改的那一天"

## 總結 ##

個人認爲這本書中半段闡述的經驗與見解，對軟體開發及維護的概念與思維或是管理的假說都是十分寶貴，也具有參考的價值。是一本適合程式設計師、專案經理閱讀的隨性書籍，以培養正確的心態。

=========== To be continued…. ==========

## Reference ##

+ [Mythical Man-Month, The: Essays on Software Engineering](https://www.amazon.com/-/zh_TW/Frederick-Brooks-Jr/dp/0201835959/ref=sr_1_1?adgrpid=84278570802&gclid=CjwKCAjw-8qVBhANEiwAfjXLrnZFLqQhSArV6mXUhzQRXeJfruD4Bvufibg7_dSbIPsCBsqLBwdU1RoCi6oQAvD_BwE&hvadid=585412618948&hvdev=c&hvlocphy=1012810&hvnetw=g&hvqmt=b&hvrand=2504481897720455931&hvtargid=kwd-18481627&hydadcr=22365_13333077&keywords=the+mythical+man+month&qid=1655961136&sr=8-1)

+ [Automatic Data Processing](https://www.softwarepreservation.org/projects/apl/Books/Iverson-AutomaticDataProcessing-bilevel.pdf)

[mythical]:https://www.amazon.com/Mythical-Man-Month-Software-Engineering-Anniversary/dp/0201835959 "https://www.amazon.com/Mythical-Man-Month-Software-Engineering-Anniversary/dp/0201835959"

[文章]:https://s311354.github.io/Louis.github.io/2022/06/22/閱讀心得_人月神話_I_The_Mythical_Man_Month/ "https://s311354.github.io/Louis.github.io/2022/06/22/閱讀心得_人月神話_I_The_Mythical_Man_Month/"
