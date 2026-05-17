const express = require('express');
const router = express.Router();
const candidateController = require('../controllers/candidateController');

router.post('/', candidateController.addCandidate);
router.get('/', candidateController.getAllCandidates);
router.post('/match', candidateController.matchCandidates);

module.exports = router;
