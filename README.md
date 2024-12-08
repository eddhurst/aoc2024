# Advent of Code

Hark, how the bells 

sweet silver bells

all seem to say

"throw cares away"

----

Solutions written in Typescript in the general structure

```text
src
  /1
    /prompts
      1.basic.ts
    index.ts
    parseInput.ts
```

Most daily challenges have a slightly nuanced way to parse the input before you can meaningfully handle the challenge, this is abstracted into the parseInput file.

Additionally there are a handful of utils for common tasks

## splitByLine

Returns an array separated list of strings spliting by new lines, and removing empty lines, helping to remove copy paste errors.

## parseIntoMultiDimensions

Useful if you have a prompt that represents a grid.

## progressBar

Implements a node progress bar singleton that can be instantiated and used to see long running tasks