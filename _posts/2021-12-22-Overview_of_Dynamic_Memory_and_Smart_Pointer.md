---
layout: post
title:   "Overview of Dynamic Memory and Smart Pointer"
date:    2021-12-22
tags:    [C_C_plus_plus]
---

## Abstract ##
The C++ language allows programmers to manually allocate/decallocate memory by static allocation or dynamic allocation. The static memory is allocated from the stack and used for local static objects, for class static data members and for variables defined outside any function. The dynamic memory is allocated from the free store or heap and its allocation with new and delete. However, dynamically allocated memory is notoriously tricky to manage correctly because it is surprisingly hard to ensure to either free memory at the right run1time, known as memory leak, or free the memory when there are still pointers referring to that memory. There is a way to avoid memory leak or manage dynamic allocation smartly by using smart pointer - unique_ptr. In this post, I would like to disscuss the basic concept of smart pointer std::unique_ptr, std::shared_ptr and std::weak_ptr.

## Smart Pointers ##
Smart pointers is nice for when dynamic allocation is necessary. Since any dynamic memory requires a delete, it's much easier, much safer, and much less error prone to let the smart pointer take care of the cleanup, rather than doing it manually. The C++ 11 library defines three kinds of smart pointers that differ in how they manage their underlying pointers:
<h6><ol>
    <li><a href="#unique_ptr">std::unique_ptr</a></li>
    <li><a href="#shared_ptr">std::shared_ptr</a></li>
    <li><a href="#weak_ptr">std::weak_ptr</a></li>
</ol></h6>

###  <a name="unique_ptr">std::unique_ptr class</a> ###
The uses of smart pointer unique_ptr include providing exception safety for dynamically allocated memory, passing ownership of dynamically allocated memory to a function, and returning dynamically allocated memory from a function. The unique_ptr implementation could be referred from C++ STL library or boost C++ library.

CASE STUDY: unique_ptr.hpp in Boost C++ library
<div class="language-shell highlighter-rouge"><pre class="highlight"><code class="hljs ruby"><span class="nb" style="font-size: 80%">namespace movelib {
...
//! \tparam T Provides the type of the stored pointer.
//! \tparam D The deleter type:
//!   -  The default type for the template parameter D is default_delete. A client-supplied template argument D shall be a function object type, ...
...
template &lt;class T, class D = default_delete&lt;T&gt; &gt;
class unique_ptr
{
    #if defined(BOOST_MOVE_DOXYGEN_INVOKED)
    public:
    unique_ptr(const unique_ptr&) = delete;
    ...
    private:
    ...
    public: 
    ~unique_ptr()
    {  if(m_data.m_p) m_data.deleter()(m_data.m_p);   }
    ...
    void swap(unique_ptr& u) BOOST_NOEXCEPT 
    {
        ::boost::adl_move_swap(m_data.m_p, u.m_data.m_p);
        ::boost::adl_move_swap(m_data.deleter(), u.m_data.deleter());
    }
    ...
};
...</span></code></pre></div>

Note: Function template
<ul>
 <li>The format for declaring function template with type parameters is: <br> template &lt;class identifier&gt; function_declaration; <br> template &lt;typename identifier&gt; function_declaration; </li>
 <li>A template parameter is a special kind of parameter that can be used to pass a type as argument.</li>
</ul>

#### Simple Examples ####

<ol>
 <li>Assigning static allocation into dynamic allocation (C++11)</li>
<div class="language-shell highlighter-rouge"><pre class="highlight"><code class="hljs ruby"><span class="nb" style="font-size: 80%">void Exam::SmartPointer() { 
      constexpr int SIZE = 8; 
      static const char chars[] = { 'B', 'e', 'S', 'm', 'a', 'r', 't', '!'  };
      std::unique_ptr<char[]> arr(new char[SIZE]); 
      for(int i = 0; i < SIZE; ++i) {
          arr[i] = chars[i];
          std::cout << arr[i] << "; ";
      }
      std::cout << std::endl;
}</span></code></pre></div>
 <li>Using make_unique for initializing unique_ptr (C++14)</li>
<div class="language-shell highlighter-rouge"><pre class="highlight"><code class="hljs ruby"><span class="nb" style="font-size: 80%">struct Vec3
{
    int x, y, z;
    Vec3(): x(0), y(0), z(0) {}
    Vec3(int x, int y, int z): x(x), y(y), z(z) {} 
    friend std::ostream& operator<<(std::ostream& os, Vec3& v) {   
        return os << '{' << "x:" << v.x << " y:" << v.y << " z:" << v.z  << '}';  
    }
};

void Exam::SmartPointerMakeUnique() {
    // Use the default constructor.
    std::unique_ptr&lt;Vec3&gt; v1 = std::make_unique&lt;Vec3&gt;();
    // Use the constructor that matches these arguments
    std::unique_ptr&lt;Vec3&gt; v2 = std::make_unique&lt;Vec3&gt;(0, 1, 2);
    // Create a unique_ptr to an array of 5 elements
    std::unique_ptr&lt;Vec3[]&gt; v3 = std::make_unique&lt;Vec3[]&gt;(5);

    std::cout << "V1 make_unique&lt;Vec3&gt;():      " << *v1 << '\n'
              << "V2 make_unique&lt;Vec3&gt;(0,1,2): " << *v2 << '\n'
              << "V3 make_unique&lt;Vec3[]&gt;(5):   " << '\n';
    for (int i = 0; i < 5; i++) {
        std::cout << "     " << v3[i] << '\n';
    }
}</span></code></pre></div>
</ol>

### <a name="shared_ptr">std::shared_ptr class</a> ###

The smart pointer std::shared_ptr stored a pointer to a dynamically allocated object and the object pointed to is guaranteed to be deleted when the last shared_ptr pointing to it is destroyed or reset. In addition to reset the dynamical allocation, cycles of shared_ptr instances will not be reclaimed because the implementation uses reference counting. For example, if main() holds a shared_ptr to A, which directly or indirectly holds a shared_ptr back to A, A's use count will be 2. Destruction of the original shared_ptr will leave A dangling with a use count of 1.

CASE STUDY: shared_ptr.hpp in Boost C++ library
<div class="language-shell highlighter-rouge"><pre class="highlight"><code class="hljs ruby"><span class="nb" style="font-size: 80%">// /usr/local/Cellar/boost/1.76.0/include/boost/interprocess/smart_ptr/shared_ptr.hpp
...
namespace boost{
namespace interprocess{
...
//!shared_ptr is parameterized on 
//!T (the type of the object pointed to), VoidAllocator (the void allocator to be used
//!to allocate the auxiliary data) and Deleter (the deleter whose
//!operator() will be used to delete the object.
...
template<class T, class VoidAllocator, class Deleter>
class shared_ptr
{
    #if !defined(BOOST_INTERPROCESS_DOXYGEN_INVOKED)
    private:
    typedef shared_ptr<T, VoidAllocator, Deleter> this_type;
    #endif   //#ifndef BOOST_INTERPROCESS_DOXYGEN_INVOKED
...
    public:
    //!Constructs an empty shared_ptr.
    //!Use_count() == 0 && get()== 0.
    shared_ptr()
        :  m_pn() // never throws
    {}
    ...
    //!Returns the number of shared_ptr objects, *this included,
    //!that share ownership with *this, or an unspecified nonnegative
    //!value when *this is empty.
    ...
    long use_count() const // never throws
    {  return m_pn.use_count();  }
    ...
}
...</span></code></pre></div>

#### Simple Example ####

Assigning value, pair value and object into dynamic allocation (C++11)

<div class="language-shell highlighter-rouge"><pre class="highlight"><code class="hljs ruby"><span class="nb" style="font-size: 80%">struct Base
{
Base() { std::cout &lt;&lt; " Base::Base() \n" &lt;&lt; std::endl;};
virtual ~Base() { std::cout &lt;&lt; "Base::~Base()" &lt;&lt; std::endl;};
};

struct Drived : public Base
{
Drived() { std::cout &lt;&lt; " Drived::Drived() \n" &lt;&lt; std::endl;};
virtual ~Drived() { std::cout &lt;&lt; "Drived::~Drived()" &lt;&lt; std::endl;};  
};

void Exam::SmartPointerSharedPtr() {
   std::shared_ptr&lt;int&gt; v1 = std::make_shared&lt;int&gt; (10);
   std::shared_ptr&lt; std::pair&lt;int,int&gt; &gt; v2 = std::make_shared&lt; std::pair&lt;int, int&gt; &gt; (20, 30);
   std::shared_ptr&lt;Base&gt; p = std::make_shared&lt;Drived&gt;();

   std::cout &lt;&lt; "std::make_shared&lt;int&gt; (10): " &lt;&lt; *v1 &lt;&lt; std::endl;

   std::cout &lt;&lt; "std::make_shared&lt; std::pair&lt;int, int&gt; &gt; (20, 30): "&lt;&lt; "(" &lt;&lt; v2-&gt;first &lt;&lt; ","&lt;&lt; v2-&gt;second &lt;&lt; ")" &lt;&lt; std::endl;
   std::cout &lt;&lt; "Drived object's use Count: " &lt;&lt; p.use_count() &lt;&lt; std::endl;
}</span></code></pre></div>

### <a name="weak_ptr">std::weak_ptr class</a> ###

The smart pointer weak_ptr stores a "weak reference" to an object that's already managed by shared_ptr. To access the object, a weak_ptr can be converted to a shared_ptr using the shared_ptr constructor or the member function lock.

By referring to [stack overfolw][stack] question, we could know that the uses of smart pointer weak_ptr is a very good way to solve the [dangling pointer problem][dangling]. By just using raw pointers it is impossible to know if the referenced data has been deallovated or not.

<div class="language-shell highlighter-rouge"><pre class="highlight"><code class="hljs ruby"><span class="nb" style="font-size: 80%">// /usr/local/Cellar/boost/1.76.0/include/boost/interprocess/smart_ptr/weak_ptr.hpp
...
namespace boost{
namespace interprocess{
...
//!The class template is parameterized on T, the type of the object pointed to.
template<class T, class A, class D>
class weak_ptr
{
    #if !defined(BOOST_INTERPROCESS_DOXYGEN_INVOKED)
    private:
    // Borland 5.5.1 specific workarounds
    typedef weak_ptr<T, A, D> this_type;
    ...
    public:
    ...
    //!Effects: Constructs an empty weak_ptr.
    //!Postconditions: use_count() == 0.
    weak_ptr()
    : m_pn() // never throws
    {}
...
};
...</span></code></pre></div>

#### Simple Example ####

<div class="language-shell highlighter-rouge"><pre class="highlight"><code class="hljs ruby"><span class="nb">void Exam::SmartPointerWeakPtr() {
    std::shared_ptr&lt;int&gt; sp1 (new int(10));
    std::shared_ptr&lt;int&gt; sp2 (new int(20));

    std::weak_ptr&lt;int&gt; wp1(sp1);
    std::weak_ptr&lt;int&gt; wp2(sp2);

    wp1.swap(wp2);

    std::cout &lt;&lt; "sp1 -&gt; " &lt;&lt; *sp1 &lt;&lt; '\n';
    std::cout &lt;&lt; "sp2 -&gt; " &lt;&lt; *sp2 &lt;&lt; '\n';
    std::cout &lt;&lt; "wp1 -&gt; " &lt;&lt; *wp1.lock() &lt;&lt; '\n';
    std::cout &lt;&lt; "wp2 -&gt; " &lt;&lt; *wp2.lock() &lt;&lt; '\n';
}</span></code></pre></div>

## Reference ##

[1] [Smart Pointers — unique_ptr, shared_ptr, weak_ptr](https://blog.heron.me/smart-pointers-unique-ptr-shared-ptr-weak-ptr-f1ca97cf5ba6)

[2] [C++ Primer (5th Edition)](https://www.amazon.com/Primer-5th-Stanley-B-Lippman/dp/0321714113)

[3] cppreference: [std::unique_ptr](https://www.cplusplus.com/reference/memory/unique_ptr/?kw=unique_ptr), [std::shared_ptr](https://www.cplusplus.com/reference/memory/shared_ptr/?kw=shared_ptr), [std::weak_ptr](https://www.cplusplus.com/reference/memory/weak_ptr/?kw=weak_ptr), [std::make_unique](https://en.cppreference.com/w/cpp/memory/unique_ptr/make_unique)

[stack]:https://stackoverflow.com/questions/12030650/when-is-stdweak-ptr-useful "https://stackoverflow.com/questions/12030650/when-is-stdweak-ptr-useful"

[dangling]:https://en.wikipedia.org/wiki/Dangling_pointer "https://en.wikipedia.org/wiki/Dangling_pointer"

<p>**Thanks for reading! Feel free to leave the comments below or <a href="mailto:qazqazqaz850@gmail.com">email</a> to me. Any pieces of advice or discussions are always welcome. :)**</p>
