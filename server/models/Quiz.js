const mongoose = require('mongoose');
const _ = require('underscore');

const setName = (name) => _.escape(name).trim();

const QuizSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    set: setName,
  },
  isPremium: {
    type: Boolean,
    required: true,
  },
  isPublished: {
    type: Boolean,
    required: true,
  },
  likes: {
    type: Number,
    min: 0,
    required: true,
  },
  owner: {
    type: mongoose.Schema.ObjectID,
    required: true,
    ref: 'Account',
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

QuizSchema.statics.toAPI = (doc) => ({
  name: doc.name,
  isPremium: doc.isPremium,
});

const QuizModel = mongoose.model('Quiz', QuizSchema);
module.exports = QuizModel;
