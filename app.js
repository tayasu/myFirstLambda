/*jslint node: true */
/*eslint-env node, mocha */

"use strict";

exports.handler = function(event, context, callback) {
    var self = this;
    self.event = event;
    console.log('lambda fired');
    console.log('event: ' + JSON.stringify(event, null, 4));
    callback(null, 'lambda callback');
};
