---
layout: post
title:  Introduction of Container Map in C++ Standard Template Library (STL) - Updated 2022/01/23
tags: [C_C_plus_plus] 
---

## Brief

  Maps are associative containters that store elements formed by a combination of a key value and a mapped value, following a specific order.

  In a map, the key values are generally used to sort and uniquely identify the elements, while the mapped values store the content associated to this key, and typically implemented as binary search trees.

  The type of key and mapped value map may differ, and are grouped together in member type value_type, which is a pair type combining both:

  typedef pair< const Key, T > value_type;

## Member functions (C++ 11)

<h4><ul style="list-style-type:disc">
    <li>begin</li>
    - Return iterator to beginning
    <li>end</li>
    - Return iterator to end
    <li>size</li>
    - Return container size
    <li>insert</li>
    - Insert elements
    <li>find</li>
    - Get iterator to element
    <li>erase</li>
    - Erase elements
    <li>clear</li>
    - Clear content
</ul></h4>

You could find and learn more information from [std::map][map].

## Exercise 1: (Leetcode) 1128. Number of Equivalent dominoes Pairs

Description:
Given a list of dominoes, dominoes[i] = [a, b] is equivalent to dominoes[j] = [c, d] if and only if either (a==c and b==d), or (a==b and b==c) - that is, one domino can be rotated to be equal to another domino.

Return the number of pair (i, j) for which 0 <= i < j < dominoes.length, and dominoes[i] is equivalent to dominoes[j].

Solution:
<div class="language-shell highlighter-rouge"><pre class="highlight"><code class="hljs ruby"><span class="nb" style="font-size: 80%">typedef pair< int, int > two_int;
int Dynamic_Array_Exercise::numEquivDominoPairs_opt(vector< vector< int > >& dominoes) {
	int result = 0;
	map< pair< int, int >, int > dict;

	for(int i=0; i<dominoes.size(); i++){
		int a = dominoes[i][0], b = dominoes[i][1];
		// Sorting
		two_int key = {min(a, b), max(a, b)};
		// Count the same pair
		dict[key] += 1;
	}

	for(auto it = dict.begin(); it != dict.end(); it++){
		int value = it->second;
		result += value * (value-1) / 2;
	}
	return result;
}</span></code></pre></div>

The basic functions for caculating the number of equivalent dominoes pairs are as follows:
- Sorting the dominoes and count the number of equivalent dominoes pair
- Calculate the arithmetic series and summarize

## Exercise 2: Number of Fractions that Sum to 1
Description:
Given a list of lists fractions where each list contains [numerator, denominator] which represents the number numerator/denominator. 

Return the number of pairs of fractions there are sums to 1.

Solution:
<div class="language-shell highlighter-rouge"><pre class="highlight"><code class="hljs ruby"><span class="nb" style="font-size: 80%">int Solutions::sumFraction( std::vector &lt; std::vector &lt;int &gt; &gt; & fracrion)
{
    std::map &lt; std::pair &lt; int, int &gt;, int &gt; dict;
    int ans = 0;

    for (auto& elem : fracrion) {
        int g = gcd(elem[0], elem[1]);
        dict[{elem[0]/g, elem[1]/g}]++;
    }

    for (auto it = dict.begin(); it != dict.end() ; it++) {
        std::pair &lt;int, int &gt; key = it-&gt;first;
        int count = it->second;

        if (key.first * 2 > key.second) continue;
        if (key.first * 2 == key.second) {
            ans += count * (count - 1) /2;
        } else {
            auto it_match = dict.find({key.second - key.first, key.second});
            if ( it_match!= dict.end()) ans += count * it_match->second;  
        }
    }
    return ans;
}</span></code></pre></div>

The solution was initially extracted from [binary search: fractions][fractions] and then reworked. The basic functions for caculating the number of pairs of fractions there are sums to 1 are as follows:
- Accumulate the pair of 1/2
- Accumulate the rest of pair of the fractions there are sums to 1

=========== To be continued…. ==========

## Reference

[1] [C/C++ - Map (STL) 用法與心得完全攻略](https://mropengate.blogspot.com/2015/12/cc-map-stl.html) 

[2] [Containers: Map](http://www.cplusplus.com/reference/map/map/)

[3] [Binarysearch](https://binarysearch.com/problems/Number-of-Fractions-that-Sum-to-1/solutions/5690081)

[fractions]:https://binarysearch.com/problems/Number-of-Fractions-that-Sum-to-1/solutions/5690081 "https://binarysearch.com/problems/Number-of-Fractions-that-Sum-to-1/solutions/5690081"

[map]:https://en.cppreference.com/w/cpp/container/map "https://en.cppreference.com/w/cpp/container/map"

<p>If you have any constructive criticism or advises, leave the comments below or feel free to email me @qazqazqaz850@gmail.com.
Hope this post will help! :)
</p>
