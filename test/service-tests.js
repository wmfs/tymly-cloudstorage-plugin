/* eslint-env mocha */

const chai = require('chai')
chai.use(require('dirty-chai'))
const expect = chai.expect

const tymly = require('@wmfs/tymly')
const path = require('path')

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

  after('shut down Tymly', async () => {
    await tymlyService.shutdown()
  })
})
