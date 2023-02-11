import { AMENAZA_DELETE, AMENAZA_SET, AMENAZA_UPDATE, ANALIST_SET, ANALYZE_LOAD, CLIENT_SET, DEBILIDAD_DELETE, DEBILIDAD_SET, DEBILIDAD_UPDATE, FORTALEZA_DELETE, FORTALEZA_SET, FORTALEZA_UPDATE, OPORTUNIDAD_DELETE, OPORTUNIDAD_SET, OPORTUNIDAD_UPDATE } from "../actions/type";
import { setData } from "../api";
import { calculateAnalyze } from "../core/analyze";
import { DATA_TYPE_FODA, DATA_TYPE_HEADER, MAX_HEIGHT_FODA } from "../core/analyzeConstants";
import { initialState } from "../core/initialContext";

const { fromJS, setIn, get } = require("immutable");

const setAnalyze = (typeData, state, action) => {
    
    const currentData = get(state, typeData);

    const newFortalezas = currentData.push(
        {
            id: action.payload.id,
            index: currentData.size + 1,
            description: action.payload.description,
            height: action.payload.heightManual > 0 ? 
                    action.payload.heightManual :
                    0,
            heightManual: action.payload.heightManual,
            evaluation: action.payload.evaluation,
            value: action.payload.value
        }
    )

    const newFortalezasCalculated = calculateAnalyze(newFortalezas.toJS(), MAX_HEIGHT_FODA.FORTALEZAS)
    const resp = setIn(state, [typeData], fromJS(newFortalezasCalculated));
    setData(resp.toJS())
    return resp;

}

const setHeaderData = (typeData, state, action) => {
    console.log('setHeaderData: ', typeData, state, action)
    const resp = setIn(state, [typeData, 'name'], fromJS(action.payload.name))
    setData(resp.toJS())
    return resp
}

const updateAnalyze = (typeData, state, action) => {
    const ixToUpdate = get(state, typeData).findIndex(
        (item) => (get(item, 'id') === action.payload.id)
    )
    if (ixToUpdate < 0) {
        return state;
    }
    if (action.payload.field==='evaluation' || action.payload.field==='heightManual') {
        const current = get(state, typeData).toJS()
        current[ixToUpdate][action.payload.field] = action.payload.text*1
        const updatedFortalezas = calculateAnalyze(current, MAX_HEIGHT_FODA.FORTALEZAS)
        
        const resp = setIn(state, [typeData], fromJS(updatedFortalezas))
        setData(resp)
        return resp

    }
    const resp = setIn(state, [typeData, ixToUpdate, action.payload.field], action.payload.text)
    setData(resp)
    return resp

}

const deleteAnalyze = (typeData, state, action) => {
    const fortalezasAfterDelete = get(state, typeData).filter(
        (item) => (get(item, 'id') !== action.payload.id)
    )
    const fortalezasAfterDeleteCalculated = calculateAnalyze(fortalezasAfterDelete.toJS(), MAX_HEIGHT_FODA.FORTALEZAS)
    
    const resp = setIn(state, [typeData], fromJS(fortalezasAfterDeleteCalculated))
    setData(resp)
    return resp

}

export const analisisReducer = (state = initialState, action) => {

    switch(action.type) {
        case ANALYZE_LOAD: 
            state = setIn(state, [DATA_TYPE_HEADER.ANALIST], fromJS(action.payload[DATA_TYPE_HEADER.ANALIST]))
            state = setIn(state, [DATA_TYPE_HEADER.CLIENT], fromJS(action.payload[DATA_TYPE_HEADER.CLIENT]))
            state = setIn(state, [DATA_TYPE_FODA.FORTALEZAS], fromJS(action.payload[DATA_TYPE_FODA.FORTALEZAS]))
            state = setIn(state, [DATA_TYPE_FODA.DEBILIDADES], fromJS(action.payload[DATA_TYPE_FODA.DEBILIDADES]))
            state = setIn(state, [DATA_TYPE_FODA.OPORTUNIDADES], fromJS(action.payload[DATA_TYPE_FODA.OPORTUNIDADES]))
            console.log(state);
            return setIn(state, [DATA_TYPE_FODA.AMENAZAS], fromJS(action.payload[DATA_TYPE_FODA.AMENAZAS]))
            
        // HEADER
        case ANALIST_SET: return setHeaderData(DATA_TYPE_HEADER.ANALIST, state, action)
        case CLIENT_SET: return setHeaderData(DATA_TYPE_HEADER.CLIENT, state, action)
        
        // FORTALEZAS
        case FORTALEZA_SET: return setAnalyze(DATA_TYPE_FODA.FORTALEZAS, state, action)

        case FORTALEZA_UPDATE: return updateAnalyze(DATA_TYPE_FODA.FORTALEZAS, state, action)

        case FORTALEZA_DELETE: return deleteAnalyze(DATA_TYPE_FODA.FORTALEZAS, state, action)

        // DEBILIDADES
        case DEBILIDAD_SET: return setAnalyze(DATA_TYPE_FODA.DEBILIDADES, state, action)

        case DEBILIDAD_UPDATE: return updateAnalyze(DATA_TYPE_FODA.DEBILIDADES, state, action)

        case DEBILIDAD_DELETE: return deleteAnalyze(DATA_TYPE_FODA.DEBILIDADES, state, action)

        // OPORTUNIDADES
        case OPORTUNIDAD_SET: return setAnalyze(DATA_TYPE_FODA.OPORTUNIDADES, state, action)

        case OPORTUNIDAD_UPDATE: return updateAnalyze(DATA_TYPE_FODA.OPORTUNIDADES, state, action)

        case OPORTUNIDAD_DELETE: return deleteAnalyze(DATA_TYPE_FODA.OPORTUNIDADES, state, action)
            
        // AMENAZAS
        case AMENAZA_SET: return setAnalyze(DATA_TYPE_FODA.AMENAZAS, state, action)

        case AMENAZA_UPDATE: return updateAnalyze(DATA_TYPE_FODA.AMENAZAS, state, action)

        case AMENAZA_DELETE: return deleteAnalyze(DATA_TYPE_FODA.AMENAZAS, state, action)
                
        default: return state;
    }
}