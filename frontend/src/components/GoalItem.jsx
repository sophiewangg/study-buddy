import { useSelector, useDispatch } from "react-redux";
import { deleteGoal } from "../features/goals/goalSlice";

function GoalItem({goal, removeGoal}) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
 
  const onClose = () => {
    if (user) dispatch(deleteGoal(goal._id));
    else removeGoal(goal.time);
  }

  return (
    <div className="goal">
        <div>
            {user && new Date(goal.createdAt).toLocaleString('en-US')}
        </div>
        <h2> {goal.text} </h2>
        <button className="close" onClick={onClose}>x</button>
    </div>
  )
}

export default GoalItem