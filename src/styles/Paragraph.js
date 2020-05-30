import styled from 'styled-components';

const Button = styled.p`
  font-size: ${({ theme }) => theme.fontSize.m};
  font-weight: ${({ theme }) => theme.regular};
`;

export default Button;
