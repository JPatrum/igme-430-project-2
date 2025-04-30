const mongoose = require('mongoose');

const RecordSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },
  boss: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Boss',
  },
  progress: {
    type: Number,
    min: 0,
    required: true,
  },
  video: {
    type: String,
    required: true,
    trim: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

RecordSchema.statics.toAPI = (doc) => ({
  progress: doc.progress,
  video: doc.video,
});

const RecordModel = mongoose.model('Record', RecordSchema);
module.exports = RecordModel;
