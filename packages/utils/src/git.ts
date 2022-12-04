import * as path from "path";
import * as fs from "fs";
const exec = require('child_process').execSync;

export function getGitInfo({cwd = null, throwOut = true} = {}) {
  let user, email, branch, remote
  try {
    // cwd null 默认继承父进程当前的cwd
    user = exec('git config user.name', {cwd: cwd, stdio: [null], timeout: 2000}).toString().trim();
    email = exec('git config user.email', {cwd: cwd, stdio: [null], timeout: 2000}).toString().trim();
    branch = getCurrentGitBranch()
    remote = exec('git remote get-url origin', {cwd: cwd, stdio: [null], timeout: 2000}).toString().trim();
  } catch (err) {
    if(throwOut){
      console.warn("getGitInfo error %O", err)
    }

    return {}
  }
  return {
    user,
    email,
    branch,
    remote
  }
}

export function getGitGroupRep({cwd = null} = {}) {
  var remote = '' , matched
  try {
    remote = exec('git remote get-url origin', {cwd: cwd, stdio: [null], timeout: 2000}).toString().trim();
    matched = remote.match(/([^/:]+)\/([^/:]+)\.git/) || []
  } catch (err) {
    return {}
  }
  return {
    remote,
    group: matched[1] || '',
    rep: matched[2] || ''
  }
}

export function getDiDiGitSshUrl({cwd = null} = {}) {
  var remote = ''
  try {
    remote = exec('git remote get-url origin', {cwd: cwd, stdio: [null], timeout: 2000}).toString().trim();
    if(!/(git.xiaojukeji.com|git@git.xiaojukeji.com)/.test(remote)){ return {
      errMsg: '当前仓库 origin 非滴滴 gitlab'
    }}
    // git@git.xiaojukeji.com:serverless-team/demos/nodejs-helloworld-koa.git
    // https://git.xiaojukeji.com/serverless-team/demos/nodejs-helloworld-koa.git
    // git@git.xiaojukeji.com:serverless-team/serverless-cli.git
    // https://git.xiaojukeji.com/serverless-team/serverless-cli.git
  } catch (err) { return {
    errMsg: '获取当前仓库 origin 地址异常'
  } }
  return {
    gitSshUrl: remote.replace('https://git.xiaojukeji.com/', 'git@git.xiaojukeji.com:')
  }
}

export function getCurrentGitBranch({cwd = null} = {}) {
  return exec('git rev-parse --abbrev-ref HEAD', {cwd: cwd, stdio: [null], timeout: 2000}).toString().trim();
}

export const isGitProject = function ({cwd = null} = {}) {
  let gitPath = path.join(cwd || process.cwd(), '.git')
  return isGitDirectory(gitPath)
}

export const isGitDirectory = (path) => {
  try {
    fs.statSync(path + '/HEAD');
    fs.statSync(path + '/objects');
    fs.statSync(path + '/refs');
    fs.statSync(path + '/config');

    return true;
  } catch (error) {
    return false;
  }
};

export const getGitRemoteBranchs = function ({cwd = null} = {}) {
  if (isGitProject()) {
    var branch = exec('git branch  --remotes', {cwd: cwd, stdio: [null], timeout: 2000}).toString().trim();
    if (branch){
      return branch.replace(/ /g, '').split('\n')
    } else {
      return []
    }
  } else {
    throw new Error('当前目录非git工程')
  }
}

export const getGitBranchLastLog = function (branch, format = '%C(yellow)%h%Creset message %C(yellow)%s%Creset <%an>', cwd = null) {
  return exec(`git log -1 --pretty=format:'${format}' ${branch}`, {cwd: cwd, stdio: [null], timeout: 2000}).toString().trim()
}
export const getGitCommit = function (branch) {
  return exec(`git rev-parse ${branch}`).toString().trim()
}
export const isGitClear = function ({cwd = null} = {}) {
  let result = exec(`git status --porcelain`, {cwd: cwd, stdio: [null], timeout: 2000}).toString().trim()
  return !result
}


export const isGitSync = function ({branch = ''} = {}) {
  var currentBranch = branch || getCurrentGitBranch()
  var localCommitId = getGitBranchLastLog(currentBranch, '%h')
  var remoteCommitId = ''
  try {
    remoteCommitId = getGitBranchLastLog(`origin/${currentBranch}`, '%h')
  }catch (e) {
    return {
      isSync: false,
      msg: `分支${currentBranch}远端不存在`
    }
  }

  if (localCommitId != remoteCommitId) {
    return {
      isSync: false,
      msg: `分支${currentBranch}与远端不同步`
    }
  }

  return {
    isSync: true
  }
}
