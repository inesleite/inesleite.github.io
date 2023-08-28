---
layout: post
title: A Brief Introduction to Some of Common MATLAB Syntaxes and Usages
tags: [Matlab]
---

## Purpose
When designing on the algorithm implementation, the matlab script is one of the common programming languages to develope in the initial stage.

In this post, I recorded a few pieces of information in this post for avoiding to forget bit and pieces and will keep adding some informations.

## Read data from text file
The fscanf is the common syntax to read data from text file.

Usage:
<div class="language-shell highlighter-rouge"><pre class="highlight" style="font-size:12px"><code class="hljs ruby"><span class="nb">data = fscanf(filename, formatSpec)</span></code></pre></div>

#### Example: 
<div class="language-shell highlighter-rouge"><pre class="highlight" style="font-size:12px"><code class="hljs ruby"><span class="nb">filename = 'data.txt';
file = fopen(filename,'rt');
data = fscanf(file, '%x');
fclose(file)</span></code></pre></div>

## Write data to text file
The fprint is the common syntax to write formatted data to file.

Usage:
<div class="language-shell highlighter-rouge"><pre class="highlight" style="font-size:12px"><code class="hljs ruby"><span class="nb">fprintf(file_name, format, A1)</span></code></pre></div>

#### Example: Write 32 bits Data to Text File
<div class="language-shell highlighter-rouge"><pre class="highlight" style="font-size:12px"><code class="hljs ruby"><span class="nb">filename = 'test.txt';
file = fopen(filename, 'w');
fprintf(file, '%08x ', 32767);
fclose(file);</span></code></pre></div>

## Two's complement
On the fixed-point design, we need to care about whether the fixed-point number is negative or not when doing two's complement. Usually, we can use sign field to distinguish positive or negative.

#### Example:
<div class="language-shell highlighter-rouge"><pre class="highlight" style="font-size:12px"><code class="hljs ruby"><span class="nb">% Check sign bit
sign_field = data >= (bit_len -1);

% Conversion (decimal)
if (sign_field)
  data = - (2^bit_len - data);</span></code></pre></div>

## Signed fixed-point numeric object
The matlab supports the constructures of signed and unsigned fixed-point numeric object, but unfortunately it does not have the overflowing protection, i.e The value can not more than 3 when the integral length is 3.

<h6><ol>
<li>sfi: With signed, two's-complement </li>  
<li>ufi: unsigned fixed-point numbers number</li>
</ol></h6>

Usage:
<div class="language-shell highlighter-rouge"><pre class="highlight" style="font-size:12px"><code class="hljs ruby"><span class="nb">sign_fixed = sfi(value, word length, fraction length)</span></code></pre></div>

Data Properties
<div class="language-shell highlighter-rouge"><pre class="highlight" style="font-size:12px"><code class="hljs ruby"><span class="nb">bin — Stored integer value of a fi object in binary
data — Numerical real-world value of a fi object
dec — Stored integer value of a fi object in decimal
double — Real-world value of a fi object, stored as a MATLAB® double
hex — Stored integer value of a fi object in hexadecimal
int — Stored integer value of a fi object, stored in a built-in MATLAB integer data type. You can also use int8, int16, int32, int64, uint8, uint16, uint32, and uint64 to get the stored integer value of a fi object in these formats
oct — Stored integer value of a fi object in octal</span></code></pre></div>

#### Example:
<div class="language-shell highlighter-rouge"><pre class="highlight" style="font-size:12px"><code class="hljs ruby"><span class="nb">b = sfi(3, 5, 2);
% binary representation
b.bin
% real-world value
b.data
% hexadecimal representation
b.hex</span></code></pre></div>

## Read radio file
The audioread is the common syntax to write audio file, i.e., wav, mp3, au, flac, etc. 

Usage:
<div class="language-shell highlighter-rouge"><pre class="highlight" style="font-size:12px"><code class="hljs ruby"><span class="nb">[data,Fs] = audioread(filename)</span></code></pre></div>
, where data is the sampled data, and Fs is the samplerate for that data. 

#### Example: Read a wav file
<div class="language-shell highlighter-rouge"><pre class="highlight" style="font-size:12px"><code class="hljs ruby"><span class="nb">samples_frame = 640;
test_wav = sprintf('wav/test.wav');
[data, Fs] = audioread(test_wav);
numFrame = round(length(data) / (samples_frame));
time = (1:length(data))/Fs;
plot(time, data);
title('wave: s(n)');</span></code></pre></div>

Result:
<figure>
<a><img src="{{ site.baseurl }}/picture/wav.png"></a>
</figure>

=========== To be continued.... ==========

## Reference
[1] [Read txt file in Matlab](https://stackoverflow.com/questions/9195716/read-txt-file-in-matlab)

[2] [Write formatted data to file](http://www.thphys.nuim.ie/CompPhysics/matlab/help/techdoc/ref/fprintf.html)

[3] [What is “2's Complement”?](https://stackoverflow.com/questions/1049722/what-is-2s-complement)

[4] [Construct signed fixed-point numeric object](https://www.mathworks.com/help/fixedpoint/ref/sfi.html)

[5] [audioread](https://www.mathworks.com/help/matlab/ref/audioread.html)

[6] [Audio Signal Processing and Recognition (音訊處理與辨識)](http://www.mirlab.org/jang/books/audioSignalProcessing/)

## Note
<p>If you have any constructive criticism or advises, leave the comments below or feel free to email me qazqazqaz850@gmail.com.

Hope this post will help! :)
</p>
