---
layout: post
title: Introduction of feature representations of the speech signal
tags: [Singal_Process] 
---

## Purpose
When doing the project on speech signal processing, we need to know the different feature representations of the speech signal. Any decisions in pattern recongnition system would affect classification algorithm. 

For quickly recapping the conception of features of speech signal and avoiding to forget bit and pieces of this knowledge, I recorded this relevant information in this post.

## Abstract
Through more than 30 years of speech reconginizer research, many different feature representations of the speech signal have been suggested and tried. The most popular feature representation currently used is the Mel-frequency Cepstral Coefficients (MFCC). Another popular speech feature representation is known as Relative Spectral Transform - Perceptual Linear Prediction (RASTA-PLP). Gammatone Frequency Cepstral Coefficients (GFCC) is also one of feature representations of the speech signal.
 
## Feature representatiion

<h4><a name="TableContent"></a> The popular feature representation of the speech signal</h4>
<h6><ol>
    <li><a href="#MFCC">Mel-frequency Cepstral Coefficients</a></li>
    <li><a href="#RASTA">Relative Spectral Transform - Perceptual Linear Prediction</a></li>
    <li><a href="#GFCC">Gammatone Frequency Cepstral Coefficients</a></li>
</ol></h6>


<h4><a name="MFCC"></a>Mel-frequency Cepstral Coefficients</h4>
MFC is a representation of the short-term power spectrum of a sound, based on a linear consine transform of a log power spectrum on a nonlinear mel scale of frequency. The coefficients are derived from a type of cepstral representation of the audio clip.

MFCCs are commonly derived as follows:
<h5><ol>
    <li>Take the Fourier transform of a signal.</li>
    <li>Map the powers of the spectrum obtained above onto the mel scale.</li>
    <li>Take the logs of the powers at each of the mel frequencies.</li>
    <li>Take the discrete cosine transform of the list of mel log powers.</li>
    <li>The MFCCs are the amplitudes of the resulting spectrum.</li>
</ol></h5>

Typical MFCC features:
<ul style="list-style-type:disc">
  <li> 12 cepstral coefficients</li>
  <li> 1 delt engergy feature</li>
</ul>
Total -dimensional features

##### The diagrammatic MFCC block diagram
<figure>
<a><img src="{{ site.baseurl }}/picture/mfcc_block_diagram.png"></a>
</figure>

<h4><a name="RASTA"></a>Relative Spectral Transform - Perceptual Linear Prediction</h4>
The RASTA-PLP uses bandpass filtering in the log spectral domain then RASTA filtering removes slow channel variations. To put it simply, it is a separated technique that applies a bandpass filter to the energy in each frequency subband in order to smooth over short-term noise variations and to remove any constant offset resulting from static spectral coloration in the speech channel, e.g. from a telephone lone.

<h4><a name="GFCC"></a>Gammatone Frequency Cepstral Coefficients</h4>
The GFCC is based on a set of Gammatone Filter banks and the speech signal is multiplied to the Gammatone filter bank in the frequency domain. In recent studies have shown very good robustness against noise and acoustic change.

##### The diagrammatic GFCC block diagram
<figure>
<a><img src="{{ site.baseurl }}/picture/gfcc_block_diagram.png"></a>
</figure>

=========== To be continued.... ==========

## Reference

[1] [Mel-frequency cepstrum](https://en.wikipedia.org/wiki/Mel-frequency_cepstrum)

[2] [GAMMATONE AND MFCC FEATURES IN SPEAKER RECOGNITION](https://repository.lib.fit.edu/bitstream/handle/11141/458/Burgos%2c%20Wilson%2c%20Gammatone%20and%20MFCC....pdf?sequence=1&isAllowed=y)

[3] [Robust Speaker Veriﬁcation UsingGFCC Based i-Vectors](https://www.researchgate.net/publication/309149564_Robust_Speaker_Verification_Using_GFCC_Based_i-Vectors)

[4] [Chapter 9: Automatic Speech Recognition](http://www.cs.columbia.edu/~julia/courses/CS6998-2019/%5B09%5D%20Automatic%20Speech%20Recognition.pdf)

<p>Thanks for reading! Feel free to leave the comments below or <a href="mailto:qazqazqaz850@gmail.com">email</a> to me. Any pieces of advice or discussions are always welcome. :)</p>
