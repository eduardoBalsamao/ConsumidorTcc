import styled from 'styled-components';
import { Typography } from '@mui/material';


const LoginTitle = styled(({ ...otherProps }) => <Typography {...otherProps} />)`
    text-transform: uppercase;
    color: ${props => props.textColor || '#FFFFFF'};
`;
export default LoginTitle; 