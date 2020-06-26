/* eslint-env mocha */

const expect = require('chai').expect

const tymly = require('@wmfs/tymly')
const path = require('path')

const TestProvider = require('./test-provider')

describe('Provider registration', function () {
  let tymlyService, cloudstorageService

  const provider1 = new TestProvider('one')
  const provider2 = new TestProvider('two')
  const provider3 = new TestProvider('three')
  const provider4 = new TestProvider('four')

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
    cloudstorageService.registerProvider(provider1, 'one')
    expect(cloudstorageService.providers_.size).to.eql(1)
    expect(cloudstorageService.defaultProvider_).to.eql(provider1)
  })

  it('register another provider', () => {
    cloudstorageService.registerProvider(provider4, 'two')
    expect(cloudstorageService.providers_.size).to.eql(2)
    expect(cloudstorageService.provider('one')).to.eql(provider1)
    expect(cloudstorageService.provider('two')).to.eql(provider4)
    expect(cloudstorageService.defaultProvider_).to.eql(provider1)
  })

  it('register provider replacing a previous provider', () => {
    cloudstorageService.registerProvider(provider2, 'two')
    expect(cloudstorageService.providers_.size).to.eql(2)
    expect(cloudstorageService.provider('one')).to.eql(provider1)
    expect(cloudstorageService.provider('two')).to.eql(provider2)
    expect(cloudstorageService.defaultProvider_).to.eql(provider1)
  })

  it('register provider, setting as default', () => {
    cloudstorageService.registerProvider(provider4, 'default')
    expect(cloudstorageService.providers_.size).to.eql(2)
    expect(cloudstorageService.provider('one')).to.eql(provider1)
    expect(cloudstorageService.provider('two')).to.eql(provider2)
    expect(cloudstorageService.defaultProvider_).to.eql(provider4)
  })

  it('register provider with own name, also setting as default', () => {
    cloudstorageService.registerProvider(provider3, ['three', 'default'])
    expect(cloudstorageService.providers_.size).to.eql(3)
    expect(cloudstorageService.provider('one')).to.eql(provider1)
    expect(cloudstorageService.provider('two')).to.eql(provider2)
    expect(cloudstorageService.provider('three')).to.eql(provider3)
    expect(cloudstorageService.defaultProvider_).to.eql(provider3)
  })

  after('shut down Tymly', async () => {
    await tymlyService.shutdown()
  })
})
