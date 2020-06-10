/* eslint-env mocha */

const expect = require('chai').expect

const tymly = require('@wmfs/tymly')
const path = require('path')

class TestProvider {
  ensureFolderPath (path) {
    this.folderPath = path
  }

  listFolderContentsFromPath (path) {
    this.folderPath = path
    return ['dummy']
  }

  copyFileToRemotePath (localFilePath, remoteFolderPath, remoteFileName) {
    this.filePath = localFilePath
    this.folderPath = remoteFolderPath
    this.remoteFileName = remoteFileName
    return `remote/${remoteFileName || localFilePath}`
  } // copyFileToRemotePath

  copyFileToLocalPath (remoteFilePath, localFolderPath) {
    this.filePath = remoteFilePath
    this.folderPath = localFolderPath
    return 'local/file.name'
  }
}

describe('Provider registered, so all method calls forward to provider', function () {
  this.timeout(process.env.TIMEOUT || 5000)

  let tymlyService, cloudstorageService

  const provider = new TestProvider()

  before('boot Tymly', async () => {
    const services = await tymly.boot(
      {
        pluginPaths: [
          path.resolve(__dirname, './../lib')
        ]
      }
    )

    tymlyService = services.tymly
    cloudstorageService = services.cloudstorage
  })

  it('register provider', () => {
    cloudstorageService.registerProvider(provider)
  })

  it('ensureFolderPath', () => {
    cloudstorageService.ensureFolderPath('remote/path1')
    expect(provider.folderPath).to.eql('remote/path1')
  })
  it('listFolderContentsFromPath', async () => {
    const contents = await cloudstorageService.listFolderContentsFromPath('remote/path2')
    expect(provider.folderPath).to.eql('remote/path2')
    expect(contents).to.be.eql(['dummy'])
  })
  it('copyFileToRemotePath', async () => {
    const remoteName = await cloudstorageService.copyFileToRemotePath('local.file', 'remote')
    expect(provider.filePath).to.eql('local.file')
    expect(provider.folderPath).to.eql('remote')
    expect(provider.remoteFileName).to.eql(null)
    expect(remoteName).to.eql('remote/local.file')
  })
  it('copyFileToRemotePath with filename', async () => {
    const remoteName = await cloudstorageService.copyFileToRemotePath('local.file', 'remote', 'new.name')
    expect(provider.filePath).to.eql('local.file')
    expect(provider.folderPath).to.eql('remote')
    expect(provider.remoteFileName).to.eql('new.name')
    expect(remoteName).to.eql('remote/new.name')
  })
  it('copyFileToLocalPath', async () => {
    const localName = await cloudstorageService.copyFileToLocalPath('remote.file', 'local')
    expect(provider.folderPath).to.eql('local')
    expect(provider.filePath).to.eql('remote.file')
    expect(localName).to.eql('local/file.name')
  })

  after('shut down Tymly', async () => {
    await tymlyService.shutdown()
  })
})
