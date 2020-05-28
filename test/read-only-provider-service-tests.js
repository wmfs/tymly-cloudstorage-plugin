/* eslint-env mocha */

const chai = require('chai')
chai.use(require('dirty-chai'))
const expect = chai.expect

const tymly = require('@wmfs/tymly')
const path = require('path')

class ROTestProvider {
  ensureFolderPath (path) {
    this.folderPath = path
  }

  listFolderContentsFromPath (path) {
    this.folderPath = path
    return ['dummy']
  }
}

describe('Read-only provider registered, so copy method calls remain stubbed out', function () {
  this.timeout(process.env.TIMEOUT || 5000)

  let tymlyService, cloudstorageService

  const provider = new ROTestProvider()

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
    expect(remoteName).to.be.null()
  })
  it('copyFileToLocalPath', async () => {
    const localName = await cloudstorageService.copyFileToLocalPath('remote.file', 'local')
    expect(localName).to.be.null()
  })

  after('shut down Tymly', async () => {
    await tymlyService.shutdown()
  })
})
