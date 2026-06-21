class DownloadingCloudStorageFile {
  async init (config, env) {
    this.downloadDir = await env.bootedServices.temp.makeTempDir('download')

    this.bootedServices = env.bootedServices
    this.provider = config.provider || 'default'
  } // init

  get cloudstorage () { return this.bootedServices.cloudstorage }

  async run (event, context) {
    try {
      const provider = event.provider || this.provider
      const fileName = event.remoteFileName
      const remoteFilePath = [event.remoteFolderPath, fileName].join('/')
      const localFolderPath = this.downloadDir

      await this.cloudstorage.provider(provider).downloadFile(remoteFilePath, localFolderPath)

      return context.sendTaskSuccess({ localFolderPath, fileName })
    } catch (e) {
      context.sendTaskFailure({ error: 'DOWNLOADING_CLOUD_STORAGE_FILE_FAIL', cause: e.message })
    }
  }
}

module.exports = DownloadingCloudStorageFile
