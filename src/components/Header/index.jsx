import './Header.css';
import { IconStore, IconUser } from "../Icons";

const Header = () => {
    return (
        <div className="Header">
            <div className="Header-input">
                <IconUser />
                <input type="text" placeholder="..." />
            </div>
            <div className="Header-input">
                <IconStore />
                <input type="text" placeholder="..." />
            </div>
        </div>
    );
}

export default Header;
