/* eslint-env mocha */

const expect = require('chai').expect

const tymly = require('@wmfs/tymly')
const path = require('path')

const TestProvider = require('./test-provider')

describe('Multiple providers registered', function () {
  this.timeout(process.env.TIMEOUT || 5000)

  let tymlyService, cloudstorageService

  const firstProvider = new TestProvider('-first')
  const secondProvider = new TestProvider('-second')

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

    cloudstorageService.registerProvider(firstProvider, 'first')
    cloudstorageService.registerProvider(secondProvider, 'second')
  })

  describe('use default provider', () => {
    it('ensureFolderPath', () => {
      cloudstorageService.ensureFolderPath('remote/test1')
      expect(firstProvider.folderPath).to.eql('remote/test1-first')
    })
    it('listFolderContentsFromPath', async () => {
      const contents = await cloudstorageService.listFolderContentsFromPath('remote/test2')
      expect(firstProvider.folderPath).to.eql('remote/test2-first')
      expect(contents).to.be.eql(['dummy-first'])
    })
    it('copyFileToRemotePath', async () => {
      const remoteName = await cloudstorageService.copyFileToRemotePath('local.test', 'remote')
      expect(firstProvider.filePath).to.eql('local.test-first')
      expect(firstProvider.folderPath).to.eql('remote-first')
      expect(firstProvider.remoteFileName).to.eql(null)
      expect(remoteName).to.eql('remote/local.test-first')
    })
    it('copyFileToRemotePath with filename', async () => {
      const remoteName = await cloudstorageService.copyFileToRemotePath('test.file', 'remote', 'new.name')
      expect(firstProvider.filePath).to.eql('test.file-first')
      expect(firstProvider.folderPath).to.eql('remote-first')
      expect(firstProvider.remoteFileName).to.eql('new.name')
      expect(remoteName).to.eql('remote/new.name-first')
    })
    it('copyFileToLocalPath', async () => {
      const localName = await cloudstorageService.copyFileToLocalPath('remote.test', 'local')
      expect(firstProvider.folderPath).to.eql('local-first')
      expect(firstProvider.filePath).to.eql('remote.test-first')
      expect(localName).to.eql('local/remote.test-first')
    })
  })

  const providers = [
    ['first', firstProvider, 'first'],
    ['second', secondProvider, 'second'],
    ['unknown so reverts to default', firstProvider, 'first']
  ]

  for (const [t, p, s] of providers) {
    describe(`request ${t} provider`, () => {
      it('ensureFolderPath', () => {
        cloudstorageService.provider(t).ensureFolderPath('remote/path1')
        expect(p.folderPath).to.eql(`remote/path1-${s}`)
      })
      it('listFolderContentsFromPath', async () => {
        const contents = await cloudstorageService.provider(t).listFolderContentsFromPath('remote/path2')
        expect(p.folderPath).to.eql(`remote/path2-${s}`)
        expect(contents).to.be.eql([`dummy-${s}`])
      })
      it('copyFileToRemotePath', async () => {
        const remoteName = await cloudstorageService.provider(t).copyFileToRemotePath('local.file', 'remote')
        expect(p.filePath).to.eql(`local.file-${s}`)
        expect(p.folderPath).to.eql(`remote-${s}`)
        expect(p.remoteFileName).to.eql(null)
        expect(remoteName).to.eql(`remote/local.file-${s}`)
      })
      it('copyFileToRemotePath with filename', async () => {
        const remoteName = await cloudstorageService.provider(t).copyFileToRemotePath('local.file', 'remote', 'new.name')
        expect(p.filePath).to.eql(`local.file-${s}`)
        expect(p.folderPath).to.eql(`remote-${s}`)
        expect(p.remoteFileName).to.eql('new.name')
        expect(remoteName).to.eql(`remote/new.name-${s}`)
      })
      it('copyFileToLocalPath', async () => {
        const localName = await cloudstorageService.provider(t).copyFileToLocalPath('thing.to.get', 'local')
        expect(p.folderPath).to.eql(`local-${s}`)
        expect(p.filePath).to.eql(`thing.to.get-${s}`)
        expect(localName).to.eql(`local/thing.to.get-${s}`)
      })
    })
  } // for ...

  after('shut down Tymly', async () => {
    await tymlyService.shutdown()
  })
})
