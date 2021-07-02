const mongoose = require('mongoose');
// const autoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

let questionSchema = new Schema(
  question_id: {
    type: Number,
    required: true
  },
  product_id: {
    type: String,
    required: true
  },
  question_body: {
    type: String,
    trim: true,
    required: true
  },
  question_date: {
    type: Date,
    default: Date.now
  },
  asker_name: String,
  question_helpfulness: Number,
  reported: {
    type: Boolean,
    default: false
  },
  answers: [{ type: Schema.Types.ObjectId, ref: 'Answer'}]
);

let answerSchema = new Schema(
  answer_id: {
    type: Number,
    required: true
  },
  // question_id: Number,
  body: {
    type: String,
    require: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  answer_name: {
    type: String,
    required: true
  },
  helpfulness: {
    type: Number,
    default: 0
  },
  reported: {
    type: Boolean,
    default: false
  },
  // photos: [{ type: Schema.Types.ObjectId, ref: 'Photo' }]
  photos: [{ id: }]
);

let photoSchema = new Schema(
  id: {
    type: Number,
    require: true
  },
  url: {
    type: String,
    require: true
  }
);


//answerinstance.photos.push(photoinstance);

//questioninstance.answers[answerinstance.answer_id] = answerinstance