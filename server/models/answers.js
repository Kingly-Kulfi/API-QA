const db = require('../db');

module.exports = {
  getAnswers: (question_id, page = 1, count = 5, cb) => {
    const queryString = `SELECT COALESCE(JSON_AGG(
      JSON_BUILD_OBJECT(
        'answer_id', a.answer_id,
        'body', a.body,
        'date', a.answer_date,
        'answerer_name', a.answerer_name,
        'helpfulness', a.helpfulness,
        'photos', (SELECT COALESCE(JSON_AGG(
          JSON_BUILD_OBJECT(
            'id', ap.id,
            'url', ap.url
          )
        ), '[]'::json)
        FROM answer_photos ap WHERE ap.answer_id = a.answer_id)
      )
  ), '[]'::json) AS results
  FROM
  (SELECT * FROM answers a WHERE (question_id = ${question_id}) LIMIT ${count} OFFSET ${(page - 1) * count}) as a
  `;

  return db.query(queryString)
    .then(res => {
      cb(null, res);
    })
    .catch(err => {
      cb(err);
    })

  },

  addAnswer: (question_id, {body, name, email, photos}, cb) => {
    const queryString = `WITH insertAns AS (
        INSERT INTO answers(question_id, body, answerer_name, answerer_email)
          VALUES (${question_id}, '${body}', '${name}', '${email}')
          RETURNING answer_id
        )
        INSERT INTO answer_photos(answer_id, url)
          SELECT insertAns.answer_id,
            json_array_elements_text('${photos}')
          FROM insertAns
      `;

    return db.query(queryString)
      .then(res => {
        cb(null, res);
      })
      .catch(err => {
        cb(err);
      })
  },

  rateHelpful: (answer_id, cb) => {
    const queryString = `UPDATE answers SET helpfulness = helpfulness + 1 WHERE answer_id = ${answer_id}`;

    return db.query(queryString)
      .then(res => {
        cb(null);
      })
      .catch(err => {
        cb(err);
      })
  },

  reportAnswer: (answer_id, cb) => {
    const queryString = `UPDATE answers SET reported = true WHERE answer_id = ${answer_id}`;

    return db.query(queryString)
      .then(res => {
        cb(null);
      })
      .catch(err => {
        cb(err);
      })
  }
}