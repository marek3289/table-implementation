import styled from 'styled-components';
import { mixins } from 'styles';

const Button = styled.button`
  ${mixins.flexCenter};
  width: 30px;
  height: 30px;
  color: ${({ theme }) => theme.blue};
  font-size: ${({ theme }) => theme.fontSize.s};
  font-weight: ${({ theme }) => theme.regular};
  border: ${({ theme }) => theme.defaultBorder} ${({ theme }) => theme.blue};
  border-radius: ${({ theme }) => theme.borderRadius};
  background-color: inherit;
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
`;

export default Button;
