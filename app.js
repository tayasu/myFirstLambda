/*jslint node: true */
/*eslint-env node, mocha */

"use strict";

exports.handler = function(event, context){
    var self = this;
    console.log('lambda fired');
    console.log('event: ' + JSON.stringify(event, null, 4));
    context.done();
};
