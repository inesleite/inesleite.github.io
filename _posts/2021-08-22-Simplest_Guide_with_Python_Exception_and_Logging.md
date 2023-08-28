---
layout: post
title:   "Introduction of Python Exception, Logging and Error Handling"
date:    2021-08-20
tags:    [Programming, Python]
---

## Introduction ##
Working on a large project is challenging on many fronts. One of those challenges is to make sure the logs are relaying all relevant information for the project that could help with debugging issues and failure. Even if you write clear and readable code, even if you are familiar with your code, even if you cover your code with tests, weird bugs or runtime failures will inevitably appear and you will need to handle them in some way. Python's built-in exceptions module and built-in logging module can be used to test an exception handler, report an error condition or troubleshoot any bugs.

In this short tutorial, I would sort out some basic guide with exception handling and logging setup. Also, describe how to use the exception and logging modules.

## Error Handling ##
In programming, error handling is the process of responding to the occurrence of exceptions, anomalous conditions requiring special processing, during the execution of a program. In other words, it is the process comprised of anticipation, detection, and resolution of application errors or programming errors. Under the handling process for the program, your code would be more robust, which guards against potential failures that would cause your program to exit.

### Exception Handling ###
In python, built-in exceptions module supports to handles any exceptions. The syntax is a try statement with an except clause. User can use this to test an exception handler or to report and error condition "just like" the situation; but be aware that there is nothing to prevent user code from raising an inappropriate error. More information on defining exception is available in the python tutorial under [User-defined Exceptions][userdefinedexceptios]. The following exceptions are the exceptions that are usually raised:
<font size="3" face="Courier New">
<table>
 <tr>
  <th>Error Types</th>
  <th>Descriptions</th>
 </tr>
 <tr>
  <td>AttributeError</td>
  <td>Raised when an attribute reference or assignment fails.</td>
  <td></td>
 </tr>
 <tr>
  <td>AssertionError</td>
  <td>Raised when an assert statement fails.</td>
 </tr>
 <tr>
  <td>EOFError</td>
  <td>Raised when the input() function hits an end-of-fine condition (EOF) without reading any data.</td>
 </tr>
 <tr>
  <td>KeyError</td>
  <td>Raised when a mapping(dictionary) key is not found in the set of existing keys</td>
 </tr>
 <tr>
  <td>OverflowError</td>
  <td>Raised when the result of an arithmetric operation is too large to be represented. This cannot occur for integers.</td>
 </tr>
 <tr>
  <td>SyntaxError</td>
  <td>Raised when the parser encounters a syntax error. This may occur in an import statement, in a call to the built-in functions compile(), exec(), or eval(), when reading the initial script or standard input.</td>
 </tr>
 <tr>
  <td>NameError</td>
  <td>Raised when a local or global name is not found. This applies only to unqualified names. The associated value is an error message that includes the name that could not be found.</td>
 </tr>
</table>
</font>

You could find and learn more information from [Built-in Exceptions][buildinexception]

### Example of Exception Handling ###

Here, you could go throught some examples of above exceptions and might be more familiar with how to use them 

<h4><a name="TableContent"></a> List of examples</h4>
<h6><ol>
    <li><a href="#assertion">AssertionError</a></li>
    <li><a href="#attributeandkey">AttributeError and KeyError</a></li>
    <li><a href="#overflow">OverflowError</a></li>
</ol></h6>

#### <a name="assertion">A simple example of AssertionError exception</a> ####
<details markdown=block>
<summary markdown=span>*assertionError.py*</summary>
<div class="language-shell highlighter-rouge"><pre class="highlight"><code class="hljs ruby"><span class="nb" style="font-size: 80%">import math
def QuadraticFormula(a, b, c):
    try:
        assert a != 0, "Not a quadratic equation as coefficient of x ^ 2 can't be 0"
        D = (b * b - 4*a*c)
        assert D>= 0, "Roots are imaginary"
        r1 = (-b + math.sqrt(D))/(2*a)
        r2 = (-b - math.sqrt(D))/(2*a)
        print("Roots of the quadratic equation are :", r1, "", r2)
    except AssertionError as msg:
        print(msg)

if __name__ == "__main__":
    QuadraticFormula(0, 5, -6)
    QuadraticFormula(1, 1, 6)
    QuadraticFormula(2, 12, 18)</span></code></pre></div></details>

<details markdown=block>
<summary markdown=span>*print statement*</summary>
<div class="language-shell highlighter-rouge"><pre class="highlight"><code class="hljs ruby"><span class="nb" style="font-size: 80%">Not a quadratic equation as coefficient of x ^ 2 can't be 0
Roots are imaginary
('Roots of the quadratic equation are :', -3.0, '', -3.0)</span></code></pre></div></details>

#### <a name="attributeandkey">A simple example of AttributeError and KeyError exceptions</a> ####
<details markdown=block>
<summary markdown=span>*attributeError.py*</summary>
<div class="language-shell highlighter-rouge"><pre class="highlight"><code class="hljs ruby"><span class="nb" style="font-size: 80%">import warnings
class Person:
    def __init__(self, age, gender, name):
        self.age = age
        self.gender = gender
        self.name = name

if __name__ == "__main__":
    louis = Person(20, "male", "Louis")

    try:
        print('Name: %r' %louis.name)
        print('Age: %r' %louis.age)
        print('Marital Status: %r' %louis.married)
    except AttributeError:
        warnings.warn(message='We dont know yet', category=UserWarning, stacklevel=2)

    ageMap = dict()
    ageMap = {'Louis': louis.age, "Peter": peter.age}

    person = 'Kevin'
    try:
        print("%r's is %r yeard old." %(person, ageMap[person]))
    except KeyError:
        warnings.warn(message="%r's age is unknown." %person, category=UserWarning, stacklevel=2)</span></code></pre></div></details>

<details markdown=block>
<summary markdown=span>*warning statement*</summary>
<div class="language-shell highlighter-rouge"><pre class="highlight"><code class="hljs ruby"><span class="nb" style="font-size: 80%">Name: 'Louis'
Age: 20
sys:1: UserWarning: We dont know yet
sys:1: UserWarning: 'Kevin''s age is unknown.</span></code></pre></div></details>

#### <a name="overflow">A simple example of OverflowError exception</a> ####
<details markdown=block>
<summary markdown=span>*overflowError.py*</summary>
<div class="language-shell highlighter-rouge"><pre class="highlight"><code class="hljs ruby"><span class="nb" style="font-size: 80%">if __name__ == "__main__":
    # OverflowError
    try:
        f = 3.0*1
        for i in range(100):
            f = f **2
    except OverflowError as err:
        print ('Overflow after %r' %f, err)</span></code></pre></div></details>

<details markdown=block>
<summary markdown=span>*print statement*</summary>
<div class="language-shell highlighter-rouge"><pre class="highlight"><code class="hljs ruby"><span class="nb" style="font-size: 80%">('Overflow after 1.9323349832288915e+244', OverflowError(34, 'Result too large'))</span></code></pre></div></details>

### Logging Setup ###
In python, logging module supports to add logging calls to their code to indicate that certain events have occurred. An event is described by a descriptive message which can optionally contain variable data. By logging usefal data from the right places, you can not only debug errors easily but also use the data to analyze the performance of the application. You could find and learn more information from [Logging HOWTO][logginghowto] or [Logging facility for Python][loggingfacility]. The following functions are the logging tools that provided by logging system:
<font size="3" face="Courier New">
<table>
 <tr>
  <th>Tool</th>
  <th>When to perform</th>
 </tr>
 <tr>
  <td>logging.basicConfig(**kwargs)</td>
  <td>Does basic configuration for the logging system.</td>
 </tr>
 <tr>
  <td>logging.info(*args, **kwargs) or logging.debug(*arg, **kwargs)</td>
  <td>Report events that occur during normal operation of a program.</td>
 </tr>
 <tr>
  <td>logging.warning(msg, *args, **kwargs)</td>
  <td>Issue a warning regarding a particular runtime event</td>
 </tr>
 <tr>
  <td>logging.error(msg, *args, **kwargs), logging.exception(msg, *args, **kwargs) or logging.critical(msg, *args, **kwargs)</td>
  <td>Report suppression of an error without raising an exception (e.g. error handler in a long-running server process)</td>
 </tr>
 <tr>
  <td>logging.getLogger(name=None)</td>
  <td>Report a logger with the specified name or, if name is None.</td>
 </tr>
 <tr>
  <td>logging.setLevel(level)</td>
  <td>Sets the threshold for logging messages.</td>
 </tr>
</table>
</font>

Note that the msg is message format string and the args is the arguments which are merged into msg using the string formatting operator. More information on defining keyword arguments are available in the [logging.debug][loggingdebug] and [logging.basicConfig][loggingbasicconfig] tutorials.

The logging facility for python supports six fundamental logging level are given in the following table. You might use logging.setLevel() or set the root logger level to the specified level by keyword argument of logging.basicConfig to handle logging messages. The numeric values of logging levels are given in the following table.
<font size="3" face="Courier New">
<table>
 <tr>
  <th>Level</th>
  <th>Numeric Value</th>
 </tr>
 <tr>
  <td>CRITICAL</td>
  <td>50</td>
 </tr>
 <tr>
  <td>ERROR</td>
  <td>40</td>
 </tr>
 <tr>
  <td>WARNING</td>
  <td>30</td>
 </tr>
 <tr>
  <td>INFO</td>
  <td>20</td>
 </tr>
 <tr>
  <td>DEBUG</td>
  <td>10</td>
 </tr>
 <tr>
  <td>NOTEST</td>
  <td>0</td>
 </tr>
</table>
</font>

### Example of Logging Tracking Events ###
Here, you could go throught some examples of above logging system and might basically understand how to use them 

<details markdown=block>
<summary markdown=span>*overflowError.py*</summary>
<div class="language-shell highlighter-rouge"><pre class="highlight"><code class="hljs ruby"><span class="nb" style="font-size: 80%">import logging

if __name__ == "__main__":
    logging.basicConfig(filename='test.log', filemode='w+',
                        format='%(asctime)s %(filename)s: %(message)s', 
                        level=logging.DEBUG)

    logging.debug('This is a debug message')
    logging.info('This is an info message')
    logging.warning('This is a warning message')
    logging.error('This is an error message')
    logging.critical('This is a critical message')
    ...
    person = 'Kevin'
    try:
        print("%r's is %r yeard old." %(person, ageMap[person]))
    except KeyError:
        logging.exception("Exception occurred", exc_info=True)
        warnings.warn(message="%r's age is unknown." %person, category=UserWarning, stacklevel=2)
</span></code></pre></div></details>

## Conculsion ##
Python logging and exception are simple and well standardized, due to its powerful framework built into the standard library. Practical Programming with logging and exception handling might greatly simplify the entire handling process.

## Reference ##

[1] [Built-in Exceptions](https://docs.python.org/3/library/exceptions.html)

[2] [logging — Logging facility for Python](https://docs.python.org/3/library/logging.html?highlight=logging#module-logging)

[3] [Errors and Exceptions](https://docs.python.org/3/tutorial/errors.html)

[4] [Exception handling](https://en.wikipedia.org/wiki/Exception_handling)

[5] [Python Logging – Simplest Guide with Full Code and Examples](https://www.machinelearningplus.com/python/python-logging-guide/)

[6] [PyMOTW: exceptions – Built-in error classes](https://pymotw.com/2/exceptions/#module-exceptions)

[userdefinedexceptios]:https://docs.python.org/3.9/tutorial/errors.html#tut-userexceptions

[logginghowto]:https://docs.python.org/3/howto/logging.html#logging-howto "https://docs.python.org/3/howto/logging.html#logging-howto"

[loggingfacility]:https://docs.python.org/3/library/logging.html "https://docs.python.org/3/library/logging.html"

[buildinexception]:https://docs.python.org/3.9/library/exceptions.html?highlight=attributeerror#base-classes "https://docs.python.org/3.9/library/exceptions.html?highlight=attributeerror#base-classes"

[loggingbasicconfig]:https://docs.python.org/3/library/logging.html#logging.basicConfig "https://docs.python.org/3/library/logging.html#logging.basicConfig"

[loggingdebug]:https://docs.python.org/3/library/logging.html#logging.debug "https://docs.python.org/3/library/logging.html#logging.debug"

<p>Feel free to leave the comments below or <a href="mailto:qazqazqaz850@gmail.com">email</a> to me. Any pieces of advice are always welcome. :)
