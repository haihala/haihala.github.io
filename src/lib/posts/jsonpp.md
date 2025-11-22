---
title: 'JSONPP'
tagline: 'So I made a programming language'
createdAt: '2025-11-22T13:37+02:00'
tags: ['pet-project']
wordCount: 1145
---

Many moons ago, I got possessed by an idea. A dynamic representation of data
that could be expressed statically similarly to spreadsheets. JSON, the language
of the web was chosen as the bedrock of this cursed idea.

With some more seriousness, I made a programming language. It's called JSONPP,
which stands for either json-pre-processor or json++, depending on the context
(the crates.io for json++ was taken). It's part nerd-snipe, part joke, and part
programming exercise.

You can find the project repository on [GitHub](https://github.com/haihala/jsonpp).

## Brief explanation of the language

The language is an interpreted layer over JSON, which adds dynamic elements. The
output is always valid JSON, while the input is _enhanced_ JSON, which contains
lisp-like function calls. Every valid JSON file is a valid JSONPP file. The
enhancements are a lisp-like functional programming language, where functions
are called with parenthesis. For example, `(sum 1 2)` is a function call to the
`sum` function which adds 1+2 together, will evaluate to 3.

Where it gets interesting are a few special functions. `def` can be used to
create a definition, which for all intents and purposes can be thought of as a
function definition. You can use this with higher order functions like `map`,
`filter`, and `reduce`.

Another key function is `ref`, which can be used to refer to another value.
`ref` takes one string argument, which is a path that points to the cell you
want to reference. When the `ref` call gets evaluated, it's value gets replaced
by the value in the given path. The path can be relative to the `ref` call or
absolute, meaning relative to the document root. Paths use dot notation to
navigate object keys, braces to navigate list indices and parenthesis to
navigate function call arguments.

`ref` and `def` go well together, since you can reuse a definition by calling
`ref` to get the first argument to a function call. For example: `((ref "foo")
"argument")`

The `shell` function allows executing an input string ass a shell script. This
allows for a nice escape hatch that allows calling other programs. You can also
just use `include` to read a file as a string.

This is the point where what we have is still reasonable. You can use a few
custom definitions and `shell` calls to generate mock data, stitching everything
together with `ref`. Beyond the realm of readability lies `import`. `import`
reads a file and evaluates that file as JSONPP. This has the side-effect of
shifting where absolute `ref` statements point to. Absolute paths in a document
are relative to the root of that document. When importing, they are relevant to
the root of the importing document.

So if we have two files:

a.jsonpp

```
{
  "foo": 1,
  "bar": (ref "foo")
}
```

b.jsonpp

```
{
  "foo": 2,
  "baz": (import "a.jsonpp")
}
```

If evaluating those, we get a.json and b.json:

a.json

```
{
  "foo": 1,
  "bar": 1
}
```

b.json

```
{
  "foo": 2,
  "baz": {
    "foo": 1,
    "bar": 2,
  }
}
```

This is a minimal reproduction and can still take a while to read and
comprehend. Chaining multiple imports in a row or dynamically generating import
paths are both allowed, but ought to make even more baffling code.

The goal was to some extent to baffle, so mission accomplished there. I find
this interesting and brain-tickling in the same way as learning about functional
programming was.

## Tokenization is a worthy step

I had never built a parser for anything this complex, which complicated the
process. I had heard of some concepts before, so it wasn't that blind of a take.

The initial implementation had a muddled, 'less is more' -approach to steps in
the parsing pipeline. The first step was more or less to read the constants and
the structure of the input. I got it to work, but the parsing was quite nasty.
Things like whitespace removal had to be done in multiple places and overall it
wasn't the most legible code I had ever written. The second step was to evaluate
the structure, but evaluating everything was surprisingly difficult when things
got nested (definition within a definition). There were also some missing
internal fields after the parsing that the evaluator would have to fill in.

Over a hackathon, I rewrote some parts and added an explicit tokenization step.
Now there was a clear tokenization that dealt with whitespace, followed by
reading of the token stream which built a syntax tree, after which the dynamic
parts were evaluated, based on amount of references they contained. If something
contains no references, it is safe to evaluate and there should always be
something that contains no references outside of problematic source code where
the user has created a cyclical reference. In this case we simply exit calling
them out on it.

This refactor made everything so much clearer. It also helped with the missing
internal state, as now import statements could just go through tokenization and
syntax tree building like all the rest of the code. Feels a bit dumb to point
out, but Sometimes more steps are worth it for clarity I guess.

## Actually nice e2e tests

At my day job, I mostly do webdev. On my free time, I mostly do games. Both of
these, especially games have pretty crummy opportunities for e2e tests. Web is
fine, but usually it's verbose and the noise to signal ratio of finding elements
in the DOM is not great. I've yet to work on a bigger web project with e2e
testing and without complaints about them being flaky, slow, or both.

JSONPP is a terminal based application with minimal IO, so doing proper end to
end testing on it was actually quite nice. I setup folders with test inputs and
expected outputs and some test supports and voila. A whole function tested with
four lines of rust code. I even used JSONPP to generate some of the outputs and
then manually checked them afterwards.

The whole test suit + clippy + building the thing with cache takes about 30s in
GitHub CI. These are so fast that I even did some TDD, which felt like a rare
but correct place to apply TDD. Especially when debugging, the tests proved
quite helpful.

## Takeaways

- Every project doesn't have to be "productive"
- Writing an interpreter is interesting and surprisingly easy
- More clearer steps is better than fewer muddled ones
  - Clear intermediate state is good and should be prioritized
- Sometimes TDD is applicable
