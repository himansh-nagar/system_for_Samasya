const { ROLE } = require('../data')

function canView(user, write) {
  return (
    user.role === ROLE.ADMIN ||
    write.userId === user.id
  )
}

function scoped(user, writes) {
  if (user.role === ROLE.ADMIN) return writes
  return writes.filter(write => write.userId === user.id)
}

function canVerify(user, write) {
    if(user.role === ROLE.ADMIN){
        return write.userId === user.id
    }
}

module.exports = {
  canView,
  scoped,
  canVerify
}