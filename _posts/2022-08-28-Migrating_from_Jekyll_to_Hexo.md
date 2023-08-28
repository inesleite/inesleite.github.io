---
layout: post
title: "Migrating from Jekyll to Hexo"
date: 2022-08-28
tags: [Miscellaneous]
---

Hello there, this Jekyll's personal blog was migrated to [Wellcome to Louis][hexolouis]. Hope my new blog may bring good fortune, success, and happiness. ☀️

## Brief ##

I've been running my personal blog for about 4 years and am very happy running a static site generator. I've picked [Jekyll][jekyll] in the past because it was straight forward to create a new blog using [GitHub Pages with Jekyll][github]. I was never studied any domain knowledge associate with Sitecore, so first thing first... I wanted to find a blogging engine that I was interested in. I considered the Jekyll with Lanyon theme and did so me research into what others in the Jekyll's community were using. I then liked the power my blog had [instant search][louis], [Google analytics][analytics] and [Disqus commands][disqus] functionalities.

But, recently, I found that the [Hexo][hexo] has more advantages over Jekyll, thus I decided to migrate to Hexo community and start blogging a lot more to engage with Hexo. In this post, I will roughly summarize the steps taken to use Hexo with tranquilpeak theme and deploy to GitHub Pages.

## How to Get Started With Hexo  ##

Hexo is written in Javescript, and we may install Hexo with npm, which is a package manager for the Javescript. Basically, Hexo has everything users need included in the default package so we don't need to modify too much, depend on plugins or use very powerful framework for a simple.

### Step 1. Create Hexo Project from Scratch ###

**Prerequisites:**

Hexo is powered by Node.js, allowing it to render Markdown files into static web pages. Also npm stands for Node pages manager, which is an application and repository for developing and sharing Javescript code. So, Node.js and npm is prerequieste for Hexo project. We may navigate to [Node.js Org][nodejs] to download Node.js installer or install Node.js and npm using Homebrew on Mac.

```
# Install Node.js
$ brew install node
# Install npm package manager
$ brew install npm
```

Now, we can create a new Hexo project and follow along:
```
# Install the Hexo CLI
$ npm install hexo-cli -g
# Initate a new Hexo project in ./blog folder
$ hexo init blog
```

### Step 2. Set up the Basic Configuration ###

It's easy to modify site setting and the theme setting in _config.yml. Here we can edit _config.yml and have a look at the general settings:

<div class="language-shell highlighter-rouge"><pre class="highlight"><code class="hljs ruby"><span class="nb" style="font-size: 80%">...
# Site
title: Louis
subtitle: 'Louis'
description: 'Hello and wellcome to the internet home of Louis blog. (That’s me!)'
keywords:
  - hexo
  - javascript
author: ShiRong Liu
language:
  - en
  - zh-tw
timezone: ''
...
</span></code></pre></div>

We can also see the <a href="https://hexo.io/docs/configuration">Configuration page</a> for more description of configuration.

### Step 3. Choose a Theme for Your Hexo Blog ###

Hexo provides a very eaay way to chagne between [multiple themes][multitheme] just by cloning the specific theme template to the local directory in the ./theme folder. Then, modify the _config.yml in the Hexo project.

<div class="language-shell highlighter-rouge"><pre class="highlight"><code class="hljs ruby"><span class="nb" style="font-size: 80%">...
# Extensions
## Plugins: https://hexo.io/plugins/
## Themes: https://hexo.io/themes/
theme: tranquilpeak
...
</span></code></pre></div>

At this point, we can try to run the command ```hexo server``` now. Once the server has been sucessfully installed, the website will run at ```http://localhost:4000``` by default. When the server is running, Hexo will watch for file changes and update automatically so it’s not necessary to manually restart the server. If we want to change the port, use the ```-p``` option to set a different port or the ```-i``` option to override the default IP setting.

```
# Change to use 5000 port
$ hexo server -p 5000
# Override 0.0.0.0 by 192.168.1.1 IP setting
$ hexo server -i 192.168.1.1
```

## Reference ##
+ [Hexo.io](https://hexo.io/)
+ [hexo-theme-tranquilpeak](https://github.com/LouisBarranqueiro/hexo-theme-tranquilpeak)


[louis]:https://s311354.github.io/Louis.github.io/ "https://s311354.github.io/Louis.github.io/"

[hexo]:https://hexo.io/ "https://hexo.io/"

[github]:https://pages.github.com/ "https://pages.github.com/"

[jekyll]:https://jekyllrb.com/ "https://jekyllrb.com/"

[disqus]:https://disqus.com/ "https://disqus.com/"

[analytics]:https://analytics.google.com/ "https://analytics.google.com/"

[nodejs]:https://nodejs.org/en/download/ "https://nodejs.org/en/download/"

[hexolouis]:https://louissrliu.github.io/ "https://louissrliu.github.io/"

[multitheme]:https://hexo.io/themes/ "https://hexo.io/themes/"
