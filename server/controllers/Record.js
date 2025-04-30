const models = require('../models');

const { Record, Boss } = models;

// Submit a record on a given entry
// Record submission is unfinished
const submitRecord = async (req, res) => {
  if (!req.body.progress || !req.body.video) {
    return res.status(400).json({ error: 'Missing required param(s).' });
  }
  const boss = await Boss
    .find({ globalPlacement: req.body.currentPlace })
    .lean().exec();
  const recordData = {
    user: req.session.account._id,
    boss: boss._id,
    progress: req.body.progress,
    video: req.body.video,
  };

  try {
    const newRecord = new Record(recordData);
    await newRecord.save();
    return res.status(201).json({ msg: 'Successfully submitted record!' });
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Entry already exists.' });
    }
    return res.status(500).json({ error: 'An error occured making list entry.' });
  }
};

module.exports = {
  submitRecord,
};
