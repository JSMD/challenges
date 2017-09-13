# Challenge #6 - Cloud Generator
This challenge is about generating a random cloud-like shape created from 2 or more circles, the output can be implemented in Canvas API or SVG. So the actual challenge consists in creating a function which must accept one argument which is a integer number greater or equal to `2` and output graphics which represent the generated "cloud". There are some rules:

1. The generated circles centers coordinates must NOT coincide
2. There should be NO circles which are just tangent with the others or totally separated
3. There should be NO circles which are totally overlapped by the area of other circles
4. In the output only the outline of the shape has to be drawn
5. Size constraints, circle radius: 10 - 1000px, outline width: 5px
6. For simplicity of the challenge, please use only integer numbers

Simplest example:
<img src="https://i.imgur.com/rnyyVaK.png"/>

Bad example:

<img src="https://i.imgur.com/nIVdrxn.png"/>

Another bad example:

<img src="https://i.imgur.com/uFDF0jg.png"/>

A more complex example:

<img src="https://i.imgur.com/yojnwgo.png"/>

With circles visible:

<img src="https://i.imgur.com/OP2dCpx.png"/>

Bad example with circles totally being overlapped:

<img src="https://i.imgur.com/BwLvyo1.png">