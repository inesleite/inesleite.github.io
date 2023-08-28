---
layout: post
title:   "Detect Memory Issues by Using Valgrind"
date:    2021-02-28
tags:    [C_C_plus_plus, Programming]
---

Valgrind tools support to autimatically detect many memory management and threading bugs, and profile the programs in the detail. Some of the most difficult C/C++ bugs come from mismanagement of memory: allocating the wrong size, using an uninitialized pointer, accessing memory after it was freed, overrunging a buffer, and so on. These types of errors are tricky, as they can provide little debugging information, such as "Segmentation fault", and tracing the observed problem back to underlying root cause can be challenging.

## Memcheck ##
Memcheck is the default tool on the Valgrind command line, specifes "\-\-tool=memcheck", a memory detector. It assists us to detect the memory issues that are common in C/C++ programs. There are two types of issues on memory errors and memory leaks.

### Memory Errors ###
The memory error is a red alert and should never be treated casually or ignored. You should keep in mind that errors are the primary concern. The most common memory errors are:

<ul>
<li>Accessing memory you shouldn't, e.g. overrunging and underrunning heap blocks, overrunging the top of the stack, and accessing memory after it has been freed.</li>
<li>Using undefined values, i.e. values that have not been initialised, or that have been derived from other undefined values.</li>
<li>Incorrect freeing of heap memory, such as double-freeing heap blocks, or mismatched use of malloc/new/new[] versus free/delete/delete[].</li>
<li>Overlapping src and dst pointers in memcpy and related function.</li>
<li>Passing a fishy (presumably negative) value to the size parameter of memory allocation function.</li>
</ul>

### Memory Leaks ###
The memory leaks occur when you allocate heap memory (with new or malloc/calloc) but don't free it. Valgrind categorizes leaks using these terms:

<ul>
 <li>"definitely lost": this means that no pointer to the block can be found. The block is classidied as "lost", because the programmer could not possibly have freed it at program exit, since no pointer to it exists. This is likely a symptom of having lost the pointer at some eariler point in the program. Such cases should be fixed!</li>
 <li>"indirectly lost": this means that the block is lost, not because there no pointers to it, but rather because all the blocks that point to it are themselves lost. The problem will disappear if the definitely lost block that caused the indirect leak is fixed.</li>
 <li>"possibly lost": This means that a chain of one or more pointers to the block has been found, but at least one of the pointers is an interior-pointer. This could just be a random value in memory that happens to point into a block.</li>
 <li>"still reachable": A start-pointer or chain of start-pointers to the block is found. Since the block is still pointed at, you could have freed it before program exit. </li>
</ul>

### Memcheck Command-Line Options ###
There are many other options and ways in which you can run memcheck. Here, I tried to list some of the more common or remarkable options to pass to valgrind

<ul>
 <li>--leak-check=<no|summary|yes|full> [default: summary]: If set to "summary", it says how many leaks occurred.</li>
 <li>--show-leak-kinds=&lt;set&gt; [default: definite,possible]: If set to "all, it specifes the complete set (all leak kinds)"</li>
 <li>--errors-for-leak-kinds=&lt;set&gt; [default: definite,possible]: The set is specified similarly to --show-leak-kinds</li>
 <li>--trace-children=<yes|no> [default: no]: If set to "yes", it will trace into sub-processes initiated via the exec system call. This is necessary for multi-process programs.</li>
</ul>

For more details, you could refer to the [Memcheck Manual][memcheck] or [valgrind linux manual][valgrind] page.

## Reference ##

[Valgrind's documentation](https://www.valgrind.org/docs/manual/manual.html)

[Memcheck: a memory error detector](https://www.valgrind.org/docs/manual/mc-manual.html)

[LouisBrunner/valgrind-macos](https://github.com/LouisBrunner/valgrind-macos)

[Valgrind - Linux manual page](https://man7.org/linux/man-pages/man1/valgrind.1.html)

[Vgdb - Linux manual page](https://man7.org/linux/man-pages/man1/vgdb.1.html)

[memcheck]:https://www.valgrind.org/docs/manual/mc-manual.html "https://www.valgrind.org/docs/manual/mc-manual.html"

[valgrind]:https://man7.org/linux/man-pages/man1/valgrind.1.html "https://man7.org/linux/man-pages/man1/valgrind.1.html"
