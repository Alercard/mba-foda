import './Analyze.css';
import { get } from "immutable";
import { useDispatch, useSelector } from "react-redux";
import { DATA_TYPE_FODA, DATA_TYPE_GROUP, DATA_TYPE_TEXT, MAX_HEIGHT_FODA } from "../../core/analyzeConstants";
import { IconEFE, IconEFI, IconStarsDownIntense, IconStarsDownMedium, IconStarsUpHigh, IconStarsUpMedium, IconThumbDown, IconThumbUp } from "../Icons";
import { deleteAmenaza, deleteDebilidad, deleteFortaleza, deleteOportunidad, setAmenazas, setDebilidades, setFortalezas, setOportunidades, updateAmenaza, updateDebilidad, updateFortaleza, updateOportunidad } from '../../actions';
import { generateNewRegister } from '../../core/analyze';
import AnalyzeTable from '../AnalyzeTable';

const Analyze = ({ type }) => {
    const dispatch = useDispatch();
    const refPlus = type === DATA_TYPE_GROUP.EFI ? DATA_TYPE_FODA.FORTALEZAS : DATA_TYPE_FODA.OPORTUNIDADES;
    const refNegatives = type === DATA_TYPE_GROUP.EFI ? DATA_TYPE_FODA.DEBILIDADES : DATA_TYPE_FODA.AMENAZAS;
    const upData = useSelector(state => get(state, refPlus)).toJS();
    const downData = useSelector(state => get(state, refNegatives)).toJS();
    const maxHeightUp = type === DATA_TYPE_FODA.EFI ? MAX_HEIGHT_FODA.FORTALEZAS : MAX_HEIGHT_FODA.OPORTUNIDADES;
    const maxHeightDown = type === DATA_TYPE_FODA.EFI ? MAX_HEIGHT_FODA.DEBILIDADES : MAX_HEIGHT_FODA.AMENAZAS;

    const handleAddUp = type === DATA_TYPE_GROUP.EFI ?
                            () => dispatch(setFortalezas(generateNewRegister())) 
                            :
                            () => dispatch(setOportunidades(generateNewRegister()))

    const handleAddDown = type === DATA_TYPE_GROUP.EFI ?
                            () => dispatch(setDebilidades(generateNewRegister())) 
                            :
                            () => dispatch(setAmenazas(generateNewRegister()))

    const handleFieldUpdateUp = type === DATA_TYPE_GROUP.EFI ?
                            (id, text, field) => dispatch(updateFortaleza({id, text, field }))
                            :
                            (id, text, field) => dispatch(updateOportunidad({id, text, field }))

    const handleFieldUpdateDown = type === DATA_TYPE_GROUP.EFI ?
                            (id, text, field) => dispatch(updateDebilidad({id, text, field }))
                            :
                            (id, text, field) => dispatch(updateAmenaza({id, text, field }))

    const handleDeleteUp = type === DATA_TYPE_GROUP.EFI ?
                            (id) => dispatch(deleteFortaleza({id}))
                            :
                            (id) => dispatch(deleteOportunidad({id}))

    const handleDeleteDown = type === DATA_TYPE_GROUP.EFI ?
                            (id) => dispatch(deleteDebilidad({id}))
                            :
                            (id) => dispatch(deleteAmenaza({id}))

    const upOptions = [
        {value: 4, label: <IconStarsUpHigh />},
        {value: 3, label: <IconStarsUpMedium />}
    ]

    const downOptions = [
        {value: 2, label: <IconStarsDownMedium />},
        {value: 1, label: <IconStarsDownIntense />}
    ]

    const logoHeader = type === DATA_TYPE_GROUP.EFI ?
                        <IconEFI /> :
                        <IconEFE />

    return (
        <div className={`Analyze ${type}`}>
            <div className='container center'>
                {logoHeader}
                <div>{DATA_TYPE_TEXT[type]}</div>
            </div>
            <div className='container up'>
                <div className="container center">
                    <IconThumbUp />
                    <div>{DATA_TYPE_TEXT[`${type}Up`]}</div>
                </div>
                <AnalyzeTable
                    data={upData} 
                    handleAdd={handleAddUp} 
                    handleDelete={handleDeleteUp}
                    handleFieldUpdate={handleFieldUpdateUp} 
                    evaluationOptions={upOptions}
                    maxHeight={maxHeightUp}
                />
            </div>
            <div className='container down'>
                <div className="container center">
                    <IconThumbDown />
                    <div>{DATA_TYPE_TEXT[`${type}Down`]}</div>
                </div>
                <AnalyzeTable
                    data={downData} 
                    handleAdd={handleAddDown} 
                    handleDelete={handleDeleteDown}
                    handleFieldUpdate={handleFieldUpdateDown} 
                    evaluationOptions={downOptions}
                    maxHeight={maxHeightDown}
                />
            </div>
        </div>
    );
}

export default Analyze;