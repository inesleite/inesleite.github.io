---
layout: post
title: "How to Document Python Code by Using Sphinx"
date: 2022-05-08
tags: [Programming, Python]
---
[UPDATED: 2022/07/11]

## Purpose ##

Previously, during the project development, I usually only put some brief comments in the Python functions or methods. However, since Python does not enforce function and variable type annotations, and those comments would not usually contain the typing information, It might hardly remember how those variables could be used. In addition, it is importance for the code documenting: Good code is not only self-explanatory but also well-documented. In order to quickly recap the code or projects, Sphinx can automatically makes it easy to create intelligent documentation. It was originally created for the Python documentation, and it has excellent facilities for the documentation of software projects in a range of languages, for example: [Python 3.7.13 documentation][python37] was created using Sphinx 2.3.1.

In this blog post, as the a Sphinx beginner, I am going to make some notes and practice how to use reStructuredText and Sphinx v4.2.0 in my lite python project after reading or watching the relevant blogs or videos.

## Python Documentation by Using Sphinx ##

The practicing Python documentation code could be found in [Sphinx Python Practice][practice] on my GitHub. The documentation corresponding to this practice is available at [Documentation][documentation] and looks like this:

<figure><center><img src="{{ site.baseurl }}/picture/documentation.png" width="100%"></center></figure>

#### Install Sphinx ####

At the begining, we need to know how to install sphinx. The convenient and safe way to install sphinx is by using PyPI on Linux or MacOS. Please run this command:
```
$ pip install -U sphinx
```

After installing Sphinx packages, you can find out your Sphinx version:
```
$ sphinx-build --version
sphinx-build 4.2.0
```

For more details, [Installing Sphinx][install] is available to read more description.

#### Configuration ####

Sphinx documentation builder supports to customize the documented project’s name, extensions coming with Sphinx, the language the docs are written in and the theme that the HTML output should use, etc. So you could configure Sphinx within the conf file, named conf.py.   

From the conf.py snippet, you can see that Sphinx provides a number of extension module.
```
# -- General configuration ---------------------------------------------------

# Add any Sphinx extension module names here, as strings. They can be
# extensions coming with Sphinx (named 'sphinx.ext.*') or your custom
# ones.
extensions = [
    'sphinx.ext.autodoc',
    'sphinx.ext.doctest',
    'sphinx.ext.mathjax',
    'sphinx.ext.viewcode',
]
```

Also, you can set your own html theme by adding the following to conf.py:

```
html_theme = 'alabaster'
```

For more details, [configuration][conf] contains (almost) all configuration needed to customize Sphinx input and output behavior.

#### Documentation from Docstrings ####

Since Sphinx could automatically generate documentations (PDF, HTML) for all the modules, classes, and functions that follow its supported docstring format, we are encouraged to document the Python program more comprehensively. For this to work, the docstrings must of course be written in correct reStructuredText. You can then use all of the usual Sphinx markup,  in the docstrings, and it will end up correctly in the documentation. 

For example:
```
The leetcode API Reference
=============================

.. automodule:: leetcode
    :members:

The "mocktest" module
----------------------

.. automodule:: leetcode.mocktest
    :members:
    :member-order: bysource

The "solution" module
----------------------

.. automodule:: leetcode.impl.solution
    :members:  
```

For more details, [documentation from docstrings][docstrings] contains description of how to import the modules you are documenting, and pull in documentation from docstrings in a semi-automatic way. That means that the module or the package must be in one of the directories on sys.path.

Now, you can automatically generate the intelligent documentation by using Sphinx v4.2.0. Learning Sphinx and reStructuredText is not easy. Hope this post can be helpful for you and save your time. :)

=========== To be continued…. ==========

## Reference ##

+ [Practice Sphinx Python Documentation](https://github.com/s311354/Sphinx-Python-Practice)
+ [Sphinx Python Documentation Generator](https://www.sphinx-doc.org/en/master/)
+ [Documenting Your Project in Sphinx](https://www.youtube.com/watch?v=QNHM7q2hLh8)
+ [Python Documentation Using Sphinx](https://leimao.github.io/blog/Python-Documentation-Using-Sphinx/)
+ [reStructuredText Markup Specification](https://docutils.sourceforge.io/docs/ref/rst/restructuredtext.html)
+ [Read the Docs - Configuration File V2](https://docs.readthedocs.io/en/stable/config-file/v2.html)

[python37]:https://docs.python.org/3.7/ "https://docs.python.org/3.7/"
[install]:https://www.sphinx-doc.org/en/master/usage/installation.html "https://www.sphinx-doc.org/en/master/usage/installation.html"
[practice]:https://github.com/s311354/Sphinx-Python-Practice "https://github.com/s311354/Sphinx-Python-Practice"
[documentation]:https://sphinx-python-practice.readthedocs.io/en/latest/ "https://sphinx-python-practice.readthedocs.io/en/latest/"
[conf]:https://www.sphinx-doc.org/en/master/usage/configuration.html "https://www.sphinx-doc.org/en/master/usage/configuration.html"
[docstrings]:https://www.sphinx-doc.org/en/master/usage/extensions/autodoc.html "https://www.sphinx-doc.org/en/master/usage/extensions/autodoc.html"

<p>Thanks for reading! Feel free to leave the comments below or <a href="mailto:qazqazqaz850@gmail.com">email</a> to me. Any pieces of advice or discussions are always welcome. :)</p>
