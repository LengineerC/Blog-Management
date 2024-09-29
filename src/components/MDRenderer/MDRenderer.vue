<script setup>
import { Marked } from 'marked';
import { markedHighlight } from 'marked-highlight';
import hljs from 'highlight.js';
import markedKatex from 'marked-katex-extension';

import "highlight.js/scss/atom-one-dark.scss";
import { onMounted, ref } from 'vue';

const marked = new Marked(
  markedHighlight({
    langPrefix: 'hljs language-',
    highlight(code, lang, info) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext';
      const highlightedCode= hljs.highlight(code, { language }).value;
      // return `<pre data-lang="${language}"><code class="hljs ${language}">${highlightedCode}</code></pre>`;
      // return `<code class="hljs ${language}>${highlightedCode}</code>`
      return highlightedCode;
    }
  }),
);
marked.use(markedKatex());

const props=defineProps(['markdown']);

const content=ref(null);

onMounted(()=>{
  const {markdown}=props;
  content.value=marked.parse(markdown);
});

</script>

<template>
  <div class="markdown-body">
    <div v-html="content" />
  </div>
</template>

<style lang="scss" scoped>
.markdown-body {
  font-family: Arial, sans-serif;
  line-height: 1.6;
  padding: 20px;
  border-radius: 5px;
  width: 100%;
  line-height: normal;

  .katex-html {
    display: none;
  }

  // .katex-html{
  semantics {
    font-size: 18px !important;
    margin: 5px 0 !important;
    color: #000 !important;
  }

  .katex-display semantics {
    font-size: 23px !important;
  }

  // }
  // pre code {
  //     display: block;
  //     color: #ddd;
  //     padding: 1em;
  //     background: rgb(45,45,45);
  //     border-radius: 5px;
  // }

  hr {
    height: .25em;
    background-color: #abb8c5;
    border: 0;
    margin-top: 24px;
  }

  h1,
  h2,
  h3,
  h4,
  h5 {
    margin-top: 5px;
    margin-bottom: 10px;
    transition: 0.3s;
    width: 100%;
    color: #000;

    border-bottom: 1px solid #abb8c5;

    &:hover {
      transform: scale(1.02);
    }
  }

  h1 {
    font-size: 34px;

    &:before {
      content: "🖌️";
    }
  }

  h2 {
    font-size: 28px;

    &:before {
      content: "✒️";
    }
  }

  h3 {
    font-size: 23px;

    &:before {
      content: "🖋️";
    }
  }

  h4 {
    font-size: 19px;

    &:before {
      content: "✏️";
    }
  }

  h5 {
    font-size: 16px;

    &:before {
      content: "📌";
    }
  }

  p {
    margin: 7px 0;
    color: #000;
  }

  p img {
    height: auto;
    max-width: 100%;
    border-radius: 10px;
    box-shadow: 0 5px 25px 0 rgba(0, 0, 0, .2), 0 10px 30px -11px rgba(0, 0, 0, .6);
  }

  a {
    color: #1e90ff;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 1em;
    margin-top: 0.7em;
  }

  table th,
  table td {
    padding: 0.5em;
    border: 1px solid #bcbcbc;
    color: #000;
  }

  table th {
    background: #f6f8fa;
    font-weight: bold;
  }

  table tr:nth-child(odd) {
    background-color: transparent;
  }

  table tr:nth-child(even) {
    background-color: #f1f1f1a5;
  }

  ul,
  ol {
    padding-left: 20px;
  }

  li {
    color: #000;
  }

  blockquote {
    background-color: rgba(7, 129, 235, 0.1);
    border-left: 5px solid #1e90ff;
    margin-left: 0;
    margin-right: 0;
    padding: 10px 10px 5px 15px;
  }

  code {
    background-color: #afb8c15e;
    padding: 0 5px;
    // border-radius: 0px 0px 5px 5px;
    border-radius: 5px;
    color: rgb(9, 103, 32);
    // display: block;
  }

  pre {
    position: relative;
    display: block;
    width: 100%;
  }

  // pre::before{
  //     content: attr(data-lang);
  //     display: flex;
  //     font-family:Arial, Helvetica, sans-serif;
  //     font-weight: bold;
  //     width: 100%;
  //     border-bottom: 1px solid #eee;
  //     padding-bottom: 10px;
  //     justify-content: flex-end;
  // }

  pre code.hljs {
    // padding-top: 0 !important;
    display: block;
    overflow-x: auto;
    padding: 1em;
    background: rgb(45, 45, 45);
    // border-radius: 5px;
    color: #ddd;
    max-height: 90vh;

    &::-webkit-scrollbar {
      height: 6px;
      width: 0px;
    }

    &::-webkit-scrollbar-track {
      // background-color: #bababa;
      background: #ffffff3f;
      border-radius: 100px;
    }

    &::-webkit-scrollbar-thumb {
      // background-color: rgb(77, 144, 227);
      background: #ffffff46;
      // box-shadow: inset 1px 1px 3px 0 rgba(255,255,255,0.5);
      border-radius: 50px;
      transition: 0.5s;

      &:hover {
        background-color: #ffffff6b;
      }
    }
  }

}
</style>