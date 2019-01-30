# Markdown Blogup

Markdown has been an embarrassingly late discovery for me. My previous attempts at building website was to *hand-craft* everything and manually place in all the **<tags/>**.

This was acceptable for small demo projects where I wanted to get up a running as quickly as possible. However, when I started to write these blog articles, it became an *enormous* chore to manually add the tags for paragraphs, headings, font styling and so on. A quick web search led me to something called **Markdown**, which allows one to read and write *styled* content in a human-readable format. The written content is then processed to generate valid HTML with all the tags for styling.

The content of this blog is written in Markdown format and passed through the [Markdown-it](https://markdown-it.github.io/) Markdown Processor to generate all the HTML tags... which is then rendered to your screen! Very easy to implement, and makes my blog content easy to create, edit and manage. The blog content is essentially a giant string which is fetched by your browser before rendering as HTML to the screen.

This means that I can eventually move my blog to a database such as MongoDB. My website will become a shell for loading and rendering this markdown content and allows me to dynamically edit the content without pushing a new version of the website up to the webserver. Of course, this content rendering method can be applied to all the *index* and *about* pages too. This separates the content of the website from the logic and rendering, which allows each to be developed independently. 