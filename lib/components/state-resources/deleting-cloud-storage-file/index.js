class DeletingCloudStorageFile {
  init (config, env) {
    this.bootedServices = env.bootedServices
    this.provider = config.provider || 'default'
    this.remoteRoot = config.remoteFolderRoot || ''
  } // init

  get cloudstorage () { return this.bootedServices.cloudstorage }

  async run (event, context) {
    const provider = event.provider || this.provider
    const remotePath = `${this.remoteRoot}${event.remoteFolderPath}`
    const remoteName = event.remoteFileName

    try {
      const fileInfo = await this.cloudstorage.provider(provider).deleteFile(remotePath, remoteName)
      context.sendTaskSuccess(fileInfo)
    } catch (e) {
      context.sendTaskFailure({ error: 'DELETING_CLOUD_STORAGE_FILE_FAIL', cause: e.message })
    }
  }
}

module.exports = DeletingCloudStorageFile
