class EnsureCloudStorageFolder {
  init (config, env) {
    this.bootedServices = env.bootedServices
  }

  get cloudstorage () { return this.bootedServices.cloudstorage }

  async run (event, context) {
    const folderPath = event.folderPath
    try {
      const folderInfo = await this.cloudstorage.ensureFolderPath(folderPath)
      context.sendTaskSuccess(folderInfo)
    } catch (e) {
      context.sendTaskFailure({ error: 'ENSURE_CLOUD_STORAGE_FOLDER_FAIL', cause: e.message })
    }
  }
}

module.exports = EnsureCloudStorageFolder
