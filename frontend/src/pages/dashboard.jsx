import { useState } from "react";
import GoalForm from "../components/GoalForm";
import GoalItem from "../components/GoalItem";
import Timer from "../components/Timer";

function Dashboard() {

  const [goals, setGoals] = useState([]);
  const [text, setText] = useState('');
  
  const addGoal = (goal) => {
    if (!goal || /^\s*$/.test(goal)) {
      return;
    }
    const time = Date.now();
    const newGoals = [{goal, time}, ...goals];
    setGoals(newGoals);
  }

  const updateGoal = (goalId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }
    setGoals(prev => prev.map(goal => (goal.id === goalId ? newValue : goal)));
  };

  const removeGoal = goalId => {
    const removedArr = [...goals].filter(goal => goal.Id !== goalId);
    setGoals(removedArr);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addGoal(text);
    console.log(goals);
    setText('');
} 

  //console.log(goals);

  return (
    <>
      <section className="heading">
        <h1> Welcome </h1>
        <p> Goals Dashboard </p>
      </section>
      {/* <Timer/> */}
      <GoalForm addGoal={addGoal}/> 
      <section className="content">
      {
          goals.length > 0 ? (
            <div className="goals">
            { goals.map(({goal, time}) => {
              return <GoalItem key={time} goal={goal} removeGoal={removeGoal}/>
            })}
          </div> 
          ) : (<h3> You have not set any goals </h3>) 
        }
      </section>
    </>
  )
}

export default Dashboard