import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login, reset } from '../features/auth/authSlice';
import Spinner from '../components/Spinner';

import { Heading1, HeadingContainer } from '../ui/heading';
import { FormWrapper, InputField, SubmitButton } from '../ui/form';

function Login () {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })
    const { name, email, password, password2 } = formData;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, isLoading, isError, isSuccess, message } = useSelector((state)=> state.auth);

    useEffect(()=> {
        if (isError) toast.error(message);
        if (isSuccess || user) navigate('/myDashboard');
        dispatch(reset());
    }, [user, isError, isSuccess, message, navigate, dispatch])
    
    const onChange = (e) => {
        setFormData((prevState)=> ({
            ...prevState, 
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const userData = {
            email, password
        }
        dispatch(login(userData));

    }

    if (isLoading) return <Spinner/>

    return (
        <>
          <HeadingContainer>
            <Heading1>
              Login
            </Heading1>
            <p>Login and continue where you left off!</p>
          </HeadingContainer>
    
          <FormWrapper onSubmit={onSubmit}>
              <div>
                <InputField
                  fullWidth
                  required
                  type='email'
                  id='email'
                  name='email'
                  value={email}
                  label="Enter email" variant="outlined"
                  onChange={onChange}
                />
              </div>
              <div>
                <InputField
                  fullWidth
                  required
                  type='password'
                  autoComplete="current-password"
                  id='password'
                  name='password'
                  value={password}
                  label ='Enter password'
                  onChange={onChange}
                />
              </div>
              <div>
                <SubmitButton type='submit'>
                  Submit
                </SubmitButton>
              </div>
          </FormWrapper>
        </>
      )
}

export default Login;

