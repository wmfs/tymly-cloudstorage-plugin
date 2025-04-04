class CopyFileToRemoteFolder {
  init (config, env) {
    this.bootedServices = env.bootedServices
    this.provider = config.provider || 'default'
    this.remoteRoot = config.remoteFolderRoot || ''
    this.services = env.bootedServices
  } // init

  get cloudstorage () { return this.bootedServices.cloudstorage }

  async run (event, context) {
    const uploadMetaModel = this.services.storage.models.cloudstorage_uploadMeta
    const provider = event.provider || this.provider
    const localPath = event.localFilePath
    const remotePath = `${this.remoteRoot}${event.remoteFolderPath}`
    const remoteName = event.remoteFileName

    const uploadMeta = {
      stateMachineName: context.stateMachineMeta.name,
      executionName: context.executionName,
      remoteFolderPath: event.remoteFolderPath,
      remoteFolderRoot: this.remoteRoot,
      localFilePath: localPath,
      remoteFileName: remoteName,
      provider
    }

    try {
      const fileInfo = await this.cloudstorage.provider(provider).copyFileToRemotePath(localPath, remotePath, remoteName)

      uploadMeta.fileSize = fileInfo.fileSize
      await uploadMetaModel.create(uploadMeta)

      return context.sendTaskSuccess(fileInfo)
    } catch (e) {
      uploadMeta.errorMessage = e.message
      await uploadMetaModel.create(uploadMeta)

      return context.sendTaskFailure({ error: 'COPY_TO_CLOUD_STORAGE_FOLDER_FAIL', cause: e.message })
    }
  }
} // CopyFileToRemoteFolder

module.exports = CopyFileToRemoteFolder
