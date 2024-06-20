module.exports = function applyLaunchesToContents () {
  return function (event) {
    const {
      templateTitle,
      provider,
      remoteFolderPath,
      contents
    } = event

    return contents.map(item => {
      if (item.__metadata.type === 'SP.Folder') {
        item.icon = 'folder'
        item.launches = [
          {
            title: 'View folder',
            stateMachineName: 'cloudstorage_documentViewer_1_0',
            input: {
              remoteFolderPath: remoteFolderPath + '/' + item.Name,
              templateTitle,
              provider
            }
          }
        ]
      }

      if (item.__metadata.type === 'SP.File') {
        item.icon = 'description'
        item.launches = [
          {
            title: 'Download file',
            stateMachineName: 'cloudstorage_downloadFile_1_0',
            input: {
              provider,
              remoteFolderPath,
              remoteFileName: item.Name
            }
          }
        ]
      }

      return item
    })
  }
}
