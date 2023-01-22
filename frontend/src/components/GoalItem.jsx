import styled from "styled-components";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateGoalDB, deleteGoalDB } from "../features/goals/goalSlice";

import { InputField } from "../ui/form";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

function GoalItem({ goal, updateGoal, deleteGoal }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isFinished, setIsfinished] = useState(false);
  const [text, setText] = useState(goal.text ?? goal.goal);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onUpdate = (e) => {
    e.preventDefault();
    setIsEditing(!isEditing);
    if (isEditing) {
      if (user) dispatch(updateGoalDB({goalId: goal._id, text: {goalData: text}}));
      else updateGoal(text, goal);
    }
  };

  const onDelete = () => {
    if (user) dispatch(deleteGoalDB(goal._id));
    else deleteGoal(goal);
  };

  const onClick = () => {
    setIsfinished(!isFinished);
  };

  return (
    <Goal isFinished={isFinished}>
      {isEditing ? (
          <Form onSubmit={onUpdate}>
            <InputField
                fullWidth
                id="text"
                name="text"
                label="Update your goal"
                variant="outlined"
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                }}
              />
            <ButtonContainer>
              <GoalButton type="submit">
                <EditIcon />
              </GoalButton>
              <GoalButton onClick={onDelete}>
                <DeleteIcon />
              </GoalButton>
            </ButtonContainer>
          </Form>
      ) : (
        <>
          <p onClick={onClick}> {goal.text ?? goal.goal} </p>
          <ButtonContainer>
            <GoalButton onClick={onUpdate}>
              <EditIcon />
            </GoalButton>
            <GoalButton onClick={onDelete}>
              <DeleteIcon />
            </GoalButton>
          </ButtonContainer>
        </>
      )}
    </Goal>
  );
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
  width: 100%;
  opacity: ${({ isFinished }) => (isFinished ? "0.5" : "1")};
  text-decoration: ${({ isFinished }) => (isFinished ? "line-through" : "")};
  &:hover {
    transform: scale(0.99);
  }
`;

const GoalButton = styled.button`
  background-color: white;
  border: none;
  margin: 0 8px;
  cursor: pointer;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
`

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
`;
