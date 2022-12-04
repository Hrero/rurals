import * as fs from 'fs'
import fsExtra from 'fs-extra'

export const ensureFileSync = fsExtra.ensureFileSync

export const writeJSON = (path, data, needFormat = true) => {
  if (needFormat) {
    data = JSON.stringify(data, null, 4)
  } else {
    data = JSON.stringify(data)
  }
  return new Promise(function (resolve, reject) {
    module.exports.writeFile(path, data).then(() => {
      resolve({
        path: path
      })
    }, reject)
  })
}

export const getJSON = (path) => {
  return new Promise(function (resolve, reject) {
    module.exports.getFile(path).then(function (data = null) {
      if (data) {
        data = JSON.parse(data)
      }
      return resolve(data)
    }).catch(reject)
  })
}

export const getJSONSync = (path) => {
  try {
    ensureFileSync(path)
    var data = fsExtra.readFileSync(path, 'utf8')
    if (data) {
      data = JSON.parse(data)
    }
  } catch (err) {
    console.debug('getJSONSync path %s error %O', path, err)
    console.warn('getJSONSync path %s error %O', path, err && err.message)
  }
  return data || {}
}

export const writeFile = function (file, data) {
  return new Promise<void>((resolve, reject) => {
    let flags: any = {
      flags: 'w',
      encoding: 'utf8',
      mode: 0o644
    }
    fs.writeFile(file, data, flags, function (err) {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}

export const getFile = function (path) {
  return new Promise((resolve, reject) => {
    fs.exists(path, (exists) => {
      if (!exists) {
        reject(new Error('文件不存在'))
        return
      }
      fs.stat(path, (err, stats) => {
        if (err) {
          reject(err)
          return
        }
        if (stats.isFile()) {
          fs.readFile(path, 'utf8', (err, data) => {
            err ? reject(err) : resolve(data)
          })
        }
      })
    })
  })
}


