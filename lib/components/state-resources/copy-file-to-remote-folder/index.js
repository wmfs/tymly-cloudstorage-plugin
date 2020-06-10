class CopyFileToRemoteFolder {
  init (config, env) {
    this.bootedServices = env.bootedServices
  } // init

  get cloudstorage () { return this.bootedServices.cloudstorage }

  async run (event, context) {
    const localPath = event.localFilePath
    const remotePath = event.remoteFolderPath
    const remoteName = event.remoteFileName

    try {
      const fileInfo = await this.cloudstorage.copyFileToRemotePath(localPath, remotePath, remoteName)
      context.sendTaskSuccess(fileInfo)
    } catch (e) {
      context.sendTaskFailure({ error: 'ENSURE_CLOUD_STORAGE_FOLDER_FAIL', cause: e.message })
    }
  }
} // CopyFileToRemoteFolder

module.exports = CopyFileToRemoteFolder
