const router = require('express').Router();
const controller = require('./controllers');

router.get('/questions/:product_id', controller.questions.getQuestions);
router.get('/questions', controller.questions.getQuestions);
router.post('/questions', controller.questions.addQuestion);

router.get('/questions/:question_id/answers', controller.answers.getAnswers);
router.post('/questions/:question_id/answers', controller.answers.addAnswer);

router.put('/questions/:question_id/helpful', controller.questions.rateHelpful);
router.put('/questions/:question_id/report', controller.questions.reportQuestion);

router.put('/answers/:answer_id/helpful', controller.answers.rateHelpful);
router.put('/answers/:answer_id/report', controller.answers.reportAnswer);

module.exports = router;
