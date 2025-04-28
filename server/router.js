const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);

  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);

  app.get('/logout', mid.requiresLogin, controllers.Account.logout);

  app.get('/admin', mid.requiresLogin, controllers.Account.adminPage);
  app.post('/admin', mid.requiresLogin, controllers.Account.toggleAdmin);

  app.get('/main', mid.requiresLogin, controllers.Boss.mainList);
  app.post('/main', mid.requiresLogin, mid.requiresAdmin, controllers.Boss.addBoss);

  app.post('/legacy', mid.requiresLogin, mid.requiresAdmin, controllers.Boss.addBoss);

  app.get('/player', mid.requiresLogin, controllers.Account.playerPage);
  app.post('/player', mid.requiresLogin, controllers.Account.submitRecord);

  app.get('/about', mid.requiresLogin, controllers.Boss.aboutPage);

  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
};

module.exports = router;
