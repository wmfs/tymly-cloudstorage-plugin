/* eslint-env mocha */

const chai = require('chai')
chai.use(require('dirty-chai'))
const expect = chai.expect

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

  copyFileToRemotePath (localFilePath, remoteFolderPath) {
    this.filePath = localFilePath
    this.folderPath = remoteFolderPath
    return 'remote/file.name'
  } // copyFileToRemotePath

  copyFileToLocalPath (remoteFilePath, localFolderPath) {
    this.filePath = remoteFilePath
    this.folderPath = localFolderPath
    return 'local/file.name'
  }
}

describe('Cloudstorage service tests', function () {
  this.timeout(process.env.TIMEOUT || 5000)

  let tymlyService, cloudstorageService

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

  it('cloudstorage service has started', () => {
    expect(cloudstorageService).to.exist()
  })

  describe('no provider registered, so calling methods has no effect', () => {
    it('ensureFolderPath', async () => {
      await cloudstorageService.ensureFolderPath('test')
    })
    it('listFolderContentsFromPath', async () => {
      const contents = await cloudstorageService.listFolderContentsFromPath('test')
      expect(contents).to.be.null()
    })
    it('copyFileToRemotePath', async () => {
      const remoteName = await cloudstorageService.copyFileToRemotePath('local.file', 'remote')
      expect(remoteName).to.be.null()
    })
    it('copyFileToLocalPath', async () => {
      const localName = await cloudstorageService.copyFileToLocalPath('remote.file', 'local')
      expect(localName).to.be.null()
    })
  })

  describe('provider registered, so method calls forward to provider', () => {
    const provider = new TestProvider()

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
      expect(provider.folderPath).to.eql('remote')
      expect(provider.filePath).to.eql('local.file')
      expect(remoteName).to.eql('remote/file.name')
    })
    it('copyFileToLocalPath', async () => {
      const localName = await cloudstorageService.copyFileToLocalPath('remote.file', 'local')
      expect(provider.folderPath).to.eql('local')
      expect(provider.filePath).to.eql('remote.file')
      expect(localName).to.eql('local/file.name')
    })
  })

  after('shut down Tymly', async () => {
    await tymlyService.shutdown()
  })
})
