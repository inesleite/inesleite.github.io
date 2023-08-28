---
layout: post
title: How to setup gdb and Eclipse to debug C/C++ files on macOS
tags: [IDE] 
---

## Purpose 

  For software development, Eclipse is one of the most common integrated development environments (IDE) that provides comprehensive facilities to computer programmers. IDEs contain the necessary compiler, interpreter, or both.
  
  Besides, the GNU Debugger (GDB) is a debugger that works for many programming languages, including C, C++, and Objective-C and partially others. The GDB allows software developers to see what is going on inside another program while it executes and helps to catch bugs in the act.

## Install Eclipse

  The convenient and safe way to install Eclips is by downloading the installer file on the [Eclipse Foundation website](https://www.eclipse.org/downloads/download.php?file=/oomph/epp/2019-03/R/eclipse-inst-mac64.dmg).

## Setup GDB

### Using brew to install gdb
  The easiest way to install gdb is by using brew cmd to install. Please run this command:

  <div class="language-shell highlighter-rouge"><pre class="highlight"><code class="hljs ruby"><span class="nb">$ brew install gdb </span></code></pre></div>

  After running the command, you can find out your gdb version:

  <div class="language-shell highlighter-rouge"><pre class="highlight"><code class="hljs ruby"><span class="nb">$ gdb --version </span></code></pre></div>
  
### Generate a certificate by Keychain Access

  If you try using GDB to debug a file, the console would show error since the Darwin kernel doesn’t allow gdb to control another process without having special rights. Thus, you must generate a certificate by Keychain Access to give gdb those permissions.

  <ol>
  <li> Open and Launch Keychain Access application: Applications > Utilities > Keychain Access.. </li>
  <li> Right-click on the System item and select Unlock Keychain “System”. </li>
  <li> Select Keychain Access > Certificate Assistant > Create a Certificate.</li>
  <li> Choose a name (e.g. gdb-cert). </li>
  <li> Set Identity Type to Self Signed Root. </li>
  <li> Set Certificate Type to Code Signing. </li>
  </ol>

  Finally, lock Keychain “System” and reboot your system.

### Sign the certificate for GDB and Create a GDB command file

  Open your Terminal prompt and run:

  <div class="language-shell highlighter-rouge"><pre class="highlight"><code class="hljs ruby"><span class="nb">$ codesign -s gdb-cert < gdbPat > </span></code></pre></div>
  
  ,where gdb-cert is the name of your certificate and \<gdbPath\> is the full path to your gdb binary file.

  Then, from the Terminal, you can do that by running this:

  <div class="language-shell highlighter-rouge"><pre class="highlight"><code class="hljs ruby"><span class="nb">$ echo "set startup-with-shell off" >> ~/.gdbinit </span></code></pre></div>

## Setep Eclipse for using GDB

  There are two methods of configuring GDB. The first method is that configuring GDB *for a specific project*:

  <ol>
  <li> Go to Run > Debug Configurations… </li>
  <li> Select a launch configuration (e.g. C/C++ Application) </li>
  <li> Open the Debugger tab from the menu </li>
  <li> Set GDB debugger to the full path of your gdb binary file (e.g. /usr/local/bin/gdb) </li>
  <li> Set GDB command file to the full path of your .gdbinit file: ~/.gdbinit </li>
  <li> Click on the Apply button </li>
  </ol>

  The second method is that defining a default configuration for GDB to be used *in any Eclipse project*:

  <ol>
  <li> Go to Eclipse > Preferences </li>
  <li> Select C/C++ > Debug > GDB </li>
  <li> Set GDB debugger to the full path of your gdb binary file (e.g. /usr/local/bin/gdb) </li>
  <li> Set GDB command file to the full path of your .gdbinit file: ~/.gdbinit  </li>
  <li> Click on the Apply button </li>
  </ol>

  NOTE: If you run debugger then it gets stuck on 100% process.. and also shows, 

  <div class="language-shell highlighter-rouge"><pre class="highlight"><code class="hljs ruby"><span class="nb">$ Launching : Configuring GDB Aborting configuring GDB </span></code></pre></div>

  you can refer to [3] and find the solution by running as root:

  <div class="language-shell highlighter-rouge"><pre class="highlight"><code class="hljs ruby"><span class="nb">$ sudo /Applications/Eclipse.app/Contents/MacOS/eclipse </span></code></pre></div>
  
  Now, you can debug files from inside Eclipse using gdb. :)

## Reference

[1] [How to setup gdb and Eclipse to debug C++ files on macOS Sierra](https://www.thomasvitale.com/how-to-setup-gdb-and-eclipse-to-debug-c-files-on-macos-sierra/) 

[2] [Eclipse 2019-03](https://www.eclipse.org/downloads/download.php?file=/oomph/epp/2019-03/R/eclipse-inst-mac64.dmg)


[3] [Launching gdb aborting configuring gdb issue](https://stackoverflow.com/questions/5425396/eclipse-cdt-cant-use-debugger-always-stuck-on-89-process)

<p>Thanks for reading! Feel free to leeve the comments below or <a href="mailto:qazqazqaz850@gmail.com">email</a> to me. Any pieces of advice or discussions are always welcome. :)


