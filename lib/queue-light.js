/*!
 * Queue-light
 * Copyright(c) 2011 Ben Lin <ben@dreamerslab.com>
 * MIT Licensed
 *
 * @fileoverview 
 * Queue-light is a lighter version of node.js event queue module. 
 * With Queue-light you can push functions to a queue `outside` the function scope; 
 * execute the queued functions later even `in different files`. 
 * It makes your code easily to be more modularized.
 */



var trunk, Queue;



/**
 * Return a boolean indicating whether or not the argument is an array.
 * @private
 * @param {String|Number|Array|Object|Function} o Anything.
 * @return {Boolean} true or false.
 */
function isArray( o ){  
  return Object.prototype.toString.call( o ) === '[object Array]';
}



/**
 * @private
 * @namespace A namespace to store queues.
 */
trunk = {};



/**
 * @public
 */
Queue = {
  
  version : '1.0.0',



/**
 * Push a function to a queue to be called later.
 * @this {Queue}
 * @param {String} name Queue full name.
 * @param {Function} fn Queue function.
 * @return {this} Return `this` to enable chaining.
 * @example
 * var queue = require( 'queue' );
 * queue.add( 'queue_name', function( arg1, arg2, arg3 ){
 *  // do something here
 * });
 */
  add : function( name, fn ){
    
    // build new queue if it is not found
    if( trunk[ name ] === undefined ){
      trunk[ name ] = [];
    }
    
    // push function to a queue
    trunk[ name ].push( fn );
    
    return this;
  },



/**
 * Remove a function from a queue.
 * @this {Queue}
 * @param {String} name Queue full name.
 * @param {Function} fn Function to be removed.
 * @return {this} Return `this` to enable chaining.
 * @example
 * var queue = require( 'queue' ),
 * some_function = function( arg1, arg2, arg3 ){
 *  // some code
 * }
 * queue.remove( 'queue_name', 'some_function' );
 */
  remove : function( name, fn ){
    var tmp, i, j;
    
    // make sure the calling queue exist, otherwise do nothing
    if( trunk[ name ] !== undefined ){
      // cache to local var outside the loop
      tmp = trunk[ name ];
      
      i = 0;
      j = tmp.length;
      
      // IMPORTANT: use splice instead of delete, see the following link for the resaon
      // http://stackoverflow.com/questions/500606/javascript-array-delete-elements
      for( ; i < j ; i++ ){
        if( tmp[ i ] === fn ){
          tmp.splice( i, 1 );
          break;
        }
      }
    }
    
    return this;
  },



/**
 * Calling functions in a queue.
 * @this {Queue}
 * @param {String} name Queue full name.
 * @param {String|Number|Array|Object|Function} [args] Arguments to be passed to the queued functions.
 * @return {this} Return `this` to enable chaining.
 * @example
 * var queue = require( 'queue' );
 * queue.execute( 'queue_name', [ arg1, arg2, arg3 ]);
 * // or
 * queue.execute( 'queue_name', arg );
 */
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
    
    return this;
  },



/**
 * Calling functions in a queue and remove them after calling.
 * @this {Queue}
 * @param {String} name Queue full name.
 * @param {String|Number|Array|Object|Function} args Arguments to be passed to the queued functions.
 * @return {this} Return `this` to enable chaining.
 * @example
 * var queue = require( 'queue' );
 * queue.execute( 'queue_name', [ arg1, arg2, arg3 ]);
 * // or
 * queue.execute( 'queue_name', arg );
 */
  execute_and_clear : function( name, args ){
    var tmp, _args, i, j;
    
    // make sure the calling queue exist, otherwise do nothing
    if( trunk[ name ] !== undefined ){
      // cache to local var outside the loop
      tmp = trunk[ name ];
      // make sure the args is an array
      _args = isArray( args ) ? args : [ args ];
      
      i = 0;
      j = tmp.length;
      
      // clear after execute
      for( ; i < j ; i++ ){
        tmp.shift().apply( this, _args );
      }
    }
    
    return this;
  },



/**
 * Delete a queue.
 * @this {Queue}
 * @param {String} name Queue full name.
 * @return {this} Return `this` to enable chaining.
 * @example
 * var queue = require( 'queue' );
 * queue.clear( 'queue_name' );
 */
  clear : function( name ){
    delete trunk[ name ];
    
    return this;
  }
};



module.exports = Queue;