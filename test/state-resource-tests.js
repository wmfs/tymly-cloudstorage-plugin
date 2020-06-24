/* eslint-env mocha */

const chai = require('chai')
chai.use(require('dirty-chai'))
const expect = chai.expect

const tymly = require('@wmfs/tymly')
const path = require('path')

const EnsureCloudStorageFolder = require('../lib/components/state-resources/ensure-cloud-storage-folder')
const GetCloudStorageContents = require('../lib/components/state-resources/get-cloud-storage-contents')
const CopyFileToRemoteFolder = require('../lib/components/state-resources/copy-file-to-remote-folder')
const CopyFileToLocalFolder = require('../lib/components/state-resources/copy-file-to-local-folder')

const TestProvider = require('./test-provider')

describe('State Resource Tests', function () {
  this.timeout(process.env.TIMEOUT || 5000)

  let tymlyService, env

  const defaultProvider = new TestProvider()
  const namedProvider = new TestProvider()

  before('boot Tymly', async () => {
    const services = await tymly.boot(
      {
        pluginPaths: [
          path.resolve(__dirname, './../lib')
        ]
      }
    )

    tymlyService = services.tymly
    env = { bootedServices: services }

    services.cloudstorage.registerProvider(defaultProvider)
    services.cloudstorage.registerProvider(namedProvider, 'chosen')
  })

  const providers = [
    ['default', {}, defaultProvider],
    ['named', { provider: 'chosen' }, namedProvider],
    ['unknown so revert to default', { provider: 'unknown' }, defaultProvider]
  ]
  for (const [t, config, provider] of providers) {
    describe(`${t} provider`, () => {
      const context = {
        sendTaskSuccess: result => {
          context.result = result
        },
        sendTaskFailure: err => {
          throw err
        }
      }

      it('ensureFolderPath', async () => {
        const ensureCloudStorageFolder = new EnsureCloudStorageFolder()
        ensureCloudStorageFolder.init(config, env)
        await ensureCloudStorageFolder.run({ remoteFolderPath: 'remote/path1' }, context)
        expect(provider.folderPath).to.eql('remote/path1')
      })

      it('listFolderContentsFromPath', async () => {
        const getCloudStorageContents = new GetCloudStorageContents()
        getCloudStorageContents.init(config, env)
        await getCloudStorageContents.run({ remoteFolderPath: 'remote/path2' }, context)
        expect(provider.folderPath).to.eql('remote/path2')
        expect(context.result).to.eql(['dummy'])
      })

      it('copyFileToRemotePath', async () => {
        const copyFileToRemoteFolder = new CopyFileToRemoteFolder()
        copyFileToRemoteFolder.init(config, env)
        await copyFileToRemoteFolder.run(
          {
            localFilePath: 'local.file',
            remoteFolderPath: 'remote'
          },
          context
        )

        expect(provider.filePath).to.eql('local.file')
        expect(provider.folderPath).to.eql('remote')
        expect(provider.remoteFileName).to.eql(null)
        expect(context.result).to.eql('remote/local.file')
      })

      it('copyFileToRemotePath with filename', async () => {
        const copyFileToRemoteFolder = new CopyFileToRemoteFolder()
        copyFileToRemoteFolder.init(config, env)
        await copyFileToRemoteFolder.run(
          {
            localFilePath: 'local.file',
            remoteFolderPath: 'remote',
            remoteFileName: 'new.name'
          },
          context
        )
        expect(provider.filePath).to.eql('local.file')
        expect(provider.folderPath).to.eql('remote')
        expect(provider.remoteFileName).to.eql('new.name')
        expect(context.result).to.eql('remote/new.name')
      })

      it('copyFileToLocalPath', async () => {
        const copyFileToLocalFolder = new CopyFileToLocalFolder()
        copyFileToLocalFolder.init(config, env)
        await copyFileToLocalFolder.run(
          {
            remoteFilePath: 'file.name',
            localFolderPath: 'local'
          },
          context
        )
        expect(provider.folderPath).to.eql('local')
        expect(provider.filePath).to.eql('file.name')
        expect(context.result).to.eql('local/file.name')
      })
    })
  } // for ...

  after('shut down Tymly', async () => {
    await tymlyService.shutdown()
  })
})
