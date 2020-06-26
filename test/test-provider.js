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
    return `${this.folderPath}/${remoteFileName || localFilePath}${this.suffix}`
  } // copyFileToRemotePath

  copyFileToLocalPath (remoteFilePath, localFolderPath) {
    this.filePath = (remoteFilePath + this.suffix)
    this.folderPath = localFolderPath + this.suffix

    const fileName = this.filePath.split('/').slice(-1)[0]
    return `${localFolderPath}/${fileName}${this.suffix}`
  }
}

module.exports = TestProvider
