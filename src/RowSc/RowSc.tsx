import styled from 'styled-components';
import { COLUMNS } from '../constants';

const RowStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  border: 1px solid ${({ theme }) => theme.borderColor};
`;

const CellStyled = styled.div`
  flex: 1;
  display: flex;
  box-sizing: border-box;
  padding: 4px;
  border-left: 1px solid ${({ theme }) => theme.borderColor};
`;

const RowSc = ({ index }: { index: number}) => {
  return (
    <RowStyled>
      <CellStyled>
        Row {index + 1}
      </CellStyled>
      {
        Array.from({ length: COLUMNS }).map((_, i) => (
          <CellStyled key={i}>
            {index + 1}
          </CellStyled>
        ))
      }
    </RowStyled>
  );
}

export default RowSc;
