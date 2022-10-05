export const calculateAnalyze = (registers, maxHeight) => {

    const heightBase = registers.length > 0 ? Math.round( ( maxHeight / registers.length ) * 100) / 100 : 0;

    const results = registers.map( (item) => {        
        const height = item.heightManual > 0 ? item.heightManual : heightBase;
        item.height = heightBase
        item.value = (item.evaluation * height)
        return item;
    })

    return results;
}

export const generateNewRegister = () => ({
        id: Date.now(),
        index: 0,
        description: '',
        height: 0,
        heightManual: 0,
        evaluation: 0,
        value: 0
    })