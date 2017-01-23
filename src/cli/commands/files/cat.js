'use strict'

const waterfall = require('async/waterfall')
const debug = require('debug')
const utils = require('../../utils')
const log = debug('cli:files')
log.error = debug('cli:files:error')

module.exports = {
  command: 'cat <ipfs-path>',

  describe: 'Download IPFS objects',

  builder: {},

  handler (argv) {
    let path = argv['ipfs-path']
    if (path.indexOf('/ipfs/') !== 1) {
      path = path.replace('/ipfs/', '')
    }

    waterfall([
      (cb) => utils.getIPFS(cb),
      (ipfs, cb) => ipfs.files.cat(path, cb)
    ], (err, file) => {
      if (err) {
        throw err
      }

      file.pipe(process.stdout)
    })
  }
}
