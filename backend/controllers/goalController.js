const asyncHandler = require('express-async-handler'); // middleware for handling exceptions inside of async express routes -- to not use try/catch, and use error handler instead
const Goal = require('../models/goalModel');

//@desc gets goals 
//@route GET api/goals
//@access private 
const getGoals = asyncHandler(async (req, res) => { //using mongoose to interact with the database returns a promise
    const goals = await Goal.find();
    res.status(200).json(goals);
});

//@desc sets goal
//@route POST api/goals
//@access private 
const setGoal = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400); //client error/bad request, 400 status 
        throw new Error('please add a text field');
    }
    const goal = await Goal.create({
        text: req.body.text
    })
    res.status(200).json(goal);
});

//@desc update goal
//@route UPDATE api/goals/:id
//@access private 
const updateGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id);
    if (!goal) {
        res.status(400);
        throw new Error('Goal not found');
    }
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new: true,}) 
    res.status(200).json(updatedGoal);
});

//@desc delets goal
//@route DELETE api/goals/:id
//@access private 
const deleteGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id);
    if (!goal) {
        res.status(400);
        throw new Error('goal not found');
    }
    await goal.remove(); 
    res.status(200).json({id: req.params.id});
})

module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal,
}