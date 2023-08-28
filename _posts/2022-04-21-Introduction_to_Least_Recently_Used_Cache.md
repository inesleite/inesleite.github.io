---
layout: post
title: "Introduction to Least Recently Used Cache"
date: 2022-04-21
tags: [Programming, Python]
---

"In computing, cache algorithms are optimizing instructions, or algorithms, that a computer program or a hardware-maintained structure can utilize in order to manage a cache of information stored on the computer. When the cache is full, the algorithm must choose which items to discard to make room for the new ones. ... from Wiki"

## Brief ##
Caching is an optimization technique that can use in the applications to keep recent or often-used data in memory locations that are faster or computationally cheaper to access than their source. 

A cache implemented using the LRU strategy organizes its items in order of use. Every time you access an entry, the LRU (least recently used) algorithm will move it to the top of cache. This way, the algorithm can quickly identify the entry that's gone unused the longest by looking at the bottom of the list. 

The LRU algorithm requires keeping track of what was used when, which is expensive if one wants to make sure the algorithm always discards the least recently used item. In general, the LRU cache should only be used when you want to reuse previously computed values.

In this post, I would like to briefly discuss about the simple concept of LRU cache in python and practice to design a data structure that follows the constraints of a Least Recently Used (LRU) cache.

### Properties ###
The basic properties of LRU caches:
+ Super fast accesses. LRU caches store items in order from most-recently used to least-recently used. That means both can be accessed in O(1) time.
+ Super fast updates. Each time an item is accessed, updating the cache takes O(1) time.

### Higher-Order functools.lru_cache() Function in Python ###
In python 3.7.13 standard library, the functools module creates higher-order functions that interact with other functions. The functools module defines the LRU caches function as @functools.lru_cache(maxsize=128, typed=False) which is a decorator to wrap a function with a memorizing callable. It can save time when an expensive or I/O bound function is periodically called with the same arguments. (more details, refer to [functools.lru_cache][cache] or [cpython: functools.py][functools])

Example of efficiently computing Fibonacci numbers using a cache to implement a dynamic programming technique:

<details markdown=block>
<summary markdown=span>*fibonacci.py*</summary>
<div class="language-shell highlighter-rouge"><pre class="highlight"><code class="hljs ruby"><span class="nb" style="font-size: 80%">@lru_cache(maxsize=None)
def fib(n):
    if n < 2:
        return n
    return fib(n-1) + fib(n-2)</span></code></pre></div></details>

Another simple example of operation using a cache to add two numbers:
<details markdown=block>
<summary markdown=span>*add_nums.py*</summary>
<div class="language-shell highlighter-rouge"><pre class="highlight"><code class="hljs ruby"><span class="nb" style="font-size: 80%">from functools import lru_cache

@lru_cache(None)
def add(x, y):
    print("calculating: %s + %s" % (x, y))
    return x + y

print(add(1, 2))
print(add(1, 2))
print(add(2, 3))
</span></code></pre></div></details>

Here is the output of addition operator using a cache:
<details markdown=block>
<summary markdown=span>*print statement*</summary>
<div class="language-shell highlighter-rouge"><pre class="highlight"><code class="hljs ruby"><span class="nb" style="font-size: 80%">$ python3 main.py
calculating: 1 + 2
3
3
calculating: 2 + 3</span></code></pre></div></details>

## Exercises ##
Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.

Implement the LRUCache class:

+ LRUCache(int capacity) Initialize the LRU cache with positive size capacity.
+ int get(int key) Return the value of the key if the key exists, otherwise return -1.
+ void put(int key, int value) Update the value of the key if the key exists. Otherwise, add the key-value + pair to the cache. If the number of keys exceeds the capacity from this operation, evict the least recently used key.

The functions get and put must each run in O(1) average time complexity.

Example 1: Input ["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"] [[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]
Output: [null, null, null, 1, null, -1, null, -1, 3, 4]

#### Solution ####
<details markdown=block>
<summary markdown=span>*lru_cache.py*</summary>
<div class="language-shell highlighter-rouge"><pre class="highlight"><code class="hljs ruby"><span class="nb" style="font-size: 80%">class LRUCache:
    def __init__(self, capacity: int):
        self.cache = {}
        self.capacity = capacity

    def get(self, key: int) -&gt; int:
        if key in self.cache:
            # Call to put to handle LRU placement
            self.put(key, self.cache[key])
        # Return a default of '-1' if key does not exist
        return self.cache.get(key, -1)

    def put(self, key: int, value: int) -&gt; None:
        # Remove key-value if it exists
        self.cache.pop(key, None)
         # Insert key-value at top of key stack
        self.cache[key] = value
        if len(self.cache) &gt; self.capacity:
            # Delete LRU (bottom of key stack)
            del self.cache[next(iter(self.cache)</span></code></pre></div></details>
The solution was learned from [LeetCode Discuss][discuss1].

=========== To be continued…. ==========

## Reference ##

+ [The Python Standard Library: @functools.lru_cache](https://docs.python.org/3.7/library/functools.html#functools.lru_cache)
+ [Every Python Programmer Should Know LRU_cache From the Standard Library](https://betterprogramming.pub/every-python-programmer-should-know-lru-cache-from-the-standard-library-8e6c20c6bc49)
+ [Wiki: Cache replacement policies](https://en.wikipedia.org/wiki/Cache_replacement_policies)
+ [LRU Cache in Python using OrderedDict](https://www.geeksforgeeks.org/lru-cache-in-python-using-ordereddict/)
+ [Caching in Python Using the LRU Cache Strategy](https://realpython.com/lru-cache-python/)

[cache]:https://docs.python.org/3.7/library/functools.html#functools.lru_cache "https://docs.python.org/3.7/library/functools.html#functools.lru_cache"

[functools]:https://github.com/python/cpython/blob/3.7/Lib/functools.py "https://github.com/python/cpython/blob/3.7/Lib/functools.py"

[discuss1]:https://leetcode.com/problems/lru-cache/discuss/1221997/Python-or-Extremely-Simple-Soln.-Explained-or-Beats-99 "https://leetcode.com/problems/lru-cache/discuss/1221997/Python-or-Extremely-Simple-Soln.-Explained-or-Beats-99"

<p>Thanks for reading! Feel free to leave the comments below or <a href="mailto:qazqazqaz850@gmail.com">email</a> to me. Any pieces of advice or discussions are always welcome. :)</p>
