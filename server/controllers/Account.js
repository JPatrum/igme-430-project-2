const models = require('../models');

const { Account } = models;

const loginPage = (req, res) => res.render('login');

const adminPage = (req, res) => res.render('admin');

// UNUSED, was going to let the player view their own records
// const playerPage = (req, res) => {
//   // TODO
// };

const logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};

// Authenticate and log in
const login = (req, res) => {
  const username = `${req.body.username}`;
  const pass = `${req.body.pass}`;

  if (!username || !pass) {
    return res.status(400).json({ error: 'All fields are required!' });
  }

  return Account.authenticate(username, pass, (err, account) => {
    if (err || !account) {
      return res.status(401).json({ error: 'Wrong username or password!' });
    }

    req.session.account = Account.toAPI(account);

    return res.json({ redirect: '/main' });
  });
};

// Toggles admin perms on & off
const toggleAdmin = async (req, res) => {
  const target = await Account.find({ _id: req.session.account._id });
  target.isAdmin = !target.isAdmin;
  await target.save();
  req.session.account = Account.toAPI(target);
  return res.json({ redirect: '/admin' });
};

// Returns admin status of current user
const getAdminState = (req, res) => {
  const state = req.session.account.isAdmin;
  return res.json({ isAdmin: state });
};

// Create account
const signup = async (req, res) => {
  const username = `${req.body.username}`;
  const pass = `${req.body.pass}`;
  const pass2 = `${req.body.pass2}`;

  if (!username || !pass || !pass2) {
    return res.status(400).json({ error: 'All fields are required!' });
  }

  if (pass !== pass2) {
    return res.status(400).json({ error: 'Passwords do not match!' });
  }

  try {
    const hash = await Account.generateHash(pass);
    const newAccount = new Account({ username, password: hash, isAdmin: false });
    await newAccount.save();
    req.session.account = Account.toAPI(newAccount);
    return res.json({ redirect: '/main' });
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Username already in use!' });
    }
    return res.status(500).json({ error: 'An error occured!' });
  }
};

module.exports = {
  loginPage,
  adminPage,
  // playerPage,
  login,
  logout,
  toggleAdmin,
  getAdminState,
  signup,
};
