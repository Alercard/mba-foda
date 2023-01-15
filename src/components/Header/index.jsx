import './Header.css';
import { IconStore, IconUser } from "../Icons";

const Header = () => {
    return (
        <div className="Header">
            <div className='Header-title'>
                <h1>FODA</h1>
            </div>
            <div className="Header-data">
                <div className="Header-input">
                    <IconUser />
                    <input type="text" placeholder="Indique el Analista" />
                </div>
                <div className="Header-input">
                    <IconStore />
                    <input type="text" placeholder="Indique el Cliente" />
                </div>
            </div>
        </div>
    );
}

export default Header;
