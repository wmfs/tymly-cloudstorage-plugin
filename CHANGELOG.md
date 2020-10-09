# [1.4.0](https://github.com/wmfs/tymly-cloudstorage-plugin/compare/v1.3.0...v1.4.0) (2020-10-09)


### 🛠 Builds

* **deps:** Update dependencies ([b94c7af](https://github.com/wmfs/tymly-cloudstorage-plugin/commit/b94c7affffb0a0de03a6bf7c574b7f66275cdd47))
* **deps-dev:** bump codecov from 3.7.0 to 3.7.2 ([cca94f0](https://github.com/wmfs/tymly-cloudstorage-plugin/commit/cca94f065ef18b7cc2936a031559efc02d5db941))


### ⚙️ Continuous Integrations

* **circle:** use updated circle node image [skip ci] ([63baa68](https://github.com/wmfs/tymly-cloudstorage-plugin/commit/63baa6878dd0e9fd73911e3ab2d1d768aebb877d))

# [1.3.0](https://github.com/wmfs/tymly-cloudstorage-plugin/compare/v1.2.0...v1.3.0) (2020-06-26)


### ✨ Features

* **service:** Support multiple providers ([3c59f0a](https://github.com/wmfs/tymly-cloudstorage-plugin/commit/3c59f0a0f59393d5ac128d9c69b1789e6cefe84a))
* **state-resources:** Added remoteFolderRoot resource config item ([b089e54](https://github.com/wmfs/tymly-cloudstorage-plugin/commit/b089e54ce536f43fc29afb11b3bc2af7c1e7b027))
* **state-resources:** Configured provider can be override with parameter. ([3e59931](https://github.com/wmfs/tymly-cloudstorage-plugin/commit/3e599316ac5147da85722df849c7065c21ff8afa))
* **state-resources:** State resources can be configured to use a specific storage provider ([fac846a](https://github.com/wmfs/tymly-cloudstorage-plugin/commit/fac846acc0948e958fec638331f796c49b6223ee))


### 🚨 Tests

* Corrected tests ([12666c5](https://github.com/wmfs/tymly-cloudstorage-plugin/commit/12666c5e10db9d2d64fa1a2b921c64e33dd35765))

# [1.2.0](https://github.com/wmfs/tymly-cloudstorage-plugin/compare/v1.1.1...v1.2.0) (2020-06-22)


### ✨ Features

* **state-resources:** Added CopyFileToRemoteFolder state resource ([88cc4c9](https://github.com/wmfs/tymly-cloudstorage-plugin/commit/88cc4c95b6a646d4b05179b42b039649db128056))
* **state-resources:** Added ensureCloudStorageFolder state resource ([4f56509](https://github.com/wmfs/tymly-cloudstorage-plugin/commit/4f5650951059f1ee600274c78dd0ccee13679720))
* **state-resources:** copyFileToLocalFolder state resource ([137d7da](https://github.com/wmfs/tymly-cloudstorage-plugin/commit/137d7daf0b812e4459c13d4bd104e443e17d89d7))
* **state-resources:** getCloudStorageContents state resource ([50098bb](https://github.com/wmfs/tymly-cloudstorage-plugin/commit/50098bb4269c2bb155834f33ce7101854ab6f666))


### 🐛 Bug Fixes

* **service:** Extend copyFileToRemotePath to take optional remote file name parameter ([7f255c1](https://github.com/wmfs/tymly-cloudstorage-plugin/commit/7f255c1ab7d36d0fccff34cb7fd078d6f6a519b9))
* **state-machines:** Setting on remoteFolderPath as parameter name ([7a7b934](https://github.com/wmfs/tymly-cloudstorage-plugin/commit/7a7b9347be13576e8dfe83fdfbf31f4dedf9a892))
* **state-resource:** ensureCloudStorageFolder takes input through parameters not resource config ([d63b29b](https://github.com/wmfs/tymly-cloudstorage-plugin/commit/d63b29b8b62713c4d7732f704b236106f85b1d21))


### 💎 Styles

* Lint fixes ([5e88eac](https://github.com/wmfs/tymly-cloudstorage-plugin/commit/5e88eac04a3079001b2a1043d4ff51ebd854cf52))

## [1.1.1](https://github.com/wmfs/tymly-cloudstorage-plugin/compare/v1.1.0...v1.1.1) (2020-05-29)


### 🐛 Bug Fixes

* add main entry to package.json ([0219f76](https://github.com/wmfs/tymly-cloudstorage-plugin/commit/0219f7655618bb9d5be36ff1fa8a10a96788b08a))

# [1.1.0](https://github.com/wmfs/tymly-cloudstorage-plugin/compare/v1.0.0...v1.1.0) (2020-05-29)


### ✨ Features

* **service:** Allow providers to only supply a subset of the service methods ([eff4df7](https://github.com/wmfs/tymly-cloudstorage-plugin/commit/eff4df7214dcd3698f503f9864fcb837ab5c7302))
* **service:** copyFileToRemotePath & copyFileToLocalPath stubs ([7965a58](https://github.com/wmfs/tymly-cloudstorage-plugin/commit/7965a5820bb4e8958be0217e519149af8f5a5740))
* **service:** ensureFolderPath & listFolderContentsPath ([7653cfd](https://github.com/wmfs/tymly-cloudstorage-plugin/commit/7653cfd64641bfe08b64f2ec26abea79349b5dc1))
* **service:** Hook up provider ([0c662fa](https://github.com/wmfs/tymly-cloudstorage-plugin/commit/0c662faecf996ffafbe835ee303ebd253e5d07ef))


### 🐛 Bug Fixes

* **service:** Only a single provider can be registered. ([3c8715e](https://github.com/wmfs/tymly-cloudstorage-plugin/commit/3c8715ea24926ee0f5f704519ffab80df6b3c7bf))


### 📚 Documentation

* **readme:** Popped a few words into the readme ([8e99e12](https://github.com/wmfs/tymly-cloudstorage-plugin/commit/8e99e125ab3446fcec5525531afc74fb87eb9499))
* **README:** Badges! ([f2afcdb](https://github.com/wmfs/tymly-cloudstorage-plugin/commit/f2afcdbcdf7a1bf9d9e7a8df7b8592fb63808446))
* **README:** Correct license link. ([68f76be](https://github.com/wmfs/tymly-cloudstorage-plugin/commit/68f76bef3900c9f8cb57e71e441204bfabbc321f))


### 🚨 Tests

* Rearranged tests ([aeb2e65](https://github.com/wmfs/tymly-cloudstorage-plugin/commit/aeb2e65131f9d5ec0dc7d6eef4a420ef87227220))
* **service:** Test provider forwarding for remaining service methods ([ddfef2c](https://github.com/wmfs/tymly-cloudstorage-plugin/commit/ddfef2c6e6019d7991bf6fa00028bce161562bb2))


### 💎 Styles

* **lint:** Lint fixes ([d6e9be1](https://github.com/wmfs/tymly-cloudstorage-plugin/commit/d6e9be1e9e5e2736e09d3a8f43e47e6ff83e61c5))

# 1.0.0 (2020-05-21)


### ✨ Features

* **service:** Minimal, do-nothing, service. ([0183808](https://github.com/wmfs/tymly-cloudstorage-plugin/commit/01838081f5d8435fddd99a81ddd442032bad0cc9))


### 🛠 Builds

* All the fiddly bits and bobs to get us started :) ([c20ab77](https://github.com/wmfs/tymly-cloudstorage-plugin/commit/c20ab77e07b6e648062d590fd3e824c3b7515c26))
