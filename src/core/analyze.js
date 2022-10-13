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

export const resolveStrategy = (efi, efe) => {
    if ( (efi>=0 && efi<2) && (efe>=0 && efe<2) ) {
        return 'DA'
    }
    if ( (efi>=0 && efi<2) && (efe>=2) ) {
        return 'DO'
    }
    if ( (efi>=2) && (efe>=0 && efe<2) ) {
        return 'FA'
    }
    if ( (efi>=2) && (efe>=2) ) {
        return 'FO'
    }
}

export const generatePoint = (strategy, efi, efe) => {
    const point = {right: efi, bottom: efe};
    if (strategy==='FO') {
        point.right = efi - 2;
        point.bottom = efe - 2;
    }
    if (strategy==='FA') {
        point.right = efi - 2;
    }
    if (strategy==='DO') {
        point.bottom = efe - 2;
    }
    return point;
}

export const getStrategyDescription = (strategy) => {
    if (strategy==='FO') {
        return 'Utilización de las fortalezas, tomando en cuenta las oportunidades';
    }
    if (strategy==='FA') {
        return 'Se afianzarán las fortalezas para evitar las amenazas';
    }
    if (strategy==='DO') {
        return 'Vencer las debilidades aprovechando las oportunidades presentes. Permiten un cambio interno.';
    }
    if (strategy==='DA') {
        return 'Alianza, fusión, venta, diversificación. Con la formulación de éstas se podrá reducir al mínimo las debilidades, evitando las amenazas.';
    }
    return '';
}