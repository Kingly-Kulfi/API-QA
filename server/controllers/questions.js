const models = require('../models');

module.exports = {
  getQuestions: (req, res) => {
    var product_id = req.params.product_id || req.query.product_id;

    models.questions.getQuestions(product_id, req.query, (err, data) => {
      if (err) {
        res.status(404).send(err);
      } else {
        var result = {
          product_id: product_id,
          results: data.rows[0].results
        };
        res.status(200).send(result);
      }
    });
  },

  addQuestion: (req, res) => {
    models.questions.addQuestion(req.body, (err) => {
      if (err) {
        res.status(403).send(err);
      } else {
        res.send(201);
      }
    });

  },

  rateHelpful: (req, res) => {
    models.questions.rateHelpful(req.params.question_id, (err) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.send(204);
      }
    })
  },

  reportQuestion: (req, res) => {
    models.questions.reportQuestion(req.params.question_id, (err) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.send(204);
      }
    })
  }
}