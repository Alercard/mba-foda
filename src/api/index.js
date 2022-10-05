import { initialState } from "../core/initialContext"

export const getData = () => {
    const data = localStorage.getItem('FODA_V1')
    if (data===null) {
        return initialState;
    }
    return JSON.parse(data);
}