class EnsureCloudStorageFolder {
  init (config, env) {
    this.bootedServices = env.bootedServices
    this.provider = config.provider || 'default'
    this.remoteRoot = config.remoteFolderRoot || ''
  } // init

  get cloudstorage () { return this.bootedServices.cloudstorage }

  async run (event, context) {
    const provider = event.provider || this.provider
    const folderPath = `${this.remoteRoot}${event.remoteFolderPath}`
    try {
      const folderInfo = await this.cloudstorage.provider(provider).ensureFolderPath(folderPath)
      context.sendTaskSuccess(folderInfo)
    } catch (e) {
      context.sendTaskFailure({ error: 'ENSURE_CLOUD_STORAGE_FOLDER_FAIL', cause: e.message })
    }
  }
}

module.exports = EnsureCloudStorageFolder
