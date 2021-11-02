function allowed(res) {
  res.status(200).json({
    success: true,
  })
}

function denied(res, text) {
  res.status(202).json({
    success: false,
    message: text ? text : null,
  })
}

function notToken(res, text) {
  res.status(404).json({
    success: false,
    message: text ? text : null,
  })
}

function catchError(res, err) {
  res.status(500).json({
    success: false,
    error: err,
  })
}

module.exports.allowed = allowed
module.exports.denied = denied
module.exports.notToken = notToken
module.exports.catchError = catchError
