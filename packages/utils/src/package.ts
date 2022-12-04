import readPkg from 'read-pkg'
import fs from 'fs'
import path from 'path'

export const resolvePkg = function (context: string) {
  var pkg: any = {}
  if (fs.existsSync(path.join(context, 'package.json'))) {
    pkg = readPkg.sync({cwd: context})
  }
  pkg.devDependencies = pkg.devDependencies || {}
  pkg.dependencies = pkg.dependencies || {}

  return pkg
}
