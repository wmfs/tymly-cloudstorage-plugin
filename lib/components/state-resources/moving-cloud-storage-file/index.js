class MovingCloudStorageFile {
  init (config, env) {
    this.bootedServices = env.bootedServices
    this.provider = config.provider || 'default'
    this.remoteRoot = config.remoteFolderRoot || ''
  } // init

  get cloudstorage () { return this.bootedServices.cloudstorage }

  async run (event, context) {
    const provider = event.provider || this.provider
    const remoteSourcePath = `${this.remoteRoot}${event.remoteSourceFolderPath}`
    const remoteTargetPath = `${this.remoteRoot}${event.remoteTargetFolderPath}`
    const remoteName = event.remoteFileName

    try {
      const fileInfo = await this.cloudstorage.provider(provider).moveFile(remoteSourcePath, remoteTargetPath, remoteName)
      context.sendTaskSuccess(fileInfo)
    } catch (e) {
      context.sendTaskFailure({ error: 'MOVING_CLOUD_STORAGE_FILE_FAIL', cause: e.message })
    }
  }
}

module.exports = MovingCloudStorageFile
