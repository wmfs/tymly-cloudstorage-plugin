class TestProvider {
  constructor (suffix = '') {
    this.suffix = suffix
  }

  ensureFolderPath (path) {
    this.folderPath = path + this.suffix
  }

  listFolderContentsFromPath (path) {
    this.folderPath = path + this.suffix
    return ['dummy' + this.suffix]
  }

  copyFileToRemotePath (localFilePath, remoteFolderPath, remoteFileName = null) {
    this.filePath = localFilePath + this.suffix
    this.folderPath = remoteFolderPath + this.suffix
    this.remoteFileName = remoteFileName
    return `remote/${remoteFileName || localFilePath}${this.suffix}`
  } // copyFileToRemotePath

  copyFileToLocalPath (remoteFilePath, localFolderPath) {
    this.filePath = remoteFilePath + this.suffix
    this.folderPath = localFolderPath + this.suffix
    return `${localFolderPath}/${remoteFilePath}${this.suffix}`
  }
}

module.exports = TestProvider
