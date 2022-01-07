class GetCloudStorageContents {
  init (config, env) {
    this.bootedServices = env.bootedServices
    this.provider = config.provider || 'default'
    this.fields = config.fields || []
    this.remoteRoot = config.remoteFolderRoot || ''
  } // init

  get cloudstorage () { return this.bootedServices.cloudstorage }

  async run (event, context) {
    const fields = event.fields || this.fields
    const provider = event.provider || this.provider

    const folderPath = `${this.remoteRoot}${event.remoteFolderPath}`

    try {
      const folderContents = await this.cloudstorage.provider(provider).listFolderContentsFromPath(folderPath)
      context.sendTaskSuccess(
        folderContents.map(file => transform(file, fields))
      )
    } catch (e) {
      context.sendTaskFailure({ error: 'GET_CLOUD_STORAGE_CONTENTS_FAIL', cause: e.message })
    }
  }
}

function transform (file = {}, fields = []) {
  if (!Array.isArray(fields) || fields.length === 0) return file

  return Object.fromEntries(
    Object
      .entries(file)
      .filter(([field]) => fields.includes(field))
  )
}

module.exports = GetCloudStorageContents
