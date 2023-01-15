import './AnalyzeTable.css';
import Select from 'react-select';
import IconAction from "../../containers/IconAction";
import { IconCalculator, IconComment, IconDelete, IconHash, IconPlus, IconScale, IconStars } from "../Icons";

const AnalyzeTable = ({data, handleAdd, handleDelete, handleFieldUpdate, evaluationOptions, maxHeight}) => {
    const dataTotalValue = data.reduce( (acum, item) => acum + item.value, 0)
    const dataTotalScale = data.reduce( (acum, item) => acum + (item.heightManual>0?item.heightManual:item.height), 0)

    let counter = 1;
    return (
        <div>
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
                        <IconAction onClick={() => handleAdd()} color={'rgb(4, 83, 4)'}>
                            <IconPlus />
                            <div>Agregar</div>
                        </IconAction>
                    </td>
                </tr>
                {
                    data.map(
                        (item) => (
                            <tr key={item.id}>
                                <td>
                                    <button type="button" onClick={() => handleDelete(item.id)}>
                                        <IconDelete />
                                    </button>
                                </td>
                                <td>{counter++}</td>
                                <td className='table-td description'>
                                    <input 
                                        className='table-td input'
                                        type="text" 
                                        value={item.description} 
                                        placeholder="..." 
                                        onChange={(e) => handleFieldUpdate(item.id, e.target.value, 'description')}
                                    />
                                </td>
                                <td className='table-td scale'>
                                    <input 
                                        className='table-td input'
                                        type="number" 
                                        value={item.heightManual > 0 ? item.heightManual : item.height} 
                                        placeholder="0.00" 
                                        step="0.01" min="0" lang="en"
                                        onChange={(e) => handleFieldUpdate(item.id, e.target.value, 'heightManual')}
                                    />
                                </td>
                                <td style={{minWidth:"7rem"}}>
                                    <Select 
                                        className="basic-single"
                                        options={evaluationOptions}
                                        value={evaluationOptions.filter(i=>i.value === item.evaluation)}
                                        isSearchable={false}
                                        name={`evaluation-up-${item.id}`}
                                        placeholder="..."
                                        onChange={(e) => {handleFieldUpdate(item.id, e.value, 'evaluation')}}
                                    />
                                </td>
                                <td>{item.value.toFixed(2)}</td>
                            </tr>
                        )
                    )
                }
                </tbody>
                <tfoot>
                    <tr>
                        <th colSpan={3}></th>
                        <th>{ `${(dataTotalScale+0.00000001).toFixed(2)} / ${(maxHeight+0.00000001).toFixed(2)}` }</th>
                        <th></th>
                        <th>{dataTotalValue.toFixed(2)}</th>
                    </tr>                    
                </tfoot>
            </table>
        </div>

    );
}

export default AnalyzeTable;