import { COLUMNS } from '../constants';
import classes from './Row.module.css';

const RowCssModules = ({ index }: { index: number}) => {
  return (
    <div className={classes.row}>
      <div className={classes.cell}>
        Row {index + 1}
      </div>
      {
        Array.from({ length: COLUMNS }).map((_, i) => (
          <div key={i} className={classes.cell}>
            {index + 1}
          </div>
        ))
      }
    </div>
  );
}

export default RowCssModules;
