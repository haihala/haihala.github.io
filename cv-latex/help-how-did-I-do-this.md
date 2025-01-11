If it won't compile, it may be missing a package. It will show an error like so:

```
// Lots of shit here
! LaTeX Error: File `XXXXXX.sty' not found.

Type X to quit or <RETURN> to proceed,
or enter new name. (Default extension: sty)

Enter file name:
! Emergency stop.
<read *>

l.13 \usepackage
                {graphicx}^^M
!  ==> Fatal error occurred, no output PDF file produced!
Transcript written on cv.log.
Latexmk: Getting log file 'cv.log'
Latexmk: Examining 'cv.fls'
Latexmk: Examining 'cv.log'
Latexmk: Missing input file 'XXXXXX.sty' (or dependence on it) from following:
  ! LaTeX Error: File `XXXXXX.sty' not found.
Latexmk: 'pdflatex': source file 'XXXXXX.sty' doesn't exist. I'll try making it...
------------
Running 'make "XXXXXX.sty"'
------------
make[1]: Entering directory '/home/hajhawa/projects/haihala.github.io/cv-latex'
make[1]: *** No rule to make target 'XXXXXX.sty'.  Stop.
make[1]: Leaving directory '/home/hajhawa/projects/haihala.github.io/cv-latex'
Latexmk: Errors, so I did not complete making targets
Collected error summary (may duplicate other messages):
  pdflatex: Command for 'pdflatex' gave return code 1
      Refer to 'cv.log' and/or above output for details

Latexmk: Sometimes, the -f option can be used to get latexmk
  to try to force complete processing.
  But normally, you will need to correct the file(s) that caused the
  error, and then rerun latexmk.
  In some cases, it is best to clean out generated files before rerunning
  latexmk after you've corrected the files.
make: *** [Makefile:33: cv.pdf] Error 12
```

Install with `sudo dnf install texlife-XXXXXX`
