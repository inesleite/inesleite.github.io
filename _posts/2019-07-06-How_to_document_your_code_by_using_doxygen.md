---
layout: post
title: How to document your C++ Porgram by using Doxygen
tags: [Doxygen, C_C_plus_plus]
---
[UPDATED: 2022/03/08]

## Purpose 
In order to quickly recap your code, documenting your code is one of the effective methods and also readable. Doxygen supports the de facto standard for creating documentation for C and C++ program, but it also supports other popular programming languages such as Java and Python. It also allows us to generate a fully structured set of HTML or Latex page from the program source code. 

For avoiding to forget bit and pieces of using Doxygen, I recorded a few pieces of information and also put a simple [C program](https://github.com/s311354/Doxygen_practice) and a simple [C++ program](https://github.com/s311354/Leetcode_practice) which contain some Doxygen code snippets. Once processed with Doxygen, it gives <a href="{{ site.baseurl }}/data/doxygen_c/html_c_program/">C output</a> and <a href="{{ site.baseurl }}/data/doxygen_c/html_c_plus/">C ++ output</a>. Hope this post would be helpful.

## How to document your code
There are four steps that you should follow:

<h4><a name=""></a> Generate doxygen </h4>
<h6><ol>
    <li><a href="#doxygen">Install the doxygen on Mac OSX</a></li>
    <li><a href="#generate">Generate a configuration file</a></li>
    <li><a href="#document">Document your code</a></li>
    <li><a href="#create">Run doxygen to create the documentation</a></li>
</ol></h6>

<h3><a name="doxygen"></a> Install the doxygen on Mac OSX </h3>

<ol>
<li> Open Terminal </li>
<li> Run: </li>
</ol>
<div class="language-shell highlighter-rouge"><pre class="highlight"><code class="hljs ruby"><span class="nb" style="font-size: 60%">$brew install doxygen </span></code></pre></div>

<h3><a name="generate"></a> Generate a configuration file </h3>

  By calling doxygen with the -g option in your project to generate a configuration file:

<div class="language-shell highlighter-rouge"><pre class="highlight"><code class="hljs ruby"><span class="nb" style="font-size: 60%">$doxygen -g < config_file > </span></code></pre></div>

The configuration file is a free-form ASCII text file with a structure that is similar to that of a Makefile. The common configuration options are:

<ul style="list-style-type:disc">
<li> PROJECT_NAME: 
      - identify the project for which the documentation is generated.</li>
<li> PROJECT_NUMBER: 
      - enter a project or revision number</li>
<li> INPUT: 
      - specify the files and/or directories that contain documented source files.</li>
<li> OUTPUT_DIRECTORY: 
      - specify the path into which the generated documentation will be written.</li>
<li> EXTRACT_ALL: 
      - if this tag is set to YES, doxygen will assume all entities in documentation are documented.</li>
<li> FILE_PATTERNS: 
      - specify one or more wildcard patterns to filter out the source-files in the directories.</li>
<li> INLINE_SOURCE: 
      - tag to YES will include the body of functions, classs and enums directly into documentation.</li>
</ul>

You can refer to [configuration](http://www.doxygen.nl/manual/config.html) and customize doxygen by yourself.  

<h3><a name="document"></a> Document your code </h3>

For the C program, the actual documentation consists of comments you write in the .h and .c files that are based on the configuration of doxygen.

There are several ways to mark a comment block as a detailed description:

<ol>
<li> Javadoc style: </li>
It is consist of a C-style comment block starting with two *'s, like this

<div class="language-shell highlighter-rouge"><pre class="highlight"><code class="hljs ruby"><span class="nb" style="font-size: 60%">/**
 * ... text ...
 */
</span></code></pre></div>
<li> Qt style </li>
It adds an exclamation mark (!) after the opening of a C-style comment block, as shown in

<div class="language-shell highlighter-rouge"><pre class="highlight"><code class="hljs ruby"><span class="nb" style="font-size: 60%">/*!
 * ... text ...
 */
</span></code></pre></div>
</ol>

<h3><a name="create"></a> Run Doxygen to create the documentation </h3>

To generate the documentation you can now enter:

<div class="language-shell highlighter-rouge"><pre class="highlight"><code class="hljs ruby"><span class="nb" style="font-size: 60%">doxygen < config-file >
</span></code></pre></div>

Depending on your setting Doxygen will create HTML, latex inside the output directory.

### Configuration with Tag file ###
Doxygen also supports to link with of C++ names or STL libraries from external documantation via "TAGFILES" functionality. There are two ways to link with cppreference's tag file:
- Using "location/of/cppreference-doxygen-local.tag.xml=/location/of/html/book/root/" to link with local archive 
- Using "location/of/cppreference-doxygen-web.tag.xml=http://en.cppreference.com/w/" to link with cppreference.com.

For more details or downloading the HTML archive file, [Archives for offline viewing][archive] is available to read more description and clear instruction.

=========== To be continued…. ==========

## Reference

[1] [Doxygen](http://www.doxygen.nl)

[2] [Doxygen - Configuration](http://www.doxygen.nl/manual/config.html#cfg_file_patterns)

[3] [Documenting the code](http://www.doxygen.nl/manual/docblocks.html)

[4] [How to document your code using doxygen](https://flcwiki.desy.de/How%20to%20document%20your%20code%20using%20doxygen) 

[5] [cppreference: Archives for offline viewing](https://en.cppreference.com/w/Cppreference:Archives)



[archive]:https://en.cppreference.com/w/Cppreference:Archives "https://en.cppreference.com/w/Cppreference:Archives"

## Note
<p>If you have any constructive criticism or advises, leave the comments below or feel free to email me @qazqazqaz850@gmail.com.
Hope this post will help! :)
</p>


