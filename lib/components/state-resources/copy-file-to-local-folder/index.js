class CopyFileToRemoteFolder {
  init (config, env) {
    this.bootedServices = env.bootedServices
  } // init

  get cloudstorage () { return this.bootedServices.cloudstorage }

  async run (event, context) {
    const localPath = event.localFolderPath
    const remotePath = event.remoteFilePath

    try {
      const fileInfo = await this.cloudstorage.copyFileToLocalPath(remotePath, localPath)
      context.sendTaskSuccess(fileInfo)
    } catch (e) {
      context.sendTaskFailure({ error: 'COPY_TO_LOCAL_FOLDER_FAIL', cause: e.message })
    }
  }
} // CopyFileToRemoteFolder

module.exports = CopyFileToRemoteFolder
