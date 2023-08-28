---
layout: post
title: Intorduction of Wave File Format
tags: [Singal_Process] 
---

## Purpose
  When doing the project on speech recognition, the test audio data for voice processing utilizes WAVE PCM file. 
    
  For quickly recapping the concept of WAVE PCM formay and avoiding to forget bit and pieces of this knowledge, I recorded this relevant information in this post.

## Abstract
  The WAVE file format is a subset of Microsoft's RIFF specificaiton for the storage of the multimedia file. A RIFF file starts out with a file header followed by a sequence of data chunks. A WAVE file is often just a RIFF file with a single "WAVE" chunk which consists of two sub-chunks, a "fmt" chunk specifying the data format and a "data" chunk containing the actual sample data. 

## The WAVE File Structure
The typically canonical WAVE format starts with the RIFF header:

<font size="3" face="Courier New" >
<table style="width:100%">
  <tr>
    <th>Field</th>
    <th>Bytes</th>
    <th>Bytes Offset</th>
    <th>Endian</th>
    <th>Description</th>
  </tr>
  <tr>
    <th>Chunk ID</th>
    <th>4</th>
    <th>0</th>
    <th>Big endian</th>
    <th align="left">This chunk contains the letters "RIFF" in ASCII form.</th>
  </tr>
  <tr>
    <th>Chunk Size</th>
    <th>4</th>
    <th>4</th>
    <th>Little endian</th>
    <th align="left">This is the size of the rest of the chunk following this number - the size of the entire file in bytes minus 8 bytes, Chunk ID and Chunk Size.</th>
  </tr>
  <tr>
    <th>Format</th>
    <th>4</th>
    <th>8</th>
    <th>Big endian</th>
    <th align="left">This chunk contains the letters "WAVE".</th>
  </tr>
  <tr>
    <th>Sub-Chunk1 ID</th>
    <th>4</th>
    <th>12</th>
    <th>Big endian</th>
    <th align="left">This chunk contains letter "fmt".</th>
  </tr>
  <tr>
    <th>Sub-Chunk1 Size</th>
    <th>4</th>
    <th>16</th>
    <th>Little endian</th>
    <th align="left">16 for PCM.</th>
  </tr>
  <tr>
    <th>Audio Format</th>
    <th>2</th>
    <th>20</th>
    <th>Little endian</th>
    <th align="left">1 for PCM, 2 for ADPCM, 3 for IEEE floating point, 7 for u-law, and 67734 for WaveFormatExtensible.</th>
  </tr>
  <tr>
    <th>Num Channels</th>
    <th>2</th>
    <th>22</th>
    <th>Little endian</th>
    <th align="left">1 for Mono, 2 for stereo, etc.</th>
  </tr>
  <tr>
    <th>Sample Rate</th>
    <th>4</th>
    <th>24</th>
    <th>Little endian</th>
    <th align="left">8000, 16000, 44100, etc Hz. A typical value would be 44100, which is the same as an audio CD. The value of telephone and wireless microphone transmission, adequate for human speech, is 8000. The 16000 is used in most modern VoIP and VVoIP communication products.</th>
  </tr>
  <tr>
    <th>Byte Rate</th>
    <th>4</th>
    <th>28</th>
    <th>Little endian</th>
    <th align="left">This value is equals to Sample Rate * Num of Channel * Bytes per Sample.</th>
  </tr>
  <tr>
    <th>Block Align</th>
    <th>2</th>
    <th>32</th>
    <th>Little endian</th>
    <th align="left">This value is equals to Num of Channel * Bytes per Sample.</th>
  </tr>
  <tr>
    <th>Bits Per Sample</th>
    <th>2</th>
    <th>34</th>
    <th>Little endian</th>
    <th align="left">8 for 8 bits (1 bytes), 16 for 16 bits (2 bytes), etc.</th>
  </tr>
  <tr>
    <th>Sub-Chunk2 ID</th>
    <th>4</th>
    <th>36</th>
    <th>Big endian</th>
    <th align="left">This chunk contains the letters "data".</th>
  </tr>
  <tr>
    <th>Sub-Chunk2 Size</th>
    <th>4</th>
    <th>40</th>
    <th>Little endian</th>
    <th align="left">This value is equals to Num of Samples * Num of Channels * Bytes Per Sample</th>
  </tr>
  <tr>
    <th>Data</th>
    <th>*</th>
    <th>44</th>
    <th>Little endian</th>
    <th align="left">The actual sound data.</th>
  </tr>
</table>
</font>

#### Example: the structure of WAVE file format

<div class="language-shell highlighter-rouge"><pre class="highlight" style="font-size:12px"><code class="hljs ruby"><span class="nb">typedef struct WAV_FORMAT_T{
  // RIFF header
  char chunkID[4]; // Contains the letters "RIFF"
  int chunkSize;   // This is the size of the entire file in bytes minus 8 bytes for the two fields not included in this count
  char format[4];  // Contains the letters "WAVE"

  // fmt sub-chunk
  char subchunk1[4];   // Contains the letters "fmt "
  int subchunk1Size;   // 16 for PCM
  short audioFormat;   // PCM = 1 
  short numChannels;   // Mono = 1, Stereo = 2
  int sampleRate;      // 8000, 16000, 44100, etc.
  int byteRate;        //  sampleRate * numChannels * Bytes per sample
  short blockAlign;    // numChannels * Bytes per sample
  short bitsPerSample; // The number of bits (1 byte = 8 bits) for one sample including all channels

  // data sub-chunk
  char subChunk2[4]; // Contains the letters "data"
  int subChunk2Size; // Num of Samples * numChannels * Bytes per sample 
  char bytes[];      // The actual sound data (temporarily use 1 bytes)
} WAV_FORMAT;</span></code></pre></div>

## PCM Data Chunk
  The simplest and most common WAVE file is PCM. The PCM samples are just raw sample data and stored as integers. The bytes per sample field will indicate the range of the sample data:

<font size="3" face="Courier New" >
 <table style="width:80%" align="center">
  <tr>
    <th>Bytes per Sample</th>
    <th>Minimum Sample</th>
    <th>Maximum Sample</th>
  </tr>
  <tr>
    <th>1</th>
    <th>0</th>
    <th>255</th>
  </tr>
  <tr>
    <th>2</th>
    <th>-32768</th>
    <th>32767</th>
  </tr>
  <tr>
    <th>3</th>
    <th>-8388608</th>
    <th>8388607</th>
  </tr>
</table>
</font>
  In addition, the samples at a moment in time are called a sample frame. In a stereo file, a sample frame has 2 samples, one sample for the left channel and the other for right channel.

## Parsing the wave header format by C Program
Assume: The audio wave file is recorded at 25 fps (40 msec per frame) and a stereo channel. Also, the sample rate is 16000 Hz and the number of bits per sample is 16 bits (2 bytes) 

#### Method 1.
<div class="language-shell highlighter-rouge"><pre class="highlight" style="font-size:12px"><code class="hljs ruby"><span class="nb">#include < stdio.h >
#include < stdlib.h >
#include < string.h >

#define SAMPLE_PER_FRAME 640 // 16000/25 = 640
#define NUM_CHANEL 2
#define BYTE_PER_SAMPLE 2
#define WAVE_SIZE_PER_FRAME  SAMPLE_PER_FRAME*BYTE_PER_SAMPLE*BYTE_PER_SAMPLE

int main(int argc, char **argv) {
    FILE *wav_list = NULL;
    FILE *fp = NULL;
    int frame_num = 0;
    WAV_FORMAT wav_chunk;

    // Static Memory
    char wav_test_case[200];
    char wav_per_frame[WAVE_SIZE_PER_FRAME];

    // Open Wav file
    wav_list = fopen(("wav_test_case.txt"), "rb");

    // Protection on Reading file
    if (wav_list == NULL) {
    printf("Error opening file");
    return (-1);
    }

    // Read Wav file - char * fgets(char* str, int Max num of char, FILE* stream), one test case
    if (fgets(wav_test_case, sizeof(wav_test_case), wav_list) != NULL) {

    fp = fopen(wav_test_case, "rb");

    // Protection on Reading file
    if (wav_list == NULL) {
    printf("Can't opening wav file");
    return (-1);
    }

    // Parsing WAV FORMAT
    fread(&wav_chunk, 1, sizeof(WAV_FORMAT), fp);
 
    printf("fmt sub-chunk: %.3s \n", wav_chunk.subchunk1);  // Read fmt sub-chunk
    printf("data sub-chunk: %.4s \n", wav_chunk.subChunk2); // Read data sub-chunk
    printf("numChannels = %d \n", wav_chunk.numChannels);   // Print the Format of Wav
    printf("sampleRate = %d \n", wav_chunk.sampleRate);
    printf("byteRate = %d \n", wav_chunk.byteRate);
    printf("bitsPerSample = %d \n", wav_chunk.bitsPerSample);
    printf("sample_alignment (numChannels * bitsPerSample) = %d \n",
        wav_chunk.blockAlign);
    printf("audio_format = %s \n",
        wav_chunk.audioFormat ? "PCM" : "IEEE Float");

    /***** Frame Process *****/
    while (fread(wav_per_frame, wav_chunk.blockAlign, WAVE_SIZE_PER_FRAME, fp) == WAVE_SIZE_PER_FRAME) {		
        printf("Frame = %d", frame_num);

        /***************************/
        /* Doing Signal Process per Frame */
        /***************************/

        frame_num++;
        } /***** End of Frame Process *****/
    }
    fclose(wav_list);
    return 0;
}</span></code></pre></div>

Result:
<div class="language-shell highlighter-rouge"><pre class="highlight" style="font-size:12px"><code class="hljs ruby"><span class="nb">fmt sub-chunk: fmt 
data sub-chunk: data 
numChannels = 1 
sampleRate = 16000 
byteRate = 32000 
bitsPerSample = 16 
sample_alignment (numChannels * bitsPerSample) = 2 
audio_format = PCM
Frame = 0
...</span></code></pre></div>

#### Method 2.
<div class="language-shell highlighter-rouge"><pre class="highlight" style="font-size:12px"><code class="hljs ruby"><span class="nb">#include < stdio.h >
#include < stdlib.h >
#include < string.h >

#define NUM_FRAME 16000
#define SAMPLE_PER_FRAME 640 // 16000/25 = 640, 25 fps
#define NUM_CHANEL 2
#define BYTE_PER_SAMPLE 2
#define WAVE_SIZE_PER_FRAME  SAMPLE_PER_FRAME*BYTE_PER_SAMPLE*BYTE_PER_SAMPLE

// Signal parameter structure
typedef struct SIGNAL_PARA_T {
    int sampleSize;
} SIGNAL_PARA;

// Default Value for signal parameter
SIGNAL_PARA signal_para = { SAMPLE_PER_FRAME };

int main(int argc, char **argv) {
    FILE *wav_list = NULL;
    FILE *fp = NULL;
    int frame_num = 0;
    WAV_FORMAT wav_chunk;
    
    // Static Memory
    char wav_test_case[200];
    char wav_per_frame[WAVE_SIZE_PER_FRAME];
    
    // Open Wav file
    wav_list = fopen(("wav_test_case.txt"), "rb");
    
    // Protection on Reading file
    if (wav_list == NULL) {
       printf("Error opening file");
       return (-1);
    }
    
    // Read Wav file - char * fgets(char* str, int Max num of char, FILE* stream), one test case
    if (fgets(wav_test_case, sizeof(wav_test_case), wav_list) != NULL) {
    
    fp = fopen(wav_test_case, "rb");
    
    // Protection on Reading file
    if (wav_list == NULL) {
       printf("Can't opening wav file");
       return (-1);
    }
    
    // Parsing WAV FORMAT
    fread(&wav_chunk, 1, sizeof(WAV_FORMAT), fp);
    
    // Read fmt sub-chunk
    printf("fmt sub-chunk: %.3s \n", wav_chunk.subchunk1);
    
    // Read data sub-chunk
    printf("data sub-chunk: %.4s \n", wav_chunk.subChunk2);
    
    //Print the Format of Wav
    printf("numChannels = %d \n", wav_chunk.numChannels);
    printf("sampleRate = %d \n", wav_chunk.sampleRate);
    printf("byteRate = %d \n", wav_chunk.byteRate);
    printf("bitsPerSample = %d \n", wav_chunk.bitsPerSample);
    printf("sample_alignment (numChannels * bitsPerSample) = %d \n",
        wav_chunk.blockAlign);
    printf("audio_format = %s \n",
        wav_chunk.audioFormat ? "PCM" : "IEEE Float");

   /***** Frame Process *****/
    for (frame_num = 0; frame_num < NUM_FRAME; frame_num++) {
        // Read samples
        result = fread(wav_per_frame, wav_chunk.blockAlign, signal_para.sampleSize, fp); 
        printf("Frame = %d \n", frame_num);

        /***************************/
        /* Doing Signal Process per Frame */
        /***************************/

        } /***** End of Frame Process *****/
    }
    fclose(wav_list);
    return 0;
}</span></code></pre></div>

Result:
<div class="language-shell highlighter-rouge"><pre class="highlight" style="font-size:12px"><code class="hljs ruby"><span class="nb">fmt sub-chunk: fmt 
data sub-chunk: data 
numChannels = 1 
sampleRate = 16000 
byteRate = 32000 
bitsPerSample = 16 
sample_alignment (numChannels * bitsPerSample) = 2 
audio_format = PCM
Frame = 0
...</span></code></pre></div>

=========== To be continued.... ==========

## Reference

[1] [Wave File Format](http://wavefilegem.com/how_wave_files_work.html)

[2] [WAVE PCM soundfile format](http://soundfile.sapp.org/doc/WaveFormat/)

<p>Thanks for reading! Feel free to leave the comments below or <a href="mailto:qazqazqaz850@gmail.com">email</a> to me. Any pieces of advice or discussions are always welcome. :)</p>
