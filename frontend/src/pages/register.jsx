import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaUser } from 'react-icons/fa';
import { register, reset } from '../features/auth/authSlice';
import Spinner from '../components/Spinner';

import { Heading1, HeadingContainer } from '../ui/heading';
import { InputField, FormWrapper, SubmitButton } from '../ui/form';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, email, password, password2 } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) toast.error(message);
    if (isSuccess || user) navigate('/myDashboard');
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== password2) {
      toast.error('Passwords do not match');
    } else {
      const userData = { name, email, password };
      dispatch(register(userData));
    }
  };

  if (isLoading) return <Spinner />;

  return (
    <>
      <HeadingContainer>
        <Heading1>Register</Heading1>
        <p>Create an account to save your progress!</p>
      </HeadingContainer>

      <section>
        <FormWrapper onSubmit={onSubmit}>
          <div>
            <InputField
              fullWidth
              required
              type="text"
              id="name"
              name="name"
              value={name}
              label="Enter your name"
              onChange={onChange}
            />
          </div>
          <div>
            <InputField
              fullWidth
              required
              type="email"
              id="email"
              name="email"
              value={email}
              label="Enter your email"
              onChange={onChange}
            />
          </div>
          <div>
            <InputField
              fullWidth
              required
              type="password"
              autoComplete="new-password"
              id="password"
              name="password"
              value={password}
              label="Enter password"
              onChange={onChange}
            />
          </div>
          <div>
            <InputField
              fullWidth
              required
              type="password"
              autoComplete="new-password"
              id="password2"
              name="password2"
              value={password2}
              label="Confirm password"
              onChange={onChange}
            />
          </div>
          <div>
            <SubmitButton type="submit">Submit</SubmitButton>
          </div>
        </FormWrapper>
      </section>
    </>
  );
}

export default Register;
