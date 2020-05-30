import { css } from 'styled-components';

const mixins = {
  flexCenter: css`
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  flexBetween: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
  alignCenter: css`
    display: flex;
    align-items: center;
  `,
  cellHeight: css`
    height: 50px;
    max-height: 50px;
  `,
};

export default mixins;
