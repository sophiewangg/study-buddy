import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createGoalDB } from "../features/goals/goalSlice";

import { InputField, FormWrapper, SubmitButton } from "../ui/form";

function GoalForm({ addGoal }) {
  const [text, setText] = useState("");
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    if (!text || /^\s*$/.test(text)) return;
    if (user) dispatch(createGoalDB({ text }));
    else addGoal(text);
    setText("");
  };

  return (
    <FormWrapper onSubmit={onSubmit}>
      <InputField
        fullWidth
        id="text"
        name="text"
        label="Enter your goals"
        variant="outlined"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
      />
      <SubmitButton type="submit">Add goal</SubmitButton>
    </FormWrapper>
  )
}

export default GoalForm;
