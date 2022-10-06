import { initialState } from "../core/initialContext"

const STORAGE_KEY = 'FODA_V1'

export const getData = () => {
    const data = localStorage.getItem(STORAGE_KEY)
    if (data===null) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initialState))
        return initialState;
    }
    return JSON.parse(data);
}

export const setData = (data) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}