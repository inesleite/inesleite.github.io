---
layout: post
title:   "Introduction of Name Mangle and Demangle"
date:    2021-09-09
tags:    [Programming,C_C_plus_plus]
---

## Intorduction ##
When developing in C++, one of usual tasks is to demangle the name of a C++ method. Because the linkers only support C identifiers for symbol names, but don't have any knowledge of C++'s namespaces, object, overload functions, etc. That means the C++ compiler needs to generate C identifier compatible symbols for C++ constructs. This process is called "Name mangling", the resulting symbol is a "mangled symbol", and reconstrucing the original C++ name is "demangling". In this post, I would like to go through the concept of name mangling and explan some ways to do demangle.

## Name Mangling ##
The mangling scheme was estibalished by Microsoft and has been informally followed by other compilers including GNU GCC and Clanging, etc. The Name mangling is the process in which descriptive data is added to a functions identifier at link time. This data indicates which namespace and object (if any) that a function belongs to, along with the argumnets that it is designed to handle and the order in which those arguments should be passed.

### How names and mangled ###
There isn't a standarized scheme by which even trivial C++ identifiers are mangled, and consequently different compilers mangle public symbols in radically different ways. But, Here I take the "clang-1205.0.22.9" C++ compiler to mangle the a simple class including empty container constructor and a member function.

<div class="language-shell highlighter-rouge"><pre class="highlight"><code class="hljs ruby"><span class="nb">// Basic class
class CA
{
    public:
        CA(){};
        void func1(map<pair<int, int>, int>& container);
};

$ nm basic_class.o | rg "CA
0000000000000000 T __ZN2CA5func1ERNSt3__13mapINS0_4pairIiiEEiNS0_4lessIS3_EENS0_9allocatorINS2_IKS3_iEEEEEE
0000000000000600 T __ZN2CAC1Ev
00000000000009e0 T __ZN2CAC2Ev
</span></code></pre></div>

&lt;Note&gt; Attributes in the mangled name:
<ul>
 <li>Indication things are mangled: _Z</li>
 <li>Nested name indication: N&lt;numver&gt;</li>
 <li>Each component of the method name, including namespace, classes, and name, with a length and the identifier</li>
 <li>Argument types</li>
 <li>Const indication</li>
 <li>Reference indication</li>
</ul>

You could find and learn more information from [Wiki: Name mangling][namemangling]

### Useful Utilities ###
In order to make mangled name readable, there are two useful binary utilities in [GNU Binutils][gunbinutils] to decipher individual symbols and demangle compiled C++ names: [c++filt][c++filt] and [nm][nm]. The c++filt utility is enable to demangle low-level names into user-level names so that the linker can keep these overloaded function from clash; The nm utility is enable to examine binary files and to display the contents of those files, and also supports the option to demangle low-level symbol names into user-level names (The optional demangling style arhyment can be used to choose an appropriate demangling style for your compiler.).

#### Using c++filt binary tool ####
The command line of c++filt utility basically pass an entire assembler source file that containing mangled names and decipher individual symbols. Also, see the same source file containing demangled names. Here's the utility's syntax:

<div class="language-shell highlighter-rouge"><pre class="highlight"><code class="hljs ruby"><span class="nb">$ c++filt -h
OVERVIEW: llvm symbol undecoration tool

USAGE: c++filt [options] &lt;mangled&gt;
</span></code></pre></div>

And the following examples show the simple method to work with this command:
<div class="language-shell highlighter-rouge"><pre class="highlight"><code class="hljs ruby"><span class="nb">$ c++filt -n _Z1fv
f()</span></code></pre></div>

#### Using nm binary tool ####
The command line of nm utility basically lists symbols from object files. Here's the utility's syntax:

<div class="language-shell highlighter-rouge"><pre class="highlight"><code class="hljs ruby"><span class="nb">$ nm -h                                
OVERVIEW: llvm symbol table dumper
USAGE: nm [options] &lt;input files&gt;</span></code></pre></div>

And the following examples show how the command works:

<div class="language-shell highlighter-rouge"><pre class="highlight"><code class="hljs ruby"><span class="nb">$ nm inherit.o
0000000100003e54 s GCC_except_table19
0000000100003e94 s GCC_except_table22
0000000100003eb8 s GCC_except_table54
0000000100003ecc s GCC_except_table59
                 U __Unwind_Resume
0000000100002b70 T __ZN2CA5func1Ev
0000000100002c80 T __ZN2CA5func2Ev
0000000100002cc0 T __ZN2CA5func3Ev
0000000100002fd0 t __ZN2CAC1Ev
0000000100003030 t __ZN2CAC2Ev
...

$ nm --demangle inherit.o 
0000000100003e54 s GCC_except_table19
0000000100003e94 s GCC_except_table22
0000000100003eb8 s GCC_except_table54
0000000100003ecc s GCC_except_table59
                 U __Unwind_Resume                                                                                                             
0000000100002b70 T CA::func1()
0000000100002c80 T CA::func2()
0000000100002cc0 T CA::func3()
...
</span></code></pre></div>

&lt;NOTE:&gt; The common symbol types:

<font size="3" face="Courier New">
<table>
 <tr>
  <th>Shorthand</th>
  <th>Type</th>
 </tr>
 <tr>
  <td>t or T</td>
  <td>The symbol is in the text(code) section</td>
 </tr>
 <tr>
  <td>s or S</td>
  <td>The symbol is in uninitialized or zero-initialized data section for small objects.</td>
 </tr>
 <tr>
  <td>U</td>
  <td>The symbol is undefined</td>
 </tr>
 <tr>
  <td>g or G</td>
  <td>The symbol is in an initialized data section for small objects. Some object file formats permit more efficient access to small data objects, such as a global int variable as opposed to a large global array.</td>
 </tr>
</table>
</font>

## Reference ##

[1] [Programming Utilities Guide: C++ Mangled Symbols](https://docs.oracle.com/cd/E19504-01/802-5880/6i9k05dgm/index.html)

[2] [Wiki: Name mangling](https://en.wikipedia.org/wiki/Name_mangling)

[3] [The Secret Life of C++: Symbol Mangling](http://web.mit.edu/tibbetts/Public/inside-c/www/mangling.html)

[4] [GUN Binary Utilities: c++filt](https://sourceware.org/binutils/docs/binutils/c_002b_002bfilt.html)

[5] [cpp_demangle: a C++ linker symbol demangler](https://github.com/gimli-rs/cpp_demangle)

[namemangling]:https://en.wikipedia.org/wiki/Name_mangling "https://en.wikipedia.org/wiki/Name_mangling"

[gunbinutils]:https://www.gnu.org/software/binutils/ "https://www.gnu.org/software/binutils/"

[nm]:https://sourceware.org/binutils/docs/binutils/nm.html#nm "https://sourceware.org/binutils/docs/binutils/nm.html#nm"

[c++filt]:https://sourceware.org/binutils/docs/binutils/c_002b_002bfilt.html "https://sourceware.org/binutils/docs/binutils/c_002b_002bfilt.html"

<p>Feel free to leave the comments below or <a href="mailto:qazqazqaz850@gmail.com">email</a> to me. Any pieces of advice are always welcome. :)
