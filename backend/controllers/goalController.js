const asyncHandler = require('express-async-handler'); // middleware for handling exceptions inside of async express routes -- to not use try/catch, and use error handler instead
const Goal = require('../models/goalModel');

//@desc gets goals 
//@route GET api/goals
//@access private 
const getGoalsDB = asyncHandler(async (req, res) => { //using mongoose to interact with the database returns a promise
    const goals = await Goal.find({user: req.user.id});
    res.status(200).json(goals);
});

//@desc sets goal
//@route POST api/goals
//@access private 
const setGoalDB = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400); //client error/bad request, 400 status 
        throw new Error('please add a text field');
    }
    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id,
    })
    res.status(200).json(goal);
});

//@desc update goal
//@route UPDATE api/goals/:id
//@access private 
const updateGoalDB = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id);
    if (!goal) {
        res.status(400);
        throw new Error(`Goal not found ${req.params.id}`);
    }

    //check for user
    if (!req.user) {
        res.status(401);
        throw new Error('User not found');
    }

    //make sure logged in user matches the goal user
    if (goal.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('User not authorized');
    }
    const updatedGoal = await Goal.findByIdAndUpdate({_id: req.params.id}, {text: req.body.goalData}, {new: true}) 
    res.status(200).json(updatedGoal);
});

//@desc deletes goal
//@route DELETE api/goals/:id
//@access private 
const deleteGoalDB = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id);
    if (!goal) {
        res.status(400);
        throw new Error('goal not found');
    }

    //check for user
    if (!req.user) {
        res.status(401);
        throw new Error('User not found');
    }

    //make sure logged in user matches the goal user
    if (goal.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('User not authorized');
    }

    await goal.remove(); 
    res.status(200).json({id: req.params.id});
})

module.exports = {
    getGoalsDB,
    setGoalDB,
    updateGoalDB,
    deleteGoalDB,
}