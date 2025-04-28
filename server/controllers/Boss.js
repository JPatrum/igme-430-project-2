const models = require('../models');

const { Boss } = models;

const mainList = (req, res) => res.render('list');

const aboutPage = (req, res) => {
  // TODO
};

const addBoss = async (req, res) => {
  if (!req.body.name || !req.body.mod || !req.body.difficulty || !req.body.maxHP
    || !req.body.globalPlacement || !req.body.video || !req.body.isLegacy) {
    return res.status(400).json({ error: 'Missing required param(s).' });
  }

  const bossData = {
    name: req.body.name,
    mod: req.body.mod,
    difficulty: req.body.difficulty,
    maxHP: req.body.maxHP,
    globalPlacement: req.body.globalPlacement,
    video: req.body.video,
    isLegacy: req.body.isLegacy,
  };

  try {
    const newBoss = new Boss(bossData);
    await newBoss.save();
    return res.status(201).json({ name: newBoss.name });
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Entry already exists.' });
    }
    return res.status(500).json({ error: 'An error occured making list entry.' });
  }
};

const getMain = async (req, res) => {
  try {
    // TODO

    return res.json({ list: docs });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Error retrieving entries.' });
  }
};

const getLegacy = async (req, res) => {
  try {
    // TODO

    return res.json({ list: docs });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Error retrieving entries.' });
  }
};

module.exports = {
  mainList,
  aboutPage,
  addBoss,
  getMain,
  getLegacy,
};
