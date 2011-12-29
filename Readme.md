# Queue

A node.js event queue module.



## *****Deprecated*****

I wrote this package before I really started to learn node.js. This package is exactly the same as the core module `EventEmitter`. So just ignore this one.



## Description

Javascript is an [event-driven](http://bit.ly/ejhOOR) programming language. Therefore your code is easy to have nested callbacks. This make your code less flexible.

With Queue you can push functions to a queue `outside` the function scope; execute the queued functions later even `in different files`. It makes your code easily to be more modularized.



## Requires

  - node >= 0.4.x



## Installation

    npm install queue



## Usage

> Require module.

    var queue = require( 'queue' );

> Push a function to a queue to be called later.

    queue.add( 'queue_name', function( arg1, arg2, arg3 ){
      // do something here
    });

> Get a queue.

    queue.get( 'queue_name' );

> Remove a function from a queue.

    var some_function = function( arg1, arg2, arg3 ){
      // some code
    }

    queue.remove( 'queue_name', 'some_function' );

> Calling functions in a queue.
    
    // You can pass as many arguments as you wish
    queue.execute( 'queue_name', arg1, arg2, arg3 ... );

> Calling functions in a queue and remove them after calling.
    
    // You can pass as many arguments as you wish
    queue.execute_and_clear( 'queue_name', arg1, arg2, arg3 ... );

> Delete a queue.

    queue.clear( 'queue_name' );



## License 

(The MIT License)

Copyright (c) 2011 dreamerslab &lt;ben@dreamerslab.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.