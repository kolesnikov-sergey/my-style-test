import { ChangeEvent, Fragment, memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ThemeProvider } from 'styled-components';
import RowCssModules from './RowCssModules/RowCssModules';
import RowSc from './RowSc/RowSc';
import { BATCH } from './constants';
import RowLinaria from './RowLinaria/RowLinaria';
import RowLinariaV2 from './RowLinariaV2/RowLinariaV2';
import classes from './App.module.css'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Table = memo(({ data, Row }: { data: number[], Row: any } ) => (
  <>
    {
      data.map(index => <Row key={index} index={index} />)
    }
  </>
));

const CSS_TYPES = [{
  type: 'css',
  name: 'Css Modules',
  Row: RowCssModules,
}, {
  type: 'sc',
  name: 'Styled Components',
  Row: RowSc,
}, {
  type: 'linaria',
  name: 'Linaria',
  Row: RowLinaria,
}, {
  type: 'linariav2',
  name: 'Linaria css``',
  Row: RowLinariaV2,
}];

const theme = {
  borderColor: 'lightgray'
};

function App() {
  const [type, setType] = useState('css');
  const [data, setData] = useState<number[]>([]);
  const [time, setTime] = useState<number>();

  const startTime = useRef<number>();

  const handleChangeType = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setType(e.target.value);
    setData([]);
    setTime(undefined);
  }, [])

  const handleAdd = useCallback(() => {
    startTime.current = performance.now();
    setData(prev => {
      const first  = prev[0] || 0;
      return [
        ...Array.from({ length: BATCH }, (_, i) => BATCH - i + first),
        ...prev,
      ];
    });
  }, [])

  useEffect(() => {
    if (startTime.current != null) {
      setTime(Math.floor(performance.now() - startTime.current));
      startTime.current = undefined;
    }
  }, [data]);

  const Row = useMemo(() => {
    return CSS_TYPES.find(t => t.type === type)?.Row;
  }, [type]);

  return (
    <div className={classes.root}>
      <a
        href="https://github.com/kolesnikov-sergey/my-style-test"
        target="_blank"
      >
        Github
      </a>
      <div className={classes.block}>
        {
          CSS_TYPES.map(item => (
            <Fragment key={item.type}>
              <input
                className={classes.radio}
                type="radio"
                id={item.type}
                name="styleType"
                value={item.type}
                checked={type === item.type}
                onChange={handleChangeType}
              />
              <label className={classes.label} htmlFor={item.type}>{item.name}</label>
            </Fragment>
          ))
        }
      </div>
      <div className={classes.block}>
        <button className={classes.button} onClick={handleAdd}>Add {BATCH} items</button>
        {
          time != null && (
            <>
              <span className={classes.text}>Count: {data.length}. Render time: {time} ms</span>
            </>
          )
        }
      </div>
      <ThemeProvider theme={theme}>
        <Table data={data} Row={Row} />
      </ThemeProvider>
    </div>
  )
}

export default App
