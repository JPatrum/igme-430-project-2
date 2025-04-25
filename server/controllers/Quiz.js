const models = require('../models');

const { Quiz } = models;

const browsePage = (req, res) => {
  // TODO
  // getQuizzes with name param
};

const playerPage = (req, res) => {
  // TODO
  // Set the session quiz to the quiz being played
};

const myQuizzes = (req, res) => {
  // TODO
  // getQuizzes with owner param
};

const makeQuiz = async (req, res) => {
  if (!req.body.name || !req.body.isPremium) {
    return res.status(400).json({ error: 'Missing required param(s).' });
  }

  const quizData = {
    name: req.body.name,
    isPremium: req.body.isPremium,
    isPublished: false,
    likes: 0,
    owner: req.session.account._id,
  };

  try {
    const newQuiz = new Quiz(quizData);
    await newQuiz.save();
    return res.status(201).json({ name: newQuiz.name });
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Quiz already exists.' });
    }
    return res.status(500).json({ error: 'An error occured making quiz.' });
  }
};

const likeQuiz = async (req, res) => {
  // TODO
  // Check session acount for if already liked
  // Use session quiz, increment likes and save
  // If already liked, decrement likes and save
  // Add quiz ID to liked quizzes in session account and save
};

const getQuizzes = async (req, res) => {
  try {
    if (req.body.name) {
      const query = { name: req.body.name };
      const docs = await Quiz.find(query).select('name isPremium isPublished likes').lean().exec();

      return res.json({ quizzes: docs });
    }

    const query = { owner: req.session.account._id };
    const docs = await Quiz.find(query).select('name isPremium isPublished likes').lean().exec();

    return res.json({ quizzes: docs });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Error retrieving quizzes.' });
  }
};

module.exports = {
  browsePage,
  playerPage,
  myQuizzes,
  makeQuiz,
  likeQuiz,
  getQuizzes,
};
