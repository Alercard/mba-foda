import { get } from 'immutable';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadAnalyze } from './actions';
import { getData } from './api';
import './App.css';
import Analyze from './components/Analyze';
import Header from './components/Header';
import { IconsSource } from './components/Icons';
import Menu from './components/Menu';
import Option from './components/Option';
import { DATA_TYPE_FODA, DATA_TYPE_GROUP } from './core/analyzeConstants';

function App() {
  const [option, setOption] = useState('efi');
  const total_Foda = useSelector(state => get(state, DATA_TYPE_FODA.FORTALEZAS)).toJS().reduce((acum, item) => acum+item.value, 0);
  const total_fOda = useSelector(state => get(state, DATA_TYPE_FODA.OPORTUNIDADES)).toJS().reduce((acum, item) => acum+item.value, 0);
  const total_foDa = useSelector(state => get(state, DATA_TYPE_FODA.DEBILIDADES)).toJS().reduce((acum, item) => acum+item.value, 0);
  const total_fodA = useSelector(state => get(state, DATA_TYPE_FODA.AMENAZAS)).toJS().reduce((acum, item) => acum+item.value, 0);
  const total_FoDa = total_Foda + total_foDa
  const total_fOdA = total_fOda + total_fodA
  const total_FODA = total_FoDa + total_fOdA

  const dispatch = useDispatch()

  useEffect(
    () => {
      const data = getData();
      dispatch(loadAnalyze(data))  
    }, []
  )
  
  const handleEFI = () => {
    setOption('efi')
  }
  const handleEFE = () => {
    setOption('efe')
  }
  const handleResultados = () => {
    setOption('results')
  }
  const handlePrint = () => {
    setOption('print')
  }
  return (
    <div className="App">
      <Header />
      <Menu>
        <Option type={DATA_TYPE_GROUP.EFI} icon={IconsSource.efi} onClick={handleEFI} total={total_FoDa} />
        <Option type={DATA_TYPE_GROUP.EFE} icon={IconsSource.efe} onClick={handleEFE} total={total_fOdA} />
        <Option type={DATA_TYPE_GROUP.RESULTADOS} icon={IconsSource.chart} onClick={handleResultados} total={total_FODA} />
        <Option type={DATA_TYPE_GROUP.IMPRIMIR} icon={IconsSource.print} onClick={handlePrint} />
      </Menu>
      {option === 'efi' ? <Analyze type={DATA_TYPE_GROUP.EFI} /> : null }
      {option === 'efe' ? <Analyze type={DATA_TYPE_GROUP.EFE} /> : null }
      {option === 'results' ? <span>Results En Construccion</span> : null }
      {option === 'print' ? <span>Print En Construccion</span> : null }
    </div>
  );
}

export default App;
