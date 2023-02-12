import './Header.css';
import { IconStore, IconUser } from "../Icons";
import { get } from 'immutable';
import { useDispatch, useSelector } from 'react-redux';
import { setAnalist, setClient } from '../../actions';
import { DATA_TYPE_HEADER } from '../../core/analyzeConstants';

const Header = () => {
    const dispatch = useDispatch();
    const analist = useSelector(state => get(state, DATA_TYPE_HEADER.ANALIST)).toJS();
    const client  = useSelector(state => get(state, DATA_TYPE_HEADER.CLIENT)).toJS();
    const handleAnalistUpdate = (name) => dispatch(setAnalist({name}));
    const handleClientUpdate = (name) => dispatch(setClient({name}));
    return (
        <div className="Header">
            <div className='Header-title'>
                <h1>FODA</h1>
            </div>
            <div className="Header-data">
                <div className="Header-input">
                    <IconUser />
                    <input 
                        type="text" 
                        placeholder="Indique el Analista" 
                        value={analist.name} 
                        onChange={(e) => handleAnalistUpdate(e.target.value)}
                    />
                </div>
                <div className="Header-input">
                    <IconStore />
                    <input 
                        type="text" 
                        placeholder="Indique el Cliente" 
                        value={client.name} 
                        onChange={(e) => handleClientUpdate(e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
}

export default Header;
