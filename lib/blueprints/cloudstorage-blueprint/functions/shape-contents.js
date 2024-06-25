module.exports = function shapeContents () {
  return function (event) {
    const {
      templateTitle,
      provider,
      remoteFolderPath,
      contents,
      uploadAllowed
    } = event

    const folders = []
    const files = []

    for (const item of contents) {
      if (item.__metadata.type === 'SP.Folder') {
        item.launches = [
          {
            title: 'View folder',
            stateMachineName: 'cloudstorage_viewFolder_1_0',
            input: {
              remoteFolderPath: remoteFolderPath + '/' + item.Name,
              templateTitle,
              provider,
              uploadAllowed
            }
          }
        ]
        folders.push(item)
      }

      if (item.__metadata.type === 'SP.File') {
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
          // {
          //   title: 'Delete file',
          //   stateMachineName: 'cloudstorage_deleteFile_1_0',
          //   input: {
          //     provider,
          //     remoteFolderPath,
          //     remoteFileName: item.Name
          //   }
          // }
        ]
        files.push(item)
      }
    }

    return { folders, files }
  }
}
