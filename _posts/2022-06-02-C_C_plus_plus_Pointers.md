---
layout: post
title: "General Tips to C/C++ Pointers"
date: 2022-06-02
tags: [C_C_plus_plus, Programming]
---

#### Intorduction ####
Pointer usage is easy to cause the error-prone areas of Programming. Using pointer is universal in C and C++.

In this post, I would write the general tips on pointers down.

#### General Tips ####
+ Declare and define pointers at the same time: Assigning a variable its initial value close to where it is declared is generally good programming practice, and it's all the more valuable when working with pointers. Here is a safer approach:
    <details markdown=block>
    <summary markdown=span>*initialization.cc*</summary>
    <div class="language-shell highlighter-rouge"><pre class="highlight"><code class="hljs ruby"><span class="nb" style="font-size: 80%">Employee *employeePtr = new Employee;</span></code></pre></div></details>

+ Delete pointers at the same scoping level as they were allocated: Keep allocation and deallocationn of pointers symmetric.

+ Check pointers before using them: Before you use a pointer in a critical part of your program, make sure the memory location it points to is reasonable.

+ Check the variable referenced by the pointer before using it:  Sometimes you can perform reasonableness checks on the value the pointer points to.

+ Use extra pointer variables for clarity: By all means, don't skimp on pointer variables. The point is made elsewhere that a variable shouldn't be used for more than one purpose. Here's code that explicitly references all three of the objects involved:
    <details markdown=block>
    <summary markdown=span>*nodeinsert.cc*</summary>
    <div class="language-shell highlighter-rouge"><pre class="highlight"><code class="hljs ruby"><span class="nb" style="font-size: 80%">// Dobuly linked list
    void insertLink ( Node * startNode, Node * newMiddleNode) {
        Node *followingNode = startNode->next;
        newMiddleNode->next = followingNode;
        newMiddleNode->previous = startNode;
        if (followingNode != NULL) {
            followingNode->previous = newMiddleNode;
        }
        startNode->next = newMiddleNode;
    }</span></code></pre></div></details>

+ The strategy to deleting or freeing pointers: Pointer errors are hard to debug because the point at which the memory the pointer points to becomes invalid is not deterministic. You can force errors related to using deallocated pointers to be more consistent by overwriting memory blocks with junk data and check for bad pointers before they're deallocated. Further, keep track of pointer allocations and write cover routines to centralize your strategy to avoiding pointer problems.
    <details markdown=block>
    <summary markdown=span>*deallocatedpointer.cc*</summary>
    <div class="language-shell highlighter-rouge"><pre class="highlight"><code class="hljs ruby"><span class="nb" style="font-size: 80%">#define SAFE_DELETE(pointer) {
        ASSERT(pointer != NULL, "Attempting to delete null pointer.");
        if ( isPointerInList(pointer)) {
            memset(pointer, GARBAGE_DATA, MemoryBlockSize(pointer));
            RemovePointerFromList(pointer);
            delete pointer;
            pointer = NULL;
        } else {
            ASSERT( FALSE, "Attempting to delete unallocated pointer.");
        }
    }</span></code></pre></div></details>

#### Conclusions ####
Pointers are harder than average to understand, they're error-prone, and they thed to require machine-dependent, unportable code. Just memorize the pointer usage and in most of the scenarios we would not make mistake and save ourself a few headaches.

#### Reference ####
+ [Code Complete: A Practical Handbook of Software Construction, Second Edition ](https://www.amazon.com/Code-Complete-Practical-Handbook-Construction/dp/0735619670)

<p>Thanks for reading! Feel free to leave the comments below or <a href="mailto:qazqazqaz850@gmail.com">email</a> to me. Any pieces of advice or discussions are always welcome. :)</p>
