// Checks if user is logged in
const requiresLogin = (req, res, next) => {
  if (!req.session.account) {
    return res.redirect('/');
  }
  return next();
};

// Checks admin perms
const requiresAdmin = (req, res, next) => {
  if (!req.session.account.isAdmin) {
    return res.redirect('/admin');
  }
  return next();
};

// Checks if user is logged out
const requiresLogout = (req, res, next) => {
  if (req.session.account) {
    return res.redirect('/main');
  }

  return next();
};

// FOR HEROKU - checks if connection is secure
const requiresSecure = (req, res, next) => {
  if (req.headers['x-forwarded-proto'] !== 'https') {
    return res.redirect(`https://${req.hostname}${req.url}`);
  }
  return next();
};

// FOR ME - skips secure check because I live dangerously
const bypassSecure = (req, res, next) => {
  next();
};

module.exports.requiresLogin = requiresLogin;
module.exports.requiresLogout = requiresLogout;
module.exports.requiresAdmin = requiresAdmin;
if (process.env.NODE_ENV === 'production') {
  module.exports.requiresSecure = requiresSecure;
} else {
  module.exports.requiresSecure = bypassSecure;
}
