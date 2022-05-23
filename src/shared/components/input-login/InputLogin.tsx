import styled from 'styled-components';
import TextField from '@mui/material/TextField';

const InputLogin = styled(TextField)`

  color: #FFFFFF;
  
  & .MuiInputLabel-root{
      color: #FFFFFF;
  }

  &:hover .MuiInputLabel-root{
      color: yellow;
  }
 
  & .MuiInput-input{
      color: #FFFFFF;
  }

  & label.Mui-focused {
    color: yellow;
  }

  & .MuiInput-underline:after {
    border-bottom-color: yellow;
  }

  & .MuiInput-underline:before {
    border-bottom: 2px solid yellow;
  }

  && .MuiInput-underline:hover::before{
    border-bottom: 2px solid yellow;
  }

  & .MuiFilledInput-root{

    &:hover{
         border-bottom-color: yellow;
    }
  }


`;
export default InputLogin;