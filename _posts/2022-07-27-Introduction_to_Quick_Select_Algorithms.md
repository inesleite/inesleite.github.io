---
layout: post
title: "Intorduction to Quick Select Algorithm"
date: 2022-07-27
tags: [Algorithms, Python]
---

"In computer science, quickselect is a selection algorithm to find the kth smallest element in an unordered list. It is related to the quicksort sorting algorithm. Like quicksort, it was developed by Tony Hoare, and thus is also known as Hoare's selection algorithm. Like quicksort, it is efficient in practice and has good average-case performance, but has poor worst-case performance. Quickselect and its variants are the selection algorithms most often used in efficient real-world implementations." from Wiki page.

<figure><center><img src="https://upload.wikimedia.org/wikipedia/commons/f/fe/Quicksort.gif" width="100%"></center></figure>

## Brief ##

The quick selection is a algorithm that can efficiently find the k-th smallest/largest element in an unordered list. It selects a pivot, partitions the array into two parts, and repeats this process recursively. It's alternatively called divide-and-conquer algorithm. The algorithm has good average performance, but is sensitive to the pivot that is chosen. If good pivots are chosen, meaning ones that consistently decrease the search set by a given fraction, so the time complexity is almost certain O(n). However, if bad pivots are consistently chosen, such as decreasing by only a single element each time, so the worst-case time complexity will be O(n^2). It's an extermely powerful algorithm.

In this post, I would like to briefly discuss about several practices for the applications of quick select algorithm, such as Find Kth Largest Element in an Array and Top K Frequent Elements.

### The General Process ###

Quickselect uses the same overall approach as quicksort, choosing one element as a pivot and partitioning the data in two based on the pivot, accordingly as less than or greater the pivot. However, instead of recursing into both sides, as in quicksort, quickselect only recurses into one side - the side with the element it is searching for. Here is the general process:

1. Pick a pivot point
2. Move all elements that are larger than or equal to the pivot to the left and vice versa.
3. If the position of pivot is equal to k, then we can find the kth largest value at pivot point
4. If not, perform quick select on the left partition or right partition depending on the kth largest element in the position after/before k

## Exercises ##

<h6><ol>
<li><a href="#kthelement">Find Kth Largest Element in an Array</a></li>
<li><a href="#topk">Top K Frequent Elements</a></li>
</ol></h6>

### <a name="kthelement">Find Kth Largest Element in an Array</a> ###

Given an integer array nums and an integer k, return the kth largest element in the array. Note that it is the kth largest element in the sorted order, not the kth distinct element. You must solve it in O(n) time complexity.

Example: Input: nums = [3,2,1,5,6,4], k = 2. Output: 5

<details markdown=block>
<summary markdown=span>*findKthLargest.py*</summary>
<div class="language-shell highlighter-rouge"><pre class="highlight"><code class="hljs ruby"><span class="nb" style="font-size: 80%">def findKthLargest(self, nums: List[int], k: int) -&gt; int:
    # time:O(N) space:O(1)
    start, end = 0, len(nums) - 1
    def swap(i, j):
        nums[i], nums[j] = nums[j], nums[i]

    def find_pivot_idx(start, end):
        pivot_idx = start + (end - start) // 2
        swap(pivot_idx, end)
        pivot_val = nums[end]
        # assign end of larger index
        end_of_larger_idx = start
        # Move all elements that are larger than or equal to the pivot to the left and vice versa
        for i in range(start, end):
            if nums[i] &gt;= pivot_val:
                swap(i, end_of_larger_idx)
                end_of_larger_idx += 1
        swap(end, end_of_larger_idx)
        return end_of_larger_idx

    def kth_largest(start, end, k):
        # Pick a pivot point
        pivot_idx = find_pivot_idx(start, end)
        if pivot_idx - start + 1 == k:
            return nums[pivot_idx]
        elif pivot_idx - start + 1 &lt; k:
            # quick selection on the right partition
            return kth_largest(pivot_idx + 1, end, k - (pivot_idx - start + 1))
        else:
            # quick selection on the left partition
            return kth_largest(start, pivot_idx - 1, k)

    return kth_largest(start, end, k)

</span></code></pre></div></details>

Description: The solution was followed through the quick select algorithm. The basic functions for caculating the Kth largest element in an array are similar as the general process.

### <a name="topk">Top K Frequent Elements</a> ###

Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order

Example: Input: nums = [1,1,1,2,2,3], k = 2, Output: [1,2]

<details markdown=block>
<summary markdown=span>*topKFrequent.py*</summary>
<div class="language-shell highlighter-rouge"><pre class="highlight"><code class="hljs ruby"><span class="nb" style="font-size: 80%">def topKFrequent(self, nums: List[int], k: int) -> List[int]:
    # time:O(N) space:O(N)
    ct = Counter(nums)
    keys = list(ct.keys())
    start, end = 0, len(keys) - 1

    def swap(i, j):
        keys[i], keys[j] = keys[j], keys[i]

    def find_pivot_idx(start, end):
        pivot_index = start + (end - start) // 2
        swap(pivot_index, end)
        pivot_val = ct[keys[end]]
        end_of_larger_idx = start
        # Move all elements that are larger than or equal to the pivot to the left and vice versa
        for i in range(start, end):
            if ct[keys[i]] &gt;= pivot_val:
                swap(i, end_of_larger_idx)
                end_of_larger_idx += 1
        swap(end, end_of_larger_idx)
        return end_of_larger_idx

    def topk_select(start, end, k):
        # Pick a pivot point
        pivot_index = find_pivot_idx(start, end)
        if pivot_index - start + 1 == k:
            return keys[:pivot_index+1]
        elif pivot_index - start + 1 &lt; k:
            # quick selection on the right partition
            return topk_select(pivot_index + 1, end, k - (pivot_index - start + 1))
        else:
            # quick selection on the left partition
            return topk_select(start, pivot_index - 1, k)

    return topk_select(start, end, k)</span></code></pre></div></details>

Description: The solution was followed through the quick select algorithm. The basic functions for caculating the top k frequent elements in an array are similar as the general process.

## Reference ##

+ [Wiki: Quickselect](https://en.wikipedia.org/wiki/Quickselect)


<p>Thanks for reading! Feel free to leave the comments below or <a href="mailto:qazqazqaz850@gmail.com">email</a> to me. Any pieces of advice or discussions are always welcome. :)</p>
