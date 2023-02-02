const boom = require('@hapi/boom');

const { config } = require('./../config/config');


//esta no la estamos usando finalmente, se verifica si el usuario tiene un rol en especifico
function checkAdminRole(req, res, next) {
  const user = req.user;
  if (user.role === 'admin') {
    next();
  } else {
    next(boom.unauthorized());
  }
}

//verificamos que role tiene el usuario, le podemos enviar un array de usuarios para darle permisos 'admin','seller'
function checkRoles(...roles) {
  return (req, res, next) => {
    const user = req.user;
    if (roles.includes(user.role)) {
      next();
    } else {
      next(boom.unauthorized());
    }
  }
}

module.exports = { checkAdminRole,checkRoles }
