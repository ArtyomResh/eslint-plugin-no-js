'use strict';

var path = require('path');

module.exports = {
  rules: {
    'filenames-according-to-folder': function(context) {
      return {
        Program: function(node) {
          if (context.getFilename()) {
            context.report(node, `Your path is ${context.getFilename()}`);
          }
          // if (path.extname(context.getFilename()) === '.js') {
          //   context.report(node, `Your path is ${}`);
          // }
        },
      };
    },
  },
};
