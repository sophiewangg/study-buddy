import styled from "styled-components";
import { useState } from "react";
import GoalForm from "../components/GoalForm";
import GoalItem from "../components/GoalItem";

import { Heading1, HeadingContainer } from "../ui/heading";

function Dashboard() {
  const [goals, setGoals] = useState([]);

  // front-end only functions that occur when user is not signed in
  const addGoal = (goal) => {
    const id = Date.now();
    const newGoals = [{ goal, id }, ...goals];
    setGoals(newGoals);
  };

  const deleteGoal = ({ id }) => {
    const removedArr = goals.filter((goal) => goal.id !== id);
    setGoals(removedArr);
  };

  const updateGoal = (text, goal) => {
    if (!text || /^\s*$/.test(text)) return;
    setGoals(
      goals.map((goalItem) => {
        return (goalItem = goalItem.id === goal.id ? { ...goalItem, goal: text } : goalItem);
      })
    );
  };

  return (
    <>
      <HeadingContainer>
        <Heading1> Welcome </Heading1>
        <p> Set some goals and start studying! </p>
      </HeadingContainer>
      <GoalForm goals={goals} addGoal={addGoal} />
      <GoalDisplay>
        {goals.length > 0 && (
          <div>
            {goals.map(({ goal, id }) => {
              return (
                <GoalItem
                  key={id}
                  goal={{ goal: goal, id: id }}
                  deleteGoal={deleteGoal}
                  updateGoal={updateGoal}
                />
              );
            })}
          </div>
        )}
      </GoalDisplay>
    </>
  );
}

export default Dashboard;

const GoalDisplay = styled.div`
  width: 70%;
  min-width: 400px;
  margin: 0 auto;
`;
