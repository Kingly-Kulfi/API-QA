const db = require('../db');

module.exports = {
  getQuestions: (product_id, {page = 1, count = 5}, cb) => {

    const queryString = `SELECT JSON_AGG(
        JSON_BUILD_OBJECT(
          'question_id', q.question_id,
          'question_body', q.question_body,
          'question_date', q.question_date,
          'asker_name', q.asker_name,
          'question_helpfulness', q.question_helpfulness,
          'reported', q.reported,
          'answers', (SELECT COALESCE(JSON_OBJECT_AGG(
            'answer_id', (SELECT JSON_BUILD_OBJECT(
              'id', a.answer_id,
              'body', a.body,
              'date', a.answer_date,
              'answerer_name', a.answerer_name,
              'helpfulness', a.helpfulness,
              'photos', (SELECT COALESCE(JSON_AGG(
                JSON_BUILD_OBJECT(
                  'id', ap.id,
                  'url', ap.url
                )
              ), '[]'::json)))
              FROM answer_photos ap WHERE ap.answer_id = a.answer_id)
            ), '{}'::json)

          FROM answers a WHERE a.reported = false AND a.question_id = q.question_id)
        )
    ) AS results
    FROM
    (SELECT * FROM questions q WHERE (product_id = ${product_id}) LIMIT ${count} OFFSET ${(page - 1) * count}) as q
    `;

    return db.query(queryString)
      .then(res => {
        cb(null, res);
      })
      .catch(err => {
        cb(err);
      })
  },

  addQuestion: ({product_id, body, name, email}, cb) => {
    const queryString = `INSERT INTO questions(product_id, question_body, asker_name, asker_email) VALUES (${product_id}, '${body}', '${name}', '${email}')`;

    return db.query(queryString)
      .then(res => {
        cb(null);
      })
      .catch(err => {
        cb(err);
      })
  },

  rateHelpful: (question_id, cb) => {
    const queryString = `UPDATE questions SET question_helpfulness = question_helpfulness + 1 WHERE question_id = ${question_id}`;

    return db.query(queryString)
      .then(res => {
        cb(null);
      })
      .catch(err => {
        cb(err);
      })
  },

  reportQuestion: (question_id, cb) => {
    const queryString = `UPDATE questions SET reported = true WHERE question_id = ${question_id}`;

    return db.query(queryString)
      .then(res => {
        cb(null);
      })
      .catch(err => {
        cb(err);
      })
  }
}