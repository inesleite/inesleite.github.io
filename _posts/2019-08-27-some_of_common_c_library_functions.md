---
layout: post
title: Some of Common C library functions
tags: [C_C_plus_plus] 
---

## fread, fseek and ftell functions

### fread function
This function is used for reading data from the given file pointer into the array pointer.

Usage:
<div class="language-shell highlighter-rouge"><pre class="highlight" style="font-size:12px"><code class="hljs ruby"><span class="nb">size_t fread(void *arr_ptr, size_t size, size_t element, FILE *file)</span></code></pre></div>

### fseek function
This function is used for setting the position of the file pointer to the given offset. 

Usage:
<div class="language-shell highlighter-rouge"><pre class="highlight" style="font-size:12px"><code class="hljs ruby"><span class="nb">int fseek(FILE *file, long int offset, int position)</span></code></pre></div>

The position is specified by the following constants:
<h6><ol>
    <li>SEEK_END: End of file</li>  
    <li>SEEK_SET: Starting of file</li>
    <li>SEEK_CUR: Current position of file pointer</li>
</ol></h6>

### ftell function
This function is used for returnning the current position of the given file pointer.  

Usage:
<div class="language-shell highlighter-rouge"><pre class="highlight" style="font-size:12px"><code class="hljs ruby"><span class="nb">long int ftell(FILE *file)</span></code></pre></div>

### Example:
<div class="language-shell highlighter-rouge"><pre class="highlight" style="font-size:12px"><code class="hljs ruby"><span class="nb">int main(int argc, char **argv) {
  FILE *fp_in = NULL;
  char data[100];
  long int position;

  char *filename = "data.txt";

  fp_in = fopen(filename, "rb");

  // Read data chunk
  fread(data, 1, 100, fp_in);

  // Read the position of pointer
  position = ftell(fp_in);
  printf("the position of pointer = %d \n", position);

  fseek(fp_in, 10, SEEK_CUR);    // shift 10 bytes

  // Read the position of pointer
  position = ftell(fp_in);
  printf("the position of pointer after shifting= %d \n", position);

  return 0;
}</span></code></pre></div>

Result:
<div class="language-shell highlighter-rouge"><pre class="highlight" style="font-size:12px"><code class="hljs ruby"><span class="nb">the position of pointer = 100 
the position of pointer after shifting= 110</span></code></pre></div>


=========== To be continued.... ==========

## Reference
[1] [C library function - fseek](https://www.tutorialspoint.com/c_standard_library/c_function_fseek.htm)

[2] [C library function - fread](https://www.tutorialspoint.com/c_standard_library/c_function_fread.htm)

[3] [C library function - ftell](https://www.tutorialspoint.com/c_standard_library/c_function_ftell.htm)

## Note
<p>If you have any constructive criticism or advises, leave the comments below or feel free to email me @qazqazqaz850@gmail.com.

Hope this post will help! :)
</p>
