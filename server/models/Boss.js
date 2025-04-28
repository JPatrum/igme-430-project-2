const mongoose = require('mongoose');
const _ = require('underscore');

const setName = (name) => _.escape(name).trim();

const BossSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    set: setName,
  },
  mod: {
    type: String,
    required: true,
    trim: true,
    set: setName,
  },
  difficulty: {
    type: String,
    required: true,
    trim: true,
    set: setName,
  },
  maxHP: {
    type: Number,
    min: 0,
    required: true,
  },
  globalPlacement: {
    type: Number,
    min: 1,
    required: true,
  },
  video: {
    type: String,
    required: true,
    trim: true,
  },
  isLegacy: {
    type: Boolean,
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

BossSchema.statics.toAPI = (doc) => ({
  name: doc.name,
  mod: doc.mod,
  difficulty: doc.difficulty,
  maxHP: doc.maxHP,
  globalPlacement: doc.globalPlacement,
  video: doc.video,
});

const BossModel = mongoose.model('Quiz', BossSchema);
module.exports = BossModel;
