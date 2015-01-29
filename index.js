var notifier = require('node-notifier');

module.exports = function(errors) {
  var errorsPerFile = {};
  errors.map(function(error) {
    errorsPerFile[error._file._filename] = error._errorList.length;
  });

  for (var file in errorsPerFile) {
    if (errorsPerFile.hasOwnProperty(file)) {
      notifier.notify({
          title: 'jscs errors',
          message: file + ' : ' + errorsPerFile[file] + ' errors.'
      });
    }
  }
}

// Optional abilitiy to set the notifier for testing.
module.exports.__setNotifier = function(notifier) {
    notifier = notifier
}

