function isToken(token) {
  if (!isNaN(token) && Number.isInteger(token) && String(token).length === 6) return true
  return false
}

module.exports.isToken = isToken
