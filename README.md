## jscs-annoyifier ##

For each style error in multiple files, this creates a desktop notification
using `node-notifier` saying how many errors are present in each file.

### Usage ###

**Installation**

`npm install jscs-annoyifier`


**CLI**

`jscs index.html --reporter=jshint-annoyifier`


**gulp**
```
gulp.task('jscs', function() {
  gulp.src('index.js')
    .pipe(jscs())
    .pipe(jscs.reporter('jshint-annoyifier'))
});
```
