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
        },
      };
    },
  },
  processors: {
    // assign to the file extension you want (.js, .jsx, .html, etc.)
    ".styl": {
      postprocess: function(messages, filename) {
        if (filename) {
          context.report(node, `Your path is ${filename}`);
        }
      },
    }
  }
};
