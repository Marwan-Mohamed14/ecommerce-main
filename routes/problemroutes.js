// routes/problemRoutes.js
const express = require('express');
const router = express.Router();
const problemController = require('../controllers/problemcontroller');

router.get('/', problemController.viewProblems);


router.post('/report-problem', problemController.submitProblem);

module.exports = router;

