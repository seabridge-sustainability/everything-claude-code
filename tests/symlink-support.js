'use strict';

/**
 * Windows refuses to create symlinks without Developer Mode or admin rights
 * (EPERM, syscall "symlink"). Tests that need a real symlink skip on exactly
 * that error instead of failing; every other error, and every other platform,
 * still fails as before.
 */
function isSymlinkPermissionError(error) {
  return process.platform === 'win32'
    && !!error
    && (error.code === 'EPERM' || error.code === 'EACCES')
    && error.syscall === 'symlink';
}

const SYMLINK_SKIP_REASON = 'symlinks unavailable (Windows without Developer Mode)';

module.exports = { isSymlinkPermissionError, SYMLINK_SKIP_REASON };
