class GetCloudStorageContents {
  init (config, env) {
    this.bootedServices = env.bootedServices
    this.provider = config.provider || 'default'
  } // init

  get cloudstorage () { return this.bootedServices.cloudstorage }

  async run (event, context) {
    const folderPath = event.remoteFolderPath
    try {
      const folderContents = await this.cloudstorage.provider(this.provider).listFolderContentsFromPath(folderPath)
      context.sendTaskSuccess(folderContents)
    } catch (e) {
      context.sendTaskFailure({ error: 'GET_CLOUD_STORAGE_CONTENTS_FAIL', cause: e.message })
    }
  }
}

module.exports = GetCloudStorageContents
