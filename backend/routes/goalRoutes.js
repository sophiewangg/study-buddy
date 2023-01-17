//each resource in API will have its own route file
const express = require('express'); //common js syntax 
const router = express.Router();
const { getGoalsDB, setGoalDB, updateGoalDB, deleteGoalDB } = require('../controllers/goalController');

const {protect} = require('../middleware/authMiddleware');

router.route('/').get(protect, getGoalsDB).post(protect, setGoalDB);
router.route('/:id').put(protect, updateGoalDB).delete(protect, deleteGoalDB);

module.exports = router;