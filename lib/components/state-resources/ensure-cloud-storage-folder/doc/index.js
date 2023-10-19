'use strict'

module.exports = {
  description: 'Creates the last folder in the specified path (if it already exists, it does nothing).  Be aware that if one of the folder prior to the last folder doesn\'t exist, the state resource will throw an exception.  So for example, if you pass in the path \'Shared Documents/1234567890/Audit/Photos\', if the folder \'Shared Documents/1234567890/Audit\' doesn\'t exist, then the state resource will throw an exception.',
  example: require('./example.json')
}
