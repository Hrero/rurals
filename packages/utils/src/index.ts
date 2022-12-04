import inquirerOrigin from 'inquirer'
import globOrigin from 'glob'
import * as cosmiconfigOrigin from 'cosmiconfig'
import * as lodashOrigin from 'lodash'
import * as fsExtraOrigin from 'fs-extra'
import * as uuidOrigin from 'uuid'
const debugOrigin = require('debug')

export * from './agent'
export * from './data'
export * from './date'
export * from './expression'
export * from './fs'
export * from './git'
export * from './package'
export * from './simple'
export const inquirer = inquirerOrigin
export const glob = globOrigin
export const cosmiconfig = cosmiconfigOrigin
export const lodash = lodashOrigin
export const fsExtra = fsExtraOrigin
export const getDebug = debugOrigin
export const uuid = uuidOrigin
