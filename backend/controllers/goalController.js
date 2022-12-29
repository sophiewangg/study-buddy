const asyncHandler = require('express-async-handler'); // middleware for handling exceptions inside of async express routes -- to not use try/catch, and use error handler instead

//@desc gets goals 
//@route GET api/goals
//@access private 
const getGoals = asyncHandler(async (req, res) => { //using mongoose to interact with the database returns a promise
    res.status(200).json({message: "get goals"});
});

//@desc sets goal
//@route POST api/goals
//@access private 
const setGoal = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400); //client error/bad request, 400 status 
        throw new Error('please add a text field');
    }
    res.status(200).json({message: "set goal"});
});

//@desc update goal
//@route UPDATE api/goals/:id
//@access private 
const updateGoal = asyncHandler(async (req, res) => {
    res.status(200).json({message: `update goal ${req.params.id}`});
});

//@desc delets goal
//@route DELETE api/goals/:id
//@access private 
const deleteGoal = asyncHandler(async (req, res) => {
    res.status(200).json({message: `delete goal ${req.params.id}`});
})

module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal,
}