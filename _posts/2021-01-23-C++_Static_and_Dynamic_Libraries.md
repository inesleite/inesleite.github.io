---
layout: post
title:   "C++ Static and Dynamic Libraries"
date:    2021-01-23 21:52
tags:    [C_C_plus_plus]
---

Most modern software systems provide libraries that implement the majority of the system service. Such libraries have orgianized the services which modern application requires. There are two types of libraries: Static and Dynamic Libraries.

<p align="center"><iframe src="https://giphy.com/embed/YGlRW1Am9q7e0" width="480" height="319" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></p>

## Definition of Library ##

A library is a collection of implementation of behavior that can be used repeatedly. Basically it is the binary mode of executable codes and can be loaded into the operation system to run. There are two types of libraries on Linux: static library and dynamic library.

According to wiki page, we could understand that "the code of the static library is accessed during the build of the invoking program. An alternative is to build the executable of the invoking program and distribute that, independently of the library implementation; The dynamic library behavior is connected after the executable has been invoked to be executed, either as part of the process of starting the execution, or in the middle of execution (loaded at runtime). It can be loaded and linked when preparing a program for execution, by the linker. Alternatively, in the middle of execution, an application may explicitly request that a module be loaded." 

The naming conventions:
- Static library: ".a" for Linux, ".lib" for windows
- Dynamic library: ".so" for Linux, ".dll" for windows

### Static Library ###

A static library can be simply treated as a set of ".o/.obj" files. It can be linked together with ".o/.obj" file from assemble to generate the executable file. In addition, the library is merged with the program at link time. Thus, the program has no dependencies on the library at runtime because the program already contains the libraries code.

Static libraries increase the space of the code in your binary. They're always loaded and whatever version of the code you complied with is the version of the code that will run.

<pre class="highlight">Generate Static Library<code class="hljs"><span class="nb"># ar under Linux
g++ -c StaticFunction.cpp
ar -crv libStaticFunction.a StaticFunction.o
</span></code></pre>

<pre class="highlight">Using of Static Library Under Linux<code class="hljs"><span class="nb">g++ Teststaticfunction.cpp -L../StaticFunction -lstaticfunction

#-L: specify the search path of static libraries.
#-l: specify the name of static libraries. No prefix or subfix.
</span></code></pre>

### Dynamic Library ###

A dynamic library will not be loaded into program until running. If different programs use the same dynamic library, there will be only one instance of the shared library in memory, by linker. This feature saves lots of memory and it is incremental undate. (When the library is updated, the programs that use this library don't need to be re-compiled, the user can simply update the library).

The common locations for shared libraries in a Linux system are:
- /lib
- /lib32
- /lib64
- /usr/lib
- /usr/local/lib

<pre class="highlight">Generate Dynamic Library<code class="hljs"><span class="nb">g++ -fPIC -c DynamicFunction.cpp
g++ -shared -o libdynamicfunction.so DynamicFunction.o
</span></code></pre>

<pre class="highlight">Configuration of Dynamic Library Under Linux<code class="hljs"><span class="nb"># Method 1: make sure that your system can be found the dynamic library

mv DynamicFunction.o /usr/lib

# Method 2: add the path to the dynamic library to /etc/ld.so.cache file and run ldconfig

$ cat /etc/ld.so.conf
include /etc/ld.so.conf.d/*.conf

$ ls /etc/ld.so.conf.d/
libc.conf  x86_64-linux-gnu.conf

$ cat /etc/ld.so.conf.d/x86_64-linux-gnu.conf
# Multiarch support
/lib/x86_64-linux-gnu
/usr/lib/x86_64-linux-gnu

# Method 3: manually set LD_LIBRARY_PATH environment that can be used to add new paths for shared libraries temporarily. It is made up of a colon-separated (:) set of directories where libraries are looked up.

</span></code></pre>

Note:

+ The path where the dynamic linker searches for the libraries is configured in the /etc directory, namely in the file /etc/ld.so.conf and in files residing in the /etc/ld.so.conf.d directory

+ PATH environment variable specifies the search paths for commands

+ LD_LIBRARY_PATH environment specifies the search paths for shared libraries for the linker

+ ldd command displays the shared objects (shared libraries) required by each program or shared object specified on the command line.

## Reference ##

- [Wiki: Library(computing)](https://en.wikipedia.org/wiki/Library_(computing))
- [C++ Static Libraries and Dynamic Libraries](https://xiaoyuliu.github.io/2018/03/19/compare-static-and-dynamic-library/)
- [Linux Installation and Package Management](https://learning.lpi.org/en/learning-materials/101-500/102/102.3/102.3_01/)

[blog]: https://xiaoyuliu.github.io/2018/03/19/compare-static-and-dynamic-library/
