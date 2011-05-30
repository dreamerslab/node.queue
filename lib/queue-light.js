/*!
 * queue-light
 * Copyright(c) 2011 dreamerslab <ben@dreamerslab.com>
 * MIT Licensed
 */

 var trunk;

 function isArray(o) {  
   return Object.prototype.toString.call(o) === '[object Array]';   
 }

 trunk = {};

 module.exports = {

   version : '1.0.0',

   // push function to a queue to be executed later
   add : function( name, fn ){

     // build new queue if it is not found
     if( trunk[ name ] === undefined ){
       trunk[ name ] = [];
     }

     // push function to a queue
     trunk[ name ].push( fn );

     // return this to enable chaining
     return this;
   },

   // remove a function in a queue
   remove : function( name, fn ){
     var tmp, i, j;

     // make sure the calling queue exist, otherwise do nothing
     if( trunk[ name ] !== undefined ){
       // cache to local var outside the loop
       tmp = trunk[ name ];

       i = 0;
       j = tmp.length;

       // !IMPORTANT use splice instead of delete, see the following link for the resaon
       // http://stackoverflow.com/questions/500606/javascript-array-delete-elements
       for( ; i < j ; i++ ){
         if( tmp[ i ] === fn ){
           tmp.splice( i, 1 );
           break;
         }
       }
     }
     // return this to enable chaining
     return this;
   },

   execute : function( name, args ){
     var tmp, _args, i, j;

     // make sure the calling queue exist, otherwise do nothing
     if( trunk[ name ] !== undefined ){
       // cache to local var outside the loop
       tmp = trunk[ name ];
       // make sure the args is an array
       _args = isArray( args ) ? args : [ args ];

       i = 0;
       j = tmp.length;

       // execute
       for( ; i < j ; i++ ){
         tmp[ i ].apply( this, _args );
       }
     }

     // return this to enable chaining
     return this;
   },

   execute_and_clear : function( name, args ){
     var tmp, _args, i, j;

     // make sure the calling queue exist, otherwise do nothing
     if( trunk[ name ] !== undefined ){
       // cache to local var outside the loop
       tmp = trunk[ name ];
       // make sure the args is an array
       _args = sys.isArray( args ) ? args : [ args ];

       i = 0;
       j = tmp.length;

       // clear after execute
       for( ; i < j ; i++ ){
         tmp.shift().apply( this, _args );
       }
     }

     // return this to enable chaining
     return this;
   },

   // clear queue
   clear : function( name ){
     delete trunk[ name ];
     // return self to enable chaining
     return this;
   }
 };