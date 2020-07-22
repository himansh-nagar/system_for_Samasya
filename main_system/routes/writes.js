const express = require('express')
const router = express.Router()
const { writes } = require('../data')
const { authUser } = require('../basicAuth')
const { canView, canVerify, scoped } = require('../permissions/write')

router.get('/', authUser, (req, res) => {
  res.json(scoped(req.user, writes))
})

router.get('/:writeId', setwrite, authUser, authGet, (req, res) => {
  res.json(req.write)
})

router.post('/:writeId', setwrite, authUser, authVerify, (req, res) => {
  res.send('Delivery Verified')
})

function setwrite(req, res, next) {
  const writeId = parseInt(req.params.writeId)
  req.write = writes.find(write => write.id === writeId)
  
  if (req.write == null) {
    res.status(404)
    return res.send('not found')
  }
  next()
}

function authGet(req, res, next) {
  if (!canView(req.user, req.write)) {
    res.status(401)
    return res.send('Not Allowed')
  }

  next()
}

function authVerify(req, res, next) {
  if (!canVerify(req.user, req.write)) {
    res.status(401)
    return res.send('Not Allowed')
  }

  next()
}

module.exports = router