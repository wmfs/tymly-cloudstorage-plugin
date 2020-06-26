class CopyFileToRemoteFolder {
  init (config, env) {
    this.bootedServices = env.bootedServices
    this.provider = config.provider || 'default'
    this.remoteRoot = config.remoteFolderRoot || ''
  } // init

  get cloudstorage () { return this.bootedServices.cloudstorage }

  async run (event, context) {
    const provider = event.provider || this.provider
    const localPath = event.localFilePath
    const remotePath = `${this.remoteRoot}${event.remoteFolderPath}`
    const remoteName = event.remoteFileName

    try {
      const fileInfo = await this.cloudstorage.provider(provider).copyFileToRemotePath(localPath, remotePath, remoteName)
      context.sendTaskSuccess(fileInfo)
    } catch (e) {
      context.sendTaskFailure({ error: 'COPY_TO_CLOUD_STORAGE_FOLDER_FAIL', cause: e.message })
    }
  }
} // CopyFileToRemoteFolder

module.exports = CopyFileToRemoteFolder
