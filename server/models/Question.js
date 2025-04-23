const mongoose = require('mongoose');
const _ = require('underscore');

const setText = (text) => _.escape(text).trim();

const setAll = (obj) => {
    for(let e of obj){
        setText(e);
    }
};

const QuestionSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        trim: true,
        set: setText,
    },
    number: {
        type: Number,
        min: 1,
        unique: true,
        required: true,
    },
    answers: {
        type: Array[String],
        required: true,
        set: setAll,
    },
    correct: {
        type: String,
        required: true,
        trim: true,
        set: setText,
    },
    fromQuiz: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: 'Quiz',
    },
});

QuestionSchema.statics.toAPI = (doc) => ({
    text: doc.text,
    number: doc.number,
    answers: doc.answers,
    correct: doc.correct,
});

const QuestionModel = mongoose.model('Question', QuestionSchema);
module.exports = QuestionModel;