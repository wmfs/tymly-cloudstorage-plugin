class MovingCloudStorageFolderContents {
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

    try {
      const info = await this.cloudstorage.provider(provider).moveFolderContents(remoteSourcePath, remoteTargetPath)
      context.sendTaskSuccess(info)
    } catch (e) {
      context.sendTaskFailure({ error: 'MOVING_CLOUD_STORAGE_FOLDER_FAIL', cause: e.message })
    }
  }
}

module.exports = MovingCloudStorageFolderContents
