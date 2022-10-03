import './App.css';
import Header from './components/Header';
import { IconsSource } from './components/Icons';
import Menu from './components/Menu';
import Option from './components/Option';
import { DATA_TYPE_GROUP } from './context/dataTypeFODA';

function App() {
  const handleEFI = () => {
    alert('EFI')
  }
  const handleEFE = () => {
    alert('EFE')
  }
  const handleResultados = () => {
    alert('Resultados')
  }
  const handlePrint = () => {
    alert('Imprimir')
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

    </div>
  );
}

export default App;
