/*!
 * Queue
 * Copyright(c) 2011 Ben Lin <ben@dreamerslab.com>
 * MIT Licensed
 *
 * @fileoverview
 * Queue is a lighter version of node.js event queue module.
 * With Queue you can push functions to a queue `outside` the function scope;
 * execute the queued functions later even `in different files`.
 * It makes your code easily to be more modularized.
 */



/**
 * @private
 * @namespace A namespace to store queues.
 */
var trunk = {};



/**
 * @public
 */
module.exports = {

  version : '1.1.4',



/**
 * Push a function to a queue to be called later.
 * @this {Queue}
 * @param {String} name Queue full name.
 * @param {Function} fn Queue function.
 * @returns {this} Return `this` to enable chaining.
 * @example
 *
 *     var queue = require( 'queue' );
 *     queue.add( 'queue_name', function( arg1, arg2, arg3 ){
 *       // do something here
 *     });
 */
  add : function( name, fn ){

    // build new queue if it does not exist
    if( trunk[ name ] === undefined ){
      trunk[ name ] = [];
    }

    // push function to a queue
    trunk[ name ].push( fn );

    return this;
  },



/**
 * Get a queue.
 * @this {Queue}
 * @param {String} name Queue name.
 * @returns {Array|false} Return the queued functions if available.
 * @example
 *
 *     var queue = require( 'queue' );
 *     queue.get( 'queue_name' );
 */
  get : function( name ){
    // make sure the calling out name exist
    if( trunk[ name ] !== undefined ){
      return trunk[ name ];
    }
    return false;
  },



/**
 * Remove a function from a queue.
 * @this {Queue}
 * @param {String} name Queue full name.
 * @param {Function} fn Function to be removed.
 * @returns {this} Return `this` to enable chaining.
 * @example
 *
 *     var queue = require( 'queue' ),
 *     some_function = function( arg1, arg2, arg3 ){
 *       // some code
 *     }
 *     queue.remove( 'queue_name', 'some_function' );
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
 * @param {String} arguments[ 0 ] Queue full name.
 * @param {String|Number|Array|Object|Function} [arguments[ 1 ]] an argument to be passed to the queue functions.
 * @returns {this} Return `this` to enable chaining.
 * @example
 *
 *     var queue = require( 'queue' );
 *     // You can pass as many arguments as you wish
 *     queue.execute( 'queue_name', arg1, arg2, arg3 ... );
 */
  execute : function(){
    var tmp, i, j;

    // assign the first argument to var name and remove it
    var name = [].shift.call( arguments );

    // make sure the calling queue exist, otherwise do nothing
    if( trunk[ name ] !== undefined ){
      // cache to local var outside the loop
      tmp = trunk[ name ];
      i = 0;
      j = tmp.length;

      // calling queue functions
      for( ; i < j ; i++ ){
        tmp[ i ].apply( this, arguments );
      }
    }

    return this;
  },



/**
 * Calling functions in a queue and remove them after calling.
 * @this {Queue}
 * @param {String} arguments[ 0 ] Queue full name.
 * @param {String|Number|Array|Object|Function} [arguments[ 1 ]] an argument to be passed to the queue functions.
 * @returns {this} Return `this` to enable chaining.
 * @example
 *
 *     var queue = require( 'queue' );
 *     // You can pass as many arguments as you wish
 *     queue.execute_and_clear( 'queue_name', arg1, arg2, arg3 ... );
 */
  execute_and_clear : function(){
    var tmp, i, j;

    // assign the first argument to var name and remove it
    var name = [].shift.call( arguments );

    // make sure the calling queue exist, otherwise do nothing
    if( trunk[ name ] !== undefined ){
      // cache to local var outside the loop
      tmp = trunk[ name ];
      i = 0;
      j = tmp.length;

      // clear each queue function after calling
      for( ; i < j ; i++ ){
        tmp.shift().apply( this, arguments );
      }
    }

    return this;
  },



/**
 * Delete a queue.
 * @this {Queue}
 * @param {String} name Queue full name.
 * @returns {this} Return `this` to enable chaining.
 * @example
 *
 *     var queue = require( 'queue' );
 *     queue.clear( 'queue_name' );
 */
  clear : function( name ){
    delete trunk[ name ];

    return this;
  }
};