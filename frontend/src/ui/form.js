import styled from 'styled-components';
import TextField from '@mui/material/TextField';

export const InputField = styled(TextField)`
  box-shadow: rgb(0 17 51 / 7%) 0px 3px 15px;
  & label.Mui-focused {
    color: #bb86fc;
  }
  & .MuiOutlinedInput-root {
    &.Mui-focused fieldset {
      border: 2px solid black;
    }
  }
`;

export const FormWrapper = styled.form`
  width: 70%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const SubmitButton = styled.button`
  width: 100%;
  margin: 20px 0;
  background-color: #bb86fc;
  border: none;
  //border: 1px solid black;
  border-radius: 5px;
  padding: 15px;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    transform: scale(0.98);
  }
`;
