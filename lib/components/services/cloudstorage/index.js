class CloudstorageService {
  async ensureFolderPath (path) {
  } // ensureFolderPath

  async listFolderContentsFromPath (path) {
    return null
  } // listFolderContentsFromPath

  async copyFileToRemotePath (localFilePath, remoteFolderPath) {
    return null
  } // copyFileToRemotePath

  async copyFileToLocalPath (remoteFilePath, localFolderPath) {
    return null
  } // copyFileToLocalPath
} // CloudstorageService

module.exports = {
  serviceClass: CloudstorageService
}
