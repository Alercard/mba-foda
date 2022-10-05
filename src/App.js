import { get } from 'immutable';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import './App.css';
import Analyze from './components/Analyze';
import Header from './components/Header';
import { IconsSource } from './components/Icons';
import Menu from './components/Menu';
import Option from './components/Option';
import { DATA_TYPE_GROUP } from './core/analyzeConstants';

function App() {
  const [option, setOption] = useState('efi');

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
        <Option type={DATA_TYPE_GROUP.EFI} icon={IconsSource.efi} onClick={handleEFI} />
        <Option type={DATA_TYPE_GROUP.EFE} icon={IconsSource.efe} onClick={handleEFE} />
        <Option type={DATA_TYPE_GROUP.RESULTADOS} icon={IconsSource.chart} onClick={handleResultados} />
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
