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
