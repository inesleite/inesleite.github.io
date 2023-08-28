---
layout: post
title:   "GCC Compiling, Linking, Utilities and Specialized Tools"
date:    2021-01-31 12:48
tags:    [C_C_plus_plus]
---
[UPDATED 2022/06/13]

If you got in touch with free software before, you might hear Richard Stallman, who is the founder of the GNU Project and original author of the GNU Compiler Collection (GCC). He founded the GNU project in 1984 to start Unix-like operation system project.

The original GNU Compiler Collection (GCC) has grown over times to support many languages, inculdes frond ends for C, C++, Objective-C. In addition, it is a key component of so-called "GNU Toolchian", for developing applications and writing operation systems. The GNU Toolchain includes GNU Compiler Collection, GNU Make, GNU Binutils, GNU Debugger(GDB), GNU Autotools and GNU Bison. 

Here, I took notes of the concepts and some basic topics in this post. Hope it would be helpful to understand and recap the knowledge. :)

<p align="center"><iframe src="https://giphy.com/embed/SXxI9NlwvYiY3bRsck" width="480" height="319" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></p>
## GNU C Compiler (GCC) ##

GCC has been ported to a wide variety of platforms and instruction set architecture and is wide deployed as a tool in the development of both free and properiety software. GCC is also available for many embedded systems, including ARM-based and Power ISA-based chips.

For my MacOS, the GCC version is shown below. You could see that it is using GCC to compil 64-bit code and bringing code to 64-bit target architecture. 

<pre class="highlight"><code class="hljs"><span class="nb">$ gcc -v
Configured with: --prefix=/Library/Developer/CommandLineTools/usr --with-gxx-include-dir=/Library/Developer/CommandLineTools/SDKs/MacOSX.sdk/usr/include/c++/4.2.1
Apple clang version 12.0.0 (clang-1200.0.32.27)
Target: x86_64-apple-darwin20.1.0
Thread model: posix
InstalledDir: /Library/Developer/CommandLineTools/usr/bin
</span></code></pre>

### Compiler and Link Separately ###

A few commonly-used GCC compiler options are:
- -o: specifies the output executable filename
- -Wall: prints "all" Warning messages
- -g: generate additional symbolic debugging information for use with gdb debugger

<pre class="highlight">For example:<code class="hljs"><span class="nb">CC = gcc
CFLAGS = -g -Wall
DIR = obj
SDIR = src

INC = -I .

OUT = exe/timer

posix_timer:
	$(CC) $(CFLAGS) $(INC) -c $(SDIR)/$@.c -o $(DIR)/$@.o

main:
	$(CC) $(CFLAGS) $(INC) -o $(OUT) $@.c $(DIR)/*o

clean:
	rm -f $(DIR)/*.o $(OUT) core.*

mrproper: clean
	rm -f posix_timer
</span></code></pre>

### GCC Environment Variables ###

GCC uses the following environment variables:
- PATH: searching the executables and runtime shared libraries
- LIBRARY_PATH: searching library-paths for link libraries. It is searched after the paths specified in -L\<dir\> options


## Utilities for Examining the Compiled Files ##

For all the GNU utilities, you can use "man" command to display the man pages.

### file Utility ###

The utility "file" can be used to display the type of object files and executable files.

<pre class="highlight">For example:<code class="hljs"><span class="nb">$ file src/posix_timer.c
src/posix_timer.c: c program text, ASCII text 

$ file obj/posix_timer.o
obj/posix_timer.o: Mach-O 64-bit object x86_64

$ file exe/timer
exe/timer: Mach-O 64-bit executable x86_64
</span></code></pre>


### nm Utility ###

The utility "nm" lists symbol table of object files.

<pre class="highlight">For example:<code class="hljs"><span class="nb">$ nm obj/posix_timer.o
0000000000000110 T _hello_world
                 U _printf
                 U _pthread_cancel
                 U _pthread_self
00000000000000a0 T _should_kill_thread
                 U _sleep
                 U _time
</span></code></pre>

"nm" is commonly-used to check if a particular function is defined in an object file. The common symbol type are:
- T: indicates a function that is defined
- U: indicates a function which is undefined and should be resolved by the linker

### otool Utility ###

The utility "otool" is for MacOS system, its functionality is similar as ldd, and examines an executable to display a list of the shared libraries that it needs.

<pre class="highlight"><code class="hljs"><span class="nb">$ otool -L exe/timer
exe/timer:
        /usr/lib/libSystem.B.dylib (compatibility version 1.0.0, current version 1292.0.0)
</span></code></pre>

## Specialized Tools ##
C++ is intended for use in a wide variety of applications. As a result, it contains features that are particular to some applications and that need never (or rarely) be used by programmers, such as controlling memory allocation, run-time type identification, typeid operator, volatile qualifier ..., etc.

### Controlling Memory Allocation ###
Some application have specialized memory allocation needs that cannot be met by the standard memory management facilities. Such applications need to take over the details of how memory is allocated by arranging for new to put objects into particular kinds of memory. To do so, they can overload the **new** and **delete** operators to control memory allocation.

<details markdown=block>
<summary markdown=span>*overloading.cc*</summary>
<div class="language-shell highlighter-rouge"><pre class="highlight"><code class="hljs ruby"><span class="nb" style="font-size: 80%">string *sp = new string("a value"); // allocate and initialize a string 
string *arr = new string[10];  // allocate ten default initialized strings
void *operator new(size_t);              // allocate an object 
void *operator new[](size_t);            // allocate an array 

delete sp;        // destroy *sp and free the memory to which sp points 
delete [] arr;    // destroy the elements in the array and free the memory
void *operator delete(void*) noexcept;   // free an object 
void *operator delete[](void*) noexcept; // free an array
</span></code></pre></div></details>

By providing the definitions of the operator new and operator delete functions, we can change how memory is allocated. However, we cannot change this basic meaning of the new and delete operators.

### Run-Time Type Identification ###
Run-time type identification (RTTI) is provided through two operators:
+ The **typeid** operator: returns the type of a given expression
<details markdown=block>
<summary markdown=span>*typeid.cc*</summary>
<div class="language-shell highlighter-rouge"><pre class="highlight"><code class="hljs ruby"><span class="nb" style="font-size: 80%">Derived *dp = new Derived; 
Base *bp = dp;  // both pointers point to a Derived object 
// compare the type of two objects at run time 
if (typeid(*bp) == typeid(*dp)) {     
        // bp and dp point to objects of the same type 
} 
// test whether the run-time type is a specific type 
if (typeid(*bp) == typeid(Derived)) {         
        // bp actually points to a Derived
}</span></code></pre></div></details>

The typeid of a pointer (as opposed to the object to which the pointer points) returns the static, compile-time type of the pointer.

+ The **dynamic_cast** operator: safely converts a pointer or reference to a base type into a pointer or reference to a derived type
<details markdown=block>
<summary markdown=span>*dynamic_cast.cc*</summary>
<div class="language-shell highlighter-rouge"><pre class="highlight"><code class="hljs ruby"><span class="nb" style="font-size: 80%">sif (Derived *dp = dynamic_cast&lt;Derived*&gt;(bp)) {     
        // use the Derived object to which dp points 
} else {  // bp points at a Base object
        // use the Base object to which bp points }
}</span></code></pre></div></details>

If bp points to a Derived object, then the cast will initialize dp to point to the Derived object to which bp points. In this case, it is safe for the code inside the if to use Derived operations. Otherwise, the result of the cast is 0. If dp is 0, the condition in the if fails. In this case, the else clause does processing appropriate to Base instead.

&lt;NOTE:&gt;
RTTI should be used with caution. When possible, it is better to define a virtual function rather than to take over managing the types directly.

###  Volatile Qualifier ###
The precise meaning of volatile is inherently machine dependent and can be understood only by reading the compiler documentation. Programs that use volatile usually must be changed when they are moved to new machines or compilers. The **volatile** keyword is a directive to the compiler that it should not perform optimizations on such objects.

The volatile qualifier is used in much the same way as the const qualifier. There is no interaction between the const and volatile type qualifiers.

###  Linkage Directives: extern "C" ###
C++ programs sometimes need to call functions written in another programming language. Most often, that other language is C. In this case, 
C++ uses linkage directives to indicate the language used for any non-C++ function.

In addition, to allow the same source file to be compiled under either C or C++, the preprocessor defines **__cplusplus** (two underscores) when we compile C++. Using this variable, we can conditionally include code when we are compiling C++:

<details markdown=block>
<summary markdown=span>*Linkage.cc*</summary>
<div class="language-shell highlighter-rouge"><pre class="highlight"><code class="hljs ruby"><span class="nb" style="font-size: 80%">#ifdef __cplusplus 
// ok: we're compiling C++ 
extern "C" 
#endif 
int strcmp(const char*, const char*);</span></code></pre></div></details>

## Reference ##
+ [GCC and Make Compiling, Linking and Building C/C++ Applications](https://www3.ntu.edu.sg/home/ehchua/programming/cpp/gcc_make.html#zz-2.3)

+ [Wiki - Richard Stallman](https://en.wikipedia.org/wiki/Richard_Stallman)

+ [Compiling 64-Bit Code](https://developer.apple.com/library/archive/documentation/Darwin/Conceptual/64bitPorting/building/building.html)

+ [C++ Primer (5th Edition)](https://www.amazon.com/Primer-5th-Stanley-B-Lippman/dp/0321714113)

<p>Thanks for reading! Feel free to leave the comments below or <a href="mailto:qazqazqaz850@gmail.com">email</a> to me. Any pieces of advice or discussions are always welcome. :)</p>
