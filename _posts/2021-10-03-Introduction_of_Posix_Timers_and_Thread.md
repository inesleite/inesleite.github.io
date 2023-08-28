---
layout: post
title:   "Introduction of POSIX Timer and Thread"
date:    2021-10-03
tags:    [C_C_plus_plus, Programming]
---

## Abstract ##
POSIX time is a system for describing a point in time, also known as Unit time. It is widely used in operation systems and file formats. The C POSIX library is a specification of a C standard library for POSIX systems, which includes the time types and functions definied in <time.h> header file. Recently, one of my friends shared the conception of POSIX timer with me. But, I seldom used and was not focus on the POSIX-TIMERS API before. So that I roughly survey this topic and try to sort the relative information out in this post. Here we go.

## POSIX Timers C API ##
Summary of C standard library for POSIX systems:
<table>
 <tr>
  <th>Function</th>
  <th>Description</th>
 </tr>
 <tr>
  <td>clock_settime()</td>
  <td>Set Clock to a specified value</td>
 </tr>
 <tr>
  <td>clock_gettime()</td>
  <td>Get value of clock</td>
 </tr>
 <tr>
  <td>timer_settime()</td>
  <td>Set and arm or disarm a timer</td>
 </tr>
 <tr>
  <td>timer_gettime()</td>
  <td>Get remaining interval for an active timer</td>
 </tr>
 <tr>
  <td>timer_create()</td>
  <td>Create a timer</td>
 </tr>
 <tr>
  <td>timer_delete()</td>
  <td>Delete a timer</td>
 </tr>
 <tr>
  <td>clock_getres()</td>
  <td>Get resolution of clock</td>
 </tr>
 <tr>
  <td>timer_getoverrun()</td>
  <td>Get current overrun count for a timer</td>
 </tr>
 <tr>
  <td>nanosleep()</td>
  <td>Delay the current thread with high resolution</td>
 </tr>
</table>

Even if these functions seem not be implemented in Mac OS X, we can still take a look at the simple example of timer posted in [stackover flow][stackoverflow] and further compile it and understand how the timer works. The porpose of this program is to count down 10 seconds , and hopefully only print the "Hello, World!" with the new thread to console.

### Example of Simple Timer using pthreads ###
<pre class="highlight">
timer.h
<code class="hljs"><span class="nb" style="font-size: 80%">typedef struct Timer {
    void (*fn)(void);
    bool (*timer_delegate)(pthread_t, unsigned int, unsigned int);
    unsigned int seconds;
} Timer;

void* timer_run(void *t);

bool should_kill_thread(pthread_t self_id, unsigned int start_time, unsigned int utime_new); 
 
void hello_world();</span></code></pre>

<pre class="highlight">
timer.c<code class="hljs"><span class="nb" style="font-size: 80%">#include "posix_timer.h"

void* timer_run(void *t) {
    unsigned int start_time = time(NULL);
    while(1) {
        Timer tmr = *((Timer *) t);
        bool should_kill_thread = tmr.timer_delegate(pthread_self(), start_time, time(NULL));
        if (should_kill_thread) 
            pthread_cancel(pthread_self());
        tmr.fn();
        sleep(tmr.seconds);
    }
}

bool should_kill_thread(pthread_t self_id, unsigned int start_time, unsigned int utime_new) {
    printf("Thread ID: %u\n",(unsigned) self_id);
    printf("the start time was %d and the new time is %d \n", start_time, utime_new);
    // Count down 10 seconds
    if (utime_new - start_time >= 9) {
        return true;
    }
    return false;
}

void hello_world() {
    printf("%s\n", "Hello, World!");
}</span></code></pre>

<pre class="highlight">
main.c<code class="hljs"><span class="nb" style="font-size: 80%">#include "posix_timer.h"

int main(int argc, char const *argv[])
{
    pthread_t t1;
    Timer args;
    args.fn = &hello_world; // function pointer
    args.timer_delegate = should_kill_thread; // function pointer
    args.seconds = 1; // call every 1 second
    // New thread starts execution by invoking timer_run()
    int id = pthread_create(&t1, NULL, timer_run, &args);
    if (id) {
       printf("ERROR; return code from pthread_create() is %d\n", id);
       exit(EXIT_FAILURE);
    }
    pthread_join(t1, NULL); // blocks main thread
    printf("%s\n", "DONE"); // never reached until t1 is killed
    return 0;
}</span></code></pre>

<pre class="highlight">The corresponding output<code class="hljs"><span class="nb" style="font-size: 80%">$ ./exe/timer
Thread ID: 47472640
the start time was 1609083090 and the new time is 1609083090 
Hello, World!
Thread ID: 47472640
the start time was 1609083090 and the new time is 1609083091 
Hello, World!
Thread ID: 47472640
the start time was 1609083090 and the new time is 1609083092 
Hello, World!
Thread ID: 47472640
the start time was 1609083090 and the new time is 1609083093 
Hello, World!
Thread ID: 47472640
the start time was 1609083090 and the new time is 1609083094 
Hello, World!
Thread ID: 47472640
the start time was 1609083090 and the new time is 1609083095 
Hello, World!
Thread ID: 47472640
the start time was 1609083090 and the new time is 1609083096 
Hello, World!
Thread ID: 47472640
the start time was 1609083090 and the new time is 1609083097 
Hello, World!
Thread ID: 47472640
the start time was 1609083090 and the new time is 1609083098 
Hello, World!
Thread ID: 47472640
the start time was 1609083090 and the new time is 1609083099 
Hello, World!
DONE</span></code></pre>

**Note**: 
- pthread_create function starts a new thread in the calling process. The new thread starts execution by invoking start_routine(). arg is passed as the sole argument of start_routine().

      int pthread_create(pthread_t *thread, const pthread_attr_t *attr, void *(*start_routine) (void *), void *arg);

- pthread_t type is definied as described in <sys/types.h> 
- A thread is the basic unit to which the operating system allocates processor time. A thread can execute any part of the process code, including parts currently being executing by another thread.

=========== To be continued…. ==========

## Reference ##

[1] [POSIX Timers (POSIX-TIMERS)](https://docs.oracle.com/cd/E19048-01/chorus5/806-6897/architecture-17/index.html)

[2] [Create C timer in macOS](https://stackoverflow.com/questions/44807302/create-c-timer-in-macos/52905687)

[3] [pthread_create function](https://man7.org/linux/man-pages/man3/pthread_create.3.html)

[4] [The Open Group: pthread.h](https://pubs.opengroup.org/onlinepubs/7908799/xsh/pthread.h.html)

[stackoverflow]:https://stackoverflow.com/questions/44807302/create-c-timer-in-macos/52905687 "https://stackoverflow.com/questions/44807302/create-c-timer-in-macos/52905687"

<p>Feel free to leave the comments below or <a href="mailto:qazqazqaz850@gmail.com">email</a> to me. Any pieces of advice are always welcome. :)
