import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createGoal } from "../features/goals/goalSlice";

function GoalForm({ addGoal }) {

    const [text, setText] = useState('');
    const { user } = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    const onSubmit = (e) => {
        e.preventDefault();
        if (user) dispatch(createGoal({text}));
        else addGoal({text}); 
        setText('');
    }

  return (
    <section className="form">
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <input type="text" name="text" id="text" placeholder="Enter your goals" value={text} onChange={(e)=>{ setText(e.target.value)}}/>
            </div>
            <div className="form-group">
                <button className="btn btn-block" type="submit">Add goal</button>
            </div>
        </form>
    </section>
  )
}

export default GoalForm