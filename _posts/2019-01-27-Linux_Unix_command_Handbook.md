---
layout: post
title: Linux/Unix command Handbook
tags: [Linux]
categories: [eating, travelling]
---
[UPDATED: 2022/02/23]

## Purpose 

During the period from graduating to being an Engineer, Linux/Unix commands becomes part of my working daily routine. Here, recording several useful and powerful commands to keep in mind.   

## Linux/Unix command

<h4><a name="TableContent"></a> Table of Contents </h4>
<h5><ol>
    <li><a href="#SED">SED command</a></li>
    <li><a href="#WC">WC command</a></li>
    <li><a href="#LN">LN command</a></li>
    <li><a href="#SEQ">SEQ command</a></li>
</ol></h5>

<h3><a name="SED"></a> SED command </h3>

\"sed\" is used for finding, parsing, text substitution, replacement and text manipulations such as insertion, deletion search etc. And, we also can use sed with regular expression.

<div class="language-shell highlighter-rouge"><pre class="highlight"><code class="hljs ruby">
<span class="nb">$ Usage: sed [OPTION]... {script-only-if-no-other-script} [input-file]... 
$
$  -i[SUFFIX], --in-place[=SUFFIX]
$                 edit files in place (makes backup if extension supplied).
$                 The default operation mode is to break symbolic and hard links.
$                 This can be changed with --follow-symlinks and --copy.
$
$  -e script, --expression=script
$                 add the script to the commands to be executed
$
$  ...
</span>
</code></pre></div>

Example:
<ol>
<li> Parsing the strings</li>
<div class="language-shell highlighter-rouge"><pre class="highlight"><code class="hljs ruby"><span class="nb">$ sed -e 's/^..............\(..\)/\1/' nput-file]
</span></code></pre></div>

This command is used for parsing the last two strings, line by line. 

<li> Replacement</li>
<div class="language-shell highlighter-rouge"><pre class="highlight"><code class="hljs ruby"><span class="nb">$ sed -i 's/abc/123/' [input-file]
</span></code></pre></div>
This command is used for replacing "abc" with "123".

<li> Add a line in a specific position</li>
<div class="language-shell highlighter-rouge"><pre class="highlight"><code class="hljs ruby"><span class="nb">$ sed '3iline 3' [input-file]
</span></code></pre></div>
This command is used for inserting the "line 3" text at line 3 in input-file file.
</ol>

<h3><a name="WC"></a> WC command </h3>

\"wc\" is used for print newline, word, and byte counts for each file. 

<div class="language-shell highlighter-rouge"><pre class="highlight"><code class="hljs ruby"><span class="nb">$ Usage: wc [OPTION]... [FILE]...
$
$   -l, --lines            print the newline counts
$   -w, --words            print the word counts
$  ...
</span></code></pre></div>

Example: 
<ol>
<li> Present the number of lines</li>
<div class="language-shell highlighter-rouge"><pre class="highlight"><code class="hljs ruby"><span class="nb">$ wc -le  [FILE]
</span></code></pre></div>
This command supports  more than one files.
</ol>


<h3><a name="LN"></a> LN command </h3>

\"ln\" is an utility for creating links between files. By default, the ln command creates hard links. To create a symbolic links use the -s (--symbolic) option.

<div class="language-shell highlighter-rouge"><pre class="highlight"><code class="hljs ruby"><span class="nb">$ Usage: ln [OPTION]... [-T] TARGET LINK_NAME   (1st form)
$  or:  ln [OPTION]... TARGET                  (2nd form)
$  or:  ln [OPTION]... TARGET... DIRECTORY     (3rd form)
$  or:  ln [OPTION]... -t DIRECTORY TARGET...  (4th form)
  
$  ...
$  -s, --symbolic              make symbolic links instead of hard links
$  -S, --suffix=SUFFIX         override the usual backup suffix
$  -t, --target-directory=DIRECTORY  specify the DIRECTORY in which to create
                                the links
$  ...
</span></code></pre></div>

Example: 
<ol>
<li> Creating Symlinks</li>
<div class="language-shell highlighter-rouge"><pre class="highlight"><code class="hljs ruby"><span class="nb">$ ln -s source_file symbolic_link
</span></code></pre></div>
This command creates symbolic link in Linux, replascing source_file with the name of the existing file for which you want to create the symbolic link and symbolic_link with the name of the symbolic link.
</ol>

<h3><a name="SEQ"></a> SEQ command </h3>

"seq" is an utility prints a sequence of numbers, one per line (default), from first (default 1), to near last as possible, in increments of incr (default 1).

<div class="language-shell highlighter-rouge"><pre class="highlight"><code class="hljs ruby"><span class="nb" style="font-size: 80%">$ Usage: :seq [-w] [-f format] [-s string] [-t string] [first [incr]] last
$ -f format     Use a printf(3) style format to print each number.
$ -s string     Use string to separate numbers.
$ ...
</span></code></pre></div>

Example:
<ol>
<li> Creating a sequence of numbers, one per line in a file </li>
</ol>
<div class="language-shell highlighter-rouge"><pre class="highlight"><code class="hljs ruby"><span class="nb" style="font-size: 80%">$ seq 100 104 > my_file.txt</span></code></pre></div>

=========== To be continued.... ==========

## Reference

[1] [SED command in Linux](https://www.geeksforgeeks.org/sed-command-linux-set-2/) 

[2] [General help using GNU software](http://www.gnu.org/gethelp/)

[3] [How to Create Symbolic Links in Linux Using the ln Command](https://linuxize.com/post/how-to-create-symbolic-links-in-linux-using-the-ln-command/#creating-symlinks-to-files)

## Note
<p>If you have any constructive criticism or advises, leave the comments below or feel free to email me @qazqazqaz850@gmail.com.
Hope this post will help! :)
</p>
