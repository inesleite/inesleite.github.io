---
layout: post
title:   "Basic Bash Script Cheatsheet"
date:    2021-10-05
tags:    [Linux]
---
Bash is a Unix shell and a command processor that can read and execute commands from a file called a shell script. Like all Unix shells, it supports condition-testing and iteration ….etc. In addition, Bash has lots of different kinds of brackets, such as curly brackets, square brackets, parentheses. In this post, I was sorting out some information and hope these information will be helpful to you or anyone who is interested.

## Parentheses "()" ##
<h4><a name="TableContent"></a>List of Parentheses:</h4>
<h6><ol>
    <li><a href="#SingleParentheses">Single Parentheses</a></li>
    <li><a href="#DoubleParentheses">Double Parentheses</a></li>
    <li><a href="#DollarSingleParentheses">Dollar Single Parentheses</a></li>
</ol></h6>

### <a name="SingleParentheses">Single Parentheses</a> ###
The first use is running commands inside in a subshell. This means that they run through all the commands inside, and then any variables declared or environment changes will get cleaned up after executing. Because it's with in a subshell, 
<pre class="highlight"><code class="hljs"><span class="nb" style="font-size: 80%">$ a='This string'
$ echo $a
This string
$ (a='Inside parentheses')
$ echo $a
This string</span></code></pre>

The second use is declaring arrays. 
<pre class="highlight"><code class="hljs"><span class="nb" style="font-size: 80%">$ cheeses=('cheddar' 'swiss' 'brie')
$ echo ${cheeses[2]}
swiss

$ for cheese in $cheeses; do
$ for>    echo "$cheese"
$ for> done
cheddar
swiss
brie</span></code></pre>

### <a name="DoubleParentheses">Double Parentheses</a> ###
This is for use in integer arithmetic, such as assignment, logical operations, and mathematic operations like multiplication or modulo. But, do note that there is no output.

<pre class="highlight"><code class="hljs"><span class="nb" style="font-size: 80%">$ i = 4
$ (( i += 3 ))
$ echo $i
7</span></code></pre>

### <a name="DollarSingleParentheses">Dollar Single Parentheses</a> ###
This is for interpolating a subshell command output into a string.

<pre class="highlight"><code class="hljs"><span class="nb" style="font-size: 80%">$ a = 5
$ b=$( a=1000; echo $a )
$ echo $b
1000
$ echo $a
5</span></code></pre>

## Square Brackets "[]" ##
<h4><a name="TableContent"></a>List of Square Brackets</h4>
<h6><ol>
    <li><a href="#SingleSquare">Single Square Brackets</a></li>
    <li><a href="#DoubleSquare">Double Square Brackets</a></li>
</ol></h6>

### <a name="SingleSquare">Single Square Brackets</a> ###
This is an alternate version of the built-in test. When executing the command, it could check for truthiness, like checking if a file exists or if it's a directory.
<pre class="highlight"><code class="hljs"><span class="nb" style="font-size: 80%">$ touch my_friends.txt
if [ -f my_friends.txt]
 then
    echo "I'm loved!"
else
    echo "I'm so alone"
fi
I'm loved</span></code></pre>

### <a name="DoubleSquare">Double Square Brackets</a> ###
Double square brackets support extended regular expression matching. Just use quotes around the second argument to force a raw match instead of a regex match. 

<pre class="highlight"><code class="hljs"><span class="nb" style="font-size: 80%">$ pid=good
$ [[ $pie = ~d ]]; echo $?
0 // it matches the regex!</span></code></pre>

## Braces "{}" ##
<h4><a name="TableContent"></a>List of Braces</h4>
<h6><ol>
    <li><a href="#Function">Function Braces</a></li>
    <li><a href="#SingleCurly">Single Curly Braces</a></li>
    <li><a href="#DollarBraces">Dollar Braces</a></li>
</ol></h6>

### <a name="Function">Function Braces</a> ###
Functions are a little bit stranger in Bash than many other languages. First of all, there're several ways to define them, that are all totally equivalent:

<pre class="highlight"><code class="hljs"><span class="nb" style="font-size: 80%">$ function hi_there() {
function> name="$1"
function> echo "HI $name"
function> }

or 

$ hi_there() {
function> name="$1"
function> echo "HI $name"
function> }

$ hi_there shirong
HI shirong</span></code></pre>

### <a name="SingleCurly">Single Curly Braces</a> ###
The first use for these braces is expression.

<pre class="highlight"><code class="hljs"><span class="nb" style="font-size: 80%">$ echo "I am "{cool,great,awesome}
I am cool I am great I am awesome

$ mv friends.txt{,.bak}
$ ls friends
friends.txt.bak</span></code></pre>

The second use is grouping commands.

### <a name="DollarBraces">Dollar Braces</a> ###
The first use is for variable interpolation.

<pre class="highlight"><code class="hljs"><span class="nb" style="font-size: 80%">$ fruit=banana
$ echo ${fruit}ification
fruitification</span></code></pre>

The second use is variable manipulation.
<pre class="highlight"><code class="hljs"><span class="nb" style="font-size: 80%">$ function sign_in() {
function> name=$1
function> echo "Signing in as ${name:-$( whoami )}"
function> }

$ sign_in
Signing in as shi-rongliu</span></code></pre>

The third use is chopping off piece that match a pattern.
<pre class="highlight"><code class="hljs"><span class="nb" style="font-size: 80%">$ url=https://assertnotmagic.com/about
$ echo ${url#*/} // Remove from the front of matching pattern
/assertnotmagic.com/about

$ echo ${url%/*} // Remove from the back of matching pattern
https://assertnotmagic.com</span></code></pre>

=========== To be continued…. ==========

## Reference ##

[1] [Bash Brackets Quick Reference](https://www.assertnotmagic.com/2018/06/20/bash-brackets-quick-reference/)

[2] [Wike: Bash(Unix shell)](https://en.wikipedia.org/wiki/Bash_(Unix_shell))

[3] [Bash Script 語法解析](https://medium.com/vswe/bash-shell-script-cheat-sheet-15ce3cb1b2c7)

[4] (StackExchange: creating a sequence of numbers, one per line in a file)(https://unix.stackexchange.com/questions/25592/creating-a-sequence-of-numbers-one-per-line-in-a-file)