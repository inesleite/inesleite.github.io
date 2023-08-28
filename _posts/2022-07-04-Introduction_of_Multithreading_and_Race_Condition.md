---
layout: post
title: "Introduction of Multithreading and Race Condition"
date: 2022-07-04
tags: [Programming, C_C_plus_plus]
---

## Brief ##

What is Multi threading? [Multithreading][multithread] is the ability of a CPU (or a single core in a multi-core processor) to provide multiple thread of execution concurrently, supported by the operating system. This approach differs from multiprocessing. In a Multithreading application, the threads share the resources of a single or multiple cores, which include the computing units, the CPU caches, and the translation lookaside buffer (TLB). In short, multithreading is a model of program execution that allows for multiple threads to be created within a process, executing independently but concurrently sharing process resources. Depending on the hardware, threads can run fully parallel if they are distributed to their own CPU core.

With the availability of GPUs and multi-core CPUs application are becoming increasingly complex as developers leverage threads for maximum application performance. However, when writing multithreading applications, one of the most common problems experienced is race conditions. ([Race condition][race] is not only related with software but also related with hardware too. It is generally timing-sensitive. Actually the term was initially coined by the hardware industry.)

## Sharing Data between Threads ##

### Sharing Print Function  ###

<details markdown=block>
<summary markdown=span>*sharing_data.cc*</summary>
<div class="language-shell highlighter-rouge"><pre class="highlight"><code class="hljs ruby"><span class="nb" style="font-size: 80%">#include &lt;iostream&gt;
#include &lt;thread&gt;
using namespace std;
// shared print function for cout
void shared_print(char c, int v) {
        cout &lt;&lt; c &lt;&lt; " "&lt;&lt; v &lt;&lt; "\n";
}
// function for sequence
void foo(char d, int a) {
        for (int i = 1; i &lt;= a; i++) {
                shared_print(d, i);
        }
}
int main()
{
        thread th2(foo, 'A', 2); // child thread - 1
        thread th3(foo, 'B', 2); // child thread - 2
        thread th4(foo, 'C', 2); // child thread - 3
        th2.join(); // main thread, waits for child to finish
        th3.join(); // main thread, waits for child to finish
        th4.join(); // main thread, waits for child to finish
        return 0;
}</span></code></pre></div></details>

Print statement:
```
$ g++ -std=c++14   sharing_data.cc  -o sharing_data
$ ./sharing_data
BC  A1
C 2
 1
A 2
1
B 2
```

The print statement results in a race condition when executing print function. There are several ways to deal with problematic race conditions. The simplest option is to wrap the data structure with a protection mechanism to ensure that only the thread performing a modification can see the intermediate states where the invariants are broken.

### Sharing Print Function with mutex ###
<details markdown=block>
<summary markdown=span>*sharing_data_mutex.cc*</summary>
<div class="language-shell highlighter-rouge"><pre class="highlight"><code class="hljs ruby"><span class="nb" style="font-size: 80%">#include &lt;iostream&gt;
#include &lt;thread&gt;
#include &lt;mutex&gt;
using namespace std;
// mutex used to lock other threads from gaining access to shared resource
mutex m_mutex;
// shared print function for cout
void shared_print(char c, int v) {
        m_mutex.lock(); // locks other threads from using resource, uncomment to see ipc sequence complications
        cout &lt;&lt; c &lt;&lt; " "&lt;&lt; v &lt;&lt; "\n";
        m_mutex.unlock(); // unlocks resource so that another thread can have access, uncomment to see ipc sequence complications
}
// function for sequence
void foo(char d, int a) {
        for (int i = 1; i &lt;= a; i++) {
                shared_print(d, i);
        }
}
int main()
{
        thread th2(foo, 'A', 2); // child thread - 1
        thread th3(foo, 'B', 2); // child thread - 2
        thread th4(foo, 'C', 2); // child thread - 3
        th2.join(); // main thread, waits for child to finish
        th3.join(); // main thread, waits for child to finish
        th4.join(); // main thread, waits for child to finish
        return 0;
}</span></code></pre></div></details>

Print statement:
```
$ g++ -std=c++14   sharing_data_mutex .cc  -o sharing_data_mutex
$ ./sharing_data_mutex
A 1
A 2
B 1
B 2
C 1
C 2
```

The std::mutex class provides a basic mutual exclusion and synchronization facility for threads that can be used to protect shared print function. Prior to accessing the data protected by the mutex, the mutex must be locked by calling lock(). Only one thread may hold the lock at a time, so if another thread also tries to lock the mutex, it will fail as appropriate. Once a thread is done accessing the shared print function, it then must call unlock() to release the lock and allow other threads to acquire it.

## Bank Transaction ##

The classic example for a race condition and a data race is a function that transfer money from one account to another. The belowing examples would show several conditions when transferring money from one account to another.

### Transfering Money with Single-thread ###

In the single-threaded case, each account starts with a balance $100. To withdraw money, there must be enough money in account. If enough money is availabile the amount will be at first removed from the old account and then added to the new one. Two money transfers take place. Each invocation of transferMoney happens after the other. They are a kind of translation that establishes a total order.

<details markdown=block>
<summary markdown=span>*single_threading.cc*</summary>
<div class="language-shell highlighter-rouge"><pre class="highlight"><code class="hljs ruby"><span class="nb" style="font-size: 80%">#include &lt;iostream&gt;
struct Account {
    /* data */
    int balance = 100;
};
void transferMoney(int amount, Account& from, Account& to)
{
    if(from.balance >= amount) {
        from.balance -= amount;
        to.balance += amount;
    }
}
int main(int argc, char *argv[])
{
    Account account1;
    Account account2;
    transferMoney(50, account1, account2);
    transferMoney(120, account2, account1);
    std::cout &lt;&lt; "account1.balance " &lt;&lt; account1.balance &lt;&lt; std::endl;
    std::cout &lt;&lt; "account2.balance " &lt;&lt; account2.balance &lt;&lt; std::endl;
}</span></code></pre></div></details>

The balance of both accounts after withdrawing money:

```
$ g++ -std=c++14 single_threading.cc -o single_threading
$ ./single_threading
account1.balance 170
account2.balance 30
```

### Transfering Money with Multithreading ###

In the multithreading case, the calls of transferMoney will be executed concurrenyly. Because of the thread t1 and t2, there is a data race on the balance of the account in the functio transferMoney. In order to make the race condition visible, putting the threads for a short period to sleep. A short sleep in concurrent program is sufficient to make an issue visible.

<details markdown=block>
<summary markdown=span>*multithreading.cc*</summary>
<div class="language-shell highlighter-rouge"><pre class="highlight"><code class="hljs ruby"><span class="nb" style="font-size: 80%">#include &lt;iostream&gt;
#include &lt;thread&gt;
#include &lt;chrono&gt;
struct Account {
    /* data */
    int balance = 100;
};
void transferMoney(int amount, Account& from, Account& to)
{
    using namespace std::chrono_literals;
    if(from.balance &gt;= amount) {
        from.balance -= amount;
        std::this_thread::sleep_for(1ns); // execute concurrently
        to.balance += amount;
    }
}
int main(int argc, char *argv[])
{
    Account account1;
    Account account2;
    std::thread t1(transferMoney, 50, std::ref(account1), std::ref(account2));
    std::thread::id t1_id = t1.get_id();
    std::thread t2(transferMoney, 120, std::ref(account2), std::ref(account1));
    std::thread::id t2_id = t2.get_id();
    t1.join();
    t2.join();
    std::cout &lt;&lt; "Thread ID: " &lt;&lt; t1_id &lt;&lt; " account1.balance " &lt;&lt; account1.balance &lt;&lt; std::endl;
    std::cout &lt;&lt; "Thread ID: "&lt;&lt; t2_id &lt;&lt;" account2.balance " &lt;&lt; account2.balance &lt;&lt; std::endl;
}</span></code></pre></div></details>

The balance of both account in concurrent program: 
```
$ g++ -std=c++14   multithreading.cc  -o multithreading
$ ./multithreading
Thread ID: 0x700008718000 account1.balance 50
Thread ID: 0x70000879b000 account2.balance 150
```

## Reference ##

+ [C++ Concurrency In Action](https://www.amazon.com/C-Concurrency-Action-Practical-Multithreading/dp/1933988770)

[multithread]:https://en.wikipedia.org/wiki/Multithreading_(computer_architecture) "https://en.wikipedia.org/wiki/Multithreading_(computer_architecture)"

[race]:https://en.wikipedia.org/wiki/Race_condition "https://en.wikipedia.org/wiki/Race_condition"
