---
layout: post
title: What's Jekyll and How to build a personal blog using Lanyon ( Part I )
tags: [Jekyll] 
---
headerfile
## Abstract

[Jekyll](http://jekyllrb.com) is a static site generator, an open-source tool for creating simple yet powerful websites of all shapes and sizes. From [the project's readme](https://github.com/mojombo/jekyll/blob/master/README.markdown):

  > Jekyll is a simple, blog aware, static site generator. It takes a template directory [...] and spits out a complete, static website suitable for serving with Apache or your favorite web server. This is also the engine behind GitHub Pages, which you can use to host your project’s page or blog right here from GitHub.

Find out more by [visiting the project on GitHub](https://github.com/mojombo/jekyll).

It's an immensely useful tool and one we encourage you to use here with [Lanyon](http://lanyon.getpoole.com) theme, unassuming and minimalist theme. I recommend to adopt this theme since it focuses more on content with complete software architecture. 

The most fantastic part is that it's free and you can fork [Lanyon repo](https://github.com/poole/lanyon), get it running in no time, and make the changes to include your details.

Here's a short tutorial on how I made this blog. Read to start? Let't go!

#### **NOTE: If you want to save time or are not interested to set up by yourself, simply fork [my repo](https://github.com/s311354/Louis.github.io), adjust the style and make changes to fit your requirements.**

## Instructions

### 1. Installing Rudy and Jekyll

Go ahead and type below command line in your termainal to install rudy: 

<div class="language-shell highlighter-rouge"><pre class="highlight"><code class="hljs ruby"><span class="nb">$ brew install ruby
</span></code></pre></div>

Here, we type this on the MAC OS X and will use ruby v2.5.1p57 version.

Then, you'll also need Rudygems which is a package management framework for Rudy. Refer to [RubyGems instructions](https://rubygems.org/pages/download/). 

Finally, we can install jekyll!!

<div class="language-shell highlighter-rouge"><pre class="highlight"><code class="hljs ruby"><span class="nb">$ gem install jekyll
</span></code></pre></div>

#### **REMARK: If you use ubuntu or linux operating systems, you should type apt-get instead of brew when you install rudy.**

### 2. Clone Lanyon 

First of all, we will need to create an account of Github and a repository having the name **username.github.io**. For instance, my repo name is *Louis.github.io*. After you do this, clone this repository onto your local computer. 

<div class="language-shell highlighter-rouge"><pre class="highlight"><code class="hljs ruby"><span class="nb">$ git clone https://github.com/username/username.github.io.git
</span></code></pre></div>

Next, download the Lanyon zip folder from [here](https://github.com/poole/lanyon/archive/master.zip) and extract those into your *username.github.io* directory. Now, you already prepare a prerequisite for build your local environment.

Let's move into *username.github.io* directory and run the default page on local server. 

<div class="language-shell highlighter-rouge"><pre class="highlight"><code class="hljs ruby"><span class="nb">$ cd username.github.io
$ jekyll build
$ jekyll serve
</span></code></pre></div>

Unfortunately, since Lanyon is built on Poole and Poole does not support Jekyll 3 yet, you would get error message, [permalink issue](https://github.com/poole/lanyon/issues/124). For fixing this issue, you'll need to comment out *relative permalinks: true* and add *jekyll-paginate setting*, as shown below

<figure>
<a><img src="{{ site.baseurl }}/picture/permalinks_issue.png" width="120%"></a>
</figure>

<figure>
<a><img src="{{ site.baseurl }}/picture/paginate.png" width="40%"></a>
</figure>

#### **REMARK: Replace username with your *specific username*.** 

### 3. Configuring baseurl

In order to match the production URL without the host, you'll need to set *baseurl* in your *_config.yml*. From [Parker's blog](https://byparker.com/blog/2014/clearing-up-confusion-around-baseurl/#fn:1),

  >The *baseurl* was originally added back in 2010 to allow "the user to test websit with the internal webserver under the same base url it will be deployed to on a production server".

So, let's configure the subpath of your site based on your repository username. 

<figure>
<a><img src="{{ site.baseurl }}/picture/baseurl_setting.png" width="150%"></a>
</figure>

After that, you should execute *jekyll serve -w*, and must make sure everything works on local. Feeling free to prepend your urls with *site.baseurl* to indicate specific URL. Then, pushing to your host and also checking that everything works, too! 

### 4. Exploring the directory structure

Before we go ahead and make customization, let's take a look at the overview of architecture in your directory. Once understanding the structure, we can confidently adjust the format and add several customized designs. 

<figure>
<a><img src="{{ site.baseurl }}/picture/structure.png"></a>
</figure>

The overview of structure:

 -  _config.yml:

    The configuration file, which placed in your site's root directory, gives you a lot of flexibility to customize how it builds your site. [options](https://jekyllrb.com/docs/configuration/)
 - index.html:
    
    This configures your front page. 
 - about.md and archive.md:
    
    This is the Makedown files and will be transformed by Jekyll to a static page. You can add other static page by creating Makedown files with a [front matter](https://jekyllrb.com/docs/front-matter/) section.
 - _includes and _layouts:
    
    These directories contain the HTML boilerplate required to build your site.
 - _posts:
    
    This directory includes the posts that you will be posting. They are Markdown files.
 
 For more details, please refer to this [page](https://jekyllrb.com/docs/structure/).

=========== To be continued.... ==========

## Reference
[1] [How to build a blog using Github, Jekyll and Lanyon](https://nikhita.github.io//build-blog-using-github-jekyll#using-lanyon), by Nikhita Raghunath

[2] [GitHub Pages](https://pages.github.com)

[3] [Lanyon Repo](https://github.com/poole/lanyon)

## Note
<p>If you have any constructive criticism or advises, leave the comments below or feel free to email me @qazqazqaz850@gmail.com.

Hope this post will help! :)
</p>
