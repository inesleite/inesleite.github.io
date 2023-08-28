---
layout: post
title:   "Overview of Google C++ Naming Style Guide"
date:    2021-11-05
tags:    [C_C_plus_plus]
---

## Abstract ##
C++ language has many powerful features and is one of the main development languages used by many Google's open-source projects. In addition, many projects are also developed by C++, such as [A Simple C++ CSS Parser][cssparser], [Notepad++][notepad], ... etc. Even though the language has many powerful features, but this power brings with it complexity which turn can make code more bug-prone and harder to read and maintain. 

From my past work experiences, most of projects ussally follow its own project style guide for a large code repository. Here, I just wrote notes from [C++ Style Guide][googlestyleguide] from Google. The document is comprehensive and huge, so I am tring to study and overview ones that might be helpful for me to quickly recap the summary.

## C++ style notes from Google C++ style guide ##


### General Naming Rules ###
<font size="3" face="Courier New">
<table>
 <tr>
  <th>Naming Rules</th>
  <th>Description</th>
 </tr>
 <tr>
  <td>File Names</td>
  <td>Prefer to use underscores(_) rather than dash(-).</td>
 </tr>
 <tr>
  <td>Type Names</td>
  <td>Start with a captial letter and have a capital letter for each new word, with no underscores: MyExcitingClass.</td>
 </tr>
 <tr>
  <td>Variable Names</td>
  <td>All lowercase with underscores between words.</td>
 </tr>
 <tr>
  <td>Constant Names</td>
  <td>Named with a leading "k" followed by mixed case. Underscores can be used as separators in the rare cases where capitalization cannot be used for separation: kDaysInAWeek.</td>
 </tr>
 <tr>
  <td>Function Names</td>
  <td>Ordinarily, functions should start with a capital letter and have a capital letter for each new word, but accessors and mutator may be named like variables.</td>
 </tr>
 <tr>
  <td>Namespace Names</td>
  <td>Top-level namespace names are based on the project name. namespace names all are lowercase, with words separated by underscores.</td>
 </tr>
 <tr>
  <td>Enumerator Names</td>
  <td>Should be named like constants, not like macros. That is, use kEnumName not ENUM_NAME.</td>
 </tr>
 <tr>
  <td>Macro Names</td>
  <td>Name macros with a project-specific prefic. Should be named with all capitials and underscores.
  </td>
 </tr>
</table>
</font>

For more details, [C++ style naming][naming] is available to read the most description on C++ naming style.

### General Comments Rules ###
<font size="3" face="Courier New">
<table>
 <tr>
  <th>Comments Rules</th>
  <th>Description</th>
 </tr>
 <tr>
  <td>Comment Style</td>
  <td>Use either the // or /* */, as long as you are consistent.</td>
 </tr>
 <tr>
  <td>File Comments</td>
  <td>Every file should contain license boilerplate. Choose the appropriate boilerplate for the license used by the project (for example, Apach 2.0, BSD ...).</td>
 </tr>
 <tr>
  <td>Class Comments</td>
  <td>Every non-obvious class or struct declaration should have an accompanying comment that describes what it is for and how it should be used.</td>
 </tr>
 <tr>
  <td>Function Comments</td>
  <td>Comments at the definition of a function of a function describe operation. Its definition should have an explanatory comment.</td>
 </tr>
 <tr>
  <td>Variable Comments</td>
  <td>In general the actual name of the variable should be descriptive enough to give a good idea of what the variable is used for.</td>
 </tr>
 <tr>
  <td>Implementation Comments</td>
  <td>Should have comments in tricky, non-obvious, interesting, or important parts of your code.</td>
 </tr>
</table>
</font>

Note that: Do not state the obvious. In particular, don't literally describe what code does, unless the behavior is nonobvuius to a reader who understands C++ well. Instead, provide higer level comments that describe why the code does what it does, or make the code self describing.

For more details, [C++ style comments][comment] is available to read the most description on C++ comments style.

## Conclution ##
The guide describes many of consistency since this property is more important than individual preferences. I also like consistency and feel that it is nice for the pattern-matching engine in our brain to deal on the naming rules. Here is also a talk from [CppCon 2014: Titus Winters "The Philosophy of Google's C++ Code"][philosophy] that one of the maintainers of doc give a talk on this topic. I particularly like that fact of starting off the purpose of a style guide.

## Reference ##

[1] [Google C++ Style Guide](https://google.github.io/styleguide/cppguide.html)

[2] [Bob Archer's thoughts about programming: Google’s C++ Style Guide](http://www.randomprogramming.com/2014/10/googles-c-style-guide/)


[cssparser]:https://github.com/Sigil-Ebook/cssparser "https://github.com/Sigil-Ebook/cssparser"

[notepad]:https://github.com/notepad-plus-plus/notepad-plus-plus "https://github.com/notepad-plus-plus/notepad-plus-plus"

[naming]:https://google.github.io/styleguide/cppguide.html#Naming "https://google.github.io/styleguide/cppguide.html#Naming"

[comment]:https://google.github.io/styleguide/cppguide.html#Comments "https://google.github.io/styleguide/cppguide.html#Comments"

[googlestyleguide]:https://google.github.io/styleguide/cppguide.html "https://google.github.io/styleguide/cppguide.html"

[philosophy]:https://www.youtube.com/watch?v=NOCElcMcFik "https://www.youtube.com/watch?v=NOCElcMcFik"

<p>Thanks for reading! Feel free to leeve the comments below or <a href="mailto:qazqazqaz850@gmail.com">email</a> to me. Any pieces of advice or discussions are always welcome. :)
