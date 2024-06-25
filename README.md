# nodejs-printfolder-to-text

This Node.js script converts the structure and contents of a specified folder and its subfolders into a single text file. It's designed to help users easily share their local folder structure and file contents with AI assistants like ChatGPT or Claude.

## Usage

1. Run the script:
```
$ node index.js
$ Enter the path of the entry folder: ./example
$ Processing complete. Output written to output.txt
```


## output.txt

```
-=-=-= overview of all files [start] -=-=-=
./foo.txt
./sub1
./sub1/foo1.txt
./sub1/sub2
./sub1/sub2/foo2.txt
-=-=-= overview of all files [end] -=-=-=
-=-=-= content of ./foo.txt [start] -=-=-=
foo foo foo foo foo foo foo foo
foo foo foo foo foo foo
foo foo foo foo
foo foo
foo
-=-=-= content of ./foo.txt [end] -=-=-=
-=-=-= content of ./sub1/foo1.txt [start] -=-=-=
foo1 foo1 foo1 foo1 foo1
foo1 foo1 foo1 foo1
foo1 foo1 foo1
foo1 foo1
foo1
-=-=-= content of ./sub1/foo1.txt [end] -=-=-=
-=-=-= content of ./sub1/sub2/foo2.txt [start] -=-=-=
foo2 foo2 foo2 foo2
foo2 foo2 foo2
foo2 foo2
foo2
-=-=-= content of ./sub1/sub2/foo2.txt [end] -=-=-=
```