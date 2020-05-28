# tymly-cloudstorage-plugin
[![Tymly Package](https://img.shields.io/badge/tymly-package-blue.svg)](https://tymly.io/)
[![npm (scoped)](https://img.shields.io/npm/v/@wmfs/tymly-cloudstorage-plugin.svg)](https://www.npmjs.com/package/@wmfs/tymly-cloudstorage-plugin)
[![CircleCI](https://circleci.com/gh/wmfs/tymly-cloudstorage-plugin.svg?style=svg)](https://circleci.com/gh/wmfs/tymly-cloudstorage-plugin)
[![Dependabot badge](https://img.shields.io/badge/Dependabot-active-brightgreen.svg)](https://dependabot.com/)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/wmfs/tymly-cloudstorage-plugin/blob/master/LICENSE)


Defines the cloudstorage service interface and provides state-resources around the service. Specific cloudstorage implementations provided by additional Tymly plugins.

## Cloud Storage Service

The `cloudstorage` defines four methods 

* ensureFolderPath
* listFolderContentsFromPath
* copyFileToRemotePath
* copyFileToLocalPath

The default implementations of these methods do nothing. 

Once a storage provider has registered with the cloudstorage service, the methods are forwarded to that provider. A provider may implement as many or as few of the methods as it wishes. A read-only provider might only implement `ensureFolderPath` and `listFolderContentsFromPath`, for example.  

