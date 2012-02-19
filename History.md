## 1.1.4 / 2011-07-08

  - Add getter method
  - Change package name to Queue



## 1.1.3 / 2011-07-05

  - Syntax tuning



## 1.1.2 / 2011-06-16

  - Remove isArray



## 1.1.1 / 2011-06-08

  - Update node version



## 1.1.0 / 2011-06-01

  - Method call syntax change for `execute` and `execute_and_clear`
    - ex.

<!---->

        // was
        queue.execute( 'queue_name', [ arg1, arg2, arg3 ]);
        queue.execute_and_clear( 'queue_name', [ arg1, arg2, arg3 ]);

        // now
        queue.execute( 'queue_name', arg1, arg2, arg3 );
        queue.execute_and_clear( 'queue_name', arg1, arg2, arg3 );



## 1.0.0 / 2011-05-30

  - Initial release
