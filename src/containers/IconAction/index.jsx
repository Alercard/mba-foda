import { fxDefault } from '../../core/defaults';
import './IconAction.css';

const IconAction = ({ children, onClick=fxDefault, color = 'black' }) => {
    return (
        <button 
            className="IconAction" 
            onClick={onClick}
            style={{color, borderColor: color}}
        >
            { children }
        </button>
    );
}

export default IconAction;