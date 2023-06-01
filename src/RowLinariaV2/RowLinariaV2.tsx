import { css } from '@linaria/core';
import { COLUMNS } from '../constants';

const RowStyled = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  border: 1px solid var(--border-color);
`;

const CellStyled = css`
  flex: 1;
  display: flex;
  box-sizing: border-box;
  padding: 4px;
  border-left: 1px solid var(--border-color);
`;

const RowLinariaV2 = ({ index }: { index: number}) => {
  return (
    <div className={RowStyled}>
      <div className={CellStyled}>
        Row {index + 1}
      </div>
      {
        Array.from({ length: COLUMNS }).map((_, i) => (
          <div className={CellStyled} key={i}>
            {index + 1}
          </div>
        ))
      }
    </div>
  );
}

export default RowLinariaV2;
