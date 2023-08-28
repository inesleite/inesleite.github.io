---
layout: post
title:   "Overview of Greedy Algorithms"
date:    2022-02-01
tags:    [C_C_plus_plus, Mathematics, Algorithms]
---

"A greedy algorithm is any algorithm that follows the problem-solving heuristic of making the locally optimal choice at each stage. In many problems, a greedy strategy does not produce an optimal solution, but a greedy heuristic can yield locally optimal solutions that approximate a globally optimal solution in a reasonable amount of time." ... From Wiki

## Brief ##
Recently, I explored how to solve the minimal distance or timing problems and knew that the greedy algorithm offers quick and simple solutions to this certain optimization problems. Here, sorting out several information associated with greedy algorithm and further practicing several simple exercises to keep in mind.

## Greedy Algorithm ##
The greedy algorithm is a simple and efficient algorithmic approach for solving any given problem by selecting the best available option at that moment of time. It doesn't worry whether the current best result will bring the overall optimal result. This algorithm may not produce the best result for all problems. It's because it always goes for the local best choice to produce the global best result.

For more details, [wiki: greedy algorithm][greedy] is available to read more description.

### Exercise - Meeting rooms ###
Given an 2D integer array A of size N x 2 denoting time intervals of different meetings.
Where:
A[i][0] = start time of the ith meeting.
A[i][1] = end time of the ith meeting.

Find the minimum number of conference rooms required so that all meetings can be done.

Example Input 1: A = [ {0, 30}, {5, 10}, {15, 20} ]

Expected Output 1: 2

Example Input 2: A = [ {1, 18}, {18, 23}, {15, 29}, {4, 15}, {2, 11}, {5, 13} ]

Expected Output 2: 4

<div class="language-shell highlighter-rouge"><pre class="highlight"><code class="hljs ruby"><span class="nb" style="font-size: 60%">int Solutions::storeMeetingrooms( std::vector &lt; std::vector &lt; int &gt; &gt; & rooms)
{
    int room = INT_MIN;
    std::vector &lt; std::pair &lt; int, int &gt; &gt; meeting;
    for (int i = 0; i &lt; rooms.size(); ++i) {
        int start = rooms.at(i)[0];
        int end = rooms.at(i)[1];

        meeting.push_back( {start, 0});
        meeting.push_back( {end, 1});
    }
    sort(meeting.begin(), meeting.end());
    int count = 0;
    for (int i = 0; i &lt; meeting.size() - 1; ++i) {s
        if (meeting.at(i).second == 0) {s
            count ++;
        } else {
            count --;
        }
        if (meeting.at(i).first != meeting.at(i+1).first) room = std::max(room, count);
    }
    return room;
}</span></code></pre></div>

### Exercise - The Activity Selection problem: Minimum Number of Arrows to Burst Balloon ###
There are some spherical balloons taped onto a flat wall that represents the XY-plane. The balloons are represented as a 2D integer array points where points[i] = [xstart, xend] denotes a balloon whose horizontal diameter stretches between xstart and xend. You do not know the exact y-coordinates of the balloons.

Arrows can be shot up directly vertically (in the positive y-direction) from different points along the x-axis. A balloon with xstart and xend is burst by an arrow shot at x if xstart <= x <= xend. There is no limit to the number of arrows that can be shot. A shot arrow keeps traveling up infinitely, bursting any balloons in its path.

Given the array points, return the minimum number of arrows that must be shot to burst all balloons.

Example Input : A = [{10,16}, {2,8}, {1,6}, {7,12}]

Expected Output : 2

<div class="language-shell highlighter-rouge"><pre class="highlight"><code class="hljs ruby"><span class="nb" style="font-size: 60%">int Solutions::findMinArrowShots( std::vector &lt; std::vector &lt;int &gt; &gt; & points)
{
    sort(points.begin(), points.end());
    int ans = 0, arrow = 0;
    for (int i = 0; i &lt; points.size(); ++i) {
        if (ans == 0 or points.at(i)[0] &gt; arrow) {
            ans ++;
            arrow = points.at(i)[1];
        }
    }
    return ans;
}</span></code></pre></div>

## CASE STUDY: Huffman Code ##
Huffman codes provide a method of encoding data efficiently. Normally when characters are coded using standard codes like ASCII or the Unicode, each character is represented by a fixed-length codeword of bits. Fixed-length codes are popular, because its is very easy to break a string up into its individual characters, and to access individual characters and substrings by direct indexing.

Consider the following example. Suppose that we want to encode strings over the 4-character alphabet C = {a, e, i, o, u, t}. We could use the following fixed-length code:

<table>
 <tr>
  <th>Character</th>
  <th>Fixed-Length Codeword</th>
 </tr>
 <tr>
  <td>a</td>
  <td>111</td>
 </tr>
 <tr>
  <td>e</td>
  <td>10</td>
 </tr>
 <tr>
  <td>i</td>
  <td>00</td>
 </tr>
 <tr>
  <td>o</td>
  <td>11011</td>
 </tr>
  <tr>
  <td>u</td>
  <td>1100</td>
 </tr>
  <tr>
  <td>t</td>
  <td>11010</td>
 </tr>
</table>

For more details of implementation, [Study tonight: Huffman coding][huffman] is available to read and learn more.

Note that: 
- Huffman coding was used for many years by the Unix utility pack for file compression.
- Both of multimedia codecs like JPEG, PNG and MP3 and compression formats like GZIP, PKZIP (winzip) and BZIP2 use Huffman encoding.

## Reference ##

[1] [Intro to Greedy Algorithms with C++](https://crackfaang.medium.com/intro-to-greedy-algorithms-with-c-546d66d30502)

[2] [Algorithm - Ch3 貪婪演算法 Greedy Algorithm](https://mropengate.blogspot.com/2015/04/algorithm-ch3-greedy-algorithm.html)

[3] [Wiki: Greedy algorithm](https://en.wikipedia.org/wiki/Greedy_algorithm)

[4] [貪婪(Greedy)演算法](https://sites.google.com/site/zsgititit/home/jin-jiec-cheng-shi-she-ji/tan-lan-greedy-yan-suan-fa)

[5] [Greedy algorithms: algorithms explained](https://igotanoffer.com/blogs/tech/greedy-algorithms)

[6] [Wiki: Huffman coding](https://en.wikipedia.org/wiki/Huffman_coding)

[7] [UMD: Greedy Algorithms: Huffman Coding](https://www.cs.umd.edu/class/fall2017/cmsc451-0101/Lects/lect06-greedy-huffman.pdf)

[8] [Study tonight: Huffman Coding Algorithm](https://www.studytonight.com/data-structures/huffman-coding)

[greedy]:https://en.wikipedia.org/wiki/Greedy_algorithm "https://en.wikipedia.org/wiki/Greedy_algorithm"

[huffman]:https://www.studytonight.com/data-structures/huffman-coding "https://www.studytonight.com/data-structures/huffman-coding"

<p>Thanks for reading! Feel free to leave the comments below or <a href="mailto:qazqazqaz850@gmail.com">email</a> to me. Any pieces of advice or discussions are always welcome. :)</p>
