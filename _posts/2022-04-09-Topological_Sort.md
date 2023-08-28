---
layout: post
title: "Topological Sorting"
date: 2022-04-09
tags: [Algorithms, C_C_plus_plus]
---

"In computer science, a topological sort or topological ordering of a directed graph is a linear ordering of its vertices such that for every directed edge uv from vertex u to vertex v, u comes before v in the ordering. For instance, the vertices of the graph may represent tasks to be performed, and the edges may represent constraints that one task must be performed before another; in this application, a topological ordering is just a valid sequence for the tasks. <span style="background-color: #FFFF00">Precisely, a topological sort is a directed graph traversal in which each node is visited only after all its dependencies are visited.</span>" .. from Wiki page

## Brief ##
A topological sort is a linear ordering of vertices in a directed acyclic graph (DAG). Directed graph can be used to indicate precedence among a set of events. In many applications, we use directed acyclic graphs to indicate precedence among events. For example, in a scheduling problem, there is a set of tasks and a set of constraints specifying the order of these tasks. In this post, I would like to briefly discuss about several practices for the applications of topolgical sort (Course Schedule, Parallel Courses).

### Properties ###
The basic properties of topolgical sorting:
+ Every vertex v in the respective ordering occurs before any other vertex to which has edges.
+ Topological sorting is not unique. 

<figure><center><img src="{{ site.baseurl }}/picture/toplogical_sort.png" width="100%"></center></figure>

Note: These are three common algorithms for topological sorting

+ Kahn's algorithm: First, find a list of "start node" which have no incoming edges and insert them into a set S; at least one such node must exist in a non-empty actclic graph
+ Depth-first search: Loops through each node of the graph, in an arbitrary order, initiating a depth-first search that terminates when it hits any node that has already been visited since the beginning of the topological sort or the node has no outgoing edges
+ Parallel algorithms: Repeatedly removes the vertices of indegree 0 and adds them to the topological sorting in the order in which they were removed. Since the outgoing edges of the removed vertices vertices are also removed, there will be a new set of vertices of indegree 0, where the procedure is repeated until no vertices are left. Each iteration can be parallelized

## Exercises ##
<h6><ol>
    <li><a href="#exercise1">Exercise 1 - Course Schedule</a></li>
    <li><a href="#exercise2">Exercise 2 - Parallel Courses</a></li>
</ol></h6>

### <a name="exercise1">Exercise 1 - Course Schedule</a> ###
There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai.

For example, the pair [0, 1], indicates that to take course 0 you have to first take course 1.
Return true if you can finish all courses. Otherwise, return false.

Example: Input: numCourses = 2, prerequisites = [[1,0]], Output: true

#### Solution ####
<details markdown=block>
<summary markdown=span>*coursesSchedule.cc*</summary>
<div class="language-shell highlighter-rouge"><pre class="highlight"><code class="hljs ruby"><span class="nb" style="font-size: 60%">bool Solutions::canFinish(int numCourse, std::vector&lt; std::vector&lt; int&gt; &gt; & prerequisities) {
    std::vector&lt; std::vector&lt;int&gt; &gt; adjacent(numCourse);
    // initial all vertices with indegree 0
    std::vector&lt;int&gt; indegree(numCourse, 0);
    // Creating graph and updates the indegree of the local vertex 
    for (auto &elem : prerequisities) {
        adjacent[elem[0]].push_back(elem[1]);
        indegree[elem[1]]++;
    }
    std::queue&lt;int&gt; q;
    // Parallel topological sorting
    // iterate through all the courses if indegree is zero then add it to queue
    for (int i = 0; i &lt; numCourse; ++i) {
        if(indegree[i] == 0) q.push(i);
    }
    while (!q.empty()) {
        int node = q.front();
        q.pop();
        for (auto &next_node : adjacent[node]) {
            indegree[next_node] --;
            if(indegree[next_node] == 0) q.push(next_node);
        }
        numCourse --; // finish the course
    }
    return numCourse == 0;
}</span></code></pre></div></details>

The solution was inspired by [LeetCode Discuss][discuss1]. The basic functions for caculating the all distinct solutions are as follows:

+ Initialize all vertices with indegree 0
+ Create directed graph and update the indegree
+ Parallel topological sorting and iterate through all the courses if indegree is zero then add it to queue
+ Count how many course will be finished and further determine whether or not all courses can be finished

### <a name="exercise2">Exercise 2 - Parallel Courses</a> ###
There are N courses, labelled from 1 to N.

We are given relations[i] = [X, Y], representing a prerequisite relationship between course X and course Y: course X has to be studied before course Y.

In one semester you can study any number of courses as long as you have studied all the prerequisites for the course you are studying.

Return the minimum number of semesters needed to study all courses.  If there is no way to study all the courses, return -1.

Example: Input: N = 3, relations = [[1,3],[2,3]], Output: 2

#### Solution ####

<details markdown=block>
<summary markdown=span>*parallelCourses.cc*</summary>
<div class="language-shell highlighter-rouge"><pre class="highlight"><code class="hljs ruby"><span class="nb" style="font-size: 60%">int Solutions::minimumSemesters(int numCourse, std::vector&lt; std::vector&lt;int&gt; &gt; & relations) {
    std::vector&lt; std::vector&lt;int&gt; &gt; adjacent(numCourse);
    // initial all vertices with indegree 0
    std::vector&lt;int&gt; indegree(numCourse, 0);
    // Creating graph and updates the indegree of the local vertex 
    for (auto &course : relations) {
        adjacent[course[0] - 1].push_back(course[1] - 1);
        indegree[course[1] - 1]++; // study firstly
    }
    std::queue&lt;int&gt; q;
    int semester = 0, count = 0;
    // Parallel topological sorting
    // iterate through all the courses if indegree is zero then add it to queue
    for (int i = 0; i &lt; numCourse; ++i) {
        if(indegree[i] == 0) q.push(i);
    }
    while (!q.empty()) {
        int size = q.size();
        for (int i = 0; i &lt; size; ++i) {
            int node = q.front();
            q.pop();
            count ++;
            for (auto &next_node : adjacent[node]) {
                indegree[next_node] --;
                if(indegree[next_node] == 0) q.push(next_node);
            }
        }
        semester ++;
    }
    return count == numCourse ? semester : -1;
}</span></code></pre></div></details>
The basic functions for caculating the all distinct solutions are as follows:
+ Initialize all vertices with indegree 0
+ Create directed graph and update the indegree
+ Parallel topological sorting and iterate through all the courses if indegree is zero then add it to queue
+ Count how many courses will be finished and determine the minimum number of semesters needed to study all courses

=========== To be continued…. ==========

## Reference ##

+ [Wiki: Topological sorting](https://en.wikipedia.org/wiki/Topological_sorting)

+ [Interview Cake: Topological Sort](https://www.interviewcake.com/concept/java/topological-sort)

+ [ScienceDirect: Topological Sort](https://www.sciencedirect.com/topics/computer-science/topological-sort)

+ [Data Structure Visualizations: Topological Sort (Indegree)](https://www.cs.usfca.edu/~galles/visualization/TopoSortIndegree.html)

+ [VISUALGO: GRAPH TRAVERSAL](https://visualgo.net/en/dfsbfs)

[discuss1]:https://leetcode.com/problems/course-schedule/discuss/783816/c%2B%2B-topological-sort-solution-fast-and-easy-to-understand "https://leetcode.com/problems/course-schedule/discuss/783816/c%2B%2B-topological-sort-solution-fast-and-easy-to-understand"

<p>Thanks for reading! Feel free to leave the comments below or <a href="mailto:qazqazqaz850@gmail.com">email</a> to me. Any pieces of advice or discussions are always welcome. :)</p>
