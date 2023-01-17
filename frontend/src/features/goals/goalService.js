import axios from 'axios';

const API_URL = '/api/goals/';

//create new goal
const createGoalDB = async (goalData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  const response = await axios.post(API_URL, goalData, config);
  return response.data;
};

//get user goals
const getGoalsDB = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

//update user goal
const updateGoalDB = async (goalId, goalData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  const response = await axios.put(API_URL + goalId, goalData, config);
  return response.data;
};

//delete user goal
const deleteGoalDB = async (goalId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  const response = await axios.delete(API_URL + goalId, config);
  return response.data;
};

const goalService = {
  createGoalDB,
  getGoalsDB,
  updateGoalDB,
  deleteGoalDB
};

export default goalService;
