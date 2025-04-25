const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);

  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);

  app.get('/logout', mid.requiresLogin, controllers.Account.logout);

  app.get('/premium', mid.requiresLogin, controllers.Account.premiumPage);
  app.post('/premium', mid.requiresLogin, controllers.Account.togglePremium);

  app.get('/browse', mid.requiresLogin, controllers.Quiz.browsePage);
  app.post('/browse', mid.requiresLogin, controllers.Quiz.likeQuiz);

  app.get('/myquizzes', mid.requiresLogin, controllers.Quiz.myQuizzes);
  app.post('/myquizzes', mid.requiresLogin, controllers.Quiz.makeQuiz);

  app.get('/make', mid.requiresLogin, mid.requiresPremium, controllers.Question.makerPage);
  app.post('/make', mid.requiresLogin, mid.requiresPremium, controllers.Question.makeQuestion);

  app.get('/play', mid.requiresLogin, controllers.Quiz.playerPage);
  app.post('/play', mid.requiresLogin, controllers.Quiz.likeQuiz);

  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
};

module.exports = router;
