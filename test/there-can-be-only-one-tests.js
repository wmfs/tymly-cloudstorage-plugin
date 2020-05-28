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

describe('Only one provider registered', function () {
  this.timeout(process.env.TIMEOUT || 5000)

  let tymlyService, registerProvider

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
    const cloudstorageService = services.cloudstorage
    registerProvider = () => { cloudstorageService.registerProvider(provider) }
  })

  it('register provider', () => {
    registerProvider()
  })
  it('register second provider', () => {
    expect(registerProvider).to.throw()
  })

  after('shut down Tymly', async () => {
    await tymlyService.shutdown()
  })
})
