---
layout: post
title:   "How to Manage the Children Processes and its Application"
date:    2021-09-27
tags:    [Linux, Processor]
---
## Abstract ##
The basic process management is done with a number of system calls, each with a single (simple) purpose. And these system calls can be combined to implement more complex behaviors. One of these system calls is fork() function that causes creation of a new process and create a child porcess that is a copy of the parent process. The parent and child processes execute the same program but in separate processes. In addition, an application could consist of one or more processes. A process, in the simplest terms, is an executing program. One or more threads run in the context of the process. In this post, I would describe the basic concepts of process management and how to manage the children processes.

## Basic Porcess Management ##
In a sense, the process management uses standard Interprocess communication (IPC) mechanism to communication for parent and child communication that runs the same program, but could use the return value from fork() to distinguish between the parent and child. The following figure shows the basic behavior of porcess management. 

<figure><center><img src="{{ site.baseurl }}/picture/basic_process_management.png" width="50%"></center></figure>

&lt;Note&gt; The system calls are uesd for basic process management. 
<ul>
 <li>fork(): The parent process uses forks to create a new child process. The child process is a copy of parent. After fork, both parent and child executes the same program but in separate.</li>
 <li>exec(): Replaces the program executes by a process. The child may use exec() after a fork() to replace the process's memory space with a new program executable making the child execute a different program than the parent.</li>
 <li>exit(): Terminates the process with an exit status.</li>
 <li>wait(): The parent may use wait to suspend execution until a child terminates. Using wait() the parent can obtain the exit() status of a terminated child.</li>
</ul>

### How to Manage the Children Processes  ###
A child porcess in computing is a process created by another process (the parent process). This technique pertains to multitasking operating systems, and is sometimes called a subprocess or traditionally a subtask. There are two major procedures for creating a child process: the fork() system call (preferred in Unix-like systems and the POSIX standard) and the spawn() (prefrred in the modern kernal or Microsoft windows, as well as in some historical operating systems). For more details, you could refer to [Child process][wikichild] page.

Here, I took a simple example that handles two children processes from a single parent and observed how to go about making two child processes and then having them do different things.

<div class="language-shell highlighter-rouge"><pre class="highlight">A simple example that handles two children processes<code class="hljs ruby"><span class="nb" style="font-size: 80%">#include &lt;iostream&gt;
#include &lt;stdio.h&gt;
#include &lt;sys/types.h&gt;
#include &lt;unistd.h&gt;
#include &lt;stdlib.h&gt;
#include &lt;sys/wait.h&gt;

using namespace std;

int main()
{
    int pid1;
    int pid2;
    int status;

    pid1 = fork();
    pid2 = fork();

    if(pid1 == 0) //the first child
    {
        cout << "Process Child 1 with PID " << getpid() << endl;
        exit(0);
    }

    if(pid2 == 0) //the second child
    {
        wait(&status);
        cout << "Process Child 2 with PID " << getpid() << endl;
        exit(0);
    }

    else //the parent
    {
        wait(&status);
        cout << "Process Parent with PID " << getpid() << " and created child1 with PID " << pid1 << " and created child2 with PID " << pid2 << endl;
    }

    return 0;  
}</span></code></pre></div>

<div class="language-shell highlighter-rouge"><pre class="highlight">The corresponding output:<code class="hljs ruby"><span class="nb" style="font-size: 80%">$ ./src/main
Process Child 2 with PID 98903
Process Child 1 with PID 98902
Process Parent with PID 98901 and created child1 with PID 98902 and created child2 with PID 98903
Process Child 1 with PID 98904
</span></code></pre></div>

In this example, we could observe that the first invoking fork() function creates the first child process and further both of parent and first child processes execute the second invoking fork() function to create the second child process. So, there are four processes.

## InterProcess Communication ##
The interprocess communication refers specifically to the mechanisms an operating system provides to allow the processes to manage shared data. There are a lot of different types of IPC. One type of IPC is signals. There are a fixed set if signals. One program can send a signal to another, the receiving program is then interrupted and jumps straight into some code to handle the signal (then back to where it left off). For example, if you run a program from a terminal, then type ctrl-C to kill it. The terminal program is sending the signal 'INT' to the other program which then stops.

Other IPC mechanisms tend to come in two types: A message queue or pipe where one process puts data into the queue and another process consumes the data. And, shared memory where part of the memory is accessible by more than one process. For more details, you could refer to the [Inter-process communication][wikiipc] page. Here, I took a example that use array in shared memory and access/change them from the different processes.

<div class="language-shell highlighter-rouge"><pre class="highlight">A example that uses shared memory to share an array between processes<code class="hljs ruby"><span class="nb" style="font-size: 80%">#include &lt;string.h&gt; 
#include &lt;stdio.h&gt;
#include &lt;unistd.h&gt;
#include &lt;sys/mman.h&gt;

void* create_shared_memory(size_t size) {
  // Our memory buffer will be readable and writable:
  int protection = PROT_READ | PROT_WRITE;

  // The buffer will be shared (meaning other processes can access it), but
  // anonymous (meaning third-party processes cannot obtain an address for it),
  // so only this process and its children will be able to use it:
  int visibility = MAP_ANONYMOUS | MAP_SHARED;

  // The remaining parameters to `mmap()` are not important for this use case,
  // but the manpage for `mmap` explains their purpose.
  return mmap(NULL, size, protection, visibility, 0, 0);
}

int main() {
  char* parent_message = "hello";  // parent process will write this message
  char* child_message = "goodbye"; // child process will then write this one

  void* shmem = create_shared_memory(128);

  memcpy(shmem, parent_message, sizeof(&parent_message));

  int pid = fork();
                        
  if (pid == 0) {       
    printf("Child read: %s with PID: %d \n", (char *)shmem, getpid());    
    memcpy(shmem, child_message, sizeof(&child_message));    
    printf("Child wrote: %s with PID: %d \n", (char *) shmem, getpid());    

  } else {
    printf("Parent read: %s with PID: %d and created Child process with PID: %d \n", (char *) shmem, getpid(), pid);
    sleep(1);
    printf("After 1s, parent read: %s with PID: %d and created Child process with PID %d \n", (char *)shmem, getpid(), pid);
  }
}</span></code></pre></div>

<div class="language-shell highlighter-rouge"><pre class="highlight">The corresponding output:<code class="hljs ruby"><span class="nb" style="font-size: 80%">$ ./src/main
Parent read: hello with PID: 8428 and created Child process with PID: 8429 
Child read: hello with PID: 8429 
Child wrote: goodbye with PID: 8429 
After 1s, parent read: goodbye with PID: 8428 and created Child process with PID 8429</span></code></pre></div>

In this example, there are just three steps: Parent process initialize the shared memory, Child process accesses and overwirtes the shared memory, Parent process access the shared memory.

=========== To be continued…. ==========

## Reference ##
[1] [Wiki: Inter-process communication](https://en.wikipedia.org/wiki/Inter-process_communication)

[2] [Process management](http://www.it.uu.se/education/course/homepage/os/vt18/module-2/process-management/)

[3] [Cplusplus: Managing Children Processes](http://www.cplusplus.com/forum/unices/111906/)

[4] [Cplusplus: How to use shared memory to share an array between processes](http://www.cplusplus.com/forum/general/245501/)

[wikiipc]:https://en.wikipedia.org/wiki/Inter-process_communication "https://en.wikipedia.org/wiki/Inter-process_communication"

[wikichild]:https://en.wikipedia.org/wiki/Child_process "https://en.wikipedia.org/wiki/Child_process"

<p>Feel free to leave the comments below or <a href="mailto:qazqazqaz850@gmail.com">email</a> to me. Any pieces of advice or suggestion are always welcome. :)
