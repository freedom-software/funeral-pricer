# Funeral Pricer
## Synopsis

Javascript based application that allows users to answer a few questions about features of a future funeral and gives them an estimated cost of the funeral based on their answers to those questions.

## Motivation

The need to assist both funeral directors and those looking into a funeral, by giving them the abiltiy to quickly get an idea of the price of a funeral with the features they are looking for.

## Installation

Download the project, then open pricer.html in a browser while it is still in the folder with the other accompanying files.

I have made attempts to make the questions and calculations easy to customize.

The questions are stored in questions.js and are written to the screen in the order they are added to the questions JS object. An example question is commented at the top of the object, describing what each property does and how it should be constructed.

The calculations are a little more disjointed. Straight additions to the estimate based on a single question's answer are stored in the questions.js file also. More complex calcualtions such as 'Question A' * 'Question B' are stored in the formulas.js file in the formulas object. An example has been added to the top of the object, describing what each property does and how it should be constructed.

## License

**GNU GENERAL PUBLIC LICENSE**
Version 2, June 1991

The GPL (V2) is a copyleft license that requires anyone who distributes the code or a derivative work to make the source available under the same terms.