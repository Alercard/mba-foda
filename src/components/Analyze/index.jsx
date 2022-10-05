import './Analyze.css';
import { get } from "immutable";
import { useDispatch, useSelector } from "react-redux";
import { DATA_TYPE_FODA, DATA_TYPE_GROUP, MAX_HEIGHT_FODA } from "../../core/analyzeConstants";
import { IconCalculator, IconComment, IconDelete, IconHash, IconPlus, IconScale, IconStars } from "../Icons";
import IconAction from '../../containers/IconAction';
import { setFortalezas, setOportunidades, updateFortaleza, updateOportunidad } from '../../actions';
import { generateNewRegister } from '../../core/analyze';

const Analyze = ({ type }) => {
    const dispatch = useDispatch();
    const refPlus = type === DATA_TYPE_GROUP.EFI ? DATA_TYPE_FODA.FORTALEZAS : DATA_TYPE_FODA.OPORTUNIDADES;
    const refNegatives = type === DATA_TYPE_GROUP.EFI ? DATA_TYPE_FODA.DEBILIDADES : DATA_TYPE_FODA.AMENAZAS;
    const upData = useSelector(state => get(state, refPlus)).toJS();
    const downData = useSelector(state => get(state, refNegatives)).toJS();
    const maxHeightUp = type === DATA_TYPE_FODA.EFI ? MAX_HEIGHT_FODA.FORTALEZAS : MAX_HEIGHT_FODA.OPORTUNIDADES;
    const maxHeightDown = type === DATA_TYPE_FODA.EFI ? MAX_HEIGHT_FODA.DEBILIDADES : MAX_HEIGHT_FODA.AMENAZAS;

    const handleAddUp = (type) => {
        if (type === DATA_TYPE_GROUP.EFI) {
            dispatch(setFortalezas(generateNewRegister()))
        } else {
            dispatch(setOportunidades(generateNewRegister()))
        }
    }

    const handleFieldUpdateUp = (id, text, field) => {
        if (type === DATA_TYPE_GROUP.EFI) {
            dispatch(updateFortaleza({id, text, field }))
        } else {
            dispatch(updateOportunidad({id, text, field }))
        }
    }

    return (
        <div className={`Analyze ${type}`}>
            {type}
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th><IconHash /> </th>
                        <th><IconComment /></th>
                        <th><IconScale /></th>
                        <th><IconStars /></th>
                        <th><IconCalculator /></th>
                    </tr>
                </thead>
                <tbody>
                <tr>
                    <td className="NoData" colSpan={6}>
                        <IconAction onClick={() => handleAddUp(type)} color={'rgb(4, 83, 4)'}>
                            <IconPlus />
                        </IconAction>
                    </td>
                </tr>
                {
                    upData.map(
                        (item) => (
                            <tr key={item.id}>
                                <td>
                                    <button type="button">
                                        <IconDelete />
                                    </button>
                                </td>
                                <td>{item.index}</td>
                                <td>
                                    <input 
                                        type="text" 
                                        value={item.description} 
                                        placeholder="..." 
                                        onChange={(e) => handleFieldUpdateUp(item.id, e.target.value, 'description')}
                                    />
                                </td>
                                <td>
                                    <input 
                                        type="number" 
                                        value={item.heightManual} 
                                        placeholder="0.00" 
                                        onChange={(e) => handleFieldUpdateUp(item.id, e.target.value, 'heightManual')}
                                    />
                                </td>
                                <td>{item.evaluation}</td>
                                <td>{item.value}</td>
                            </tr>
                        )
                    )
                }
                </tbody>
                <tfoot>
                    <tr>
                        <th colSpan={3}></th>
                        <th>{ maxHeightUp }</th>
                        <th>0.00</th>
                        <th>0.00</th>
                    </tr>                    
                </tfoot>
            </table>
            {

            }
        </div>
    );
}

export default Analyze;