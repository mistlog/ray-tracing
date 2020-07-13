---
 {
  "useMath": true,
  "visualizers": [
      {
          "path": "./src/visualizers/visualizer.ts"
      }
  ]
 }
---

# Ray Tracing in Literate Programming

This project is a reimplementation of [Ray Tracing in One Weekend](https://raytracing.github.io/) series. You still need to read the original post because it's not necessary to reiterate the basic principles of ray tracing and this site serves as reference material instead of tutorial.

The feature of this implementation is [literate programming](https://en.wikipedia.org/wiki/Literate_programming) and this site you are visiting is generated from code with the help of [litscript](https://github.com/johtela/litscript). Code reordering is made possible by [typedraft](https://github.com/mistlog/typedraft), thus articles in this site are not trivially generated in source code order, instead, it's in logical order and reflects the evolution of design directly.
                                                                                                     
<<v:illustrator sphere-ocean 100% 350px>>
                         
This final scene is not image, instead, it's canvas, which is used as [illustration](./src/illustrations/index.html) in document. Refresh your browser, the scene you see will be different.

Illustration is powered by [svelte-draft](https://github.com/mistlog/svelte-draft) and used to demonstrate specific part of code, in this way, code in a program can be explored independently. Readers will get the whole picture of this project from the organization of articles such as table of contents, and details come from these illustrations.