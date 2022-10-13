import { generatePoint, getStrategyDescription, resolveStrategy } from '../../core/analyze';
import './Result.css';

const Result = ({ totalEfi=0, totalEfe = 0}) => {
    const strategy = resolveStrategy(totalEfi, totalEfe)
    const {right, bottom} = generatePoint(strategy, totalEfi, totalEfe);
    const strategyComponent = <div className={`strategy-${strategy}`} style={{right: `${(right*4)-0.5}rem`, bottom: `${(bottom*4)-0.5}rem`}}> </div>
    const strategyDescription = getStrategyDescription(strategy);

    return (
        <div className='Result'>
            Estrategia {strategy}
            <div className="header-efi">
                <div className='col-header-efe'></div>
                <div className='col-header-fortaleza'>Fortalezas</div>
                <div className='col-header-debilidad'>Debilidades</div>
            </div>
            <div className="row-oportunidad">
                <div className='col-header-oportunidad'>Oportunidad</div>
                <div className='col-FO'>
                    FO
                    {strategy === 'FO' && strategyComponent}
                </div>
                <div className='col-DO'>
                    DO
                    {strategy === 'DO' && strategyComponent}
                </div>
            </div>
            <div className="row-amenaza">
                <div className='col-header-amenaza'>Amenaza</div>
                <div className='col-FA'>
                    FA
                    {strategy === 'FA' && strategyComponent}
                </div>
                <div className='col-DA'>
                    DA
                    {strategy === 'DA' && strategyComponent}
                </div>
            </div>
            <div className="conclusion">
                {strategy === 'FO' && <div>Estategias de Crecimiento</div> }
                {strategy === 'DO' && <div>Estrategias de Redespliegue</div> }
                {strategy === 'FA' && <div>Estrategias de Diversificación</div> }
                {strategy === 'DA' && <div>Estrategias de Diversificación</div> }
                <p>{strategyDescription}</p>
            </div>
        </div>
    );
}

export default Result;