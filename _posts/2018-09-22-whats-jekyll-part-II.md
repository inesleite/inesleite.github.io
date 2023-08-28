---
layout: post
title: What's Jekyll and How to build a personal blog using Lanyon ( Part II )
tags: [Jekyll] 
---

## Abstract
Further to the previous past, [What's Jekyll and How to build a personalblog using Lanyon ( Part I )]({% post_url 2018-09-09-whats-jekyll-part-I %}), this post guides you how to add unique and useful features in your blog. Such as, linking multiple social media accounts, changing the font that you love and inserting google analytics in your website.

## Instructions

<h4><a name="TableContent"></a> Table of Contents</h4>

<h6><ol> 
	<li><a href="#EnableAnalytics">Enable Google Analytics</a></li>
	<li><a href="#InsertDisqus">Inserting Disqus Comments</a></li>
	<li><a href="#AddArchive">Adding a Archive Page</a></li>
	<li><a href="#AddSocial">Adding Social Media Buttons</a></li>
</ol></h6>

<h4><a name="EnableAnalytics"></a>  1. Enable Google Analytics</h4>

Google Analytics tracking is a free web analytics service that used to analyse and track website traffic. It is now the most widely used and also really easy to add the tracking code to your Jekyll static website.

First, you most create a new account in [Google Analytics](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&ved=2ahUKEwibhsvpisLdAhXHWrwKHRPTDPcQFjAAegQIAxAC&url=https%3A%2F%2Fanalytics.google.com%2F&usg=AOvVaw1Jx9i6a4S_nl7I67YnB98r) for this and then you will get unique tracking ID.

Now, back to your terminal, creating a new file called *google\_analytics.html* in *\_includes* directory. Next, pasting the following Google Analytics tracking code in this file and save it.

<div class="language-shell highlighter-rouge"><pre class="highlight"><code class="hljs ruby"><span class="nb">&lt;script&gt;
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1&#42;new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', '&#123;&#123; site.google_analytics &#125;&#125;', 'auto');
  ga('send', 'pageview');
&lt;/script&gt;
</span></code></pre></div>

Then, opening your site *\_config.yml* file and add the following line of code. It is important to look at your own tracking ID, so replaceing UA-XXXXXXXXX-X below with your websites unique tracking ID. 

<div class="language-shell highlighter-rouge"><pre class="highlight"><code class="hljs ruby"><span class="nb"># Google Analytics
google_analytics: UA-XXXXXXXXX-X 
</span></code></pre></div>

Finally, Google recommends placing the &lt;head&gt; section, shown as below, in the *head.html* of your site that located in your site's *\_include/* directroy.

<div class="language-shell highlighter-rouge"><pre class="highlight"><code class="hljs ruby"><span class="nb">&lt;head&gt; 
  ...
  &#123;% if site.google_analytics and jekyll.environment == 'production' %&#125;
    &#123;% include google_analytics.html %&#125;
  &#123;% endif %&#125;
  ...
&lt;/head&gt; 
</span></code></pre></div>

Save it and you are good to go!! 

<h4><a name="InsertDisqus"></a>  2. Inserting Disqus Comments</h4>

Disqus is a networked community platform widely used by website. With Disqus, your website gains a feature-rich comment system complete with social network integration and extensive community functions. 


First, you also need a Disqus account for this feature. Head to the [website](https://disqus.com), creating an account and it'll ask you if you want to "Add Disqus to your site". The website will show the guideline how to add the Disqus comment system in your blog. You should create *comments.html* in *_includes/* dircetory and paste the setting on this html file, shown as below:

<div class="language-shell highlighter-rouge"><pre class="highlight"><code class="hljs ruby"><span class="nb">&lt;!-- Intergating Disqus comments  --&gt;
  &lt;div id="disqus_thread"&gt;&lt;/div&gt;

&lt;script&gt;
/&#42;&#42;
&#42;  RECOMMENDED CONFIGURATION VARIABLES: EDIT AND UNCOMMENT THE SECTION BELOW TO INSERT DYNAMIC VALUES FROM YOUR PLATFORM OR CMS.
&#42;  LEARN WHY DEFINING THESE VARIABLES IS IMPORTANT: https://disqus.com/admin/universalcode/#configuration-variables &#42;&#42;/

  var disqus_config = function () &#123;
    this.page.url = '&#123;&#123;content.absolute_url&#125;&#125;';  // Replace PAGE_URL with your page's canonical URL variable
    this.page.identifier = '&#123;&#123;content_id&#125;&#125;';  // Replace PAGE_IDENTIFIER with your page's unique identifier variable
  &#125;;

  (function() &#123; // DON'T EDIT BELOW THIS LINE
    var d = document, s = d.createElement('script');
    s.src = 'https://shirongliu.disqus.com/embed.js';
    s.setAttribute('data-timestamp', +new Date());
    (d.head || d.body).appendChild(s);
  &#125;)();

&lt;/script&gt;
&lt;noscript&gt;Please enable JavaScript to view the &lt;a href="https://disqus.com/?ref_noscript"&gt;comments powered by Disqus.&lt;/a&gt;&lt;/noscript&gt;
</span></code></pre></div>

#### **NOTE: Do not paste the code posted above - you’ll link to my google analytics account !**

Moreover, opening the *_layouts/default.html* file and adding the line as shown:

<div class="language-shell highlighter-rouge"><pre class="highlight"><code class="hljs ruby"><span class="nb">&lt;body&gt;
....
&lt;!-- disqus web site  --&gt;
&lt;div class="container content"&gt;
&#123;&#123; content &#125;&#125;

  &#123;% include comments.html %&#125;

&lt;/div&gt;
....
&lt;/body&gt;
</span></code></pre></div>

Now, run jekyll build and jeckll serve again to see Disque comments enable on the your website!

<h4><a name="AddArchive"></a>  3. Adding a Archive Page</h4>

Lanyon, by default, does not provide an archive page. The archive page allows you capture, manage and search collection of your post. In this section, we will show you how to create an archive page in your website. Let's make one. 

You should create a new *archive.md* file in your root folder and add the following contents to it.

<div class="language-shell highlighter-rouge"><pre class="highlight"><code class="hljs ruby"><span class="nb">---
layout: page
title: Archive
---

&lt;!-- Search posts --&gt;
&#123;% for post in site.posts %&#125;
  * &#123;&#123; post.date | date_to_string &#125;&#125; &raquo;
  &lt;span style="font-size:18px;"&gt; [ &#123;&#123; post.title &#125;&#125; ](&#123;&#123; site.baseurl &#125;&#125;/&#123;&#123; post.url &#125;&#125;)&lt;/span&gt;
&#123;% endfor %&#125;
</span></code></pre></div>

Now, rebuilding jekyll and then you can see the archive page on your website. 

<h4><a name="AddSocial"></a>  4. Adding Social Media Buttons</h4>

The [Font Awesome](https://fontawesome.com/?from=io) liberary is the world's most popular and easiest to use icon. It has grown to have over 3000 icons and continuous to add the needed icons. You can choose the icons you need. 
First, you should add the "font-awesome.min.css" CSS link in *_includes/head.html*:

<div class="language-shell highlighter-rouge"><pre class="highlight"><code class="hljs ruby"><span class="nb">&lt;link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css"&gt;
</span></code></pre></div>

Then, you can add multiple social media link buttons in any page you'll allow appearing in. Instance, in my page, I add e-mail, LinkedIn and instagram accounts, and so on in *about.md* . (shown as below)

<div class="language-shell highlighter-rouge"><pre class="highlight"><code class="hljs ruby"><span class="nb">&lt;!-- Icon Link --&gt;
&lt;div style=&quot;text-align: center;&quot;&gt;
&lt;a style=&quot;margin-right: 20px;&quot; href=&quot;https://www.instagram.com/liulouis0419&quot; target=&quot;\_blank&quot; title=&quot;Instagram Page&quot; class=&quot;x1&quot;&gt;&lt;i class=&quot;fab fa-instagram fa-2x&quot; style=&quot;cursor: pointer&quot;&gt;&lt;/i&gt;&lt;/a&gt;
&lt;/div&gt;
</span></code></pre></div>

#### **REMARK: Replace href with your social media link.** 

Congratulation, your social buttons are ready for action! :)  

To be continued....

<h4><a name="AddPhoto"></a>  5. Adding your Photo to the sidebar</h4>

## Reference
[1] [How to build a blog using Github, Jekyll and Lanyon](https://nikhita.github.io//build-blog-using-github-jekyll#using-lanyon), by Nikhita Raghunath

[2] [Google Analytics for Jekyll](https://desiredpersona.com/google-analytics-jekyll/)

## Note
<p>If you have any constructive criticism or advises, leave the comments below or feel free to email me @qazqazqaz850@gmail.com.

Hope this post will help! :)
</p>
