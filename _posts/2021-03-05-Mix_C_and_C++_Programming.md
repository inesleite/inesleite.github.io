---
layout: post
title:   "Mix C and C++ Programming"
date:    2021-03-04
tags:    [C_C_plus_plus]
---

The C++ language provides a "[Language linkage][link]" mechanisms for mixing code that is compiled by compatible C and C++ in the same program. Every function type, every function name with external linkage, and every variable name with external linkage, has a property called language linkage. The mechanism might be helpful to solve common problems that arise when you mix C and C++ code and run into portability issues. In this blog post, I will take notes of how to mix C and C++ in the same program. 

<p align="center"><iframe src="https://giphy.com/embed/PiWfijeEeJEI0uB7j6" width="480" height="319" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></p>

## Compatibility of C and C++ ##

In the strict mathematical sense, C isn't a subset of C++. There are programs that are valid C but not valid C++ and even a few ways of writing code that has a different meaning in C and C++. However, C++ supports every programming technique supported by C95 and earlier. Every such C program can be written in essentially the same way in C++ with the same run-time and space efficiency. It is common to be able to convert tens of thousands of line of ANSI C to C-style C++ in few hours. 

Note that there are some very subtle differences between C and C++, like sizeof('x') is equal to sizeof(char) in C++ but is equal to sizeof(int) in ANSI C. Also, C++ puts structure "tags" in the same namespace as other names, whereas C requires an explicit struct (e.g., the typedef struct Linkedlist Linkedlist; techniques still works, but is redundant in C++).


## C and C++ Linkage ##

Here are some high points while mixing C and C++ in the same program.

### How to call a C function and own C header from C++ code ###
Just declare the C function extern "C" in C++ code and call it from C++ code. In addition, since a C compiler won't understand the extern "C" construct, you must wrap it in an #ifdef so they won't be seen by normal C compilers.

<pre>Example of C header:<code class="hljs"><span id="snippet_spn" class="snippet-span">// example.h
#ifdef __cplusplus
extern "C" {
#endif
...
void f(int, char c, float x);
int g(double);
...
#ifdef __cplusplus
}
#endif</span></code><div class="flex-end"></div></pre> 

<pre>Example of C code:<code class="hljs"><span id="snippet_spn" class="snippet-span">// example.c code
void f(int i char c, float x) {
    /* ... */
}

int g(double d) {
    /* ... */
}</span></code><div class="flex-end"></div></pre> 

<pre>Example of C++ code:<code class="hljs"><span id="snippet_spn" class="snippet-span">// c++ code
#include "example.h"

void main() {
    f(7, 'string', 3.14);
    int count = g(123);
}
</span></code><div class="flex-end"></div></pre> 

### How to call a C++ function and pass an object of C++ class from C ###
Just do the similar way as above in C++ code and it. 

<pre>Example of C++ header:<code class="hljs"><span id="snippet_spn" class="snippet-span">// example.h code
extern "C" {
    void f(int);
    // Call overloaded functions from C
    void f_i(int i) { f(i); }
    double call_CA_g(CA* p, int i) { return p->g(i); }
};</span></code><div class="flex-end"></div></pre> 


<pre>Example of C++ code:<code class="hljs"><span id="snippet_spn" class="snippet-span">// example.cpp code
// non-member function
void f(int i) {
    /* ... */
}

// member function
class CA {
    virtual double g(int);
}</span></code><div class="flex-end"></div></pre> 


<pre>Example of C code:<code class="hljs"><span id="snippet_spn" class="snippet-span">// c code
void f(int);
void f_i(int);
double call_CA_g(struct* p, int i);

void call_g(struct CA* p, int i) {
    f(i);
    f_i(i);
    double d = call_CA_g(p, i);
}</span></code><div class="flex-end"></div></pre> 

Note that these techniques can be used to call a C++ library from C code even if you cannot (or do not want to) modify the C++ headers.

### Explanation of language linkage ###

Language linkage encapsulates the set of requirements necessary to link with a module written in another programming language. 

For more details, you could refer to the [Language linkage][link]  page.

## Reference ##

[Language linkage](https://en.cppreference.com/w/cpp/language/language_linkage)

[ISO C++: How to mix C and C++](https://isocpp.org/wiki/faq/mixing-c-and-cpp)

[Mixing C and C++ Code in the Same Program](https://www.oracle.com/technical-resources/articles/it-infrastructure/mixing-c-and-cplusplus.html)

[Wiki: Compatibility of C and C++](https://en.wikipedia.org/wiki/Compatibility_of_C_and_C%2B%2B)

[ISO C++: Is C++ backward compatible with ANSI/ISO C?](https://isocpp.org/wiki/faq/big-picture#back-compat-with-c)

[link]:https://en.cppreference.com/w/cpp/language/language_linkage "https://en.cppreference.com/w/cpp/language/language_linkage"
