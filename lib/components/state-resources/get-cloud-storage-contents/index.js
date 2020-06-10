const _ = require('lodash')

class GetCloudStorageContents {
  init (config, env) {
    this.bootedServices = env.bootedServices
  }

  get cloudstorage() { return this.bootedServices.cloudstorage }

  async run (event, context) {
    const folderPath = event.folderPath
    try {
      const folderContents = await this.cloudstorage.listFolderContentsFromPath(folderPath)
      context.sendTaskSuccess(folderContents)
    } catch (e) {
      context.sendTaskFailure({ error: 'GET_CLOUD_STORAGE_CONTENTS_FAIL', cause: e.message })
    }
  }
}

module.exports = GetCloudStorageContents
