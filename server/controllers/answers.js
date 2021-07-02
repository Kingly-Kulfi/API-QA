const models = require('../models');

module.exports = {
  getAnswers: (req, res) => {
    var question = req.params.question_id;
    var page = req.query.page || 1;
    var count = req.query.count || 5;

    models.answers.getAnswers(question, page, count, (err, data) => {
      if (err) {
        res.status(404).send(err);
      } else {
        var result = {
          question,
          page,
          count,
          results: data.rows[0].results
        };
        res.status(200).send(result);
      }
    });
  },

  addAnswer: (req, res) => {
    req.body.photos = JSON.stringify(req.body.photos);
    models.answers.addAnswer(req.params.question_id, req.body, (err, data) => {
      if (err) {
        res.status(403).send(err);
      } else {
        res.send(201);
      }
    });
  },

  rateHelpful: (req, res) => {
    models.answers.rateHelpful(req.params.answer_id, (err) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.send(204);
      }
    })
  },

  reportAnswer: (req, res) => {
    models.answers.reportAnswer(req.params.answer_id, (err) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.send(204);
      }
    })
  }
}