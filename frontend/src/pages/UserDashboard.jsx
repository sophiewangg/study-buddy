import styled from 'styled-components';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import GoalForm from '../components/GoalForm';
import GoalItem from '../components/GoalItem';
import Spinner from '../components/Spinner';
import { getGoalsDB } from '../features/goals/goalSlice';

import { Heading1, HeadingContainer } from '../ui/heading';

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { goals, isLoading, isError, message } = useSelector((state) => state.goals);

  useEffect(() => {
    if (isError) console.log(message);
    if (!user) navigate('/login');

    dispatch(getGoalsDB());

    // return () => { //cleanup function
    //   dispatch(reset());
    // }
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <HeadingContainer>
        <Heading1> Welcome {user && user.name} </Heading1>
        <p> Set some goals and start studying! </p>
      </HeadingContainer>
      <GoalForm />
      <GoalDisplay>
        {goals.length > 0 && (
          <div>
            {goals &&
              goals.map((goal) => {
                return <GoalItem key={goal._id} goal={goal} />;
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
  margin: 0 auto;
`;
