import { get } from 'immutable';
import { useSelector } from 'react-redux';
import { DATA_TYPE_FODA, DATA_TYPE_HEADER } from '../../core/analyzeConstants';
import Result from '../Result';
import FactorTable from './FactorTable';
import './FodaDocument.css'

// https://www.smashingmagazine.com/2015/01/designing-for-print-with-css/
const FodaDocument = () => {
  const analist = useSelector(state => get(state, DATA_TYPE_HEADER.ANALIST)).toJS();
  const client = useSelector(state => get(state, DATA_TYPE_HEADER.CLIENT)).toJS();
  const fortalezas = useSelector(state => get(state, DATA_TYPE_FODA.FORTALEZAS)).toJS();
  const debilidades = useSelector(state => get(state, DATA_TYPE_FODA.DEBILIDADES)).toJS();
  const oportunidades = useSelector(state => get(state, DATA_TYPE_FODA.OPORTUNIDADES)).toJS();
  const amenazas = useSelector(state => get(state, DATA_TYPE_FODA.AMENAZAS)).toJS();
  let totalEFI = 0
  let totalEFE = 0
  const fxGetTotal = (acum, item) => acum + item.value
  totalEFI = fortalezas.reduce(fxGetTotal, 0) + debilidades.reduce(fxGetTotal, 0)
  totalEFE = oportunidades.reduce(fxGetTotal, 0) + amenazas.reduce(fxGetTotal, 0)

  return (
    <div>
      <div className='NoPrint'>
        <button className='print' onClick={() => {window.print()}} >Imprimir</button>
      </div>
      <div className='Print'>
        <h1>INFORME FODA</h1>
        <div className='Print-header'>
          <div className='Print-block'>
            <strong>Analista:</strong> 
            {analist.name}
          </div>
          <div className='Print-block'>
            <strong>Cliente:</strong>
            {client.name}
          </div>
        </div>
        <div className='factors'>
          <FactorTable 
                        title="Analisis Interno" 
                        subtitleUp="Fortalezas" 
                        subtitleDown="Debilidades" 
                        factorsUp={fortalezas} 
                        factorsDown={debilidades}
          />
        </div>
        <div className='factors'>
          <FactorTable 
                        title="Analisis Externo" 
                        subtitleUp="Oportunidades" 
                        subtitleDown="Amenazas" 
                        factorsUp={oportunidades} 
                        factorsDown={amenazas}
          />
        </div>
        <div>
          <Result totalEfi={totalEFI} totalEfe={totalEFE} />
        </div>
      </div>
    </div>
  );
};

export default FodaDocument;