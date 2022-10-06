import { AMENAZA_DELETE, AMENAZA_SET, AMENAZA_UPDATE, ANALYZE_LOAD, DEBILIDAD_DELETE, DEBILIDAD_SET, DEBILIDAD_UPDATE, FORTALEZA_DELETE, FORTALEZA_SET, FORTALEZA_UPDATE, OPORTUNIDAD_DELETE, OPORTUNIDAD_SET, OPORTUNIDAD_UPDATE } from "./type";

export const loadAnalyze = (payload) => ({
    type: ANALYZE_LOAD,
    payload
})
export const setFortalezas = (payload) => ({
    type: FORTALEZA_SET,
    payload   
})

export const updateFortaleza = (payload) => ({
    type: FORTALEZA_UPDATE,
    payload   
})

export const deleteFortaleza = (payload) => ({
    type: FORTALEZA_DELETE,
    payload   
})

export const setDebilidades = (payload) => ({
    type: DEBILIDAD_SET,
    payload   
})

export const updateDebilidad = (payload) => ({
    type: DEBILIDAD_UPDATE,
    payload   
})

export const deleteDebilidad = (payload) => ({
    type: DEBILIDAD_DELETE,
    payload   
})

export const setOportunidades = (payload) => ({
    type: OPORTUNIDAD_SET,
    payload   
})

export const updateOportunidad = (payload) => ({
    type: OPORTUNIDAD_UPDATE,
    payload   
})

export const deleteOportunidad = (payload) => ({
    type: OPORTUNIDAD_DELETE,
    payload   
})

export const setAmenazas = (payload) => ({
    type: AMENAZA_SET,
    payload   
})

export const updateAmenaza = (payload) => ({
    type: AMENAZA_UPDATE,
    payload   
})

export const deleteAmenaza = (payload) => ({
    type: AMENAZA_DELETE,
    payload   
})
