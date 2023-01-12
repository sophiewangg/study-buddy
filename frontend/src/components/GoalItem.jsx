import styled from 'styled-components';
import { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { updateGoalDB, deleteGoalDB } from "../features/goals/goalSlice";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
function GoalItem({goal, removeGoal}) {
  const [isFinished, setIsfinished] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
 
  const onUpdate = (e) => {
    //make the div an editable thing instead
    if (user) dispatch(updateGoalDB(goal._id, e.target.value));
    // add else statement for if user is not signed in
  }

  const onClose = () => {
    if (user) dispatch(deleteGoalDB(goal._id));
    else removeGoal(goal.time);
  }

  const onClick = () => {
    setIsfinished(!isFinished);
    console.log(`this is firing ${isFinished}`);
  }

  return (
    <Goal isFinished={isFinished} onClick ={onClick}>
        <p> {goal.text} </p>
        <ButtonContainer>
          <GoalButton onClick={onUpdate}> <EditIcon/> </GoalButton>
          <GoalButton onClick={onClose}> <DeleteIcon/> </GoalButton>
        </ButtonContainer>
    </Goal>
  )
}

export default GoalItem;

const Goal = styled.div`
  text-align: left;
  box-shadow: rgb(0 17 51 / 7%) 0px 3px 15px;
  border-radius: 5px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  opacity: ${({isFinished}) => isFinished ? "0.5" : "1"};
  text-decoration: ${({isFinished}) => isFinished ? "line-through" : ""};

  &:hover {
    transform: scale(0.99);
  }
`;

const GoalButton = styled.button`
  background-color: white;
  border: none;
  margin: 0 8px;
  cursor: pointer;
`

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
`
//define proptypes