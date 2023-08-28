---
layout: post
title:   "Introduction of Verilog Mode and Emacs (Updated)"
date:    2021-10-18
tags:    [Verilog]
---

## Purpose 
The Verliog design has several duplicate informations, such as argument lists, sensitivity lists, and cross-module wire statement. This feature may causes potential errors by manually programing, lack of maintainability, and overall code bloat.

The verilog-mode supports autogen features to eliminate duplicate effort, looking for keyword (/\*AUTO\*/) in the verilog code and expand them into appropriate text. Though this autogen features can speed coding, does not mean not exist compile or lint errors in your RTL design. 

## Prerequisites
Make sure your operating system with a recent GUN Emacs (my MACOS is installed GNU Emacs 26.1 version) since the old version of Emacs may not support Verilog-mode execution. Please check your Emacs load-path and see the instructions at the top of the .el or .elc file for details. 

## Emacs
Emacs is a family of text editors, like vim and notepad++. The emacs fans describe it as "the extensible, customizable, self-documenting and real-time display editor". It is, along with vi, one of the two main contenders in the traditional editor wars of Unix clture.

### Install Emacs
<ol>
<li>Check Emacs version</li>
<div class="language-shell highlighter-rouge"><pre class="highlight"><code class="hljs ruby"><span class="nb">$ emacs --version 
GNU Emacs 26.1
Copyright (C) 2018 Free Software Foundation, Inc.
GNU Emacs comes with ABSOLUTELY NO WARRANTY.
You may redistribute copies of GNU Emacs
under the terms of the GNU General Public License.
For more information about these matters, see the file named COPYING.
</span></code></pre></div>
<li>Install on macOS</li>
<div class="language-shell highlighter-rouge"><pre class="highlight"><code class="hljs ruby"><span class="nb"># Upgrade brew open-source software package management system 
$ brew update
# Install emacs
$ brew install emacs
# Symlink in the App folder
$ brew linkapps emacs
</span></code></pre></div>
</ol>

### Common Emacs Shortcuts
<ol>
<li>Save file: ctrl + x -> ctrl + s</li>
<li>Close file: ctrl + x -> ctrl + z</li>
<li>Copy: alt + w</li>
<li>Paste: ctrl + y</li>
</ol>

## Verilog-mode
The Verilog AUTOS are in use by many of the leading IP providers, including IP processor cores sold by MIPS and ARM. 

### The describe-function in Emacs load-path 
The verilog-mode features have been implemented by Emacs Lisp code loading verilog-auto functions, similar to load-library, but is lower-level and accepts additional arguments.

<div class="language-shell highlighter-rouge"><pre class="highlight"><code class="hljs ruby"><span class="nb"># The verilog-mode.elc in Emacs load-path: emacs/26.1/lisp/progmodes/verilog-mode.elc
$ less verilog-mode.elc

...
3124 Using \[describe-function], see also:
3125     `verilog-auto-arg'          for AUTOARG module instantiations
3126     `verilog-auto-ascii-enum'   for AUTOASCIIENUM enumeration decoding
3127     `verilog-auto-assign-modport' for AUTOASSIGNMODPORT assignment to/from modport
...
</span></code></pre></div>

### Demo Emacs Verilog-mode
<div class="language-shell highlighter-rouge"><pre class="highlight"><code class="hljs ruby"><span class="nb"># Clone Verilog_Mode repo
$ git clone https://github.com/s311354/Verilog_Mode.git

# Enter Verilog_Mode directory and execute emacs
$ emacs VerModeDemo.v

# Execute verilog-auto function: ctrl + c -> ctrl + a
</span></code></pre></div>

<h3><a name="TableContent"></a> Description of Verilog-mode Features </h3>

<h5><ol>
    <li><a href="#ARG">AUTOARG</a></li>
    <li><a href="#INST">AUTOINST</a></li>
    <li><a href="#INOUT"> AUTOINPUT, AUTOOUTPUT, AUTOREGINPUT and AUTOINOUT</a></li>
    <li><a href="#WIREREG">AUTOWIRE and AUTOREG</a></li>
    <li><a href="#RESET">AUTOREG</a></li>
    <li><a href="#AS">AUTOSENSE</a></li>
    <li><a href="#TIEOFF">AUTOTIEOFF</a></li>
    <li><a href="#ASCII">AUTOASCIIENUM</a></li>
    <li><a href="#TEMPLATE">AUTO_TEMPLATE</a></li>
</ol></h5>

### <a name="ARG">AUTOARG</a> ###
The verilog-auto-arg (function) replaces the argument declarations at the beginning of the module with ones automatically derived from input and output statements. Recommending for using only name-based when instantiating the resulting module.

### <a name="INST">AUTOINST</a> ###
The verilog-auto-inst (function) replaces the pin connections to an instantiation or interface declaration with ones automatically derived from the module or interface header of the instantiated item.

If any ports defined before the /\*AUTOINST\*/ are not included in the list of automatics, you should connect pin by yourseld just like you normally make. 

### <a name="INOUT">AUTOINPUT, AUTOREGINPUT, AUTOOUTPUT and AUTOINOUT</a> ###
The verilog-auto-input (function), verilog-auto-output (function) and verilog-auto-inout (function) make input statements for any input, any output, and inout signals into an /\*AUTOINST\*/ that aren't declared elsewhere inside the module. This is useful for modules which only instantiate other modules.

For another function, verilog-auto-reg-input (function), it makes reg statements instantiation inputs that aren't already declared just like verilog-auto-input (function).

### <a name="WIREREG">AUTOWIRE and AUTOREG</a> ###
The verilog-auto-wire (function) makes wire statements for instantiations outputs that aren't already declared. 

The verilog-auto-reg (function) makes reg statements for any output that isn't already declared, and isn't a wire output from a block.

### <a name="RESET">AUTORESET</a> ###
The verilog-auto-reset (function) replaces the /\*AUTORESET\*/ comment with code to initialize all registers set elsewhere in the always block.

### <a name="AS">AS or AUTOSENSE</a> ###
The verilog-auto-sense (function) replaces the always (/\*AUTOSENSE\*/) sensitivity list (/\*AS\*/ for short) with one automatically derived from all inputs declared in the always statement. 

### <a name="TIEOFF">AUTOTIEOFF and AUTOUNUSED</a> ###
The verilog-auto-tieoff (function) replaces the /*AUTOTIEOFF*/ comment with code to wire-tie all unused output signals to deasserted. For another function, it replaces the /*AUTOUNUSED*/ comment with a comma separated list of all unused input and inout signals.

### <a name="ASCII">AUTOASCIIENUM</a> ###
The verilog-auto-ascii-enum (function) creates a register to contain the ASCII decode of an enumerated signal type. Normally, this function is used to create the finite state machine (FSM), but the default the bitwidth of nextstate and state information should be reviewed and manually modified.

### <a name="TEMPLATE">AUTO_TEMPLATE</a> ###
This feature is used to customize the parameter connections to an instantiation or create multiple instantiations based upon a single template.

For an example:

<div class="language-shell highlighter-rouge"><pre class="highlight"><code><span class="nv">// Regular expression Condition: "_\([a-z0-9]+\)"
/* InstModule AUTO_TEMPLATE "_\([a-z0-9]+\)" (
    .out        (@_constant_pin),
    );
*/

InstModule sub_RAM1 (/*AUTOINST*/);
InstModule sub_RAM2 (/*AUTOINST*/);
</span></code></pre></div>

<a href="#TableContent">Table of Content</a>

## Reference
[1] [Introduction to Verilog-Mode](https://www.veripool.org/wiki/verilog-mode) 

[2] [Install Emacs on macOS](http://xxd3vin.github.io/emacs.html) 

[3] [Editor war](https://en.wikipedia.org/wiki/Editor_war)

[4] [Emacs Keys Basics](http://ergoemacs.org/emacs/emacs_keys_basics.html)

<p>Feel free to leave the comments below or <a href="mailto:qazqazqaz850@gmail.com">email</a> to me. 
