---
layout: post
title:   "How to Use Tmux and Set up Configuration"
date:    2021-08-01
tags:    [Linux]
---
## Purpose ##
When you program on the Unix-like terminal, you might not feel comfortable to mess around with multi-windows, especially more than 5 windows. It is quite difficult to operate with mulit-windows.

The Tmux is a popular, powerful and flexible terminal multiplexer for Unix-like operating systems, It allows multiple terminal sessions to be accessed simultaneously in a single window that useful for running more than one command-line program or monitor the process of each task or operating multiple tasks at the same time. That makes you more efficent.

In this short post, I am sorting out some basic concept, related configuration and commands for Tmux and  how to use a Tmux. I hope these informations will be helpful to you or anyone who is interested in Tmux that will be useful.

## Prerequisites ##
Make sure your Unix-like terminal have been installed Tmux. Currently, the latest release version of tmux is 3.2a and could run on Linux, OS X and Solaris, etc. 

#### Install Tmux From Github Version Control ####

```
Clone Tmux Repo:
$ git clone https://github.com/tmux/tmux.git

Auto Build Tmux Source Code and Installation:
$ cd tmux
$ sh autogen.sh
$ ./configure && make
```

#### The Concept of Tmux ####

Tmux has sessions, windows, and panes. The hierarchy is that Tmux could have multiple sessions, a session could have multiple windows, a window could have multiple panes. User could follow certain conventions or rules to customize Tmux on your Unix-like terminal. For example, we could create one session for launching the long-running process. In this session, we could create multiple windows, and each window would be used for each specific task for the long-running process. In the windows, in order to improve to be more efficent, we could also create multiple panes for purpose such as editting the relevant configurations and launching the process, and process mointoring.

<figure>Window with three panes:<a><img src="{{ site.baseurl }}/picture/tmux_multi_panes.png" width="100%"></a></figure>

## Tmux Cheatsheet and Shortcuts ##

There are three ways to issue commands to tmux:

<ul>
 <li><a href="#CommandLine">Command-line:</a> directly enter the command line that prefaced by tmux within tmux session</li>
 <li><a href="#Shortcuts">Shortcuts:</a> use prefix key, which is *CTRL-b* by default and then interpret the keystroke following the prefix as a tmux shortcut</li>
 <li><a href="#CommandMode">Command-mode:</a> enter command mode by pressing the prefix followed by *:*</li>
</ul>

#### <a name="CommandLine">Common Tmux Command-Line</a> ####

To start the Tmux, you could simply type the following commands in your console.

```
Create a new session:
$ tmux new -s <SessionName>

List sessions:
$ tmux ls

Kill session:
$ tmux kill-session -t <SessionName>

Kill all sessions but keep the current:
$ tmux kill-session -a

Attach to a specific session:
$ tmux attach -t <SessionName>

Attach the last session:
$ tmux attach
$ tmux a

Detach from the session:
$ tmux detach
$ tmux -d
```

For example, to get a list of all tmux sessions that you created before, you could just type "$ tmux ls" and check all the session name, when to be created, and how many windows be created in the session. 
<figure>List four Tmux sessions:<a><img src="{{ site.baseurl }}/picture/tmux_list_session.png" width="100%"></a></figure>

#### <a name="Shortcuts">Common Tmux Shortcuts</a> ####

In tmux session, hit the prefix "**CTRL+b**". Tmux will interpret the keystroke following the prefix as a tmux shortcut. You could simply type following keystrokes.

<font size="3" face="Courier New">
<table>
 <tr>
  <th>Function</th>
  <th>Shortcut</th>
 </tr>
 <tr>
  <td>Display an interactive session list</td>
  <td>Prefix + s</td>
 </tr>
 <tr>
  <td>Switch to the previous session</td>
  <td>Prefix + (</td>
 </tr>
 <tr>
  <td>Switch to the next session</td>
  <td>Prefix + )</td>
 </tr>
 <tr>
  <td>Detach from the current session</td>
  <td>prefix + d</td>
 </tr>
 <tr>
  <td>Rename a session in tmux</td>
  <td>prefix + $</td>
 </tr>
 <tr>
  <td>Create a new window</td>
  <td>Prefix + c</td>
 </tr>
 <tr>
  <td>Rename a window</td>
  <td>Prefix + ,</td>
 </tr>
 <tr>
  <td>Split windows horizontally</td>
  <td>Prefix + %</td>
 </tr>
 <tr>
  <td>Split windows vertically</td>
  <td>Prefix + "</td>
 </tr>
 <tr>
  <td>Zoom in on the active pane</td>
  <td>Prefix + z</td>
 </tr>
 <tr>
  <td>Switch to another pane</td>
  <td>Prefix + arrow key</td>
 </tr>
 <tr>
  <td>Force to kill an unresponsive process in a pane</td>
  <td>Prefix + x</td>
 </tr>
 <tr>
  <td>Switch to another layout</td>
  <td>Prefix + space</td>
 </tr>
 <tr>
  <td>Move the pane out of current window</td>
  <td>Prefix + !</td>
 </tr>
 <tr>
  <td>Swap current pane with the page from the left</td>
  <td>Prefix + {</td>
 </tr>
 <tr>
  <td>Swap current pane with the page from the right</td>
  <td>Prefix + }</td>
 </tr>
 <tr>
  <td>List shortcuts</td>
  <td>Prefix + ?</td>
 </tr>
</table>
</font>

#### <a name="CommandMode">Common Tmux Command-Mode</a> ####

In tmux session, hit the prefix "**CTRL+b**" and also follows with *:*. Tmux will open a command prompt at the bottom of the screen, which accept tmux commands. You could simply type following tmux commands.

<font size="3" face="Courier New">
<table>
 <tr>
  <th>Function</th>
  <th>Tmux Command</th>
 </tr>
 <tr>
  <td>Start new session with the name</td>
  <td>new-session -s SessionName</td>
 </tr>
 <tr>
  <td>Display an interactive window list </td>
  <td>list-windows</td>
 </tr>
 <tr>
  <td>Split windows horizontally</td>
  <td>split-window -h</td>
 </tr>
 <tr>
  <td>Split windows vertically</td>
  <td>split-window -v</td>
 </tr>
 <tr>
  <td>Synchronize all the panes in a window</td>
  <td>setw synchronize-panes</td>
 </tr>
</table>
</font>

You may find and learn more information from [OpenBSD: tmux][openbsdtmux]

## Tmux Configuration ##
The basic tmux could be configured to personalize the tmux experience that supercharges your tmux and builds comfortable terminal environment. I'm sharing my simple [.tmux.conf][tmuxconf] file as template. These uses remapping, mouse-mode, and bind command, etc. You can try this as your .tmux.conf after backing up yours or as the reference. The configuration file should be located under the home directory.

<details markdown=block>
<summary markdown=span>*.tmux.conf*</summary>
<div class="language-shell highlighter-rouge"><pre class="highlight"><code class="hljs ruby"><span class="nb" style="font-size: 80%"># reload config file (change file location to your the tmux.conf you want to use)
bind r source-file ~/.tmux.conf

# remap prefix from 'C-b' to 'C-a'
unbind C-b
set-option -g prefix C-q
bind-key C-q send-prefix

# split panes using | and - 
unbind '"'
unbind %
bind | split-window -h 
bind - split-window -v 

# switch panes using Alt-arrow without prefix
bind -n M-Left select-pane -L
bind -n M-Right select-pane -R
bind -n M-Up select-pane -U
bind -n M-Down select-pane -D

# Enable mouse mode (tmux 2.1 and above)
set -g mouse on

# Shift arrow to switch windows
bind -n S-Left  previous-window
bind -n S-Right next-window

# Use Alt-arrow keys without prefix key to switch panes
bind -n M-Left select-pane -L
bind -n M-Right select-pane -R
bind -n M-Up select-pane -U
bind -n M-Down select-pane -D

# Copy-Paste
setw -g mode-keys vi

#  modes
setw -g clock-mode-colour colour5
setw -g mode-style 'fg=colour1 bg=colour18 bold'

# panes
set -g pane-border-style 'fg=colour19 bg=colour0'
set -g pane-active-border-style 'bg=colour0 fg=colour9'

# statusbar
set -g status-position bottom
set -g status-justify left
set -g status-left ''
set -g status-right '#[fg=colour233,bg=colour10] %m/%d/%y #[fg=colour230,bg=colour8] %H:%M:%S '
set -g status-right-length 50
set -g status-left-length 20

# No delay for escape key press
set -sg escape-time 0

# Activity Monitoring
setw -g monitor-activity on
set -g visual-activity on</span></code></pre></div></details>

You may find and learn more information from [OpenBSD: tmux][openbsdtmux]

## Tmux Plugins and Tools ##

Like Vim, to add new tmux plugins, we can either manually install themes to employ a pluging manager. It is recommended to install [Tmux Plugin Manager][tmuxplugmanager] and further add new plugins. There are two tmux plugins that can help with restart tmux which running programs when you shut down your computer: [Tmux Resurrect][tmuxresurrect]

First, we need to clone TPM repo:
```
$ git clone https://github.com/tmux-plugins/tpm ~/.tmux/plugins/tpm
```

Then we configure new plugins to .tmux.conf,
<details markdown=block>
<summary markdown=span>*.tmux.conf*</summary>
<div class="language-shell highlighter-rouge"><pre class="highlight"><code class="hljs ruby"><span class="nb" style="font-size: 80%">#--------------
# Install Tmux plugins
#--------------
# List of plugins
set -g @plugin 'tmux-plugins/tpm'
set -g @plugin 'tmux-plugins/tmux-resurrect'

# Initialize TMUX plugin manager (keep this line at the very bottom of tmux.conf)
run -b '~/.tmux/plugins/tpm/tpm'
...</span></code></pre></div></details>

Finally, reloading tmux config to install the plugins by Command-Mode (:source-file ~/.tmux.conf) or Shortcut (Prefix + I). If the installation of plugin was successful, we would see the following information.
<details markdown=block>
<summary markdown=span>*display statement*</summary>
<div class="language-shell highlighter-rouge"><pre class="highlight"><code class="hljs ruby"><span class="nb" style="font-size: 80%">TMUX environment reloaded.
Done, press ENTER to continue.</span></code></pre></div></details>

#### Save and Restore Tmux Environment ####

Tmux Resurrect supports to save and restore all the details from your tmux environment. The shortcut of saving is Prefix + Ctrl + s and the shortcut of restoring is Prefix + Ctrl + r.

You can find more information about this feature on [Tmux Resurrect][tmuxresurrect].

=========== To be continued… ==========

## Reference ##
[1] [Tmux Repository](https://github.com/tmux/tmux)

[2] [Tmux Tutorial](https://leimao.github.io/blog/Tmux-Tutorial/)

[3] [Wiki Tmux](https://en.wikipedia.org/wiki/Tmux)

[4] [OpenBSD manual page server - Tmux](http://man.openbsd.org/OpenBSD-current/man1/tmux.1)

[5] [Tmux Cheat Sheet & Quick Reference](https://tmuxcheatsheet.com)

[openbsdtmux]:https://man.openbsd.org/OpenBSD-current/man1/tmux

[tmuxconf]:https://github.com/srliuLouis/tmux-configuration/blob/main/.tmux.conf "https://github.com/srliuLouis/tmux-configuration/blob/main/.tmux.conf"

[tmuxplugmanager]:https://github.com/tmux-plugins/tpm "https://github.com/tmux-plugins/tpm"

[tmuxresurrect]:https://github.com/tmux-plugins/tmux-resurrect "https://github.com/tmux-plugins/tmux-resurrect"

[tmuxcontinuum]:https://github.com/tmux-plugins/tmux-continuum "https://github.com/tmux-plugins/tmux-continuum"

<p>Feel free to leave the comments below or <a href="mailto:qazqazqaz850@gmail.com">email</a> to me. Any other pieces of advice are always welcome. :)
