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
    this.provider_ = provider
  } // registerProvider

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

module.exports = {
  serviceClass: CloudstorageService
}
