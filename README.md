Tasks!
======

**An example on how to build and structure a non-trivial JavaScript application.**

About / Demo
------------

http://ryanflorence.com/non-trivial-js/

Development
-----------

First install these dependencies:

[Node.js >= 0.4.9](http://nodejs.org/)
[NPM >= 1.0.0](http://npmjs.org)
[PhantomJS](http://www.phantomjs.org/)

Then all other dependencies can be installed with npm like so:

    $ npm install .

### Compiling templates

There is a `watch` script in `bin/watch` that will automatically watch the views directory and compile them to JavaScript functions to be included in the app.  Start it up like so:

    $ bin/watch

Or you can manually compile them

    $ bin/compile-templates

### Running tests

Open up the `app/test.html` in a browser, or from the command line with:

    $ bin/runtests

### Optimize the app

RequireJS combines and minifies your scripts.  Do it like so:

    $ bin/build

License
-------

Copyright (c) Ryan Florence

MIT Style license.

