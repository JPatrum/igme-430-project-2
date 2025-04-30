const models = require('../models');

const { Boss } = models;

const mainList = (req, res) => res.render('list');

const aboutPage = (req, res) => res.render('about');

// Recursively update list placements to make room for new entry
const prepInsert = async (placement) => {
  const target = await Boss.find({ globalPlacement: placement }).lean.exec();
  if (target) {
    await prepInsert(placement + 1);
    target.globalPlacement += 1;
    await target.save();
  }
};

// Add an entry to the list
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
    await prepInsert(newBoss.globalPlacement);
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

// Get main list - legacy filtered out
const getMain = async (req, res) => {
  try {
    const query = { isLegacy: false };
    const docs = await Boss.find(query)
      .select('name mod difficulty maxHP globalPlacement video')
      .lean().exec();
    return res.json({ list: docs });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Error retrieving entries.' });
  }
};

// Get legacy list - no filter
const getLegacy = async (req, res) => {
  try {
    const docs = await Boss.find({});
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
