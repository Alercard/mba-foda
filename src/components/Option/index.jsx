import { DATA_TYPE_TEXT } from '../../core/analyzeConstants';
import './Option.css';

const Option = ({ icon, type, onClick, total=-1, active=false }) => {

    return (
        <div className={`Option ${type} ${active ? 'active' : ''}`} onClick={onClick}>
            {icon}
            <div>{DATA_TYPE_TEXT[type]}</div>
            {total >= 0 ? total.toFixed(2) : null}
        </div>
    );
}

export default Option;