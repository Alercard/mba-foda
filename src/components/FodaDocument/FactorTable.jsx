const FactorTable = ({title, subtitleUp, subtitleDown, factorsUp, factorsDown}) => {
    const maxInterno = factorsUp.length > factorsDown.length ? factorsUp.length : factorsDown.length;
    const factors = [];
    let totalUp = 0;
    let totalDown = 0;
    for(let x=0; x < maxInterno; x++) {
        totalUp += factorsUp[x] ? factorsUp[x].value : 0
        totalDown += factorsDown[x] ? factorsDown[x].value : 0
        factors.push(
            <tr key={`${title}_${x}`}>
                <td className='description'>{factorsUp[x]?.description}</td>
                <td className='value'>{factorsUp[x]?.value.toFixed(2)}</td>
                <td className='description'>{factorsDown[x]?.description}</td>
                <td className='value'>{factorsDown[x]?.value.toFixed(2)}</td>
            </tr>
        )
    }
  
    return (
        <table className='results'>
          <thead>
            <tr>
              <th colSpan={4}>{title}: {(totalUp+totalDown).toFixed(2)}</th>
            </tr>
            <tr>
              <th colSpan={2} className="topic">{subtitleUp}: {totalUp.toFixed(2)}</th>
              <th colSpan={2} className="topic">{subtitleDown}: {totalDown.toFixed(2)}</th>
            </tr>
            <tr>
              <th>Descripción</th>
              <th>Calificación</th>
              <th>Descripción</th>
              <th>Calificación</th>
            </tr>
          </thead>
          <tbody>
            {factors}
          </tbody>
        </table>
    );
}

export default FactorTable