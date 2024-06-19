const nullProvider = {
  ensureFolderPath () { },
  listFolderContentsFromPath () { return null },
  deleteFile () { return null },
  copyFileToRemotePath () { return null },
  copyFileToLocalPath () { return null }
}

class CloudstorageService {
  boot (options) {
    this.messages = options.messages

    this.defaultProvider_ = nullProvider
    this.providers_ = new Map()
  } // boot

  defaultProvider (name, provider) {
    if ((this.defaultProvider_ !== nullProvider) && (name !== 'default')) return

    this.messages.info(`${name} set as default provider`)
    this.defaultProvider_ = provider
  } // defaultProvider

  provider (name) {
    const n = name.trim()
    return this.providers_.has(n)
      ? this.providers_.get(n)
      : this.defaultProvider_
  } // provider

  registerProvider (provider, name = 'default') {
    const providerNames = Array.isArray(name) ? name : [name]
    const providerType = provider.constructor.name
    for (const name of providerNames.map(s => s.trim())) {
      this.messages.info(`Cloudstorage provider ${providerType} registered as '${name}'`)
      this.defaultProvider(name, provider)

      if (name === 'default') continue

      if (this.providers_.has(name)) {
        this.messages.info(`   replaces ${this.providers_.get(name).constructor.name}`)
      }
      this.providers_.set(name, provider)
    } // for ...

    // shim provider if it doesn't supply all methods
    Object.keys(nullProvider)
      .filter(name => !provider[name])
      .forEach(name => { provider[name] = nullProvider[name] })
  } // registerProvider

  // Must return an object in the form
  // {
  //   folderPath: 'server/path/string',
  //   url: full url to folder, if available
  // }
  // It may optionally include any other fields
  async ensureFolderPath (path) {
    return this.defaultProvider_.ensureFolderPath(path)
  } // ensureFolderPath

  async listFolderContentsFromPath (path) {
    return this.defaultProvider_.listFolderContentsFromPath(path)
  } // listFolderContentsFromPath

  async deleteFile (path, fileName) {
    return this.defaultProvider_.deleteFile(path, fileName)
  } // deleteFile

  async moveFile (sourcePath, targetPath, fileName) {
    return this.defaultProvider_.moveFile(sourcePath, targetPath, fileName)
  }

  async moveFolder (sourcePath, targetPath) {
    return this.defaultProvider_.moveFolder(sourcePath, targetPath)
  }

  // Must return an object in the form
  // {
  //   Name: filename
  //   filePath: 'server/path/string',
  //   url: full url to file, if available
  // }
  // It may optionally include any other fields
  // If remoteFileName is omitted or is null, the remote file name will be the same as the
  // local file name
  async copyFileToRemotePath (localFilePath, remoteFolderPath, remoteFileName = null) {
    return this.defaultProvider_.copyFileToRemotePath(localFilePath, remoteFolderPath, remoteFileName)
  } // copyFileToRemotePath

  async copyFileToLocalPath (remoteFilePath, localFolderPath) {
    return this.defaultProvider_.copyFileToLocalPath(remoteFilePath, localFolderPath)
  } // copyFileToLocalPath
} // CloudstorageService

module.exports = {
  serviceClass: CloudstorageService
}
