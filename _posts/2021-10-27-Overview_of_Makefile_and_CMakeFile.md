---
layout: post
title:   "Overview of Makefile and CMakeFile"
date:    2021-10-27
tags:    [Processor, C_C_plus_plus]
---

## Abstract ##
Makefile or CMakefile is the GUN build system. The developer could express the recipe to build their package in Makefile or CMakefile. In the Unix world, such a build system is traditionally achieved using the command make for Makefile and cmake for CMakefile. There are some useful tutorials and comprehensive documentations in [CMake.org][cmake] but I just wrote and gave a short introduction for those that might not know it yet in this post.

## GUN Build System ##
GUN build systems were developed to simplify and automate running the compiler and linker and are essential part of modern software development. Build systems can be standalone command line applications or part of an IDE. Make and CMake are popular tools and be able to generate files for several build systems.

### Makefile ###
Makefile is a simple way to organize code compilation. For instance the porgram prog may be built by running the linker on the files main.o, foo.o, and bar.o; the file main.o may be built by running the compiler on main.c; etc. Each time make in run, it reads Makefile, checks the existence and modification time of the files mentioned, decides what files need to be built (or rebuilt), and runs the associated commands.

There are two distinct phases when GUN make reads a Makefile. The first phase reads all the makefiles, inculded makefile, etc. and internalizes all the variables and their values and implicit and explicit rules, and builds a dependency graph of all the targets and their prerequistites. The second phase uses this internalized data to determine which targets need to be updated and run the recipes necessary to update them.

Here is a simple makefile that describes the way an executable file.
<div class="language-shell highlighter-rouge"><pre class="highlight">Simple Makefile<code class="hljs ruby"><span class="nb">.PHONY: clean, mrproper    
CC = gcc                
CFLAGS = -g -O0 -ggdb -Wall..    

all: src/main           

%.o: %.c                
    -$(CC) $(CFLAGS) -c -o $@ $<    

main: main.o            
    $(CC) $(CFLAGS) -o $@ $+    

clean:                  
    rm -f src/*.o core.*    

mrproper: clean         
    rm -f container
</span></code></pre></div>

&lt;Note&gt;
<ul>
 <li>.PHONY: Using a target that is not a real file's name; rather it is just a name for a recipe to be executed when you make an explicit request.</li>
 <li>%: It matches any target files whatever exists.</li>
</ul>

### CMakefile ###
CMakefile is cross-platform and open-source software for build automation, testing, packaging and installation of software by using a compiler-independent method. Simple configuration files placed in each source directory, called CMakeList.txt fil). It can generate Makefiles for many platforms and IDEs inculding Unix, Windows, Mac OS X, Cygwin. The platform's native build tools are used for the actual building. So, in C/C++ ecosystem, the best tool for project configuration is CMake.

Here is an example of file structure:
<figure><center><img src="{{ site.baseurl }}/picture/file_structure.png" width="40%"></center></figure>

The first CMakeLists.txt specifies an executable target called name to be built from the source files. The second CMakeLists.txt specifies an executable target to be built from the source file (main.cc) and also adds definitions to the compiler command line for targets in the current directory. After building this source file using CMake, CMake identifies the environment settings for the Linux device and creates the Makefile. Once the Makefile has been created, the make command can be used to build the source file.


Note that, with Cmake, it supports to specify the build type on single-configuration generators, "[CMAKE_BUILD_TYPE][buildtype]". For example,

<div class="language-shell highlighter-rouge"><pre class="highlight"><code class="hljs ruby"><span class="nb">// Release build
cmake -DCMAKE_BUILD_TYPE=Release ..
make

// Debug build
cmake -DCMAKE_BUILD_TYPE=Debug ..
make</span></code></pre></div>

For more details, [CMAKE_BUILD_TYPE][buildtype] is available to read the description on the customed build type value.

## Conclution ##
The examples above provide a short introduction to Make/CMake and how it can be used to build. For more details, [CMake.org][cmake] is available to read the most up-to-date documentation.

## Reference ##
[1] [Introducing the GNU Build System](https://www.gnu.org/software/automake/manual/html_node/GNU-Build-System.html)

[2] [CMAKE Making Makefiles](https://people.math.sc.edu/Burkardt/examples/cmake/cmake.html)

[3] [Examples of the use of Makefiles](https://people.math.sc.edu/Burkardt/cpp_src/makefiles/makefiles.html)

[4] [Why We Need Build Systems](https://blog.feabhas.com/2021/06/why-we-need-build-systems/)

[5] [About CMake](https://cmake.org/overview/)

[6] [stackoverflow: Debug vs Release in CMake](https://stackoverflow.com/questions/7724569/debug-vs-release-in-cmake)

[cmake]:https://cmake.org "https://cmake.org"

[buildtype]:https://www.url.com "https://www.url.com"


<p>Feel free to leave the comments below or <a href="mailto:qazqazqaz850@gmail.com">email</a> to me. Any pieces of advice are always welcome. :)
