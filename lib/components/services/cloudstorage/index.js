const nullProvider = {
  ensureFolderPath () { },
  listFolderContentsFromPath () { return null },
  copyFileToRemotePath () { return null },
  copyFileToLocalPath () { return null }
}

class CloudstorageService {
  boot () {
    this.provider_ = nullProvider
  } // boot

  registerProvider (provider) {
    throwIfSecondProvider(this.provider_, provider)

    this.provider_ = provider

    // shim provider if it doesn't supply all methods
    Object.keys(nullProvider)
      .filter(name => !this.provider_[name])
      .forEach(name => { this.provider_[name] = nullProvider[name] })
  } // registerProvider

  // Must return an object in the form
  // {
  //   folderPath: 'server/path/string',
  //   url: full url to folder, if available
  // }
  // It may optionally include any other fields
  async ensureFolderPath (path) {
    return this.provider_.ensureFolderPath(path)
  } // ensureFolderPath

  async listFolderContentsFromPath (path) {
    return this.provider_.listFolderContentsFromPath(path)
  } // listFolderContentsFromPath

  async copyFileToRemotePath (localFilePath, remoteFolderPath) {
    return this.provider_.copyFileToRemotePath(localFilePath, remoteFolderPath)
  } // copyFileToRemotePath

  async copyFileToLocalPath (remoteFilePath, localFolderPath) {
    return this.provider_.copyFileToLocalPath(remoteFilePath, localFolderPath)
  } // copyFileToLocalPath
} // CloudstorageService

function throwIfSecondProvider (firstProvider, secondProvider) {
  if (firstProvider === nullProvider) return

  const firstName = firstProvider.constructor ? firstProvider.constructor.name : ''
  const secondName = secondProvider.constructor ? secondProvider.constructor.name : 'provider'

  throw new Error(`Storage service ${firstName} already registered as provider. Can not register second ${secondName}.`)
} // throwIfSecondProvider

module.exports = {
  serviceClass: CloudstorageService
}
