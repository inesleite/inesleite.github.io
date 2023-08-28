---
layout: post
title:   "Neovim with Vim-Plugins Toolkits"
date:    2021-09-16
tags:    [IDE]
---

Neovim might be a nice integrated development environment and able to enhance your workflow when executing many miscellaneous tasks on Linux. It's very useful to make my life as an engineer a little easier and a little better. In this post, I would take notes of my configuration with numerous plugin tools and vim-snippets.

## Prerequisites ##

Make sure your operation with nvim (my MacOS is installed NVIM v0.4.4 version), python 3.6 version (to support YouCompleteMe).

## NVIM ##

Neovim config file is named init.vim and its location on .config/nvim/init.vim. All your settings can be put into this file. Here is my example configuration for a reference; for more details, refer to [nvim_configuration][nvim_config].

<pre class="highlight"><code class="hljs"><span class="nb">"----------------------------------------------------------------
" 1. Plugins
"----------------------------------------------------------------
call plug#begin('~/.config/nvim/plugged')
Plug 'nvim-lua/completion-nvim'
Plug 'neoclide/coc.nvim', {'branch': 'release'}
Plug 'Valloric/YouCompleteMe'
Plug 'dense-analysis/ale'
Plug 'SirVer/ultisnips'
Plug 'honza/vim-snippets'
Plug 'vim-airline/vim-airline'
Plug 'vim-airline/vim-airline-themes'
Plug 'https://github.com/scrooloose/nerdtree.git'
Plug 'dpelle/vim-LanguageTool'
Plug 'kamykn/popup-menu.nvim'
Plug 'kamykn/spelunker.vim'
Plug 'vim-scripts/DoxygenToolkit.vim'
Plug 'pangloss/vim-javascript'
Plug 'matze/vim-move'
call plug#end()
...
</span></code></pre>

Besides, in the configuration, I chose my personal favorite plugin manager, vim-plug, which is a beautiful and minimalist plugin for Neovim. It is straightforward to set up and customize your configuration and generally specified with a reference to plugins repo. To see more of what vim-plug can do, check out their [documentation][vim_plug].

The three Vim-plugins toolkits described below are my favorites, the ones I use in virtually every profile I have, no matter what programming language I'm using. 

### Essential Vim-Plugin Toolkits ###

<h4><a name="TableContent"></a> List of Vim-Plugin Toolkits</h4>
<h6><ol>
    <li><a href="#youcompleteme">YouCompleteMe</a></li>
    <li><a href="#vimsnippets">Vim-Snippets</a></li>
    <li><a href="#neoclvim">Neoclide/Coc.nvim</a></li>
</ol></h6>

<a name="youcompleteme">YouCompleteMe</a>

YouCompleteMe is a fast and fuzzy-search code completion for vim. You could realize that no keyboard shortcut had to be press to get the list of completion candidates. The user just types and the suggestions pop up by themselves. In addition, YCM provides semantic IDE-like features in a number of languages, including:

- Finding declarations, definitions, usages, etc. of identifiers.
- Display type information for class, variables, functions, etc.

For more details, you could refer to the [ycm-core/YouCompleteMe][youcompleteme] repo.

<a name="vimsnippets">Vim-Snippets</a>

Vim-Snippets is a great way to save keystrokes without having to set up languages servers. There are different forks of snippets engines which allow the user to insert snippets by typing the name of snippet hitting the expansion mapping. In fact, in UltiSnips directroy, there are many framework snippets and additional library that users are available to access. Besides, its wiser to define your personal snippets or customize snippets. 

For more details, you could refer to [honza/vim-snippets][snippets] repo.

<a name="neoclvim">Neoclide/Coc.nvim</a>

Neoclide/Coc.nvim is a complete Language Server Protocol (LSP) client that provides support for features base on the specific programming languages, including:
- Language aware autocompletion
- Go to definition
- Find reference

Types are automatically imported, and you can see function signatures and relevant code completions your type.

## Conclusion ##

The above description is of which several vim-plugin toolkits I recommended. The others are also helpful to make my life as an engineer a little easier and a little better. What Vim-Plug toolkits you are using? Please feel free to share your favorites in the comments. Thanks for your reading.

## Reference ##

[1] [Neovim setup for c++ and openFrameworks development](https://madskjeldgaard.dk/neovim-setup-for-c-and-openframeworks-development/)

[2] [10 essential Vim plugins](https://medium.com/@huntie/10-essential-vim-plugins-for-2018-39957190b7a9)

[3] [Configure coc.nvim for C/C++ Development](https://ianding.io/2019/07/29/configure-coc-nvim-for-c-c++-development/)

[4] [A guide to modern Web Development with Neovim](https://www.freecodecamp.org/news/a-guide-to-modern-web-development-with-neo-vim-333f7efbf8e2/)

[5] [Top 10 Vim plugins for programming in multiple languages](https://opensource.com/article/19/11/vim-plugins)

[nvim_config]:https://github.com/ShirongLiu/nvim_configuration/blob/master/init.vim "https://github.com/ShirongLiu/nvim_configuration/blob/master/init.vim"

[vim_plug]:https://github.com/junegunn/vim-plug "https://github.com/junegunn/vim-plug" 

[youcompleteme]:https://github.com/ycm-core/YouCompleteMe#user-guide "https://github.com/ycm-core/YouCompleteMe#user-guide"

[snippets]:https://github.com/honza/vim-snippets "https://github.com/honza/vim-snippets"

[cocnvim]:https://github.com/neoclide/coc.nvim/wiki "https://github.com/neoclide/coc.nvim/wiki"

<p>Feel free to leave the comments below or <a href="mailto:qazqazqaz850@gmail.com">email</a> to me. Any pieces of advice are always welcome. :)
