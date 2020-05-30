import styled from 'styled-components';
import searchIcon from 'assets/icons/search.svg';

const Input = styled.input`
  width: 250px;
  height: 30px;
  border-radius: ${({ theme }) => theme.borderRadius};
  border: 1px solid ${({ theme }) => theme.gray100};
  background-image: url(${searchIcon});
  background-size: 11px;
  background-repeat: no-repeat;
  background-position: 10px center;
  padding: 0 30px;
`;

export default Input;
