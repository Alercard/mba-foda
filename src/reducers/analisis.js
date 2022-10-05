import { AMENAZA_SET, DEBILIDAD_SET, FORTALEZA_SET, FORTALEZA_UPDATE, OPORTUNIDAD_SET } from "../actions/type";

const { fromJS, setIn, get } = require("immutable");

const initialState = fromJS({
    fortalezas: [],
    debilidades: [],
    oportunidades: [],
    amenazas: []
})

export const analisisReducer = (state = initialState, action) => {

    switch(action.type) {
        case FORTALEZA_SET:
            const currentFortalezas = get(state, 'fortalezas');

            const newFortalezas = currentFortalezas.push(
                {
                    id: action.payload.id,
                    index: currentFortalezas.size + 1,
                    description: action.payload.description,
                    height: action.payload.heightManual > 0 ? 
                            action.payload.heightManual :
                            0,
                    heightManual: action.payload.heightManual,
                    evaluation: action.payload.evaluation,
                    value: action.payload.value
                }
            )
            
            return setIn(state, ['fortalezas'], fromJS(newFortalezas));

        case FORTALEZA_UPDATE:
            const ixToUpdate = get(state, 'fortalezas').findIndex(
                (item) => (get(item, 'id') === action.payload.id)
            )
            if (ixToUpdate < 0) {
                return state;
            }
            return setIn(state, ['fortalezas', ixToUpdate, action.payload.field], action.payload.text)

        case DEBILIDAD_SET:
            return setIn(state, ['debilidades'], fromJS(action.payload));

        case OPORTUNIDAD_SET:
            return setIn(state, ['oportunidades'], fromJS(action.payload));

        case AMENAZA_SET:
            return setIn(state, ['amenazas'], fromJS(action.payload));
                
        default:
            return state;
    }
}