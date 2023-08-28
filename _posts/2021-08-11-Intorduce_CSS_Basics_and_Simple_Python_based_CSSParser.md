---
layout: post
title:   "Intorduce CSS/HTML Basics and Simple Python based CSS Parser"
date:    2021-08-11
tags:    [Programming, Python]
---

## Purpose ##
CSS (Cascading Style Sheets) and HTML (Hypertext Markup Languare) are two of the core technologies for building Web pages. CSS (cascading Style Sheets) is the language for describing the presentation of Web pages, including colors, layout, and fonts and the resendering of structured documents (such as HTML and XML). And, HTML represents the structure of the page.

The CSS parser is enabled to convert a CSS string to a data struct for HTML so that we could easily find the corresponding styles. In this post, I would like to go through the basic concepts of CSS/HTML and show the simple python css parser reworked from [Simple CSS Parser][simplecssparser].

## Basic Concept of CSS ##
CSS is not a programming language and also not a markup language either. It is just a style sheet language for using to selectively style HTML element. For example, this CSS selects paragraph text, setting the color to red:

<div class="language-shell highlighter-rouge"><pre class="highlight">styles/style.css<code class="hljs ruby"><span class="nb" style="font-size: 80%">p {
  color: red;
}</span></code></pre></div>

To apply above CSS to the HTML documents, you need to give the element a href attribute and link with the CSS style. Otherwise, the styling won't change the appearance of the HTML.
<div class="language-shell highlighter-rouge"><pre class="highlight"><code class="hljs ruby"><span class="nb" style="font-size: 80%">&lt;link href="styles/style.css" rel="stylesheet"&gt;
</span></code></pre></div>

### Anatomy of a CSS Ruleset ###
The whole CSS structure is called a ruleset, as shown below:

<figure><center><img src="{{ site.baseurl }}/picture/cssruleset.png" width="40%"></center></figure>

The main parts of this element are as follows:
<ul>
 <li>Selector: this is the HTML element name at the start of the ruleset. It defines the element to be styled.</li>
 <li>Declaration: This is a single rule. It specifies which of the element's properties you want to style."</li>
 <li>Properties: These are ways in which you can style an HTML element</li>
 <li>Porperty value: The chooses one out of many possible appearance for a given property.</li>
</ul>

### Different Types of Selectors ###
A CSS selector is the first part of a CSS Rule. It is a pattern of elements and other terms that tell the browwe which HTML elements should be selected to have the CSS property and values inside the rule applied to them. There are many types of selectors. Here are some of the more common types of selectors:

<font size="3" face="Courier New">
<table>
 <tr>
  <th>Selector name</th>
  <th>What does it select</th>
  <th>Example</th>
 </tr>
 <tr>
  <td>Element selector</td>
  <td>All HTML element of the specifies type</td>
  <td>p selects &lt;p&gt;</td>
 </tr>
 <tr>
  <td>ID selector</td>
  <td>The element on the page with the specified ID</td>
  <td>#my-id selects &lt;p id="my-id"&gt; or &lt;a id="my-id"&gt;;</td>
 </tr>
 <tr>
  <td>Class selector</td>
  <td>The element on the page with the specified class.</td>
  <td>.my-class selects &lt;p class="my-class"&gt; or &lt;a class="my-class"&gt;</td>
 </tr>
 <tr>
  <td>Pseudo-class selector</td>
  <td>The specified element(s), but only when in the specified state.</td>
  <td>a:hover selects &lt;a&gt;, but only when the mouse pointer is hovering over the link</td>
 </tr>
</table>
</font>

You could find and learn more information from [CSS selectors][cssselectors]

## Basic Concept of HTML ##
HTML is the language that is used to structure a web page and its content. The content could be structured within a set of paragraphs, a list of bulleted points, or using images and data tables. HTML consists of a series of elements. For example, we could specify a paragraph by enclosing it in paragraph tags:

<div class="language-shell highlighter-rouge"><pre class="highlight"><code class="hljs ruby"><span class="nb" style="font-size: 80%">&lt;p&gt;My cat is very grumpy&lt;p&gt;</span></code></pre></div>

### Anatomy of an HTML element ###
HTML cover elements, attributes, and other import terms, that can be applied to pieces of text to give them different meaning in a document. Here is an example of paragraph element:

<figure><center><img src="{{ site.baseurl }}/picture/htmlelement.png" width="60%"></center></figure>

The main parts of this element are as follows:

<ul>
 <li>The opening tag: This consists of the name of the element, wrapped in opening and closing angle brackets.</li>
 <li>The closing tag: This is the same as the opening tag, except that it includes a forward slash before the element name. Failing to add a closing tag is one of the standard neginner errors and can lead to strange results.</li>
 <li>The content: This the content of the elementm which in this case, is just text.</li>
 <li>This element: This opening tag, the closing tag, and the content together comprise the elemnt.</li>
</ul>

In addition, the elemnts can also have attributes that look like the following:

<figure><center><img src="{{ site.baseurl }}/picture/htmlattribute.png" width="80%"></center></figure>

<ul>
 <li>The attributes: These contain extra information about the element that don't want to appear in the actual content.</li>
</ul>

#### Some Types of HTML Elements ####
HTML elements can be represented in other tpyes, such as nested, empty. Nested element could apply multiple HTML tags to a simgle piece of content. And, the empty element could be used for image element because an image element doesn't wrap content to affect it.
<div class="language-shell highlighter-rouge"><pre class="highlight"><code class="hljs ruby"><span class="nb" style="font-size: 80%"># Nested element
&lt;p&gt;My dog is&lt;em&gt;very grump.&lt;/em&gt;&lt;/p&gt;
# Empty element
&lt;img src="images/firefox-icon.png" alt="My test image"&gt;</span></code></pre></div>

For more information of HTML elements, you could learn from [HTML elements reference][htmlelements].

## CSS Parser ##

### The Concept of Lexical Analysis ###
In computer science, the lexical analysis or tokenization is the process of coverting a seqenece of characters into a sequence of tokens (strings with an assigned and thus identified meaning). This process can be considered a sub-task of parsing input. A program that performs lexical analysis may be termed a lexer or tokenizer. A lexer is generally combined with a parser, which together analyze the syntax of programming language, web pages, and so forth.

A lexical token or simple token is a string with an assigned and thus identified meaning. It is structured as a pair consisting of token name and an optional token value. The token name is a catergory of lexical unit. Common token names are 

<font size="3" face="Courier New">
<table>
 <tr>
  <th>Token name</th>
  <th>Description</th>
  <th>Sample token values</th>
 </tr>
 <tr>
  <td>identifier</td>
  <td>names the programmer chooses</td>
  <td>x, color, UP</td>
 </tr>
 <tr>
  <td>keyword</td>
  <td>names alreay in the programming language</td>
  <td>if, while, return</td>
 </tr>
 <tr>
  <td>separator</td>
  <td>punctuation characters and paired-delimiters</td>
  <td>}, {, ;</td>
 </tr>
 <tr>
  <td>operator</td>
  <td>symbols that operate an arguments and produce results</td>
  <td>+, <, =</td>
 </tr>
 <tr>
  <td>literal</td>
  <td>numeric, logical, textual, reference literals</td>
  <td>true, "music", 6.02e23</td>
 </tr>
 <tr>
  <td>Comment</td>
  <td>line, block</td>
  <td>/* Retrieves user data */</td>
 </tr>
</table>
</font>

Here is an example of expression in the C programming language:
<div class="language-shell highlighter-rouge"><pre class="highlight"><code class="hljs ruby"><span class="nb" style="font-size: 80%">// A simple expression
x = a + b * 2;

// The lexical analysis of this expression yields the following sequence of tokens:
[(idnetifier, x), (operator, =), (identifier, a), (operator, +). (identifier, b), (operator, *), (literal, 2), (separator, ;)]
</span></code></pre></div>

The lexical analysis needs two stages. The first stage, the scanner, is usually based on a finite-state machine (FSM). It has encoded within it information on the possible sequences of characters that can be contained within any of the tokens it handles. The second stage, the evaluator, which goes over the characters of the lexeme to produce a value.

You could learn more information about lexical analysis from [Wiki: Lexical analysis][lexicalanalysis]

### The Implementations of CSS Parser ###
There are many CSS parsers in java or in C or in C++, etc. In this post, I created the [lite CSS Parser][litecssparser] in python and further to generate an HTML template. The code was initially extracted from [Simple CSS Parser][simplecssparser] and then reworked. But, the lite CSS parser only process four types of state, parsing in selector, parsing in property, parsing in value and parsing in comment. The basic functions for the CSS parser are a follows:

<ul>
 <li>Read a CSS file</li>
 <li>Store CSS in the Collection with different elements</li>
 <li>Query for the selector, property and value</li>
 <li>Turn the Collection with different elements into HTML</li>
</ul>

Here is a simple css format file and the corresponding Web converted by the [lite CSS Parser][litecssparser] repo. The best way to understand the parser interface is to excute main.py which is excerpted below:
<div class="language-shell highlighter-rouge"><pre class="highlight">main.py<code class="hljs ruby"><span class="nb" style="font-size: 80%">filepath = './simple.css'
parser = CssParser(filepath)

parser.write("test.xml", "xml")</span></code></pre></div>

<div class="language-shell highlighter-rouge"><pre class="highlight">Simple css format<code class="hljs ruby"><span class="nb" style="font-size: 80%">/* General page style
 General page style */
div {
  width: 100px;
  height: 100px;
  background-color: lightblue;
}
div:hover {
  width: 300px; /* test */
}</span></code></pre></div>

<div class="language-shell highlighter-rouge"><pre class="highlight">The corresponding HTML<code class="hljs ruby"><span class="nb" style="font-size: 80%">&lt;html&gt;
	&lt;body&gt;
		&lt;div&gt;
		&lt;div&gt;
		&lt;div:hover width="300px"&gt;Contents&lt;/div:hover&gt;
		&lt;/div&gt;
		&lt;div&gt;
		&lt;div width="100px"&gt;Contents&lt;/div&gt;
		&lt;div background-color="lightblue"&gt;Contents&lt;/div&gt;
		&lt;div height="100px"&gt;Contents&lt;/div&gt;
		&lt;/div&gt;
		&lt;/div&gt;
		&lt;div&gt;
		&lt;div&gt;
		&lt;div:hover width="300px"&gt;Contents&lt;/div:hover&gt;
		&lt;/div&gt;
		&lt;div&gt;
		&lt;div width="100px"&gt;Contents&lt;/div&gt;
		&lt;div background-color="lightblue"&gt;Contents&lt;/div&gt;
		&lt;div height="100px"&gt;Contents&lt;/div&gt;
		&lt;/div&gt;
		&lt;/div&gt;
		&lt;/body&gt;
&lt;/html&gt;</span></code></pre></div>

## Reference ##
[1] [CSS basics](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/CSS_basics#anatomy_of_a_css_ruleset)

[2] [HTML basics](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/HTML_basics)

[3] [The ElementTree XML](https://docs.python.org/3/library/xml.etree.elementtree.html)

[4] [Lexical analysis](https://en.wikipedia.org/wiki/Lexical_analysis#Token)

[simplecssparser]:https://github.com/s311354/cssparser "https://github.com/s311354/cssparser"

[htmlelements]:https://developer.mozilla.org/en-US/docs/Web/HTML/Element "https://developer.mozilla.org/en-US/docs/Web/HTML/Element"

[cssselectors]:https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Selectors "https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Selectors"

[litecssparser]:https://github.com/s311354/css_parser_python "https://github.com/s311354/css_parser_python"

[lexicalanalysis]:https://en.wikipedia.org/wiki/Lexical_analysis "https://en.wikipedia.org/wiki/Lexical_analysis"

<p>Feel free to leave the comments below or <a href="mailto:qazqazqaz850@gmail.com">email</a> to me if you are interested in this topic or have any pieces of points. :)
