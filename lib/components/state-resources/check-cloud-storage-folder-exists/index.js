class CheckCloudStorageFolderExists {
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
      const exists = await this.cloudstorage.provider(provider).checkFolderPathExists(folderPath)
      context.sendTaskSuccess({ exists })
    } catch (e) {
      context.sendTaskFailure({ error: 'CHECK_CLOUD_STORAGE_FOLDER_EXISTS_FAIL', cause: e.message })
    }
  }
}

module.exports = CheckCloudStorageFolderExists
