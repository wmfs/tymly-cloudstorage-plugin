/* eslint-env mocha */

const chai = require('chai')
chai.use(require('dirty-chai'))
const expect = chai.expect

const tymly = require('@wmfs/tymly')
const path = require('path')

describe('No provider registered, so calling methods has no effect', function () {
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

  after('shut down Tymly', async () => {
    await tymlyService.shutdown()
  })
})
